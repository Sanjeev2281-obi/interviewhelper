import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, RefreshCw, Zap } from 'lucide-react'

const INTERVIEW_TYPES = [
  { id: 'technical', label: 'Technical DSA', desc: 'Coding & algorithms', color: 'brand' },
  { id: 'behavioral', label: 'Behavioral', desc: 'STAR method practice', color: 'purple' },
  { id: 'system', label: 'System Design', desc: 'Architecture questions', color: 'cyan' },
  { id: 'hr', label: 'HR Round', desc: 'Common HR questions', color: 'orange' },
]

const OPENING_MESSAGES = {
  technical: "Hello! I'm your AI interviewer today. Let's start with a warm-up. Can you tell me a bit about your background in programming, and then we'll dive into some technical questions. What's your primary programming language?",
  behavioral: "Welcome! I'll be conducting a behavioral interview today to understand your past experiences and how you handle various situations. Let's start: **Tell me about yourself and your journey into software engineering.**",
  system: "Hi! Today we'll go through a system design interview. I'll present you with a real-world problem and we'll work through the design together. First, tell me — have you designed any distributed systems before? What's your background?",
  hr: "Hello! This is your HR round. I'll be asking questions to understand your personality, goals, and fit for the role. Let's start with: **Why do you want to work at a tech company, and what are your career goals for the next 3 years?**",
}

export default function AIInterviewPage() {
  const [sessionType, setSessionType] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startSession = (type) => {
    setSessionType(type)
    setMessages([{
      role: 'assistant',
      content: OPENING_MESSAGES[type],
      timestamp: new Date(),
    }])
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Call Anthropic API directly for AI interview
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          system: `You are a senior ${sessionType === 'technical' ? 'software engineer' : sessionType === 'behavioral' ? 'engineering manager' : sessionType === 'system' ? 'systems architect' : 'HR recruiter'} conducting a job interview for a software engineering position at a top tech company (Amazon/Microsoft/Google). 
          
Be conversational but professional. Ask follow-up questions based on the candidate's responses. Give constructive feedback after their answers. Keep responses under 150 words. End each response with either a follow-up question or feedback + next question.`,
          messages: [
            { role: 'user', content: OPENING_MESSAGES[sessionType] },
            ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input.trim() }
          ],
        })
      })

      if (!response.ok) throw new Error('API error')
      const data = await response.json()
      const aiText = data.content?.[0]?.text || "I see. Can you elaborate on that?"

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiText,
        timestamp: new Date(),
      }])
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Fallback mock responses
      const fallbacks = [
        "Good answer! I like how you approached that. Let's dig deeper — can you tell me about the time complexity of your solution and how you'd optimize it further?",
        "Interesting perspective. Can you walk me through a specific example from your experience that demonstrates this?",
        "That's a solid foundation. Now, how would you handle edge cases? What if the input was null or the array was empty?",
        "Good. Let me ask a follow-up: if you had to scale this system to handle 10x the load, what changes would you make?",
      ]
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbacks[Math.floor(Math.random() * fallbacks.length)],
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const reset = () => {
    setSessionType(null)
    setMessages([])
    setInput('')
  }

  if (!sessionType) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white">AI Interview Practice</h1>
          <p className="text-slate-400 font-body text-sm mt-1">Practice with an AI interviewer that gives real-time feedback</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {INTERVIEW_TYPES.map(({ id, label, desc, color }) => (
            <button
              key={id}
              onClick={() => startSession(id)}
              className="card-hover p-6 text-left group"
            >
              <div className={`w-10 h-10 rounded-xl bg-${color === 'brand' ? 'brand' : color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Bot size={20} className={`text-${color === 'brand' ? 'brand' : color}-400`} />
              </div>
              <h3 className="font-display font-semibold text-white mb-1">{label}</h3>
              <p className="text-slate-500 text-sm font-body">{desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 card p-5 border-brand-500/20 bg-brand-500/5">
          <div className="flex items-start gap-3">
            <Zap size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-display font-semibold text-white mb-1">Pro Tip</p>
              <p className="text-sm text-slate-400 font-body">Treat this like a real interview — think out loud, structure your answers with STAR method for behavioral questions, and ask clarifying questions.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-500/20 rounded-xl flex items-center justify-center">
            <Bot size={18} className="text-brand-400" />
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm">AI Interviewer</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
              <span className="text-xs text-brand-400 font-body">{INTERVIEW_TYPES.find(t => t.id === sessionType)?.label} Session</span>
            </div>
          </div>
        </div>
        <button onClick={reset} className="btn-ghost text-xs">
          <RefreshCw size={13} /> New Session
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto card p-4 space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'assistant' ? 'bg-brand-500/20' : 'bg-white/10'
            }`}>
              {msg.role === 'assistant'
                ? <Bot size={15} className="text-brand-400" />
                : <User size={15} className="text-slate-300" />
              }
            </div>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-white/5 border border-white/8 text-slate-200'
                  : 'bg-brand-500/20 border border-brand-500/30 text-white'
              }`}>
                {msg.content}
              </div>
              <span className="text-xs text-slate-700 mt-1 px-1 font-body">
                {msg.timestamp?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center">
              <Bot size={15} className="text-brand-400" />
            </div>
            <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-2xl">
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="card p-3 border-white/10">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none font-body max-h-32 min-h-[40px] py-2 px-1"
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="btn-primary px-4 py-2 self-end"
          >
            <Send size={15} />
          </button>
        </div>
        <p className="text-xs text-slate-700 font-body mt-1 px-1">Press Enter to send • Shift+Enter for new line</p>
      </div>
    </div>
  )
}