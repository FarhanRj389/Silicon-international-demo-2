'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand, FaPlay, FaXmark, FaArrowRight } from 'react-icons/fa6'
import {
  portfolioFilters,
  portfolioItems,
  type PortfolioCategoryId,
  type PortfolioItem,
} from '@/lib/portfolio-data'

type PortfolioGalleryProps = {
  showViewAllLink?: boolean
  compact?: boolean
}

export function PortfolioGallery({ showViewAllLink = false, compact = false }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | PortfolioCategoryId>('all')
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  const filtered =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.categoryId === activeFilter)

  const gridClass = compact
    ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6'
    : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {portfolioFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <motion.div className={gridClass} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setSelected(project)}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={
                    project.mediaType === 'video'
                      ? project.thumbnailUrl || project.mediaUrl
                      : project.mediaUrl
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                {project.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg">
                      <FaPlay className="w-4 h-4 ml-0.5" />
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaExpand className="w-4 h-4 text-foreground" />
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {project.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-1 line-clamp-2">{project.title}</h3>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {showViewAllLink && (
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View full portfolio
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-background/80 backdrop-blur-sm"
                aria-label="Close"
              >
                <FaXmark className="w-5 h-5" />
              </button>
              <div className="grid lg:grid-cols-2">
                <div className="min-h-[240px] lg:min-h-[360px] bg-black">
                  {selected.mediaType === 'video' ? (
                    <video
                      src={selected.mediaUrl}
                      controls
                      className="w-full h-full min-h-[240px] object-cover"
                      poster={selected.thumbnailUrl}
                    />
                  ) : (
                    <img
                      src={selected.mediaUrl}
                      alt={selected.title}
                      className="w-full h-full min-h-[240px] object-cover"
                    />
                  )}
                </div>
                <div className="p-8">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                    {selected.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{selected.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{selected.description}</p>
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Scope of Work</p>
                      <p className="text-foreground font-medium">{selected.scope}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Key Metric</p>
                      <p className="text-primary font-bold text-lg">{selected.metrics}</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
                    onClick={() => setSelected(null)}
                  >
                    Start Similar Project
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
