'use client'

import { motion } from 'framer-motion'

export default function Contact() {

  return (
    <section id="contact" className="relative py-32 bg-bg-primary overflow-hidden">
      {/* Background Noise & Grid */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Left Column - Header */}
          <div className="md:w-1/3">
            <span className="text-xs font-mono text-accent-primary mb-6 block tracking-widest">
              // UPLINK_ESTABLISHED
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-mono text-white mb-6 tracking-tighter leading-none">
              INITIATE<br/>
              CONTACT<br/>
              PROTOCOL
            </h2>
            <p className="font-mono text-sm text-white/50 leading-relaxed border-l border-white/10 pl-6">
              Available for freelance contracts and engineering collaborations. Secure channels are open.
            </p>
            
            {/* HUD Status */}
            <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-sm inline-block">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${status === 'SENDING' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
                  SYSTEM READY
                </span>
              </div>
              <div className="text-[10px] font-mono text-white/30">
                LATENCY: 12ms<br/>
                ENCRYPTION: AES-256
              </div>
            </div>
          </div>

          {/* Right Column - Direct Links */}
          <div className="md:w-2/3 max-w-2xl flex flex-col justify-center gap-8">
            
            {/* Email Uplink */}
            <motion.a
              href="mailto:tammy.batubo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-accent-primary tracking-widest uppercase">
                    [ SECURE_CHANNEL_01 ]
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-mono text-white group-hover:text-accent-primary transition-colors">
                    SEND TRANSMISSION
                  </h3>
                  <span className="text-sm font-mono text-white/40">
                    tammy.batubo@gmail.com
                  </span>
                </div>
                <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full group-hover:border-accent-primary group-hover:bg-accent-primary/10 transition-colors">
                  <svg className="w-5 h-5 text-white group-hover:text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-accent-primary transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-accent-primary transition-colors" />
            </motion.a>

            {/* LinkedIn Uplink */}
            <motion.a
              href="https://linkedin.com/in/tammybatubo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 bg-white/5 border border-white/10 hover:border-accent-secondary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-accent-secondary tracking-widest uppercase">
                    [ SECURE_CHANNEL_02 ]
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-mono text-white group-hover:text-accent-secondary transition-colors">
                    ESTABLISH CONNECTION
                  </h3>
                  <span className="text-sm font-mono text-white/40">
                    linkedin.com/in/tammybatubo
                  </span>
                </div>
                <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full group-hover:border-accent-secondary group-hover:bg-accent-secondary/10 transition-colors">
                  <svg className="w-5 h-5 text-white group-hover:text-accent-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-accent-secondary transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-accent-secondary transition-colors" />
            </motion.a>

          </div>

        </div>
      </div>
    </section>
  )
}
