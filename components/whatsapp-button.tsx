'use client'

import { FaWhatsapp } from 'react-icons/fa6'
import { SITE_WHATSAPP_URL } from '@/lib/site-contact'

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello Silicon International, I would like to inquire about your services.'
)

export function WhatsAppButton() {
  return (
    <a
      href={`${SITE_WHATSAPP_URL}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[100] flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 hover:shadow-xl active:scale-95 safe-bottom pointer-events-auto"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  )
}
