export const serviceDropdownLinks = [
  { name: 'PCB Design', href: '/services/pcb' },
  { name: 'Card Repair', href: '/services/card-repair' },
  { name: 'Crane SLI', href: '/services/crane-sli' },
  { name: 'Web & Apps', href: '/services/web-dev' },
  { name: 'Student Training', href: '/services/student-training' },
] as const

export const mainNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Our Services',
    href: '/services',
    dropdown: serviceDropdownLinks,
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact Us', href: '/contact' },
] as const

/** Home sections (only used on homepage for in-page scroll) */
export const homeSectionLinks = {
  services: '#services',
  portfolio: '#portfolio',
  contact: '#contact',
  about: '#about',
} as const

/**
 * Clean URLs: never stack hashes like /#home#home
 * - "/" for home
 * - "/#section" from other pages to home sections
 * - "#section" on home for same-page scroll (use with scroll, not duplicate Link)
 */
export function resolveNavHref(href: string, isHome: boolean): string {
  if (href === '/' || href === '#home' || href === '') return '/'

  if (href.startsWith('#')) {
    return isHome ? href : `/${href}`
  }

  return href
}

export function scrollToSection(hash: string) {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `/#${id}`)
  }
}
