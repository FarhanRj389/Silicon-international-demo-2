export type ContactFormSource = 'hero-banner' | 'contact-page' | 'lead-form' | 'website'

export type StudentTrainingPayload = {
  trainingCourse: string
  webDevTrack?: string
  classDays: string[]
  classTime: string
  paymentMethod: string
  paymentScreenshot?: File | null
}

export type ContactFormPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  budget?: string
  message: string
  source: ContactFormSource
  file?: File | null
  studentTraining?: StudentTrainingPayload
  studentId?: string
}

export type ContactFormResponse = {
  success?: boolean
  error?: string
  studentId?: string
}

export async function submitContactForm(payload: ContactFormPayload): Promise<ContactFormResponse> {
  const body = new FormData()
  body.append('name', payload.name)
  body.append('email', payload.email)
  body.append('service', payload.service)
  body.append('message', payload.message)
  body.append('source', payload.source)

  if (payload.phone?.trim()) {
    body.append('phone', payload.phone.trim())
  }

  if (payload.studentId) {
    body.append('studentId', payload.studentId)
  }

  if (payload.studentTraining) {
    const st = payload.studentTraining
    body.append('trainingCourse', st.trainingCourse)
    if (st.webDevTrack) body.append('webDevTrack', st.webDevTrack)
    body.append('classDays', st.classDays.join(', '))
    body.append('classTime', st.classTime)
    body.append('paymentMethod', st.paymentMethod)
    if (st.paymentScreenshot) body.append('paymentScreenshot', st.paymentScreenshot)
  }

  if (payload.source === 'contact-page' || payload.source === 'lead-form') {
    if (payload.company?.trim()) body.append('company', payload.company.trim())
    if (payload.budget?.trim()) body.append('budget', payload.budget.trim())
    if (payload.file) body.append('file', payload.file)
  }

  const res = await fetch('/api/contact', { method: 'POST', body })
  const data = (await res.json()) as ContactFormResponse

  if (!res.ok) {
    throw new Error(data.error || 'Failed to send message.')
  }

  return data
}
