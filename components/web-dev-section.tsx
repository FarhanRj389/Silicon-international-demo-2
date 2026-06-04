'use client'

import { motion } from 'framer-motion'
import { 
  FaCartShopping, FaBriefcase, FaGraduationCap, FaRobot, 
  FaMobileScreenButton, FaArrowRight, FaMicrochip 
} from 'react-icons/fa6'
import { LazyImage } from '@/components/lazy-image'

const webServices = [
  {
    icon: FaCartShopping,
    title: 'Premium E-Commerce Development',
    description: 'Custom e-commerce platforms built with React.js, Next.js, headless commerce architectures, Shopify integrations, and enterprise WordPress solutions.',
    features: ['Custom React/Next.js Stores', 'Headless Commerce', 'Shopify & WooCommerce', 'Payment Integrations'],
    image: '/images/Premium E-Commerce.webp',
  },
  {
    icon: FaBriefcase,
    title: 'Business Portfolio Websites',
    description: 'High-converting corporate websites tailored for B2B corporations, engineering agencies, manufacturing companies, and industrial service providers.',
    features: ['B2B Corporate Sites', 'Lead Generation', 'SEO Optimized', 'Modern Design'],
    image: '/images/Business Portfolio.webp',
  },
  {
    icon: FaGraduationCap,
    title: 'Education & LMS Platforms',
    description: 'Scalable online training academies, corporate learning dashboards, and complete learning management systems for educational institutions.',
    features: ['Online Academies', 'Corporate Training', 'Progress Tracking', 'Video Integration'],
    image: '/images/Education & LMS.webp',
  },
  {
    icon: FaRobot,
    title: 'AI & Workflow Automation',
    description: 'Smart AI-agent integrations, internal dashboard data synchronization, automation scripts, and intelligent workflow optimization solutions.',
    features: ['AI Chatbots', 'Process Automation', 'Data Sync', 'Smart Dashboards'],
    image: '/images/AI & Workflow.webp',
  },
  {
    icon: FaMobileScreenButton,
    title: 'Custom Web & Mobile Apps',
    description: 'Native-feel cross-platform applications using React Native and modern web technologies, designed specifically for industrial and enterprise use cases.',
    features: ['Cross-Platform', 'React Native', 'PWA Support', 'Industrial Apps'],
    image: '/images/Custom Web.webp',
  },
]

export function WebDevSection() {
  return (
    <section id="web-dev" className="section-padding">
      <div className="container-site">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Web & App Development</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Digital Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Modern Business
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            From e-commerce platforms to AI-powered automation, we build digital solutions 
            that drive growth and streamline operations.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-8">
          {webServices.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={service.title}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="w-full lg:w-2/5 h-52 sm:h-64 lg:h-80 rounded-xl overflow-hidden group">
                  <LazyImage
                    src={service.image}
                    alt={service.title}
                    width={640}
                    wrapperClassName="h-full w-full group-hover:scale-[1.02] transition-transform duration-500"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-4 py-2 text-sm font-medium bg-secondary/50 text-muted-foreground rounded-lg border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Get a Quote
                    <FaArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Cross-Traffic CTA */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <FaMicrochip className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Need Components for Your Tech Project?</h3>
                <p className="text-muted-foreground">Browse our extensive catalog of electronic components and parts.</p>
              </div>
            </div>
            <motion.a
              href="https://siliconpartshub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors glow-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop on Silicon Parts Hub
              <FaArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
