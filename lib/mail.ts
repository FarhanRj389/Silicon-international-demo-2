import nodemailer from 'nodemailer'

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

export function isMailConfigured() {
  return Boolean(smtpHost && smtpUser && smtpPass)
}

export function getMailTransporter() {
  if (!isMailConfigured()) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in environment variables.')
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })
}

export const CONTACT_TO = process.env.CONTACT_TO || 'info@siliconpk.com'
export const CONTACT_FROM =
  process.env.CONTACT_FROM || `"Silicon International" <${smtpUser || 'noreply@siliconpk.com'}>`
