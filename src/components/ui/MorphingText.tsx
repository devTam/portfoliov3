'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface MorphingTextProps {
  text: string
  className?: string
  duration?: number
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#&+-/\\"

export default function MorphingText({ 
  text, 
  className = "",
  duration = 3.5
}: MorphingTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const finalText = text
    
    // Create the animation context
    const ctx = gsap.context(() => {
      // Create a timeline that is paused initially
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%", // Start when top of element hits 90% viewport height
          toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
        }
      })

      // Set initial opacity
      tl.set(element, { opacity: 1 })

      // Scramble IN effect
      tl.to(element, {
        duration: duration,
        ease: "power2.out",
        onUpdate: function() {
          const progress = this.progress()
          const totalLength = finalText.length
          const revealPosition = progress * totalLength
          const revealLength = Math.floor(revealPosition)
          
          let result = ""
          
          for (let i = 0; i < totalLength; i++) {
            if (i < revealLength) {
              // Character is fully revealed
              result += finalText[i]
            } else if (i === revealLength) {
              // Current character being morphed (unless it's a space)
              if (finalText[i] === " ") {
                result += " "
              } else {
                result += CHARS[Math.floor(Math.random() * CHARS.length)]
              }
            } else {
              // Not reached yet - preserve spaces, underscore for others
              result += finalText[i] === " " ? " " : "_"
            }
          }
          
          element.innerText = result
        }
      })

    }, textRef)

    return () => ctx.revert()
  }, [text])

  return (
    <div 
      ref={textRef} 
      className={`font-mono opacity-0 ${className}`}
      aria-label={text}
    >
      {/* Initial render: preserve spaces, use underscores for characters */}
      {text.split('').map(char => (char === ' ' ? ' ' : '_')).join('')} 
    </div>
  )
}
