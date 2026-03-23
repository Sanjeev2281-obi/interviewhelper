import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Star, X, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { resumeService } from '../services/api'  
const MOCK_RESULT = {
  score: 74,
  sections: [
    { name: 'Formatting', score: 85, status: 'good' },
    { name: 'Technical Skills', score: 70, status: 'ok' },
    { name: 'Experience', score: 80, status: 'good' },
    { name: 'Keywords', score: 60, status: 'warn' },
    { name: 'Projects', score: 65, status: 'warn' },
  ],
  suggestions: [
    { type: 'warn', text: 'Add measurable achievements (e.g. "Reduced load time by 40%")' },
    { type: 'warn', text: 'Include GitHub profile link with active projects' },
    { type: 'error', text: 'Missing key skills: Docker, Kubernetes, CI/CD' },
    { type: 'good', text: 'Good use of action verbs throughout experience section' },
    { type: 'warn', text: 'Add a professional summary at the top' },
    { type: 'error', text: 'No certifications or courses listed (add LeetCode, HackerRank, etc.)' },
    { type: 'good', text: 'Education section is well formatted' },
  ],
  keywords: {
    found: ['React', 'Node.js', 'SQL', 'REST API', 'Git'],
    missing: ['Docker', 'AWS', 'Kubernetes', 'System Design', 'Agile'],
  }
}

export default function ResumeReviewPage() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState('upload') // upload | paste
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) return toast.error('File too large. Max 5MB.')
    setFile(f)
  }
   const handleReview = async () => {
  if (tab === 'upload' && !file) return toast.error('Please upload a file first.')
  if (tab === 'paste' && !text.trim()) return toast.error('Please paste your resume text.')

  try {
    setLoading(true)

    // Step 1: Run AI analysis (your mock result or real AI call)
    // For now using mock — replace with real AI endpoint when ready
    const analysisResult = MOCK_RESULT  // swap with actual AI call

    setResult(analysisResult)

    // Step 2: Save score to DB via your Spring endpoint (JSON body, NOT FormData)
    await resumeService.saveScore(analysisResult.score)

    toast.success('Resume reviewed successfully!')
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong!')
  } finally {
    setLoading(false)
  }
}
  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) { setFile(f); toast.success('File dropped!') }
  }

  const scoreColor = (s) => s >= 80 ? 'text-brand-400' : s >= 60 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = (s) => s >= 80 ? 'bg-brand-500' : s >= 60 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Resume Review</h1>
        <p className="text-slate-400 font-body text-sm mt-1">Get AI-powered feedback to improve your resume score</p>
      </div>

      {!result ? (
        <div className="card p-7">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white/5 p-1 rounded-xl w-fit">
            {['upload', 'paste'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-body font-medium capitalize transition-all ${
                  tab === t ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t === 'upload' ? '📎 Upload PDF' : '📋 Paste Text'}
              </button>
            ))}
          </div>

          {tab === 'upload' ? (
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
                file ? 'border-brand-500/50 bg-brand-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/3'
              }`}
            >
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} className="hidden" />
              {file ? (
                <div>
                  <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FileText size={26} className="text-brand-400" />
                  </div>
                  <p className="text-white font-body font-medium">{file.name}</p>
                  <p className="text-slate-500 text-xs font-body mt-1">{(file.size / 1024).toFixed(0)} KB</p>
                  <button
                    onClick={e => { e.stopPropagation(); setFile(null) }}
                    className="mt-3 text-slate-500 hover:text-red-400 transition-colors inline-flex items-center gap-1 text-xs"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Upload size={26} className="text-slate-400" />
                  </div>
                  <p className="text-white font-body font-medium">Drop your resume here</p>
                  <p className="text-slate-500 text-xs font-body mt-1">PDF, DOC, DOCX, TXT · Max 5MB</p>
                </div>
              )}
            </div>
          ) : (
            <textarea
              className="input min-h-[240px] resize-y font-mono text-xs"
              placeholder="Paste your resume text here..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          )}

          <button
            onClick={handleReview}
            disabled={loading}
            className="btn-primary w-full justify-center mt-5 py-3 text-base"
          >
            {loading
              ? <><Loader size={16} className="animate-spin" /> Analyzing resume...</>
              : <><Star size={16} /> Review My Resume</>
            }
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Score header */}
          <div className="card p-7 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={result.score >= 80 ? '#22c55e' : result.score >= 60 ? '#eab308' : '#ef4444'}
                  strokeWidth="10"
                  strokeDasharray={`${result.score * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-display text-3xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
                <span className="text-slate-500 text-xs font-body">/100</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-white mb-1">Resume Score</h2>
              <p className="text-slate-400 font-body text-sm mb-4">
                {result.score >= 80 ? 'Strong resume! Minor improvements needed.' :
                 result.score >= 60 ? 'Good foundation. Several improvements will help.' :
                 'Needs significant improvements to stand out.'}
              </p>
              <button onClick={() => setResult(null)} className="btn-secondary text-sm">
                Review Another Resume
              </button>
            </div>
          </div>

          {/* Section scores */}
          <div className="card p-6">
            <h3 className="font-display font-semibold text-white mb-5">Section Breakdown</h3>
            <div className="space-y-4">
              {result.sections.map(({ name, score }) => (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-body text-slate-300">{name}</span>
                    <span className={`font-mono font-semibold ${scoreColor(score)}`}>{score}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${scoreBg(score)} transition-all duration-700`} style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="card p-6">
            <h3 className="font-display font-semibold text-white mb-4">Keyword Analysis</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-brand-400 text-xs font-body font-semibold mb-2">✅ Found in your resume</p>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.found.map(k => (
                    <span key={k} className="text-xs bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2 py-1 rounded-lg font-body">{k}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-red-400 text-xs font-body font-semibold mb-2">❌ Missing keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.missing.map(k => (
                    <span key={k} className="text-xs bg-red-500/10 text-red-300 border border-red-500/20 px-2 py-1 rounded-lg font-body">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="card p-6">
            <h3 className="font-display font-semibold text-white mb-4">Improvement Suggestions</h3>
            <div className="space-y-3">
              {result.suggestions.map((s, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${
                  s.type === 'good' ? 'bg-brand-500/5 border border-brand-500/10' :
                  s.type === 'error' ? 'bg-red-500/5 border border-red-500/10' :
                  'bg-yellow-500/5 border border-yellow-500/10'
                }`}>
                  {s.type === 'good'
                    ? <CheckCircle size={15} className="text-brand-400 mt-0.5 flex-shrink-0" />
                    : s.type === 'error'
                    ? <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                    : <TrendingUp size={15} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  }
                  <p className="text-sm font-body text-slate-300">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}