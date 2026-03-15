import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, CheckCircle, Bookmark, ChevronRight, Code2 } from 'lucide-react'

const MOCK_PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'easy', topic: 'Arrays', companies: ['Amazon', 'Google'], solved: true },
  { id: 2, title: 'Reverse Linked List', difficulty: 'easy', topic: 'Linked Lists', companies: ['Microsoft'], solved: true },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', topic: 'Strings', companies: ['Amazon', 'Zoho'], solved: false },
  { id: 4, title: 'Binary Tree Level Order Traversal', difficulty: 'medium', topic: 'Trees', companies: ['Microsoft', 'Google'], solved: false },
  { id: 5, title: 'Coin Change', difficulty: 'medium', topic: 'Dynamic Programming', companies: ['Amazon'], solved: false },
  { id: 6, title: 'Merge K Sorted Lists', difficulty: 'hard', topic: 'Linked Lists', companies: ['Google'], solved: false },
  { id: 7, title: 'Word Search II', difficulty: 'hard', topic: 'Backtracking', companies: ['Microsoft', 'Amazon'], solved: false },
  { id: 8, title: 'Valid Parentheses', difficulty: 'easy', topic: 'Stacks', companies: ['Zoho', 'Amazon'], solved: true },
  { id: 9, title: 'Maximum Subarray', difficulty: 'medium', topic: 'Dynamic Programming', companies: ['Amazon', 'Microsoft'], solved: false },
  { id: 10, title: 'Number of Islands', difficulty: 'medium', topic: 'Graphs', companies: ['Google', 'Amazon'], solved: false },
]

const TOPICS = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Stacks', 'Backtracking']
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

export default function ProblemsPage() {
  const [problems] = useState(MOCK_PROBLEMS)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [topic, setTopic] = useState('All')

  const filtered = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchDiff = difficulty === 'All' || p.difficulty === difficulty.toLowerCase()
    const matchTopic = topic === 'All' || p.topic === topic
    return matchSearch && matchDiff && matchTopic
  })

  const solved = problems.filter(p => p.solved).length

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">DSA Problems</h1>
          <p className="text-slate-400 text-sm font-body mt-1">{solved} / {problems.length} solved</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-400 font-body">
          <span>Progress</span>
          <span>{Math.round((solved / problems.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5">
          <div
            className="h-1.5 bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
            style={{ width: `${(solved / problems.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-4 mt-3">
          {[
            { label: 'Easy', count: problems.filter(p => p.difficulty === 'easy').length, cls: 'text-brand-400' },
            { label: 'Medium', count: problems.filter(p => p.difficulty === 'medium').length, cls: 'text-yellow-400' },
            { label: 'Hard', count: problems.filter(p => p.difficulty === 'hard').length, cls: 'text-red-400' },
          ].map(({ label, count, cls }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`font-mono font-semibold text-sm ${cls}`}>{count}</span>
              <span className="text-slate-500 text-xs font-body">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            className="input pl-10"
            placeholder="Search problems..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-full sm:w-36"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          className="input w-full sm:w-44"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        >
          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Problem list */}
      <div className="card overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-500 font-body">No problems match your filters.</div>
          )}
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              to={`/dashboard/problems/${p.id}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors group"
            >
              <div className="w-6 text-center">
                {p.solved
                  ? <CheckCircle size={16} className="text-brand-500" />
                  : <span className="text-slate-600 text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-body font-medium text-sm ${p.solved ? 'text-slate-400' : 'text-slate-200'} group-hover:text-white transition-colors`}>
                  {p.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-600 text-xs font-body">{p.topic}</span>
                  <span className="text-slate-700">·</span>
                  <div className="flex gap-1">
                    {p.companies.map(c => (
                      <span key={c} className="text-[10px] bg-white/5 text-slate-500 px-1.5 py-0.5 rounded font-body">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span className={`badge-${p.difficulty} flex-shrink-0`}>{p.difficulty}</span>
              <ChevronRight size={15} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}