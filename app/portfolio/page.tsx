'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import { PageWrapper } from '@/components/page-wrapper'
import { PageBanner } from '@/components/page-banner'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { TrustpilotSection } from '@/components/trustpilot-section'
import { ClientReviewsSection } from '@/components/client-reviews-section'

export default function PortfolioPage() {
  return (
    <PageWrapper>
      <PageBanner
        title="Our Portfolio"
        subtitle="Filter projects by PCB Design, Card Repair, Crane SLI, or Web & Apps — open any item to view images or videos."
        breadcrumbs={[{ name: 'Portfolio', href: '/portfolio' }]}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Upload your own media by replacing URLs in{' '}
            <code className="text-primary text-sm">lib/portfolio-data.ts</code> or add files under{' '}
            <code className="text-primary text-sm">/public/portfolio/</code>.
          </motion.p>
          <PortfolioGallery />
        </div>
      </section>

      <TrustpilotSection />
      <ClientReviewsSection />

      <section className="py-16 bg-secondary/20 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Have a similar project?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Tell us about your PCB, repair, automation, or software requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl"
          >
            Get a Quote <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
