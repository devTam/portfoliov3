import { GoogleGenAI } from '@google/genai'
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import { PORTFOLIO_CONTEXT } from '@/lib/data/context'
import { checkStaticCache } from '@/lib/data/static-cache'

const googleClient = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '' 
})
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
})

const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash'
const FALLBACK_OPENAI_MODEL = 'gpt-4o-mini'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content

    // 1. Static Cache Check (Instant)
    const cachedResponse = checkStaticCache(latestMessage)
    if (cachedResponse) {
      return NextResponse.json({ role: 'assistant', content: cachedResponse })
    }

    // 2. Try Google Gemini (Primary Engine)
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        // Prepare contents for Gemini history
        // history must start with 'user'
        const firstUserIndex = messages.findIndex((m: { role: string }) => m.role === 'user')
        const filteredMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages

        const contents = filteredMessages.map((m: { role: string, content: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))

        const result = await googleClient.models.generateContent({
          model: DEFAULT_GEMINI_MODEL,
          contents: contents,
          config: {
            systemInstruction: PORTFOLIO_CONTEXT,
            temperature: 0.4,
            maxOutputTokens: 500,
          }
        })

        if (result.text) {
          return NextResponse.json({ role: 'assistant', content: result.text })
        }
      } catch (geminiError) {
        console.error('Gemini Engine Error - Falling back to OpenAI:', geminiError)
      }
    }

    // 3. Fallback to OpenAI (Secondary Engine)
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock-key') {
      try {
        const completion = await openai.chat.completions.create({
          model: FALLBACK_OPENAI_MODEL,
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages.map((m: { role: string, content: string }) => ({
                 role: m.role,
                 content: m.content
            }))
          ],
          temperature: 0.4,
          max_tokens: 300,
        })

        return NextResponse.json({ 
          role: 'assistant', 
          content: completion.choices[0].message.content 
        })
      } catch (openaiError) {
        console.error('OpenAI Engine Error:', openaiError)
      }
    }

    // 4. Critical Failure State
    return NextResponse.json({ 
      role: 'assistant', 
      content: "SYSTEM ALERT: ALL AI UPLINKS OFFLINE. \n\nPlease ensure GOOGLE_GENERATIVE_AI_API_KEY or OPENAI_API_KEY is configured." 
    })

  } catch (error) {
    console.error('Core Logic Error:', error)
    return NextResponse.json({ 
      role: 'assistant', 
      content: "SYSTEM ERROR: SIGNAL LOST. \n\nInternal server interference detected."
    }, { status: 500 })
  }
}
