'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 bg-bg-secondary/80 backdrop-blur-sm border-b border-accent-primary/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-mono font-bold text-accent-primary text-glow-green hover:text-accent-secondary transition-colors"
          >
            {'<TB />'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-text-secondary hover:text-accent-primary transition-colors font-mono"
            >
              About
            </Link>
            <Link
              href="#experience"
              className="text-text-secondary hover:text-accent-primary transition-colors font-mono"
            >
              Experience
            </Link>
            <Link
              href="#contact"
              className="text-text-secondary hover:text-accent-primary transition-colors font-mono"
            >
              Contact
            </Link>
            <Link
              href="#hire"
              className="px-4 py-2 bg-accent-primary text-bg-primary font-mono font-semibold hover:bg-accent-secondary transition-colors"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="#about"
              className="block text-text-secondary hover:text-accent-primary transition-colors font-mono"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#experience"
              className="block text-text-secondary hover:text-accent-primary transition-colors font-mono"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#contact"
              className="block text-text-secondary hover:text-accent-primary transition-colors font-mono"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#hire"
              className="block px-4 py-2 bg-accent-primary text-bg-primary font-mono font-semibold hover:bg-accent-secondary transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
