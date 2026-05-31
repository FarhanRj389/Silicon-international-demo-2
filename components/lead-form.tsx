'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaPaperPlane, FaUpload, FaCircleCheck } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 circuit-grid opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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
                Whether you need PCB design, industrial repair services, or custom software solutions — 
                our team is ready to help. Upload your requirements or schedule an onsite consultation.
              </p>

              <div className="space-y-4">
                {[
                  'Free initial consultation',
                  'Quick turnaround quotes',
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

            {/* Form */}
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
                    <p className="text-muted-foreground">Our team will contact you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <Input 
                          type="text" 
                          placeholder="John Doe" 
                          required 
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                        <Input 
                          type="text" 
                          placeholder="Your Company" 
                          className="bg-secondary/50 border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input 
                        type="email" 
                        placeholder="john@company.com" 
                        required 
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input 
                        type="tel" 
                        placeholder="+92 300 1234567" 
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Service Required</label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                        <option value="">Select a service</option>
                        <option value="pcb">PCB Design & Manufacturing</option>
                        <option value="repair">Industrial Card Repair</option>
                        <option value="web">Web & App Development</option>
                        <option value="sli">Crane SLI Solutions</option>
                        <option value="consultation">Onsite Consultation</option>
                      </select>
                    </div>

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

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Project Details</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project requirements..."
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-6 text-base font-semibold glow-primary"
                    >
                      <FaPaperPlane className="w-4 h-4 mr-2" />
                      Submit Request
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
