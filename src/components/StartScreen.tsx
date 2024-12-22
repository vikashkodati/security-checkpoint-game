import { useGameStore } from '../lib/store'

export function StartScreen() {
  const startGame = useGameStore((state) => state.startGame)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Vampire Security Checkpoint</h1>
      
      <div className="max-w-2xl mb-8 text-center">
        <p className="mb-4">
          Welcome to the gates of Transylvania! As the town's security officer,
          your duty is to protect our citizens from vampire infiltration.
        </p>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Game Rules:</h2>
          <ul className="text-left list-disc list-inside space-y-2">
            <li>Interview each visitor by asking up to 5 questions</li>
            <li>Decide whether to let them through or reject them</li>
            <li>Rejecting a safe person gives you 1 warning</li>
            <li>3 warnings = Game Over</li>
            <li>Letting a vampire through = Instant Game Over</li>
          </ul>
        </div>
      </div>

      <button
        onClick={startGame}
        className="px-8 py-3 bg-red-600 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors"
      >
        Start Game
      </button>
    </div>
  )
}
