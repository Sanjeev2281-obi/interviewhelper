import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, CheckCircle, ExternalLink, Lightbulb, Tag, Building2, ChevronDown } from 'lucide-react'
import { PROBLEMS } from '../services/Problem'

// Default problem for IDs not in our map
const DEFAULT = (id) => ({
  id, title: 'Problem #' + id, difficulty: 'medium', topic: 'Arrays',
  companies: ['Amazon'],
  leetcode: 'https://leetcode.com/problemset/',
  gfg: 'https://www.geeksforgeeks.org/explore?category=Arrays',
  description: 'Click LeetCode or GFG button below to view and solve this problem on the respective platform.',
  examples: [],
  constraints: [],
  hints: ['Open the problem on LeetCode or GFG to see hints.'],
  approach: 'Open on LeetCode or GFG to see the full approach.',
  timeComplexity: 'Varies',
  spaceComplexity: 'Varies',
})

const diffStyle = {
  easy: { bg: 'rgba(34,197,94,0.1)', color: '#4ade80', border: 'rgba(34,197,94,0.2)' },
  medium: { bg: 'rgba(234,179,8,0.1)', color: '#facc15', border: 'rgba(234,179,8,0.2)' },
  hard: { bg: 'rgba(239,68,68,0.1)', color: '#f87171', border: 'rgba(239,68,68,0.2)' },
}

export default function ProblemDetailPage() {
  const { id } = useParams()
  const problem = PROBLEMS.find(p => p.id === Number(id)) || DEFAULT(id)
  const [solved, setSolved] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showApproach, setShowApproach] = useState(false)
  const [hintIdx, setHintIdx] = useState(0)
  const ds = diffStyle[problem.difficulty]

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Back */}
      <Link to="/dashboard/problems"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
        <ChevronLeft size={15} /> Back to Problems
      </Link>

      {/* Header card */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white mb-3">{problem.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
                {problem.difficulty}
              </span>
              <span className="flex items-center gap-1 text-gray-500 text-xs">
                <Tag size={11} /> {problem.topic}
              </span>
              <span className="flex items-center gap-1 text-gray-500 text-xs">
                <Building2 size={11} /> {problem.companies.join(', ')}
              </span>
            </div>
          </div>

          {/* Solved toggle */}
          <button
            onClick={() => setSolved(p => !p)}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl flex-shrink-0 transition-all"
            style={solved
              ? { backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
              : { backgroundColor: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }
            }
          >
            <CheckCircle size={15} />
            {solved ? 'Solved ✓' : 'Mark Solved'}
          </button>
        </div>

        {/* Solve buttons */}
        <div className="flex gap-3">
          <a
            href={problem.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors"
            style={{ backgroundColor: 'rgba(234,179,8,0.15)', color: '#fbbf24', border: '1px solid rgba(234,179,8,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(234,179,8,0.25)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(234,179,8,0.15)'}
          >
            <ExternalLink size={15} />
            Solve on LeetCode
          </a>
          <a
            href={problem.gfg}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors"
            style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.25)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.15)'}
          >
            <ExternalLink size={15} />
            Solve on GFG
          </a>
        </div>
      </div>

      {/* Description */}
      {problem.description && (
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
          <h2 className="font-bold text-white text-sm mb-3">Problem Description</h2>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{problem.description}</p>
        </div>
      )}

      {/* Examples */}
      {problem.examples?.length > 0 && (
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
          <h2 className="font-bold text-white text-sm mb-4">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((ex, i) => (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: '#0f1923', border: '1px solid #1f2937' }}>
                <p className="text-gray-500 text-xs mb-2">Example {i + 1}</p>
                <div className="font-mono text-xs space-y-1 mb-2">
                  <div><span className="text-gray-500">Input: </span><span className="text-gray-200">{ex.input}</span></div>
                  <div><span className="text-gray-500">Output: </span><span className="text-green-400 font-bold">{ex.output}</span></div>
                </div>
                <p className="text-gray-500 text-xs"><span className="text-gray-400 font-semibold">Explanation: </span>{ex.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Constraints */}
      {problem.constraints?.length > 0 && (
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
          <h2 className="font-bold text-white text-sm mb-3">Constraints</h2>
          <ul className="space-y-1.5">
            {problem.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-mono text-gray-400">
                <span className="text-gray-700 mt-0.5">•</span>{c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hints - collapsible */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1f2937' }}>
        <button
          onClick={() => setShowHints(p => !p)}
          className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
          style={{ backgroundColor: '#111827' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a2332'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111827'}
        >
          <div className="flex items-center gap-2">
            <Lightbulb size={15} className="text-yellow-400" />
            <span className="font-bold text-white text-sm">Hints</span>
            <span className="text-xs text-gray-600">({problem.hints?.length} available)</span>
          </div>
          <ChevronDown size={15} className={`text-gray-500 transition-transform ${showHints ? 'rotate-180' : ''}`} />
        </button>

        {showHints && (
          <div className="px-6 pb-5 pt-2" style={{ backgroundColor: '#111827', borderTop: '1px solid #1f2937' }}>
            <p className="text-gray-500 text-xs mb-4">Try to solve without hints first!</p>
            <div className="space-y-3">
              {problem.hints?.slice(0, hintIdx + 1).map((hint, i) => (
                <div key={i} className="rounded-xl p-4"
                  style={{ backgroundColor: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.15)' }}>
                  <p className="text-yellow-400 text-xs font-bold mb-1">Hint {i + 1}</p>
                  <p className="text-gray-300 text-sm">{hint}</p>
                </div>
              ))}
              {hintIdx < problem.hints.length - 1 && (
                <button
                  onClick={() => setHintIdx(prev => prev + 1)}
                  className="text-yellow-400 hover:text-yellow-300 text-xs font-semibold transition-colors"
                >
                  + Show next hint
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Approach - collapsible */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1f2937' }}>
        <button
          onClick={() => setShowApproach(p => !p)}
          className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
          style={{ backgroundColor: '#111827' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a2332'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111827'}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🧠</span>
            <span className="font-bold text-white text-sm">Approach & Complexity</span>
          </div>
          <ChevronDown size={15} className={`text-gray-500 transition-transform ${showApproach ? 'rotate-180' : ''}`} />
        </button>

        {showApproach && (
          <div className="px-6 pb-5 pt-2" style={{ backgroundColor: '#111827', borderTop: '1px solid #1f2937' }}>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{problem.approach}</p>
            <div className="flex gap-4">
              <div className="rounded-lg px-3 py-2" style={{ backgroundColor: '#1f2937' }}>
                <p className="text-gray-500 text-xs">Time</p>
                <p className="text-green-400 font-bold text-sm font-mono">{problem.timeComplexity}</p>
              </div>
              <div className="rounded-lg px-3 py-2" style={{ backgroundColor: '#1f2937' }}>
                <p className="text-gray-500 text-xs">Space</p>
                <p className="text-cyan-400 font-bold text-sm font-mono">{problem.spaceComplexity}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom solve buttons */}
      <div className="flex gap-3 pb-4">
        <a href={problem.leetcode} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-yellow-500 hover:bg-yellow-400 text-black transition-colors">
          <ExternalLink size={15} /> Open on LeetCode
        </a>
        <a href={problem.gfg} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-400 text-white transition-colors">
          <ExternalLink size={15} /> Open on GFG
        </a>
      </div>
    </div>
  )
}