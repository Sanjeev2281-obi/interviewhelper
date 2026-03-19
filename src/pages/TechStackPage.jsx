import { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, AlertTriangle, ArrowRight, Zap, Code2, Globe, Server, Layers, BookOpen, Target } from 'lucide-react'
import { Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
// ── Data ─────────────────────────────────────────────────────

const WARNING_STEPS = [
  {
    icon: '🧠',
    title: 'Step 1 — Learn basic programming first',
    subtitle: 'Before anything else',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    points: [
      'Variables, data types, conditions (if/else)',
      'Loops (for, while)',
      'Functions and recursion basics',
      'Arrays and strings manipulation',
      'Object-Oriented Programming (OOP) basics',
    ],
    warning: 'Do NOT touch React, Spring Boot, or any framework until you are comfortable writing 20+ basic programs from scratch.',
  },
  {
    icon: '⚔️',
    title: 'Step 2 — Master problem solving (DSA)',
    subtitle: 'This separates juniors from good engineers',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.25)',
    points: [
      'Arrays, strings, two pointers, sliding window',
      'Linked lists, stacks, queues',
      'Trees, graphs basics',
      'Solve 50–100 LeetCode problems',
      'Practice writing clean, readable code',
    ],
    warning: 'Students who jump to frameworks without DSA struggle in every interview. Interviewers test logic first, frameworks second.',
  },
  {
    icon: '🚀',
    title: 'Step 3 — NOW pick your stack',
    subtitle: 'Only after steps 1 and 2',
    color: '#4ade80',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    points: [
      'You have programming fundamentals locked in',
      'You can solve medium-level problems',
      'You understand OOP concepts',
      'You are ready to learn a framework',
    ],
    warning: null,
  },
]

const BACKEND_STACKS = [
  {
    id: 'java',
    lang: 'Java',
    framework: 'Spring Boot',
    icon: '☕',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.25)',
    tagline: 'Best for product companies & enterprise',
    bestFor: ['Zoho', 'Amazon', 'Flipkart', 'Walmart', 'TCS (senior roles)'],
    pros: [
      'Most asked in product-based company interviews',
      'Strong typing catches bugs early',
      'Spring Boot makes REST APIs very fast to build',
      'Huge job market in India',
      'Excellent for DSA — most solutions online in Java',
    ],
    cons: [
      'More verbose code (longer to write than Python)',
      'Slower to prototype compared to Node.js',
      'Spring Boot has a learning curve',
    ],
    roadmap: [
      'Java basics — OOP, Collections, Exception handling',
      'Build a simple REST API with Spring Boot',
      'Connect to MySQL/PostgreSQL with JPA',
      'Add JWT authentication',
      'Deploy to Railway or Render',
    ],
    timeToJob: '6–8 months',
    verdict: 'If your goal is a placement at a product-based company — this is your stack. Java + Spring Boot is the most battle-tested backend in India.',
  },
  {
    id: 'node',
    lang: 'JavaScript',
    framework: 'Node.js + Express',
    icon: '⚡',
    color: '#84cc16',
    bg: 'rgba(132,204,22,0.1)',
    border: 'rgba(132,204,22,0.25)',
    tagline: 'Best for startups, freelancing & full stack',
    bestFor: ['Startups', 'Freelancing', 'Full stack roles', 'Web agencies'],
    pros: [
      'Same language for frontend and backend (JavaScript)',
      'Very fast to build and prototype',
      'Huge npm ecosystem — libraries for everything',
      'Great for freelancing projects',
      'Easy to go full stack (React + Node)',
    ],
    cons: [
      'Callback hell in older codebases',
      'Weaker typing (though TypeScript fixes this)',
      'Less preferred in large enterprise/product companies for backend',
    ],
    roadmap: [
      'Node.js basics — modules, fs, http',
      'Express.js — routing, middleware',
      'Connect to MongoDB (Mongoose) or PostgreSQL',
      'Add JWT auth and validation',
      'Deploy to Railway or Vercel',
    ],
    timeToJob: '4–6 months',
    verdict: 'If you already know React or want full stack quickly — Node.js is the natural choice. Same language everywhere means faster learning.',
  },
  {
    id: 'python',
    lang: 'Python',
    framework: 'FastAPI / Django',
    icon: '🐍',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.25)',
    tagline: 'Best for AI/ML + data roles',
    bestFor: ['AI/ML startups', 'Data engineering', 'Research roles', 'Automation'],
    pros: [
      'Cleanest, most readable code',
      'FastAPI is blazing fast and modern',
      'Django has everything built-in (admin, auth, ORM)',
      'Massive AI/ML ecosystem (TensorFlow, PyTorch)',
      'Great for scripting and automation',
    ],
    cons: [
      'Slower than Java/Node for high-traffic APIs',
      'Less common in pure SDE placements in India',
      'Not ideal if your goal is only product company placement',
    ],
    roadmap: [
      'Python basics — OOP, file handling, decorators',
      'FastAPI — routes, Pydantic models, dependency injection',
      'Connect to PostgreSQL with SQLAlchemy',
      'Add authentication',
      'Deploy to Railway',
    ],
    timeToJob: '5–7 months',
    verdict: 'Choose this if you are interested in AI, data science, or automation. For pure SDE placement, learn Python after Java.',
  },
]

const FRONTEND_STACKS = [
  {
    id: 'react',
    name: 'React',
    type: 'Library',
    icon: '⚛️',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
    border: 'rgba(56,189,248,0.25)',
    tagline: 'Most popular, flexible, huge ecosystem',
    bestFor: ['Startups', 'Product companies', 'Freelancing', 'Full stack (MERN/Java + React)'],
    pros: [
      'Most in-demand frontend skill in India right now',
      'Huge community and job market',
      'Very flexible — use with any backend',
      'Component-based thinking carries to any framework',
      'Works with Vite for super fast development',
    ],
    cons: [
      'It is a library, not a full framework — need extra tools for routing, state',
      'Too many ways to do the same thing (can confuse beginners)',
      'Need to learn ecosystem: React Router, Redux/Zustand, etc.',
    ],
    roadmap: [
      'HTML + CSS basics (not optional)',
      'JavaScript fundamentals (DOM, fetch, promises)',
      'React basics — JSX, components, props, state',
      'Hooks — useState, useEffect, useContext',
      'React Router for navigation',
      'API calls with fetch/axios',
      'Deploy on Vercel',
    ],
    timeToLearn: '3–4 months',
    verdict: 'If you are just starting frontend or want the best job prospects — learn React. It is the clear winner in India for 2024–2025.',
  },
  {
    id: 'angular',
    name: 'Angular',
    type: 'Framework',
    icon: '🅰️',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.25)',
    tagline: 'Complete framework, loved by enterprises',
    bestFor: ['TCS', 'Infosys', 'Wipro', 'Large enterprise projects', 'Banking/finance IT'],
    pros: [
      'Complete framework — routing, forms, HTTP, state all built-in',
      'TypeScript by default — fewer runtime bugs',
      'Very structured — large teams work well with it',
      'Preferred by service-based companies (TCS, Infosys)',
      'Strong opinionated architecture',
    ],
    cons: [
      'Steeper learning curve than React',
      'More boilerplate code',
      'Overkill for small projects',
      'Less flexible — Angular way is the only way',
    ],
    roadmap: [
      'TypeScript basics (mandatory)',
      'Angular CLI and project structure',
      'Components, modules, templates',
      'Services and dependency injection',
      'RxJS observables for async',
      'Angular Router',
      'Deploy on Netlify or Render',
    ],
    timeToLearn: '4–5 months',
    verdict: 'Choose Angular if you are targeting service-based companies (TCS, Infosys) or enterprise IT roles. React gives more job options overall.',
  },
]

const FULL_STACK_COMBOS = [
  {
    name: 'MERN Stack',
    combo: 'MongoDB + Express + React + Node.js',
    icon: '⚡',
    color: '#4ade80',
    tag: 'Best for startups',
    desc: 'The most popular full stack combo for startups and freelancing. All JavaScript — one language end to end.',
    jobs: 'Startup SDE, Freelancer, Full Stack Developer',
  },
  {
    name: 'Java Full Stack',
    combo: 'React + Spring Boot + MySQL',
    icon: '☕',
    color: '#f97316',
    tag: 'Best for product companies',
    desc: 'What you are already building — and the right choice. Most product-based companies in India use this combo.',
    jobs: 'SDE at Zoho/Amazon/Flipkart, Backend Developer',
    highlight: true,
  },
  {
    name: 'Python Full Stack',
    combo: 'React + FastAPI/Django + PostgreSQL',
    icon: '🐍',
    color: '#60a5fa',
    tag: 'Best for AI/ML + web',
    desc: 'Great if you want to combine web development with machine learning or data science projects.',
    jobs: 'ML Engineer, Data Engineer, Backend Developer',
  },
  {
    name: 'Angular + Java',
    combo: 'Angular + Spring Boot + MySQL',
    icon: '🏢',
    color: '#c084fc',
    tag: 'Best for service companies',
    desc: 'The classic enterprise stack. TCS, Infosys, Wipro, and banking projects heavily use this combination.',
    jobs: 'TCS/Infosys SDE, Enterprise Developer',
  },
]

// ── Sub components ────────────────────────────────────────────

function RoadmapStep({ step, isLast }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: step.bg, border: '1px solid ' + step.border,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        }}>
          {step.icon}
        </div>
        {!isLast && (
          <div style={{ width: 2, flex: 1, background: '#1f2937', margin: '6px 0', minHeight: 24 }} />
        )}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 2 }}>
          {step.title}
        </div>
        <div style={{ fontSize: 12, color: step.color, fontWeight: 600, marginBottom: 8 }}>
          {step.subtitle}
        </div>
        <div style={{
          background: step.bg, border: '1px solid ' + step.border,
          borderRadius: 12, padding: '12px 14px',
        }}>
          {step.points.map(function(pt) {
            return (
              <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '3px 0' }}>
                <CheckCircle size={12} color={step.color} style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>{pt}</span>
              </div>
            )
          })}
          {step.warning && (
            <div style={{
              marginTop: 10, padding: '8px 10px', borderRadius: 8,
              background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'flex-start', gap: 7,
            }}>
              <AlertTriangle size={12} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 12, color: '#fbbf24', lineHeight: 1.6 }}>{step.warning}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StackCard({ stack, type }) {
  const [open, setOpen] = useState(false)
  const isBackend = type === 'backend'

  return (
    <div style={{
      background: '#111827',
      border: open ? '1px solid ' + stack.border : '1px solid #1f2937',
      borderRadius: 16, overflow: 'hidden', transition: 'border-color .2s',
    }}>
      <button
        onClick={function() { setOpen(!open) }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 18px', background: open ? stack.bg : 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background .2s',
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: stack.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0, border: '1px solid ' + stack.border,
        }}>
          {stack.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>
              {isBackend ? stack.lang : stack.name}
            </span>
            {isBackend ? (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                background: stack.bg, color: stack.color, border: '1px solid ' + stack.border,
              }}>
                {stack.framework}
              </span>
            ) : (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                background: 'rgba(255,255,255,0.07)', color: '#9ca3af',
              }}>
                {stack.type}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>{stack.tagline}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: '#4b5563' }}>
            {isBackend ? stack.timeToJob + ' to job' : stack.timeToLearn + ' to learn'}
          </span>
          <div style={{ color: '#4b5563' }}>
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </button>

      {open && (
        <div style={{ padding: '0 18px 18px', borderTop: '1px solid #1f2937' }}>

          {/* Best for */}
          <div style={{ marginTop: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 7 }}>
              Best for
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {stack.bestFor.map(function(b) {
                return (
                  <span key={b} style={{
                    fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                    background: stack.bg, color: stack.color, border: '1px solid ' + stack.border,
                  }}>
                    {b}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Pros and Cons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                Pros
              </div>
              {stack.pros.map(function(p) {
                return (
                  <div key={p} style={{ display: 'flex', gap: 6, padding: '3px 0' }}>
                    <span style={{ color: '#4ade80', fontSize: 12, flexShrink: 0 }}>+</span>
                    <span style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{p}</span>
                  </div>
                )
              })}
            </div>
            <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f87171', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                Cons
              </div>
              {stack.cons.map(function(c) {
                return (
                  <div key={c} style={{ display: 'flex', gap: 6, padding: '3px 0' }}>
                    <span style={{ color: '#f87171', fontSize: 12, flexShrink: 0 }}>–</span>
                    <span style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{c}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Roadmap */}
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
              Learning roadmap
            </div>
            {stack.roadmap.map(function(r, i) {
              return (
                <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '5px 0', borderBottom: i < stack.roadmap.length - 1 ? '1px solid #1f2937' : 'none' }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: stack.bg, color: stack.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{r}</span>
                </div>
              )
            })}
          </div>

          {/* Verdict */}
          <div style={{
            background: stack.bg, border: '1px solid ' + stack.border,
            borderRadius: 10, padding: '10px 14px',
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <Zap size={14} color={stack.color} style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: '#e5e7eb', lineHeight: 1.6, fontWeight: 600 }}>
              {stack.verdict}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function TechStackPage() {
  const [activeTab, setActiveTab] = useState('warning')

  const tabs = [
    { id: 'warning', label: 'Start here first', icon: '⚠️' },
    { id: 'backend',  label: 'Backend stacks',   icon: '🖥️' },
    { id: 'frontend', label: 'Frontend stacks',  icon: '🎨' },
    { id: 'combos',   label: 'Full stack combos', icon: '🔗' },
  ]

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: "'DM Sans','Inter',sans-serif" }}>

      {/* Hero */}
      <div style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1a2d 100%)',
        border: '1px solid rgba(96,165,250,0.2)', padding: '2rem', marginBottom: '2rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .05,
          backgroundImage: 'linear-gradient(rgba(96,165,250,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.4) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: 20, padding: '4px 12px' }}>
            <Layers size={12} color="#60a5fa" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '.08em' }}>Tech Stack Guide</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>
            Which stack should you choose?<br />
            <span style={{ color: '#60a5fa' }}>Honest answer — no confusion.</span>
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, maxWidth: 520, marginBottom: '1.25rem' }}>
            Java or Python? React or Angular? Node.js or Spring Boot? This guide cuts through the noise and tells you exactly what to learn, in what order, and why.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { n: '3', label: 'backend stacks' },
              { n: '2', label: 'frontend options' },
              { n: '4', label: 'full stack combos' },
              { n: '1', label: 'rule to follow first' },
            ].map(function(s) {
              return (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: '#4b5563' }}>{s.label}</div>
                </div>
              )
            })}
          </div>

<Link
  to="/dashboard/youtube"
  style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '10px 18px', borderRadius: 12,
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.25)',
    fontSize: 13, fontWeight: 700, color: '#f87171',
    textDecoration: 'none', transition: 'all .15s',
  }}
  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)' }}
  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
>
  <Youtube size={14} />
  YouTube Resources
</Link>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#0d1117', padding: 4, borderRadius: 14, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(function(tab) {
          return (
            <button
              key={tab.id}
              onClick={function() { setActiveTab(tab.id) }}
              style={{
                flex: 1, minWidth: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: activeTab === tab.id ? '#111827' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6b7280',
                fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
                boxShadow: activeTab === tab.id ? '0 0 0 1px #1f2937' : 'none',
                transition: 'all .15s',
              }}
            >
              <span style={{ fontSize: 14 }}>{tab.icon}</span>
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Tab: Start here first ─────────────────────────── */}
      {activeTab === 'warning' && (
        <div>
          <div style={{
            background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 14, padding: '1rem 1.25rem', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <AlertTriangle size={20} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#f87171', marginBottom: 4 }}>
                Do NOT jump straight into frameworks
              </div>
              <p style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.7 }}>
                The biggest mistake students make: they watch a React tutorial on day 1 before knowing what a variable is. Or they install Spring Boot before writing a single Java program. Frameworks become easy when your basics are strong. Without basics, they become a nightmare.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            {WARNING_STEPS.map(function(step, i) {
              return (
                <RoadmapStep
                  key={step.title}
                  step={step}
                  isLast={i === WARNING_STEPS.length - 1}
                />
              )
            })}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(96,165,250,0.06))',
            border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '1.25rem',
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 7 }}>
              <Target size={15} color="#4ade80" /> The honest timeline
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
              {[
                { phase: 'Month 1–2', task: 'Basic programming + OOP', color: '#f87171' },
                { phase: 'Month 3–4', task: 'DSA — arrays to trees', color: '#fbbf24' },
                { phase: 'Month 5–6', task: 'Pick stack + build projects', color: '#4ade80' },
                { phase: 'Month 7–8', task: 'Interview prep + apply', color: '#60a5fa' },
              ].map(function(t) {
                return (
                  <div key={t.phase} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: t.color, marginBottom: 4 }}>{t.phase}</div>
                    <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>{t.task}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Backend stacks ───────────────────────────── */}
      {activeTab === 'backend' && (
        <div>
          <div style={{
            background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)',
            borderLeft: '3px solid #60a5fa', borderRadius: '0 12px 12px 0',
            padding: '10px 14px', marginBottom: '1.25rem', fontSize: 13, color: '#93c5fd',
          }}>
            Backend = the brain of your app. It handles logic, databases, authentication, and API responses. Choose based on your goal, not trends.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BACKEND_STACKS.map(function(stack) {
              return <StackCard key={stack.id} stack={stack} type="backend" />
            })}
          </div>

          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 14, padding: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 10 }}>
              Quick decision guide
            </div>
            {[
              { goal: 'Want Zoho, Amazon, Flipkart placement', answer: 'Java + Spring Boot', color: '#f97316' },
              { goal: 'Want to freelance or join startups', answer: 'Node.js + Express', color: '#84cc16' },
              { goal: 'Interested in AI or data science', answer: 'Python + FastAPI', color: '#60a5fa' },
              { goal: 'Not sure yet', answer: 'Start with Java — most versatile for placements', color: '#c084fc' },
            ].map(function(d) {
              return (
                <div key={d.goal} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid #1f2937' }}>
                  <ArrowRight size={14} color={d.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, color: '#9ca3af' }}>{d.goal} </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: d.color }}>→ {d.answer}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Tab: Frontend stacks ──────────────────────────── */}
      {activeTab === 'frontend' && (
        <div>
          <div style={{
            background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)',
            borderLeft: '3px solid #a855f7', borderRadius: '0 12px 12px 0',
            padding: '10px 14px', marginBottom: '1.25rem', fontSize: 13, color: '#d8b4fe',
          }}>
            Frontend = what users see and interact with. Before touching React or Angular, learn HTML + CSS + JavaScript basics. That foundation is non-negotiable.
          </div>

          {/* Foundation warning */}
          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
              <BookOpen size={14} color="#fbbf24" /> Frontend foundation (learn these first)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {[
                { title: 'HTML', desc: 'Structure of every webpage', icon: '📄', time: '1 week' },
                { title: 'CSS', desc: 'Styling, flexbox, grid, responsive', icon: '🎨', time: '2 weeks' },
                { title: 'JavaScript', desc: 'DOM, events, fetch, async/await', icon: '⚡', time: '4–6 weeks' },
              ].map(function(f) {
                return (
                  <div key={f.title} style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{f.title}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{f.desc}</div>
                      <div style={{ fontSize: 10, color: '#fbbf24', marginTop: 4, fontWeight: 700 }}>{f.time}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FRONTEND_STACKS.map(function(stack) {
              return <StackCard key={stack.id} stack={stack} type="frontend" />
            })}
          </div>

          {/* React vs Angular summary */}
          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 14, padding: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 10 }}>React vs Angular — one-line summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 10, padding: '12px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', marginBottom: 6 }}>⚛️ React</div>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
                  A flexible library. You assemble your own toolkit. More jobs, more startups use it. Better for most students in 2024.
                </p>
              </div>
              <div style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '12px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#f87171', marginBottom: 6 }}>🅰️ Angular</div>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
                  A complete framework. Everything is built-in. Preferred by TCS, Infosys, and enterprise IT. More structured but steeper curve.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Full stack combos ────────────────────────── */}
      {activeTab === 'combos' && (
        <div>
          <div style={{
            background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)',
            borderLeft: '3px solid #22c55e', borderRadius: '0 12px 12px 0',
            padding: '10px 14px', marginBottom: '1.25rem', fontSize: 13, color: '#86efac',
          }}>
            A full stack developer builds both the frontend (what users see) and the backend (server + database). Here are the most used combinations in India.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 12, marginBottom: '1.5rem' }}>
            {FULL_STACK_COMBOS.map(function(combo) {
              return (
                <div
                  key={combo.name}
                  style={{
                    background: combo.highlight ? 'linear-gradient(135deg, rgba(249,115,22,0.07), rgba(249,115,22,0.03))' : '#111827',
                    border: combo.highlight ? '1px solid rgba(249,115,22,0.35)' : '1px solid #1f2937',
                    borderRadius: 16, padding: '1.25rem', position: 'relative',
                  }}
                >
                  {combo.highlight && (
                    <div style={{
                      position: 'absolute', top: -1, right: 16,
                      background: '#f97316', color: '#000', fontSize: 10, fontWeight: 800,
                      padding: '3px 10px', borderRadius: '0 0 8px 8px',
                    }}>
                     
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{combo.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{combo.name}</div>
                      <div style={{ fontSize: 11, color: combo.color, fontWeight: 600, marginTop: 1 }}>{combo.tag}</div>
                    </div>
                  </div>
                  <div style={{
                    background: '#0d1117', border: '1px solid #1f2937',
                    borderRadius: 8, padding: '7px 10px', marginBottom: 10,
                    fontSize: 12, color: '#60a5fa', fontFamily: 'monospace',
                  }}>
                    {combo.combo}
                  </div>
                  <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, marginBottom: 10 }}>
                    {combo.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Code2 size={12} color="#4b5563" />
                    <span style={{ fontSize: 12, color: '#4b5563' }}>{combo.jobs}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Final advice */}
          <div style={{
            background: 'linear-gradient(135deg, #0a0f1a, #0a1a0f)',
            border: '1px solid rgba(34,197,94,0.25)', borderRadius: 16, padding: '1.5rem',
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
              <Zap size={16} color="#4ade80" /> Final honest advice
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { point: 'You are already using React + Spring Boot + MySQL. That is the Java Full Stack combo. Stick with it.', color: '#4ade80', icon: '✅' },
                { point: 'Do not switch stacks every month. Every switch resets your clock.', color: '#fbbf24', icon: '⚠️' },
                { point: 'One complete project (login, CRUD, auth, deploy) beats ten half-finished tutorials.', color: '#60a5fa', icon: '🎯' },
                { point: 'Basics first. Always. A strong Java foundation makes Spring Boot easy. A weak one makes it painful.', color: '#f87171', icon: '🧠' },
              ].map(function(a) {
                return (
                  <div key={a.point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: '#111827', border: '1px solid #1f2937', borderRadius: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{a.icon}</span>
                    <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, fontWeight: 500 }}>{a.point}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}