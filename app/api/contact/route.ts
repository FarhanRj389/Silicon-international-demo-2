import { NextResponse } from 'next/server'
import { appendSubmissionToExcel } from '@/lib/excel-submissions'
import { generateStudentSerialId } from '@/lib/generate-student-id'
import { CONTACT_FROM, CONTACT_TO, sendMail, isMailConfigured } from '@/lib/mail'
import { verifyRecaptcha } from '@/lib/recaptcha'
import {
  buildStudentCourseLabel,
  buildStudentTrainingMessage,
  getPaymentLabel,
  isStudentTrainingService,
} from '@/lib/student-training-data'

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
  'lead-form': 'Home Page — Get Started Form',
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

function buildEmailRows(
  source: string,
  data: Record<string, string>,
  isStudent: boolean
): Array<[string, string]> {
  const rows: Array<[string, string]> = []

  if (data.studentId) rows.push(['Student ID', data.studentId])
  rows.push(['Name', data.name], ['Email', data.email])

  if (data.phone) rows.push(['Phone', data.phone])

  if (source === 'contact-page' || source === 'lead-form') {
    if (data.company) rows.push(['Company', data.company])
  }

  rows.push(['Service', data.service])

  if (isStudent) {
    if (data.course) rows.push(['Course', data.course])
    if (data.classDays) rows.push(['Class Days', data.classDays])
    if (data.classTime) rows.push(['Class Time', data.classTime])
    if (data.paymentMethod) rows.push(['Payment Method', data.paymentMethod])
    rows.push(['Status', 'Waiting for Confirmation'])
  } else if (source === 'contact-page' && data.budget) {
    rows.push(['Budget', formatBudget(data.budget)])
  }

  rows.push(['Project Details', data.message])
  return rows
}

function buildStudentConfirmationEmail(data: {
  studentId: string
  name: string
  email: string
  phone: string
  course: string
  classDays: string
  classTime: string
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a56db;">Silicon International — Enrollment Received</h2>
      <p>Dear ${escapeHtml(data.name)},</p>
      <p>Thank you for enrolling in our <strong>Student Training</strong> program. Your application is <strong>waiting for confirmation</strong>.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Student ID</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.studentId)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Full Name</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.phone || '—')}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Course</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.course)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Class Days</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.classDays)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Class Time</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.classTime)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Status</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb; color: #d97706;">Waiting for Confirmation</td></tr>
      </table>
      <p>Our team will verify your payment and contact you shortly. Please save your Student ID for future reference.</p>
      <p style="color: #6b7280; font-size: 14px;">Silicon International | +92 370 917 2334 | info@siliconpk.com</p>
    </div>
  `

  const text = [
    'Silicon International — Enrollment Received',
    '',
    `Dear ${data.name},`,
    'Your Student Training application is waiting for confirmation.',
    '',
    `Student ID: ${data.studentId}`,
    `Full Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    `Course: ${data.course}`,
    `Class Days: ${data.classDays}`,
    `Class Time: ${data.classTime}`,
    'Status: Waiting for Confirmation',
  ].join('\n')

  return { html, text }
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
    let message = String(formData.get('message') || '').trim()
    const source = String(formData.get('source') || 'website').trim()
    const file = formData.get('file')

    const isStudent = isStudentTrainingService(service)
    const trainingCourse = String(formData.get('trainingCourse') || '').trim()
    const webDevTrack = String(formData.get('webDevTrack') || '').trim()
    const classDays = String(formData.get('classDays') || '').trim()
    const classTime = String(formData.get('classTime') || '').trim()
    const paymentMethod = String(formData.get('paymentMethod') || '').trim()
    const captchaToken = String(formData.get('captchaToken') || '').trim()
    const paymentScreenshot = formData.get('paymentScreenshot')
    let studentId = String(formData.get('studentId') || '').trim()

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    if (!isStudent && !message) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (isStudent) {
      if (!trainingCourse || !classDays || !classTime || !paymentMethod) {
        return NextResponse.json(
          { error: 'Please complete all Student Training enrollment fields.' },
          { status: 400 }
        )
      }

      if (trainingCourse === 'Web Development' && !webDevTrack) {
        return NextResponse.json(
          { error: 'Please select a Web Development specialization.' },
          { status: 400 }
        )
      }

      const dayCount = classDays.split(',').filter(Boolean).length
      if (dayCount !== 2) {
        return NextResponse.json(
          { error: 'Please select exactly 2 class days per week.' },
          { status: 400 }
        )
      }

      if (process.env.RECAPTCHA_SECRET_KEY) {
        if (!captchaToken) {
          return NextResponse.json({ error: 'Please complete the reCAPTCHA verification.' }, { status: 400 })
        }
        const validCaptcha = await verifyRecaptcha(captchaToken)
        if (!validCaptcha) {
          return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 })
        }
      }

      if (!(paymentScreenshot instanceof File) || paymentScreenshot.size === 0) {
        return NextResponse.json(
          { error: 'Please upload your payment screenshot.' },
          { status: 400 }
        )
      }

      if (paymentScreenshot.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Payment screenshot must be under 5MB.' }, { status: 400 })
      }

      const stFields = {
        trainingCourse,
        webDevTrack,
        classDays: classDays.split(',').map((d) => d.trim()),
        classTime,
        paymentMethod,
      }

      if (!message) {
        message = buildStudentTrainingMessage(stFields)
      }
    }

    if (!studentId) {
      studentId = generateStudentSerialId()
    }

    const course = isStudent
      ? buildStudentCourseLabel({
          trainingCourse,
          webDevTrack,
          classDays: classDays.split(',').map((d) => d.trim()),
          classTime,
          paymentMethod,
        })
      : ''

    const attachments: { filename: string; content: Buffer }[] = []

    if ((source === 'contact-page' || source === 'lead-form') && file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Attachment must be under 5MB.' }, { status: 400 })
      }
      attachments.push({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })
    }

    if (isStudent && paymentScreenshot instanceof File && paymentScreenshot.size > 0) {
      attachments.push({
        filename: `payment-${studentId}-${paymentScreenshot.name}`,
        content: Buffer.from(await paymentScreenshot.arrayBuffer()),
      })
    }

    const fieldData = {
      studentId: isStudent ? studentId : '',
      name,
      email,
      phone,
      company: source === 'contact-page' || source === 'lead-form' ? company : '',
      service,
      course,
      classDays: isStudent ? classDays : '',
      classTime: isStudent ? classTime : '',
      paymentMethod: isStudent ? getPaymentLabel(paymentMethod) : '',
      budget: source === 'contact-page' ? budget : '',
      message,
    }

    const rows = buildEmailRows(source, fieldData, isStudent)
    const sourceLabel = SOURCE_LABELS[source] || 'Silicon International Website'

    const htmlRows = rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`
      )
      .join('')

    const adminHtml = `
      <h2>New inquiry — Silicon International</h2>
      <p><strong>Form:</strong> ${escapeHtml(sourceLabel)}</p>
      ${htmlRows}
    `

    const adminText = [`Form: ${sourceLabel}`, ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n')

    await sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Silicon International] ${isStudent ? `Student Training (${studentId})` : service} — ${name}`,
      html: adminHtml,
      text: adminText,
      attachments,
    })

    if (isStudent) {
      try {
        const confirmation = buildStudentConfirmationEmail({
          studentId,
          name,
          email,
          phone,
          course,
          classDays,
          classTime,
        })

        await sendMail({
          from: CONTACT_FROM,
          to: email,
          subject: `[Silicon International] Enrollment Received — ${studentId}`,
          html: confirmation.html,
          text: confirmation.text,
        })
      } catch (confirmError) {
        console.error('Student confirmation email error:', confirmError)
      }
    }

    try {
      await appendSubmissionToExcel({
        studentId: isStudent ? studentId : '',
        submittedAt: new Date().toISOString(),
        source: sourceLabel,
        fullName: name,
        email,
        phone,
        company: fieldData.company,
        service,
        course,
        classDays: isStudent ? classDays : '',
        classTime: isStudent ? classTime : '',
        paymentMethod: isStudent ? getPaymentLabel(paymentMethod) : '',
        message,
        status: isStudent ? 'Waiting for Confirmation' : 'New Inquiry',
      })
    } catch (excelError) {
      console.error('Excel save error:', excelError)
    }

    return NextResponse.json({ success: true, studentId: isStudent ? studentId : undefined })
  } catch (error) {
    const err = error as Error & { code?: string; responseCode?: number }
    console.error('Contact form error:', err.message, err.code || '')

    const isSmtpError =
      err.code === 'ECONNECTION' ||
      err.code === 'ETIMEDOUT' ||
      err.code === 'ESOCKET' ||
      err.code === 'EAUTH' ||
      err.responseCode === 535

    return NextResponse.json(
      {
        error: isSmtpError
          ? 'Email server connection failed. Please call +92 370 917 2334 or email info@siliconpk.com directly.'
          : 'Failed to send message. Please try again or email info@siliconpk.com directly.',
      },
      { status: 500 }
    )
  }
}
