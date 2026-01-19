'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'


function getCurrentDate() {
  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
}

const greetings = [
  'HI THERE', // English
  'HOLA', // Spanish
  'SALUT', // French
  'HALLO', // German
  '你好', // Mandarin Chinese
]

function GlitchText() {
  const [isHovered, setIsHovered] = useState(false)
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setCurrentGreeting(0)
      setIsGlitching(false)
      return
    }

    let interval: NodeJS.Timeout | null = null
    let timeout: NodeJS.Timeout | null = null

    // Show first greeting immediately with glitch
    setIsGlitching(true)
    const firstGlitchTimeout = setTimeout(() => {
      setCurrentGreeting(0)
      setTimeout(() => {
        setIsGlitching(false)
      }, 100)
    }, 300)
    
    // Then cycle through all greetings
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => {
          setCurrentGreeting((prev) => (prev + 1) % greetings.length)
          setTimeout(() => {
            setIsGlitching(false)
          }, 100)
        }, 300) // Glitch duration
      }, 3000) // Change greeting every 3 seconds
    }, 3300) // Start cycling after first greeting is shown

    return () => {
      clearTimeout(firstGlitchTimeout)
      if (timeout) clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [isHovered])

  const displayText = isHovered ? greetings[currentGreeting] : 'TAMMY'

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block cursor-default bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent"
      style={{
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      animate={
        isGlitching
          ? {
              opacity: [1, 0.5, 1, 0.3, 1, 0.5, 1],
              x: [0, -3, 3, -4, 4, -3, 0],
              y: [0, 2, -2, 1, -1, 0, 0],
              filter: [
                'none',
                'none',
                'none',
                'none',
                'none',
                'none',
                'none',
              ],
              backgroundPosition: [
                '0% 50%',
                '100% 50%',
                '0% 50%',
                '100% 50%',
                '0% 50%',
                '100% 50%',
                '0% 50%',
              ],
            }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              filter: 'none',
            }
      }
      transition={{
        duration: isGlitching ? 0.3 : 5,
        repeat: isGlitching ? 0 : Infinity,
        ease: isGlitching ? 'linear' : 'easeInOut',
        times: isGlitching ? [0, 0.2, 0.4, 0.5, 0.7, 0.85, 1] : undefined,
      }}
    >
      {displayText}
    </motion.span>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg-primary">
      {/* Techy Background Layers */}
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Hexagonal Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                30deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 65, 0.1) 2px,
                rgba(0, 255, 65, 0.1) 4px
              ),
              repeating-linear-gradient(
                -30deg,
                transparent,
                transparent 2px,
                rgba(0, 212, 255, 0.1) 2px,
                rgba(0, 212, 255, 0.1) 4px
              )
            `,
          }}
        />
      </div>

      {/* Circuit Board Lines */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 0 50 L 100 50 M 50 0 L 50 100"
                stroke="rgba(0, 255, 65, 0.3)"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="50" cy="50" r="2" fill="rgba(0, 255, 65, 0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Binary Code Scrolling Effect */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden">
        {mounted ? (
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-accent-primary text-xs"
              style={{
                left: `${(i * 5) % 100}%`,
                top: '-20px',
              }}
              animate={{
                y: ['0vh', '100vh'],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 20 }, () =>
                Math.random() > 0.5 ? '1' : '0'
              ).join(' ')}
            </motion.div>
          ))
        ) : null}
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.1) 2px,
              rgba(0, 255, 65, 0.1) 4px
            )`,
          }}
        />
      </div>

      {/* Glowing Grid Points */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        {mounted && [...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary rounded-full"
            style={{
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Top section - Date and location (Fixed at top) */}
      <div className="top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-sm md:text-base font-mono text-text-tertiary"
          >
            <div>{getCurrentDate()}</div>
            <div className="flex items-center gap-2">
              <motion.span
                className="text-accent-primary"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ●
              </motion.span>
              <span>Available</span>
            </div>
          </motion.div>
        </div>
      </div>



      {/* Center section - Main name with glitch effect (80% of viewport) */}
      <div className="h-[80vh] flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-mono tracking-wider leading-none mb-6 relative"
            >
              <GlitchText />
            </motion.h1>
            
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="text-xl md:text-2xl lg:text-3xl font-mono text-text-secondary tracking-wide"
            >
              Software Engineer
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
