'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaArrowUpRightFromSquare,
  FaArrowRight,
  FaBookOpen,
  FaCircleCheck,
  FaCartShopping,
  FaDesktop,
  FaGlobe,
  FaMobileScreenButton,
  FaRobot,
} from 'react-icons/fa6'

const webServices = [
  {
    id: 'ecommerce',
    icon: FaCartShopping,
    title: 'Premium E-Commerce Development',
    tagline: 'Scale Your B2B & B2C Sales Channel',
    description:
      'Custom e-commerce platforms built with React, Next.js, headless architectures, Shopify, and enterprise WordPress.',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    features: ['Next.js & React Storefronts', 'Payment Integrations', 'Inventory & Order Management', 'Mobile Commerce (PWA)'],
  },
  {
    id: 'portfolio',
    icon: FaGlobe,
    title: 'High-Converting Business Portfolios',
    tagline: 'Corporate Grade Web Presence',
    description:
      'Tailored B2B portfolio and corporate websites for engineering firms and industrial companies.',
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
    features: ['SEO-Optimized Architecture', 'Conversion-Focused Design', 'Corporate CMS Integration', 'Lead Capture Systems'],
  },
  {
    id: 'lms',
    icon: FaBookOpen,
    title: 'Education & LMS Platforms',
    tagline: 'Scalable Learning Infrastructure',
    description:
      'Robust learning management systems, online academies, and training dashboards for institutions and enterprise teams.',
    image: 'https://images.pexels.com/photos/4261252/pexels-photo-4261252.jpeg',
    features: ['Course & Module Management', 'Student Progress Tracking', 'Certificate Generation', 'Subscription Billing'],
  },
  {
    id: 'ai-automation',
    icon: FaRobot,
    title: 'AI & Workflow Automation Solutions',
    tagline: 'Intelligent Process Optimization',
    description:
      'AI integrations, dashboard synchronization, and workflow automation to reduce repetitive work.',
    image: 'https://images.pexels.com/photos/8354560/pexels-photo-8354560.jpeg',
    features: ['AI Chatbot Integration', 'Workflow Automation', 'API Integration Layer', 'Real-time Dashboards'],
  },
  {
    id: 'mobile-apps',
    icon: FaMobileScreenButton,
    title: 'Custom Web & Mobile Apps',
    tagline: 'Cross-Platform Excellence',
    description:
      'Native-feel mobile applications for iOS and Android using React Native for industrial use-cases.',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    features: ['Cross-Platform Deployment', 'Offline Data Sync', 'Push Notifications', 'Native Device Features'],
  },
]

export function WebDevFeatureHub() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Web & App Development Hub</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Digital Solutions for Modern Businesses
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            From e-commerce platforms to AI-powered automation, we build production-ready digital products that drive growth.
          </p>
        </motion.div>

        <div className="space-y-6">
          {webServices.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`grid lg:grid-cols-2 gap-0 rounded-2xl border border-border bg-card overflow-hidden ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}
              >
                <div className="relative min-h-[240px]">
                  <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-primary font-semibold text-sm mb-3 italic">{service.tagline}</p>
                  <p className="text-muted-foreground mb-5">{service.description}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FaCircleCheck className="w-3.5 h-3.5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need Components for Your Tech Project?</h3>
              <p className="text-primary-foreground/90">Browse our official parts store for industrial components and modules.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://siliconpartshub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-primary font-bold px-6 py-3"
              >
                Visit Silicon Parts Hub <FaArrowUpRightFromSquare className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-bold"
              >
                Discuss Project <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            <FaDesktop className="w-4 h-4" />
            View all services
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
