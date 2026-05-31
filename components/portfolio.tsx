'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaXmark, FaExpand, FaArrowRight } from 'react-icons/fa6'

const categories = ['All', 'PCB Designs', 'Card Repairs', 'Web & Mobile Apps', 'Industrial Automation']

const projects = [
  {
    id: 1,
    title: 'Multi-Layer PCB for Automation Controller',
    category: 'PCB Designs',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    description: 'High-density 8-layer PCB design for industrial automation controller with advanced EMI shielding.',
    scope: 'Schematic Design, PCB Layout, Prototyping, Mass Production',
    metrics: '99.8% First Pass Yield',
  },
  {
    id: 2,
    title: 'VFD Drive Repair - Siemens Series',
    category: 'Card Repairs',
    image: 'https://images.unsplash.com/photo-1581092160607-ee67df9c6839?w=800&q=80',
    description: 'Complete board-level repair of Siemens VFD drives including IGBT replacement and control board refurbishment.',
    scope: 'Diagnostics, Component Replacement, Testing, Calibration',
    metrics: '48hr Turnaround Time',
  },
  {
    id: 3,
    title: 'E-Commerce Platform - Industrial Parts',
    category: 'Web & Mobile Apps',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    description: 'Full-featured B2B e-commerce platform for industrial components with inventory management.',
    scope: 'UI/UX Design, Frontend, Backend, Payment Integration',
    metrics: '300% Sales Increase',
  },
  {
    id: 4,
    title: 'Crane SLI System - Port Authority',
    category: 'Industrial Automation',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    description: 'Complete Safe Load Indicator system for harbor cranes with real-time monitoring dashboard.',
    scope: 'Hardware Design, Software, Installation, Training',
    metrics: 'Zero Safety Incidents',
  },
  {
    id: 5,
    title: 'Power Supply PCB - Medical Grade',
    category: 'PCB Designs',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&q=80',
    description: 'Medical-grade isolated power supply with strict safety compliance and noise filtering.',
    scope: 'Design, Compliance Testing, Certification Support',
    metrics: 'IEC 60601 Certified',
  },
  {
    id: 6,
    title: 'PLC Repair - Allen Bradley',
    category: 'Card Repairs',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Emergency repair of Allen Bradley PLC modules for continuous production facility.',
    scope: 'Emergency Service, Repair, Testing, Warranty',
    metrics: '24hr Emergency Service',
  },
  {
    id: 7,
    title: 'Corporate Portfolio - Engineering Firm',
    category: 'Web & Mobile Apps',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'Premium corporate website with project showcase and lead generation capabilities.',
    scope: 'Design, Development, SEO, Analytics',
    metrics: '150% Lead Increase',
  },
  {
    id: 8,
    title: 'Conveyor Control System',
    category: 'Industrial Automation',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    description: 'Automated conveyor control system with variable speed drives and safety interlocks.',
    scope: 'PLC Programming, HMI Design, Installation',
    metrics: '40% Efficiency Gain',
  },
]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Explore our diverse portfolio of successful projects across PCB design, 
            industrial repairs, and software development.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                className="group relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaExpand className="w-4 h-4 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1 line-clamp-2">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-background/80 backdrop-blur-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <FaXmark className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="h-64 md:h-auto">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{selectedProject.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.description}</p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Scope of Work</p>
                        <p className="text-foreground font-medium">{selectedProject.scope}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Key Metric</p>
                        <p className="text-primary font-bold text-lg">{selectedProject.metrics}</p>
                      </div>
                    </div>

                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(null)}
                    >
                      Start Similar Project
                      <FaArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
