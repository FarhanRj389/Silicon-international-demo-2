'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiLightningBolt } from 'react-icons/hi';
import { FiCpu, FiZap, FiActivity, FiCode } from 'react-icons/fi';

const loadingStates = [
  { icon: FiCpu, label: 'Initializing Systems' },
  { icon: FiCode, label: 'Loading Modules' },
  { icon: FiActivity, label: 'Connecting Networks' },
  { icon: FiZap, label: 'Powering Up' },
];

function CircuitNode({ delay, className }: { delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
      transition={{ duration: 0.6, delay, repeat: Infinity, repeatDelay: 2.5 }}
      className={`absolute w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 ${className}`}
    />
  );
}

function CircuitLine({ delay, className }: { delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: [0, 1, 1], opacity: [0, 0.6, 0.6] }}
      transition={{ duration: 0.8, delay, repeat: Infinity, repeatDelay: 2.5 }}
      className={`absolute h-px bg-gradient-to-r from-blue-500/60 via-blue-400/80 to-blue-500/40 origin-left ${className}`}
    />
  );
}

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [stateIndex, setStateIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const stateInterval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % loadingStates.length);
    }, 500);
    return () => clearInterval(stateInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + Math.random() * 18 + 8, 100);
      });
    }, 160);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      setTimeout(() => setIsExiting(true), 300);
      setTimeout(() => onComplete(), 700);
    }
  }, [progress, isExiting, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-gray-950 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-[0.025]">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }} />
          </div>

          {/* radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15)_0%,_transparent_60%)]" />

          {/* Circuit pattern decorations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Horizontal lines */}
            <motion.path
              d="M0 30 L30 30 L35 35 L65 35 L70 30 L100 30"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <motion.path
              d="M0 70 L30 70 L35 65 L65 65 L70 70 L100 70"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <motion.path
              d="M20 0 L20 40 L25 45 L25 55 L20 60 L20 100"
              stroke="rgba(59,130,246,0.2)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <motion.path
              d="M80 0 L80 40 L75 45 L75 55 L80 60 L80 100"
              stroke="rgba(59,130,246,0.2)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.7, repeat: Infinity, repeatDelay: 0.5 }}
            />
            {/* Pulse nodes */}
            <motion.circle cx="30" cy="35" r="0.8" fill="rgba(59,130,246,0.6)"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle cx="70" cy="35" r="0.8" fill="rgba(59,130,246,0.6)"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
            />
            <motion.circle cx="25" cy="50" r="1" fill="rgba(59,130,246,0.8)"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle cx="75" cy="50" r="1" fill="rgba(59,130,246,0.8)"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
          </svg>

          {/* Glowing orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"
          />

          {/* Main loader content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 -m-4"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              </motion.div>

              {/* Outer rings */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 -m-6 border border-blue-500/20 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 -m-10 border border-blue-500/10 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 -m-14 border border-cyan-500/5 rounded-full"
              />

              {/* Core logo */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40"
              >
                <HiLightningBolt className="w-14 h-14 text-white" />
              </motion.div>

              {/* Energy pulse */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: [0.95, 1.1, 0.95], opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 rounded-2xl"
              />
            </motion.div>

            {/* Company name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mb-8"
            >
              <motion.h1
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold text-white tracking-wide font-['Sora']"
              >
                Silicon
              </motion.h1>
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, delay: 0.1, repeat: Infinity }}
                className="text-xs font-semibold text-blue-400 tracking-[0.4em] uppercase mt-1"
              >
                International
              </motion.p>
            </motion.div>

            {/* Loading status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-4 text-blue-300/80 text-sm"
            >
              {(() => {
                const IconCmp = loadingStates[stateIndex].icon;
                return <IconCmp className="w-4 h-4 animate-pulse" />;
              })()}
              <span className="font-medium">{loadingStates[stateIndex].label}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >...</motion.span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-1 bg-gray-800 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full"
              />
              {/* Shimmer */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>

            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs font-mono text-blue-400/60 tabular-nums"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 text-xs text-gray-500 tracking-widest uppercase"
          >
            Industrial Automation • Electronics Engineering • Software Solutions
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
