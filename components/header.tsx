'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaXmark, FaChevronDown, FaArrowRight } from 'react-icons/fa6'
import { mainNavLinks, resolveNavHref } from '@/lib/nav-links'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoHref = '/'

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-11 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <nav className="container mx-auto px-4 md:px-6  bg-card/95 backdrop-blur border border-border py-4 rounded-xl rounded-b-4xl shadow-sm">
        <div className="flex items-center justify-between">
          <Link href={logoHref} className="flex items-center gap-3 group">
            <Image
              src="/bg-r-s.png"
              alt="Silicon International"
              width={240}
              height={37}
              priority
              sizes="(max-width: 640px) 60vw, 240px"
              className="h-auto w-[min(72vw,15rem)] sm:w-64 md:w-80 lg:w-96 max-h-16 sm:max-h-20 object-contain object-left"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => 'dropdown' in link && link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={resolveNavHref(link.href, isHome)}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {link.name}
                  {'dropdown' in link && link.dropdown && <FaChevronDown className="w-3 h-3" />}
                </Link>

                <AnimatePresence>
                  {'dropdown' in link && link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-56 glass rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://siliconpartshub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors glow-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Visit Official Store
              <FaArrowRight className="w-3 h-3" />
            </motion.a>

            <button
              type="button"
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 glass mt-2 mx-4 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-2">
                {mainNavLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={resolveNavHref(link.href, isHome)}
                      className="block px-4 py-3 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {'dropdown' in link &&
                      link.dropdown?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block ml-4 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                ))}
                <a
                  href="https://siliconpartshub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Visit Official Store
                  <FaArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
