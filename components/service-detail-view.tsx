'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCartShopping,
  FaCircleCheck,
  FaChevronRight,
} from 'react-icons/fa6'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ServicesHero } from '@/components/services-hero'
import { ServiceTabsNav } from '@/components/service-tabs-nav'
import { getServiceById, serviceTabs } from '@/components/services-content'
import { STUDENT_TRAINING_PROGRAMS } from '@/lib/student-training-data'
import { WebDevFeatureHub } from '@/components/web-dev-feature-hub'

type ServiceDetailViewProps = {
  serviceId: string
}

export function ServiceDetailView({ serviceId }: ServiceDetailViewProps) {
  const active = getServiceById(serviceId)
  if (!active) return null

  const ActiveIcon = active.icon

  return (
    <>
      <Header />
      <main className="pt-28 bg-background">
        <ServicesHero />
        <ServiceTabsNav activeId={active.id} />

        <section id="service-content" className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                  <ActiveIcon className="w-4 h-4" />
                  {active.label}
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-3">{active.title}</h2>
                <p className="text-primary font-semibold italic mb-4">{active.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-7">{active.description}</p>

                <div className="mb-8">
                  <p className="text-sm font-semibold text-foreground mb-3">Industries Served:</p>
                  <div className="flex flex-wrap gap-2">
                    {active.industries.map((industry) => (
                      <span
                        key={industry}
                        className="text-xs font-medium bg-secondary/50 text-muted-foreground px-3 py-1.5 rounded-full border border-border"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {active.ctaType === 'store' ? (
                    <a
                      href={active.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors"
                    >
                      <FaArrowUpRightFromSquare className="w-4 h-4" />
                      {active.ctaText}
                    </a>
                  ) : (
                    <Link
                      href={active.ctaHref}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3.5 rounded-xl text-sm transition-colors"
                    >
                      {active.ctaText}
                      <FaArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  {active.buyHref && (
                    <a
                      href={active.buyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors"
                    >
                      <FaCartShopping className="w-4 h-4" />
                      {active.buyText ?? 'Buy Now'}
                      <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-4/3 rounded-3xl overflow-hidden border border-border shadow-xl">
                  <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
                  <FaCircleCheck className="w-7 h-7 mb-1 opacity-90" />
                  <p className="text-xs font-bold">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {active.id !== 'web-dev' && (
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h3 className="text-2xl font-extrabold text-foreground mb-2">What&apos;s Included</h3>
                <p className="text-muted-foreground">
                  A complete breakdown of our {active.label} service scope.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {active.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-5 bg-card rounded-xl border border-border"
                  >
                    <FaCircleCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {active.ctaType === 'store' && (
          <section className="py-16 bg-linear-to-r from-amber-500 to-amber-600">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Sourcing Components for Your Project?
              </h3>
              <p className="text-amber-100 mb-7">
                Silicon Parts Hub is our specialized B2B store with industrial electronic components, ICs, and modules.
              </p>
              <a
                href="https://siliconpartshub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-amber-600 font-extrabold px-8 py-3.5 rounded-xl"
              >
                <FaArrowUpRightFromSquare className="w-4 h-4" />
                Visit Silicon Parts Hub
              </a>
            </div>
          </section>
        )}

        {active.id === 'web-dev' && <WebDevFeatureHub />}

        {active.id === 'student-training' && (
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h3 className="text-2xl font-extrabold text-foreground mb-2">Training Programs</h3>
                <p className="text-muted-foreground">
                  Choose your course, pick 2 days per week, select a time slot, and enroll online.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {STUDENT_TRAINING_PROGRAMS.map((program, i) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="p-6 bg-card rounded-xl border border-border"
                  >
                    <h4 className="text-lg font-bold text-foreground mb-2">{program.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                    {'tracks' in program && program.tracks && (
                      <div className="flex flex-wrap gap-1.5">
                        {program.tracks.map((track) => (
                          <span
                            key={track}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {track}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/contact?service=Student+Training"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl text-sm transition-colors"
                >
                  Enroll Now <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-xl font-extrabold text-foreground mb-8 text-center">Explore Other Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceTabs
                .filter((tab) => tab.id !== active.id)
                .map((tab, index) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/services/${tab.id}`}
                      className="flex items-center justify-between gap-3 p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <tab.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold text-sm text-foreground">{tab.label}</span>
                      </div>
                      <FaChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)]" />
          <div className="relative container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h3 className="text-3xl font-extrabold text-white mb-4">Not sure which service you need?</h3>
            <p className="text-gray-300 mb-8">
              Describe your challenge and our engineers will recommend the right solution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl"
            >
              Talk to an Engineer <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
