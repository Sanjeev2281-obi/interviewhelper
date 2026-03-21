import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Crown, Lock, ExternalLink, ChevronDown, ChevronUp, Code2, CheckCircle, AlertTriangle, Zap } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    free: true,
    title: 'Mini ATM System',
    subtitle: 'Simple Bank Management System',
    difficulty: 'Medium',
    icon: '🏧',
    color: '#4ade80',
    bg: 'rgba(34,197,94,0.12)',
    border: 'rgba(34,197,94,0.25)',
    tags: ['OOP', 'HashMap', 'Loops', 'Conditionals'],
    codeLink: 'https://www.onlinegdb.com/GLcOHz7c4',
    description: 'Build a bank account system where users can deposit, withdraw, and check balance using their account ID.',
    usecases: [
      'Find account by ID',
      'Deposit money into account',
      'Withdraw money (check if sufficient balance)',
      'Check current balance',
      'Handle invalid account ID gracefully',
      'Run menu in a loop until user exits',
    ],
    oopConcepts: ['Encapsulation (Account class holds data + methods)', 'HashMap for O(1) account lookup'],
    hiddenTwist: null,
    sampleInput: 'Enter account id:\n2\n\n1\n500\n\n3\n\n2\n200\n\n3\n\n4',
    sampleOutput: 'Hi Priya\n\n1. Deposit  2. Withdrawal  3. Check Balance  4. Exit\nChoice: 1\nEnter amount: 500\nAmount deposited successfully.\n\nChoice: 3\nBalance: 2000.0\n\nChoice: 2\nEnter amount: 200\nWithdrawal successful.\n\nChoice: 3\nBalance: 1800.0\n\nChoice: 4\nThank you!',
    constraints: [
      '1 ≤ Account ID ≤ 1000',
      'Balance must always be ≥ 0',
      'Withdrawal only allowed if sufficient balance exists',
    ],
  },
  {
    id: 2,
    free: false,
    title: 'Railway Reservation System',
    subtitle: 'Train Ticket Booking & Management',
    difficulty: 'Medium',
    icon: '🚆',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.12)',
    border: 'rgba(96,165,250,0.25)',
    tags: ['OOP', 'HashMap', 'ArrayList', 'State Management'],
    codeLink: 'https://www.onlinegdb.com/w9koBIg0lX',
    description: 'Build a train reservation system that manages trains, books tickets, handles cancellations, and tracks seat availability.',
    usecases: [
      'Add a new train with source, destination, and total seats',
      'Book a ticket for a passenger on a specific train',
      'Cancel an existing booking by passenger ID',
      'View the list of all active passengers',
      'Check train status — available seats remaining',
      'Handle edge cases: train not found, no seats available, passenger ID not found',
    ],
    oopConcepts: [
      'Train class encapsulates seat management logic',
      'Passenger class holds booking details',
      'HashMap<Integer, Train> and HashMap<Integer, Passenger> for lookups',
    ],
    hiddenTwist: null,
    sampleInput: '1 101 Chennai Bangalore 2\n2 1 Ram 101\n2 2 Ravi 101\n2 3 Ajay 101\n5 101\n3 1\n5 101\n4\n6',
    sampleOutput: 'Train added\nTicket booked : Id->Ticket Booked (Name: Ram)passengerId: 1\nTicket booked : Id->Ticket Booked (Name: Ravi)passengerId: 2\nNo available seats sry!\n-101(Chennai->Bangalore)Available seats: 0\npassenger removes Ram\n-101(Chennai->Bangalore)Available seats: 1\nTicket Booked (Name: Ravi)passengerId: 2',
    constraints: [
      '1 ≤ trainId ≤ 10^5',
      '1 ≤ passengerId ≤ 10^5',
      '1 ≤ totalSeats ≤ 1000',
      'Each train ID and passenger ID must be unique',
    ],
  },
  {
    id: 3,
    free: false,
    title: 'Student Management System',
    subtitle: 'CRUD Operations on Student Records',
    difficulty: 'Easy',
    icon: '🎓',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.12)',
    border: 'rgba(192,132,252,0.25)',
    tags: ['OOP', 'CRUD', 'HashMap', 'Validation'],
    codeLink: 'https://www.onlinegdb.com/w9koBIg0lX',
    description: 'Build a student records system supporting add, update, delete, and view operations — a classic CRUD implementation with proper validation.',
    usecases: [
      'Add a new student with ID, name, age, and course',
      'Update all details of an existing student',
      'Delete a student by ID',
      'View all students currently in the system',
      'Handle duplicate ID on add — reject with error',
      'Handle ID not found on update/delete — show error',
    ],
    oopConcepts: [
      'Student class with all fields and a toString() method',
      'LinkedHashMap to preserve insertion order during display',
    ],
    hiddenTwist: 'During update, if the new ID already exists in the system — it creates a duplicate. The system currently does NOT handle this edge case. Zoho interviewers check if you notice and fix this.',
    sampleInput: '1 101 Ram 20 CSE\n1 102 Priya 21 ECE\n4\n2 101 201 RamKumar 22 IT\n4\n3 102\n4\n5',
    sampleOutput: 'Student was Added\nStudent was Added\n\nStudent details:\nID: 101 | Name: Ram | Age: 20 | Course: CSE\nID: 102 | Name: Priya | Age: 21 | Course: ECE\n\nstudent was updated\n\nStudent details:\nID: 201 | Name: RamKumar | Age: 22 | Course: IT\nID: 102 | Name: Priya | Age: 21 | Course: ECE\n\nStudent was removed in DB\n\nStudent details:\nID: 201 | Name: RamKumar | Age: 22 | Course: IT',
    constraints: [
      '1 ≤ Student ID ≤ 10^5',
      '1 ≤ Age ≤ 100',
      'Student ID must be unique',
      'Name and Course must not be empty',
    ],
  },
  {
    id: 4,
    free: false,
    title: 'Task Management System',
    subtitle: 'Priority-based Task Organizer',
    difficulty: 'Medium',
    icon: '📝',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.12)',
    border: 'rgba(251,191,36,0.25)',
    tags: ['OOP', 'Enum', 'Date Validation', 'Grouping'],
    codeLink: 'https://www.onlinegdb.com/6rXYefEpl',
    description: 'Build a task manager that accepts tasks with priorities, validates due dates, and groups tasks by priority level for display.',
    usecases: [
      'Add a task with name, description, due date, priority, and categories',
      'Validate that task name and description are not empty',
      'Validate date format (dd-MM-yyyy) and reject past dates',
      'Default invalid priority to MEDIUM automatically',
      'View all tasks in a formatted list',
      'View tasks grouped by LOW, MEDIUM, and HIGH priority',
    ],
    oopConcepts: [
      'Task class with Enum for Priority (LOW, MEDIUM, HIGH)',
      'LocalDate for date parsing and validation',
      'Auto-incremented task ID',
      'Set<String> for unique categories per task',
    ],
    hiddenTwist: 'Tasks are NOT sorted by due date — they are only grouped by priority. Duplicate task names are allowed. There is no update or delete functionality. Zoho checks if you notice these limitations and discuss them.',
    sampleInput: '1\nTask1\nComplete assignment\n25-12-2026\nHIGH\nstudy,college\n\n1\nTask2\nGo to gym\n20-12-2026\nLOW\nhealth\n\n2\n\n3\n\n4',
    sampleOutput: 'Task was Added....\nTask was Added....\n\nTask ID:1||Task Name:Task1||Task Description:Complete assignment||DueDate:25-12-2026||Priority:HIGH||categories:study,college\nTask ID:2||Task Name:Task2||Task Description:Go to gym||DueDate:20-12-2026||Priority:LOW||categories:health\n\n-----LOW priority List ------\nTask ID:2||Task Name:Task2...\n\n-----MEDIUM priority List ------\nMEDIUM was Empty\n\n-----HIGH priority List ------\nTask ID:1||Task Name:Task1...',
    constraints: [
      '1 ≤ Task ID ≤ 10^5 (auto-generated)',
      'Task name and description must not be empty',
      'Due date must be in dd-MM-yyyy format',
      'Due date must be a future date',
    ],
  },
  {
    id: 5,
    free: false,
    title: 'Taxi Booking System',
    subtitle: 'Smart Taxi Allocation with Fare Calculation',
    difficulty: 'Hard',
    icon: '🚕',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.25)',
    tags: ['OOP', 'Greedy', 'Sorting', 'Distance Logic'],
    codeLink: 'https://www.onlinegdb.com/0iohKm5wq',
    description: 'Build a taxi dispatch system that allocates the best available taxi to each customer using distance and earnings-based rules, calculates fares, and tracks booking history.',
    usecases: [
      'Initialize N taxis — all starting at location A with 0 earnings',
      'Accept booking requests with customer ID, pickup, drop, and pickup time',
      'Find all taxis that are free at the requested pickup time',
      'Allocate taxi with minimum travel distance to pickup point',
      'Break ties using earnings (lower earnings = higher priority)',
      'Calculate fare: base ₹100 + (distance - 5) × 10',
      'Display complete booking history and total earnings per taxi',
    ],
    oopConcepts: [
      'Taxi class with location, earnings, freeTime, and bookingList',
      'Booking class with all trip details',
      'Comparator for sorting taxis by distance then earnings',
      'Distance = |charA - charB| (character arithmetic)',
    ],
    hiddenTwist: 'If multiple taxis have the same distance AND the same earnings — select the first taxi in the list (by ID). This is the most common reason students fail this problem.',
    sampleInput: '4\n1 A B 9\n2 B D 9\n3 B C 12',
    sampleOutput: 'Taxi: 1 is allocated...\nTaxi: 2 is allocated...\nTaxi: 1 is allocated...\n\nTaxi-1 Total Earning -200\n1  1  A  B  9  10\n3  3  B  C  12  13\n\nTaxi-2 Total Earning -250\n2  2  B  D  9  11\n\nTaxi-3 Total Earning -0\nTaxi-4 Total Earning -0',
    constraints: [
      '1 ≤ number of taxis ≤ 100',
      'Locations are uppercase letters A–Z',
      '0 ≤ pickupTime ≤ 24',
      'Each taxi handles one booking at a time',
      'Taxi becomes free only after the current ride completes',
    ],
  },
]

const DIFF_STYLE = {
  Easy:   { bg: 'rgba(34,197,94,0.12)',  color: '#4ade80',  border: 'rgba(34,197,94,0.25)'  },
  Medium: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24',  border: 'rgba(251,191,36,0.25)' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',  color: '#f87171',  border: 'rgba(239,68,68,0.25)'  },
}

function ProjectCard({ p, isPro }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('usecases')
  const ds = DIFF_STYLE[p.difficulty]
  const locked = !p.free && !isPro

  return (
    <div style={{
      background: '#111827',
      border: open
        ? '1px solid ' + p.border
        : locked
        ? '1px solid rgba(234,179,8,0.15)'
        : '1px solid #1f2937',
      borderRadius: 16, overflow: 'hidden', transition: 'border-color .2s',
      position: 'relative',
    }}>

      {/* Header button */}
      <button
        onClick={function() { if (!locked) setOpen(!open) }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px',
          background: open ? p.bg : 'transparent',
          border: 'none', cursor: locked ? 'default' : 'pointer',
          textAlign: 'left', transition: 'background .2s',
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12, background: p.bg,
          border: '1px solid ' + p.border, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>
          {p.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{p.title}</span>
            {p.free && (
              <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20, background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>
                FREE
              </span>
            )}
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: ds.bg, color: ds.color, border: '1px solid ' + ds.border }}>
              {p.difficulty}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{p.subtitle}</div>
          <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
            {p.tags.map(function(t) {
              return (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 20, background: '#1f2937', color: '#9ca3af' }}>
                  {t}
                </span>
              )
            })}
          </div>
        </div>

        {locked ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <Lock size={13} color="#facc15" />
            <span style={{ fontSize: 11, color: '#facc15', fontWeight: 700 }}>Pro</span>
          </div>
        ) : (
          <div style={{ color: '#4b5563', flexShrink: 0 }}>
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        )}
      </button>

      {/* Expanded content */}
      {open && !locked && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid #1f2937' }}>

          {/* Description */}
          <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, margin: '12px 0' }}>
            {p.description}
          </p>

          {/* Inner tabs */}
          <div style={{ display: 'flex', gap: 4, background: '#0d1117', padding: 4, borderRadius: 10, marginBottom: 12 }}>
            {[
              { id: 'usecases', label: 'Use Cases' },
              { id: 'oop', label: 'OOP Concepts' },
              { id: 'io', label: 'Input / Output' },
              { id: 'constraints', label: 'Constraints' },
            ].map(function(t) {
              return (
                <button
                  key={t.id}
                  onClick={function() { setTab(t.id) }}
                  style={{
                    flex: 1, padding: '6px 8px', borderRadius: 7, border: 'none',
                    cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    background: tab === t.id ? '#1f2937' : 'transparent',
                    color: tab === t.id ? 'white' : '#6b7280',
                    transition: 'all .15s',
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>

          {/* Use Cases */}
          {tab === 'usecases' && (
            <div style={{ background: p.bg, border: '1px solid ' + p.border, borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                6 Use Cases — what Zoho expects you to implement
              </div>
              {p.usecases.map(function(uc, i) {
                return (
                  <div key={uc} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '5px 0', borderBottom: i < p.usecases.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: p.color + '25', color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>{uc}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* OOP Concepts */}
          {tab === 'oop' && (
            <div>
              <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                  OOP & DSA concepts used
                </div>
                {p.oopConcepts.map(function(oc) {
                  return (
                    <div key={oc} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                      <Code2 size={12} color="#c084fc" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>{oc}</span>
                    </div>
                  )
                })}
              </div>
              {p.hiddenTwist && (
                <div style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10 }}>
                  <AlertTriangle size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', marginBottom: 5 }}>Zoho Hidden Twist — many students miss this</div>
                    <p style={{ fontSize: 12, color: '#fde68a', lineHeight: 1.6 }}>{p.hiddenTwist}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input / Output */}
          {tab === 'io' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                  Sample Input
                </div>
                <pre style={{ fontSize: 11, color: '#4ade80', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>
                  {p.sampleInput}
                </pre>
              </div>
              <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                  Sample Output
                </div>
                <pre style={{ fontSize: 11, color: '#60a5fa', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>
                  {p.sampleOutput}
                </pre>
              </div>
            </div>
          )}

          {/* Constraints */}
          {tab === 'constraints' && (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                Constraints
              </div>
              {p.constraints.map(function(c) {
                return (
                  <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                    <span style={{ color: '#f87171', fontSize: 12, flexShrink: 0, marginTop: 1 }}>⚠</span>
                    <span style={{ fontSize: 12, color: '#fca5a5', lineHeight: 1.5 }}>{c}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Code link */}
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <a
              href={p.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 10,
                background: p.bg, border: '1px solid ' + p.border,
                fontSize: 12, fontWeight: 700, color: p.color, textDecoration: 'none',
              }}
            >
              <ExternalLink size={12} />
              View Java Solution
            </a>
            <Link
              to="/dashboard/problems"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 10,
                background: '#1f2937', border: '1px solid #374151',
                fontSize: 12, fontWeight: 700, color: '#9ca3af', textDecoration: 'none',
              }}
            >
              <Code2 size={12} />
              Practice DSA Problems
            </Link>
          </div>
        </div>
      )}

      {/* Pro lock overlay */}
      {locked && (
        <div style={{
          padding: '10px 16px 14px',
          borderTop: '1px solid rgba(234,179,8,0.1)',
          background: 'rgba(234,179,8,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 8,
        }}>
          <span style={{ fontSize: 12, color: '#78716c' }}>Unlock solution + use cases + OOP breakdown</span>
          <Link
            to="/dashboard/pricing"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 14px', borderRadius: 8,
              background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)',
              fontSize: 11, fontWeight: 700, color: '#facc15', textDecoration: 'none',
            }}
          >
            <Crown size={11} /> Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  )
}

export default function ZohoRound3Card({ isPro }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#111827', border: '1px solid rgba(239,68,68,0.2)' }}>

      {/* Card header */}
      <button
        onClick={function() { setExpanded(!expanded) }}
        className="w-full text-left"
        style={{ padding: '1.25rem', background: expanded ? 'rgba(239,68,68,0.05)' : 'transparent', border: 'none', cursor: 'pointer', transition: 'background .2s' }}
      >
        <div className="flex items-start gap-3">
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            🏢
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-white font-extrabold text-sm">Zoho Round 3 — Mini Projects</span>
              <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20, background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}>
                FREQUENTLY ASKED
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Round 3 tests OOP + LLD with mini projects having 6–7 use cases. Many students crack rounds 1 and 2 but fail here. Practice these to be ready.
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[
                { label: `1 Free project`, color: '#4ade80', bg: 'rgba(34,197,94,0.1)' },
                { label: `${PROJECTS.length - 1} Pro projects`, color: '#facc15', bg: 'rgba(234,179,8,0.1)' },
                { label: 'Java code included', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
              ].map(function(b) {
                return (
                  <span key={b.label} style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20, background: b.bg, color: b.color }}>
                    {b.label}
                  </span>
                )
              })}
            </div>
          </div>
          <div style={{ color: '#4b5563', flexShrink: 0 }}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </button>

      {/* Projects list */}
      {expanded && (
        <div style={{ padding: '0 1rem 1rem', borderTop: '1px solid #1f2937' }}>

          {/* Why round 3 is hard */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 12, padding: '10px 12px', margin: '12px 0' }}>
            <Zap size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: '#fde68a', lineHeight: 1.7 }}>
              <strong style={{ color: '#fbbf24' }}>Why students fail Round 3:</strong> They know syntax but cannot design clean classes. Zoho checks how you structure your code — proper class separation, encapsulation, and handling edge cases cleanly. Practice these projects before the interview.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PROJECTS.map(function(p) {
              return <ProjectCard key={p.id} p={p} isPro={isPro} />
            })}
          </div>

          {!isPro && (
            <div style={{ marginTop: 12, background: 'linear-gradient(135deg, rgba(234,179,8,0.06), rgba(249,115,22,0.04))', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
              <Crown size={20} color="#facc15" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                Unlock all 4 Pro projects
              </div>
              <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
                Train Reservation, Student Management, Task Manager, Taxi Booking — all with full use cases, OOP breakdown, and Java solutions.
              </p>
              <Link
                to="/dashboard/pricing"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 22px', background: '#f59e0b', color: '#000', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}
              >
                <Crown size={13} /> Upgrade to Pro — ₹299/month
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}