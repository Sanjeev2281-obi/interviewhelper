import { Link } from 'react-router-dom'
import {
  Flame, Code2, PlayCircle, FileText, MessageSquare,
  Building2, ChevronRight, Calendar, CheckCircle,
  Clock, Target, BookOpen, Zap, Lock
} from 'lucide-react'
import { useEffect, useState } from "react"
import { useAuth } from '../hooks/useAuth'
import { dashboardService } from '../services/api'
import MentorCard from '../components/layout/Mentorcard'
import { PROBLEMS } from '../services/Problem' // or corr
const ROADMAP = [
  { phase: '1', title: 'Arrays & Strings', weeks: '1–2', done: false, active: true },
  { phase: '2', title: 'Linked Lists & Stacks', weeks: '3–4', done: false },
  { phase: '3', title: 'Trees & Graphs', weeks: '5–6', done: false },
  { phase: '4', title: 'Dynamic Programming', weeks: '7–8', done: false },
  { phase: '5', title: 'System Design', weeks: '9–10', done: false },
]
const getDailyProblem = () => {
  if (!PROBLEMS.length) return null;

  const startDate = new Date("2026-01-01");
  const today = new Date();

  const diffDays = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  const index = diffDays % PROBLEMS.length;

  return PROBLEMS[index];
};
export default function DashboardPage() {
  const { user } = useAuth()
  const [dbStats, setDbStats] = useState(null)
  

  useEffect(() => {
    dashboardService.getStats()
      .then(res => setDbStats(res.data))
      .catch(err => console.error('Failed to fetch stats:', err))
  }, [])
const DAILY_PROBLEM = getDailyProblem();
  // ✅ This was accidentally deleted — must be defined before return()
  const stats = {
    streak:         dbStats?.streak         ?? 0,
    solved:         dbStats?.totalSolved    ?? 0,
    easySolved:     dbStats?.easySolved     ?? 0,
    mediumSolved:   dbStats?.mediumSolved   ?? 0,
    hardSolved:     dbStats?.hardSolved     ?? 0,
    total:          500,
    mockInterviews: dbStats?.mockInterviews ?? 0,
    resumeScore:    dbStats?.resumeScore    ?? null,
  }

  const isPro = user?.role === 'PRO'

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            {greeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {!isPro && (
          <Link to="/pricing"
            className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Zap size={14} /> Upgrade to Pro
          </Link>
        )}
      </div>
      
      {/* New user welcome banner */}
      <div className="rounded-2xl p-5 flex items-center gap-4"
        style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
          <Zap size={20} className="text-green-400" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">Welcome to InterviewPrep AI! 🎉</p>
          <p className="text-gray-400 text-xs mt-0.5">
            Start with today's DSA problem. Solve daily to build your streak and track progress.
          </p>
        </div>
        <Link to="/dashboard/problems"
          className="shrink-0 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
          Start Now →
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Flame}
          label="Day Streak"
          value={stats.streak === 0 ? '0 days' : `${stats.streak} days`}
          sub={stats.streak === 0 ? 'Solve today to start!' : 'Keep it up! 🔥'}
          iconColor="text-orange-400"
          bg="#1a1007"
          border="#92400e"
        />
        <StatCard
          icon={CheckCircle}
          label="Problems Solved"
          value={stats.solved}
          sub={`of ${stats.total} total`}
          iconColor="text-green-400"
          bg="#0a1f0a"
          border="#166534"
        />
        <StatCard
          icon={PlayCircle}
          label="Mock Interviews"
          value={stats.mockInterviews}
          sub={isPro ? 'Unlimited available' : '3 free per month'}
          iconColor="text-purple-400"
          bg="#130a1f"
          border="#6b21a8"
        />
        <StatCard
          icon={Target}
          label="Resume Score"
          value={stats.resumeScore ? `${stats.resumeScore}/100` : 'Not reviewed'}
          sub={isPro ? 'Upload to review' : 'Pro feature'}
          iconColor="text-cyan-400"
          bg="#0a1a1f"
          border="#155e75"
          locked={!isPro}
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          {/* Today's Problem */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Calendar size={15} className="text-green-400" />
                </div>
                <span className="font-bold text-white text-sm">Today's Problem</span>
              </div>
              <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full font-semibold">Daily</span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2">{DAILY_PROBLEM?.title}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{DAILY_PROBLEM?.description}</p>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full">{DAILY_PROBLEM?.difficulty}</span>
              <span className="text-gray-500 text-xs">Asked by {DAILY_PROBLEM?.companies?.[0]}</span>
            </div>

            <div className="flex gap-3">
              <Link to={`/dashboard/problems/${DAILY_PROBLEM?.id}`}
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
                Solve Now <ChevronRight size={14} />
              </Link>
              <Link to="/dashboard/problems"
                className="text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}>
                View All
              </Link>
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-white text-sm">Overall Progress</span>
              <span className="text-green-400 text-sm font-mono font-bold">
                {Math.round((stats.solved / stats.total) * 100)}%
              </span>
            </div>
            <div className="w-full rounded-full h-2 mb-4" style={{ backgroundColor: '#1f2937' }}>
              <div
                className="h-2 bg-linear-to-r from-green-500 to-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.round((stats.solved / stats.total) * 100)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { label: 'Easy', count: 0, color: 'text-green-400', total: 150 },
                { label: 'Medium', count: 0, color: 'text-yellow-400', total: 250 },
                { label: 'Hard', count: 0, color: 'text-red-400', total: 100 },
              ].map(({ label, count, color, total }) => (
                <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: '#1a2030' }}>
                  <div className={`text-2xl font-extrabold ${color}`}>{count}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{label} / {total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <QuickAction to="/dashboard/mock-interview" icon={PlayCircle} title="Mock Interview" desc="3 free per month" color="#7c3aed" locked={false} />
            <QuickAction to="/dashboard/ai-interview" icon={MessageSquare} title="AI Practice" desc="Chat with AI interviewer" color="#0891b2" locked={!isPro} />
            <QuickAction to="/dashboard/resume" icon={FileText} title="Resume Review" desc="Get AI score & feedback" color="#ea580c" locked={!isPro} />
            <QuickAction to="/dashboard/companies" icon={Building2} title="Company Questions" desc="Amazon, Microsoft & more" color="#16a34a" locked={!isPro} />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Plan info */}
          {!isPro && (
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '2px solid rgba(34,197,94,0.3)' }}>
              <p className="text-green-400 font-bold text-xs uppercase tracking-wider mb-3">Free Plan</p>
              <div className="space-y-2 mb-4">
                {[
                  { text: '1 daily DSA problem', ok: true },
                  { text: '3 mock interviews/month', ok: true },
                  { text: 'Company patterns', ok: false },
                  { text: 'System design problems (LLD/HLD)', ok: false },
                  { text: 'Company based Technical Questions', ok: false },
                ].map(({ text, ok }) => (
                  <div key={text} className="flex items-center gap-2">
                    {ok
                      ? <CheckCircle size={13} className="text-green-500 shrink-0" />
                      : <Lock size={13} className="text-gray-600 shrink-0" />
                    }
                    <span className={`text-xs ${ok ? 'text-gray-300' : 'text-gray-600'}`}>{text}</span>
                  </div>
                ))}
              </div>
              <Link to="/dashboard/pricing"
                className="block text-center bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
                Upgrade to Pro — ₹499/mo
              </Link>
            </div>
          )}

          {/* Roadmap */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={15} className="text-green-400" />
              <span className="font-bold text-white text-sm">Prep Roadmap</span>
            </div>
            <div className="space-y-2">
              {ROADMAP.map(({ phase, title, weeks, done, active }) => (
                <div key={phase}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={active ? { backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' } : {}}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: done ? '#16a34a' : active ? 'rgba(34,197,94,0.2)' : '#1f2937',
                      color: done ? 'white' : active ? '#4ade80' : '#6b7280',
                      border: active ? '1px solid rgba(34,197,94,0.4)' : 'none'
                    }}>
                    {done ? '✓' : phase}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${active ? 'text-white' : done ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
                    <p className="text-xs text-gray-700">Week {weeks}</p>
                  </div>
                  {active && (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-bold">NOW</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <MentorCard isPro={isPro} />
      {/* Mentor guidance */}
    </div>
    </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, iconColor, bg, border, locked }) {
  return (
    <div className="rounded-2xl p-5 relative" style={{ backgroundColor: '#111827', border: `1px solid #1f2937` }}>
      {locked && (
        <div className="absolute top-3 right-3">
          <Lock size={12} className="text-gray-600" />
        </div>
      )}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
        <Icon size={18} className={iconColor} />
      </div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-gray-400 text-xs mt-0.5">{label}</div>
      <div className="text-gray-600 text-xs mt-0.5">{sub}</div>
    </div>
  )
}

function QuickAction({ to, icon: Icon, title, desc, color, locked }) {
  return (
    <Link to={to} className="rounded-2xl p-4 block relative group transition-all duration-200"
      style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = locked ? '#374151' : color + '60'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1f2937'}>
      {locked && (
        <div className="absolute top-3 right-3">
          <Lock size={11} className="text-gray-600" />
        </div>
      )}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: color + '20' }}>
        <Icon size={17} style={{ color }} />
      </div>
      <p className="font-bold text-white text-sm">{title}</p>
      <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
      {locked && <p className="text-yellow-600 text-[10px] mt-1 font-semibold">PRO FEATURE</p>}
    </Link>
  )
}