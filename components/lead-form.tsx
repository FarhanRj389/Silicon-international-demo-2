'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaPaperPlane, FaUpload, FaCircleCheck } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  StudentTrainingFormFields,
  isStudentTrainingComplete,
} from '@/components/student-training-form-fields'
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

const CACHE_KEY = 'silicon_lead_form_v1'
const SESSION_KEY = 'silicon_session_v1'

const serviceOptions = [
  { value: 'pcb', label: 'PCB Design & Manufacturing' },
  { value: 'repair', label: 'Industrial Card Repair' },
  { value: 'web', label: 'Web & App Development' },
  { value: 'sli', label: 'Crane SLI Solutions' },
  { value: 'student-training', label: STUDENT_TRAINING_SERVICE },
  { value: 'consultation', label: 'Onsite Consultation' },
]

const serviceValueToLabel: Record<string, string> = {
  pcb: 'PCB Design',
  repair: 'Industrial Card Repair',
  web: 'Web Development',
  sli: 'Crane SLI Solutions',
  'student-training': STUDENT_TRAINING_SERVICE,
  consultation: 'Onsite Consultation',
}

function applyProductToForm(
  product: string,
  setService: (v: string) => void,
  setProjectDetails: (v: string | ((p: string) => string)) => void
) {
  const mapped = mapProductToServiceValue(product)
  if (mapped) setService(mapped)
  setProjectDetails((prev) =>
    prev.includes(product) ? prev : `Interested in: ${product}\n\n${prev}`.trim()
  )
  clearContactProduct()
}

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedStudentId, setSubmittedStudentId] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const [studentFields, setStudentFields] = useState<StudentTrainingFields>(emptyStudentTrainingFields)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isStudent = service === 'student-training'

  useEffect(() => {
    initSession(SESSION_KEY)
    const cached = loadFormCache<{
      name: string
      company: string
      email: string
      phone: string
      service: string
      projectDetails: string
    }>(CACHE_KEY)
    if (cached) {
      setName(cached.name)
      setCompany(cached.company)
      setEmail(cached.email)
      setPhone(cached.phone)
      setService(cached.service)
      setProjectDetails(cached.projectDetails)
    }

    const stored = getContactProduct()
    if (stored) applyProductToForm(stored, setService, setProjectDetails)

    const onProduct = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) applyProductToForm(detail, setService, setProjectDetails)
    }
    window.addEventListener('silicon:contact-product', onProduct)

    const params = new URLSearchParams(window.location.search)
    const product = params.get('product')
    if (product) applyProductToForm(product, setService, setProjectDetails)

    const serviceParam = params.get('service')
    if (serviceParam === 'Student Training' || serviceParam === 'Student+Training') {
      setService('student-training')
    }

    return () => window.removeEventListener('silicon:contact-product', onProduct)
  }, [])

  useEffect(() => {
    saveFormCache(CACHE_KEY, { name, company, email, phone, service, projectDetails })
  }, [name, company, email, phone, service, projectDetails])

  const handleServiceChange = (value: string) => {
    setService(value)
    if (value !== 'student-training') {
      setStudentFields(emptyStudentTrainingFields)
      setPaymentScreenshot(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isStudent && !isStudentTrainingComplete(studentFields, paymentScreenshot)) {
      setError('Please complete all Student Training fields including payment verification.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const serviceLabel = serviceValueToLabel[service] || service
    const studentId = isStudent ? generateStudentSerialId() : undefined
    const message =
      isStudent && !projectDetails.trim()
        ? buildStudentTrainingMessage(studentFields)
        : projectDetails || 'Project inquiry'

    try {
      const result = await submitContactForm({
        name,
        email,
        phone,
        company,
        service: serviceLabel,
        message,
        file,
        source: 'lead-form',
        studentId,
        studentTraining: isStudent
          ? {
              trainingCourse: studentFields.trainingCourse,
              webDevTrack: studentFields.webDevTrack,
              classDays: studentFields.classDays,
              classTime: studentFields.classTime,
              paymentMethod: studentFields.paymentMethod,
              paymentScreenshot,
            }
          : undefined,
      })

      clearFormCache(CACHE_KEY)
      setName('')
      setCompany('')
      setEmail('')
      setPhone('')
      setService('')
      setProjectDetails('')
      setFile(null)
      setFileName(null)
      setStudentFields(emptyStudentTrainingFields)
      setPaymentScreenshot(null)
      setSubmittedStudentId(result.studentId ?? null)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setSubmittedStudentId(null)
      }, 8000)

      if (result.studentId) {
        toast.success(`Enrollment submitted! Student ID: ${result.studentId}`)
      } else {
        toast.success('Request submitted! We will contact you within 24 hours.')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 circuit-grid opacity-20" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
                Let&apos;s Build Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Next Project
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 text-pretty">
                Whether you need PCB design, industrial repair, student training, or custom software —
                our team is ready to help. Call {SITE_PHONE_DISPLAY}.
              </p>

              <div className="space-y-4">
                {[
                  'Free initial consultation',
                  'Student Training with flexible schedule',
                  'Dedicated project manager',
                  'Secure file handling',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <FaCircleCheck className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <FaCircleCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Request Submitted!</h3>
                    {submittedStudentId ? (
                      <p className="text-muted-foreground">
                        Your Student ID is <strong className="text-foreground">{submittedStudentId}</strong>.
                        Check your email for confirmation.
                      </p>
                    ) : (
                      <p className="text-muted-foreground">Our team will contact you within 24 hours.</p>
                    )}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                        <Input
                          type="text"
                          placeholder="Your Company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input
                        type="tel"
                        placeholder={SITE_PHONE_DISPLAY}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Service Required *</label>
                      <select
                        value={service}
                        required
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isStudent && (
                      <StudentTrainingFormFields
                        fields={studentFields}
                        onChange={setStudentFields}
                        paymentScreenshot={paymentScreenshot}
                        onPaymentScreenshotChange={setPaymentScreenshot}
                        selectClassName="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary focus:outline-none"
                        labelClassName="block text-sm font-medium text-foreground mb-2"
                        idPrefix="lead-st"
                      />
                    )}

                    {!isStudent && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Upload Requirements</label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                          />
                          <div className="flex items-center justify-center gap-2 px-4 py-6 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                            <FaUpload className="w-5 h-5 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {fileName || 'Drop files or click to upload'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {isStudent ? 'Additional Notes' : 'Project Details'}
                      </label>
                      <textarea
                        rows={4}
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder={
                          isStudent
                            ? 'Any additional notes (optional)'
                            : 'Tell us about your project requirements...'
                        }
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500" role="alert">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-base font-semibold glow-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
