'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className="fixed right-4 md:right-6 top-[calc(6.5rem+env(safe-area-inset-top))] z-[60] w-11 h-11 rounded-full border border-border bg-card/90"
        aria-hidden
      />
    )
  }

  const isDark = (resolvedTheme ?? theme) === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed right-4 md:right-6 top-[calc(6.5rem+env(safe-area-inset-top))] z-[60] w-11 h-11 rounded-full border border-border bg-card/95 backdrop-blur shadow-lg flex items-center justify-center text-foreground hover:border-primary/50 hover:bg-primary/10 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
    </button>
  )
}
