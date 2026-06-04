import { NextResponse } from 'next/server'
import { CONTACT_FROM, CONTACT_TO, getMailTransporter, isMailConfigured } from '@/lib/mail'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const BUDGET_LABELS: Record<string, string> = {
  'under-1000': 'Under $1,000',
  '1000-5000': '$1,000 - $5,000',
  '5000-10000': '$5,000 - $10,000',
  '10000-50000': '$10,000 - $50,000',
  'over-50000': 'Over $50,000',
}

const SOURCE_LABELS: Record<string, string> = {
  'hero-banner': 'Home Page — Quick Inquiry',
  'contact-page': 'Contact Page',
  website: 'Website',
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatBudget(value: string) {
  return BUDGET_LABELS[value] || value
}

function buildEmailRows(source: string, data: Record<string, string>): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
  ]

  if (data.phone) rows.push(['Phone', data.phone])

  if (source === 'contact-page') {
    if (data.company) rows.push(['Company', data.company])
    rows.push(['Service', data.service])
    if (data.budget) rows.push(['Budget', formatBudget(data.budget)])
  } else {
    rows.push(['Service', data.service])
  }

  rows.push(['Project Details', data.message])
  return rows
}

export async function POST(request: Request) {
  try {
    if (!isMailConfigured()) {
      return NextResponse.json(
        { error: 'Email service is not configured on the server yet.' },
        { status: 503 }
      )
    }

    const formData = await request.formData()

    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const company = String(formData.get('company') || '').trim()
    const service = String(formData.get('service') || '').trim()
    const budget = String(formData.get('budget') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const source = String(formData.get('source') || 'website').trim()
    const file = formData.get('file')

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const attachments: { filename: string; content: Buffer }[] = []
    if (source === 'contact-page' && file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Attachment must be under 5MB.' }, { status: 400 })
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename: file.name, content: buffer })
    }

    const fieldData = {
      name,
      email,
      phone,
      company: source === 'contact-page' ? company : '',
      service,
      budget: source === 'contact-page' ? budget : '',
      message,
    }

    const rows = buildEmailRows(source, fieldData)
    const sourceLabel = SOURCE_LABELS[source] || 'Silicon International Website'
    const transporter = getMailTransporter()

    const htmlRows = rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`
      )
      .join('')

    const html = `
      <h2>New inquiry — Silicon International</h2>
      <p><strong>Form:</strong> ${escapeHtml(sourceLabel)}</p>
      ${htmlRows}
    `

    const text = [`Form: ${sourceLabel}`, ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n')

    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Silicon International] ${service} — ${name}`,
      html,
      text,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email info@siliconpk.com directly.' },
      { status: 500 }
    )
  }
}
