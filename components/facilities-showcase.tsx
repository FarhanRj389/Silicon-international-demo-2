'use client'

import { motion } from 'framer-motion'
import { FaBuilding, FaMicroscope, FaIndustry, FaWarehouse } from 'react-icons/fa6'

const facilities = [
  {
    icon: FaBuilding,
    title: 'Corporate Headquarters',
    description: 'Modern office space with dedicated client meeting rooms and project management facilities.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    icon: FaMicroscope,
    title: 'Engineering Testing Lab',
    description: 'State-of-the-art testing equipment for quality assurance and diagnostics.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
  },
  {
    icon: FaIndustry,
    title: 'Manufacturing Unit',
    description: 'High-precision assembly lines with automated quality control systems.',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
  },
  {
    icon: FaWarehouse,
    title: 'Component Warehouse',
    description: 'Temperature-controlled storage for electronic components and finished products.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  },
]

export function FacilitiesShowcase() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Facilities</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            World-Class{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Infrastructure
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Visit our facilities and experience the Silicon International difference — 
            where innovation meets precision engineering.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon
            return (
              <motion.div
                key={facility.title}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{facility.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{facility.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
