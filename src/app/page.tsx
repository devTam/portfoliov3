'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Intro from '@/components/landing/Intro'
import dynamic from 'next/dynamic'
import Contact from '@/components/landing/Contact'
// Lazy load GlobeSection with SSR disabled for avoiding hydration mismatches and performance
const GlobeSection = dynamic(() => import('@/components/globe/GlobeSection'), { 
  ssr: false,
  loading: () => <div className="h-[700px] w-full bg-black/20" /> 
})
import LoadingScreen from '@/components/ui/LoadingScreen'
import AIAssistant from '@/components/ai/AIAssistant'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <main className="min-h-screen bg-bg-primary">
            <Hero />
            <GlobeSection />
            <Intro />
            <Contact />
            <AIAssistant />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
