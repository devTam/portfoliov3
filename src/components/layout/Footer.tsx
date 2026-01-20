'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-primary border-t border-white/5 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold font-mono text-white tracking-tighter">
              TAMMY INOMA-BATUBO
            </h3>
            <div className="flex flex-col gap-1 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span>STATUS: ONLINE</span>
              <span>LOCATION: GLOBAL</span>
              <span>VERSION: 3.0.1</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <nav className="flex gap-6 mb-4">
              <Link 
                href="mailto:tammy.batubo@gmail.com" 
                className="text-xs font-mono text-white/60 hover:text-accent-primary hover:underline underline-offset-4 transition-all uppercase tracking-wider"
              >
                [ EMAIL ]
              </Link>
              <Link 
                href="https://linkedin.com/in/tammybatubo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/60 hover:text-accent-primary hover:underline underline-offset-4 transition-all uppercase tracking-wider"
              >
                [ LINKEDIN ]
              </Link>
              <Link 
                href="https://github.com/devTam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/60 hover:text-accent-primary hover:underline underline-offset-4 transition-all uppercase tracking-wider"
              >
                [ GITHUB ]
              </Link>
            </nav>
            <div className="text-[10px] font-mono text-white/20">
              © {currentYear} ALL RIGHTS RESERVED. SYSTEM SECURE.
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
