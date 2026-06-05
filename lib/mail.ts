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
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465

const fallbackHost = stripEnvQuotes(process.env.SMTP_FALLBACK_HOST)
const fallbackPort = Number(process.env.SMTP_FALLBACK_PORT || 587)
const fallbackSecure = process.env.SMTP_FALLBACK_SECURE === 'true' || fallbackPort === 465

export function isMailConfigured() {
  return Boolean(smtpHost && smtpUser && smtpPass)
}

function createTransport(host: string, port: number, secure: boolean) {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      // cPanel mail servers often use self-signed certificates
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'true',
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
    pool: false,
  } as SMTPTransport.Options)
}

let cachedTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null = null

export function getMailTransporter() {
  if (!isMailConfigured()) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in environment variables.')
  }

  if (!cachedTransporter) {
    cachedTransporter = createTransport(smtpHost, smtpPort, smtpSecure)
  }

  return cachedTransporter
}

function isConnectionError(error: unknown): boolean {
  const err = error as Error & { code?: string }
  return (
    err.code === 'ECONNECTION' ||
    err.code === 'ETIMEDOUT' ||
    err.code === 'ESOCKET' ||
    err.code === 'ECONNREFUSED'
  )
}

export async function sendMail(
  options: nodemailer.SendMailOptions
): Promise<nodemailer.SentMessageInfo> {
  const mailOptions = { ...options, from: options.from || CONTACT_FROM }

  try {
    return await getMailTransporter().sendMail(mailOptions)
  } catch (error) {
    if (!fallbackHost || !isConnectionError(error)) throw error

    console.warn(`Primary SMTP (${smtpHost}) failed, trying fallback (${fallbackHost})...`)
    const fallback = createTransport(fallbackHost, fallbackPort, fallbackSecure)
    return fallback.sendMail(mailOptions)
  }
}

export const CONTACT_TO = stripEnvQuotes(process.env.CONTACT_TO) || 'info@siliconpk.com'
export const CONTACT_FROM =
  stripEnvQuotes(process.env.CONTACT_FROM) ||
  `"Silicon International" <${smtpUser || 'info@siliconpk.com'}>`
