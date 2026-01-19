export interface Message {
  id: string
  text: string
  sender: 'user' | 'system'
  timestamp: Date
}

type ResponsePattern = {
  keywords: string[]
  responses: string[]
  priority: number
}

const knowledgeBase: ResponsePattern[] = [
  {
    keywords: ['hire', 'contact', 'email', 'touch', 'available', 'job', 'contract', 'freelance'],
    priority: 10,
    responses: [
      "AFFIRMATIVE. I am currently available for new deployments. My expertise is ready to be utilized for your mission. You can initiate contact via the transmission links below.",
      "SYSTEM STATUS: OPEN FOR WORK. I accept freelance contracts and full-time engagements. Proceed to the designated Contact sector to establish a secure uplink.",
      "UPLINK PROTOCOLS: ACTIVE. I am ready to join your team. Please transmit your mission parameters (job description) via the email link below."
    ]
  },
  {
    keywords: ['stack', 'tech', 'technology', 'skill', 'language', 'framework', 'react', 'next', 'node', 'know'],
    priority: 8,
    responses: [
      "CORE SYSTEMS: High-proficiency in React, Next.js, and TypeScript. \nBACKEND SUBSYSTEMS: Node.js, PostgreSQL, and AWS infrastructure. \nOPTIMIZATION: Expert in performance tuning and interactive 3D web technologies (Three.js/R3F).",
      "My capability matrix includes: \n[FRONTEND]: React, Next.js, WebGL \n[BACKEND]: Node.js, Python, SQL/NoSQL \n[CLOUDOPS]: Docker, AWS, CI/CD pipelines.",
      "I specialize in full-stack architecture. From pixel-perfect frontend execution to robust backend scaling. Ask about a specific technology for detailed analysis."
    ]
  },
  {
    keywords: ['experience', 'work', 'history', 'company', 'companies', 'background', 'past'],
    priority: 8,
    responses: [
      "LOGS RETRIEVED: 5+ years of operational experience. \nMISSION HISTORY: Deployed code for 7+ major companies worldwide. \nSUCCESS RATE: 50+ projects delivered with high impact. \nYou can view detailed mission logs in the 'Experience' sector (Globe).",
      "I have operated across multiple sectors including FinTech, eCommerce, and Web3. My directive is always the same: Deliver high-quality, scalable software solutions."
    ]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'start', 'begin'],
    priority: 5,
    responses: [
      "SYSTEM ONLINE. Greetings. How may I assist you with your hiring decision today?",
      "CONNECTION ESTABLISHED. I am the Core System Assistant. Query me about my capabilities or work history.",
      "ACKNOWLEDGED. Ready to process your inquiries."
    ]
  },
  {
    keywords: ['salary', 'rate', 'cost', 'pay'],
    priority: 7,
    responses: [
      "FINANCIAL DATA CLASSIFIED. Please establish a direct channel via Email to discuss compensation parameters.",
      "Rates vary based on mission complexity and duration. Initiate an email transmission to receive a custom quote."
    ]
  },
  {
    keywords: ['who', 'are', 'you', 'name'],
    priority: 6,
    responses: [
      "I am the digital construct of Tammy's professional portfolio. My purpose is to facilitate your evaluation and potential hiring of the primary user.",
      "DESIGNATION: System Core AI. \nOPERATOR: Tammy Inoma-Batubo. \nOBJECTIVE: Demonstrate technical excellence."
    ]
  }
]

const fallbackResponses = [
  "INPUT UNRECOGNIZED. Please refine your query. You can ask about my skills, experience, or how to hire me.",
  "DATA NOT FOUND. Try querying about 'Tech Stack', 'Experience', or 'Contact Info'.",
  "COMMAND UNCLEAR. Rephrase: 'What is your experience?' or 'Are you available?'"
]

export function processQuery(input: string): string {
  const normalizedInput = input.toLowerCase()
  
  // Find best matching pattern
  const matches = knowledgeBase
    .filter(pattern => pattern.keywords.some(keyword => normalizedInput.includes(keyword)))
    .sort((a, b) => b.priority - a.priority)

  if (matches.length > 0) {
    // Pick random response from best match
    const responses = matches[0].responses
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Fallback
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}
