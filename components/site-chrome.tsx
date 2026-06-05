'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { SocialSidebar } from '@/components/social-sidebar'
import { WhatsAppButton } from '@/components/whatsapp-button'

export function SiteChrome() {
  return (
    <>
      <ThemeToggle />
      <SocialSidebar />
      <WhatsAppButton />
    </>
  )
}
