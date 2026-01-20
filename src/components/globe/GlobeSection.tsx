'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Globe3D from './Globe3D'
import LocationModal from './LocationModal'
import { companies, Company } from '@/lib/data/companies'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Dynamically import Globe3D to avoid SSR issues
const Globe3DDynamic = dynamic(() => Promise.resolve(Globe3D), { ssr: false })

// Filter out companies with invalid coordinates for the tour
const tourCompanies = companies.filter(
  c => !(c.location.coordinates.lat === 0 && c.location.coordinates.lng === 0)
)

const TOUR_INTERVAL = 5000 // 3 seconds per location
const MANUAL_PAUSE = 15000 // 15 seconds pause for manual navigation

export default function GlobeSection() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isAutoMode, setIsAutoMode] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const featuredCompany = tourCompanies[featuredIndex] || null

  useEffect(() => {
    if (isPaused || isModalOpen || !isAutoMode) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % tourCompanies.length)
    }, TOUR_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, isModalOpen, isAutoMode])

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [])

  const pauseAndResume = useCallback(() => {
    setIsPaused(true)
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, MANUAL_PAUSE)
  }, [])

  const handlePrev = useCallback(() => {
    setFeaturedIndex((prev) => 
      prev === 0 ? tourCompanies.length - 1 : prev - 1
    )
    pauseAndResume()
  }, [pauseAndResume])

  const handleNext = useCallback(() => {
    setFeaturedIndex((prev) => 
      (prev + 1) % tourCompanies.length
    )
    pauseAndResume()
  }, [pauseAndResume])

  const toggleAutoMode = useCallback(() => {
    setIsAutoMode(prev => !prev)
    setIsPaused(false)
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
  }, [])

  const handleMarkerClick = useCallback((company: Company) => {
    setSelectedCompany(company)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedCompany(null)
    }, 300)
  }, [])

  const handleHoverStart = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setIsPaused(false)
  }, [])

  const sectionRef = useRef<HTMLElement>(null)
  const globeContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-32 bg-bg-primary overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col mb-16 px-4 border-l border-white/10 pl-8">
          <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-6xl md:text-8xl font-bold font-mono text-white/90 leading-none tracking-tighter"
          >
            GLOBAL<br/>EXPERIENCE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm font-mono text-accent-primary max-w-md"
          >
            {"// EXPLORING PROFESSIONAL JOURNEY ACROSS COORDINATES"}
          </motion.p>
        </div>

        <div ref={globeContainerRef} className="relative w-full h-[500px] md:h-[700px] border-t border-b border-white/5 bg-black/20">
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                Interactive Map System
              </span>
            </div>
          </div>

          <Globe3DDynamic
            onMarkerClick={handleMarkerClick}
            selectedCompanyId={isModalOpen ? selectedCompany?.id ?? null : null}
            featuredCompanyId={!isModalOpen ? featuredCompany?.id ?? null : null}
            isPaused={isPaused || isModalOpen}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
          
          <div className="absolute bottom-6 left-0 w-full px-6 md:px-12 flex justify-between items-end pointer-events-none">
            
            <div className="pointer-events-auto">
              <AnimatePresence mode="wait">
                {featuredCompany && (
                  <motion.div
                    key={featuredCompany.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 text-[10px] font-mono text-accent-primary/60 mb-1">
                      <span>LOCATION.ID: {String(featuredIndex + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-mono text-white leading-none">
                      {featuredCompany.name}
                    </h3>
                    <p className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 inline-block mt-2 backdrop-blur-sm rounded-sm self-start">
                      {featuredCompany.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-end gap-4 pointer-events-auto">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-white/80 hover:text-white"
                  aria-label="Previous"
                >
                  ←
                </button>
                
                <div className="h-4 w-px bg-white/10 mx-2" />
                
                <button
                  onClick={toggleAutoMode}
                  className={`px-3 py-1.5 text-[10px] font-mono tracking-wider rounded transition-all ${
                    isAutoMode 
                      ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30' 
                      : 'bg-white/5 text-white/40 hover:text-white/80'
                  }`}
                >
                  {isAutoMode ? 'AUTO [ON]' : 'AUTO [OFF]'}
                </button>

                <div className="h-4 w-px bg-white/10 mx-2" />

                <button
                  onClick={handleNext}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-white/80 hover:text-white"
                  aria-label="Next"
                >
                  →
                </button>
              </div>

              <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-accent-primary"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((featuredIndex + 1) / tourCompanies.length) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <LocationModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
