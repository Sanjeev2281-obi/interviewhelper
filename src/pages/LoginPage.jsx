import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Code2, Brain, FileText } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const perks = [
  { icon: Code2, text: '500+ DSA Problems' },
  { icon: Brain, text: 'AI Mock Interviews' },
  { icon: FileText, text: 'Resume Review' },
]

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12" style={{ backgroundColor: '#0f1923', borderRight: '1px solid #1f2937' }}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">InterviewPrep<span className="text-green-400">AI</span></span>
        </Link>

        <div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Land your dream job at a <span className="text-green-400">top tech company</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Join 10,000+ students preparing for Amazon, Microsoft, Google & Zoho with AI-powered tools.
          </p>
          <div className="space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}>
                  <Icon size={17} className="text-green-400" />
                </div>
                <span className="text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <p className="text-gray-300 text-sm leading-relaxed italic">
            "InterviewPrep AI helped me crack Amazon SDE in just 3 months. The structured approach made all the difference."
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AK</div>
            <div>
              <p className="text-white text-sm font-semibold">Arun Kumar</p>
              <p className="text-gray-500 text-xs">SDE-1 at Amazon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">InterviewPrep<span className="text-green-400">AI</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">{title}</h1>
            <p className="text-gray-400">{subtitle}</p>
          </div>

          <div className="rounded-2xl p-7" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
            {children}
          </div>

          <div className="mt-5 text-center text-gray-500 text-sm">{footer}</div>
        </div>
      </div>
    </div>
  )
}

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to continue your preparation"
      footer={<>Don't have an account? <Link to="/signup" className="text-green-400 hover:text-green-300 font-semibold">Create one free</Link></>}
    >
      <form onSubmit={handle} className="space-y-5">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Email address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
              style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              onFocus={e => e.target.style.borderColor = '#22c55e'}
              onBlur={e => e.target.style.borderColor = '#374151'}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPass ? 'text' : 'password'}
              className="w-full pl-10 pr-11 py-3 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
              style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              onFocus={e => e.target.style.borderColor = '#22c55e'}
              onBlur={e => e.target.style.borderColor = '#374151'}
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
            />
            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-2"
        >
          {loading
            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
            : <>Sign in <ArrowRight size={15} /></>
          }
        </button>
      </form>
    </AuthLayout>
  )
}

export function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created! Welcome 🎉')
      navigate('/dashboard')
    } catch {
      toast.error('Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your interview preparation journey for free"
      footer={<>Already have an account? <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold">Sign in</Link></>}
    >
      <form onSubmit={handle} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#22c55e'}
            onBlur={e => e.target.style.borderColor = '#374151'}
            placeholder="Arun Kumar"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Email address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#22c55e'}
              onBlur={e => e.target.style.borderColor = '#374151'}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPass ? 'text' : 'password'}
              className="w-full pl-10 pr-11 py-3 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#22c55e'}
              onBlur={e => e.target.style.borderColor = '#374151'}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
            />
            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="rounded-xl p-3 mt-1" style={{ backgroundColor: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <p className="text-green-400 text-xs font-semibold mb-1">Free plan includes:</p>
          <p className="text-gray-400 text-xs">Daily DSA problems · 3 mock interviews/month · Progress tracking</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-1"
        >
          {loading
            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
            : <>Create free account <ArrowRight size={15} /></>
          }
        </button>

        <p className="text-center text-gray-600 text-xs">By signing up, you agree to our Terms & Privacy Policy</p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage