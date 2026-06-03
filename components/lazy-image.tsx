'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { optimizeImageUrl } from '@/lib/image-utils'

type LazyImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  sizes?: string
  priority?: boolean
  wrapperClassName?: string
}

export function LazyImage({
  src,
  alt,
  className,
  width = 800,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  wrapperClassName,
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(priority)
  const [loaded, setLoaded] = useState(false)
  const optimizedSrc = optimizeImageUrl(src, width)

  useEffect(() => {
    if (priority || visible) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [priority, visible])

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-secondary/40', wrapperClassName)}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/60 via-muted/30 to-secondary/60"
          aria-hidden
        />
      )}
      {visible && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  )
}
