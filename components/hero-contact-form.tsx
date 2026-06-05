'use client'

import { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { clearFormCache, initSession, loadFormCache, saveFormCache } from '@/lib/client-storage'
import {
  clearContactProduct,
  getContactProduct,
  mapProductToServiceValue,
} from '@/lib/contact-form-utils'
import { generateStudentSerialId } from '@/lib/generate-student-id'
import { SITE_PHONE_DISPLAY } from '@/lib/site-contact'
import {
  STUDENT_TRAINING_SERVICE,
  buildStudentTrainingMessage,
  emptyStudentTrainingFields,
  isStudentTrainingService,
  type StudentTrainingFields,
} from '@/lib/student-training-data'
import { submitContactForm } from '@/lib/submit-contact'
import {
  StudentTrainingFormFields,
  isStudentTrainingComplete,
} from '@/components/student-training-form-fields'

const CACHE_KEY = 'silicon_hero_form_v2'
const SESSION_KEY = 'silicon_session_v1'

const serviceOptions = [
  'PCB Design',
  'Industrial Card Repair',
  'Crane SLI Solutions',
  'Web Development',
  STUDENT_TRAINING_SERVICE,
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
  const [studentFields, setStudentFields] = useState<StudentTrainingFields>(emptyStudentTrainingFields)
  const [captchaToken, setCaptchaToken] = useState('')
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isStudent = isStudentTrainingService(form.service)

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

    const serviceParam = params.get('service')
    if (serviceParam === 'Student Training' || serviceParam === 'Student+Training') {
      setForm((prev) => ({ ...prev, service: STUDENT_TRAINING_SERVICE }))
    }

    return () => window.removeEventListener('silicon:contact-product', onProduct)
  }, [])

  useEffect(() => {
    saveFormCache(CACHE_KEY, form)
  }, [form])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'service' && !isStudentTrainingService(value)) {
        setStudentFields(emptyStudentTrainingFields)
        setCaptchaToken('')
        setPaymentScreenshot(null)
      }
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isStudent && !isStudentTrainingComplete(studentFields, captchaToken, paymentScreenshot)) {
      setError('Please complete all Student Training fields including payment verification.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const studentId = isStudent ? generateStudentSerialId() : undefined
    const message =
      isStudent && !form.message.trim()
        ? buildStudentTrainingMessage(studentFields)
        : form.message

    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service || 'General Inquiry',
        message: message || 'General inquiry',
        source: 'hero-banner',
        studentId,
        studentTraining: isStudent
          ? {
              trainingCourse: studentFields.trainingCourse,
              webDevTrack: studentFields.webDevTrack,
              classDays: studentFields.classDays,
              classTime: studentFields.classTime,
              paymentMethod: studentFields.paymentMethod,
              captchaToken,
              paymentScreenshot,
            }
          : undefined,
      })
      clearFormCache(CACHE_KEY)
      setForm(emptyForm)
      setStudentFields(emptyStudentTrainingFields)
      setCaptchaToken('')
      setPaymentScreenshot(null)

      if (result.studentId) {
        toast.success(
          `Enrollment submitted! Your Student ID is ${result.studentId}. Check your email for confirmation.`
        )
      } else {
        toast.success('Thank you! Silicon International will respond within 24 hours.')
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Could not send. Email info@siliconpk.com directly.'
      setError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none'

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
        Get a quote saved on this device for 1 week. Call {SITE_PHONE_DISPLAY}
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
            className={inputClass}
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
            className={inputClass}
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
            placeholder={`Phone (${SITE_PHONE_DISPLAY})`}
            className={inputClass}
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
            className={inputClass}
          >
            <option value="">Service Required *</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {isStudent && (
          <StudentTrainingFormFields
            fields={studentFields}
            onChange={setStudentFields}
            captchaToken={captchaToken}
            onCaptchaChange={(token) => setCaptchaToken(token || '')}
            paymentScreenshot={paymentScreenshot}
            onPaymentScreenshotChange={setPaymentScreenshot}
            selectClassName={inputClass}
            labelClassName="block text-sm font-medium text-foreground mb-2"
            idPrefix="hero-st"
          />
        )}

        <div>
          <label htmlFor={`${formId}-message`} className="sr-only">
            Project details
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required={!isStudent}
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder={isStudent ? 'Additional notes (optional)' : 'Your project details *'}
            className={`${inputClass} resize-none`}
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
