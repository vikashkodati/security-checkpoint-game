'use client'

import { useGameStore } from '../src/lib/store'
import { StartScreen } from '../src/components/StartScreen'
import { GameUI } from '../src/components/GameUI'
import { GameOverScreen } from '../src/components/GameOverScreen'

export default function Home() {
  const { isGameStarted, isGameOver } = useGameStore()

  if (isGameOver) {
    return <GameOverScreen />
  }

  if (!isGameStarted) {
    return <StartScreen />
  }

  return <GameUI />
}