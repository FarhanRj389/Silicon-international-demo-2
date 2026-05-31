'use client'

import { motion } from 'framer-motion'

const clients = [
  'Siemens', 'ABB', 'Schneider Electric', 'Rockwell', 'Honeywell',
  'Emerson', 'Mitsubishi', 'Bosch', 'Delta', 'Omron',
  'General Electric', 'Fanuc'
]

export function ClientTicker() {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <motion.p
          className="text-center text-sm uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

        {/* Ticker */}
        <motion.div
          className="flex gap-16"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {[...clients, ...clients, ...clients].map((client, index) => (
            <motion.div
              key={`${client}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="px-8 py-4 bg-secondary/50 rounded-lg border border-border/50 group-hover:border-primary/50 transition-all">
                <p className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {client}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
