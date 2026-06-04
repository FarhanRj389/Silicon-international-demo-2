'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type DeferredVideoProps = {
  src: string
  className?: string
  overlayClassName?: string
}

export function DeferredVideo({ src, className, overlayClassName }: DeferredVideoProps) {
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

    const fallback = window.setTimeout(() => setShouldLoad(true), 2500)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn('absolute inset-0', className)}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-secondary/40 to-background opacity-40"
        aria-hidden
      />
      {shouldLoad ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover opacity-30"
          aria-hidden
        >
          <source src={src} type="video/mp4" />
          <track kind="captions" srcLang="en" label="Background video" default />
        </video>
      ) : null}
      {overlayClassName ? <div className={overlayClassName} /> : null}
    </div>
  )
}
