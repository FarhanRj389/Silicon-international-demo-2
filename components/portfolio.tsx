'use client'

import { motion } from 'framer-motion'
import { PortfolioGallery } from '@/components/portfolio-gallery'

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            PCB design, card repair, crane SLI, and web projects — filter by service and view images or videos.
          </p>
        </motion.div>

        <PortfolioGallery showViewAllLink compact />
      </div>
    </section>
  )
}
