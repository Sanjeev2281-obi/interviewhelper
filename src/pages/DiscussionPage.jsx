import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { discussionService } from '../services/api'
import toast from 'react-hot-toast'
import {
  MessageCircle, ThumbsUp, Send, ChevronDown, ChevronUp,
  Tag, Clock, User, TrendingUp, Bookmark, Share2, Search,
  Plus, X, Flame, Award, Layers
} from 'lucide-react'

// ── Seed discussions shown until real data loads ──────────
const SEED_DISCUSSIONS = [
  {
    id: 's1', pinned: true,
    author: 'Adi', company: 'Walmart',
    avatar: 'AD', avatarBg: '#1d4ed8',
    tag: 'System Design', tagColor: '#60a5fa', tagBg: 'rgba(59,130,246,0.15)',
    title: 'How I designed a URL shortener in my Walmart interview',
    body: `Got asked to design a URL shortener (like Bitly) in my HLD round at Walmart. Here's what worked for me:\n\n1. Start with estimations — 100M URLs/day, 1B reads/day. This immediately shows you need a distributed system.\n2. Use a Base62 encoding (a-z, A-Z, 0-9) to generate 7-char short codes. Never use sequential IDs — they're predictable.\n3. For storage: a simple SQL table (shortCode, longURL, userId, createdAt). Add a CDN for redirection cache.\n4. The interviewer loved when I mentioned Bloom filters to check if a URL was already shortened.\n\nKey tip: Always talk about trade-offs. They don't want perfect answers — they want to see your thinking process.`,
    likes: 47, comments: 12, createdAt: '2 days ago', saved: false,
  },
  {
    id: 's2',
    author: 'Priya S', company: 'Zoho',
    avatar: 'PS', avatarBg: '#7c3aed',
    tag: 'Time & Space Complexity', tagColor: '#c084fc', tagBg: 'rgba(168,85,247,0.15)',
    title: 'Why O(n log n) vs O(n²) actually matters in interviews',
    body: `Struggled with complexity analysis for months. Here's a mental model that finally clicked for me:\n\nThink in terms of input size n = 10,000:\n- O(n²) = 100,000,000 operations → might time out\n- O(n log n) = ~130,000 operations → fast\n- O(n) = 10,000 operations → blazing fast\n\nFor space complexity, always ask: "am I creating a new data structure proportional to input size?" If yes, that's O(n) space. In-place algorithms use O(1).\n\nMost important: a brute force O(n²) solution is FINE to mention first. Then optimize. Interviewers love the progression from naive → optimized.`,
    likes: 63, comments: 19, createdAt: '4 days ago', saved: false,
  },
  {
    id: 's3',
    author: 'Rahul K', company: 'Infosys',
    avatar: 'RK', avatarBg: '#0f766e',
    tag: 'Career Advice', tagColor: '#34d399', tagBg: 'rgba(52,211,153,0.15)',
    title: 'Minimum skills needed to crack a startup interview in 2024',
    body: `Just joined a Series B startup in Bangalore. Here's the honest truth about what they actually tested:\n\n✅ Must have:\n- Arrays, strings, hashmaps — cold, no hints\n- 1 medium LeetCode in under 20 mins\n- Basic system design awareness (you don't need to be an expert)\n- Git, REST APIs, one backend framework\n\n⚠️ Nice to have:\n- Docker basics\n- SQL queries (GROUP BY, JOINs)\n- Any cloud service familiarity\n\n❌ They didn't care about:\n- Dynamic programming (1 startup asked this, most didn't)\n- Advanced graphs\n- Fancy design patterns\n\nThe vibe-check matters MORE than technical perfection at startups. Be curious, ask questions, show you can learn fast.`,
    likes: 89, comments: 31, createdAt: '1 week ago', saved: false,
  },
  {
    id: 's4',
    author: 'Meena T', company: 'Amazon',
    avatar: 'MT', avatarBg: '#b45309',
    tag: 'Behavioral', tagColor: '#fbbf24', tagBg: 'rgba(251,191,36,0.15)',
    title: 'Amazon Leadership Principles — what they actually mean in interviews',
    body: `Went through 5 Amazon rounds. Each question maps to an LP. Here's the cheat sheet:\n\n"Tell me about a conflict" → Earns Trust + Have Backbone\n"Toughest technical challenge" → Dive Deep + Invent & Simplify\n"When you failed" → Learn and Be Curious + Ownership\n"Delivered under pressure" → Bias for Action + Deliver Results\n\nThe STAR format is mandatory but the secret sauce is the METRICS. "I reduced API latency" is weak. "I reduced P99 latency from 800ms to 120ms, cutting customer complaints by 35%" is what gets you offers.\n\nWrite out 8 strong stories before your interview. Map each to multiple LPs. You'll reuse them across questions.`,
    likes: 112, comments: 28, createdAt: '1 week ago', saved: false,
  },
  {
    id: 's5',
    author: 'Dev M', company: 'Google',
    avatar: 'DM', avatarBg: '#dc2626',
    tag: 'DSA Tips', tagColor: '#f87171', tagBg: 'rgba(239,68,68,0.15)',
    title: 'The sliding window pattern — once you see it, you see it everywhere',
    body: `Sliding window unlocked about 30 medium problems for me. The core insight:\n\nAny problem asking for "maximum/minimum subarray/substring of size k" or "longest substring with condition X" is probably sliding window.\n\nTwo flavors:\n1. Fixed window: maintain window of size k, slide it forward\n2. Variable window: expand right pointer, shrink left when condition breaks\n\nTemplate (variable):\n\`\`\`python\nleft = 0\nfor right in range(len(arr)):\n    # expand window\n    window.add(arr[right])\n    while window_invalid():\n        window.remove(arr[left])\n        left += 1\n    # update answer\n\`\`\`\n\nProblems to cement this: Longest Substring Without Repeating Characters, Minimum Window Substring, Fruits Into Baskets. Do all three in one sitting.`,
    likes: 76, comments: 22, createdAt: '2 weeks ago', saved: false,
  },
  {
    id: 's6',
    author: 'Sneha R', company: 'Microsoft',
    avatar: 'SR', avatarBg: '#0369a1',
    tag: 'Interview Experience', tagColor: '#38bdf8', tagBg: 'rgba(56,189,248,0.15)',
    title: 'My Microsoft SDE1 interview experience — what surprised me',
    body: `Just got my offer letter from Microsoft Hyderabad! Sharing the full breakdown:\n\nRound 1 (Online): 2 medium DSA problems in 90 mins. I got Two Sum variant + Merge Intervals. Both had edge cases the interviewer specifically watched for.\n\nRound 2 (Technical): System design — design a file sync service (like Dropbox). They cared about conflict resolution more than storage architecture.\n\nRound 3 (Technical): Deep dive into my project + 1 DSA (LRU Cache implementation). Write it on a code editor — no compiler.\n\nRound 4 (HR): Standard questions but they asked "what excites you about cloud infrastructure" — research the team beforehand!\n\nBiggest surprise: They asked me to explain my code line-by-line. Practice talking while coding out loud at home.`,
    likes: 134, comments: 45, createdAt: '3 weeks ago', saved: false,
  },
]

const ALL_TAGS = ['All', 'System Design', 'DSA Tips', 'Time & Space Complexity', 'Career Advice', 'Behavioral', 'Interview Experience']

const TAG_COLORS = {
  'System Design':          { text: '#60a5fa', bg: 'rgba(59,130,246,0.15)'  },
  'DSA Tips':               { text: '#f87171', bg: 'rgba(239,68,68,0.15)'   },
  'Time & Space Complexity':{ text: '#c084fc', bg: 'rgba(168,85,247,0.15)'  },
  'Career Advice':          { text: '#34d399', bg: 'rgba(52,211,153,0.15)'  },
  'Behavioral':             { text: '#fbbf24', bg: 'rgba(251,191,36,0.15)'  },
  'Interview Experience':   { text: '#38bdf8', bg: 'rgba(56,189,248,0.15)'  },
}

const S = {
  page:  { minHeight: '100vh', background: '#080d14', color: 'white', fontFamily: "'DM Sans','Inter',sans-serif", paddingBottom: '4rem' },
  card:  { background: '#111827', border: '1px solid #1f2937', borderRadius: 16 },
  input: { width: '100%', background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '0.75rem 1rem', fontSize: 14, color: '#e5e7eb', outline: 'none', boxSizing: 'border-box' },
}

// ── Single Discussion Card ─────────────────────────────────
function DiscussionCard({ d, onLike, onSave, onOpen }) {
  const tag = TAG_COLORS[d.tag] || { text: '#9ca3af', bg: 'rgba(156,163,175,0.15)' }
  return (
    <div
      style={{
        ...S.card, padding: '1.5rem', cursor: 'pointer', transition: 'border-color .2s',
        borderColor: d.pinned ? 'rgba(34,197,94,0.3)' : '#1f2937',
        position: 'relative',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#374151'}
      onMouseLeave={e => e.currentTarget.style.borderColor = d.pinned ? 'rgba(34,197,94,0.3)' : '#1f2937'}
      onClick={() => onOpen(d)}
    >
      {d.pinned && (
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Flame size={12} color="#4ade80" />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#4ade80' }}>FEATURED</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: d.avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 800, color: 'white', flexShrink: 0,
        }}>{d.avatar}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{d.author}</div>
          <div style={{ fontSize: 11, color: '#6b7280' }}>{d.company} · {d.createdAt}</div>
        </div>
        <span style={{
          marginLeft: 'auto', padding: '3px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 700, color: tag.text, background: tag.bg,
          flexShrink: 0,
        }}>{d.tag}</span>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: '0.5rem', lineHeight: 1.4 }}>{d.title}</h3>
      <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {d.body.replace(/```[\s\S]*?```/g, '[code block]')}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} onClick={e => e.stopPropagation()}>
        <button onClick={() => onLike(d.id)} style={{
          display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
          color: d.liked ? '#4ade80' : '#6b7280', cursor: 'pointer', fontSize: 13, padding: 0,
          transition: 'color .15s',
        }}>
          <ThumbsUp size={14} fill={d.liked ? '#4ade80' : 'none'} /> {d.likes}
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
          color: '#6b7280', cursor: 'pointer', fontSize: 13, padding: 0,
        }}>
          <MessageCircle size={14} /> {d.comments}
        </button>
        <button onClick={() => onSave(d.id)} style={{
          marginLeft: 'auto', background: 'none', border: 'none',
          color: d.saved ? '#facc15' : '#4b5563', cursor: 'pointer', padding: 0,
          transition: 'color .15s',
        }}>
          <Bookmark size={14} fill={d.saved ? '#facc15' : 'none'} />
        </button>
      </div>
    </div>
  )
}

// ── Detail Modal ───────────────────────────────────────────
function DetailModal({ d, onClose, onLike, onComment, user }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(d.commentList || [])
  const [submitting, setSubmitting] = useState(false)
  const tag = TAG_COLORS[d.tag] || { text: '#9ca3af', bg: 'rgba(156,163,175,0.15)' }

  const submitComment = async () => {
    if (!comment.trim()) return
    setSubmitting(true)
    try {
      const res = await discussionService.addComment(d.id, comment)
      setComments(prev => [...prev, res.data])
      setComment('')
      onComment(d.id)
      toast.success('Comment posted!')
    } catch {
      // optimistic fallback
      setComments(prev => [...prev, {
        id: Date.now(), author: user?.name || 'You', avatarBg: '#374151',
        avatar: (user?.name || 'Y').slice(0, 2).toUpperCase(),
        body: comment, createdAt: 'Just now',
      }])
      setComment('')
    } finally { setSubmitting(false) }
  }

  const renderBody = (text) =>
    text.split(/(```[\s\S]*?```)/g).map((part, i) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```\w*\n?/, '').replace(/```$/, '')
        return <pre key={i} style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '1rem', fontSize: 12, color: '#a5f3fc', fontFamily: 'monospace', overflowX: 'auto', margin: '0.75rem 0', lineHeight: 1.7 }}>{code}</pre>
      }
      return part.split('\n').map((line, j) => (
        <span key={j}>{line}<br /></span>
      ))
    })

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
      zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '2rem 1rem', overflowY: 'auto',
    }} onClick={onClose}>
      <div style={{
        background: '#111827', border: '1px solid #1f2937', borderRadius: 20,
        width: '100%', maxWidth: 680, padding: '2rem',
      }} onClick={e => e.stopPropagation()}>

        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button onClick={onClose} style={{ background: '#1f2937', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#9ca3af', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: d.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: 'white' }}>{d.avatar}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{d.author}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{d.company} · {d.createdAt}</div>
          </div>
          <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: tag.text, background: tag.bg }}>{d.tag}</span>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4 }}>{d.title}</h2>
        <div style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.8, marginBottom: '1.5rem' }}>{renderBody(d.body)}</div>

        {/* Like row */}
        <div style={{ display: 'flex', gap: 12, paddingBottom: '1.25rem', borderBottom: '1px solid #1f2937', marginBottom: '1.25rem' }}>
          <button onClick={() => onLike(d.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: d.liked ? 'rgba(34,197,94,0.12)' : '#1f2937', border: d.liked ? '1px solid rgba(34,197,94,0.3)' : '1px solid #374151', borderRadius: 10, padding: '7px 14px', color: d.liked ? '#4ade80' : '#9ca3af', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            <ThumbsUp size={14} fill={d.liked ? '#4ade80' : 'none'} /> {d.likes} helpful
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1f2937', border: '1px solid #374151', borderRadius: 10, padding: '7px 14px', color: '#9ca3af', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            <Share2 size={14} /> Share
          </button>
        </div>

        {/* Comments */}
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: '1rem', color: '#e5e7eb' }}>
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.25rem' }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.avatarBg || '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>{c.avatar || c.author?.slice(0, 2).toUpperCase()}</div>
              <div style={{ background: '#1f2937', borderRadius: 12, padding: '0.75rem 1rem', flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 3 }}>{c.author} <span style={{ color: '#4b5563', fontWeight: 400 }}>· {c.createdAt}</span></div>
                <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add comment */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>
            {(user?.name || 'Y').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            <textarea
              style={{ ...S.input, minHeight: 44, resize: 'none', flex: 1 }}
              placeholder="Share your thoughts or experience..."
              value={comment}
              rows={2}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment() } }}
            />
            <button onClick={submitComment} disabled={submitting || !comment.trim()} style={{
              background: comment.trim() ? '#22c55e' : '#1f2937', border: 'none', borderRadius: 10,
              padding: '0 14px', cursor: comment.trim() ? 'pointer' : 'default',
              color: comment.trim() ? '#000' : '#4b5563', transition: 'all .15s', flexShrink: 0,
            }}>
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── New Post Modal ─────────────────────────────────────────
function NewPostModal({ onClose, onSubmit, user }) {
  const [form, setForm] = useState({ title: '', body: '', tag: 'DSA Tips' })
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!form.title.trim() || !form.body.trim()) return toast.error('Title and content are required')
    setSubmitting(true)
    try {
      await onSubmit(form)
      onClose()
      toast.success('Discussion posted!')
    } finally { setSubmitting(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 20, width: '100%', maxWidth: 600, padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>Start a discussion</h2>
          <button onClick={onClose} style={{ background: '#1f2937', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#9ca3af', cursor: 'pointer' }}><X size={16} /></button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Topic</label>
          <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} style={{ ...S.input, appearance: 'none' }}>
            {ALL_TAGS.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
          <input style={S.input} placeholder="What's your question or topic?" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content</label>
          <textarea style={{ ...S.input, minHeight: 160, resize: 'vertical' }} placeholder="Share your experience, tips, or question in detail..." value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 12, padding: '10px 20px', color: '#9ca3af', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={submit} disabled={submitting} style={{ background: '#22c55e', border: 'none', borderRadius: 12, padding: '10px 24px', color: '#000', cursor: 'pointer', fontSize: 14, fontWeight: 800, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Posting...' : 'Post discussion'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────
export default function DiscussionPage() {
  const { user } = useAuth()
  const [discussions, setDiscussions] = useState(SEED_DISCUSSIONS)
  const [activeTag, setActiveTag] = useState('All')
  const [search, setSearch] = useState('')
  const [openPost, setOpenPost] = useState(null)
  const [showNew, setShowNew] = useState(false)
  const [sort, setSort] = useState('hot') // hot | new
  const [loading, setLoading] = useState(true)

  // Fetch from backend on mount
  useEffect(() => {
    discussionService.getAll()
      .then(res => {
        if (res.data?.length) {
          setDiscussions([...SEED_DISCUSSIONS, ...res.data])
        }
      })
      .catch(() => {}) // silently fall back to seeds
      .finally(() => setLoading(false))
  }, [])

  const filtered = discussions
    .filter(d => activeTag === 'All' || d.tag === activeTag)
    .filter(d => !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.body.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'hot' ? (b.likes + b.comments) - (a.likes + a.comments) : 0)

  const handleLike = async (id) => {
    setDiscussions(prev => prev.map(d => d.id === id ? { ...d, liked: !d.liked, likes: d.liked ? d.likes - 1 : d.likes + 1 } : d))
    if (openPost?.id === id) setOpenPost(prev => ({ ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 }))
    try { await discussionService.like(id) } catch {}
  }

  const handleSave = (id) => setDiscussions(prev => prev.map(d => d.id === id ? { ...d, saved: !d.saved } : d))

  const handleComment = (id) => {
    setDiscussions(prev => prev.map(d => d.id === id ? { ...d, comments: d.comments + 1 } : d))
  }

  const handleNewPost = async (form) => {
    const newD = {
      id: Date.now().toString(),
      author: user?.name || 'You',
      company: 'Member',
      avatar: (user?.name || 'Y').slice(0, 2).toUpperCase(),
      avatarBg: '#374151',
      tag: form.tag,
      tagColor: TAG_COLORS[form.tag]?.text || '#9ca3af',
      tagBg: TAG_COLORS[form.tag]?.bg || 'rgba(156,163,175,0.15)',
      title: form.title,
      body: form.body,
      likes: 0, comments: 0, createdAt: 'Just now', saved: false, commentList: [],
    }
    try {
      const res = await discussionService.create(form)
      setDiscussions(prev => [{ ...newD, id: res.data.id }, ...prev])
    } catch {
      setDiscussions(prev => [newD, ...prev])
    }
  }

  return (
    <div style={S.page}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* ── HERO ──────────────────────────────────────── */}
        <div style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1e0f 100%)',
          border: '1px solid rgba(34,197,94,0.15)', padding: '2rem', marginBottom: '2rem',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <MessageCircle size={20} color="#4ade80" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Community</span>
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6, lineHeight: 1.3 }}>
                Discussions & <span style={{ color: '#4ade80' }}>Experiences</span>
              </h1>
              <p style={{ fontSize: 13, color: '#9ca3af', maxWidth: 400, lineHeight: 1.7 }}>
                Real stories from real interviews. Share what worked, ask what's confusing, learn from everyone.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { num: discussions.length, label: 'discussions' },
                { num: discussions.reduce((a, d) => a + d.comments, 0), label: 'comments' },
                { num: discussions.reduce((a, d) => a + d.likes, 0), label: 'helpful votes' },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{num}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTROLS ──────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ flex: '1 1 220px', position: 'relative' }}>
            <Search size={15} color="#4b5563" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input style={{ ...S.input, paddingLeft: 36 }} placeholder="Search discussions..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', background: '#0d1117', borderRadius: 10, border: '1px solid #1f2937', overflow: 'hidden' }}>
            {['hot', 'new'].map(s => (
              <button key={s} onClick={() => setSort(s)} style={{
                padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: sort === s ? '#1f2937' : 'transparent',
                color: sort === s ? 'white' : '#6b7280', transition: 'all .15s',
              }}>
                {s === 'hot' ? '🔥 Hot' : '✨ New'}
              </button>
            ))}
          </div>
          <button onClick={() => setShowNew(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6, background: '#22c55e', border: 'none',
            borderRadius: 10, padding: '9px 18px', color: '#000', fontSize: 13, fontWeight: 800, cursor: 'pointer',
          }}>
            <Plus size={15} /> New post
          </button>
        </div>

        {/* ── TAG FILTERS ───────────────────────────────── */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {ALL_TAGS.map(tag => {
            const active = activeTag === tag
            const c = TAG_COLORS[tag] || { text: '#9ca3af', bg: 'rgba(156,163,175,0.15)' }
            return (
              <button key={tag} onClick={() => setActiveTag(tag)} style={{
                padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: active ? c.bg : '#111827',
                color: active ? c.text : '#6b7280',
                border: active ? `1px solid ${c.text}40` : '1px solid #1f2937',
                transition: 'all .15s',
              }}>{tag}</button>
            )
          })}
        </div>

        {/* ── LAYOUT: discussions + sidebar ─────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '1.5rem', alignItems: 'start' }}>

          {/* Discussions list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loading && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#4b5563' }}>
                <div style={{ width: 28, height: 28, border: '2px solid #22c55e', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 0.8s linear infinite' }} />
                Loading discussions...
              </div>
            )}
            {!loading && filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#4b5563' }}>
                <MessageCircle size={36} color="#1f2937" style={{ margin: '0 auto 1rem' }} />
                <p style={{ fontSize: 14 }}>No discussions found.</p>
                <button onClick={() => setShowNew(true)} style={{ marginTop: 12, background: '#22c55e', border: 'none', borderRadius: 10, padding: '9px 20px', color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  Start one!
                </button>
              </div>
            )}
            {filtered.map(d => (
              <DiscussionCard key={d.id} d={d} onLike={handleLike} onSave={handleSave} onOpen={post => {
                // merge commentList
                setOpenPost({ ...post, commentList: post.commentList || [] })
              }} />
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Top contributors */}
            <div style={{ ...S.card, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1rem' }}>
                <Award size={14} color="#facc15" />
                <span style={{ fontSize: 13, fontWeight: 700 }}>Top contributors</span>
              </div>
              {[
                { name: 'Sneha R', company: 'Microsoft', posts: 8, avatar: 'SR', bg: '#0369a1' },
                { name: 'Dev M', company: 'Google', posts: 6, avatar: 'DM', bg: '#dc2626' },
                { name: 'Adi', company: 'Walmart', posts: 5, avatar: 'AD', bg: '#1d4ed8' },
                { name: 'Meena T', company: 'Amazon', posts: 4, avatar: 'MT', bg: '#b45309' },
              ].map(({ name, company, posts, avatar, bg }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #1f2937' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>{avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{company}</div>
                  </div>
                  <span style={{ fontSize: 11, color: '#4b5563' }}>{posts} posts</span>
                </div>
              ))}
            </div>

            {/* Tags cloud */}
            <div style={{ ...S.card, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1rem' }}>
                <Tag size={13} color="#60a5fa" />
                <span style={{ fontSize: 13, fontWeight: 700 }}>Browse by topic</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ALL_TAGS.filter(t => t !== 'All').map(tag => {
                  const c = TAG_COLORS[tag] || { text: '#9ca3af', bg: 'rgba(156,163,175,0.15)' }
                  const count = discussions.filter(d => d.tag === tag).length
                  return (
                    <button key={tag} onClick={() => setActiveTag(tag)} style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                      background: c.bg, color: c.text, border: 'none',
                    }}>
                      {tag} ({count})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Post CTA */}
            <div style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
              <Layers size={24} color="#4ade80" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Share your story</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12, lineHeight: 1.6 }}>Interview experience? Useful tip? Post it — someone will thank you.</div>
              <button onClick={() => setShowNew(true)} style={{ background: '#22c55e', border: 'none', borderRadius: 10, padding: '8px 16px', color: '#000', fontSize: 12, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
                Write a post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {openPost && (
        <DetailModal
          d={openPost}
          onClose={() => setOpenPost(null)}
          onLike={handleLike}
          onComment={handleComment}
          user={user}
        />
      )}
      {showNew && (
        <NewPostModal onClose={() => setShowNew(false)} onSubmit={handleNewPost} user={user} />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}