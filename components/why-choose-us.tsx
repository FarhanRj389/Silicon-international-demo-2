'use client'

import { motion } from 'framer-motion'
import { FaShieldHalved, FaUserGear, FaMicroscope, FaAward, FaClock, FaHandshake } from 'react-icons/fa6'

const values = [
  {
    icon: FaShieldHalved,
    title: '100% Reliability',
    description: 'Zero-defect manufacturing standards with rigorous quality control at every stage.',
  },
  {
    icon: FaUserGear,
    title: 'Expert Engineers',
    description: 'A team of seasoned professionals with deep industrial automation expertise.',
  },
  {
    icon: FaMicroscope,
    title: 'State-of-the-Art Equipment',
    description: 'Latest testing and diagnostic tools ensuring precision in every project.',
  },
  {
    icon: FaAward,
    title: 'Certified Quality',
    description: 'ISO-certified processes delivering consistent, world-class results.',
  },
  {
    icon: FaClock,
    title: 'On-Time Delivery',
    description: 'Meeting deadlines without compromising on quality or specifications.',
  },
  {
    icon: FaHandshake,
    title: 'Dedicated Support',
    description: '24/7 technical assistance and after-sales service for all clients.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 circuit-grid opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Engineering Excellence,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Delivered
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Since 1975, Silicon International has combined UK and Japan-trained electronic engineering expertise 
            with R&D, reverse engineering, and industrial product development.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:gap-3 transition-all"
          >
            Learn more about us
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
