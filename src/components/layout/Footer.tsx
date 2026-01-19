import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-accent-primary/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-text-tertiary text-sm font-mono">
            © {currentYear} Tammy Inoma-Batubo. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="mailto:tammy.batubo@gmail.com"
              className="text-text-secondary hover:text-accent-primary transition-colors font-mono text-sm"
              aria-label="Email"
            >
              Email
            </Link>
            <Link
              href="https://linkedin.com/in/tammybatubo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors font-mono text-sm"
              aria-label="LinkedIn"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
