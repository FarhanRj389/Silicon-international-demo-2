'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import { HeroContactForm } from '@/components/hero-contact-form'
import { DeferredVideo } from '@/components/deferred-video'

const HERO_VIDEO =
  'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4'

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DeferredVideo
          src={HERO_VIDEO}
          poster="/images/hero-poster.jpg"
          overlayClassName="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"
        />
      </div>

      <div className="absolute inset-0 circuit-grid opacity-40 z-[1]" />

      <div className="relative z-10 container-site pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-28 pb-12 sm:pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center md:px-6 md:py-12 py-14">
          {/* Left — content */}
          <div className="text-left">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm text-primary font-medium">
                Trusted by 50+ Industrial Clients Worldwide
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Next-Gen Industrial{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Automation
              </span>{' '}
              & Software Engineering
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-pretty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Delivering cutting-edge PCB Design, Card Repair, Web Development, and Crane SLI Solutions
              with unmatched precision and reliability 
              <span className="text-primary font-bold">&nbsp;Established 1975.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/services"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all glow-primary"
              >
                Explore Our Services
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://siliconpartshub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-secondary border border-border text-foreground rounded-xl font-semibold hover:bg-secondary/80 hover:border-primary/50 transition-all"
              >
                Shop Components
              </a>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { value: '500+', label: 'Projects Delivered' },
                { value: '50+', label: 'Years Experience' },
                { value: '50+', label: 'Industrial Clients' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-primary mb-1 text-center">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground text-center">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <div className="w-full max-w-md lg:max-w-none lg:ml-auto">
            <HeroContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
