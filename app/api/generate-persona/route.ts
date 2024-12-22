import { NextResponse } from 'next/server'
import { generatePersona } from '../../../src/lib/openai'

export async function GET() {
  try {
    const persona = await generatePersona()
    return NextResponse.json(persona)
  } catch (error) {
    console.error('Persona generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate persona' },
      { status: 500 }
    )
  }
}
