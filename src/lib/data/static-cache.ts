type CacheEntry = {
  keywords: string[]
  responses: string[]
  priority: number
}

const STATIC_CACHE: CacheEntry[] = [
  {
    keywords: ['hire', 'contact', 'email', 'touch', 'available', 'job', 'contract', 'freelance', 'work'],
    priority: 10,
    responses: [
      "SYSTEM STATUS: OPEN FOR WORK. I accept freelance contracts and full-time engagements. Proceed to the designated Contact sector to establish a secure uplink.",
      "UPLINK PROTOCOLS: ACTIVE. I am ready to join your team. Please transmit your mission parameters (job description) via the email link below."
    ]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'start', 'begin'],
    priority: 5,
    responses: [
      "SYSTEM ONLINE. Greetings. How may I assist you with your hiring decision today?",
      "CONNECTION ESTABLISHED. I am the Core System Assistant. Query me about my capabilities or work history."
    ]
  }
]

export function checkStaticCache(input: string): string | null {
  const normalizedInput = input.toLowerCase()
  
  const matches = STATIC_CACHE
    .filter(pattern => 
      pattern.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i')
        return regex.test(normalizedInput)
      })
    )
    .sort((a, b) => b.priority - a.priority)

  if (matches.length > 0) {
    const responses = matches[0].responses
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return null
}
