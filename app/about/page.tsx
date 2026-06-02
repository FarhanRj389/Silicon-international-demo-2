'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaArrowRight,
  FaAward,
  FaFlask,
  FaIndustry,
  FaShieldHalved,
  FaWeightHanging,
  FaFire,
  FaClock,
  FaMicrochip,
} from 'react-icons/fa6'
import { PageWrapper } from '@/components/page-wrapper'
import { PageBanner } from '@/components/page-banner'
import { TrustpilotSection } from '@/components/trustpilot-section'
import { ClientReviewsSection } from '@/components/client-reviews-section'

const reverseEngineeringAreas = [
  'Defence Organisations',
  'Crane Machinery',
  'CNC Machinery',
]

const products = [
  { icon: FaWeightHanging, name: 'Crane Safe Load Indicators' },
  { icon: FaIndustry, name: 'Weighing Scales' },
  { icon: FaMicrochip, name: 'Load Cells' },
  { icon: FaFire, name: 'Fire Alarm Systems' },
  { icon: FaShieldHalved, name: 'Smoke Sensors' },
  { icon: FaIndustry, name: 'Jamaat Panels' },
  { icon: FaClock, name: 'Digital Displays & Clocks' },
]

const projects = [
  'Minerva-Compatible Smoke Sensor',
  'Fire Alarm Systems',
  'Crane Safe Load Indicator System',
  'Weighing Scales for Peshawar & Quetta Airports',
  'Central Clock System',
  'Wireless Load Cell for Crane',
  'Thermocouple-Based Switch',
  'Textile Loom Counter',
  'DSP Processing System',
  'Wind Anemometer',
]

const aboutStats = [
  { value: '1975', label: 'Founded' },
  { value: '50+', label: 'Years of Engineering' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '24/7', label: 'Client-Focused Support' },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <PageBanner
        title="About Silicon International"
        subtitle="Founded in 1975 — electronic engineering, R&D, reverse engineering, crane SLI, fire safety systems, and industrial automation across Pakistan."
        breadcrumbs={[{ name: 'About Us', href: '/about' }]}
      />

      {/* Company heritage */}
      <section className="py-20 bg-background" aria-labelledby="company-story">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Heritage</span>
              <h2 id="company-story" className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                Silicon International — Established 1975
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Silicon International</strong> was founded in{' '}
                <strong className="text-foreground">1975</strong> by{' '}
                <strong className="text-foreground">Chief Engineer Nasir Ahmed</strong>, who completed his engineering
                studies in the <strong className="text-foreground">United Kingdom</strong> and gained hands-on
                experience in the UK and <strong className="text-foreground">Japan</strong> in the field of{' '}
                <strong className="text-foreground">Electronic Engineering</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Silicon International, our motto is to <strong className="text-foreground">fulfill the demands of our clients</strong>{' '}
                regarding their <strong className="text-foreground">electronics cards and systems-related issues</strong> —
                with precision, reliability, and non-stop dedication.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our dedicated <strong className="text-foreground">R&D team</strong> is capable of delivering{' '}
                <strong className="text-foreground">time-constrained output</strong>. We focus on meeting client needs
                and satisfying customers through continuous hard work and engineering excellence.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl"
              >
                View Our Services
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border aspect-4/3 sticky top-28"
            >
              <img
                src="/silicon_int_2.jpeg"
                alt="Silicon International — electronic engineering and industrial automation since 1975"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & R&D */}
      <section className="py-20 bg-background" aria-labelledby="our-services">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <FaFlask className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 id="our-services" className="text-3xl font-bold text-foreground mb-4">
              Research, Development & Electronic Systems
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground leading-relaxed text-lg text-center mb-8"
          >
            Our services include <strong className="text-foreground">Research & Development of complex electronic systems</strong>,
            their <strong className="text-foreground">designing</strong>, and <strong className="text-foreground">repairing work</strong>.
            We support industrial clients with full lifecycle engineering — from concept and prototyping to field deployment
            and maintenance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Major Reverse Engineering Areas</h3>
            <ul className="grid sm:grid-cols-3 gap-3">
              {reverseEngineeringAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-medium text-sm"
                >
                  <FaAward className="w-4 h-4 text-primary shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-secondary/20" aria-labelledby="our-products">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="our-products" className="text-3xl font-bold text-foreground text-center mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Industrial-grade electronic products engineered and supported by Silicon International — trusted across
            cranes, aviation, textiles, and safety-critical environments.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, i) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{product.name}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects list */}
      <section className="py-20 bg-background" aria-labelledby="project-list">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="project-list" className="text-3xl font-bold text-foreground text-center mb-4">
            Our List of Projects
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Selected engineering projects delivered by Silicon International — spanning safety systems, aviation
            weighing, crane automation, textiles, and DSP processing.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {projects.map((project, i) => (
              <motion.li
                key={project}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" aria-hidden />
                <span className="text-foreground font-medium">{project}</span>
              </motion.li>
            ))}
          </ul>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View full portfolio
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <TrustpilotSection />
      <ClientReviewsSection />

      <section className="py-16 bg-gray-950 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-4">Need electronics cards or systems support?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contact Silicon International for R&D, repair, crane SLI, fire safety, and custom electronic solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl"
          >
            Contact Our Team <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
