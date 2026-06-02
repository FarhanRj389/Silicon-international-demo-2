'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaCircleCheck } from 'react-icons/fa6'
import { clearFormCache, initSession, loadFormCache, saveFormCache } from '@/lib/client-storage'
import { submitContactForm } from '@/lib/submit-contact'

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
  const [form, setForm] = useState<HeroFormData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initSession(SESSION_KEY)
    const cached = loadFormCache<HeroFormData>(CACHE_KEY)
    if (cached) setForm(cached)
  }, [])

  useEffect(() => {
    if (!isSubmitted) {
      saveFormCache(CACHE_KEY, form)
    }
  }, [form, isSubmitted])

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
        ...form,
        service: form.service || 'General Inquiry',
        source: 'hero-banner',
      })
      setIsSubmitted(true)
      clearFormCache(CACHE_KEY)
      setForm(emptyForm)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not send. Email info@siliconpk.com directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-card/95 backdrop-blur border border-border text-center"
      >
        <FaCircleCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Our team will respond within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="text-sm text-primary font-semibold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="p-6 md:p-8 rounded-2xl bg-card/95 backdrop-blur border border-border shadow-xl"
    >
      <h3 className="text-lg font-bold text-foreground mb-1">Quick Inquiry</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Get a quote — saved on this device for 1 week.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name *"
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
        />
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="Email *"
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
        />
        <select
          name="service"
          required
          value={form.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none"
        >
          <option value="">Service Required *</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <textarea
          name="message"
          required
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Your project details *"
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none resize-none"
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
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
