import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

function stripEnvQuotes(value: string | undefined): string {
  if (!value) return ''
  return value.trim().replace(/^["']|["']$/g, '')
}

const smtpHost = stripEnvQuotes(process.env.SMTP_HOST)
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpUser = stripEnvQuotes(process.env.SMTP_USER)
const smtpPass = stripEnvQuotes(process.env.SMTP_PASS)
// Port 465 uses SSL/TLS on connect; port 587 uses STARTTLS (requireTLS)
const smtpSecure = smtpPort === 465 || (process.env.SMTP_SECURE === 'true' && smtpPort !== 587)
const smtpRequireTLS = smtpPort === 587

const isNetlify = process.env.NETLIFY === 'true'
const resendApiKey = stripEnvQuotes(process.env.RESEND_API_KEY)

/** Netlify free tier = 10s; stay under 8s for SMTP so we return JSON, not 504 HTML */
const SMTP_TIMEOUT_MS = isNetlify ? 8_000 : 15_000

export type MailAttachment = { filename: string; content: Buffer }

export type SendMailOptions = {
  from?: string
  to: string | string[]
  replyTo?: string
  subject: string
  html: string
  text?: string
  attachments?: MailAttachment[]
}

export function isMailConfigured() {
  if (isNetlify) {
    return Boolean(resendApiKey)
  }

  return Boolean(resendApiKey || (smtpHost && smtpUser && smtpPass))
}

function getPrimarySmtpConfig() {
  return { host: smtpHost, port: smtpPort, secure: smtpSecure }
}

function createTransport(host: string, port: number, secure: boolean) {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: smtpUser, pass: smtpPass },
    requireTLS: smtpRequireTLS,
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'true',
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: isNetlify ? 6_000 : 12_000,
    greetingTimeout: isNetlify ? 6_000 : 12_000,
    socketTimeout: isNetlify ? 8_000 : 20_000,
    pool: false,
  } as SMTPTransport.Options)
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(Object.assign(new Error(`${label} timed out after ${ms}ms`), { code: 'ETIMEDOUT' })), ms)
    }),
  ])
}

async function sendViaResend(options: SendMailOptions) {
  if (!resendApiKey) throw new Error('RESEND_API_KEY not configured')

  const to = Array.isArray(options.to) ? options.to : [options.to]
  const payload: Record<string, unknown> = {
    from: options.from || CONTACT_FROM,
    to,
    subject: options.subject,
    html: options.html,
  }

  if (options.text) payload.text = options.text
  if (options.replyTo) payload.reply_to = options.replyTo
  if (options.attachments?.length) {
    payload.attachments = options.attachments.map((a) => ({
      filename: a.filename,
      content: a.content.toString('base64'),
    }))
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw Object.assign(new Error(`Resend: ${errText}`), { code: 'ERESEND' })
  }

  return res.json()
}

async function sendViaSmtp(options: SendMailOptions) {
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error('SMTP is not configured.')
  }

  const { host, port, secure } = getPrimarySmtpConfig()
  const transporter = createTransport(host, port, secure)

  return withTimeout(
    transporter.sendMail({
      from: options.from || CONTACT_FROM,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    }),
    SMTP_TIMEOUT_MS,
    'SMTP'
  )
}

export async function sendMail(options: SendMailOptions) {
  // HTTP API — fast & reliable on Netlify (no blocked SMTP ports)
  if (resendApiKey) {
    return sendViaResend(options)
  }

  return sendViaSmtp(options)
}

export const CONTACT_TO = stripEnvQuotes(process.env.CONTACT_TO) || 'info@siliconpk.com'
export const CONTACT_FROM =
  stripEnvQuotes(process.env.CONTACT_FROM) ||
  `"Silicon International" <${smtpUser || 'info@siliconpk.com'}>`
