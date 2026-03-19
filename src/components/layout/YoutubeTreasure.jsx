import { useState } from 'react'
import { Play, ChevronDown, ChevronUp } from 'lucide-react'

const TAMIL_CHANNELS = [
  {
    name: 'EMC',
    avatar: 'EMC',
    avatarBg: '#dc2626',
    desc: 'Best Tamil Java — Loops',
    topics: ['java Playlist', 'For Loops', 'While Loops', 'Functions', 'Parameters'],
    links: [
      { label: ' Java Basics', url: 'https://www.youtube.com/watch?v=IT2durkDCXM&list=PLvepBxfiuao2qCm6QgUay9LUAehVbGlOb' },
      { label: 'Variables & Data Types', url: 'https://www.youtube.com/watch?v=SkKJDwpMdvA&t=191s' },
      { label: 'Class & objects', url: 'https://www.youtube.com/watch?v=z_QODD8oors' },
      { label: 'Functions', url: 'https://www.youtube.com/watch?v=wUzda_ge-Ak&t=211s' },
      { label: 'Parameters', url: 'https://www.youtube.com/watch?v=YCDkDF8EwFU&t=5s' },
      { label: 'If Else', url: 'https://www.youtube.com/watch?v=HG2C-vd5XLM' },
      { label: 'For Loops', url: 'https://www.youtube.com/watch?v=BtaIHsGv5dA' },
      { label: 'For each loop', url: 'https://www.youtube.com/watch?v=FsnNFDaf6d8' },
      { label: 'While Loops', url: 'https://www.youtube.com/watch?v=Bs2LH5_vSXE' },
      { label: 'Do while', url: 'https://www.youtube.com/watch?v=tWAaYONoyjc' },
      { label: 'Problems ', url: 'https://www.youtube.com/watch?v=UsioUNPkLsk&t=44s' }
    ],
  },
  {
    name: 'EMC 2.0',
    avatar: 'CT',
    avatarBg: '#7c3aed',
    desc: 'Problem solving and interview prep in Tamil',
    topics: ['Problem Solving', 'Interview Prep'],
    links: [
      { label: 'Arrays', url: 'https://www.youtube.com/watch?v=sMI4pXjQBRU' },
      { label: 'Channel', url: 'https://www.youtube.com/@CSTamizha' },
      { label: 'Channel', url: 'https://www.youtube.com/@CSTamizha' },
    ],
  },
  {
    name: 'CS Tamizha',
    avatar: 'CS',
    avatarBg: '#0369a1',
    desc: 'Data structures and algorithms in Tamil',
    topics: ['Arrays', 'Trees', 'Graphs', 'DP'],
    links: [
      { label: 'Channel', url: 'https://www.youtube.com/@CSTamizha' },
      { label: 'DSA', url: 'https://www.youtube.com/watch?v=93J3Y-dmP3I' },
      { label: 'BA DSA', url: 'https://www.youtube.com/watch?v=2bH09YEDdxE' },
    ],
  },
  {
    name: 'Tamil Coding',
    avatar: 'TC',
    avatarBg: '#0f766e',
    desc: 'Beginner-friendly coding tutorials in Tamil',
    topics: ['Arrays', 'Strings', 'Basics'],
    links: [
      { label: 'Channel', url: 'https://www.youtube.com/@tamilcoding' },
    ],
  },
]

const ENGLISH_CHANNELS = [
  {
    name: 'NeetCode',
    avatar: 'NC',
    avatarBg: '#2563eb',
    desc: 'Best structured DSA roadmap with clear code walkthroughs',
    topics: ['Arrays', 'Two Pointers', 'Sliding Window', 'Trees', 'DP', 'Graphs'],
    links: [
      { label: 'Java Intro', url: 'https://www.youtube.com/watch?v=bm0OyhwFDuY&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=1' },
      { label: 'Java setup', url: 'https://www.youtube.com/watch?v=WRISYpKhIrc&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=2' },
      { label: 'Java First code', url: 'https://www.youtube.com/watch?v=tSqNBjGacYk&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=3' },
        { label: 'Varibles', url: 'https://www.youtube.com/watch?v=9RCuKrze_-k&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=6' },
      { label: 'Data types', url: 'https://www.youtube.com/watch?v=Le25I331_yU&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=7' },
      { label: 'Type Conversion', url: 'https://www.youtube.com/watch?v=CPk8pffKV64&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=9' },
      { label: 'Arithmetic Operations', url: 'https://www.youtube.com/watch?v=flWjzwzgybI&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=10' },
      { label: 'Logical Operations', url: 'https://www.youtube.com/watch?v=TEJpeRI_NEo&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=13' },
      { label: 'Conditional Statements', url: 'https://www.youtube.com/watch?v=74Q7POjS7mQ&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=14' },
     { label: 'Else if', url: 'https://www.youtube.com/watch?v=Tn6BNLD0PmU&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=15' },
     { label: 'Ternary Operator', url: 'https://www.youtube.com/watch?v=kBdZBbWZ2a4&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=16' },
    { label: 'Switch Statement', url: 'https://www.youtube.com/watch?v=IrQKDdptiw8&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=17' },
    { label: 'JVM,JRE,JDK', url: 'https://www.youtube.com/watch?v=s7UgQ7_1KQY&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=26' }
],
  },
  {
    name: 'Telusko',
    avatar: 'TUF',
    avatarBg: '#0891b2',
    desc: "Striver's A-Z DSA sheet — most complete free course",
    topics: ['Strings'],
    links: [
        { label: 'Need for loop in java', url: 'https://www.youtube.com/watch?v=mh3sTmXWMLE&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=19' },
       { label: 'While loop', url: 'https://www.youtube.com/watch?v=mzt5tmV7wxI&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=20' },
       { label: 'Do while loop', url: 'https://www.youtube.com/watch?v=zzBVTwpfYr0&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=21' },
       { label: 'For loop', url: 'https://www.youtube.com/watch?v=gu6Agiy2xBg&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=22' },
       { label: 'which one to use', url: 'https://www.youtube.com/watch?v=uO5nSTJ9Iz4&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=23' },
       { label: 'class and objects', url: 'https://www.youtube.com/watch?v=Znmz_WxMxp4&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=24' },
       { label: 'class and objects pra', url: 'https://www.youtube.com/watch?v=3yOLNV9BF8A&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=25' },
       { label: 'Methods', url: 'https://www.youtube.com/watch?v=s7UgQ7_1KQY&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=26' },
       { label: 'Why we need Arrays', url: 'https://www.youtube.com/watch?v=uidBSlGLUK4&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=30' },
        { label: 'Arrays', url: 'https://www.youtube.com/watch?v=239ubH043lI&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=31' },
       { label: 'Multidimensional Arrays', url: 'https://www.youtube.com/watch?v=v4J2bEQF6jk&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=32 '},
       { label: 'Strings', url: 'https://www.youtube.com/watch?v=cV-sOpOgof8' },
      { label: 'Channel', url: 'https://www.youtube.com/@takeUforward' },
    ],
  },
  {
    name: 'Abdul Bari',
    avatar: 'AB',
    avatarBg: '#7c3aed',
    desc: 'Deep theoretical explanations — algorithms made simple',
    topics: ['Algorithms', 'Recursion', 'Sorting', 'DP'],
    links: [
        { label: 'JVM,JRE,,JDK', url: 'https://www.youtube.com/watch?v=s7UgQ7_1KQY&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&index=26' },
     
        { label: 'Algorithms Playlist', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
      { label: 'Channel', url: 'https://www.youtube.com/@abdul_bari' },
    ],
  },
  {
    name: 'Back To Back SWE',
    avatar: 'B2B',
    avatarBg: '#b45309',
    desc: 'Whiteboard-style interview problem walkthroughs',
    topics: ['Arrays', 'Strings', 'Trees', 'Dynamic Programming'],
    links: [
      { label: 'Channel', url: 'https://www.youtube.com/@BackToBackSWE' },
    ],
  },
]

function ChannelCard({ ch, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 12,
        cursor: 'pointer',
        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: isActive ? '1px solid ' + ch.avatarBg : '1px solid #1f2937',
        transition: 'all .15s',
        textAlign: 'left',
        width: '100%',
      }}
    >
      <div style={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: ch.avatarBg,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 800,
        color: 'white',
      }}>
        {ch.avatar}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'white',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {ch.name}
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>
          {ch.topics.length} topics
        </div>
      </div>
      <div style={{ fontSize: 10, color: '#4b5563' }}>
        {isActive ? '▲' : '▼'}
      </div>
    </button>
  )
}

function DetailPanel({ active }) {
  if (!active) return null
  return (
    <div style={{
      marginTop: 10,
      background: '#0a0f1a',
      borderLeft: '3px solid ' + active.avatarBg,
      borderRadius: '0 10px 10px 0',
      padding: '12px 14px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>
        {active.name}
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6, marginBottom: 10 }}>
        {active.desc}
      </div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
        {active.topics.map(function(t) {
          return (
            <span
              key={t}
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 20,
                background: active.avatarBg + '22',
                color: active.avatarBg,
                border: '1px solid ' + active.avatarBg + '45',
              }}
            >
              {t}
            </span>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {active.links.map(function(link) {
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 8,
                background: active.avatarBg + '20',
                border: '1px solid ' + active.avatarBg + '45',
                fontSize: 11,
                fontWeight: 700,
                color: active.avatarBg,
                textDecoration: 'none',
              }}
            >
              <Play size={10} />
              {link.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function YoutubeTreasure() {
  const [open, setOpen] = useState(false)
  const [activeTamil, setActiveTamil] = useState(null)
  const [activeEnglish, setActiveEnglish] = useState(null)

  function handleTamil(ch) {
    if (activeTamil && activeTamil.name === ch.name) {
      setActiveTamil(null)
    } else {
      setActiveTamil(ch)
      setActiveEnglish(null)
    }
  }

  function handleEnglish(ch) {
    if (activeEnglish && activeEnglish.name === ch.name) {
      setActiveEnglish(null)
    } else {
      setActiveEnglish(ch)
      setActiveTamil(null)
    }
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>

      <button
        onClick={function() { setOpen(!open) }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 18px',
          background: open ? 'rgba(239,68,68,0.07)' : '#111827',
          border: open ? '1px solid rgba(239,68,68,0.3)' : '1px solid #1f2937',
          borderRadius: open ? '14px 14px 0 0' : '14px',
          cursor: 'pointer',
          transition: 'all .2s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(239,68,68,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            📺
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>
              YouTube video treasure box
              <span style={{
                marginLeft: 8,
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 20,
                background: 'rgba(239,68,68,0.15)',
                color: '#f87171',
                border: '1px solid rgba(239,68,68,0.25)',
              }}>
                {TAMIL_CHANNELS.length + ENGLISH_CHANNELS.length} channels
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'white', marginTop: 1 }}>
              Every 10–15 minute video you watch today can move you closer to a ₹10–15 LPA future. 🚀
Don’t skip. Stay consistent. Your future self is watching. 💪

            </div>
          </div>
        </div>
        <div style={{ color: '#6b7280' }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div style={{
          border: '1px solid #1f2937',
          borderTop: 'none',
          borderRadius: '0 0 14px 14px',
          background: '#0d1117',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>

          <div style={{ padding: '1rem', borderRight: '1px solid #1f2937' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              paddingBottom: 10,
              borderBottom: '1px solid #1f2937',
            }}>
              <span style={{ fontSize: 15 }}>🇮🇳</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>தமிழ் videos</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{TAMIL_CHANNELS.length} channels</div>
              </div>
              <span style={{
                marginLeft: 'auto',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 20,
                background: 'rgba(239,68,68,0.12)',
                color: '#f87171',
                border: '1px solid rgba(239,68,68,0.2)',
              }}>
                Tamil
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {TAMIL_CHANNELS.map(function(ch) {
                return (
                  <ChannelCard
                    key={ch.name}
                    ch={ch}
                    isActive={activeTamil !== null && activeTamil.name === ch.name}
                    onClick={function() { handleTamil(ch) }}
                  />
                )
              })}
            </div>
            <DetailPanel active={activeTamil} />
          </div>

          <div style={{ padding: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              paddingBottom: 10,
              borderBottom: '1px solid #1f2937',
            }}>
              <span style={{ fontSize: 15 }}>🌐</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>English videos</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{ENGLISH_CHANNELS.length} channels</div>
              </div>
              <span style={{
                marginLeft: 'auto',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 20,
                background: 'rgba(59,130,246,0.12)',
                color: '#60a5fa',
                border: '1px solid rgba(59,130,246,0.2)',
              }}>
                English
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {ENGLISH_CHANNELS.map(function(ch) {
                return (
                  <ChannelCard
                    key={ch.name}
                    ch={ch}
                    isActive={activeEnglish !== null && activeEnglish.name === ch.name}
                    onClick={function() { handleEnglish(ch) }}
                  />
                )
              })}
            </div>
            <DetailPanel active={activeEnglish} />
          </div>

        </div>
      )}

    </div>
  )
}