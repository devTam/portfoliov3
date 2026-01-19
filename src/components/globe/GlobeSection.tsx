'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Globe3D from './Globe3D'
import LocationModal from './LocationModal'
import { Company } from '@/lib/data/companies'

// Dynamically import Globe3D to avoid SSR issues
const Globe3DDynamic = dynamic(() => Promise.resolve(Globe3D), { ssr: false })

export default function GlobeSection() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMarkerClick = useCallback((company: Company) => {
    setSelectedCompany(company)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    // Delay clearing company so beam can fade out with modal
    setTimeout(() => {
      setSelectedCompany(null)
    }, 300)
  }, [])

  return (
    <section
      id="experience"
      className="relative min-h-screen py-20 bg-bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-accent-primary text-glow-green">
            Experience Around the Globe
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-sans max-w-2xl mx-auto">
            Explore my professional journey across different locations and companies
          </p>
        </div>

        {/* Globe Container - seamless integration */}
        <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
          <Globe3DDynamic
            onMarkerClick={handleMarkerClick}
            selectedCompanyId={isModalOpen ? selectedCompany?.id ?? null : null}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-text-tertiary font-mono text-sm">
            Click on markers to view company details • Drag to rotate • Scroll to zoom
          </p>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
