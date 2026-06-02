'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { clientReviews, type ClientReview } from '@/lib/client-reviews-data'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? 'text-amber-400' : 'text-muted-foreground/25'}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: ClientReview }) {
  return (
    <div className="h-full flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border">
      <div className="flex items-start gap-4 mb-5">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shrink-0"
        />
        <div>
          <h3 className="font-bold text-foreground">{review.name}</h3>
          <p className="text-sm text-muted-foreground">
            {review.role} · {review.company}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={review.rating} />
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed flex-1 mb-5">{review.description}</p>

      {review.mediaType === 'image' && review.mediaUrl && (
        <div className="rounded-xl overflow-hidden border border-border aspect-video">
          <img src={review.mediaUrl} alt={`Project by ${review.name}`} className="w-full h-full object-cover" />
        </div>
      )}

      {review.mediaType === 'video' && review.mediaUrl && (
        <div className="relative rounded-xl overflow-hidden border border-border aspect-video bg-black">
          <video src={review.mediaUrl} controls className="w-full h-full object-cover" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
            <FaPlay className="w-10 h-10 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export function ClientReviewsSection() {
  const [index, setIndex] = useState(0)
  const review = clientReviews[index]

  const next = () => setIndex((i) => (i + 1) % clientReviews.length)
  const prev = () => setIndex((i) => (i - 1 + clientReviews.length) % clientReviews.length)

  return (
    <section className="py-24 bg-background" aria-labelledby="client-reviews-heading">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Client Reviews</span>
          <h2 id="client-reviews-heading" className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from industrial partners — with photos and project videos where available.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Previous review"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {clientReviews.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === index ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Next review"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-14">
          {clientReviews.slice(0, 3).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{r.name}</p>
                  <StarRating rating={r.rating} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
