import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Play, CheckCircle, Trophy, RotateCcw, ChevronRight,
  AlertCircle, Timer, ExternalLink, BookOpen, Target,
  Zap, Code2, MessageSquare, Crown, Star, ArrowRight,
  Shield, TrendingUp, Users, Award
} from 'lucide-react'

// ── Company Logo SVGs ─────────────────────────────────────
function CompanyLogo({ name, size = 32 }) {
  const logos = {
    Google: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M16 13.6h8.4c.13.6.2 1.24.2 1.9 0 4.88-3.27 8.5-8.6 8.5A8.5 8.5 0 0 1 7.5 15.5 8.5 8.5 0 0 1 16 7c2.3 0 4.22.84 5.7 2.22l-2.32 2.32C18.43 10.65 17.3 10.2 16 10.2c-2.92 0-5.3 2.38-5.3 5.3s2.38 5.3 5.3 5.3c3.13 0 4.7-2.08 4.9-3.8H16v-3.4z" fill="#4285F4"/>
        <path d="M7.5 15.5a8.5 8.5 0 0 1 8.5-8.5v3.2a5.3 5.3 0 0 0-5.3 5.3H7.5z" fill="#34A853"/>
        <path d="M7.5 15.5H10.7a5.3 5.3 0 0 0 5.3 5.3v3.2A8.5 8.5 0 0 1 7.5 15.5z" fill="#FBBC05"/>
        <path d="M16 24a8.5 8.5 0 0 0 8.6-8.5c0-.66-.07-1.3-.2-1.9H16v3.4h4.9c-.2 1.72-1.77 3.8-4.9 3.8v3.2z" fill="#EA4335"/>
      </svg>
    ),
    Amazon: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <text x="4" y="22" fontSize="11" fontWeight="700" fill="#FF9900" fontFamily="Arial">amazon</text>
        <path d="M6 24c4 2.5 13 3 18-1" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 21l2 2-2 1" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Microsoft: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="9" height="9" fill="#F25022"/>
        <rect x="17" y="6" width="9" height="9" fill="#7FBA00"/>
        <rect x="6" y="17" width="9" height="9" fill="#00A4EF"/>
        <rect x="17" y="17" width="9" height="9" fill="#FFB900"/>
      </svg>
    ),
    Meta: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M7 18c0-5 2.5-9 5-9s3.5 3 4 5c.5-2 1.5-5 4-5s5 4 5 9-2.5 7-5 7-3.5-3-4-5c-.5 2-1.5 5-4 5s-5-3-5-7z" stroke="#1877F2" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    Netflix: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M10 7v18l4-10.5L18 25V7h-4v8.5L12 7h-2z" fill="#E50914"/>
      </svg>
    ),
    Zoho: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="6" y="10" width="20" height="12" rx="3" fill="#E85D04" opacity=".9"/>
        <text x="9" y="20" fontSize="9" fontWeight="700" fill="white" fontFamily="Arial">ZOHO</text>
      </svg>
    ),
    Apple: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M20.5 8.5c-1.2 1.4-3.2 2.5-5 2.3-.3-1.8.7-3.8 1.8-5C18.5 4.4 20.7 3.3 22.3 3c.2 1.9-.5 3.9-1.8 5.5zm1.3 2.7c-2.8-.15-5.1 1.6-6.4 1.6-1.3 0-3.3-1.5-5.5-1.5-2.8.05-5.4 1.65-6.8 4.2-2.9 5-.75 12.4 2.05 16.5 1.4 2 3.05 4.2 5.25 4.1 2.1-.1 2.9-1.35 5.4-1.35 2.5 0 3.25 1.35 5.45 1.3 2.25-.05 3.7-2.1 5.1-4.1 1.6-2.3 2.25-4.55 2.3-4.65-.05-.05-4.4-1.7-4.45-6.7-.05-4.2 3.4-6.2 3.55-6.3-1.95-2.85-4.95-3.16-6-3.21z" fill="#999"/>
      </svg>
    ),
    Uber: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="6" y="13" width="20" height="6" rx="1" fill="white" opacity=".85"/>
        <text x="8" y="19" fontSize="8" fontWeight="900" fill="#000" fontFamily="Arial">UBER</text>
      </svg>
    ),
    Flipkart: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="6" y="8" width="20" height="16" rx="3" fill="#2874F0"/>
        <text x="9" y="20" fontSize="7.5" fontWeight="700" fill="white" fontFamily="Arial">Flipkart</text>
      </svg>
    ),
    TCS: (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="10" width="22" height="12" rx="2" fill="#C00"/>
        <text x="9" y="19.5" fontSize="9" fontWeight="700" fill="white" fontFamily="Arial">TCS</text>
      </svg>
    ),
  }
  return logos[name] || <div style={{ width: size, height: size, background: '#1f2937', borderRadius: 6 }} />
}

// ── Mock Questions ────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1, type: 'dsa',
    title: 'Maximum Subarray Sum',
    description: 'Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.',
    difficulty: 'medium',
    example: 'Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6\nHint:   [4, -1, 2, 1] has the largest sum = 6',
    timeLimit: 20,
    tag: 'Kadane\'s Algorithm',
  },
  {
    id: 2, type: 'dsa',
    title: 'Valid Parentheses',
    description: "Given a string containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 'easy',
    example: 'Input:  "()[]{}"\nOutput: true\n\nInput:  "(]"\nOutput: false',
    timeLimit: 15,
    tag: 'Stack',
  },
  {
    id: 3, type: 'dsa',
    title: 'Binary Search',
    description: 'Given a sorted array of integers and a target, return the index if found, else return -1. Must run in O(log n).',
    difficulty: 'easy',
    example: 'Input:  [-1, 0, 3, 5, 9, 12], target = 9\nOutput: 4',
    timeLimit: 15,
    tag: 'Binary Search',
  },
  {
    id: 4, type: 'behavioral',
    title: 'Tell me about yourself',
    description: "Give a brief professional introduction — your background, key experiences, and why you're interested in this role. Keep it to 2 minutes.",
    timeLimit: 3,
    tag: 'Introduction',
  },
  {
    id: 5, type: 'behavioral',
    title: 'Describe a challenge you overcame',
    description: 'Tell me about a difficult technical or team challenge you faced and how you resolved it. Use the STAR method.',
    timeLimit: 5,
    tag: 'STAR Method',
  },
]

const DIFF_COLORS = {
  easy:   { bg: 'rgba(34,197,94,0.12)',  text: '#4ade80',  border: 'rgba(34,197,94,0.25)'  },
  medium: { bg: 'rgba(234,179,8,0.12)',  text: '#facc15',  border: 'rgba(234,179,8,0.25)'  },
  hard:   { bg: 'rgba(239,68,68,0.12)',  text: '#f87171',  border: 'rgba(239,68,68,0.25)'  },
}

const TYPE_COLORS = {
  dsa:       { bg: 'rgba(59,130,246,0.12)', text: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  behavioral:{ bg: 'rgba(168,85,247,0.12)', text: '#c084fc', border: 'rgba(168,85,247,0.25)' },
}

// ── Product Topics Data ───────────────────────────────────
const PRODUCT_TOPICS = [
  { title: 'Arrays & Strings', icon: '[ ]', color: '#60a5fa', bg: 'rgba(59,130,246,0.15)', items: ['Two pointer technique', 'Sliding window', 'Prefix sum', "Kadane's algorithm"] },
  { title: 'Recursion & Backtracking', icon: '↺', color: '#c084fc', bg: 'rgba(168,85,247,0.15)', items: ['Subsets & permutations', 'Combination sum', 'N-Queens'] },
  { title: 'Hashing', icon: '#', color: '#4ade80', bg: 'rgba(34,197,94,0.15)', items: ['HashMap / HashSet', 'Frequency counting', 'Subarray problems'] },
  { title: 'Binary Search', icon: '⌕', color: '#60a5fa', bg: 'rgba(59,130,246,0.15)', items: ['Standard binary search', 'Binary search on answer', 'Rotated sorted array'] },
  { title: 'Linked List', icon: '→', color: '#facc15', bg: 'rgba(234,179,8,0.15)', items: ['Reverse linked list', 'Cycle detection', 'Merge two lists'] },
  { title: 'Stack & Queue', icon: '≡', color: '#34d399', bg: 'rgba(52,211,153,0.15)', items: ['Valid parentheses', 'Next greater element', 'Monotonic stack'] },
  { title: 'Trees', icon: 'T', color: '#4ade80', bg: 'rgba(34,197,94,0.15)', items: ['DFS & BFS traversals', 'Height & diameter', 'Lowest common ancestor'] },
  { title: 'Graphs', icon: 'G', color: '#c084fc', bg: 'rgba(168,85,247,0.15)', items: ['BFS / DFS', 'Topological sort', 'Dijkstra basics'] },
  { title: 'Greedy Algorithms', icon: '↑', color: '#facc15', bg: 'rgba(234,179,8,0.15)', items: ['Activity selection', 'Jump game', 'Gas station problem'] },
  { title: 'Dynamic Programming', icon: 'DP', color: '#f87171', bg: 'rgba(239,68,68,0.15)', items: ['Knapsack variants', 'Longest increasing subsequence', 'DP on strings'] },
]

const SERVICE_TOPICS = [
  { title: 'Basic Arrays & Strings', icon: '[ ]', color: '#60a5fa', bg: 'rgba(59,130,246,0.15)', items: ['Reverse array', 'Palindrome check', 'Frequency count'] },
  { title: 'Searching & Sorting', icon: 'S', color: '#4ade80', bg: 'rgba(34,197,94,0.15)', items: ['Linear search', 'Binary search', 'Bubble, selection, insertion sort'] },
  { title: 'Recursion Basics', icon: '↺', color: '#c084fc', bg: 'rgba(168,85,247,0.15)', items: ['Factorial', 'Fibonacci', 'Tower of Hanoi'] },
  { title: 'OOP Concepts', icon: '{}', color: '#facc15', bg: 'rgba(234,179,8,0.15)', items: ['Abstraction & encapsulation', 'Inheritance & polymorphism', 'Interface vs abstract class'] },
  { title: 'Database (SQL)', icon: 'SQL', color: '#34d399', bg: 'rgba(52,211,153,0.15)', items: ['SELECT & WHERE', 'JOIN operations', 'GROUP BY & aggregates'] },
  { title: 'Basic Programming', icon: '<>', color: '#60a5fa', bg: 'rgba(59,130,246,0.15)', items: ['Pattern printing', 'Prime numbers', 'Number problems'] },
]

const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Netflix', 'Zoho', 'Apple', 'Uber', 'Flipkart', 'TCS']

// ── Main Component ────────────────────────────────────────
export default function MockInterviewPage() {
  const [phase, setPhase] = useState('home') // home | running | results
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [activeTab, setActiveTab] = useState('product') // product | service | roadmap
  const timerRef = useRef(null)

  const currentQ = QUESTIONS[currentIdx]

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
      const t = setTimeout(() => goNext(), 500)
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

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const answered = Object.values(answers).filter(a => a?.trim().length > 20).length
  const score = Math.round((answered / QUESTIONS.length) * 100)
  const timerPct = currentQ ? (timeLeft / (currentQ.timeLimit * 60)) * 100 : 100
  const timerColor = timeLeft < 60 ? '#f87171' : timeLeft < 180 ? '#facc15' : '#4ade80'

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#080d14',
      color: 'white',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      paddingBottom: '4rem',
    },
    card: {
      background: '#111827',
      border: '1px solid #1f2937',
      borderRadius: 16,
    },
  }

  // ── RUNNING PHASE ─────────────────────────────────────
  if (phase === 'running') {
    const diff = currentQ.difficulty ? DIFF_COLORS[currentQ.difficulty] : DIFF_COLORS.easy
    const typ = TYPE_COLORS[currentQ.type]
    return (
      <div style={styles.page}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem 1rem' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{
                  height: 4, width: 40, borderRadius: 4,
                  background: i < currentIdx ? '#22c55e' : i === currentIdx ? '#4ade80' : '#1f2937',
                  transition: 'background .3s',
                }} />
              ))}
              <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 6, alignSelf: 'center' }}>
                {currentIdx + 1} / {QUESTIONS.length}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 100, height: 6, background: '#1f2937', borderRadius: 4, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 4, background: timerColor,
                  width: `${timerPct}%`, transition: 'width 1s linear, background .3s',
                }} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 20, fontWeight: 700, fontFamily: 'monospace', color: timerColor,
                minWidth: 72,
              }}>
                <Timer size={16} />
                {fmt(timeLeft)}
              </div>
            </div>
          </div>

          {/* Question card */}
          <div style={{ ...styles.card, padding: '2rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
              <span style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: typ.bg, color: typ.text, border: `1px solid ${typ.border}`,
              }}>{currentQ.type.toUpperCase()}</span>
              {currentQ.difficulty && (
                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: diff.bg, color: diff.text, border: `1px solid ${diff.border}`,
                }}>{currentQ.difficulty}</span>
              )}
              {currentQ.tag && (
                <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 'auto' }}>
                  {currentQ.tag}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>
              {currentQ.title}
            </h2>
            <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, marginBottom: currentQ.example ? '1rem' : 0 }}>
              {currentQ.description}
            </p>
            {currentQ.example && (
              <pre style={{
                background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10,
                padding: '1rem', fontSize: 12, color: '#a5f3fc', fontFamily: 'monospace',
                overflowX: 'auto', lineHeight: 1.7,
              }}>{currentQ.example}</pre>
            )}
          </div>

          {/* Answer area */}
          <div style={{ ...styles.card, padding: '1.5rem', marginBottom: '1rem' }}>
            <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentQ.type === 'dsa' ? 'Your approach / solution' : 'Your answer'}
            </label>
            <textarea
              style={{
                width: '100%', minHeight: 160, background: '#0d1117', border: '1px solid #1f2937',
                borderRadius: 10, padding: '0.875rem', fontSize: 13, color: '#e5e7eb',
                fontFamily: currentQ.type === 'dsa' ? 'monospace' : 'inherit',
                resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.7,
              }}
              placeholder={currentQ.type === 'dsa'
                ? '// Write your approach + code here...\n// Example: Use Kadane\'s algorithm: track max ending here and max so far'
                : 'Use the STAR method — Situation, Task, Action, Result...'
              }
              value={answers[currentQ.id] || ''}
              onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: '#4b5563' }}>
              {currentQ.type === 'behavioral' ? 'Be specific — use real examples' : 'Explain time & space complexity'}
            </p>
            <button onClick={goNext} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#22c55e', color: '#000', border: 'none',
              padding: '10px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'opacity .15s',
            }}>
              {currentIdx < QUESTIONS.length - 1 ? <><span>Next</span><ChevronRight size={15} /></> : <><span>Finish</span><Trophy size={15} /></>}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── RESULTS PHASE ──────────────────────────────────────
  if (phase === 'results') {
    const scoreColor = score >= 80 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'
    return (
      <div style={styles.page}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20, margin: '0 auto 1.25rem',
              background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Trophy size={32} color="#4ade80" />
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 6 }}>Interview Complete!</h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>Here's how you did</p>
          </div>

          {/* Score */}
          <div style={{ ...styles.card, padding: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
              {score}<span style={{ fontSize: 24, color: '#4b5563' }}>/100</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: 13, margin: '0.5rem 0 1.25rem' }}>Overall score</p>
            <div style={{ background: '#1f2937', borderRadius: 8, height: 10, overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div style={{
                height: '100%', borderRadius: 8, background: scoreColor,
                width: `${score}%`, transition: 'width 1s ease',
              }} />
            </div>
            <p style={{ fontSize: 12, color: '#4b5563' }}>
              Answered {answered} of {QUESTIONS.length} questions · Total time: {fmt(totalElapsed)}
            </p>
          </div>

          {/* Breakdown */}
          <div style={{ ...styles.card, padding: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: '1rem' }}>Question breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUESTIONS.map(q => {
                const ans = answers[q.id]
                const ok = ans?.trim().length > 20
                const typ = TYPE_COLORS[q.type]
                return (
                  <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: ok ? 'rgba(34,197,94,0.2)' : '#1f2937',
                      border: ok ? '1px solid rgba(34,197,94,0.4)' : '1px solid #374151',
                    }}>
                      {ok ? <CheckCircle size={13} color="#4ade80" /> : <span style={{ fontSize: 10, color: '#4b5563' }}>–</span>}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: ok ? '#e5e7eb' : '#6b7280' }}>{q.title}</span>
                    <span style={{
                      padding: '2px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                      background: typ.bg, color: typ.text, border: `1px solid ${typ.border}`,
                    }}>{q.type}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => { setPhase('home'); setCurrentIdx(0); setAnswers({}) }}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#1f2937', border: '1px solid #374151', color: 'white',
                padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
              <RotateCcw size={15} /> Back to home
            </button>
            <button
              onClick={startInterview}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#22c55e', border: 'none', color: '#000',
                padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>
              <RotateCcw size={15} /> Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── HOME PHASE ────────────────────────────────────────
  return (
    <div style={styles.page}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* ── HERO ─────────────────────────────────────── */}
        <div style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden', marginBottom: '2rem',
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1f2d 50%, #0a150f 100%)',
          border: '1px solid rgba(34,197,94,0.15)',
          minHeight: 220, padding: '2.5rem 2rem',
        }}>
          {/* Grid bg */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.07,
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 220, height: 220,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent)',
          }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 320px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
                  MOCK INTERVIEW
                </span>
                <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa' }}>
                  FREE
                </span>
              </div>
              <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.2, marginBottom: '0.75rem' }}>
                Practice like it's<br />
                <span style={{ color: '#4ade80' }}>the real thing</span>
              </h1>
              <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 420 }}>
                Timed DSA + behavioral questions. No setup. Just you, a timer, and real interview-format problems.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={startInterview} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#22c55e', color: '#000', border: 'none',
                  padding: '12px 28px', borderRadius: 12, fontSize: 15, fontWeight: 800,
                  cursor: 'pointer', transition: 'opacity .15s',
                }}>
                  <Play size={17} fill="#000" /> Start practice
                </button>
                <a href="https://leetcode.com/assessment/" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.06)', color: 'white',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', textDecoration: 'none',
                  }}>
                  <ExternalLink size={15} /> LeetCode assessment
                </a>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <Code2 size={16} color="#60a5fa" />, label: '3 DSA problems', sub: 'Easy to medium' },
                { icon: <MessageSquare size={16} color="#c084fc" />, label: '2 behavioral questions', sub: 'STAR method' },
                { icon: <Timer size={16} color="#facc15" />, label: 'Timed per question', sub: '15–20 min each' },
                { icon: <Trophy size={16} color="#4ade80" />, label: 'Score at the end', sub: 'Based on completion' },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: '#111827', border: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{label}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.2)',
          borderRadius: 12, padding: '0.875rem 1rem', marginBottom: '2rem',
        }}>
          <AlertCircle size={16} color="#facc15" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 13, color: '#ca8a04', lineHeight: 1.6 }}>
            <strong style={{ color: '#facc15' }}>Heads up:</strong> Once started, the timer begins immediately. Treat this like a real interview — no pausing, no breaks between questions.
          </p>
        </div>

        {/* ── COMPANIES ───────────────────────────────── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Companies that ask this style of problems
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {COMPANIES.map(name => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#111827', border: '1px solid #1f2937',
                borderRadius: 12, padding: '8px 14px',
                transition: 'border-color .15s',
              }}>
                <CompanyLogo name={name} size={22} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ──────────────────────────────────── */}
        <div style={{ borderTop: '1px solid #1f2937', marginBottom: '2.5rem' }} />

        {/* ── PREP GUIDE TABS ──────────────────────────── */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: '0.25rem' }}>Interview prep guide</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.25rem' }}>Everything you need to know before you walk into that interview</p>

          <div style={{ display: 'flex', gap: 4, background: '#0d1117', padding: 4, borderRadius: 14, marginBottom: '1.5rem', width: 'fit-content' }}>
            {[
              { key: 'product', label: 'Product-based' },
              { key: 'service', label: 'Service-based' },
              { key: 'roadmap', label: 'Roadmap' },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: 'none', transition: 'all .15s',
                background: activeTab === key ? '#111827' : 'transparent',
                color: activeTab === key ? 'white' : '#6b7280',
                boxShadow: activeTab === key ? '0 0 0 1px #1f2937' : 'none',
              }}>{label}</button>
            ))}
          </div>

          {/* Product Tab */}
          {activeTab === 'product' && (
            <div>
              <div style={{
                background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)',
                borderLeft: '3px solid #3b82f6', borderRadius: '0 10px 10px 0',
                padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: 13, color: '#93c5fd',
              }}>
                Product-based companies test deep problem-solving ability. Medium and hard level is the bar — aim for 8–12 weeks of focused prep.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12, marginBottom: '1.5rem' }}>
                {PRODUCT_TOPICS.map(topic => (
                  <div key={topic.title} style={{ ...styles.card, padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, background: topic.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 800, color: topic.color, flexShrink: 0,
                      }}>{topic.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{topic.title}</span>
                    </div>
                    {topic.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '3px 0' }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#374151', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#9ca3af' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* Skill levels */}
              <div style={{ ...styles.card, padding: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: '0.875rem' }}>Expected skill levels</div>
                {[
                  { label: 'Easy', color: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)', desc: 'Must solve quickly and correctly — these are entry filters, not the real challenge' },
                  { label: 'Medium', color: '#facc15', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.25)', desc: 'Must be fully comfortable — the core of every interview round' },
                  { label: 'Hard', color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', desc: 'Pattern recognition is enough — a full solution is a strong bonus' },
                ].map(({ label, color, bg, border, desc }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1f2937' }}>
                    <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: bg, color, border: `1px solid ${border}`, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: 13, color: '#9ca3af' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Tab */}
          {activeTab === 'service' && (
            <div>
              <div style={{
                background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)',
                borderLeft: '3px solid #22c55e', borderRadius: '0 10px 10px 0',
                padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: 13, color: '#86efac',
              }}>
                Service-based companies value correctness, clarity, and communication. 3–4 weeks of consistent practice is enough to clear these rounds.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12, marginBottom: '1.5rem' }}>
                {SERVICE_TOPICS.map(topic => (
                  <div key={topic.title} style={{ ...styles.card, padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, background: topic.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 800, color: topic.color, flexShrink: 0,
                      }}>{topic.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{topic.title}</span>
                    </div>
                    {topic.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '3px 0' }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#374151', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#9ca3af' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ ...styles.card, padding: '1.25rem' }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: '0.5rem' }}>What interviewers actually look for</div>
                <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>
                  Correctness over cleverness. A working solution you can walk through clearly — with edge cases handled — beats a clever one you can't explain. Communication is the differentiator at service companies.
                </p>
              </div>
            </div>
          )}

          {/* Roadmap Tab */}
          {activeTab === 'roadmap' && (
            <div>
              <div style={{
                background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.2)',
                borderLeft: '3px solid #a855f7', borderRadius: '0 10px 10px 0',
                padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: 13, color: '#d8b4fe',
              }}>
                Follow this order — each topic builds on the previous one. Don't skip ahead; a shaky foundation costs you in later rounds.
              </div>
              <div style={{ ...styles.card, padding: '0.5rem 1.25rem' }}>
                {[
                  { n: 1, title: 'Arrays & strings', sub: 'Foundation of all interviews — must be rock solid', weeks: 'Week 1–2', color: '#60a5fa' },
                  { n: 2, title: 'Hashing & two pointers', sub: 'Unlocks O(n) solutions for most array problems', weeks: 'Week 2', color: '#4ade80' },
                  { n: 3, title: 'Stacks, queues & sliding window', sub: 'Essential for medium-level problems', weeks: 'Week 3', color: '#34d399' },
                  { n: 4, title: 'Linked lists', sub: 'Pointer manipulation — always asked in rounds 1–2', weeks: 'Week 3–4', color: '#facc15' },
                  { n: 5, title: 'Binary search', sub: 'Applied to arrays, answers, and rotated arrays', weeks: 'Week 4', color: '#60a5fa' },
                  { n: 6, title: 'Recursion & backtracking', sub: 'Required before trees and graphs', weeks: 'Week 5', color: '#c084fc' },
                  { n: 7, title: 'Trees & BST', sub: 'DFS, BFS, LCA, diameter — very frequently asked', weeks: 'Week 5–6', color: '#4ade80' },
                  { n: 8, title: 'Graphs', sub: 'BFS, DFS, topological sort, Dijkstra', weeks: 'Week 7', color: '#c084fc' },
                  { n: 9, title: 'Dynamic programming', sub: 'Knapsack, LIS, DP on strings — hardest topic', weeks: 'Week 7–8', color: '#f87171' },
                  { n: 10, title: 'Mock interviews & revision', sub: 'Full timed rounds — use LeetCode assessment', weeks: 'Week 9–10', color: '#4ade80' },
                ].map(({ n, title, sub, weeks, color }) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: n < 10 ? '1px solid #1f2937' : 'none' }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      background: '#1f2937', border: `1px solid #374151`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color,
                    }}>{n}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{sub}</div>
                    </div>
                    <span style={{ fontSize: 11, color: '#4b5563', whiteSpace: 'nowrap', paddingTop: 3 }}>{weeks}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM CTA ───────────────────────────────── */}
        <div style={{
          borderRadius: 20, padding: '2.5rem 2rem', textAlign: 'center', marginTop: '2rem',
          background: 'linear-gradient(135deg, #0a0f1a, #0d1f0d)',
          border: '1px solid rgba(34,197,94,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>
              <Target size={36} color="#4ade80" style={{ display: 'inline' }} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ready to start?</h3>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: '1.5rem' }}>
              5 questions · ~60 minutes · Real interview format
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={startInterview} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#22c55e', color: '#000', border: 'none',
                padding: '13px 32px', borderRadius: 14, fontSize: 15, fontWeight: 800,
                cursor: 'pointer',
              }}>
                <Play size={17} fill="#000" /> Start mock interview
              </button>
              <a href="https://leetcode.com/assessment/" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.06)', color: 'white',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '13px 24px', borderRadius: 14, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', textDecoration: 'none',
                }}>
                <ExternalLink size={15} /> Try LeetCode assessment
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}