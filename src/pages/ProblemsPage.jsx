import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, CheckCircle, ExternalLink, Lock, Crown, Loader, Building2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { progressService } from '../services/ProgressService'
import { PROBLEMS } from '../services/Problem'
import toast from 'react-hot-toast'

const COMPANIES = ['All','Zoho','Amazon','Microsoft','Google','Walmart','Flipkart','TCS','Infosys']
const TOPICS    = ['All','Arrays','Strings','Linked Lists','Trees','Graphs','Dynamic Programming','Stacks','Heap','Backtracking','Design','Trie','Bit Manipulation','SQL','Math']
const DIFFS     = ['All','Easy','Medium','Hard']

const diffStyle = {
  easy:   { bg:'rgba(34,197,94,0.1)',  color:'#4ade80', border:'rgba(34,197,94,0.2)'  },
  medium: { bg:'rgba(234,179,8,0.1)', color:'#facc15', border:'rgba(234,179,8,0.2)'  },
  hard:   { bg:'rgba(239,68,68,0.1)', color:'#f87171', border:'rgba(239,68,68,0.2)'  },
}
const companyColor = {
  Zoho:      { bg:'rgba(239,68,68,0.1)',  color:'#f87171', border:'rgba(239,68,68,0.2)'   },
  Amazon:    { bg:'rgba(249,115,22,0.1)', color:'#fb923c', border:'rgba(249,115,22,0.2)'  },
  Microsoft: { bg:'rgba(14,165,233,0.1)', color:'#38bdf8', border:'rgba(14,165,233,0.2)'  },
  Google:    { bg:'rgba(34,197,94,0.1)',  color:'#4ade80', border:'rgba(34,197,94,0.2)'   },
  Walmart:   { bg:'rgba(59,130,246,0.1)', color:'#60a5fa', border:'rgba(59,130,246,0.2)'  },
  Flipkart:  { bg:'rgba(250,204,21,0.1)', color:'#fde047', border:'rgba(250,204,21,0.2)'  },
  TCS:       { bg:'rgba(168,85,247,0.1)', color:'#c084fc', border:'rgba(168,85,247,0.2)'  },
  Infosys:   { bg:'rgba(20,184,166,0.1)', color:'#2dd4bf', border:'rgba(20,184,166,0.2)'  },
}

const FREE_COUNT = PROBLEMS.filter(p => p.free).length
const PRO_COUNT  = PROBLEMS.filter(p => !p.free).length

export default function ProblemsPage() {
  const { user } = useAuth()
  const isPro = user?.role === 'PRO'

  const [search,     setSearch]     = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [topic,      setTopic]      = useState('All')
  const [company,    setCompany]    = useState('All')
  const [solved,     setSolved]     = useState({})
  const [stats,      setStats]      = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [toggling,   setToggling]   = useState({})

  useEffect(() => {
    progressService.getStats()
      .then(res => {
        setStats(res.data)
        const map = {}
        res.data.solvedProblemIds?.forEach(id => { map[id] = true })
        setSolved(map)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const toggleSolved = async (e, p) => {
    e.preventDefault()
    e.stopPropagation()
    if (toggling[p.id]) return
    const wasSolved = !!solved[p.id]
    setSolved(prev => ({ ...prev, [p.id]: !wasSolved }))
    setToggling(prev => ({ ...prev, [p.id]: true }))
    try {
      await progressService.toggle(p.id, p.title, p.difficulty)
      toast.success(wasSolved ? 'Unmarked' : `✅ Solved: ${p.title}`, { duration: 2000 })
      const res = await progressService.getStats()
      setStats(res.data)
    } catch {
      setSolved(prev => ({ ...prev, [p.id]: wasSolved }))
      toast.error('Failed to save. Check backend.')
    } finally {
      setToggling(prev => ({ ...prev, [p.id]: false }))
    }
  }

  const applyFilters = (list) => list.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase())
    const md = difficulty === 'All' || p.difficulty === difficulty.toLowerCase()
    const mt = topic === 'All' || p.topic === topic
    const mc = company === 'All' || p.companies.includes(company)
    return ms && md && mt && mc
  })

  const allFiltered  = applyFilters(PROBLEMS)
  const freeFiltered = allFiltered.filter(p => p.free)
  const proFiltered  = allFiltered.filter(p => !p.free)
  const proDisplay   = isPro ? proFiltered : proFiltered.slice(0, 20)
  const solvedCount  = Object.values(solved).filter(Boolean).length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader size={24} className="text-green-400 animate-spin" />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-white">DSA Problems</h1>
          <p className="text-gray-400 text-sm mt-1">
            {isPro
              ? `${PROBLEMS.length} total problems · Filter by company`
              : `${FREE_COUNT} free · ${PRO_COUNT} more with Pro`
            }
          </p>
        </div>
        {!isPro && (
          <Link to="/pricing"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Crown size={14} /> Unlock All 500
          </Link>
        )}
      </div>

      {/* Progress */}
      <div className="rounded-2xl p-5" style={{ backgroundColor:'#111827', border:'1px solid #1f2937' }}>
        <div className="flex items-center justify-between mb-2 text-xs text-gray-400">
          <span>Your Progress</span>
          <span className="text-green-400 font-bold">{solvedCount} / {PROBLEMS.length} solved</span>
        </div>
        <div className="w-full rounded-full h-2 mb-3" style={{ backgroundColor:'#1f2937' }}>
          <div className="h-2 bg-gradient-to-r from-green-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width:`${Math.min((solvedCount/PROBLEMS.length)*100, 100)}%` }} />
        </div>
        <div className="flex gap-5 flex-wrap">
          {[
            { label:'Easy',   count:stats?.easySolved   ?? 0, color:'#4ade80' },
            { label:'Medium', count:stats?.mediumSolved ?? 0, color:'#facc15' },
            { label:'Hard',   count:stats?.hardSolved   ?? 0, color:'#f87171' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="font-bold text-sm" style={{ color }}>{count}</span>
              <span className="text-gray-500 text-xs">{label} solved</span>
            </div>
          ))}
        </div>
      </div>

      {/* Company tabs */}
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Building2 size={12} /> Filter by Company
        </p>
        <div className="flex flex-wrap gap-2">
          {COMPANIES.map(c => {
            const cc = companyColor[c]
            const isActive = company === c
            return (
              <button key={c} onClick={() => setCompany(c)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                style={isActive && cc
                  ? { backgroundColor:cc.bg, color:cc.color, border:`2px solid ${cc.border}` }
                  : isActive
                  ? { backgroundColor:'rgba(255,255,255,0.1)', color:'white', border:'2px solid rgba(255,255,255,0.3)' }
                  : { backgroundColor:'#1f2937', color:'#9ca3af', border:'1px solid #374151' }
                }>
                {c === 'All' ? '🌐 All' : c}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search problems..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none"
            style={{ backgroundColor:'#1f2937', border:'1px solid #374151' }} />
        </div>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none"
          style={{ backgroundColor:'#1f2937', border:'1px solid #374151' }}>
          {DIFFS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={topic} onChange={e => setTopic(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none"
          style={{ backgroundColor:'#1f2937', border:'1px solid #374151' }}>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Company banner */}
      {company !== 'All' && companyColor[company] && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor:companyColor[company].bg, border:`1px solid ${companyColor[company].border}` }}>
          <Building2 size={14} style={{ color:companyColor[company].color }} />
          <p className="text-sm font-semibold" style={{ color:companyColor[company].color }}>
            {company} Interview Problems
            <span className="font-normal text-xs ml-2 opacity-70">
              · {allFiltered.length} problems found
              {!isPro && ` · Pro unlocks all ${company} problems`}
            </span>
          </p>
        </div>
      )}

      {/* Free section */}
      {freeFiltered.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ border:'1px solid #1f2937' }}>
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ backgroundColor:'#0f1923', borderBottom:'1px solid #1f2937' }}>
            <span className="text-white font-bold text-sm">
              {company === 'All' ? '✅ Free Problems' : `${company} · Free`}
            </span>
            <span className="text-xs text-gray-500">{freeFiltered.length} problems</span>
          </div>
          {freeFiltered.map((p, i) => (
            <ProblemRow key={p.id} p={p} i={i} solved={solved} onToggle={toggleSolved}
              toggling={toggling} total={freeFiltered.length} />
          ))}
        </div>
      )}

      {/* Pro section */}
      {proDisplay.length > 0 && (
        <div className="rounded-2xl overflow-hidden"
          style={{ border: isPro ? '1px solid #1f2937' : '1px solid rgba(234,179,8,0.3)' }}>
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ backgroundColor: isPro ? '#0f1923' : 'rgba(234,179,8,0.05)', borderBottom:'1px solid #1f2937' }}>
            <div className="flex items-center gap-2">
              <Crown size={14} className="text-yellow-400" />
              <span className="text-white font-bold text-sm">
                {company === 'All' ? 'Pro Problems' : `${company} · Pro`}
              </span>
              {!isPro && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">
                  🔒 {proFiltered.length} locked
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {isPro ? proFiltered.length : `${PRO_COUNT}+`} problems
            </span>
          </div>

          {isPro
            ? proFiltered.map((p, i) => (
              <ProblemRow key={p.id} p={p} i={i} solved={solved} onToggle={toggleSolved}
                toggling={toggling} total={proFiltered.length} />
            ))
            : (
              <>
                {proDisplay.map((p, i) => <BlurredRow key={p.id} p={p} i={i} total={proDisplay.length} />)}
                <div className="p-8 text-center" style={{ backgroundColor:'#0a0f1a', borderTop:'1px solid #1f2937' }}>
                  <Crown size={32} className="text-yellow-400 mx-auto mb-3" />
                  <p className="text-white font-extrabold text-lg mb-2">
                    Unlock {company !== 'All' ? proFiltered.length + ' ' + company : PRO_COUNT + '+'} Problems
                  </p>
                  <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
                    {company !== 'All'
                      ? `All ${company} interview questions with difficulty tags and LeetCode/GFG links`
                      : 'Full access to 500 problems from Zoho, Amazon, Google, Microsoft, Walmart, Flipkart, TCS & Infosys'
                    }
                  </p>
                  <Link to="/pricing"
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl text-sm transition-colors">
                    <Crown size={15} /> Upgrade to Pro — ₹499/month
                  </Link>
                </div>
              </>
            )
          }
        </div>
      )}

      {allFiltered.length === 0 && (
        <div className="rounded-2xl p-12 text-center" style={{ backgroundColor:'#111827', border:'1px solid #1f2937' }}>
          <p className="text-gray-500 mb-3">No problems match your filters.</p>
          <button onClick={() => { setSearch(''); setDifficulty('All'); setTopic('All'); setCompany('All') }}
            className="text-green-400 text-sm hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

function ProblemRow({ p, i, solved, onToggle, toggling, total }) {
  const ds = diffStyle[p.difficulty]
  const isSolved = solved[p.id]
  const isToggling = toggling[p.id]
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 transition-colors"
      style={{
        backgroundColor: isSolved ? 'rgba(34,197,94,0.03)' : i%2===0 ? '#0f1923' : '#111827',
        borderBottom: i<total-1 ? '1px solid #1f2937' : 'none',
      }}>
      <button onClick={e => onToggle(e, p)} disabled={isToggling}
        className="flex-shrink-0 hover:scale-110 transition-transform disabled:opacity-50">
        {isToggling
          ? <Loader size={17} className="text-green-400 animate-spin" />
          : isSolved
          ? <CheckCircle size={17} className="text-green-500" />
          : <div className="w-[17px] h-[17px] rounded-full" style={{ border:'2px solid #374151' }} />
        }
      </button>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${isSolved ? 'text-gray-500 line-through' : 'text-white'}`}>{p.title}</p>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-gray-600 text-xs">{p.topic}</span>
          <span className="text-gray-700">·</span>
          {p.companies.slice(0,3).map(c => {
            const cc = companyColor[c]
            return <span key={c} className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{ backgroundColor:cc?.bg||'#1f2937', color:cc?.color||'#9ca3af' }}>{c}</span>
          })}
        </div>
      </div>
      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0"
        style={{ backgroundColor:ds.bg, color:ds.color, border:`1px solid ${ds.border}` }}>
        {p.difficulty}
      </span>
      <div className="flex gap-2 flex-shrink-0">
        <a href={p.leetcode} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ backgroundColor:'rgba(234,179,8,0.1)', color:'#facc15', border:'1px solid rgba(234,179,8,0.2)' }}>
          <ExternalLink size={10}/> LC
        </a>
        <a href={p.gfg} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ backgroundColor:'rgba(34,197,94,0.1)', color:'#4ade80', border:'1px solid rgba(34,197,94,0.2)' }}>
          <ExternalLink size={10}/> GFG
        </a>
      </div>
    </div>
  )
}

function BlurredRow({ p, i, total }) {
  const ds = diffStyle[p.difficulty]
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 relative overflow-hidden select-none cursor-not-allowed"
      style={{
        backgroundColor: i%2===0 ? '#0f1923' : '#111827',
        borderBottom: i<total-1 ? '1px solid #1f2937' : 'none',
      }}>
      <div className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ backdropFilter:'blur(4px)', backgroundColor:'rgba(10,15,26,0.6)' }}>
        <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full">
          <Lock size={11} className="text-yellow-400" />
          <span className="text-yellow-400 text-xs font-bold">Pro Only</span>
        </div>
      </div>
      <div className="w-[17px] h-[17px] rounded-full flex-shrink-0" style={{ border:'2px solid #374151' }} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-white">{p.title}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-gray-600 text-xs">{p.topic}</span>
          <span className="text-gray-700">·</span>
          {p.companies.slice(0,2).map(c => {
            const cc = companyColor[c]
            return <span key={c} className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
              style={{ backgroundColor:cc?.bg||'#1f2937', color:cc?.color||'#9ca3af' }}>{c}</span>
          })}
        </div>
      </div>
      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
        style={{ backgroundColor:ds.bg, color:ds.color, border:`1px solid ${ds.border}` }}>
        {p.difficulty}
      </span>
      <div className="flex gap-2 opacity-40">
        <div className="text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ backgroundColor:'rgba(234,179,8,0.1)', color:'#facc15' }}>LC</div>
        <div className="text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ backgroundColor:'rgba(34,197,94,0.1)', color:'#4ade80' }}>GFG</div>
      </div>
    </div>
  )
}