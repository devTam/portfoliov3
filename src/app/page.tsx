import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-accent-primary text-glow-green font-mono">
            Portfolio Website
          </h1>
          <p className="mt-4 text-text-secondary">
            Phase 1 setup complete. Ready for Phase 2 implementation.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
