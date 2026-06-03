'use client'

import { useState, useCallback } from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'

const links = [
  {
    id: 'facebook',
    href: 'https://www.facebook.com/siliconpartshub/',
    label: 'Facebook',
    icon: FaFacebookF,
    activeClass:
      'data-[expanded=true]:bg-[#1877F2]/15 data-[expanded=true]:border-[#1877F2]/40 data-[expanded=true]:text-[#1877F2]',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/siliconpartshub/',
    label: 'Instagram',
    icon: FaInstagram,
    activeClass:
      'data-[expanded=true]:bg-[#E4405F]/15 data-[expanded=true]:border-[#E4405F]/40 data-[expanded=true]:text-[#E4405F]',
  },
] as const

export function SocialSidebar() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const expand = useCallback((id: string) => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      setExpandedId(id)
    }
  }, [])

  const collapse = useCallback(() => setExpandedId(null), [])

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[55] flex flex-col gap-2"
      aria-label="Social media links"
    >
      {links.map(({ id, href, label, icon: Icon, activeClass }) => {
        const isExpanded = expandedId === id

        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-expanded={isExpanded}
            className={`flex items-center h-11 overflow-hidden bg-card/95 backdrop-blur border border-border border-l-0 rounded-r-full shadow-md text-muted-foreground transition-[width] duration-300 ease-out w-11 ${activeClass} ${
              isExpanded ? 'md:w-[8.75rem]' : ''
            }`}
            aria-label={label}
            onMouseEnter={() => expand(id)}
            onMouseLeave={collapse}
            onFocus={() => expand(id)}
            onBlur={collapse}
          >
            <span className="flex w-11 shrink-0 items-center justify-center">
              <Icon className="w-4 h-4" />
            </span>
            <span
              className={`hidden md:block whitespace-nowrap text-xs font-semibold pr-4 transition-opacity duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              {label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
