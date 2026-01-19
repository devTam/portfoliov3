import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import { PORTFOLIO_CONTEXT } from '@/lib/data/context'
import { checkStaticCache } from '@/lib/data/static-cache'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content

    // 1. Check Static Cache first (Cost: $0)
    const cachedResponse = checkStaticCache(latestMessage)
    if (cachedResponse) {
      return NextResponse.json({ role: 'assistant', content: cachedResponse })
    }

    // Use Mock response if no API key is present (Safety Fallback)
    if (!process.env.OPENAI_API_KEY) {
       return NextResponse.json({ 
         role: 'assistant', 
         content: "SYSTEM ALERT: EXTERNAL UPLINK OFFLINE (Missing API Key). \n\nI am currently operating in limited mode. Please provision an OPENAI_API_KEY in the environment variables to enable full cognitive subsystems." 
       })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: PORTFOLIO_CONTEXT },
        ...messages.map((m: { role: string, content: string }) => ({
             role: m.role,
             content: m.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const responseContent = completion.choices[0].message.content

    return NextResponse.json({ role: 'assistant', content: responseContent })
  } catch (error) {
    console.error('AI Error:', error)
    return NextResponse.json({ 
      role: 'assistant', 
      content: "SYSTEM ERROR: SIGNAL LOST. \n\nUnable to process query due to internal server interference. Please re-initiate transmission."
    }, { status: 500 })
  }
}
