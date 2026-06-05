'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaMicrochip,
  FaWrench,
  FaLaptopCode,
  FaTowerBroadcast,
  FaGraduationCap,
  FaArrowRight,
} from 'react-icons/fa6'

const services = [
  {
    icon: FaMicrochip,
    title: 'PCB Design & Manufacturing',
    description: 'Custom PCB design, prototyping, and high-volume manufacturing with precision assembly.',
    features: ['Multi-layer PCBs', 'SMD Assembly', 'HDI & Impedance Control', 'DFM Review'],
    color: 'from-blue-500 to-cyan-500',
    href: '/services/pcb',
    learnLabel: 'PCB Design',
  },
  {
    icon: FaWrench,
    title: 'Industrial Card Repair',
    description: 'Expert repair and refurbishment of industrial control cards, PLCs, and drives.',
    features: ['PLC Repair', 'VFD & Servo Drives', 'Emergency Repair', 'All Major Brands'],
    color: 'from-emerald-500 to-teal-500',
    href: '/services/card-repair',
    learnLabel: 'Card Repair',
  },
  {
    icon: FaLaptopCode,
    title: 'Web & App Development',
    description: 'Modern web apps, e-commerce, SaaS platforms, AI automation, and mobile solutions.',
    features: ['React & Next.js', 'Shopify & WordPress', 'AI & N8N Automation', 'Mobile Apps'],
    color: 'from-violet-500 to-purple-500',
    href: '/services/web-dev',
    learnLabel: 'Web & Apps',
  },
  {
    icon: FaTowerBroadcast,
    title: 'Crane SLI Solutions',
    description: 'Safe Load Indicators and crane monitoring systems for industrial safety compliance.',
    features: ['Load Monitoring', 'Anti-Collision', 'Remote Monitoring', 'SLI Certification'],
    color: 'from-orange-500 to-amber-500',
    href: '/services/crane-sli',
    learnLabel: 'Crane SLI',
  },
  {
    icon: FaGraduationCap,
    title: 'Student Training',
    description: 'Hands-on professional courses in PCB design, card repair, PLC, web dev, and automation.',
    features: ['PCB & Card Repair', 'PLC Programming', 'Web Development', 'N8N Automation'],
    color: 'from-rose-500 to-pink-500',
    href: '/services/student-training',
    learnLabel: 'Student Training',
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Comprehensive Industrial{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Solutions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            From circuit board design to complete automation systems, we provide end-to-end solutions for your
            industrial needs.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:gap-3 transition-all"
          >
            View all services
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <Link href={service.href} className="relative z-10 block">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-linear-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="p-2 rounded-lg bg-secondary/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <FaArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium bg-secondary/50 text-muted-foreground rounded-full border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Learn More about {service.learnLabel}
                    <FaArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                {(service.title.includes('PCB') || service.title.includes('Card')) && (
                  <a
                    href="https://siliconpartshub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-6 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Shop components at Silicon Parts Hub
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
