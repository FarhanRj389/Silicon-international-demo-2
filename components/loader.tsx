'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaMicrochip } from 'react-icons/fa6'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Circuit Background Pattern */}
        <div className="absolute inset-0 circuit-grid opacity-30" />
        
        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 15}%`}
              y1="0%"
              x2={`${10 + i * 15}%`}
              y2="100%"
              stroke="url(#circuit-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear'
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0%"
              y1={`${20 + i * 20}%`}
              x2="100%"
              y2={`${20 + i * 20}%`}
              stroke="url(#circuit-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'linear'
              }}
            />
          ))}
        </svg>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo with Pulse Animation */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative w-24 h-24 rounded-2xl bg-secondary border border-primary/30 flex items-center justify-center glow-primary">
              <FaMicrochip className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Silicon International
          </motion.h1>
          
          <motion.p
            className="text-muted-foreground text-sm mb-8 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Industrial Excellence
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Text */}
          <motion.p
            className="mt-4 text-sm text-muted-foreground font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Initializing Systems... {progress}%
          </motion.p>
        </div>

        {/* Corner Decorations */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
          <motion.div
            key={corner}
            className={`absolute w-20 h-20 border-primary/30 ${
              corner.includes('top') ? 'top-8' : 'bottom-8'
            } ${
              corner.includes('left') ? 'left-8 border-l-2 border-t-2' : 'right-8 border-r-2 border-b-2'
            } ${
              corner.includes('top') && corner.includes('right') ? 'border-t-2 border-l-0' : ''
            } ${
              corner.includes('bottom') && corner.includes('left') ? 'border-b-2 border-r-0' : ''
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            style={{
              borderTopLeftRadius: corner === 'top-left' ? '12px' : 0,
              borderTopRightRadius: corner === 'top-right' ? '12px' : 0,
              borderBottomLeftRadius: corner === 'bottom-left' ? '12px' : 0,
              borderBottomRightRadius: corner === 'bottom-right' ? '12px' : 0,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
