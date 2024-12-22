import { useGameStore } from '../lib/store'

export function GameOverScreen() {
  const { peopleProcessed, warnings, startGame } = useGameStore()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Game Over!</h1>
      
      <div className="max-w-xl mb-8 text-center">
        <p className="text-2xl mb-4">
          You processed {peopleProcessed} visitors
        </p>
        <p className="text-xl mb-6">
          Final warnings: {warnings}/3
        </p>
      </div>

      <button
        onClick={startGame}
        className="px-8 py-3 bg-red-600 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  )
}
