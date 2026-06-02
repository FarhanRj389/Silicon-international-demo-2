'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Removes broken URLs like /#home#home on the homepage */
export function HashUrlFix() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const { pathname: p, hash, search } = window.location
    if (!hash) return

    const cleaned = hash.replace(/^#+/, '').split('#')[0]
    if (!cleaned || cleaned === 'home') {
      window.history.replaceState(null, '', p + search)
      return
    }

    if (hash.includes('#')) {
      window.history.replaceState(null, '', `${p}${search}#${cleaned}`)
    }
  }, [pathname])

  return null
}
