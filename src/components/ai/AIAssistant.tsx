'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "SYSTEM ONLINE. I am the Portfolio Core AI. Ask me about Tammy's skills, experience, or current availability.",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userText = inputValue
    setInputValue('')
    
    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      // Prepare context for API: Convert to minimal format
      // Sending last 10 messages for context window
      const apiMessages = [...messages, userMsg].slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data = await response.json()
      
      const systemMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, systemMsg])
    } catch (error) {
      console.error('Chat Error:', error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "SYSTEM ERROR: Uplink failed. Please check your internet connection or API configuration.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-accent-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
            >
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-accent-primary tracking-widest uppercase">
                SYSTEM ONLINE // QUERY CORE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          aria-label="Open AI Assistant"
          className="relative w-20 h-20 rounded-full bg-black/90 border-2 border-accent-primary/60 backdrop-blur-md flex items-center justify-center group hover:border-accent-primary hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
        >
          {!isOpen && (
            <div className="absolute inset-0">
              <Image 
                src="/ai-avatar.jpg" 
                alt="AI Avatar" 
                fill
                unoptimized
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/20 to-transparent animate-scan" style={{ animationDuration: '2s' }} />
            </div>
          )}
          <div className="absolute inset-0 border-2 border-transparent border-t-accent-primary rounded-full animate-spin" style={{ animationDuration: '3s' }} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-[400px] h-[58vh] md:h-[500px] bg-black/90 border border-white/10 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none border border-accent-primary/20 m-1 rounded" />

            <div className="relative z-10 p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-accent-primary tracking-widest">
                  SYSTEM CORE // ACTIVE
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative h-32 w-full overflow-hidden border-b border-white/10 bg-black">
                <Image 
                  src="/ai-avatar.jpg" 
                  alt="AI Core" 
                  fill
                  unoptimized
                  className="object-cover object-top opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-2 left-4 text-xs font-mono text-white/60">
                  <span className="text-accent-primary">[AI_MODEL]</span> TACTICAL_ASSISTANT_V2
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`
                      max-w-[85%] p-3 rounded-sm font-mono text-xs md:text-sm leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-white/10 text-white border border-white/10' 
                        : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[9px] text-white/20 mt-1 uppercase font-mono">
                    {msg.role === 'user' ? 'YOU' : 'SYS_CORE'}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-accent-primary/10 border border-accent-primary/20 p-3 rounded-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                  <span className="text-[9px] text-white/20 mt-1 uppercase font-mono ml-2 self-center">
                    PROCESSING...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="ENTER COMMAND..."
                  className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-sm px-3 py-2 focus:outline-none focus:border-accent-primary/50 placeholder-white/20"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 py-2 bg-white/5 border border-white/10 text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary/50 transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 12h16" />
                  </svg>
                </button>
              </div>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
