'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaArrowUpRightFromSquare, FaCartShopping } from 'react-icons/fa6'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ServicesHero } from '@/components/services-hero'
import { ServiceTabsNav } from '@/components/service-tabs-nav'
import { serviceTabs } from '@/components/services-content'

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 bg-background">
        <ServicesHero />
        <ServiceTabsNav />

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Select a service tab above, or choose a card below to view full scope, deliverables, and CTAs.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceTabs.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-primary font-semibold italic mb-3">{service.tagline}</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">{service.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                      >
                        Learn More
                        <FaArrowRight className="w-4 h-4" />
                      </Link>
                      {service.buyHref && (
                        <a
                          href={service.buyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
                        >
                          <FaCartShopping className="w-4 h-4" />
                          {service.buyText ?? 'Buy Now'}
                          <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
