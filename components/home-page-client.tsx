'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader } from '@/components/loader'
import { shouldShowInitialLoader, markInitialLoaderComplete } from '@/lib/initial-loader'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ClientTicker } from '@/components/client-ticker'
import { WhyChooseUs } from '@/components/why-choose-us'
import { ServicesGrid } from '@/components/services-grid'
import { StatsCounter } from '@/components/stats-counter'
import { ProductsShowcase } from '@/components/products-showcase'
import { IndustrialDigitalBridge } from '@/components/industrial-digital-bridge'
import { SiteChrome } from '@/components/site-chrome'
import { LeadForm } from '@/components/lead-form'
import { Footer } from '@/components/footer'
import { HashUrlFix } from '@/components/hash-url-fix'
import { SectionSkeleton } from '@/components/section-skeleton'

const WebDevSection = dynamic(
  () => import('@/components/web-dev-section').then((m) => ({ default: m.WebDevSection })),
  { loading: () => <SectionSkeleton /> }
)
const Portfolio = dynamic(
  () => import('@/components/portfolio').then((m) => ({ default: m.Portfolio })),
  { loading: () => <SectionSkeleton /> }
)
const TrustpilotSection = dynamic(
  () => import('@/components/trustpilot-section').then((m) => ({ default: m.TrustpilotSection })),
  { loading: () => <SectionSkeleton /> }
)
const ClientReviewsSection = dynamic(
  () =>
    import('@/components/client-reviews-section').then((m) => ({
      default: m.ClientReviewsSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

export function HomePageClient() {
  const [loading, setLoading] = useState(shouldShowInitialLoader)

  const handleLoaderComplete = useCallback(() => {
    markInitialLoaderComplete()
    setLoading(false)
  }, [])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: loading ? 0 : 1 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden={loading}
      >
        <HashUrlFix />
        <SiteChrome />
        <Header />
        <main className="overflow-x-hidden">
          <Hero />
          <ClientTicker />
          <WhyChooseUs />
          <ServicesGrid />
          <StatsCounter />
          <ProductsShowcase />
          <IndustrialDigitalBridge />
          <WebDevSection />
          <Portfolio />
          <TrustpilotSection />
          <ClientReviewsSection />
          <LeadForm />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
