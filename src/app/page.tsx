import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Intro from '@/components/landing/Intro'
import Skills from '@/components/landing/Skills'
import GlobeSection from '@/components/globe/GlobeSection'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-bg-primary">
        <Hero />
        <GlobeSection />
        <Intro />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
