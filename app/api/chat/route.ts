import { NextResponse } from 'next/server'
import { generateResponse } from '@/src/lib/openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

export async function POST(req: Request) {
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
      { error: error instanceof Error ? error.message : 'Failed to generate response' },
      { status: 500 }
    )
  }
}
