import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  Lock, Crown, ExternalLink, ChevronDown, ChevronUp,
  Zap, CheckCircle, ArrowRight, BookOpen, Code2,
  Server, Layers, Database, Globe
} from 'lucide-react'
import { PROBLEMS } from '../services/Problemsdata'
// ── Company logos as SVG ──────────────────────────────────────
const CompanyLogo = ({ name, size = 32 }) => {
  const logos = {
    Google: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    ),
    Amazon: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#FF9900"/>
        <text x="24" y="30" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">a</text>
      </svg>
    ),
    Netflix: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#141414"/>
        <path fill="#E50914" d="M12 8h6l6 16V8h6v32h-6L18 24v16h-6z"/>
      </svg>
    ),
    Apple: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#1d1d1f"/>
        <path fill="white" d="M32.5 25.2c-.05-4.5 3.7-6.7 3.85-6.8-2.1-3.1-5.4-3.5-6.55-3.55-2.75-.3-5.4 1.65-6.8 1.65-1.4 0-3.55-1.6-5.85-1.55-3 .05-5.75 1.75-7.3 4.4-3.15 5.45-.8 13.5 2.2 17.95 1.5 2.15 3.25 4.55 5.55 4.45 2.25-.1 3.1-1.4 5.8-1.4 2.7 0 3.5 1.4 5.85 1.35 2.4-.05 3.9-2.15 5.4-4.3 1.7-2.45 2.4-4.85 2.45-4.95-.05-.05-4.55-1.75-4.6-6.2zM27.8 11.5c1.2-1.5 2.05-3.55 1.8-5.6-1.75.1-3.95 1.2-5.2 2.65-1.1 1.3-2.1 3.4-1.85 5.4 1.95.15 3.95-1 5.25-2.45z"/>
      </svg>
    ),
    Microsoft: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect x="4" y="4" width="18" height="18" fill="#F25022"/>
        <rect x="26" y="4" width="18" height="18" fill="#7FBA00"/>
        <rect x="4" y="26" width="18" height="18" fill="#00A4EF"/>
        <rect x="26" y="26" width="18" height="18" fill="#FFB900"/>
      </svg>
    ),
    Meta: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#0866FF"/>
        <path fill="white" d="M8 24c0-4.4 2.1-8.3 5.3-10.8C16 11 20 10.5 24 12c3.8 1.4 6.5 4.5 7.5 8.2.5 1.8.5 3.8-.2 5.6-.6 1.6-1.8 3-3.2 3.8-1.2.7-2.6.8-3.8.3-1-.4-1.8-1.3-2.1-2.4-.5-1.7 0-3.6 1.2-4.9 1-1.1 2.4-1.7 3.9-1.5"/>
      </svg>
    ),
    Uber: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#000"/>
        <text x="24" y="32" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Arial">U</text>
      </svg>
    ),
    Twitter: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#000"/>
        <path fill="white" d="M26.4 21.7L36.8 10h-2.5l-9.1 10.5L17.7 10H9l10.9 15.8L9 38h2.5l9.5-11.1L28.3 38H37L26.4 21.7zm-3.4 3.9l-1.1-1.6L12.4 11.8h3.9l7.2 10.2 1.1 1.6 9.4 13.4h-3.9l-7.1-10.4z"/>
      </svg>
    ),
  }
  return logos[name] || (
    <div style={{ width: size, height: size, borderRadius: 8, backgroundColor: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 'bold' }}>{name[0]}</span>
    </div>
  )
}

// ── System Design Problems ─────────────────────────────────────


const ALL_PROBLEMS = PROBLEMS

const diffStyle = {
  Easy:   { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80', border: 'rgba(34,197,94,0.2)'  },
  Medium: { bg: 'rgba(234,179,8,0.1)', color: '#facc15', border: 'rgba(234,179,8,0.2)'  },
  Hard:   { bg: 'rgba(239,68,68,0.1)', color: '#f87171', border: 'rgba(239,68,68,0.2)'  },
}

export default function SystemDesignPage() {
  const { user } = useAuth()
  const isPro = user?.role === 'PRO'

  const [filter, setFilter]   = useState('All') // All | HLD | LLD
  const [expanded, setExpanded] = useState(null)
  const [solveModal, setSolveModal] = useState(null)

  const freeProblem  = ALL_PROBLEMS.filter(p => p.free)
  const proProblems  = ALL_PROBLEMS.filter(p => !p.free)

  const filterFn = (list) => filter === 'All' ? list : list.filter(p => p.type === filter)

  return (
    <div className="max-w-5xl mx-auto space-y-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden mb-8"
        style={{
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1f2d 50%, #0a1a0f 100%)',
          border: '1px solid rgba(34,197,94,0.15)',
          minHeight: 200,
        }}>

        {/* Background grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
                  NEW MODULE
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.3)', color: '#facc15' }}>
                  <Crown size={10} className="inline mr-1" />PRO
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                System Design
                <span className="block" style={{ color: '#4ade80' }}>Interview Prep</span>
              </h1>
              <p className="text-gray-400 text-base max-w-lg leading-relaxed">
                Master HLD & LLD with real problems asked at <strong className="text-white">Google, Amazon, Netflix, Apple</strong>.
                30 problems with detailed approaches, resources & tools.
              </p>

              <div className="flex gap-4 mt-5">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">30</div>
                  <div className="text-gray-500 text-xs">Problems</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black text-white">15</div>
                  <div className="text-gray-500 text-xs">HLD</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black text-white">15</div>
                  <div className="text-gray-500 text-xs">LLD</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: '#4ade80' }}>8</div>
                  <div className="text-gray-500 text-xs">Companies</div>
                </div>
              </div>
            </div>

            {/* Company logos */}
            <div className="flex flex-col gap-3">
              <p className="text-gray-600 text-xs uppercase tracking-widest">Top Companies</p>
              <div className="grid grid-cols-4 gap-2">
                {['Google', 'Amazon', 'Netflix', 'Apple', 'Microsoft', 'Meta', 'Uber', 'Twitter'].map(c => (
                  <div key={c} className="flex flex-col items-center gap-1 group">
                    <div className="rounded-xl p-1.5 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
                      <CompanyLogo name={c} size={28} />
                    </div>
                    <span className="text-gray-600 text-[9px]">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW TO SOLVE ──────────────────────────────────────── */}
      <div className="rounded-2xl p-5 mb-6"
        style={{ backgroundColor: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.2)' }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(14,165,233,0.15)' }}>
            <Layers size={15} style={{ color: '#38bdf8' }} />
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-1">How to solve System Design problems?</p>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              Unlike DSA, System Design has no online compiler. You <strong className="text-white">design on paper/whiteboard</strong> and
              explain your thinking. We've linked to the best free tools below each problem.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '✏️', name: 'Excalidraw', desc: 'Free whiteboard', url: 'https://excalidraw.com/' },
                { icon: '🗂️', name: 'draw.io', desc: 'Architecture & UML diagrams', url: 'https://app.diagrams.net/' },
                { icon: '💻', name: 'LeetCode', desc: 'For LLD coding', url: 'https://leetcode.com/' },
                { icon: '🔧', name: 'Replit', desc: 'Run code online', url: 'https://replit.com/' },
              ].map(tool => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#9ca3af', textDecoration: 'none' }}>
                  <span>{tool.icon}</span>
                  <span className="text-white">{tool.name}</span>
                  <span className="text-gray-600">· {tool.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2">
          {['All', 'HLD', 'LLD'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={filter === f
                ? { backgroundColor: '#22c55e', color: 'white', border: '2px solid #22c55e' }
                : { backgroundColor: '#111827', color: '#9ca3af', border: '1px solid #1f2937' }
              }>
              {f === 'HLD' ? '🏗️ HLD' : f === 'LLD' ? '🧱 LLD' : '🌐 All'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Server size={14} className="text-gray-600" />
          <span className="text-gray-500 text-xs">{ALL_PROBLEMS.length} total · 1 free · {ALL_PROBLEMS.length - 1} pro</span>
        </div>
      </div>

      {/* ── FREE PROBLEMS ─────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-white font-bold text-sm">Free Problems</span>
          <span className="text-xs text-gray-600">· Available to everyone</span>
        </div>
        {filterFn(freeProblem).map(p => (
          <ProblemCard key={p.id} p={p} expanded={expanded} setExpanded={setExpanded} setSolveModal={setSolveModal} />
        ))}
        {filterFn(freeProblem).length === 0 && (
          <p className="text-gray-600 text-sm py-4">No free {filter} problems. Switch to "All" to see the free problem.</p>
        )}
      </div>

      {/* ── PRO PROBLEMS ──────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Crown size={14} className="text-yellow-400" />
          <span className="text-white font-bold text-sm">Pro Problems</span>
          <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">
            {filterFn(proProblems).length} problems
          </span>
          {!isPro && <span className="text-xs text-gray-600">· Upgrade to unlock all</span>}
        </div>

        {isPro ? (
          filterFn(proProblems).map(p => (
            <ProblemCard key={p.id} p={p} expanded={expanded} setExpanded={setExpanded} setSolveModal={setSolveModal} />
          ))
        ) : (
          <>
            {/* Show 3 blurred previews */}
            {filterFn(proProblems).slice(0, 5).map((p, i) => (
              <BlurredCard key={p.id} p={p} i={i} />
            ))}

            {/* Upgrade CTA */}
            <div className="rounded-3xl p-10 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0a0f1a, #0d1f0d)',
                border: '2px solid rgba(234,179,8,0.3)',
              }}>
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(rgba(234,179,8,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.5) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.3)' }}>
                  <Crown size={30} className="text-yellow-400" />
                </div>
                <h3 className="text-white text-2xl font-black mb-2">
                  Unlock {filterFn(proProblems).length} {filter !== 'All' ? filter : ''} System Design Problems
                </h3>
                <p className="text-gray-400 text-sm mb-4 max-w-lg mx-auto">
                  Get full access to HLD & LLD problems asked at Google, Amazon, Netflix, Apple with
                  detailed approaches, key components, and direct links to free design tools.
                </p>

                {/* Company logos row */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  {['Google', 'Amazon', 'Netflix', 'Apple', 'Microsoft', 'Meta'].map(c => (
                    <div key={c} className="rounded-xl p-1.5"
                      style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
                      <CompanyLogo name={c} size={24} />
                    </div>
                  ))}
                </div>

                <Link to="/dashboard/pricing"
                  className="inline-flex items-center gap-2 font-black px-10 py-4 rounded-2xl text-base transition-all hover:scale-105"
                  style={{ backgroundColor: '#f59e0b', color: '#000' }}>
                  <Crown size={18} /> Unlock All 30 Problems — ₹499/month
                </Link>
                <p className="text-gray-600 text-xs mt-3">
                  Also includes: 500 DSA problems · AI Interview Practice · Resume Review · 8 Company Patterns
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Solve Modal */}
      {solveModal && (
        <SolveModal problem={solveModal} onClose={() => setSolveModal(null)} />
      )}
    </div>
  )
}

// ── Problem Card ───────────────────────────────────────────────
// Drop-in replacement for the ProblemCard function in SystemDesignPage.jsx

function ProblemCard({ p, expanded, setExpanded, setSolveModal }) {
  const isOpen = expanded === p.id
  const ds = diffStyle[p.difficulty]

  return (
    <div className="rounded-2xl mb-3 overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? '1px solid rgba(34,197,94,0.3)' : '1px solid #1f2937',
        backgroundColor: '#111827',
      }}>

      {/* ── Header (always visible) ──────────────────────── */}
      <button onClick={() => setExpanded(isOpen ? null : p.id)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: isOpen ? 'rgba(34,197,94,0.04)' : 'transparent' }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.backgroundColor = '#1a2030' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent' }}>

        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-center"
          style={{
            backgroundColor: p.type === 'HLD' ? 'rgba(14,165,233,0.1)' : 'rgba(168,85,247,0.1)',
            border: `1px solid ${p.type === 'HLD' ? 'rgba(14,165,233,0.2)' : 'rgba(168,85,247,0.2)'}`,
          }}>
          {p.type === 'HLD'
            ? <Globe size={16} style={{ color: '#38bdf8' }} />
            : <Code2 size={16} style={{ color: '#c084fc' }} />}
          <span className="text-[9px] font-black mt-0.5"
            style={{ color: p.type === 'HLD' ? '#38bdf8' : '#c084fc' }}>{p.type}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-white font-bold text-sm">{p.title}</p>
            {p.free && <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded font-bold">FREE</span>}
          </div>
          <p className="text-gray-500 text-xs">{p.subtitle}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {p.companies.slice(0, 4).map(c => (
              <div key={c} className="flex items-center gap-1">
                <CompanyLogo name={c} size={14} />
                <span className="text-gray-600 text-[10px]">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-gray-600 text-xs">
            <BookOpen size={11} /> {p.duration}
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
            {p.difficulty}
          </span>
          {isOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
        </div>
      </button>

      {/* ── Expanded Content ─────────────────────────────── */}
      {isOpen && (
        <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid #1f2937' }}>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
            {p.tags.map(t => (
              <span key={t} className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                style={{ backgroundColor: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}>
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-5">{p.description}</p>

          {/* ── Input / Output ──────────────────────────── */}
          {p.inputOutput && (
            <div className="rounded-xl overflow-hidden mb-5"
              style={{ border: '1px solid #1f2937' }}>
              <div className="grid grid-cols-2 divide-x divide-gray-800">
                <div className="p-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Input</p>
                  <p className="text-green-300 text-xs font-mono leading-relaxed">{p.inputOutput.input}</p>
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Output</p>
                  <p className="text-blue-300 text-xs font-mono leading-relaxed">{p.inputOutput.output}</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Core Concepts ───────────────────────────── */}
          {p.coreConcepts && (
            <div className="mb-5">
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">Core Concepts</p>
              <div className="flex flex-wrap gap-2">
                {p.coreConcepts.map((c, i) => (
                  <div key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
                    style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}>
                    <span className="text-blue-400 font-bold">{i + 1}.</span>{c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Classes & Functions (LLD only) ──────────── */}
          {p.classes && (
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Code2 size={11} className="text-purple-400" /> Classes to Design
                </p>
                <div className="flex flex-col gap-1.5">
                  {p.classes.map(c => (
                    <div key={c} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)', color: '#d8b4fe' }}>
                      <span className="text-purple-400">class</span> {c}
                    </div>
                  ))}
                </div>
              </div>
              {p.expectedFunctions && (
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers size={11} className="text-green-400" /> Expected Functions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {p.expectedFunctions.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg font-mono"
                        style={{ backgroundColor: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)', color: '#86efac' }}>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── How to Solve ────────────────────────────── */}
          {p.howToSolve && (
            <div className="rounded-xl p-4 mb-5"
              style={{ backgroundColor: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <p className="text-green-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers size={11} /> How to Solve — Step by Step
              </p>
              <div className="flex flex-col gap-2">
                {p.howToSolve.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Requirements ────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Database size={11} className="text-green-400" /> Functional Requirements
              </p>
              <ul className="space-y-1">
                {p.requirements.functional.map(r => (
                  <li key={r} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={11} className="text-green-500 mt-0.5 flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Server size={11} className="text-blue-400" /> Non-Functional
              </p>
              <ul className="space-y-1">
                {p.requirements.nonFunctional.map(r => (
                  <li key={r} className="flex items-start gap-2 text-xs text-gray-400">
                    <Zap size={11} className="text-blue-400 mt-0.5 flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Constraints ─────────────────────────────── */}
          {p.constraints && (
            <div className="mb-5">
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">Constraints</p>
              <div className="flex flex-wrap gap-2">
                {p.constraints.map(c => (
                  <span key={c} className="text-[11px] px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', color: '#fca5a5' }}>
                    ⚠ {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Resources ───────────────────────────────── */}
          {p.resources?.length > 0 && (
            <div className="mb-5">
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">📚 Study Resources</p>
              <div className="flex flex-wrap gap-2">
                {p.resources.map(r => (
                  <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
                    style={{ backgroundColor: '#1f2937', color: '#60a5fa', border: '1px solid #374151', textDecoration: 'none' }}>
                    <ExternalLink size={10} />{r.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Solve Options ───────────────────────────── */}
          <div className="rounded-xl p-4" style={{ backgroundColor: '#0f1923', border: '1px solid #1f2937' }}>
            <p className="text-white font-bold text-xs mb-3">🛠️ Start Solving</p>
            <div className="flex flex-wrap gap-2">
              {p.solveOptions.map(opt => (
                <a key={opt.label} href={opt.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: 'white', textDecoration: 'none' }}>
                  <span>{opt.icon}</span>
                  <div>
                    <div>{opt.label}</div>
                    <div className="text-gray-500 font-normal text-[10px]">{opt.desc}</div>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-gray-600 text-[10px] mt-3">
              💡 Tip: Design on whiteboard first, then explain your approach out loud. Interviewers value communication over perfection.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
// ── Blurred locked card ────────────────────────────────────────
function BlurredCard({ p }) {
  const ds = diffStyle[p.difficulty]
  return (
    <div className="rounded-2xl mb-3 overflow-hidden relative cursor-not-allowed select-none"
      style={{ border: '1px solid rgba(234,179,8,0.15)', backgroundColor: '#111827' }}>
      <div className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,15,26,0.7)' }}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
          <Lock size={13} className="text-yellow-400" />
          <span className="text-yellow-400 text-xs font-bold">Pro Only</span>
          <Crown size={11} className="text-yellow-400" />
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center"
          style={{
            backgroundColor: p.type === 'HLD' ? 'rgba(14,165,233,0.1)' : 'rgba(168,85,247,0.1)',
            border: `1px solid ${p.type === 'HLD' ? 'rgba(14,165,233,0.2)' : 'rgba(168,85,247,0.2)'}`,
          }}>
          {p.type === 'HLD' ? <Globe size={16} style={{ color: '#38bdf8' }} /> : <Code2 size={16} style={{ color: '#c084fc' }} />}
          <span className="text-[9px] font-black mt-0.5" style={{ color: p.type === 'HLD' ? '#38bdf8' : '#c084fc' }}>{p.type}</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">{p.title}</p>
          <p className="text-gray-500 text-xs">{p.subtitle}</p>
          <div className="flex gap-2 mt-1">
            {p.companies.slice(0, 3).map(c => <CompanyLogo key={c} name={c} size={14} />)}
          </div>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
          {p.difficulty}
        </span>
      </div>
    </div>
  )
}

// ── Solve Modal (unused but ready) ────────────────────────────
function SolveModal({ problem, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="rounded-2xl p-6 max-w-md w-full"
        style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
        onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold text-lg mb-1">Choose where to solve</h3>
        <p className="text-gray-400 text-sm mb-4">{problem.title}</p>
        <div className="space-y-3">
          {problem.solveOptions?.map(opt => (
            <a key={opt.label} href={opt.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80 block"
              style={{ backgroundColor: '#1f2937', border: '1px solid #374151', textDecoration: 'none' }}>
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{opt.label}</p>
                <p className="text-gray-500 text-xs">{opt.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-500 ml-auto" />
            </a>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2.5 rounded-xl text-gray-400 text-sm hover:text-white transition-colors"
          style={{ backgroundColor: '#1f2937' }}>
          Close
        </button>
      </div>
    </div>
  )
}