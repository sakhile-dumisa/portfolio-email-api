import type { Redis } from 'ioredis'
import type { Resend } from 'resend'

export type AppVariables = {
  resend?: Resend
  resendError?: boolean
  redis?: Redis
  redisError?: boolean
}
