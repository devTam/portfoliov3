'use client'

import { motion } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import MorphingText from '@/components/ui/MorphingText'

export default function Contact() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-accent-primary font-mono text-xs tracking-[0.2em]">UPLINK SECURE</span>
            </div>
            
            <div className="h-32 md:h-32 mb-6 flex items-center justify-center">
              <MorphingText 
                text="INITIATE TRANSMISSION"
                className="text-4xl md:text-7xl font-bold text-white tracking-tight text-center max-w-[12ch] md:max-w-none mx-auto"
                duration={4}
              />
            </div>
            
            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
              Available for freelance contracts and full-time engagements.
              System ready for incoming connection requests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Magnetic>
              <motion.a
                href="mailto:tammy.batubo@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-8 bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-300 overflow-hidden block rounded-sm"
              >
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono text-accent-primary">[EMAIL_PROTOCOL]</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">
                  Send Email
                </h3>
                <p className="text-white/40 font-mono text-sm">tammy.batubo@gmail.com</p>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-accent-primary transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-accent-primary transition-colors" />
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href="https://www.linkedin.com/in/tammybatubo/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-8 bg-white/5 border border-white/10 hover:border-accent-secondary/50 transition-all duration-300 overflow-hidden block rounded-sm"
              >
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono text-accent-secondary">[LINKEDIN_NET]</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-secondary transition-colors">
                  Connect
                </h3>
                <p className="text-white/40 font-mono text-sm">linkedin.com/in/tammybatubo</p>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-accent-secondary transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-accent-secondary transition-colors" />
              </motion.a>
            </Magnetic>
          </div>

          <div className="mt-20 flex justify-center gap-12 opacity-30">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono">LATENCY</span>
              <span className="text-accent-primary font-mono text-lg">12ms</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono">ENCRYPTION</span>
              <span className="text-accent-primary font-mono text-lg">AES-256</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
