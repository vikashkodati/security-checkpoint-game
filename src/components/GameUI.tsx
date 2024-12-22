import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../lib/store'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

function Message({ role, content, name }: { role: 'user' | 'assistant'; content: string; name: string }) {
  return (
    <div className="flex gap-3 mb-2 animate-slideIn">
      <div className="w-24 flex-shrink-0 text-white/70 font-medium">
        {role === 'user' ? 'Security' : name}:
      </div>
      <div className="flex-1">
        {content}
      </div>
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 animate-fadeIn">
      <div className="text-white/70 text-sm mb-1">{label}</div>
      <div className="text-lg font-medium animate-pulse">{value}</div>
    </div>
  )
}

export function GameUI() {
  const [question, setQuestion] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  const {
    currentPerson,
    questionCount,
    warnings,
    peopleProcessed,
    successfulEntries,
    isLoading,
    askQuestion,
    processPerson
  } = useGameStore()

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [currentPerson?.conversation])

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || questionCount >= 5) return
    await askQuestion(question)
    setQuestion('')
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex justify-center pt-24"
      style={{ 
        backgroundImage: 'url("/vampire-bg.jpg")',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-[1000px] m-4">
        <div className="bg-black/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-300 font-serif">
            Game created for Nandini 🎮
          </h1>
          {/* Header with stats */}
          <div className="flex justify-between p-6 mb-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl">
            <div className="flex gap-8">
              <div>
                <span className="text-white/70 text-sm block mb-1">Round</span>
                <span className="text-2xl font-bold text-blue-400">{peopleProcessed + 1}</span>
              </div>
              <div>
                <span className="text-white/70 text-sm block mb-1">Successful Entries</span>
                <span className="text-2xl font-bold text-green-400">{successfulEntries}</span>
              </div>
            </div>
            <div>
              <span className="text-white/70 text-sm block mb-1">Warnings</span>
              <span className={`text-2xl font-bold ${warnings > 1 ? 'text-red-400' : 'text-yellow-400'}`}>
                {warnings}/3
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="flex gap-8 min-h-[500px]">
            {/* Left column - Person Profile */}
            <div className="w-[350px] bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Person Profile</h2>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div>
                  <ProfileField 
                    label="Name"
                    value={currentPerson?.name || ''}
                  />
                  <ProfileField 
                    label="Description"
                    value={currentPerson?.description || ''}
                  />
                </div>
              )}
            </div>

            {/* Right column - Conversation */}
            <div className="flex-1 flex flex-col bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Conversation</h2>

              {/* Chat area */}
              <div 
                ref={chatRef}
                className="h-[250px] border border-white/10 mb-4 p-4 overflow-y-auto rounded bg-black/40"
              >
                {currentPerson?.conversation.map((msg, i) => (
                  <Message
                    key={i}
                    role={msg.role}
                    content={msg.content}
                    name={currentPerson.name}
                  />
                ))}
              </div>

              {/* Question input with submit button */}
              <div className="mb-4">
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-2 bg-black/40 border border-white/20 focus:outline-none focus:border-white/40 rounded transition-colors"
                    disabled={questionCount >= 5 || isLoading}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded disabled:opacity-50"
                    disabled={questionCount >= 5 || isLoading}
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => processPerson('reject')}
                  className="px-8 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded disabled:opacity-50 transform hover:scale-105 active:scale-95"
                  disabled={isLoading}
                >
                  Reject
                </button>
                <button
                  onClick={() => processPerson('accept')}
                  className="px-8 py-2 bg-green-600 hover:bg-green-700 transition-colors rounded disabled:opacity-50 transform hover:scale-105 active:scale-95"
                  disabled={isLoading}
                >
                  Let Through
                </button>
              </div>

              <div className="text-center text-white/70 mt-4">
                Questions left: {5 - questionCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
