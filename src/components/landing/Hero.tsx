'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: false })
}

export default function Hero() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(getCurrentTime())
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleStartClick = () => {
    const experienceSection = document.getElementById('experience')
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-accent-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-accent-secondary/5 rounded-full blur-[120px]" />
        
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-12 left-6 md:left-12 flex flex-col items-start gap-1"
        >
          <span className="text-xs font-mono text-accent-primary/80 tracking-widest">
            SOFTWARE ENGINEER
          </span>
          <span className="text-[10px] font-mono text-white/30">
            LAT: 52.5200° N / LNG: 13.4050° E
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-12 right-6 md:right-12 text-right hidden md:block"
        >
          <span className="text-xs font-mono text-white/50 tracking-widest block">
            SYSTEM TIME
          </span>
          <span className="text-sm font-mono text-accent-primary">
            {time}
          </span>
        </motion.div>

        <div className="flex flex-col items-center mt-12 md:mt-0">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-[0.85] md:leading-[0.9] text-white mix-blend-difference"
            >
              TAMMY
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="text-[15vw] md:text-[10vw] font-bold tracking-tighter leading-[0.85] md:leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent"
            >
              PORTFOLIO
            </motion.h1>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-sm md:text-base text-white/50 max-w-md font-mono leading-relaxed"
        >
          Crafting high-performance digital experiences with focus on motion, interactivity, and precision.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
          className="group mt-16 px-8 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-accent-primary/50 transition-all duration-300"
        >
          <span className="text-sm font-mono text-white tracking-widest group-hover:text-accent-primary transition-colors">
            ENTER SYSTEM
          </span>
        </motion.button>
      </div>

      <div className="absolute bottom-12 left-0 w-full px-6 md:px-12 flex justify-between items-end pointer-events-none">
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            Online Status: Active
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase writing-mode-vertical rotate-180">
            SCROLL
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-[10px] font-mono text-white/20"
        >
          v3.0.1 [BETA]
        </motion.div>
      </div>
    </section>
  )
}
