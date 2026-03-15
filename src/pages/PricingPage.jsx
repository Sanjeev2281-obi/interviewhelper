import { Link } from 'react-router-dom'
import { CheckCircle, Zap, ArrowRight, X } from 'lucide-react'

const FREE_FEATURES = [
  { text: '1 Daily DSA problem', included: true },
  { text: '3 Mock interviews/month', included: true },
  { text: 'Basic progress tracking', included: true },
  { text: 'Community access', included: true },
  { text: 'AI resume review', included: false },
  { text: 'Company question bank', included: false },
  { text: 'AI interview practice', included: false },
]

const PRO_FEATURES = [
  { text: 'Unlimited mock interviews', included: true },
  { text: 'AI resume review & scoring', included: true },
  { text: 'AI interview practice chat', included: true },
  { text: 'Company question bank (all)', included: true },
  { text: 'DSA problem solutions', included: true },
  { text: 'Streak tracking & analytics', included: true },
  { text: 'Priority support', included: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: '#0a0a0f', borderBottom: '1px solid #1f2937' }} className="px-6 lg:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">InterviewPrep<span className="text-green-400">AI</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-400 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors">Sign in</Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="px-6 py-20 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-green-400 text-xs font-semibold"
            style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <Zap size={11} /> Simple Pricing
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Invest in your <span className="text-green-400">career</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            Less than a cup of coffee a day to land your dream job at Amazon, Microsoft or Google.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">

          {/* Free */}
          <div className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Free Plan</span>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-6xl font-extrabold text-white">₹0</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Forever free, no credit card needed</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map(({ text, included }) => (
                <li key={text} className="flex items-center gap-3">
                  {included
                    ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    : <X size={16} className="text-gray-700 flex-shrink-0" />
                  }
                  <span className={`text-sm ${included ? 'text-gray-300' : 'text-gray-600'}`}>{text}</span>
                </li>
              ))}
            </ul>

            <Link to="/signup"
              className="w-full text-center py-3.5 rounded-xl font-semibold text-white text-sm transition-colors"
              style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              onMouseEnter={e => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={e => e.target.style.backgroundColor = '#1f2937'}
            >
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
            style={{ backgroundColor: '#0d1f17', border: '2px solid rgba(34,197,94,0.5)' }}>

            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: 'rgba(34,197,94,0.12)' }} />

            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <div className="mb-6">
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Pro Plan</span>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-6xl font-extrabold text-white">₹499</span>
                <span className="text-gray-400 text-xl mb-2">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Billed monthly · Cancel anytime</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {PRO_FEATURES.map(({ text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={12} className="text-green-400" />
                  </div>
                  <span className="text-gray-200 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            <Link to="/signup"
              className="w-full text-center py-3.5 rounded-xl font-bold text-white text-sm transition-colors bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2">
              Start Pro Trial <ArrowRight size={15} />
            </Link>
            <p className="text-center text-gray-600 text-xs mt-3">No credit card required for trial</p>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="rounded-2xl overflow-hidden mb-12" style={{ border: '1px solid #1f2937' }}>
          <div className="px-6 py-4" style={{ backgroundColor: '#111827', borderBottom: '1px solid #1f2937' }}>
            <h3 className="text-white font-bold text-lg">Full feature comparison</h3>
          </div>
          {[
            ['Daily DSA Problems', '1/day', 'Unlimited'],
            ['Mock Interviews', '3/month', 'Unlimited'],
            ['AI Interview Chat', '✗', '✓'],
            ['Resume Review', '✗', '✓'],
            ['Company Questions', '✗', 'Amazon, Microsoft, Google, Zoho'],
            ['Problem Solutions', '✗', '✓'],
            ['Progress Analytics', 'Basic', 'Advanced'],
            ['Support', 'Community', 'Priority'],
          ].map(([feature, free, pro], i) => (
            <div key={feature}
              className="grid grid-cols-3 px-6 py-4 text-sm"
              style={{
                backgroundColor: i % 2 === 0 ? '#0f1923' : '#111827',
                borderBottom: i < 7 ? '1px solid #1f2937' : 'none'
              }}>
              <span className="text-gray-300 font-medium">{feature}</span>
              <span className={`text-center ${free === '✗' ? 'text-gray-600' : 'text-gray-400'}`}>{free}</span>
              <span className={`text-center font-semibold ${pro === '✓' || pro === 'Unlimited' ? 'text-green-400' : 'text-gray-300'}`}>{pro}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="text-center mb-8">
          <h3 className="text-white text-2xl font-bold mb-2">Common questions</h3>
          <p className="text-gray-500 text-sm">Everything you need to know</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes, cancel with one click. No questions asked, no hidden fees.' },
            { q: 'Is there a free trial?', a: 'Yes! Start with our Free plan forever, or try Pro features free for 7 days.' },
            { q: 'How does AI review work?', a: 'Upload your resume as PDF or paste text. Our AI analyzes it and gives a score with specific suggestions.' },
            { q: 'Which companies are covered?', a: 'Amazon, Microsoft, Google, Zoho, Flipkart, Infosys and more — 50+ companies total.' },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
              <p className="text-white font-semibold text-sm mb-1.5">{q}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}