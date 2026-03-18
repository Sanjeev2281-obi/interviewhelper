// MentorCard.jsx — drop this in src/components/
// Usage in DashboardPage: <MentorCard isPro={isPro} />

import { useState } from 'react'
import { Lock, MessageCircle, ChevronDown, ChevronUp, ExternalLink, Star, Briefcase, Globe } from 'lucide-react'

const MENTOR = {
  name: 'Sanjeev s',
  role: 'SDE',
  company: 'Current: Freelance · Building Saas products ',
  exp: '',
  avatar: 'S',
  avatarBg: '#0f766e',
  langs: ['English', 'தமிழ்'],
  whatsapp: '919361876105', // country code + number, no +
  topics: [
    { q: 'How do I learn DSA from scratch?', icon: '📐' },
    { q: 'How do I build strong coding logic?', icon: '🧠' },
    { q: 'What tech stack should I choose in 2024?', icon: '⚙️' },
    { q: 'Will AI replace Software Engineers?', icon: '🤖' },
    { q: 'How to crack product-based company interviews?', icon: '🎯' },
    { q: 'What does a day in SDE life look like?', icon: '💼' },
  ],
}

export default function MentorCard({ isPro }) {
  const [expanded, setExpanded] = useState(false)

  const waLink = `https://wa.me/${MENTOR.whatsapp}?text=Hi%20${encodeURIComponent(MENTOR.name)}%2C%20I%20found%20you%20on%20InterviewPrep%20AI.%20I%20have%20a%20question%20about%20my%20SDE%20preparation.`

  return (
    <div style={{ position: 'relative' }}>

      {/* ── Card content ───────────────────────────────── */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(16,185,129,0.25)',
          filter: isPro ? 'none' : 'blur(3px)',
          userSelect: isPro ? 'auto' : 'none',
          pointerEvents: isPro ? 'auto' : 'none',
          transition: 'filter .2s',
        }}
      >
        {/* Header badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.875rem' }}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            1-on-1 Mentor · Pro exclusive
          </span>
        </div>

        {/* Mentor info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: MENTOR.avatarBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 800, color: 'white', flexShrink: 0,
            border: '2px solid rgba(16,185,129,0.3)',
          }}>{MENTOR.avatar}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{MENTOR.name}</div>
            <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{MENTOR.role}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{MENTOR.exp}</div>
          </div>
        </div>

        {/* Language badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Globe size={11} color="#6b7280" />
          </div>
          {MENTOR.langs.map(lang => (
            <span key={lang} style={{
              padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
              background: 'rgba(16,185,129,0.1)', color: '#10b981',
              border: '1px solid rgba(16,185,129,0.2)',
            }}>{lang}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7, marginBottom: '1rem' }}>
           A fellow student who has deeply explored the SDE world — researched 50+ engineer journeys, interview patterns, and career paths so you don't have to figure it all out alone. Ask anything about DSA, building logic, picking the right stack, or whether AI will affect your future — in English or Tamil (தமிழில் பேசலாம்).
        </p>

        {/* Topic pills — expandable */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Ask me about
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(expanded ? MENTOR.topics : MENTOR.topics.slice(0, 3)).map(({ q, icon }) => (
              <div key={q} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#1f2937', borderRadius: 10, padding: '7px 10px',
                fontSize: 12, color: '#d1d5db',
              }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
          {MENTOR.topics.length > 3 && (
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
                color: '#6b7280', fontSize: 11, cursor: 'pointer', marginTop: 6, padding: 0,
              }}
            >
              {expanded ? <><ChevronUp size={13} /> Show less</> : <><ChevronDown size={13} /> +{MENTOR.topics.length - 3} more topics</>}
            </button>
          )}
        </div>

        {/* CTA button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#25D366', color: '#000', border: 'none',
            padding: '10px', borderRadius: 12, fontSize: 13, fontWeight: 800,
            textDecoration: 'none', transition: 'opacity .15s', width: '100%',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {/* WhatsApp SVG icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
          <ExternalLink size={12} />
        </a>

        <p style={{ fontSize: 10, color: '#4b5563', textAlign: 'center', marginTop: 6 }}>
          Responds within 24 hours · Free for Pro members
        </p>
      </div>

      {/* ── Pro lock overlay ─────────────────────────── */}
      {!isPro && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(8,13,20,0.7)',
          backdropFilter: 'blur(1px)',
          zIndex: 10,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
          }}>
            <Lock size={20} color="#fbbf24" />
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 4 }}>
            Pro feature
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginBottom: 14, maxWidth: 180, lineHeight: 1.6 }}>
            Upgrade to get 1-on-1 mentor access
          </div>
          <a
            href="/dashboard/pricing"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f59e0b', color: '#000', border: 'none',
              padding: '8px 20px', borderRadius: 10, fontSize: 12, fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            <Star size={12} fill="#000" /> Upgrade to Pro
          </a>
        </div>
      )}
    </div>
  )
}