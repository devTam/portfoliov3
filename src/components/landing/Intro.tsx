'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlitchText from '@/components/ui/GlitchText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { label: 'YEARS ESP', value: '05' },
  { label: 'COMPANIES', value: '07' },
  { label: 'PROJECTS', value: '50+' },
  { label: 'STACK_SIZE', value: '20+' },
]

const techStack = [
  'REACT', 'TYPESCRIPT', 'NODE_JS', 'NEXT_JS',
  'EXPRESS', 'MONGODB', 'POSTGRESQL', 'AWS',
  'DOCKER', 'GRAPHQL', 'REDUX', 'WEB3'
]

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (!sectionRef.current) return
    
    // Animate stats
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#intro-stats',
          start: 'top 80%',
        }
      })

      gsap.from('.tech-item', {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '#intro-tech',
          start: 'top 80%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="intro" ref={sectionRef} className="relative py-32 bg-bg-primary border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column - Bio */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono text-accent-primary mb-6 block tracking-widest">
              {/* // ABOUT_PROFILE */}
              ABOUT_PROFILE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight uppercase font-mono tracking-tighter">
              <GlitchText text="Analytical" /><br/>
              <span className="text-white/40"><GlitchText text="Results-Driven" /></span><br/>
              <GlitchText text="Collaborative" />
            </h2>
            <div className="font-mono text-sm md:text-base text-white/60 space-y-6 leading-relaxed max-w-2xl border-l border-white/10 pl-6">
              <p>
                Senior Software Engineer with 5+ years of experience specializing in high-performance Full-Stack JavaScript applications. 
                Expert in architecting scalable systems using React, Node.js, and Cloud Infrastructure.
              </p>
              <p>
                Passionate about bridging the gap between design and engineering, creating interactive web experiences that push boundaries.
              </p>
            </div>
          </div>

          {/* Right Column - Data Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Stats */}
            <div id="intro-stats" className="grid grid-cols-2 gap-x-8 gap-y-12 mb-16">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item flex flex-col border-t border-white/20 pt-4">
                  <span className="text-4xl md:text-5xl font-mono font-bold text-white mb-2 tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-accent-primary tracking-widest uppercase opacity-80">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack - Raw Data Look */}
            <div id="intro-tech">
              <span className="text-xs font-mono text-white/30 mb-6 block tracking-widest border-b border-white/10 pb-2">
                {/* // SYSTEM_DEPENDENCIES */}
                SYSTEM_DEPENDENCIES
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="tech-item px-3 py-1 bg-white/5 border border-white/5 text-[10px] md:text-xs font-mono text-white/70 hover:text-accent-primary hover:border-accent-primary/40 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
