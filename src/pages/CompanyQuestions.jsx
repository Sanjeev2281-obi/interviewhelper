import { useState } from 'react'
import { Search, ChevronRight, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const COMPANIES = [
  { id: 'amazon', name: 'Amazon', color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-400', count: 45, tags: ['Arrays', 'DP', 'Trees', 'Graphs'] },
  { id: 'microsoft', name: 'Microsoft', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-400', count: 38, tags: ['Strings', 'Trees', 'DP', 'Math'] },
  { id: 'google', name: 'Google', color: 'from-brand-500/20 to-brand-500/5', border: 'border-brand-500/20', text: 'text-brand-400', count: 52, tags: ['Graphs', 'DP', 'Arrays', 'Design'] },
  { id: 'zoho', name: 'Zoho', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400', count: 28, tags: ['OOP', 'SQL', 'Arrays', 'Logic'] },
]

const QUESTIONS = {
  amazon: [
    { id: 1, title: 'Two Sum', difficulty: 'easy', topic: 'Arrays', frequency: 'Very High' },
    { id: 2, title: 'LRU Cache', difficulty: 'medium', topic: 'Design', frequency: 'High' },
    { id: 3, title: 'Word Ladder', difficulty: 'hard', topic: 'Graphs', frequency: 'Medium' },
    { id: 4, title: 'Merge K Sorted Lists', difficulty: 'hard', topic: 'Linked Lists', frequency: 'High' },
    { id: 5, title: 'Coin Change', difficulty: 'medium', topic: 'DP', frequency: 'High' },
    { id: 6, title: 'Number of Islands', difficulty: 'medium', topic: 'Graphs', frequency: 'Very High' },
  ],
  microsoft: [
    { id: 7, title: 'Reverse Linked List', difficulty: 'easy', topic: 'Linked Lists', frequency: 'Very High' },
    { id: 8, title: 'Valid Parentheses', difficulty: 'easy', topic: 'Stacks', frequency: 'High' },
    { id: 9, title: 'Binary Tree Level Order', difficulty: 'medium', topic: 'Trees', frequency: 'High' },
    { id: 10, title: 'Clone Graph', difficulty: 'medium', topic: 'Graphs', frequency: 'Medium' },
  ],
  google: [
    { id: 11, title: 'Search in Rotated Array', difficulty: 'medium', topic: 'Arrays', frequency: 'Very High' },
    { id: 12, title: 'Trapping Rain Water', difficulty: 'hard', topic: 'Arrays', frequency: 'High' },
    { id: 13, title: 'Word Search', difficulty: 'medium', topic: 'Backtracking', frequency: 'High' },
    { id: 14, title: 'Serialize Binary Tree', difficulty: 'hard', topic: 'Trees', frequency: 'Medium' },
  ],
  zoho: [
    { id: 15, title: 'Anagram Check', difficulty: 'easy', topic: 'Strings', frequency: 'Very High' },
    { id: 16, title: 'Find Duplicates', difficulty: 'easy', topic: 'Arrays', frequency: 'High' },
    { id: 17, title: 'Employee Hierarchy', difficulty: 'medium', topic: 'SQL', frequency: 'High' },
    { id: 18, title: 'Design Parking Lot', difficulty: 'medium', topic: 'OOP', frequency: 'Medium' },
  ],
}

const TOPICS = ['All', 'Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'Design', 'SQL', 'OOP', 'Linked Lists', 'Stacks']
const DIFFS = ['All', 'Easy', 'Medium', 'Hard']
const FREQ_ORDER = { 'Very High': 0, 'High': 1, 'Medium': 2, 'Low': 3 }

export default function CompanyQuestionsPage() {
  const [selected, setSelected] = useState('amazon')
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('All')
  const [diff, setDiff] = useState('All')

  const questions = (QUESTIONS[selected] || []).filter(q => {
    const ms = q.title.toLowerCase().includes(search.toLowerCase())
    const mt = topic === 'All' || q.topic === topic
    const md = diff === 'All' || q.difficulty === diff.toLowerCase()
    return ms && mt && md
  })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Company Questions</h1>
        <p className="text-slate-400 font-body text-sm mt-1">Practice questions asked at top tech companies</p>
      </div>

      {/* Company selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {COMPANIES.map(({ id, name, color, border, text, count, tags }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`card p-4 text-left transition-all duration-200 ${
              selected === id ? `bg-gradient-to-br ${color} ${border}` : 'hover:border-white/10'
            }`}
          >
            <div className={`font-display text-lg font-bold mb-1 ${selected === id ? text : 'text-slate-300'}`}>
              {name}
            </div>
            <div className="text-slate-500 text-xs font-body mb-2">{count} questions</div>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map(t => (
                <span key={t} className="text-[10px] bg-white/5 text-slate-600 px-1.5 py-0.5 rounded font-body">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input className="input pl-10" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-full sm:w-36" value={diff} onChange={e => setDiff(e.target.value)}>
          {DIFFS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="input w-full sm:w-40" value={topic} onChange={e => setTopic(e.target.value)}>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Questions table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="font-display font-semibold text-white text-sm">
            {COMPANIES.find(c => c.id === selected)?.name} Questions
          </span>
          <span className="text-slate-500 text-xs font-body">{questions.length} results</span>
        </div>
        <div className="divide-y divide-white/5">
          {questions.length === 0 && (
            <div className="p-10 text-center text-slate-500 font-body text-sm">No questions match your filters.</div>
          )}
          {questions.map((q) => (
            <Link
              key={q.id}
              to={`/dashboard/problems/${q.id}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-sm text-slate-200 group-hover:text-white transition-colors">{q.title}</p>
                <p className="text-slate-600 text-xs font-body mt-0.5">{q.topic}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-body ${
                  q.frequency === 'Very High' ? 'text-brand-400' :
                  q.frequency === 'High' ? 'text-yellow-400' : 'text-slate-500'
                }`}>🔥 {q.frequency}</span>
                <span className={`badge-${q.difficulty}`}>{q.difficulty}</span>
              </div>
              <ChevronRight size={14} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}