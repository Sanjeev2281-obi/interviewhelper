import { Link } from 'react-router-dom'
import { Zap, Code2, Brain, FileText, Building2, CheckCircle, ArrowRight, Star, Github, Twitter, Linkedin } from 'lucide-react'

const features = [
  { icon: Code2, title: 'Daily DSA Problems', desc: 'Fresh coding challenges every day, curated from top company interviews.', iconBg: 'bg-green-500/20', iconColor: 'text-green-400' },
  { icon: Brain, title: 'AI Mock Interviews', desc: 'Simulate real interview conditions with timed sessions and instant feedback.', iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400' },
  { icon: FileText, title: 'AI Resume Review', desc: 'Upload your resume and get AI-powered score with improvement suggestions.', iconBg: 'bg-cyan-500/20', iconColor: 'text-cyan-400' },
  { icon: Building2, title: 'Company Question Bank', desc: 'Curated questions from Amazon, Microsoft, Zoho, Google filtered by topic.', iconBg: 'bg-orange-500/20', iconColor: 'text-orange-400' },
]
const stats = [{ value: '10,000+', label: 'Students Placed' }, { value: '500+', label: 'DSA Problems' }, { value: '50+', label: 'Companies' }, { value: '4.9★', label: 'Rating' }]
const testimonials = [
  { name: 'Arun Kumar', role: 'SDE at Amazon', text: 'Cracked Amazon in 3 months. Daily problems and AI mocks were game-changers.', avatar: 'AK' },
  { name: 'Priya Sharma', role: 'Engineer at Microsoft', text: 'The company-specific question bank was exactly what I needed.', avatar: 'PS' },
  { name: 'Rohit Nair', role: 'Backend Dev at Zoho', text: 'AI resume review gave me a 78/100 score. After fixes I got more callbacks.', avatar: 'RN' },
]
const FREE = ['1 Daily DSA problem', '3 Mock interviews/month', 'Progress tracking', 'Community access']
const PRO = ['Unlimited mock interviews', 'AI resume review', 'AI interview chat', 'All company questions', 'Problem solutions', 'Priority support']

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f', color: '#ffffff' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#0a0a0f', borderBottom: '1px solid #1f2937' }} className="px-6 lg:px-16 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">InterviewPrep<span className="text-green-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['#features', '#companies', '#pricing'].map((href, i) => (
            <a key={href} href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
              {['Features', 'Companies', 'Pricing'][i]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all">Sign in</Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ backgroundColor: '#0a0a0f' }} className="px-6 lg:px-16 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-green-400 text-xs font-semibold" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
          <Star size={11} className="fill-green-400" /> Trusted by 10,000+ students across India
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5 max-w-4xl mx-auto">
          Prepare for Top Tech <br />
          <span className="text-green-400">Companies with AI</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Daily DSA problems, AI mock interviews, resume review, and company-specific question banks — everything to land your dream job.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors flex items-center gap-2">
            Start for Free <ArrowRight size={16} />
          </Link>
          <Link to="/pricing" className="text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors" style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}>
            View Pricing
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
              <div className="text-2xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANIES */}
      <section id="companies" style={{ backgroundColor: '#111827', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }} className="py-10 px-6 lg:px-16">
        <p className="text-center text-gray-500 text-sm mb-7">Questions from engineers at top companies</p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {['Amazon', 'Microsoft', 'Google', 'Zoho', 'Flipkart', 'Infosys'].map(c => (
            <span key={c} className="font-extrabold text-gray-600 hover:text-gray-300 transition-colors text-lg cursor-default">{c}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ backgroundColor: '#0a0a0f' }} className="py-20 px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-white mb-3">Everything you need to succeed</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">A complete preparation ecosystem for Indian tech students.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
            <div key={title} className="rounded-2xl p-7 transition-all duration-300 group" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1f2937'}>
              <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-5`}>
                <Icon size={22} className={iconColor} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ backgroundColor: '#111827', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }} className="py-20 px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-2">Students who made it</h2>
          <p className="text-gray-400">Real results from real students</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map(({ name, role, text, avatar }) => (
            <div key={name} className="rounded-2xl p-6" style={{ backgroundColor: '#0a0a0f', border: '1px solid #1f2937' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">{avatar}</div>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">"{text}"</p>
              <div className="flex gap-0.5 mt-4">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-green-400 fill-green-400" />)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ backgroundColor: '#0a0a0f' }} className="py-20 px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-3">Simple, affordable pricing</h2>
          <p className="text-gray-400 text-lg">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl p-8" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
            <p className="text-gray-400 font-bold text-sm mb-2 uppercase tracking-wider">Free</p>
            <div className="text-5xl font-extrabold text-white mb-1">₹0</div>
            <p className="text-gray-500 text-sm mb-6">Forever free</p>
            <ul className="space-y-3 mb-8">
              {FREE.map(f => <li key={f} className="flex items-center gap-2.5 text-gray-300 text-sm"><CheckCircle size={15} className="text-green-500 flex-shrink-0" />{f}</li>)}
            </ul>
            <Link to="/signup" className="block text-center text-white font-semibold py-3 rounded-xl transition-colors" style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}>
              Get started free
            </Link>
          </div>
          <div className="relative rounded-2xl p-8" style={{ backgroundColor: '#111827', border: '2px solid rgba(34,197,94,0.5)', background: 'linear-gradient(to bottom, rgba(34,197,94,0.05), transparent)' }}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
            </div>
            <p className="text-green-400 font-bold text-sm mb-2 uppercase tracking-wider">Pro</p>
            <div className="text-5xl font-extrabold text-white mb-1">₹499<span className="text-xl text-gray-400">/mo</span></div>
            <p className="text-gray-500 text-sm mb-6">Everything you need</p>
            <ul className="space-y-3 mb-8">
              {PRO.map(f => <li key={f} className="flex items-center gap-2.5 text-gray-200 text-sm"><CheckCircle size={15} className="text-green-500 flex-shrink-0" />{f}</li>)}
            </ul>
            <Link to="/signup" className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors">
              Start Pro Trial →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#111827', borderTop: '1px solid #1f2937' }} className="py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}>
          <Zap size={30} className="text-green-400" />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-3">Start preparing today</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Join thousands of students using InterviewPrep AI to land their dream jobs.</p>
        <Link to="/signup" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors">
          Create Free Account <ArrowRight size={16} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0a0a0f', borderTop: '1px solid #1f2937' }} className="px-6 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center"><Zap size={12} className="text-white" /></div>
            <span className="font-bold text-white">InterviewPrep<span className="text-green-400">AI</span></span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 InterviewPrep AI. Built for Indian tech students.</p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => <a key={i} href="#" className="text-gray-600 hover:text-gray-400 transition-colors"><Icon size={18} /></a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}