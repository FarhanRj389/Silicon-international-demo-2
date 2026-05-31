'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaDiagramProject, FaIndustry, FaCalendarDays, FaUsers } from 'react-icons/fa6'

const stats = [
  { icon: FaDiagramProject, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: FaIndustry, value: 50, suffix: '+', label: 'Industrial Clients' },
  { icon: FaCalendarDays, value: 10, suffix: '+', label: 'Years Experience' },
  { icon: FaUsers, value: 25, suffix: '+', label: 'Expert Engineers' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [rounded])

  return (
    <motion.span
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        animate(count, value, { duration: 2, ease: 'easeOut' })
      }}
    >
      {displayValue}{suffix}
    </motion.span>
  )
}

export function StatsCounter() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 circuit-grid opacity-30" />
      
      {/* Animated Circles */}
      <motion.div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Impact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 text-balance">
            Numbers That Speak{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Excellence
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-primary" />
                </motion.div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
