import { create } from 'zustand'

export interface Person {
  id: string
  isVampire: boolean
  name: string
  description: string
  profile: string
  conversation: Array<{ role: 'user' | 'assistant'; content: string }>
}

interface GameState {
  isGameStarted: boolean
  currentRound: number
  warnings: number
  peopleProcessed: number
  vampiresRejected: number
  successfulEntries: number
  currentPerson: Person | null
  isGameOver: boolean
  questionCount: number
  isLoading: boolean
  startGame: () => void
  endGame: () => void
  askQuestion: (question: string) => Promise<void>
  processPerson: (action: 'accept' | 'reject') => void
  generateNewPerson: () => Promise<void>
}

export const useGameStore = create<GameState>((set, get) => ({
  isGameStarted: false,
  currentRound: 0,
  warnings: 0,
  peopleProcessed: 0,
  vampiresRejected: 0,
  successfulEntries: 0,
  currentPerson: null,
  isGameOver: false,
  questionCount: 0,
  isLoading: false,

  startGame: () => {
    set({ 
      isGameStarted: true,
      currentRound: 1,
      warnings: 0,
      peopleProcessed: 0,
      vampiresRejected: 0,
      successfulEntries: 0,
      isGameOver: false,
      questionCount: 0
    })
    get().generateNewPerson()
  },

  endGame: () => {
    set({ isGameStarted: false, isGameOver: true })
  },

  askQuestion: async (question: string) => {
    const state = get()
    if (!state.currentPerson || state.questionCount >= 5) return

    set({ questionCount: state.questionCount + 1 })
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: state.currentPerson.profile },
            ...state.currentPerson.conversation,
            { role: 'user', content: question }
          ]
        })
      })

      const data = await response.json()
      
      set({
        currentPerson: {
          ...state.currentPerson,
          conversation: [
            ...state.currentPerson.conversation,
            { role: 'user', content: question },
            { role: 'assistant', content: data.response }
          ]
        }
      })
    } catch (error) {
      console.error('Error asking question:', error)
    }
  },

  processPerson: (action: 'accept' | 'reject') => {
    const state = get()
    if (!state.currentPerson) return

    const isCorrectAction = 
      (action === 'reject' && state.currentPerson.isVampire) ||
      (action === 'accept' && !state.currentPerson.isVampire)

    if (!isCorrectAction) {
      if (state.currentPerson.isVampire) {
        set({ isGameOver: true })
        return
      }
      set({ warnings: state.warnings + 1 })
      if (state.warnings + 1 >= 3) {
        set({ isGameOver: true })
        return
      }
    } else {
      if (action === 'accept') {
        set({ successfulEntries: state.successfulEntries + 1 })
      } else {
        set({ vampiresRejected: state.vampiresRejected + 1 })
      }
    }

    set({ peopleProcessed: state.peopleProcessed + 1, questionCount: 0 })
    get().generateNewPerson()
  },

  generateNewPerson: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/generate-persona')
      const person: Person = await response.json()
      
      // Add a small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      set({
        currentPerson: {
          ...person,
          conversation: []
        }
      })
    } catch (error) {
      console.error('Error generating person:', error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
