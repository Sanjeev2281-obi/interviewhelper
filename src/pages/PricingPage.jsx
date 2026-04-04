import { Link } from 'react-router-dom'
import {
  CheckCircle, X, Crown, Zap, Code2, Brain, FileText,
  Building2, Target, MessageCircle, UserCheck, TrendingUp,
  ArrowRight, Star, Shield, RefreshCw
} from 'lucide-react'

const FREE_FEATURES = [
  { label: '25 DSA problems', sub: 'Easy & medium, all topics' },
  { label: '3 mock interviews/month', sub: 'Built-in timed format' },
  { label: '1 system design problem', sub: 'Free preview' },
  { label: 'Community discussions', sub: 'Read & post freely' },
  { label: 'Progress tracking', sub: 'Streak & solved count' },
]

const PRO_FEATURES = [
  { icon: Code2,         color: '#22c55e', label: '500+ DSA problems',               sub: 'Full library — all companies, all topics, all difficulties' },
  { icon: Brain,         color: '#a855f7', label: 'Unlimited AI mock interviews',     sub: 'No monthly cap. Practice as many times as you want.' },
  { icon: FileText,      color: '#06b6d4', label: 'AI resume review & score',         sub: 'Upload your resume, get a score out of 100 + actionable fixes' },
  { icon: MessageCircle, color: '#06b6d4', label: 'AI interview practice chat',       sub: 'Conversational AI that acts as an interviewer in real-time' },
  { icon: Building2,     color: '#f97316', label: 'All 10 company patterns',          sub: 'Google, Amazon, Microsoft, Zoho, Flipkart, Walmart, Meta + more' },
  { icon: Target,        color: '#eab308', label: '30 system design problems',        sub: '15 HLD + 15 LLD — Netflix, WhatsApp, Uber, Google Maps, Twitter...' },
  { icon: UserCheck,     color: '#f59e0b', label: '1-on-1 student guide (WhatsApp)',  sub: 'Direct WhatsApp access to an SDE explorer. English & தமிழ்.' },
  { icon: TrendingUp,    color: '#ef4444', label: 'Full progress analytics',          sub: 'Difficulty breakdown, solved by company, topic gaps, streaks' },
  { icon: Zap,           color: '#22c55e', label: 'Cloud sync across devices',        sub: 'Your progress saves to your account — access from anywhere' },
  { icon: Shield,        color: '#a855f7', label: 'Priority support',                 sub: 'Get help faster. Your questions go to the front of the queue.' },
]

const COMPARE_ROWS = [
  { feature: 'DSA problems',              free: '25 problems',    pro: '500+ problems' },
  { feature: 'Mock interviews',           free: '3 / month',      pro: 'Unlimited' },
  { feature: 'System design problems',    free: '1 free preview', pro: '30 full problems' },
  { feature: 'Company interview patterns',free: false,            pro: 'All 10 companies' },
  { feature: 'AI resume review',          free: false,            pro: true },
  { feature: 'AI interview practice',     free: false,            pro: true },
  { feature: '1-on-1 student guide',      free: false,            pro: 'WhatsApp + தமிழ்' },
  { feature: 'Community discussions',     free: true,             pro: true },
  { feature: 'Progress analytics',        free: 'Basic',          pro: 'Full breakdown' },
  { feature: 'Cloud sync',               free: false,            pro: true },
  { feature: 'Priority support',         free: false,            pro: true },
]

const FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account settings at any time. No questions asked, no lock-in period.' },
  { q: 'Is ₹299 the final price?', a: 'This is a special student offer. The standard price is ₹499/month. Lock in ₹299 now before it changes.' },
  { q: 'Can the guide speak Tamil?', a: 'Yes! Sanjeev s, our student guide, is fluent in both English and Tamil (தமிழ்). You can ask questions in whichever language you\'re comfortable with.' },
  { q: 'What happens to my progress if I cancel?', a: 'Your solved problems, streak, and stats are saved permanently. You just lose access to pro features — nothing is deleted.' },
  { q: 'Is there a free trial?', a: 'Yes — the free plan is a permanent trial. 25 problems, 3 mock interviews/month, and community access forever at no cost.' },
  { q: 'I\'m a fresher. Is this useful for me?', a: 'Absolutely — this is built specifically for students and freshers. The roadmap, community discussions, and mentor guidance are all aimed at people starting their SDE journey.' },
]

export default function PricingPage() {
  const s = {
    page: { backgroundColor: '#020408', color: '#fff', fontFamily: "DM Sans, system-ui, sans-serif", minHeight: '100vh', paddingBottom: '4rem' },
    card: { backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 },
  }

  return (
    <div style={s.page}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Back nav */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Back to home
          </Link>
        </div>

        {/* ── HEADER ────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(34,197,94,0.08),transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'liveglow 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 700 }}>Special student pricing — ₹299/month</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,4rem)', letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 16px' }}>
              Simple pricing.<br /><span style={{ color: '#22c55e' }}>Big results.</span>
            </h1>
            <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
              One plan that gives you everything. No tiers, no confusing add-ons.
            </p>
          </div>
        </div>

        {/* ── PLAN CARDS ────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: '3rem' }} className="pricing-grid">

          {/* Free */}
          <div style={{ ...s.card, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Free Plan</div>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-2px' }}>₹0</span>
              <div style={{ fontSize: 13, color: '#4b5563', marginTop: 4 }}>Forever free · No card needed</div>
            </div>
            <div style={{ flex: 1 }}>
              {FREE_FEATURES.map(({ label, sub }) => (
                <div key={label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <CheckCircle size={15} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 14, color: '#d1d5db', fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 12, color: '#4b5563', marginTop: 1 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/signup" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', marginTop: 24, transition: 'all .2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)'} onMouseLeave={e => e.currentTarget.style.backgroundColor='rgba(255,255,255,0.03)'}>
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div style={{ background: 'linear-gradient(160deg,#0a1f10,#071a22)', border: '2px solid rgba(34,197,94,0.4)', borderRadius: 20, padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.1),transparent)', filter: 'blur(25px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontSize: 10, fontWeight: 900, padding: '5px 16px', borderRadius: '0 0 10px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Crown size={10} /> RECOMMENDED FOR STUDENTS
              </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, marginTop: 12, position: 'relative' }}>Pro Plan</div>
            <div style={{ marginBottom: 20, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-2px' }}>₹299</span>
                <div>
                  <div style={{ fontSize: 15, color: '#6b7280', textDecoration: 'line-through' }}>₹499</div>
                  <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 700 }}>40% student discount</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#4b5563', marginTop: 4 }}>Per month · Cancel anytime</div>

              {/* Value props */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                {['Less than Swiggy 🍕','₹10/day ☕','Cancel anytime ✓'].map(t => (
                  <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
              {PRO_FEATURES.map(({ icon: Icon, color, label, sub }) => (
                <div key={label} style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon size={12} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 700 }}>{label}</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/signup" style={{ display: 'block', textAlign: 'center', padding: '15px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontWeight: 900, fontSize: 15, borderRadius: 14, textDecoration: 'none', marginTop: 24, boxShadow: '0 0 30px rgba(34,197,94,0.3)', transition: 'all .2s', position: 'relative' }} onMouseEnter={e => { e.currentTarget.style.transform='scale(1.02)'; e.currentTarget.style.boxShadow='0 0 50px rgba(34,197,94,0.5)' }} onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 30px rgba(34,197,94,0.3)' }}>
              Start Pro — ₹299/month <ArrowRight size={15} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
            </Link>
          </div>
        </div>

        {/* ── ROI MOTIVATOR ─────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg,rgba(34,197,94,0.05),rgba(6,182,212,0.05))', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 20, padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Think about it</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 20 }}>
            {[
              { emoji: '🍕', val: '₹299/month', label: 'Price of Pro plan', sub: 'One Swiggy order' },
              { emoji: '☕', val: '₹10/day',    label: 'Daily cost',        sub: 'Less than chai' },
              { emoji: '📈', val: '10–30 LPA',  label: 'Avg salary jump',   sub: 'After placement' },
              { emoji: '🚀', val: '1000x ROI',  label: 'Return on invest',  sub: 'One job offer pays it all' },
            ].map(({ emoji, val, label, sub }) => (
              <div key={val}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{emoji}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#22c55e' }}>{val}</div>
                <div style={{ fontSize: 13, color: '#d1d5db', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 11, color: '#4b5563' }}>{sub}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 20, fontStyle: 'italic', maxWidth: 480, margin: '20px auto 0' }}>
            "One job offer from this prep = you've paid for 10 years of Pro. The math doesn't lie."
          </p>
        </div>

        {/* ── COMPARISON TABLE ──────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: '1.5rem' }}>Free vs Pro — full comparison</h2>
          <div style={{ ...s.card, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: '#6b7280', fontWeight: 700, fontSize: 12 }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '14px 20px', color: '#6b7280', fontWeight: 700, fontSize: 12, width: 120 }}>Free</th>
                  <th style={{ textAlign: 'center', padding: '14px 20px', color: '#4ade80', fontWeight: 700, fontSize: 12, width: 140 }}>Pro ₹299</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(({ feature, free, pro }, i) => (
                  <tr key={feature} style={{ borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '12px 20px', color: '#d1d5db', fontWeight: 500 }}>{feature}</td>
                    <td style={{ textAlign: 'center', padding: '12px 20px' }}>
                      {free === true
                        ? <CheckCircle size={16} color="#22c55e" style={{ margin: '0 auto', display: 'block' }} />
                        : free === false
                        ? <X size={16} color="#374151" style={{ margin: '0 auto', display: 'block' }} />
                        : <span style={{ color: '#6b7280', fontSize: 12 }}>{free}</span>
                      }
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 20px' }}>
                      {pro === true
                        ? <CheckCircle size={16} color="#22c55e" style={{ margin: '0 auto', display: 'block' }} />
                        : pro === false
                        ? <X size={16} color="#374151" style={{ margin: '0 auto', display: 'block' }} />
                        : <span style={{ color: '#4ade80', fontSize: 12, fontWeight: 700 }}>{pro}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── STUDENT GUIDE HIGHLIGHT ───────────────────── */}
        <div style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.05),rgba(251,191,36,0.03))', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 20, padding: '2rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#fff', flexShrink: 0, border: '2px solid rgba(16,185,129,0.4)' }}>SK</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Sanjeev s</span>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontWeight: 700 }}>Pro exclusive</span>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 700 }}>தமிழில் பேசலாம்</span>
              </div>
              <div style={{ fontSize: 13, color: '#10b981', fontWeight: 600, marginBottom: 8 }}>SDE · Freelancer ·Intrusted in Building Saas product</div>
              <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, marginBottom: 16, maxWidth: 520 }}>
                A fellow student who has deeply researched 50+ SDE journeys, interview patterns, and career paths — so you don't have to figure it all out alone. Ask about DSA strategy, which companies to target, what stack to learn, or whether AI will affect your career.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'How do I learn DSA from scratch?',
                  'Will AI replace Software Engineers?',
                  'What tech stack should I choose?',
                  'How to build strong coding logic?',
                ].map(q => (
                  <span key={q} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 20, background: 'rgba(0,0,0,0.3)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.06)' }}>{q}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: '1.5rem' }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} style={{ ...s.card, padding: '1.25rem 1.5rem' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 6 }}>{q}</div>
                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────── */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg,#0a1f10,#071a22)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: '3rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { icon: Shield, color: '#a855f7', text: 'Cancel anytime' },
              { icon: RefreshCw, color: '#06b6d4', text: 'No lock-in' },
              { icon: Star, color: '#f59e0b', text: '4.9★ rating' },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon size={14} style={{ color }} />
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>
            Start your <span style={{ color: '#22c55e' }}>SDE journey</span> today
          </h3>
          <p style={{ color: '#4b5563', fontSize: 14, marginBottom: 24 }}>
            Free plan forever. Upgrade when you're ready. No pressure.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontWeight: 900, fontSize: 15, padding: '14px 32px', borderRadius: 14, textDecoration: 'none', boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}>
              <Zap size={16} /> Start Free
            </Link>
            <Link to="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 14, textDecoration: 'none' }}>
              <Crown size={16} /> Go Pro — ₹299/mo
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes liveglow { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media(max-width:640px){ .pricing-grid{grid-template-columns:1fr !important} }
      `}</style>
    </div>
  )
}