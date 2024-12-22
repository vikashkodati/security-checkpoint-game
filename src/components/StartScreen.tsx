import { useGameStore } from '../lib/store'

export function StartScreen() {
  const startGame = useGameStore((state) => state.startGame)

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center p-4" style={{ backgroundImage: 'url("/vampire-bg.jpg")' }}>
      <div className="bg-black/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-300">Vampire Security Checkpoint</h1>
        
        <div className="mb-8 text-center">
          <p className="mb-4">
            Welcome to the gates of Transylvania! As the town&apos;s security officer,
            your duty is to protect our citizens from vampire infiltration.
          </p>
          
          <div className="bg-black/40 p-6 rounded-lg mb-6">
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

        <div className="flex justify-center">
          <button
            onClick={startGame}
            className="px-8 py-3 bg-red-600 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-95"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}
