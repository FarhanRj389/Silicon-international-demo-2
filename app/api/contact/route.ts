import { NextResponse } from 'next/server'
import { CONTACT_FROM, CONTACT_TO, getMailTransporter, isMailConfigured } from '@/lib/mail'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

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
    const source = String(formData.get('source') || 'contact-page').trim()
    const file = formData.get('file')

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const attachments: { filename: string; content: Buffer }[] = []
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Attachment must be under 5MB.' }, { status: 400 })
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename: file.name, content: buffer })
    }

    const transporter = getMailTransporter()

    const html = `
      <h2>New contact form submission — Silicon International</h2>
      <p><strong>Source:</strong> ${escapeHtml(source)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || '—')}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget || '—')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `

    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[${source}] ${service} — ${name}`,
      html,
      text: [
        `Source: ${source}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        `Company: ${company || '—'}`,
        `Service: ${service}`,
        `Budget: ${budget || '—'}`,
        '',
        message,
      ].join('\n'),
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
