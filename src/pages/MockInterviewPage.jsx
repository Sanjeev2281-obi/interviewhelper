import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, CheckCircle, Trophy, RotateCcw, ChevronRight, AlertCircle, Timer } from 'lucide-react'
import toast from 'react-hot-toast'

const QUESTIONS = [
  {
    id: 1, type: 'dsa',
    title: 'Find Maximum Subarray Sum',
    description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
    difficulty: 'medium',
    example: 'Input: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6.',
    timeLimit: 20,
  },
  {
    id: 2, type: 'dsa',
    title: 'Valid Parentheses',
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 'easy',
    example: 'Input: s = "()[]{}"\nOutput: true',
    timeLimit: 15,
  },
  {
    id: 3, type: 'dsa',
    title: 'Binary Search',
    description: 'Given a sorted array of integers and a target, return the index if found, else -1.',
    difficulty: 'easy',
    example: 'Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4',
    timeLimit: 15,
  },
  {
    id: 4, type: 'behavioral',
    title: 'Tell me about yourself',
    description: "Give a brief professional introduction — your background, key experiences, and why you're interested in this role.",
    timeLimit: 3,
  },
  {
    id: 5, type: 'behavioral',
    title: 'Describe a challenge you overcame',
    description: 'Tell me about a difficult technical or team challenge you faced and how you resolved it. Use the STAR method.',
    timeLimit: 5,
  },
]

export default function MockInterviewPage() {
  const [phase, setPhase] = useState('setup') // setup | running | results
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const timerRef = useRef(null)

  const currentQ = QUESTIONS[currentIdx]

  // ✅ Declared before useEffect to avoid "accessed before declaration" error
  const goNext = useCallback(() => {
    clearTimeout(timerRef.current)
    if (currentIdx < QUESTIONS.length - 1) {
      const next = QUESTIONS[currentIdx + 1]
      setCurrentIdx(i => i + 1)
      setTimeLeft(next.timeLimit * 60)
    } else {
      setTotalElapsed(Math.round((Date.now() - startTime) / 1000))
      setPhase('results')
    }
  }, [currentIdx, startTime])

  useEffect(() => {
    if (phase !== 'running') return
    if (timeLeft <= 0) {
      toast('⏰ Time up! Moving to next question.', { duration: 2000 })
      // ✅ Defer state update outside effect body using setTimeout
      const t = setTimeout(() => goNext(), 0)
      return () => clearTimeout(t)
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timerRef.current)
  }, [phase, timeLeft, goNext])

  const startInterview = () => {
    setPhase('running')
    setCurrentIdx(0)
    setAnswers({})
    setStartTime(Date.now())
    setTimeLeft(QUESTIONS[0].timeLimit * 60)
  }

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const answered = Object.values(answers).filter(a => a?.trim().length > 20).length
  const score = Math.round((answered / QUESTIONS.length) * 100)
  const timerColor = timeLeft < 60 ? 'text-red-400' : timeLeft < 180 ? 'text-yellow-400' : 'text-brand-400'

  // ── SETUP ──────────────────────────────────────────────
  if (phase === 'setup') return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Mock Interview</h1>
      <p className="text-slate-400 font-body text-sm mb-8">Simulate a real technical interview with timed questions</p>

      <div className="card p-7 mb-6">
        <h2 className="font-display text-lg font-semibold text-white mb-4">What's included</h2>
        <div className="space-y-3">
          {[
            { label: '3 DSA Problems', sub: 'Easy to Medium difficulty', color: 'brand' },
            { label: '2 Behavioral Questions', sub: 'Tell me about yourself, challenges', color: 'purple' },
            { label: 'Timed per question', sub: '15–20 mins for DSA, 3–5 mins behavioral', color: 'cyan' },
            { label: 'Score at the end', sub: 'Based on completion and time', color: 'orange' },
          ].map(({ label, sub, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full bg-${color === 'brand' ? 'brand' : color}-500`} />
              <div>
                <span className="text-white text-sm font-body font-medium">{label}</span>
                <span className="text-slate-500 text-xs font-body ml-2">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle size={15} className="text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-200/70 text-sm font-body">
            Once started, the timer begins immediately. Treat this like a real interview — no pausing.
          </p>
        </div>
      </div>

      <button onClick={startInterview} className="btn-primary text-base px-8 py-3.5 w-full justify-center">
        <Play size={18} /> Start Mock Interview
      </button>
    </div>
  )

  // ── RESULTS ────────────────────────────────────────────
  if (phase === 'results') return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trophy size={36} className="text-brand-400" />
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Interview Complete!</h1>
        <p className="text-slate-400 font-body mt-1">Here's how you did</p>
      </div>

      {/* Score */}
      <div className="card p-7 mb-6 text-center">
        <div className="font-display text-6xl font-extrabold text-white mb-1">{score}<span className="text-2xl text-slate-400">/100</span></div>
        <p className="text-slate-400 font-body text-sm mb-4">Overall Score</p>
        <div className="w-full bg-white/5 rounded-full h-3">
          <div
            className="h-3 bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-slate-500 text-xs font-body mt-3">
          Completed {answered} of {QUESTIONS.length} questions · Total time: {fmt(totalElapsed)}
        </p>
      </div>

      {/* Per-question breakdown */}
      <div className="card p-5 mb-6">
        <h3 className="font-display font-semibold text-white mb-4">Question Breakdown</h3>
        <div className="space-y-3">
          {QUESTIONS.map((q, i) => {
            const ans = answers[q.id]
            const ok = ans?.trim().length > 20
            return (
              <div key={q.id} className="flex items-center gap-3">
                {ok
                  ? <CheckCircle size={16} className="text-brand-500 flex-shrink-0" />
                  : <div className="w-4 h-4 rounded-full border-2 border-slate-700 flex-shrink-0" />
                }
                <span className="flex-1 text-sm font-body text-slate-300 truncate">{q.title}</span>
                <span className={`badge-${q.difficulty || 'easy'} text-[10px]`}>{q.type}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => { setPhase('setup'); setCurrentIdx(0); setAnswers({}) }} className="btn-primary flex-1 justify-center">
          <RotateCcw size={15} /> Try Again
        </button>
      </div>
    </div>
  )

  // ── RUNNING ────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
              i < currentIdx ? 'bg-brand-500' : i === currentIdx ? 'bg-brand-400' : 'bg-white/10'
            }`} />
          ))}
          <span className="text-slate-500 text-xs font-body ml-1">{currentIdx + 1} / {QUESTIONS.length}</span>
        </div>
        <div className={`flex items-center gap-1.5 font-mono text-lg font-bold ${timerColor}`}>
          <Timer size={16} />
          {fmt(timeLeft)}
        </div>
      </div>

      {/* Question card */}
      <div className="card p-7 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className={`badge-${currentQ.difficulty || 'easy'}`}>{currentQ.type}</span>
          {currentQ.difficulty && <span className={`badge-${currentQ.difficulty}`}>{currentQ.difficulty}</span>}
          <span className="text-slate-600 text-xs font-body ml-auto">Q{currentIdx + 1}</span>
        </div>

        <h2 className="font-display text-xl font-bold text-white mb-3">{currentQ.title}</h2>
        <p className="text-slate-300 font-body text-sm leading-relaxed mb-4">{currentQ.description}</p>

        {currentQ.example && (
          <pre className="code-block text-xs text-slate-300 mb-2">{currentQ.example}</pre>
        )}
      </div>

      {/* Answer area */}
      <div className="card p-5 mb-4">
        <label className="label mb-2">
          {currentQ.type === 'dsa' ? 'Write your approach / code:' : 'Your answer:'}
        </label>
        <textarea
          className="input min-h-[160px] resize-y font-mono text-sm"
          placeholder={currentQ.type === 'dsa'
            ? '// Write your solution here...\n// Explain your approach first'
            : 'Use the STAR method: Situation, Task, Action, Result...'
          }
          value={answers[currentQ.id] || ''}
          onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-slate-600 text-xs font-body">
          {currentQ.type === 'behavioral' ? 'Speak naturally, be specific' : 'Think aloud, explain your approach'}
        </p>
        <button onClick={goNext} className="btn-primary">
          {currentIdx < QUESTIONS.length - 1 ? <>Next <ChevronRight size={15} /></> : <>Finish <Trophy size={15} /></>}
        </button>
      </div>
    </div>
  )
}