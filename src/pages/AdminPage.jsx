import { useState } from 'react'
import { Users, Code2, Trophy, TrendingUp, Plus, Trash2, Edit, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

const STATS = [
  { label: 'Total Users', value: '1,240', icon: Users, color: 'text-brand-400', bg: 'from-brand-500/10 to-brand-500/5' },
  { label: 'Problems', value: '150', icon: Code2, color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-500/5' },
  { label: 'Pro Subscribers', value: '312', icon: Trophy, color: 'text-yellow-400', bg: 'from-yellow-500/10 to-yellow-500/5' },
  { label: 'Monthly Growth', value: '+18%', icon: TrendingUp, color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-500/5' },
]

const INIT_PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'easy', topic: 'Arrays' },
  { id: 2, title: 'Reverse Linked List', difficulty: 'easy', topic: 'Linked Lists' },
  { id: 3, title: 'Coin Change', difficulty: 'medium', topic: 'DP' },
]

const BLANK = { title: '', difficulty: 'easy', topic: '', description: '' }

export default function AdminPage() {
  const [problems, setProblems] = useState(INIT_PROBLEMS)
  const [form, setForm] = useState(BLANK)
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('problems')
  const handleAdd = () => {
    if (!form.title.trim()) return toast.error('Title is required')
    const newP = { ...form, id: Date.now() }
    setProblems(p => [...p, newP])
    setForm(BLANK)
    toast.success('Problem added!')
  }

  const handleDelete = (id) => {
    setProblems(p => p.filter(x => x.id !== id))
    toast.success('Problem deleted')
  }

  const handleEdit = (p) => { setEditing(p.id); setForm({ ...p }) }

  const handleSave = () => {
    setProblems(p => p.map(x => x.id === editing ? { ...form, id: editing } : x))
    setEditing(null); setForm(BLANK)
    toast.success('Problem updated!')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Admin Panel</h1>
        <p className="text-slate-400 font-body text-sm mt-1">Manage problems, users and platform content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 bg-gradient-to-br ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="font-display text-2xl font-bold text-white">{value}</div>
            <div className="text-slate-500 text-xs font-body mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
        {['problems', 'users'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-body font-medium capitalize transition-all ${activeTab === t ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'problems' && (
        <div className="space-y-4">
          {/* Add/Edit form */}
          <div className="card p-5">
            <h3 className="font-display font-semibold text-white mb-4">{editing ? 'Edit Problem' : 'Add New Problem'}</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="label">Title</label>
                <input className="input" placeholder="Problem title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="label">Topic</label>
                <input className="input" placeholder="Arrays, Trees, DP..." value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} />
              </div>
              <div>
                <label className="label">Difficulty</label>
                <select className="input" value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="label">Description</label>
              <textarea className="input min-h-[80px] resize-none" placeholder="Problem description..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <button onClick={handleSave} className="btn-primary"><Check size={14} /> Save Changes</button>
                  <button onClick={() => { setEditing(null); setForm(BLANK) }} className="btn-secondary"><X size={14} /> Cancel</button>
                </>
              ) : (
                <button onClick={handleAdd} className="btn-primary"><Plus size={14} /> Add Problem</button>
              )}
            </div>
          </div>

          {/* Problems list */}
          <div className="card overflow-hidden">
            <div className="divide-y divide-white/5">
              {problems.map(p => (
                <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-slate-200">{p.title}</p>
                    <p className="text-xs text-slate-600 font-body mt-0.5">{p.topic}</p>
                  </div>
                  <span className={`badge-${p.difficulty}`}>{p.difficulty}</span>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(p)} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card p-6 text-center text-slate-500 font-body">
          <Users size={32} className="mx-auto mb-3 text-slate-700" />
          <p>User management coming soon.</p>
          <p className="text-xs mt-1">Connect your backend to see real user data.</p>
        </div>
      )}
    </div>
  )
}