'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/page-wrapper'
import { PageBanner } from '@/components/page-banner'
import { TrustedPartners } from '@/components/trusted-partners'
import {
  StudentTrainingFormFields,
  isStudentTrainingComplete,
} from '@/components/student-training-form-fields'
import { clearFormCache, initSession, loadFormCache, saveFormCache } from '@/lib/client-storage'
import { generateStudentSerialId } from '@/lib/generate-student-id'
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_WHATSAPP_URL,
} from '@/lib/site-contact'
import {
  STUDENT_TRAINING_SERVICE,
  buildStudentTrainingMessage,
  emptyStudentTrainingFields,
  isStudentTrainingService,
  type StudentTrainingFields,
} from '@/lib/student-training-data'
import { submitContactForm } from '@/lib/submit-contact'
import {
  FaLocationDot, FaPhone, FaEnvelope, FaWhatsapp, FaClock,
  FaFacebookF, FaInstagram,
  FaPaperPlane, FaUpload
} from 'react-icons/fa6'

const CONTACT_CACHE_KEY = 'silicon_contact_form_v2'
const SESSION_KEY = 'silicon_session_v1'

const contactInfo = [
  {
    icon: FaLocationDot,
    title: 'Visit Our Office',
    details: ['Office # 3 First Floor', 'Sarmad Center, Saddar','Karachi-74400, Pakistan.'],
  },
  {
    icon: FaPhone,
    title: 'Call Us',
    details: [SITE_PHONE_DISPLAY],
    link: `tel:${SITE_PHONE_TEL}`
  },
  {
    icon: FaEnvelope,
    title: 'Email Us',
    details: ['info@siliconpk.com', 'support@siliconpk.com'],
    link: 'mailto:info@siliconpk.com'
  },
  {
    icon: FaClock,
    title: 'Business Hours',
    details: ['Monday - Friday: 10AM - 9PM', 'Saturday: 11AM - 9PM'],
  },
]

const socialLinks = [
  { icon: FaWhatsapp, href: SITE_WHATSAPP_URL, label: 'WhatsApp', color: 'hover:bg-[#25D366]' },
  // { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
  // { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
]

const serviceOptions = [
  'PCB Design',
  'Industrial Card Repair',
  'Web Development',
  'Crane SLI Solutions',
  STUDENT_TRAINING_SERVICE,
  'Component Sourcing',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [studentFields, setStudentFields] = useState<StudentTrainingFields>(emptyStudentTrainingFields)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const isStudent = isStudentTrainingService(formData.service)

  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  }

  useEffect(() => {
    initSession(SESSION_KEY)
    const cached = loadFormCache<typeof formData>(CONTACT_CACHE_KEY)
    if (cached) setFormData(cached)

    const params = new URLSearchParams(window.location.search)
    const serviceParam = params.get('service')
    if (serviceParam === 'Student Training' || serviceParam === 'Student+Training') {
      setFormData((prev) => ({ ...prev, service: STUDENT_TRAINING_SERVICE }))
    }
  }, [])

  useEffect(() => {
    saveFormCache(CONTACT_CACHE_KEY, formData)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'service' && !isStudentTrainingService(value)) {
      setStudentFields(emptyStudentTrainingFields)
      setPaymentScreenshot(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isStudent && !isStudentTrainingComplete(studentFields, paymentScreenshot)) {
      setSubmitError('Please complete all Student Training fields including payment verification.')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    const studentId = isStudent ? generateStudentSerialId() : undefined
    const message =
      isStudent && !formData.message.trim()
        ? buildStudentTrainingMessage(studentFields)
        : formData.message

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: message || 'Contact inquiry',
        file,
        source: 'contact-page',
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
      clearFormCache(CONTACT_CACHE_KEY)
      setFormData(emptyForm)
      setFile(null)
      setStudentFields(emptyStudentTrainingFields)
      setPaymentScreenshot(null)

      if (result.studentId) {
        toast.success(
          `Enrollment submitted! Your Student ID is ${result.studentId}. Check your email for confirmation.`
        )
      } else {
        toast.success('Thank you! Silicon International will respond within 24 hours.')
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please email info@siliconpk.com directly.'
      setSubmitError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      <PageBanner 
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, quotes, or support"
        breadcrumbs={[{ name: 'Contact Us', href: '/contact' }]}
      />

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  className="p-6 bg-secondary/30 border border-border rounded-2xl hover:border-primary/50 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    info.link ? (
                      <a key={i} href={info.link} className="block text-muted-foreground hover:text-primary transition-colors">
                        {detail}
                      </a>
                    ) : (
                      <p key={i} className="text-muted-foreground">{detail}</p>
                    )
                  ))}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium mb-4">
                Send a Message
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {"Let's Discuss Your Project"}
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors" placeholder={SITE_PHONE_DISPLAY} />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors" placeholder="Your Company" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">Service Required *</label>
                    <select id="service" name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground focus:border-primary outline-none transition-colors">
                      <option value="">Select a service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  {/* <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground focus:border-primary outline-none transition-colors">
                      <option value="">Select budget</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-50000">$10,000 - $50,000</option>
                      <option value="over-50000">Over $50,000</option>
                    </select>
                  </div> */}
                </div>

                {isStudent && (
                  <StudentTrainingFormFields
                    fields={studentFields}
                    onChange={setStudentFields}
                    paymentScreenshot={paymentScreenshot}
                    onPaymentScreenshotChange={setPaymentScreenshot}
                    selectClassName="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground focus:border-primary outline-none transition-colors"
                    labelClassName="block text-sm font-medium text-foreground mb-2"
                    idPrefix="contact-st"
                  />
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {isStudent ? 'Additional Notes' : 'Project Details *'}
                  </label>
                  <textarea id="message" name="message" required={!isStudent} rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors resize-none" placeholder={isStudent ? 'Any additional notes (optional)' : 'Describe your project requirements...'} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Attach Files (Optional)</label>
                  <div className="relative">
                    <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.zip" />
                    <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary/30 border border-dashed border-border rounded-xl text-muted-foreground hover:border-primary hover:text-foreground cursor-pointer transition-colors">
                      <FaUpload className="w-4 h-4" />
                      {file ? file.name : 'Click to upload (PDF, DOC, images, ZIP)'}
                    </label>
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3" role="alert">
                    {submitError}
                  </p>
                )}

                <motion.button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors glow-primary" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden border border-border h-[400px]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.135518187447!2d67.02468879999999!3d24.8592207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33fd5863bab51%3A0x61d5784b788af717!2sSilicon%20International!5e0!3m2!1sen!2s!4v1780585228338!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Silicon International Location" />
              </div>

              <div className="p-6 bg-card border border-border rounded-2xl">
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Contact</h3>
                <p className="text-muted-foreground mb-6">Need immediate assistance? Reach out via WhatsApp.</p>
                <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#25D366]/90 transition-colors">
                  <FaWhatsapp className="w-6 h-6" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="p-6 bg-card border border-border rounded-2xl">
                <h3 className="text-xl font-bold text-foreground mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-transparent transition-all ${social.color}`} whileHover={{ y: -3 }} aria-label={social.label}>
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium mb-4">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {[
              { q: 'What is your typical turnaround time?', a: 'Turnaround times vary by project. PCB designs take 2-4 weeks, card repairs 3-7 days, and web development 4-12 weeks.' },
              { q: 'Do you offer emergency repair services?', a: 'Yes, we offer priority repair services with 24-48 hour turnaround for an additional fee.' },
              { q: 'What payment methods do you accept?', a: 'We accept bank transfers, credit/debit cards, and can arrange payment terms for large projects.' },
              { q: 'Do you provide warranty on repairs?', a: 'Yes, all repairs come with a 6-month warranty. Web development includes 3 months free maintenance.' },
            ].map((faq, index) => (
              <motion.div key={index} className="p-6 bg-secondary/30 border border-border rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <h3 className="text-lg font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustedPartners />
    </PageWrapper>
  )
}
