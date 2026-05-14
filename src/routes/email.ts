import { VerificationEmail } from './../../react-email-starter/emails/otp-email.js';
import { ConfirmationEmail } from './../../react-email-starter/emails/confirmation-email.js';
import { InboxEmail } from './../../react-email-starter/emails/inbox-email.js';
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import sanitizeHtml from 'sanitize-html'
import { sendEmailSchema, sendOtpSchema, verifyOtpSchema } from '../schemas/email.schema.js'
import type { AppVariables } from '../types/app.js'



const email = new Hono<{ Variables: AppVariables }>()

const titleCase = (str: string) =>
  str.trim().toLowerCase().replace(/(^|\s|-)\S/g, l => l.toUpperCase())

// POST /email/api/send-email
email.post(
  '/api/send-email',
  zValidator('json', sendEmailSchema, (result, c) => {
    if (!result.success) {
      return c.json({ success: false, error: "Validation error", issues: result.error.issues }, 400)
    }
  }),
  async (c) => {
    const { to, userName, sentBy, message, from } = c.req.valid('json')
    const resend = c.get('resend')
    const redis = c.get('redis')

    if (!resend) return c.json({ success: false, error: "Email service unavailable" }, 503)

    if (redis) {
      const verified = await redis.get(`verified:${sentBy}`)
      if (!verified) return c.json({ success: false, error: "Email not verified. Please verify first." }, 403)
    }

    const titledName = titleCase(sanitizeHtml(userName))
    const cleanSentBy = sanitizeHtml(sentBy).trim()
    const cleanMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} }).trim()

    try {
      // 1. Send to your inbox
      const inboxRes = await resend.emails.send({
        from: `${titledName} <${from}>`,
        to,
        replyTo: cleanSentBy,
        subject: `New message from ${titledName}`,
        react: InboxEmail({ userName: titledName, message: cleanMessage }),
      })

      // 2. Send confirmation to the user
      await resend.emails.send({
        from: `Sakhile Dumisa <${process.env.FROM_SENDER!}>`,
        to: cleanSentBy,
        subject: `Thanks, ${titledName}!`,
        react: ConfirmationEmail({ 
          userName: titledName, 
          sentMessage: cleanMessage 
        }),
      })

      return c.json({ success: true, data: inboxRes })
    } catch (err: any) {
      console.error("Send email failed:", err)
      return c.json({ success: false, error: err.message || "Failed to send message" }, 500)
    }
  }
)

// POST /email/api/send-otp
email.post(
  '/api/send-otp',
  zValidator('json', sendOtpSchema),
  async (c) => {
    const { email: targetEmail } = c.req.valid('json')
    const resend = c.get('resend')
    const redis = c.get('redis')

    if (!resend) return c.json({ success: false, error: "Email service unavailable" }, 503)

    if (redis) {
      const cooldown = await redis.get(`otp-cooldown:${targetEmail}`)
      if (cooldown) return c.json({ success: false, error: "Wait before requesting another OTP" }, 429)

      await redis.set(`otp-cooldown:${targetEmail}`, '1', 'EX', Number(process.env.OTP_COOLDOWN_SECONDS) || 60)
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    if (redis) {
      await redis.set(`otp:${targetEmail}`, code, 'EX', Number(process.env.OTP_TTL_SECONDS) || 600)
      await redis.del(`otp-attempts:${targetEmail}`)
    }

    try {
      await resend.emails.send({
        from: `Verification <${process.env.FROM_VERIFY!}>`,
        to: targetEmail,
        subject: "Your Verification Code",
        react: VerificationEmail({ code }),
      })

      return c.json({ success: true, message: "OTP sent" })
    } catch (err: any) {
      console.error("OTP send failed:", err)
      return c.json({ success: false, error: "Failed to send OTP" }, 500)
    }
  }
)

// POST /email/api/verify-otp
email.post(
  '/api/verify-otp',
  zValidator('json', verifyOtpSchema),
  async (c) => {
    const { email: targetEmail, code } = c.req.valid('json')
    const redis = c.get('redis')

    if (!redis) return c.json({ success: false, error: "Verification unavailable" }, 503)

    const stored = await redis.get(`otp:${targetEmail}`)
    if (!stored) return c.json({ success: false, error: "Code expired or not found" }, 400)

    const attemptsKey = `otp-attempts:${targetEmail}`
    let attempts = await redis.incr(attemptsKey)
    if (attempts === 1) await redis.expire(attemptsKey, Number(process.env.OTP_TTL_SECONDS) || 600)

    if (attempts > (Number(process.env.MAX_VERIFY_ATTEMPTS) || 5)) {
      return c.json({ success: false, error: "Too many attempts. Try again later." }, 429)
    }

    if (stored !== code) return c.json({ success: false, error: "Incorrect code" }, 400)

    await redis.del(`otp:${targetEmail}`)
    await redis.del(attemptsKey)
    await redis.set(`verified:${targetEmail}`, '1', 'EX', 60 * 60 * 24 * 30)

    return c.json({ success: true, message: "Email verified successfully" })
  }
)

export default email