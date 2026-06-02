'use client'

import { useState, useEffect } from 'react'
import { clearFormCache, initSession, loadFormCache, saveFormCache } from '@/lib/client-storage'
import { submitContactForm } from '@/lib/submit-contact'

const CONTACT_CACHE_KEY = 'silicon_contact_form_v1'
const SESSION_KEY = 'silicon_session_v1'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/page-wrapper'
import { PageBanner } from '@/components/page-banner'
import { TrustedPartners } from '@/components/trusted-partners'
import { 
  FaLocationDot, FaPhone, FaEnvelope, FaWhatsapp, FaClock,
  FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram,
  FaPaperPlane, FaCircleCheck, FaUpload
} from 'react-icons/fa6'

const contactInfo = [
  {
    icon: FaLocationDot,
    title: 'Visit Our Office',
    details: ['Office #123, Tech Park', 'Johar Town, Lahore', 'Pakistan'],
  },
  {
    icon: FaPhone,
    title: 'Call Us',
    details: ['+92 344 227 9244', '+92 42 3521 0000'],
    link: 'tel:+923442279244'
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
    details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM'],
  },
]

const socialLinks = [
  { icon: FaWhatsapp, href: 'https://wa.me/923442279244', label: 'WhatsApp', color: 'hover:bg-[#25D366]' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
]

const serviceOptions = [
  'PCB Design',
  'Industrial Card Repair',
  'Web Development',
  'Crane SLI Solutions',
  'Component Sourcing',
  'Other'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    initSession(SESSION_KEY)
    const cached = loadFormCache<typeof formData>(CONTACT_CACHE_KEY)
    if (cached) setFormData(cached)
  }, [])

  useEffect(() => {
    if (!isSubmitted) {
      saveFormCache(CONTACT_CACHE_KEY, formData)
    }
  }, [formData, isSubmitted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitContactForm({
        ...formData,
        file,
        source: 'contact-page',
      })
      clearFormCache(CONTACT_CACHE_KEY)
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please email info@siliconpk.com directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <PageWrapper>
        <PageBanner 
          title="Contact Us"
          subtitle="Get in touch with our team"
          breadcrumbs={[{ name: 'Contact Us', href: '/contact' }]}
        />
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="max-w-xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <FaCircleCheck className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
              <p className="text-muted-foreground mb-8">
                Your message has been sent. We will respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
                  Back to Home
                </a>
                <a href="https://wa.me/923442279244" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg">
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageBanner 
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, quotes, or support"
        breadcrumbs={[{ name: 'Contact Us', href: '/contact' }]}
        videoSrc="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
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
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors" placeholder="+92 300 0000000" />
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
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground focus:border-primary outline-none transition-colors">
                      <option value="">Select budget</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-50000">$10,000 - $50,000</option>
                      <option value="over-50000">Over $50,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Project Details *</label>
                  <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors resize-none" placeholder="Describe your project requirements..." />
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27223.372!2d74.26862!3d31.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919040c98c3a3ed%3A0x9d12c93e05ff44e6!2sJohar%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Silicon International Location" />
              </div>

              <div className="p-6 bg-card border border-border rounded-2xl">
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Contact</h3>
                <p className="text-muted-foreground mb-6">Need immediate assistance? Reach out via WhatsApp.</p>
                <a href="https://wa.me/923442279244" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#25D366]/90 transition-colors">
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
