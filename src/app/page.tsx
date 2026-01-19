import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Intro from '@/components/landing/Intro'
import Skills from '@/components/landing/Skills'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-bg-primary">
        <Hero />
        <Intro />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
