export const serviceDropdownLinks = [
  { name: 'PCB Design', href: '/services/pcb' },
  { name: 'Card Repair', href: '/services/card-repair' },
  { name: 'Crane SLI', href: '/services/crane-sli' },
  { name: 'Web & Apps', href: '/services/web-dev' },
] as const

export const mainNavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Our Services',
    href: '/services',
    dropdown: serviceDropdownLinks,
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact Us', href: '/contact' },
] as const

/** Hash links on home; full paths on other pages */
export function resolveNavHref(href: string, isHome: boolean) {
  if (href.startsWith('#')) {
    return isHome ? href : `/${href}`
  }
  return href
}
