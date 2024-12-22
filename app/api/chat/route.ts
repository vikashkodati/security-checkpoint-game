import { NextResponse } from 'next/server'
import { generateResponse } from '@/src/lib/openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

export async function POST(req: Request) {
  if (typeof window === 'undefined' && !process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const messages = body.messages as ChatCompletionMessageParam[]

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const response = await generateResponse(messages)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
