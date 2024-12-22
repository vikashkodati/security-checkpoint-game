# 🧛‍♂️ The Vampire Checkpoint Game 🎮

A special game created for Nandini! Play now at: [https://security-checkpoint-game-red.vercel.app/](https://security-checkpoint-game-red.vercel.app/) 🎮

Hey there! Welcome to an exciting game where you get to be a security guard at a special checkpoint. Your job is super important - you need to figure out who's a regular person and who might be a vampire trying to sneak into the city! 

## 🎮 How to Play

### 🎯 Your Mission
You're a brave security guard protecting a city from vampires! Each person who comes to your checkpoint could be:
- 👨‍👩‍👧‍👦 A regular person just visiting the city
- 🧛‍♂️ A sneaky vampire trying to get in!

### 🎲 Game Rules
1. Each visitor will tell you who they are and why they want to enter the city
2. You can ask them up to 5 questions to figure out if they're telling the truth
3. After asking questions, you need to decide:
   - 💚 Press "Let Through" if you think they're a regular person
   - ❌ Press "Reject" if you think they're a vampire

### ⚠️ Be Careful!
- If you let a vampire into the city - Game Over! 🎮
- If you reject 3 regular people by mistake - Game Over! 🎮
- Try to let as many regular people through as you can! 🌟

### 💡 Tips for Playing
1. Look for clues in their answers
2. Ask clever questions about:
   - Why they're visiting
   - What they like to do
   - When they travel
   - What they eat
3. Watch out for suspicious answers!

### 🏆 Scoring
- Your score is how many people you correctly let into the city
- Try to beat your high score each time you play!

---

## 🔧 Technical Setup (for grown-ups)

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### Setup Steps
1. Clone the repository
```bash
git clone [repository-url]
cd security-checkpoint-game
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### 🚀 Deployment

The easiest way to deploy this game is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Add your `OPENAI_API_KEY` to the environment variables
5. Click Deploy!

You can also check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.
