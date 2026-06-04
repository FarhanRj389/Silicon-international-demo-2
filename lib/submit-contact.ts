export type ContactFormSource = 'hero-banner' | 'contact-page' | 'website'

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
}

export async function submitContactForm(payload: ContactFormPayload) {
  const body = new FormData()
  body.append('name', payload.name)
  body.append('email', payload.email)
  body.append('service', payload.service)
  body.append('message', payload.message)
  body.append('source', payload.source)

  if (payload.phone?.trim()) {
    body.append('phone', payload.phone.trim())
  }

  if (payload.source === 'contact-page') {
    if (payload.company?.trim()) body.append('company', payload.company.trim())
    if (payload.budget?.trim()) body.append('budget', payload.budget.trim())
    if (payload.file) body.append('file', payload.file)
  }

  const res = await fetch('/api/contact', { method: 'POST', body })
  const data = (await res.json()) as { error?: string; success?: boolean }

  if (!res.ok) {
    throw new Error(data.error || 'Failed to send message.')
  }

  return data
}
