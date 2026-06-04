'use client'

import { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { clearFormCache, initSession, loadFormCache, saveFormCache } from '@/lib/client-storage'
import { submitContactForm } from '@/lib/submit-contact'
import {
  clearContactProduct,
  getContactProduct,
  mapProductToServiceValue,
} from '@/lib/contact-form-utils'

const CACHE_KEY = 'silicon_hero_form_v1'
const SESSION_KEY = 'silicon_session_v1'

const serviceOptions = [
  'PCB Design',
  'Industrial Card Repair',
  'Crane SLI Solutions',
  'Web Development',
  'General Inquiry',
]

type HeroFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const emptyForm: HeroFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

export function HeroContactForm() {
  const formId = useId()
  const [form, setForm] = useState<HeroFormData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initSession(SESSION_KEY)
    const cached = loadFormCache<HeroFormData>(CACHE_KEY)
    if (cached) setForm(cached)

    const applyProduct = (product: string) => {
      const mapped = mapProductToServiceValue(product)
      let service = product
      if (mapped === 'sli') service = product.includes('SLI') ? product : 'Crane SLI Solutions'
      else if (mapped === 'web') service = 'Web Development'
      else if (mapped === 'pcb') service = 'PCB Design'
      else if (mapped === 'repair') service = 'Industrial Card Repair'
      setForm((prev) => ({
        ...prev,
        service,
        message: prev.message
          ? prev.message
          : `Interested in: ${product}\n\nPlease share specifications.`,
      }))
      clearContactProduct()
    }

    const stored = getContactProduct()
    if (stored) applyProduct(stored)

    const onProduct = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) applyProduct(detail)
    }
    window.addEventListener('silicon:contact-product', onProduct)

    const params = new URLSearchParams(window.location.search)
    const product = params.get('product')
    if (product) applyProduct(product)

    return () => window.removeEventListener('silicon:contact-product', onProduct)
  }, [])

  useEffect(() => {
    saveFormCache(CACHE_KEY, form)
  }, [form])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service || 'General Inquiry',
        message: form.message,
        source: 'hero-banner',
      })
      clearFormCache(CACHE_KEY)
      setForm(emptyForm)
      toast.success('Thank you! Silicon International will respond within 24 hours.')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not send. Email info@siliconpk.com directly.'
      setError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="p-6 md:p-8 rounded-2xl bg-card/95 backdrop-blur border border-border shadow-xl"
      aria-labelledby={`${formId}-title`}
    >
      <h3 id={`${formId}-title`} className="text-lg font-bold text-foreground mb-1">
        Quick Inquiry
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Get a quote saved on this device for 1 week.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">
            Full Name
          </label>
          <input
            type="text"
            id={`${formId}-name`}
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="sr-only">
            Email
          </label>
          <input
            type="email"
            id={`${formId}-email`}
            name="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email *"
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="sr-only">
            Phone
          </label>
          <input
            type="tel"
            id={`${formId}-phone`}
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-service`} className="sr-only">
            Service Required
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            aria-label="Service Required"
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
          >
            <option value="">Service Required *</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${formId}-message`} className="sr-only">
            Project details
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Your project details *"
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none resize-none"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px]"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  )
}
