'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Intro from '@/components/landing/Intro'
import Contact from '@/components/landing/Contact'
import GlobeSection from '@/components/globe/GlobeSection'
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
