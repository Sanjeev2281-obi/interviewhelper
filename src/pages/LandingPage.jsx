import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Star, CheckCircle, Zap, Github, Linkedin, Twitter,
  Code2, Brain, FileText, Building2, Target, TrendingUp, Play,
  Crown, Users, Award, MessageCircle, UserCheck, Sparkles
} from 'lucide-react'

const LOGOS = {
  Google: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>),
  Amazon: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#131921"/><text x="24" y="29" textAnchor="middle" fill="#FF9900" fontSize="28" fontWeight="900" fontFamily="Georgia,serif">a</text><path d="M14 37 Q24 42 34 37" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>),
  Meta: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#0866FF"/><path fill="white" d="M10 28c0-6.6 5.4-12 12-12s12 5.4 12 12c0 5-3.1 9.3-7.5 11.1V32h2.5l.5-4H26.5v-2.5c0-1.1.5-2 2.2-2H30v-3.5s-1.5-.3-2.9-.3c-3 0-5.1 1.8-5.1 5v2.8H19l-.5 4H22v7.1C17.1 37.3 10 33.3 10 28z"/></svg>),
  Apple: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#1d1d1f"/><path fill="white" d="M32.5 25.1c-.1-4.4 3.6-6.5 3.7-6.6-2-3-5.2-3.4-6.3-3.4-2.7-.3-5.2 1.6-6.6 1.6-1.4 0-3.5-1.5-5.7-1.5-2.9.1-5.6 1.7-7.1 4.3-3 5.2-.8 12.9 2.2 17.1 1.4 2.1 3.2 4.4 5.4 4.3 2.1-.1 3-1.4 5.6-1.4 2.6 0 3.3 1.4 5.6 1.3 2.3 0 3.8-2.1 5.3-4.1 1.6-2.4 2.3-4.7 2.3-4.8-.1 0-4.4-1.7-4.4-5.8zM28 11.5c1.2-1.5 2-3.5 1.8-5.5-1.7.1-3.9 1.2-5.1 2.6-1.1 1.3-2.1 3.3-1.8 5.2 1.9.1 3.9-.9 5.1-2.3z"/></svg>),
  Netflix: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#141414"/><path fill="#E50914" d="M13 8h6.5l4.5 14V8h5v32h-6.5L18 26v14h-5z"/></svg>),
  Microsoft: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect x="5" y="5" width="17" height="17" fill="#F25022"/><rect x="26" y="5" width="17" height="17" fill="#7FBA00"/><rect x="5" y="26" width="17" height="17" fill="#00A4EF"/><rect x="26" y="26" width="17" height="17" fill="#FFB900"/></svg>),
  Zoho: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#E42527"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif">ZOHO</text></svg>),
  Flipkart: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#2874F0"/><polygon points="24,10 36,18 36,30 24,38 12,30 12,18" fill="#F8E71C"/><text x="24" y="29" textAnchor="middle" fill="#2874F0" fontSize="11" fontWeight="900" fontFamily="Arial,sans-serif">F</text></svg>),
  Walmart: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#0071CE"/><g stroke="#FFC220" strokeWidth="2.5" strokeLinecap="round"><line x1="24" y1="9" x2="24" y2="20"/><line x1="24" y1="28" x2="24" y2="39"/><line x1="9" y1="24" x2="20" y2="24"/><line x1="28" y1="24" x2="39" y2="24"/><line x1="14" y1="14" x2="21" y2="21"/><line x1="27" y1="27" x2="34" y2="34"/><line x1="34" y1="14" x2="27" y2="21"/><line x1="21" y1="27" x2="14" y2="34"/></g><circle cx="24" cy="24" r="3" fill="#FFC220"/></svg>),
  Uber: () => (<svg viewBox="0 0 48 48" width="100%" height="100%"><rect width="48" height="48" rx="10" fill="#000"/><text x="24" y="31" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial,sans-serif">UBER</text></svg>),
}

function Counter({ end, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let s = 0; const inc = end / 60
      const t = setInterval(() => { s = Math.min(s + inc, end); setN(Math.floor(s)); if (s >= end) clearInterval(t) }, 25)
      obs.disconnect()
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

const FEATURES = [
  { icon: Code2,         color: '#22c55e', glow: 'rgba(34,197,94,0.12)',  title: '500+ DSA Problems',          desc: 'Curated from real FAANG interviews. Filter by company, topic, difficulty. Track your streak daily.', tag: 'Core' },
  { icon: Brain,         color: '#a855f7', glow: 'rgba(168,85,247,0.12)', title: 'AI Mock Interviews',          desc: 'Simulate real conditions with AI. Instant feedback on answers, pacing, and communication style.', tag: 'AI' },
  { icon: FileText,      color: '#06b6d4', glow: 'rgba(6,182,212,0.12)',  title: 'Resume Review & Score',       desc: 'Upload your resume. Get a score out of 100 with specific, actionable feedback to stand out.', tag: 'Pro' },
  { icon: Building2,     color: '#f97316', glow: 'rgba(249,115,22,0.12)', title: 'Company Interview Patterns',  desc: 'Round-by-round breakdown for Zoho, Amazon, Google, Microsoft, Flipkart, Walmart, TCS, Infosys.', tag: 'Pro' },
  { icon: Target,        color: '#eab308', glow: 'rgba(234,179,8,0.12)',  title: 'System Design HLD + LLD',     desc: '30 problems — Design Netflix, WhatsApp, Uber, Google Maps with full approach and free tools.', tag: 'Pro' },
  { icon: MessageCircle, color: '#10b981', glow: 'rgba(16,185,129,0.12)', title: 'Community Discussions',       desc: 'Real interview experiences shared by students. Ask questions, share tips, learn from others.', tag: 'All' },
  { icon: UserCheck,     color: '#f59e0b', glow: 'rgba(245,158,11,0.12)', title: '1-on-1 Student Guide',        desc: 'Chat directly with an SDE explorer who has researched 50+ engineer journeys. In English or தமிழ்.', tag: 'Pro' },
  { icon: TrendingUp,    color: '#ef4444', glow: 'rgba(239,68,68,0.12)',  title: 'Progress Dashboard',          desc: 'Solved problems, daily streak, performance analytics — saved to your account across devices.', tag: 'All' },
]

const TESTIMONIALS = [
  { name: 'Arun Kumar',     role: 'SDE-1 @ Amazon',               avatar: 'AK', company: 'Amazon',    pkg: '₹32 LPA', text: 'Got my Amazon offer after 3 months of prep here. The company-specific patterns told me exactly what to expect in each round. The discussion community helped me understand what real engineers face.' },
  { name: 'Priya Sharma',   role: 'Software Engineer @ Microsoft', avatar: 'PS', company: 'Microsoft', pkg: '₹28 LPA', text: 'The AI resume review found 8 issues I had no idea about. After fixing them my callback rate went from 10% to 60%. The mentor guidance in Tamil made everything so much clearer for me.' },
  { name: 'Rohit Nair',     role: 'Backend Dev @ Zoho',            avatar: 'RN', company: 'Zoho',      pkg: '₹10 LPA', text: 'First attempt at Zoho and I cracked it. The round-by-round breakdown was surgical — I knew exactly what topics each round would cover. Felt like I had insider information.' },
  { name: 'Deepa Krishnan', role: 'SWE @ Google',                  avatar: 'DK', company: 'Google',    pkg: '₹55 LPA', text: 'The discussion page had a post from someone who had faced my exact Google system design question. That single discussion saved me. The community here is genuinely helpful.' },
]

const COMPANIES = [
  { name: 'Google',    pkg: '₹35–80 LPA', rounds: '5 rounds', accent: '#4285F4' },
  { name: 'Amazon',    pkg: '₹20–45 LPA', rounds: '4 rounds', accent: '#FF9900' },
  { name: 'Meta',      pkg: '₹30–60 LPA', rounds: '5 rounds', accent: '#0866FF' },
  { name: 'Apple',     pkg: '₹30–70 LPA', rounds: '5 rounds', accent: '#A2AAAD' },
  { name: 'Netflix',   pkg: '₹40–90 LPA', rounds: '5 rounds', accent: '#E50914' },
  { name: 'Microsoft', pkg: '₹25–55 LPA', rounds: '4 rounds', accent: '#00A4EF' },
  { name: 'Zoho',      pkg: '₹5–12 LPA',  rounds: '4 rounds', accent: '#E42527' },
  { name: 'Flipkart',  pkg: '₹18–40 LPA', rounds: '4 rounds', accent: '#2874F0' },
  { name: 'Walmart',   pkg: '₹15–35 LPA', rounds: '4 rounds', accent: '#0071CE' },
  { name: 'Uber',      pkg: '₹20–50 LPA', rounds: '4 rounds', accent: '#555' },
]

const MENTOR_TOPICS = [
  { q: 'How do I learn DSA from scratch?', icon: '📐' },
  { q: 'How do I build strong coding logic?', icon: '🧠' },
  { q: 'What tech stack should I choose?', icon: '⚙️' },
  { q: 'Will AI replace Software Engineers?', icon: '🤖' },
  { q: 'How to crack product-based interviews?', icon: '🎯' },
  { q: 'What does a day in SDE life look like?', icon: '💼' },
]

export default function LandingPage() {
  const [activeTesti, setActiveTesti] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTesti(p => (p + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const T = TESTIMONIALS[activeTesti]
  const TestiLogo = LOGOS[T.company] || LOGOS.Google

  return (
    <div style={{ backgroundColor: '#020408', color: '#fff', fontFamily: "DM Sans, system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 6%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: scrollY > 20 ? 'rgba(2,4,8,0.92)' : 'transparent', backdropFilter: scrollY > 20 ? 'blur(24px)' : 'none', borderBottom: scrollY > 20 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px' }}>InterviewPrep<span style={{ color: '#22c55e' }}>AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[['#features','Features'],['#community','Community'],['#companies','Companies'],['#pricing','Pricing']].map(([h,l]) => (
            <a key={h} href={h} style={{ color: '#64748b', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#64748b'}>{l}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" style={{ color: '#64748b', fontSize: 14, fontWeight: 600, textDecoration: 'none', padding: '8px 16px', borderRadius: 10, transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.backgroundColor='rgba(255,255,255,0.05)' }} onMouseLeave={e => { e.currentTarget.style.color='#64748b'; e.currentTarget.style.backgroundColor='transparent' }}>Sign in</Link>
          <Link to="/signup" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontSize: 14, fontWeight: 800, padding: '10px 22px', borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 0 20px rgba(34,197,94,0.3)', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow='0 0 35px rgba(34,197,94,0.5)' }} onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 20px rgba(34,197,94,0.3)' }}>
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 6% 80px', overflow: 'hidden' }}>
        <div style={{ position:'absolute',inset:0,opacity:0.035,backgroundImage:'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:900,height:500,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(34,197,94,0.15) 0%,transparent 70%)',filter:'blur(60px)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',top:0,left:0,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.08),transparent)',filter:'blur(80px)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:0,right:0,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(168,85,247,0.08),transparent)',filter:'blur(80px)',pointerEvents:'none' }}/>

        <div style={{ position:'relative',zIndex:1,textAlign:'center',maxWidth:900,width:'100%' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:8,backgroundColor:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:100,padding:'6px 18px',marginBottom:32 }}>
            <span style={{ width:7,height:7,borderRadius:'50%',backgroundColor:'#22c55e',boxShadow:'0 0 8px #22c55e',display:'inline-block',animation:'liveglow 2s ease-in-out infinite' }}/>
            <span style={{ color:'#4ade80',fontSize:13,fontWeight:700 }}>10,000+ students placed at top tech companies</span>
          </div>

          <h1 style={{ fontWeight:900,fontSize:'clamp(2.8rem,6.5vw,5.5rem)',lineHeight:1.05,letterSpacing:'-2px',margin:'0 0 24px' }}>
            <span style={{ color:'#fff' }}>Land Your Dream SDE Job</span><br/>
            <span style={{ background:'linear-gradient(135deg,#22c55e 0%,#06b6d4 45%,#a855f7 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>with AI + Community</span>
          </h1>

          <p style={{ color:'#64748b',fontSize:'clamp(1rem,2vw,1.2rem)',maxWidth:620,margin:'0 auto 24px',lineHeight:1.75 }}>
            The complete prep platform built for Indian students: <strong style={{color:'#94a3b8'}}>500+ DSA problems</strong>, <strong style={{color:'#94a3b8'}}>AI mock interviews</strong>, <strong style={{color:'#94a3b8'}}>community discussions</strong>, and <strong style={{color:'#94a3b8'}}>1-on-1 guidance</strong>.
          </p>

          {/* Community trust strip */}
          <div style={{ display:'inline-flex',alignItems:'center',gap:12,backgroundColor:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)',borderRadius:12,padding:'10px 18px',marginBottom:40 }}>
            <MessageCircle size={15} color="#10b981" />
            <span style={{ fontSize:13,color:'#6b7280' }}>Students discuss in real-time</span>
            <span style={{ width:1,height:16,background:'rgba(255,255,255,0.1)' }}/>
            <UserCheck size={15} color="#f59e0b" />
            <span style={{ fontSize:13,color:'#6b7280' }}>Guided by SDE explorers</span>
            <span style={{ width:1,height:16,background:'rgba(255,255,255,0.1)' }}/>
            <span style={{ fontSize:13,color:'#10b981',fontWeight:700 }}>தமிழில் பேசலாம்</span>
          </div>

          <div style={{ display:'flex',flexWrap:'wrap',gap:16,justifyContent:'center',marginBottom:72 }}>
            <Link to="/signup" style={{ background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'#fff',fontWeight:900,fontSize:16,padding:'16px 36px',borderRadius:16,textDecoration:'none',display:'flex',alignItems:'center',gap:8,boxShadow:'0 0 40px rgba(34,197,94,0.35)',transition:'all 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 0 60px rgba(34,197,94,0.5)'}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 0 40px rgba(34,197,94,0.35)'}}>
              Start Free — No Credit Card <ArrowRight size={16}/>
            </Link>
            <a href="#community" style={{ color:'#64748b',fontWeight:700,fontSize:16,padding:'16px 32px',borderRadius:16,border:'1px solid rgba(255,255,255,0.1)',textDecoration:'none',display:'flex',alignItems:'center',gap:8,backgroundColor:'rgba(255,255,255,0.03)',transition:'all 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'}} onMouseLeave={e=>{e.currentTarget.style.color='#64748b';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
              <MessageCircle size={15}/> See Community
            </a>
          </div>

          <div>
            <p style={{ color:'#1e3a4a',fontSize:11,fontWeight:700,letterSpacing:4,textTransform:'uppercase',marginBottom:20 }}>Questions from engineers at</p>
            <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:12 }}>
              {Object.entries(LOGOS).map(([name, Logo]) => (
                <div key={name} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:6 }}>
                  <div style={{ width:56,height:56,borderRadius:15,backgroundColor:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',padding:7,overflow:'hidden',transition:'all 0.25s',cursor:'default' }}
                    onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.14) translateY(-3px)';e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.backgroundColor='rgba(255,255,255,0.1)'}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.backgroundColor='rgba(255,255,255,0.04)'}}>
                    <Logo/>
                  </div>
                  <span style={{ color:'#1e3a4a',fontSize:10,fontWeight:600 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────── */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',backgroundColor:'rgba(255,255,255,0.015)',padding:'44px 6%' }}>
        <div style={{ maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:8 }}>
          {[
            {icon:Users,    value:10000,suffix:'+', label:'Students Community', color:'#22c55e'},
            {icon:Code2,    value:500,  suffix:'+', label:'DSA Problems',       color:'#06b6d4'},
            {icon:MessageCircle, value:2000, suffix:'+', label:'Discussions',  color:'#10b981'},
            {icon:Award,    value:4.9,  suffix:'★', label:'Student Rating',    color:'#f59e0b'},
          ].map(({icon:Icon,value,suffix,label,color})=>(
            <div key={label} style={{ textAlign:'center',padding:'16px 12px' }}>
              <Icon size={20} style={{ color,margin:'0 auto 10px',display:'block' }}/>
              <div style={{ fontSize:36,fontWeight:900,color:'#fff',letterSpacing:'-1px',lineHeight:1 }}><Counter end={value} suffix={suffix}/></div>
              <div style={{ color:'#334155',fontSize:13,fontWeight:500,marginTop:6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMMUNITY SECTION ───────────────────────────── */}
      <section id="community" style={{ padding:'96px 6%',backgroundColor:'#020810',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(16,185,129,0.07),transparent 60%)',pointerEvents:'none' }}/>
        <div style={{ maxWidth:1100,margin:'0 auto',position:'relative',zIndex:1 }}>
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <p style={{ color:'#10b981',fontSize:11,fontWeight:800,letterSpacing:4,textTransform:'uppercase',marginBottom:14 }}>Built for Students</p>
            <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4vw,3.5rem)',letterSpacing:'-1.5px',lineHeight:1.1,margin:'0 0 14px' }}>
              You're not alone<br/><span style={{color:'#10b981'}}>in this journey</span>
            </h2>
            <p style={{ color:'#334155',fontSize:16,maxWidth:520,margin:'0 auto' }}>
              A community of students who've walked the same path — discussing, sharing, and helping each other crack their dream companies.
            </p>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:16,marginBottom:20 }}>

            {/* Discussion card */}
            <div style={{ background:'linear-gradient(135deg,rgba(16,185,129,0.06),rgba(6,182,212,0.06))',border:'1px solid rgba(16,185,129,0.2)',borderRadius:20,padding:28 }}>
              <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:18 }}>
                <div style={{ width:44,height:44,borderRadius:14,background:'rgba(16,185,129,0.15)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <MessageCircle size={22} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:16,color:'#fff' }}>Community Discussions</div>
                  <div style={{ fontSize:12,color:'#6b7280' }}>Free for all members</div>
                </div>
              </div>
              <p style={{ fontSize:13,color:'#9ca3af',lineHeight:1.7,marginBottom:16 }}>
                Real interview experiences from students who just went through the process. Ask about DSA, interview tips, company patterns, salary negotiation — anything.
              </p>
              {/* Sample discussion preview */}
              <div style={{ background:'rgba(0,0,0,0.3)',borderRadius:12,padding:'12px 14px',marginBottom:8 }}>
                <div style={{ fontSize:11,color:'#10b981',fontWeight:700,marginBottom:4 }}>Adi · Walmart → SDE1</div>
                <div style={{ fontSize:12,color:'#d1d5db',lineHeight:1.6 }}>"How I designed a URL shortener in my Walmart HLD round — here's what worked..."</div>
                <div style={{ fontSize:11,color:'#4b5563',marginTop:6 }}>47 helpful votes · 12 comments</div>
              </div>
              <div style={{ background:'rgba(0,0,0,0.3)',borderRadius:12,padding:'12px 14px' }}>
                <div style={{ fontSize:11,color:'#60a5fa',fontWeight:700,marginBottom:4 }}>Priya · Zoho interview</div>
                <div style={{ fontSize:12,color:'#d1d5db',lineHeight:1.6 }}>"Why O(n log n) vs O(n²) actually matters — the mental model that clicked for me"</div>
                <div style={{ fontSize:11,color:'#4b5563',marginTop:6 }}>63 helpful votes · 19 comments</div>
              </div>
            </div>

            {/* Mentor card */}
            <div style={{ background:'linear-gradient(135deg,rgba(245,158,11,0.06),rgba(251,191,36,0.04))',border:'1px solid rgba(245,158,11,0.2)',borderRadius:20,padding:28 }}>
              <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:18 }}>
                <div style={{ width:44,height:44,borderRadius:14,background:'rgba(245,158,11,0.15)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <UserCheck size={22} color="#f59e0b" />
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:16,color:'#fff' }}>1-on-1 Student Guide</div>
                  <div style={{ fontSize:12,color:'#f59e0b',fontWeight:700 }}>Pro members only</div>
                </div>
              </div>

              {/* Mentor profile */}
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:14,background:'rgba(0,0,0,0.3)',borderRadius:12,padding:'12px 14px' }}>
                <div style={{ width:42,height:42,borderRadius:'50%',background:'#0f766e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:'#fff',flexShrink:0,border:'2px solid rgba(16,185,129,0.4)' }}>SK</div>
                <div>
                  <div style={{ fontWeight:800,fontSize:14,color:'#fff' }}>Sanjeev s</div>
                  <div style={{ fontSize:12,color:'#10b981' }}>SDE Explorer · Freelancer ·Intrusted in Building Saas product</div>
                  <div style={{ display:'flex',gap:6,marginTop:4 }}>
                    <span style={{ fontSize:10,padding:'2px 8px',borderRadius:20,background:'rgba(16,185,129,0.15)',color:'#10b981',fontWeight:700 }}>English</span>
                    <span style={{ fontSize:10,padding:'2px 8px',borderRadius:20,background:'rgba(16,185,129,0.15)',color:'#10b981',fontWeight:700 }}>தமிழ்</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize:13,color:'#9ca3af',lineHeight:1.7,marginBottom:14 }}>
                A fellow student who has deeply explored the SDE world — researched interview patterns, career paths, and what actually works. Ask anything in English or Tamil.
              </p>

              <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                {MENTOR_TOPICS.slice(0,3).map(({ q, icon }) => (
                  <div key={q} style={{ display:'flex',alignItems:'center',gap:8,background:'rgba(0,0,0,0.3)',borderRadius:10,padding:'7px 10px',fontSize:12,color:'#d1d5db' }}>
                    <span style={{ fontSize:14 }}>{icon}</span>{q}
                  </div>
                ))}
                <div style={{ fontSize:11,color:'#4b5563',textAlign:'center',marginTop:2 }}>+3 more topics · WhatsApp access for Pro members</div>
              </div>
            </div>

            {/* Senior SDE talks card */}
            <div style={{ background:'linear-gradient(135deg,rgba(168,85,247,0.06),rgba(59,130,246,0.06))',border:'1px solid rgba(168,85,247,0.2)',borderRadius:20,padding:28 }}>
              <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:18 }}>
                <div style={{ width:44,height:44,borderRadius:14,background:'rgba(168,85,247,0.15)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <Sparkles size={22} color="#a855f7" />
                </div>
                <div>
                  <div style={{ fontWeight:800,fontSize:16,color:'#fff' }}>Senior SDE Insights</div>
                  <div style={{ fontSize:12,color:'#6b7280' }}>From the discussion board</div>
                </div>
              </div>
              <p style={{ fontSize:13,color:'#9ca3af',lineHeight:1.7,marginBottom:16 }}>
                Senior engineers from Google, Amazon, Microsoft drop by to share insights on what they look for in candidates, how teams actually work, and career growth tips.
              </p>
              {[
                { q: 'Will AI replace SDEs? A Google engineer answers', votes: 89 },
                { q: 'What startups actually look for vs product companies', votes: 76 },
                { q: 'How I went from TCS to Amazon in 18 months', votes: 134 },
              ].map(({ q, votes }) => (
                <div key={q} style={{ display:'flex',alignItems:'flex-start',gap:8,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width:4,height:4,borderRadius:'50%',background:'#a855f7',marginTop:7,flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12,color:'#d1d5db',lineHeight:1.5 }}>{q}</div>
                    <div style={{ fontSize:11,color:'#4b5563',marginTop:2 }}>{votes} helpful</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:'center',marginTop:32 }}>
            <Link to="/signup" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',color:'#10b981',fontWeight:700,fontSize:14,padding:'12px 28px',borderRadius:14,textDecoration:'none',transition:'all 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.background='rgba(16,185,129,0.15)'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(16,185,129,0.1)'}}>
              Join the community — it's free <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPANIES ───────────────────────────────────── */}
      <section id="companies" style={{ padding:'96px 6%',backgroundColor:'#020408',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,opacity:0.02,backgroundImage:'linear-gradient(rgba(34,197,94,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.5) 1px,transparent 1px)',backgroundSize:'50px 50px',pointerEvents:'none' }}/>
        <div style={{ maxWidth:1100,margin:'0 auto',position:'relative',zIndex:1 }}>
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <p style={{ color:'#22c55e',fontSize:11,fontWeight:800,letterSpacing:4,textTransform:'uppercase',marginBottom:14 }}>10 Companies</p>
            <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4vw,3.5rem)',letterSpacing:'-1.5px',lineHeight:1.1,margin:'0 0 14px' }}>Prep for the companies<br/><span style={{color:'#22c55e'}}>everyone wants to crack</span></h2>
            <p style={{ color:'#334155',fontSize:16,maxWidth:480,margin:'0 auto' }}>Real interview patterns. Round-by-round breakdown. Insider tips from students who cracked them.</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:12 }}>
            {COMPANIES.map(({name,pkg,rounds,accent})=>{
              const L = LOGOS[name]
              return (
                <div key={name} style={{ backgroundColor:'#0d1117',border:'1px solid rgba(255,255,255,0.06)',borderRadius:18,padding:'22px 16px',textAlign:'center',transition:'all 0.25s',cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=accent+'55';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.backgroundColor='#111827'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.backgroundColor='#0d1117'}}>
                  <div style={{ width:48,height:48,margin:'0 auto 14px',borderRadius:12,overflow:'hidden' }}>{L?<L/>:null}</div>
                  <p style={{ color:'#fff',fontWeight:800,fontSize:15,margin:'0 0 4px' }}>{name}</p>
                  <p style={{ color:'#22c55e',fontWeight:700,fontSize:12,margin:'0 0 2px' }}>{pkg}</p>
                  <p style={{ color:'#1e3a4a',fontSize:11 }}>{rounds}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section id="features" style={{ padding:'96px 6%' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <p style={{ color:'#a855f7',fontSize:11,fontWeight:800,letterSpacing:4,textTransform:'uppercase',marginBottom:14 }}>Complete Arsenal</p>
            <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4vw,3.5rem)',letterSpacing:'-1.5px',lineHeight:1.1,margin:'0 0 14px' }}>8 tools. 1 subscription.<br/><span style={{color:'#a855f7'}}>Everything you need.</span></h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14 }}>
            {FEATURES.map(({icon:Icon,color,glow,title,desc,tag})=>(
              <div key={title} style={{ backgroundColor:'#0d1117',border:'1px solid rgba(255,255,255,0.06)',borderRadius:20,padding:'28px',position:'relative',overflow:'hidden',transition:'all 0.3s',cursor:'default' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=color+'40';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.backgroundColor='#111827'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.backgroundColor='#0d1117'}}>
                <div style={{ position:'absolute',top:0,right:0,width:100,height:100,borderRadius:'50%',background:`radial-gradient(circle,${glow},transparent)`,filter:'blur(20px)',pointerEvents:'none' }}/>
                <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18,position:'relative' }}>
                  <div style={{ width:48,height:48,borderRadius:14,backgroundColor:color+'20',display:'flex',alignItems:'center',justifyContent:'center' }}><Icon size={22} style={{color}}/></div>
                  <span style={{ backgroundColor:color+'18',color,border:`1px solid ${color}30`,fontSize:10,fontWeight:800,padding:'4px 10px',borderRadius:100 }}>{tag}</span>
                </div>
                <h3 style={{ color:'#fff',fontWeight:800,fontSize:17,margin:'0 0 10px',position:'relative' }}>{title}</h3>
                <p style={{ color:'#475569',fontSize:13,lineHeight:1.7,margin:0,position:'relative' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section style={{ padding:'96px 6%',backgroundColor:'#020810' }}>
        <div style={{ maxWidth:860,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:6,backgroundColor:'rgba(251,191,36,0.08)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:100,padding:'6px 16px',marginBottom:18 }}>
              <Star size={12} fill="#fbbf24" color="#fbbf24"/><span style={{ color:'#fbbf24',fontSize:13,fontWeight:700 }}>Real Success Stories</span>
            </div>
            <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4vw,3.5rem)',letterSpacing:'-1.5px',lineHeight:1.1,margin:0 }}>Students who cracked<br/><span style={{color:'#22c55e'}}>their dream companies</span></h2>
          </div>

          <div style={{ background:'linear-gradient(135deg,rgba(13,27,13,0.9),rgba(10,15,26,0.9))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:24,padding:'36px',marginBottom:16,position:'relative',overflow:'hidden' }}>
            <div style={{ position:'absolute',top:0,right:0,width:180,height:180,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,197,94,0.07),transparent)',filter:'blur(30px)',pointerEvents:'none' }}/>
            <div style={{ display:'flex',gap:22,position:'relative' }}>
              <div style={{ flexShrink:0 }}>
                <div style={{ width:60,height:60,borderRadius:16,background:'linear-gradient(135deg,#22c55e,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:18,color:'#fff',marginBottom:10 }}>{T.avatar}</div>
                <div style={{ display:'flex',gap:2 }}>{[...Array(5)].map((_,i)=><Star key={i} size={12} fill="#fbbf24" color="#fbbf24"/>)}</div>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ color:'#cbd5e1',fontSize:17,lineHeight:1.75,margin:'0 0 22px',fontStyle:'italic' }}>"{T.text}"</p>
                <div style={{ display:'flex',alignItems:'center',gap:14,flexWrap:'wrap' }}>
                  <div>
                    <p style={{ color:'#fff',fontWeight:800,fontSize:16,margin:0 }}>{T.name}</p>
                    <p style={{ color:'#334155',fontSize:13,margin:0 }}>{T.role}</p>
                  </div>
                  <div style={{ display:'flex',alignItems:'center',gap:10,backgroundColor:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'8px 14px' }}>
                    <div style={{ width:26,height:26,borderRadius:8,overflow:'hidden' }}><TestiLogo/></div>
                    <span style={{ color:'#22c55e',fontWeight:900,fontSize:16 }}>{T.pkg}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
            {TESTIMONIALS.map((t,i)=>(
              <button key={i} onClick={()=>setActiveTesti(i)} style={{ display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:16,backgroundColor:activeTesti===i?'rgba(34,197,94,0.08)':'#0d1117',border:activeTesti===i?'1px solid rgba(34,197,94,0.3)':'1px solid rgba(255,255,255,0.06)',cursor:'pointer',transition:'all 0.2s',color:'inherit' }}>
                <div style={{ width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#22c55e,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:900,color:'#fff',flexShrink:0 }}>{t.avatar}</div>
                <div style={{ textAlign:'left' }}>
                  <p style={{ color:'#fff',fontWeight:700,fontSize:13,margin:0 }}>{t.name}</p>
                  <p style={{ color:'#1e3a4a',fontSize:11,margin:0 }}>{t.company} · {t.pkg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section id="pricing" style={{ padding:'96px 6%',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(34,197,94,0.06),transparent 60%)',pointerEvents:'none' }}/>
        <div style={{ maxWidth:860,margin:'0 auto',position:'relative',zIndex:1 }}>
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4vw,3.5rem)',letterSpacing:'-1.5px',lineHeight:1.1,margin:'0 0 14px' }}>One price.<br/><span style={{color:'#22c55e'}}>Your entire career.</span></h2>
            <p style={{ color:'#9ca3af',fontSize:17,marginBottom:8 }}>₹299/month. Less than a Swiggy order. Worth infinitely more.</p>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:100,padding:'6px 16px' }}>
              <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',display:'inline-block' }}/>
              <span style={{ fontSize:12,color:'#4ade80',fontWeight:700 }}>Special student pricing — limited time offer</span>
            </div>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20 }} className="pricing-grid">
            {/* Free */}
            <div style={{ backgroundColor:'#0d1117',border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,padding:36,display:'flex',flexDirection:'column' }}>
              <p style={{ color:'#1e3a4a',fontSize:11,fontWeight:800,letterSpacing:3,textTransform:'uppercase',margin:'0 0 20px' }}>Free Plan</p>
              <div style={{ marginBottom:32 }}>
                <span style={{ fontSize:64,fontWeight:900,color:'#fff',letterSpacing:'-3px' }}>₹0</span>
                <p style={{ color:'#1e3a4a',fontSize:13,margin:'4px 0 0' }}>Forever free · No card needed</p>
              </div>
              <ul style={{ listStyle:'none',padding:0,margin:'0 0 32px',flex:1 }}>
                {['25 DSA problems','3 mock interviews/month','Progress tracking','1 System Design problem','Community discussions'].map(f=>(
                  <li key={f} style={{ display:'flex',alignItems:'center',gap:12,padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',color:'#475569',fontSize:14 }}>
                    <CheckCircle size={15} color="#22c55e"/>{f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" style={{ display:'block',textAlign:'center',padding:'14px',borderRadius:14,border:'1px solid rgba(255,255,255,0.1)',backgroundColor:'rgba(255,255,255,0.03)',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none',transition:'all 0.2s' }} onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.03)'}>
                Start Free
              </Link>
            </div>

            {/* Pro */}
            <div style={{ background:'linear-gradient(160deg,#0a1f10,#071a22)',border:'2px solid rgba(34,197,94,0.45)',borderRadius:24,padding:36,display:'flex',flexDirection:'column',position:'relative',overflow:'hidden' }}>
              <div style={{ position:'absolute',top:0,right:0,width:140,height:140,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,197,94,0.12),transparent)',filter:'blur(20px)',pointerEvents:'none' }}/>
              <div style={{ position:'absolute',top:-1,left:'50%',transform:'translateX(-50%)' }}>
                <div style={{ background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'#fff',fontSize:11,fontWeight:900,padding:'5px 18px',borderRadius:'0 0 12px 12px',display:'flex',alignItems:'center',gap:5 }}><Crown size={11}/> MOST POPULAR</div>
              </div>
              <p style={{ color:'#4ade80',fontSize:11,fontWeight:800,letterSpacing:3,textTransform:'uppercase',margin:'16px 0 12px',position:'relative' }}>Pro Plan</p>
              <div style={{ marginBottom:24,position:'relative' }}>
                <div style={{ display:'flex',alignItems:'baseline',gap:10 }}>
                  <span style={{ fontSize:64,fontWeight:900,color:'#fff',letterSpacing:'-3px' }}>₹299</span>
                  <div>
                    <div style={{ fontSize:16,color:'#6b7280',textDecoration:'line-through' }}>₹499</div>
                    <div style={{ fontSize:12,color:'#4ade80',fontWeight:'700' }}>40% off </div>
                  </div>
                </div>
                <p style={{ color:'#334155',fontSize:12,margin:'4px 0 0' }}>Per month · Cancel anytime · No hidden fees</p>
                <p style={{ color:'#4b5563',fontSize:12,margin:'2px 0 0',fontStyle:'italic' }}>That's just ₹10/day — less than a chai ☕</p>
              </div>
              <ul style={{ listStyle:'none',padding:0,margin:'0 0 28px',flex:1,position:'relative' }}>
                {[
                  '500+ DSA problems (all companies)',
                  'Unlimited mock interviews',
                  'AI resume review & scoring',
                  'AI interview practice chat',
                  'All 10 company patterns',
                  '30 System Design problems (HLD+LLD)',
                  '1-on-1 student guide (WhatsApp)',
                  'Mentor support in English & தமிழ்',
                  'Priority community access',
                  'Cloud progress sync',
                ].map(f=>(
                  <li key={f} style={{ display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',color:'#e2e8f0',fontSize:13 }}>
                    <div style={{ width:18,height:18,borderRadius:'50%',backgroundColor:'rgba(34,197,94,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><CheckCircle size={10} color="#4ade80"/></div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" style={{ display:'block',textAlign:'center',padding:'15px',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'#fff',fontWeight:900,fontSize:15,borderRadius:14,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)',transition:'all 0.2s',position:'relative' }} onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.02)';e.currentTarget.style.boxShadow='0 0 50px rgba(34,197,94,0.5)'}} onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 0 30px rgba(34,197,94,0.3)'}}>
                Start Pro — ₹299/month
              </Link>
            </div>
          </div>

          {/* ROI strip */}
          <div style={{ marginTop:20,backgroundColor:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.12)',borderRadius:18,padding:'18px 28px' }}>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12,textAlign:'center' }}>
              {[
                { val:'₹299/mo', label:'Less than a Swiggy order 🍕' },
                { val:'₹10/day', label:'Less than a cup of chai ☕' },
                { val:'10–30 LPA', label:'Avg salary jump after placement' },
                { val:'1000x+', label:'Return on investment' },
              ].map(({ val, label }) => (
                <div key={val}>
                  <div style={{ fontSize:20,fontWeight:900,color:'#22c55e' }}>{val}</div>
                  <div style={{ fontSize:12,color:'#475569',marginTop:2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:'center',marginTop:16 }}>
            <Link to="/pricing" style={{ color:'#6b7280',fontSize:13,textDecoration:'none',borderBottom:'1px solid rgba(107,114,128,0.3)',paddingBottom:1,transition:'color .15s' }} onMouseEnter={e=>e.currentTarget.style.color='#9ca3af'} onMouseLeave={e=>e.currentTarget.style.color='#6b7280'}>
              See full plan comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ padding:'96px 6%',textAlign:'center',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(34,197,94,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div style={{ maxWidth:680,margin:'0 auto',position:'relative',zIndex:1 }}>
          <div style={{ width:80,height:80,borderRadius:24,background:'linear-gradient(135deg,rgba(34,197,94,0.2),rgba(6,182,212,0.2))',border:'1px solid rgba(34,197,94,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px' }}>
            <Zap size={36} color="#22c55e"/>
          </div>
          <h2 style={{ fontWeight:900,fontSize:'clamp(2rem,4vw,3.5rem)',letterSpacing:'-1.5px',lineHeight:1.1,margin:'0 0 16px' }}>Your dream company<br/><span style={{color:'#22c55e'}}>is one prep away.</span></h2>
          <p style={{ color:'#334155',fontSize:17,margin:'0 0 12px' }}>Join 10,000+ students who cracked Google, Amazon, Microsoft and more.</p>
          <p style={{ color:'#4b5563',fontSize:14,margin:'0 0 36px',fontStyle:'italic' }}>
            "The only thing standing between you and your offer letter is 90 days of focused preparation." — Every student who cracked it
          </p>
          <div style={{ display:'flex',justifyContent:'center',gap:10,marginBottom:36,flexWrap:'wrap' }}>
            {['Google','Amazon','Microsoft','Meta','Netflix'].map(c=>{
              const L=LOGOS[c]; return (
                <div key={c} style={{ display:'flex',alignItems:'center',gap:8,backgroundColor:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'8px 14px' }}>
                  <div style={{ width:22,height:22,borderRadius:6,overflow:'hidden' }}>{L&&<L/>}</div>
                  <span style={{ color:'#64748b',fontSize:13,fontWeight:600 }}>{c}</span>
                </div>
              )
            })}
          </div>
          <Link to="/signup" style={{ display:'inline-flex',alignItems:'center',gap:10,background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'#fff',fontWeight:900,fontSize:18,padding:'20px 48px',borderRadius:18,textDecoration:'none',boxShadow:'0 0 60px rgba(34,197,94,0.3)',transition:'all 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 0 80px rgba(34,197,94,0.5)'}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 0 60px rgba(34,197,94,0.3)'}}>
            Start Preparing for Free <ArrowRight size={20}/>
          </Link>
          <p style={{ color:'#1e293b',fontSize:13,marginTop:16 }}>Free forever · No credit card · Upgrade anytime</p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.05)',backgroundColor:'#020408',padding:'28px 6%' }}>
        <div style={{ maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:14 }}>
          <div style={{ display:'flex',alignItems:'center',gap:10 }}>
            <div style={{ width:32,height:32,borderRadius:10,background:'linear-gradient(135deg,#22c55e,#16a34a)',display:'flex',alignItems:'center',justifyContent:'center' }}><Zap size={16} color="white"/></div>
            <span style={{ fontWeight:900,fontSize:18,color:'#fff' }}>InterviewPrep<span style={{color:'#22c55e'}}>AI</span></span>
          </div>
          <p style={{ color:'#1e293b',fontSize:13 }}>2026 InterviewPrep AI · Built for Indian tech students</p>
          <div style={{ display:'flex',gap:16 }}>
            {[[Github,'#'],[Twitter,'#'],[Linkedin,'#']].map(([Icon,href],i)=>(
              <a key={i} href={href} style={{ color:'#1e293b',transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#475569'} onMouseLeave={e=>e.currentTarget.style.color='#1e293b'}><Icon size={18}/></a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes liveglow { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media(max-width:640px){ .pricing-grid{grid-template-columns:1fr !important} }
      `}</style>
    </div>
  )
}