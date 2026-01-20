'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger'
  delay?: number
  duration?: number
  staggerChildren?: boolean
  staggerDelay?: number
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 1,
  staggerChildren = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const element = containerRef.current
    
    const initialState: gsap.TweenVars = {
      opacity: 0,
    }
    
    const animateState: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
    }

    switch (animation) {
      case 'slideUp':
        initialState.y = 80
        animateState.y = 0
        break
      case 'slideLeft':
        initialState.x = 80
        animateState.x = 0
        break
      case 'slideRight':
        initialState.x = -80
        animateState.x = 0
        break
      case 'scale':
        initialState.scale = 0.8
        animateState.scale = 1
        break
      default:
        break
    }

    if (staggerChildren) {
      gsap.set(element.children, initialState)
    } else {
      gsap.set(element, initialState)
    }

    const ctx = gsap.context(() => {
      if (staggerChildren) {
        gsap.to(element.children, {
          ...animateState,
          stagger: staggerDelay,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        })
      } else {
        gsap.to(element, {
          ...animateState,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        })
      }
    }, element)

    return () => ctx.revert()
  }, [animation, delay, duration, staggerChildren, staggerDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Section wrapper with default scroll animations
interface ScrollSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function ScrollSection({ children, className = '', id }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    
    // Find all elements with data-scroll attribute
    const scrollElements = section.querySelectorAll('[data-scroll]')
    
    const ctx = gsap.context(() => {
      scrollElements.forEach((el) => {
        const animation = el.getAttribute('data-scroll') || 'fade'
        const delay = parseFloat(el.getAttribute('data-scroll-delay') || '0')
        
        const initialState: gsap.TweenVars = { opacity: 0 }
        const animateState: gsap.TweenVars = {
          opacity: 1,
          duration: 1,
          delay,
          ease: 'power3.out',
        }

        switch (animation) {
          case 'up':
            initialState.y = 60
            animateState.y = 0
            break
          case 'left':
            initialState.x = 60
            animateState.x = 0
            break
          case 'right':
            initialState.x = -60
            animateState.x = 0
            break
          case 'scale':
            initialState.scale = 0.9
            animateState.scale = 1
            break
        }

        gsap.set(el, initialState)
        
        gsap.to(el, {
          ...animateState,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={className} id={id}>
      {children}
    </section>
  )
}
