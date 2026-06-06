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

const isNetlify = process.env.NETLIFY === 'true'

export function isMailConfigured() {
  return Boolean(smtpHost && smtpUser && smtpPass)
}

type SmtpConfig = { host: string; port: number; secure: boolean; label: string }

function getSmtpConfigs(): SmtpConfig[] {
  if (!smtpHost) return []

  const configs: SmtpConfig[] = []
  const seen = new Set<string>()

  const add = (host: string, port: number, secure: boolean, label: string) => {
    const key = `${host}:${port}:${secure}`
    if (seen.has(key)) return
    seen.add(key)
    configs.push({ host, port, secure, label })
  }

  add(smtpHost, smtpPort, smtpSecure, 'primary')

  // Cloud hosts (Netlify) work best with STARTTLS on 587
  if (smtpPort !== 587) add(smtpHost, 587, false, 'starttls-587')
  if (smtpPort !== 465) add(smtpHost, 465, true, 'ssl-465')

  const fallbackHost = stripEnvQuotes(process.env.SMTP_FALLBACK_HOST)
  const fallbackPort = Number(process.env.SMTP_FALLBACK_PORT || 587)
  const fallbackSecure =
    process.env.SMTP_FALLBACK_SECURE === 'true' || fallbackPort === 465

  // localhost only works on same-server hosting (cPanel), not on Netlify
  if (fallbackHost && (!isNetlify || !['127.0.0.1', 'localhost'].includes(fallbackHost))) {
    add(fallbackHost, fallbackPort, fallbackSecure, 'fallback')
  }

  return configs
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
    requireTLS: !secure && port === 587,
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'true',
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 25_000,
    pool: false,
  } as SMTPTransport.Options)
}

export function getMailTransporter() {
  if (!isMailConfigured()) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in environment variables.')
  }

  const primary = getSmtpConfigs()[0]
  return createTransport(primary.host, primary.port, primary.secure)
}

function isRetryableError(error: unknown): boolean {
  const err = error as Error & { code?: string; responseCode?: number }
  return (
    err.code === 'ECONNECTION' ||
    err.code === 'ETIMEDOUT' ||
    err.code === 'ESOCKET' ||
    err.code === 'ECONNREFUSED' ||
    err.code === 'EAUTH' ||
    err.responseCode === 535 ||
    err.responseCode === 454
  )
}

export async function sendMail(
  options: nodemailer.SendMailOptions
): Promise<nodemailer.SentMessageInfo> {
  const mailOptions = { ...options, from: options.from || CONTACT_FROM }
  const configs = getSmtpConfigs()

  if (configs.length === 0) {
    throw new Error('SMTP is not configured.')
  }

  let lastError: unknown

  for (const config of configs) {
    try {
      const transporter = createTransport(config.host, config.port, config.secure)
      const info = await transporter.sendMail(mailOptions)
      if (config.label !== 'primary') {
        console.info(`Email sent via SMTP ${config.label} (${config.host}:${config.port})`)
      }
      return info
    } catch (error) {
      lastError = error
      const err = error as Error
      console.warn(`SMTP ${config.label} (${config.host}:${config.port}) failed:`, err.message)
      if (!isRetryableError(error)) throw error
    }
  }

  throw lastError
}

export const CONTACT_TO = stripEnvQuotes(process.env.CONTACT_TO) || 'info@siliconpk.com'
export const CONTACT_FROM =
  stripEnvQuotes(process.env.CONTACT_FROM) ||
  `"Silicon International" <${smtpUser || 'info@siliconpk.com'}>`
