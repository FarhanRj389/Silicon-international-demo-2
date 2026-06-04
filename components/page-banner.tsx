'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type Breadcrumb = { name: string; href: string }

type PageBannerProps = {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  videoSrc?: string
}

export function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  return (
    <section className="bg-gray-950 py-16 mt-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15)_0%,transparent_70%)]" />
      <div className="relative container mx-auto px-4 md:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{title}</h1>
          {subtitle && <p className="text-gray-300 max-w-2xl">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
