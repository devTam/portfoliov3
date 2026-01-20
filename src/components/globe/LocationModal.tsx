'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Company } from '@/lib/data/companies'
import { format } from 'date-fns'

interface LocationModalProps {
  company: Company | null
  isOpen: boolean
  onClose: () => void
}

export default function LocationModal({
  company,
  isOpen,
  onClose,
}: LocationModalProps) {
  if (!company) return null

  const formatDate = (dateString: string) => {
    if (dateString === 'Present') return 'Present'
    try {
      const date = new Date(dateString + '-01')
      return format(date, 'MMM yyyy')
    } catch {
      return dateString
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-secondary border-l border-accent-primary/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-mono text-accent-primary mb-2">
                    {company.name}
                  </h2>
                  <p className="text-text-secondary font-mono">
                    {company.role}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-tertiary hover:text-accent-primary transition-colors font-mono text-2xl"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-text-secondary font-mono text-sm mb-2">
                  <span className="text-accent-primary">📍</span>
                  <span>
                    {company.location.city}, {company.location.country}
                  </span>
                  <span className="text-accent-secondary">
                    {company.type === 'remote' ? '(Remote)' : '(On-site)'}
                  </span>
                </div>
                <div className="text-text-tertiary font-mono text-sm">
                  {formatDate(company.period.start)} -{' '}
                  {formatDate(company.period.end)}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold font-mono text-text-primary mb-3">
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {company.impact.map((item, index) => (
                    <li
                      key={index}
                      className="text-text-secondary font-sans text-sm flex items-start gap-2"
                    >
                      <span className="text-accent-primary mt-1">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold font-mono text-text-primary mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {company.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-bg-tertiary border border-accent-secondary/30 rounded-full text-text-secondary font-mono text-xs hover:border-accent-secondary hover:text-accent-secondary transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
