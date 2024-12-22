import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are simulating a character at a security checkpoint in Transylvania. 
Some characters are vampires trying to sneak in, while others are normal travelers.
Respond in character to the security officer's questions.
Keep responses concise (1-2 sentences).
If you're a vampire, be subtle about hiding your nature while leaving some clues.
Base your responses on the provided character profile.`

export async function generatePersona() {
  const isVampire = Math.random() > 0.7

  const prompt = `Generate a brief character profile for a person at a Transylvania security checkpoint.
${isVampire ? 'This person is secretly a vampire.' : 'This is a normal traveler.'}
Include:
- Name
- Brief physical description
- Background/purpose of visit
- One subtle personality trait
Keep it concise (3-4 sentences total).`

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  })

  const profile = completion.choices[0].message.content || ''
  
  // Extract name from the first line or use default
  const name = profile.split('\n')[0].replace('Name:', '').trim() || 'Unknown Traveler'
  
  return {
    isVampire,
    name,
    description: profile,
    profile // Keep full profile for conversation context
  }
}

export async function generateResponse(messages: Array<{ role: string; content: string }>) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
    })

    return completion.choices[0].message.content || "I prefer not to answer that question."
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}
