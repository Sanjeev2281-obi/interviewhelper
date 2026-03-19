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
        name: 'Traversy Media',
        lang: 'English',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'Best for beginners — HTML, CSS, JS, React tutorials',
        playlists: [
          { label: 'HTML Crash Course', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
          { label: 'CSS Crash Course', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI' },
          { label: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
          { label: 'React Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
        ],
      },
      {
        name: 'Fireship',
        lang: 'English',
        avatar: 'FI', avatarBg: '#f97316',
        about: 'Fast, modern — React, JS concepts, web dev in 100 seconds',
        playlists: [
          { label: 'React in 100 Seconds', url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM' },
          { label: 'JavaScript in 100 Seconds', url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE' },
          { label: 'Channel', url: 'https://www.youtube.com/@Fireship' },
        ],
      },
      {
        name: 'Kevin Powell',
        lang: 'English',
        avatar: 'KP', avatarBg: '#7c3aed',
        about: 'Best for CSS — flexbox, grid, responsive design explained clearly',
        playlists: [
          { label: 'CSS Flexbox', url: 'https://www.youtube.com/watch?v=u044iM9xsWU' },
          { label: 'CSS Grid', url: 'https://www.youtube.com/watch?v=rg7Fvvl3taU' },
          { label: 'Channel', url: 'https://www.youtube.com/@KevinPowell' },
        ],
      },
      {
        name: 'EMC (Tamil)',
        lang: 'Tamil',
        avatar: 'EMC', avatarBg: '#dc2626',
        about: 'தமிழில் frontend basics — HTML, CSS, JavaScript',
        playlists: [
          { label: 'HTML Tamil', url: 'https://www.youtube.com/results?search_query=html+tamil+EMC' },
          { label: 'CSS Tamil', url: 'https://www.youtube.com/results?search_query=css+tamil+EMC' },
          { label: 'JavaScript Tamil', url: 'https://www.youtube.com/results?search_query=javascript+tamil+EMC' },
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
        name: 'Codevolution',
        lang: 'English',
        avatar: 'CV', avatarBg: '#0891b2',
        about: 'Most complete React course — hooks, context, Redux, React Query',
        playlists: [
          { label: 'React Tutorial (Full)', url: 'https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3' },
          { label: 'React Hooks', url: 'https://www.youtube.com/watch?v=cF2lQ_gZeA8&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A' },
          { label: 'Redux Toolkit', url: 'https://www.youtube.com/watch?v=0W6i5LYKCSI&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3' },
        ],
      },
      {
        name: 'Jack Herrington',
        lang: 'English',
        avatar: 'JH', avatarBg: '#0f766e',
        about: 'Advanced React — patterns, performance, custom hooks',
        playlists: [
          { label: 'React Hooks Deep Dive', url: 'https://www.youtube.com/watch?v=j8s01ThR7bQ' },
          { label: 'Channel', url: 'https://www.youtube.com/@jherr' },
        ],
      },
      {
        name: 'Code with Tamizha (Tamil)',
        lang: 'Tamil',
        avatar: 'CT', avatarBg: '#7c3aed',
        about: 'React தமிழில் — components, hooks, projects',
        playlists: [
          { label: 'React Tamil', url: 'https://www.youtube.com/results?search_query=react+tamil+code+with+tamizha' },
          { label: 'Channel', url: 'https://www.youtube.com/@codewithtamizha' },
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
        name: 'Amigoscode',
        lang: 'English',
        avatar: 'AC', avatarBg: '#0369a1',
        about: 'Best Spring Boot course — REST API, security, JPA, testing',
        playlists: [
          { label: 'Spring Boot Full Course', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U' },
          { label: 'Spring Security', url: 'https://www.youtube.com/watch?v=her_7pa0vrg' },
          { label: 'Channel', url: 'https://www.youtube.com/@amigoscode' },
        ],
      },
      {
        name: 'Daily Code Buffer',
        lang: 'English',
        avatar: 'DC', avatarBg: '#b45309',
        about: 'Spring Boot projects — microservices, JPA, real-world apps',
        playlists: [
          { label: 'Spring Boot + JPA', url: 'https://www.youtube.com/watch?v=SqifDPRDZBE' },
          { label: 'Spring Boot Microservices', url: 'https://www.youtube.com/watch?v=BLlEgtp2_i8' },
        ],
      },
      {
        name: 'EMC (Tamil)',
        lang: 'Tamil',
        avatar: 'EMC', avatarBg: '#dc2626',
        about: 'Java + Spring Boot தமிழில் — OOP, collections, REST API',
        playlists: [
          { label: 'Java Tamil Playlist', url: 'https://www.youtube.com/watch?v=IT2durkDCXM&list=PLvepBxfiuao2qCm6QgUay9LUAehVbGlOb' },
          { label: 'Spring Boot Tamil', url: 'https://www.youtube.com/results?search_query=spring+boot+tamil+EMC' },
        ],
      },
      {
        name: 'Java Brains',
        lang: 'English',
        avatar: 'JB', avatarBg: '#065f46',
        about: 'Deep Java concepts — Spring framework theory + practice',
        playlists: [
          { label: 'Spring Framework', url: 'https://www.youtube.com/watch?v=GB8k2-Egfv0&list=PLC97BDEFDCDD169D7' },
          { label: 'Channel', url: 'https://www.youtube.com/@Java.Brains' },
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
        name: 'Traversy Media',
        lang: 'English',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'Node.js + Express crash courses — REST APIs, auth, MongoDB',
        playlists: [
          { label: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
          { label: 'Express Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE' },
          { label: 'MERN Stack', url: 'https://www.youtube.com/watch?v=-0exw-9YJBo' },
        ],
      },
      {
        name: 'Codevolution',
        lang: 'English',
        avatar: 'CV', avatarBg: '#0891b2',
        about: 'Node.js in-depth — streams, buffers, event loop, Express REST',
        playlists: [
          { label: 'Node.js Tutorial', url: 'https://www.youtube.com/watch?v=LAUi8pPlcUM&list=PLC3y8-rFHvwh8shCMHFA5kWxD9PaPwxaY' },
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
        name: 'Tech With Tim',
        lang: 'English',
        avatar: 'TT', avatarBg: '#0f766e',
        about: 'Python from scratch — OOP, projects, Django, Flask',
        playlists: [
          { label: 'Python Beginner Course', url: 'https://www.youtube.com/watch?v=sxTmJE4k0ho' },
          { label: 'Django Tutorial', url: 'https://www.youtube.com/watch?v=sm1mokevMWE' },
          { label: 'Channel', url: 'https://www.youtube.com/@TechWithTim' },
        ],
      },
      {
        name: 'ArjanCodes',
        lang: 'English',
        avatar: 'AJ', avatarBg: '#7c3aed',
        about: 'FastAPI and clean Python architecture — advanced patterns',
        playlists: [
          { label: 'FastAPI Tutorial', url: 'https://www.youtube.com/watch?v=sBVb4IB3O_U' },
          { label: 'Channel', url: 'https://www.youtube.com/@ArjanCodes' },
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
        name: 'Bro Code',
        lang: 'English',
        avatar: 'BC', avatarBg: '#0369a1',
        about: 'MySQL full course — SELECT, JOINs, indexes, stored procedures',
        playlists: [
          { label: 'MySQL Full Course', url: 'https://www.youtube.com/watch?v=5OdVJbNCSso' },
          { label: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=c2M-rlkkT5o' },
        ],
      },
      {
        name: 'Traversy Media',
        lang: 'English',
        avatar: 'TM', avatarBg: '#1d4ed8',
        about: 'SQL and NoSQL — MySQL, PostgreSQL, MongoDB basics',
        playlists: [
          { label: 'SQL Crash Course', url: 'https://www.youtube.com/watch?v=9ylj9NR0Lcg' },
          { label: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=-56x56UppqQ' },
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