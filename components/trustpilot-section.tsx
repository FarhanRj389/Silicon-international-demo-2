'use client'

import { motion } from 'framer-motion'
import { FaStar, FaArrowUpRightFromSquare } from 'react-icons/fa6'

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/siliconpk.com'

const highlights = [
  {
    author: 'Verified Client — Cement Plant',
    text: 'Fast VFD card repair and clear technical reports. Production downtime minimized.',
    rating: 5,
  },
  {
    author: 'Verified Client — Port Operations',
    text: 'Professional Crane SLI installation and on-site commissioning. Highly reliable team.',
    rating: 5,
  },
  {
    author: 'Verified Client — B2B E-Commerce',
    text: 'Outstanding web platform delivery with SEO and performance optimization built in.',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-[#00b67a]' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  )
}

export function TrustpilotSection() {
  return (
    <section className="py-20 bg-secondary/20 border-y border-border" aria-labelledby="trustpilot-heading">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#00b67a] text-sm font-bold uppercase tracking-widest">Trustpilot Reviews</span>
          <h2 id="trustpilot-heading" className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Trusted by Industrial Clients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what businesses across Pakistan say about our PCB, repair, automation, and software services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 p-8 rounded-2xl bg-card border border-border text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-black text-[#00b67a]">Trustpilot</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Stars count={5} />
              <span className="text-3xl font-extrabold text-foreground">4.9</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Based on verified industrial & B2B client reviews</p>
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00b67a] text-white font-bold text-sm hover:bg-[#00a06d] transition-colors"
            >
              Read on Trustpilot
              <FaArrowUpRightFromSquare className="w-4 h-4" />
            </a>
          </motion.div>

          {highlights.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <Stars count={item.rating} />
              <p className="text-foreground mt-4 mb-4 leading-relaxed">&ldquo;{item.text}&rdquo;</p>
              <footer className="text-sm font-semibold text-muted-foreground">{item.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
