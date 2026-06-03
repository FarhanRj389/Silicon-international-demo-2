'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type DeferredVideoProps = {
  src: string
  poster?: string
  className?: string
  overlayClassName?: string
}

export function DeferredVideo({ src, poster, className, overlayClassName }: DeferredVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '80px' }
    )
    observer.observe(el)

    const fallback = window.setTimeout(() => setShouldLoad(true), 1200)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn('absolute inset-0', className)}>
      {poster && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden
        />
      )}
      {shouldLoad ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="h-full w-full object-cover opacity-30"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      {overlayClassName ? <div className={overlayClassName} /> : null}
    </div>
  )
}
