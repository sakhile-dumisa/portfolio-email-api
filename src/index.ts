import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { rateLimiter } from 'hono-rate-limiter'
import { RedisStore } from 'rate-limit-redis'
import { Redis } from 'ioredis'
import { Resend } from 'resend'
import emailRouter from './routes/email.js'
import type { AppVariables } from './types/app.js'

type Bindings = {
  RESEND_API_KEY: string
  X_API_KEY: string
}

type AppEnv = {
  Bindings: Bindings
  Variables: AppVariables
}

const app = new Hono<AppEnv>()

const createRedisClient = (): Redis | null => {
  const tlsEnabled = String(process.env.REDIS_TLS).toLowerCase() === 'true'
  const commonOptions = {
    maxRetriesPerRequest: 1,
    retryStrategy: () => null as null
  }

  if (process.env.REDIS_HOST && process.env.REDIS_PASSWORD) {
    return new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT || 6379),
      username: process.env.REDIS_USERNAME || 'default',
      password: process.env.REDIS_PASSWORD,
      tls: tlsEnabled ? {} : undefined,
      ...commonOptions
    })
  }

  if (process.env.REDIS_URL) {
    return new Redis(process.env.REDIS_URL, {
      tls: tlsEnabled ? {} : undefined,
      ...commonOptions
    })
  }

  return null
}

let sharedRedisClient: Redis | null = null
let sharedRedisStore: any = null
let redisInitAttempted = false

const getSharedRedisClient = async (): Promise<Redis | null> => {
  if (sharedRedisClient) return sharedRedisClient
  if (redisInitAttempted) return null

  redisInitAttempted = true
  const client = createRedisClient()
  if (!client) return null

  try {
    client.on('error', (err) => {
      console.error('Redis client error:', err)
    })
    await client.ping()
    sharedRedisClient = client
    console.log('Redis connected')
    return sharedRedisClient
  } catch (err) {
    console.error('Redis connection failed:', err)
    try {
      client.disconnect()
    } catch {}
    return null
  }
}

const getSharedRedisStore = async (): Promise<any> => {
  if (sharedRedisStore) return sharedRedisStore
  const client = await getSharedRedisClient()
  if (!client) return null

  sharedRedisStore = new RedisStore({
    sendCommand: (command: string, ...args: string[]) => client.call(command, ...args) as Promise<any>
  })

  return sharedRedisStore
}


app.use('*', logger())

app.get('/favicon.ico', async (c) => {
  try {
    const iconPath = path.join(process.cwd(), 'public', 'favicon.ico')
    const icon = await readFile(iconPath)
    c.header('Content-Type', 'image/x-icon')
    c.header('Cache-Control', 'public, max-age=86400')
    return c.body(icon)
  } catch {
    return c.text('Not found', 404)
  }
})

// CORS – your exact origins
app.use('*', cors({
  origin: [
    'https://www.sakhiledumisa.com',
    'https://www.sakhiledumisa.info',
    'https://sakhile-dumisa.vercel.app',
    'https://dumisasakhile.vercel.app'
  ],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'x-api-key'],
  credentials: true,
  maxAge: 86400
}))

// Security headers (helmet equivalent)
app.use('*', secureHeaders())

// Global rate limit (100 req / 15 min per IP) – Redis backed if available
app.use('*', async (c, next) => {
  const store: any = await getSharedRedisStore()

  const limiter = rateLimiter<AppEnv>({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    keyGenerator: (c) => c.req.header('x-forwarded-for') || 'global',
    standardHeaders: 'draft-6',
    store: store || undefined
  })

  return limiter(c, next)
})

// API Key protection for /email/*
app.use('/email/*', async (c, next) => {
  const key = c.req.header('x-api-key')
  const expected = c.env.X_API_KEY || process.env.X_API_KEY

  if (expected && key !== expected) {
    return c.json({ success: false, error: 'Unauthorized – invalid API key' }, 401)
  }

  await next()
})

// Lazy init services & attach to context
app.use('*', async (c, next) => {
  // Resend
  if (!c.get('resend') && !c.get('resendError')) {
    const key = c.env.RESEND_API_KEY || process.env.RESEND_API_KEY
    if (key) {
      c.set('resend', new Resend(key))
    } else {
      c.set('resendError', true)
    }
  }

  // Redis (per-request attempt – safe in serverless)
  if (!c.get('redis') && !c.get('redisError')) {
    const client = await getSharedRedisClient()
    if (client) {
      c.set('redis', client)
    } else {
      c.set('redisError', true)
    }
  }

  await next()
})

// Routes
app.route('/email', emailRouter)

// Health & root
app.get('/', (c) => c.json({ success: true, message: 'Portfolio Email API running' }))
app.get('/health', (c) => c.json({ success: true, status: 'OK', uptime: process.uptime() }))

// 404 & errors
app.notFound((c) => c.json({ success: false, error: 'Not found' }, 404))

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, error: err.message }, err.status)
  }

  console.error(err)
  return c.json({ success: false, error: 'Internal server error' }, 500)
})

export default app