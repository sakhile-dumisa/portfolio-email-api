# Portfolio Email API

Hono + TypeScript API for contact email delivery and OTP verification.

## Prerequisites

- Node.js 20+
- pnpm

## Install

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the project root.

Required for sending email:

- `RESEND_API_KEY`
- `FROM_VERIFY`
- `RESEND_TEMPLATE_INBOX_ID`
- `RESEND_TEMPLATE_CONFIRMATION_ID`
- `RESEND_TEMPLATE_OTP_ID`

Optional:

- `PORT` (default: `3000`)
- `X_API_KEY` (protects `/email/*` routes)
- `OTP_TTL_SECONDS` (default: `600`)
- `OTP_COOLDOWN_SECONDS` (default: `60`)
- `MAX_VERIFY_ATTEMPTS` (default: `5`)
- `REDIS_URL`
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_USERNAME`, `REDIS_PASSWORD`, `REDIS_TLS`

Notes:

- If `RESEND_API_KEY` is missing, health/root routes still work, but email endpoints return `503`.
- If Redis config is missing/unavailable, the API still runs with limited OTP protections.

## Local Development

Run in watch mode:

```bash
pnpm dev
```

App URL:

```text
http://localhost:3000
```

## Build and Start

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` - Run local Node server with live reload (`src/server.ts`)
- `pnpm build` - Compile TypeScript to `dist/`
- `pnpm start` - Start compiled server (`dist/server.js`)
- `pnpm deploy` - Deploy with Vercel CLI

## API Routes

- `GET /` - Service status message
- `GET /health` - Health check with uptime
- `POST /email/api/send-email` - Send contact email
- `POST /email/api/send-otp` - Send OTP to email
- `POST /email/api/verify-otp` - Verify OTP

## Vercel

You can also run with Vercel runtime locally:

```bash
pnpm dlx vercel dev
```

Deploy:

```bash
pnpm deploy
```
