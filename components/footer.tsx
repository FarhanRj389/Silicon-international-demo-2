'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaMicrochip,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaArrowRight,
} from 'react-icons/fa6'
import { resolveNavHref, serviceDropdownLinks } from '@/lib/nav-links'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact Us', href: '/contact' },
]

const socialLinks = [
  // { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaFacebookF, href: 'https://www.facebook.com/siliconpartshub/', label: 'Facebook' },
  // { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
]

export function Footer() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const logoHref = isHome ? '#home' : '/'

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href={logoHref} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <FaMicrochip className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">Silicon International</p>
                <p className="text-xs text-muted-foreground">Industrial Excellence</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your trusted partner for electronic engineering, R&D, crane safe load indicators, 
              fire alarm systems, and industrial automation. Established 1975.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all"
                    whileHover={{ y: -3 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={resolveNavHref(link.href, isHome)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceDropdownLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaLocationDot className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Office #123, Tech Park, Lahore, Pakistan
                </span>
              </li>
              <li>
                <a href="tel:+923442279244" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <FaPhone className="w-5 h-5 text-primary flex-shrink-0" />
                  +92 344 227 9244
                </a>
              </li>
              <li>
                <a href="mailto:info@siliconpk.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <FaEnvelope className="w-5 h-5 text-primary flex-shrink-0" />
                  info@siliconpk.com
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/923442279244"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#25D366]/90 transition-colors w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Official Store Banner */}
      <div className="bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-foreground">Looking for Electronic Components?</h4>
              <p className="text-muted-foreground">Visit our official e-commerce store for quality parts.</p>
            </div>
            <motion.a
              href="https://siliconpartshub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Visit Silicon Parts Hub
              <FaArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Silicon International. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
