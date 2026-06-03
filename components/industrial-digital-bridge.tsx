'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaArrowRight,
  FaBolt,
  FaCode,
  FaGlobe,
  FaMicrochip,
  FaShieldHalved,
  FaArrowDown,
} from 'react-icons/fa6'

const pillars = [
  {
    icon: FaMicrochip,
    title: 'Hardware Engineering',
    desc: 'PCB, SLI systems & industrial cards built for harsh environments.',
    accent: 'from-primary/20 to-primary/5',
  },
  {
    icon: FaShieldHalved,
    title: 'Safety & Compliance',
    desc: 'Crane load limits, diagnostics & certified commissioning on-site.',
    accent: 'from-accent/20 to-accent/5',
  },
  {
    icon: FaCode,
    title: 'Software Layer',
    desc: 'SCADA, dashboards, B2B portals & mobile apps that talk to your plant.',
    accent: 'from-primary/15 to-accent/10',
  },
  {
    icon: FaGlobe,
    title: 'Digital Presence',
    desc: 'SEO-ready websites that convert visitors into qualified industrial leads.',
    accent: 'from-accent/15 to-primary/10',
  },
]

const flowSteps = ['Design', 'Build', 'Deploy', 'Support']

export function IndustrialDigitalBridge() {
  return (
    <section
      id="bridge"
      className="relative section-padding overflow-hidden"
      aria-labelledby="bridge-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[min(100%,48rem)] h-[32rem] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-[80px]" />
        <div className="absolute inset-0 circuit-grid opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <motion.div
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <FaBolt className="w-3.5 h-3.5" />
                Industrial × Digital
              </span>
              <h2
                id="bridge-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance leading-tight"
              >
                One Partner from{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Crane Floor to Cloud
                </span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0 text-pretty">
                You&apos;ve seen our SLI and card solutions — next, explore how we ship modern web
                apps, e-commerce, and automation that connect directly to your operations.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {flowSteps.map((step, i) => (
                  <span key={step} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-3 py-1.5 rounded-lg bg-secondary/80 border border-border font-medium text-foreground">
                      {step}
                    </span>
                    {i < flowSteps.length - 1 && (
                      <FaArrowRight className="w-3 h-3 text-primary hidden sm:block" />
                    )}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="#web-dev"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors glow-primary min-h-[48px]"
                >
                  Explore Web & Apps
                  <FaArrowDown className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary/80 border border-border text-foreground rounded-xl font-semibold text-sm hover:border-primary/40 transition-colors min-h-[48px]"
                >
                  View Portfolio
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    className={`p-4 sm:p-5 rounded-2xl border border-border bg-gradient-to-br ${pillar.accent} backdrop-blur-sm hover:border-primary/30 transition-colors`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-sm text-muted-foreground max-w-md">
              <span className="text-primary font-semibold">50+ years</span> in electronics — now with
              full-stack digital delivery for industrial brands.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-muted-foreground">
              {['Next.js', 'PLC / SCADA', 'SLI Systems', 'React Native', 'PCB Fab'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-background/60 border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
