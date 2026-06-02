'use client'

import { motion } from 'framer-motion'

export function ServicesHero() {
  return (
    <section className="bg-gray-950 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.18)_0%,transparent_70%)]" />
      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Comprehensive Industrial Engineering Solutions
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            From PCB design to automation systems, explore our full range of specialized services
            built for industrial clients.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
