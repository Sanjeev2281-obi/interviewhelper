import { ExternalLink, Play } from 'lucide-react'

const SECTIONS = [
  {
    id: 'frontend',
    title: 'Frontend',
    emoji: '🎨',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
    border: 'rgba(56,189,248,0.25)',
    desc: 'HTML, CSS, JavaScript, React, Angular',
    channels: [
      {
        name: 'EMC',
        lang: 'Tamil',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'Best for beginners — HTML, CSS, JS',
        playlists: [
          { label: 'HTML Crash Course', url: 'https://www.youtube.com/watch?v=FYErehuSuuw&t=2468s' },
          { label: 'CSS Crash Course', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI' },
          { label: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=poo0BXryffI&t=76s' },
          
        ],
      },
      {
        name: 'Programming with Mosh',
        lang: 'English',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'Best for beginners — HTML, CSS, JS',
        playlists: [
          { label: 'HTML Crash Course', url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU&t=1110s' },
          { label: 'CSS Crash Course', url: 'https://www.youtube.com/playlist?list=PL0Zuz27SZ-6Mx9fd9elt80G1bPcySmWit' },
          { label: 'JavaScript Crash Course', url: 'https://www.youtube.com/playlist?list=PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax' },
          
        ],
      },
    ],
  },
  {
    id: 'react',
    title: 'React',
    emoji: '⚛️',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.25)',
    desc: 'Components, hooks, state management, projects',
    channels: [
      {
        name: 'Code io',
        lang: 'TAMIL',
        avatar: 'CV', avatarBg: '#0891b2',
        about: 'Most complete React course — hooks, context, Redux, React Query',
        playlists: [
          { label: 'React Tutorial (Full)', url: 'https://www.youtube.com/playlist?list=PLhP5RsB7fhE0rPHU66lQltacKt9PeFYRt' },
        ],
      },
      
      {
        name: 'Ashutosh Pawar (Code Stoic)',
        lang: 'English',
        avatar: 'CT', avatarBg: '#7c3aed',
        about: 'React — components, hooks, projects',
        playlists: [
          { label: 'React js', url: 'https://www.youtube.com/playlist?list=PLSsAz5wf2lkK_ekd0J__44KG6QoXetZza' },
          
        ],
      },
    ],
  },
  {
    id: 'backend-java',
    title: 'Java & Spring Boot',
    emoji: '☕',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.25)',
    desc: 'Core Java, OOP, Spring Boot, REST APIs, JPA',
    channels: [
      {
        name: 'CONQUER VICTORY',
        lang: 'Tamil',
        avatar: 'AC', avatarBg: '#0369a1',
        about: 'Best Spring Boot course — REST API, security, JPA, testing',
        playlists: [
          { label: 'Spring Boot Full Course', url: 'https://www.youtube.com/watch?v=7d0c_CaHgEc' },
          
        ],
      },
      {
        name: 'Telusko',
        lang: 'English',
        avatar: 'DC', avatarBg: '#b45309',
        about: 'Spring Boot projects — microservices, JPA, real-world apps',
        playlists: [
          { label: 'Spring Boot', url: 'https://www.youtube.com/playlist?list=PLsyeobzWxl7qbKoSgR5ub6jolI8-ocxCF' },
          
        ],
      },
      {
        name: 'Agni Dev Hub',
        lang: 'English',
        avatar: 'DC', avatarBg: '#b45309',
        about: 'Spring Boot project — student course management system with REST APIs, JPA, security',
        playlists: [
          { label: 'Spring Boot', url: 'https://www.youtube.com/watch?v=BrYp1UWsAZg' },
          
        ],
      },
     
    ],
  },
  {
    id: 'backend-node',
    title: 'Node.js & Express',
    emoji: '⚡',
    color: '#84cc16',
    bg: 'rgba(132,204,22,0.1)',
    border: 'rgba(132,204,22,0.25)',
    desc: 'Node.js, Express, REST APIs, MongoDB',
    channels: [
      {
        name: 'Code io',
        lang: 'Tamil',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'Node.js + Express crash courses — REST APIs, auth, MongoDB',
        playlists: [
          { label: 'Node.js Crash Course', url: 'https://www.youtube.com/playlist?list=PLhP5RsB7fhE3efnHgCKm4ccEYyilUIFsB' },
        ],
      },
      {
        name: 'Codevolution',
        lang: 'English',
        avatar: 'CV', avatarBg: '#0891b2',
        about: 'Node.js in-depth — streams, buffers, event loop, Express REST',
        playlists: [
          { label: 'Node.js ', url: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwh8shCMHFA5kWxD9PaPwxaY' },
        ],
      },
    ],
  },
  {
    id: 'backend-python',
    title: 'Python & FastAPI',
    emoji: '🐍',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.25)',
    desc: 'Python basics, FastAPI, Django, REST APIs',
    channels: [
      {
        name: 'JVL Code',
        lang: 'Tamil',
        avatar: 'TT', avatarBg: '#0f766e',
        about: 'Python from scratch — OOP, projects, Django, Flask',
        playlists: [
          { label: 'Fast API', url: 'https://www.youtube.com/watch?v=41bRmKMb464' },
         
        ],
      },
      {
        name: 'Telusko',
        lang: 'English',
        avatar: 'AJ', avatarBg: '#7c3aed',
        about: 'FastAPI and clean Python architecture — advanced patterns',
        playlists: [
          { label: 'FastAPI Tutorial', url: 'https://www.youtube.com/playlist?list=PLsyeobzWxl7qF4ASwCZZDXor_Y0YJ3Qfc' },
         
        ],
      },
    ],
  },
  {
    id: 'database',
    title: 'Databases',
    emoji: '🗄️',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.25)',
    desc: 'MySQL, PostgreSQL, MongoDB — queries, joins, indexes',
    channels: [
      {
        name: 'Code io',
        lang: 'Tamil',
        avatar: 'BC', avatarBg: '#0369a1',
        about: 'MySQL full course — SELECT, JOINs, indexes, stored procedures',
        playlists: [
          { label: 'MySQL Full Course', url: 'https://www.youtube.com/watch?v=-6KHvE78Fv0'},
        
        ],
      },
      {
        name: 'Data Engineering',
        lang: 'English',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'SQL ',
        playlists: [
          { label: 'SQL Crash Course', url: 'https://www.youtube.com/watch?v=JtaOmwnR6AM&t=1063s'},
        ],
      },
    ],
  },
]

const LANG_BADGE = {
  English: { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
  Tamil:   { bg: 'rgba(239,68,68,0.12)',  color: '#f87171', border: 'rgba(239,68,68,0.25)'  },
}

function ChannelRow({ ch }) {
  const lb = LANG_BADGE[ch.lang] || LANG_BADGE.English
  return (
    <div style={{
      background: '#0d1117', border: '1px solid #1f2937',
      borderRadius: 12, padding: '1rem', marginBottom: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: ch.avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: 'white', flexShrink: 0,
        }}>
          {ch.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{ch.name}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
              background: lb.bg, color: lb.color, border: '1px solid ' + lb.border,
            }}>{ch.lang}</span>
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{ch.about}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {ch.playlists.map(function(pl) {
          return (
            <a
              key={pl.label}
              href={pl.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 8,
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                fontSize: 11, fontWeight: 700, color: '#f87171',
                textDecoration: 'none',
              }}
            >
              <Play size={10} />
              {pl.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function YoutubeResourcesPage() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: "'DM Sans','Inter',sans-serif" }}>

      {/* Hero */}
      <div style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0f1a, #1a0a0a)',
        border: '1px solid rgba(239,68,68,0.2)', padding: '2rem', marginBottom: '2rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(239,68,68,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,.5) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 20, padding: '4px 12px' }}>
            <Play size={12} color="#f87171" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '.08em' }}>YouTube Resources</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>
            Best YouTube channels for <span style={{ color: '#f87171' }}>every topic</span>
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, maxWidth: 500 }}>
            Handpicked channels for frontend, React, Java, Node.js, Python, and databases. Both English and Tamil — free to watch, no login needed.
          </p>
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map(function(section) {
        return (
          <div key={section.id} style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem',
              paddingBottom: '0.75rem', borderBottom: '1px solid #1f2937',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: section.bg,
                border: '1px solid ' + section.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>
                {section.emoji}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{section.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{section.desc}</div>
              </div>
              <span style={{
                marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '3px 10px',
                borderRadius: 20, background: section.bg, color: section.color,
                border: '1px solid ' + section.border,
              }}>
                {section.channels.length} channels
              </span>
            </div>

            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 14, padding: '1rem' }}>
              {section.channels.map(function(ch) {
                return <ChannelRow key={ch.name + section.id} ch={ch} />
              })}
            </div>
          </div>
        )
      })}

      {/* Bottom tip */}
      <div style={{
        background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: 14, padding: '1rem 1.25rem',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', marginBottom: 4 }}>How to use these resources</div>
          <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>
            Watch one video, then code along immediately. Watching without coding teaches you nothing. Pick one channel per topic and finish it — switching channels mid-way wastes time. Tamil channels are great for understanding concepts clearly in your mother tongue before diving into English resources.
          </p>
        </div>
      </div>

    </div>
  )
}