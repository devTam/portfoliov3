'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function GlitchText({ text, className = "" }: { text: string, className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      
      <motion.span
        className="absolute top-0 left-0 -z-10 opacity-0 text-accent-primary"
        animate={isHovered ? {
            opacity: [0, 1, 0, 1, 0],
            x: [-2, 2, -1, 0],
            y: [1, -1, 0],
        } : {}}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute top-0 left-0 -z-10 opacity-0 text-accent-tertiary mix-blend-screen"
        animate={isHovered ? {
            opacity: [0, 1, 0],
            x: [2, -2, 0],
            y: [-1, 1, 0],
        } : {}}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
      >
        {text}
      </motion.span>
    </div>
  )
}
