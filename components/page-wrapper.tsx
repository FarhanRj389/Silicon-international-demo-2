'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SiteChrome } from '@/components/site-chrome'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteChrome />
      <Header />
      <div className="pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-28 overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </>
  )
}
