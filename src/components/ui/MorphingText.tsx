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
          const revealLength = Math.floor(progress * finalText.length)
          
          let result = finalText.substring(0, revealLength)
          
          // Add random chars for the rest, but taper them off
          const remaining = finalText.length - revealLength
          for (let i = 0; i < remaining; i++) {
             // 50% chance to show a random char, else space (to give a typing feel)
             if (Math.random() > 0.1) {
                result += CHARS[Math.floor(Math.random() * CHARS.length)]
             } else {
                result += " "
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
      className={`font-mono opacity-0 ${className}`} // Start invisible
      aria-label={text}
    >
      {/* Initial render with underscores to reserve space/prevent layout shift */}
      {text.replace(/./g, '_')} 
    </div>
  )
}
