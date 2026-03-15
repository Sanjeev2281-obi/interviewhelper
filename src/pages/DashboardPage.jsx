import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Flame, Trophy, Code2, PlayCircle, FileText, MessageSquare,
  Building2, ChevronRight, TrendingUp, Calendar, CheckCircle,
  Clock, Target, BookOpen, Zap
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const MOCK_STATS = {
  streak: 7,
  solved: 42,
  total: 150,
  mockInterviews: 5,
  score: 78,
}

const MOCK_DAILY = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'easy',
  company: 'Amazon',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
}

const ROADMAP = [
  { phase: '1', title: 'Arrays & Strings', weeks: '1–2', done: true },
  { phase: '2', title: 'Linked Lists & Stacks', weeks: '3–4', done: true },
  { phase: '3', title: 'Trees & Graphs', weeks: '5–6', done: false, active: true },
  { phase: '4', title: 'Dynamic Programming', weeks: '7–8', done: false },
  { phase: '5', title: 'System Design', weeks: '9–10', done: false },
]

const RECENT = [
  { title: 'Valid Parentheses', difficulty: 'easy', date: 'Today' },
  { title: 'Longest Substring', difficulty: 'medium', date: 'Yesterday' },
  { title: 'Binary Tree Traversal', difficulty: 'medium', date: '2 days ago' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats] = useState(MOCK_STATS)
  const [daily] = useState(MOCK_DAILY)

  const pct = Math.round((stats.solved / stats.total) * 100)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Good morning, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-400 font-body text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {user?.plan !== 'PRO' && (
          <Link to="/pricing" className="btn-primary hidden sm:inline-flex">
            <Zap size={15} /> Upgrade to Pro
          </Link>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Day Streak" value={`${stats.streak} days`} sub="Keep it up! 🔥" iconColor="text-orange-400" bg="from-orange-500/10 to-orange-500/5" />
        <StatCard icon={CheckCircle} label="Problems Solved" value={stats.solved} sub={`of ${stats.total} total`} iconColor="text-brand-400" bg="from-brand-500/10 to-brand-500/5" />
        <StatCard icon={PlayCircle} label="Mock Interviews" value={stats.mockInterviews} sub="this month" iconColor="text-purple-400" bg="from-purple-500/10 to-purple-500/5" />
        <StatCard icon={Target} label="Resume Score" value={`${stats.score}/100`} sub="Last reviewed" iconColor="text-cyan-400" bg="from-cyan-500/10 to-cyan-500/5" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Problem */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-500/20 rounded-lg flex items-center justify-center">
                  <Calendar size={16} className="text-brand-400" />
                </div>
                <span className="font-display font-semibold text-white">Today's Problem</span>
              </div>
              <span className="badge-easy">Daily</span>
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-2">{daily.title}</h3>
            <p className="text-slate-400 text-sm font-body mb-4 line-clamp-2">{daily.description}</p>

            <div className="flex items-center gap-3">
              <span className="badge-easy">{daily.difficulty}</span>
              <span className="text-slate-500 text-xs font-body">Asked by {daily.company}</span>
            </div>

            <div className="mt-5 flex gap-3">
              <Link to={`/dashboard/problems/${daily.id}`} className="btn-primary">
                Solve Now <ChevronRight size={15} />
              </Link>
              <Link to="/dashboard/problems" className="btn-secondary">View All</Link>
            </div>
          </div>

          {/* Progress */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-semibold text-white">Overall Progress</span>
              <span className="text-brand-400 text-sm font-mono font-medium">{pct}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-4">
              <div
                className="h-2 bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Easy', count: 20, color: 'text-brand-400' },
                { label: 'Medium', count: 16, color: 'text-yellow-400' },
                { label: 'Hard', count: 6, color: 'text-red-400' },
              ].map(({ label, count, color }) => (
                <div key={label} className="text-center">
                  <div className={`font-display text-2xl font-bold ${color}`}>{count}</div>
                  <div className="text-slate-500 text-xs font-body">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <QuickAction to="/dashboard/mock-interview" icon={PlayCircle} title="Mock Interview" desc="Simulate a real interview" color="purple" />
            <QuickAction to="/dashboard/ai-interview" icon={MessageSquare} title="AI Practice" desc="Chat with AI interviewer" color="cyan" />
            <QuickAction to="/dashboard/resume" icon={FileText} title="Resume Review" desc="Get AI feedback" color="orange" />
            <QuickAction to="/dashboard/companies" icon={Building2} title="Company Questions" desc="Amazon, Microsoft & more" color="green" />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Roadmap */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={16} className="text-brand-400" />
              <span className="font-display font-semibold text-white">Prep Roadmap</span>
            </div>
            <div className="space-y-3">
              {ROADMAP.map(({ phase, title, weeks, done, active }) => (
                <div key={phase} className={`flex items-center gap-3 p-3 rounded-xl ${active ? 'bg-brand-500/10 border border-brand-500/20' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display flex-shrink-0 ${
                    done ? 'bg-brand-500 text-white' :
                    active ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' :
                    'bg-white/5 text-slate-500'
                  }`}>
                    {done ? '✓' : phase}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium font-body ${active ? 'text-white' : done ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
                    <p className="text-xs text-slate-600 font-body">Week {weeks}</p>
                  </div>
                  {active && <span className="text-[10px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded font-display font-semibold">NOW</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={16} className="text-slate-400" />
              <span className="font-display font-semibold text-white">Recent Activity</span>
            </div>
            <div className="space-y-3">
              {RECENT.map(({ title, difficulty, date }) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-brand-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Code2 size={11} className="text-brand-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 font-body truncate">{title}</p>
                    <p className="text-xs text-slate-600 font-body">{date}</p>
                  </div>
                  <span className={`badge-${difficulty} text-[10px]`}>{difficulty}</span>
                </div>
              ))}
            </div>
            <Link to="/dashboard/problems" className="btn-ghost w-full justify-center mt-4 text-xs">
              View all problems <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, iconColor, bg }) {
  return (
    <div className="card p-5">
      <div className={`w-10 h-10 bg-gradient-to-br ${bg} rounded-xl flex items-center justify-center mb-3`}>
        <Icon size={18} className={iconColor} />
      </div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="text-slate-400 text-xs font-body mt-0.5">{label}</div>
      <div className="text-slate-600 text-xs font-body mt-0.5">{sub}</div>
    </div>
  )
}

function QuickAction({ to, icon: Icon, title, desc, color }) {
  const colors = {
    purple: 'text-purple-400 bg-purple-500/10 group-hover:bg-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 group-hover:bg-cyan-500/20',
    orange: 'text-orange-400 bg-orange-500/10 group-hover:bg-orange-500/20',
    green: 'text-brand-400 bg-brand-500/10 group-hover:bg-brand-500/20',
  }
  return (
    <Link to={to} className="card-hover p-4 group block">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors ${colors[color]}`}>
        <Icon size={16} className={colors[color].split(' ')[0]} />
      </div>
      <p className="font-display font-semibold text-white text-sm">{title}</p>
      <p className="text-slate-500 text-xs font-body mt-0.5">{desc}</p>
    </Link>
  )
}