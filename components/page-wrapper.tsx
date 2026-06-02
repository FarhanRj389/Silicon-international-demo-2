'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="pt-28">{children}</div>
      <Footer />
    </>
  )
}
