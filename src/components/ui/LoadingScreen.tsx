'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const loadingTexts = [
  'INITIALIZING SYSTEM...',
  'LOADING ASSETS...',
  'ESTABLISHING CONNECTION...',
  'RENDERING ENVIRONMENT...',
  'WELCOME, USER.',
]

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        // Random increment for realistic feel
        const increment = Math.random() * 5 + 1
        return Math.min(prev + increment, 100)
      })
    }, 150)

    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 800)

    return () => {
      clearInterval(timer)
      clearInterval(textTimer)
    }
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsComplete(true)
        setTimeout(() => {
          onLoadingComplete()
        }, 1000) // Wait for exit animation
      }, 500)
    }
  }, [progress, onLoadingComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ 
            opacity: 0, 
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
            {/* Counter */}
            <div className="font-mono text-9xl md:text-[12rem] font-bold text-white tracking-tighter leading-none mb-8 opacity-90">
              {Math.floor(progress)}%
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading Status Text */}
            <div className="w-full flex justify-between items-center text-xs font-mono text-white/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{progress === 100 ? 'SYSTEM READY' : loadingTexts[textIndex]}</span>
              </div>
              <div>ID: 8X-92</div>
            </div>
          </div>

          {/* Decorative Corners */}
          <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/30" />
          <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/30" />
          <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/30" />
          <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
