import { NextResponse } from 'next/server'
import { generateResponse } from '../../../src/lib/openai'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages array' },
        { status: 400 }
      )
    }

    const systemMessage = messages.find(m => m.role === 'system')
    if (!systemMessage) {
      return NextResponse.json(
        { error: 'Missing system message' },
        { status: 400 }
      )
    }

    const response = await generateResponse(messages)
    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
