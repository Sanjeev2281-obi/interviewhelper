import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Crown, Lock, ExternalLink, ChevronDown, ChevronUp,
  Code2, CheckCircle, AlertTriangle, Zap, Target, BookOpen, ArrowRight
} from 'lucide-react'
import { useAuth } from "../hooks/useAuth";
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
    description: 'Build a bank account system where users can deposit, withdraw, and check balance using their account ID. This is the most commonly asked warm-up project in Zoho Round 3.',
    usecases: [
      'Find account by ID — use HashMap for O(1) lookup',
      'Deposit money into the account',
      'Withdraw money — only if sufficient balance exists',
      'Check current balance',
      'Handle invalid account ID with a proper error message',
      'Run the menu in a loop until the user chooses to exit',
    ],
    oopConcepts: [
      'BankAccount class — encapsulates balance and owner name',
      'HashMap<Integer, BankAccount> for fast account lookup',
      'Methods: deposit(double), withdraw(double), getBalance()',
      'Input validation inside each method',
    ],
    hiddenTwist: null,
    sampleInput: 'Enter account id:\n2\n\n1\n500\n\n3\n\n2\n200\n\n3\n\n4',
    sampleOutput: 'Hi Priya\n\n1. Deposit  2. Withdrawal  3. Check Balance  4. Exit\nChoice: 1\nEnter amount: 500\nAmount deposited successfully.\n\nChoice: 3\nBalance: 2000.0\n\nChoice: 2\nEnter amount: 200\nWithdrawal successful.\n\nChoice: 3\nBalance: 1800.0\n\nChoice: 4\nThank you!',
    invalidInput: 'Enter account id:\n10',
    invalidOutput: 'Sorry!! Account not found',
    constraints: [
      '1 ≤ Account ID ≤ 1000',
      'Balance must always be ≥ 0',
      'Withdrawal is only allowed if sufficient balance exists',
    ],
  },
  {
    id: 2,
    free: false,
    title: 'Railway Reservation System',
    subtitle: 'Train Ticket Booking and Management',
    difficulty: 'Medium',
    icon: '🚆',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.12)',
    border: 'rgba(96,165,250,0.25)',
    tags: ['OOP', 'HashMap', 'ArrayList', 'State Management'],
    codeLink: 'https://www.onlinegdb.com/w9koBIg0lX',
    description: 'Build a train reservation system that manages trains, books tickets, handles cancellations, and tracks seat availability in real time.',
    usecases: [
      'Add a new train with source, destination, and total seats',
      'Book a ticket for a passenger on a specific train',
      'Cancel an existing booking by passenger ID',
      'View the complete list of all active passengers',
      'Check train status — how many seats are still available',
      'Handle edge cases: train not found, no seats available, passenger ID not found',
    ],
    oopConcepts: [
      'Train class — manages seat count and passenger list',
      'Passenger class — holds booking details (name, seat number)',
      'HashMap<Integer, Train> for train lookup',
      'HashMap<Integer, Passenger> for passenger lookup',
      'bookTicket() method updates seat count and assigns seat number',
    ],
    hiddenTwist: null,
    sampleInput: '1 101 Chennai Bangalore 2\n2 1 Ram 101\n2 2 Ravi 101\n2 3 Ajay 101\n5 101\n3 1\n5 101\n4\n6',
    sampleOutput: 'Train added\nTicket booked : Id->Ticket Booked (Name: Ram)passengerId: 1\nTicket booked : Id->Ticket Booked (Name: Ravi)passengerId: 2\nNo available seats sry!\n-101(Chennai->Bangalore)Available seats: 0\npassenger removes Ram\n-101(Chennai->Bangalore)Available seats: 1\nTicket Booked (Name: Ravi)passengerId: 2',
    invalidInput: '2 1 Arun 999',
    invalidOutput: 'Train not found',
    constraints: [
      '1 ≤ trainId ≤ 10^5',
      '1 ≤ passengerId ≤ 10^5',
      '1 ≤ totalSeats ≤ 1000',
      'Each train ID and passenger ID must be unique',
      'Passenger names are non-empty strings',
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
    description: 'Build a student records system with full CRUD — add, update, delete, and view operations with proper validation. A classic OOP design problem.',
    usecases: [
      'Add a new student with ID, name, age, and course',
      'Update all details of an existing student by ID',
      'Delete a student permanently by ID',
      'View all students currently stored in the system',
      'Reject duplicate IDs during addition with an error message',
      'Handle ID not found during update and delete operations',
    ],
    oopConcepts: [
      'Student class with fields: id, name, age, course',
      'toString() method for clean formatted output',
      'LinkedHashMap to preserve insertion order during display',
      'Separate methods: addStudent(), updateStudent(), deleteStudent(), viewAll()',
    ],
    hiddenTwist: 'During update, if the new ID already exists in the system — it creates a duplicate. The system currently does NOT prevent this. Zoho interviewers specifically check whether you identify and fix this edge case.',
    sampleInput: '1 101 Ram 20 CSE\n1 102 Priya 21 ECE\n4\n2 101 201 RamKumar 22 IT\n4\n3 102\n4\n5',
    sampleOutput: 'Student was Added\nStudent was Added\n\nStudent details:\nID: 101 | Name: Ram | Age: 20 | Course: CSE\nID: 102 | Name: Priya | Age: 21 | Course: ECE\n\nstudent was updated\n\nStudent details:\nID: 201 | Name: RamKumar | Age: 22 | Course: IT\nID: 102 | Name: Priya | Age: 21 | Course: ECE\n\nStudent was removed in DB\n\nStudent details:\nID: 201 | Name: RamKumar | Age: 22 | Course: IT',
    invalidInput: '2 999 300 Arun 23 MECH',
    invalidOutput: 'ID was not found',
    constraints: [
      '1 ≤ Student ID ≤ 10^5',
      '1 ≤ Age ≤ 100',
      'Student ID must be unique',
      'Name and Course must not be empty',
      'Duplicate IDs are not allowed during addition',
      'Update replaces all existing student details',
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
    description: 'Build a task manager that accepts tasks with priorities, validates due dates strictly, and groups tasks by priority level. Tests your knowledge of Enums, date handling, and OOP design.',
    usecases: [
      'Add a task with name, description, due date, priority, and categories',
      'Validate that task name and description are not empty',
      'Validate date format (dd-MM-yyyy) and reject incorrectly formatted dates',
      'Reject past dates — only future dates are allowed',
      'Default invalid priority values to MEDIUM automatically',
      'View all tasks in a formatted list with all details',
      'View tasks grouped separately by LOW, MEDIUM, and HIGH priority',
    ],
    oopConcepts: [
      'Task class with Priority Enum (LOW, MEDIUM, HIGH)',
      'LocalDate for date parsing and future-date validation',
      'Auto-incremented task ID counter',
      'Set<String> for unique categories per task',
      'Map<Priority, List<Task>> for grouping by priority',
    ],
    hiddenTwist: 'Tasks are NOT sorted by due date — they are only grouped by priority. Duplicate task names are allowed. There is no update or delete functionality. Zoho interviewers check whether you point out these design limitations during the discussion.',
    sampleInput: '1\nTask1\nComplete assignment\n25-12-2026\nHIGH\nstudy,college\n\n1\nTask2\nGo to gym\n20-12-2026\nLOW\nhealth\n\n2\n\n3\n\n4',
    sampleOutput: 'Task was Added....\nTask was Added....\n\nTask ID:1||Task Name:Task1||Task Description:Complete assignment||DueDate:25-12-2026||Priority:HIGH||categories:study,college\nTask ID:2||Task Name:Task2||Task Description:Go to gym||DueDate:20-12-2026||Priority:LOW||categories:health\n\n-----LOW priority List ------\nTask ID:2||Task Name:Task2...\n\n-----MEDIUM priority List ------\nMEDIUM was Empty\n\n-----HIGH priority List ------\nTask ID:1||Task Name:Task1...',
    invalidInput: '1\nTask3\nTest task\n10-10-2020\nHIGH\ntest',
    invalidOutput: 'Enter the future date :',
    constraints: [
      '1 ≤ Task ID ≤ 10^5 (auto-generated)',
      'Task name and description must not be empty',
      'Due date must be in dd-MM-yyyy format',
      'Due date must be a future date',
      'Priority must be LOW, MEDIUM, or HIGH',
      'Categories can be empty or multiple comma-separated values',
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
    tags: ['OOP', 'Greedy', 'Comparator', 'Distance Logic'],
    codeLink: 'https://www.onlinegdb.com/0iohKm5wq',
    description: 'Build a taxi dispatch system that allocates the best available taxi to each customer using distance and earnings-based rules, calculates fares, and displays complete booking history per taxi.',
    usecases: [
      'Initialize N taxis — all start at location A with 0 earnings',
      'Accept booking requests: customer ID, pickup point, drop point, pickup time',
      'Find all taxis that are free at the requested pickup time',
      'Allocate the taxi with minimum travel distance to the pickup point',
      'Break ties using earnings — lower earnings gets priority',
      'Calculate fare: base ₹100 + (distance − 5) × 10',
      'Display complete booking history and total earnings for each taxi',
    ],
    oopConcepts: [
      'Taxi class — location, earnings, freeTime, List<Booking>',
      'Booking class — bookingId, customerId, from, to, pickupTime, dropTime',
      'Comparator to sort taxis: first by distance, then by earnings',
      'Distance = Math.abs(pickupChar - taxiLocationChar)',
      'DropTime = pickupTime + distance',
    ],
    hiddenTwist: 'If multiple taxis have the same distance AND the same earnings — the taxi with the smallest ID (first in the list) must be selected. This is the most common reason students fail this specific problem. Always handle this tie-breaking rule explicitly.',
    sampleInput: '4\n1 A B 9\n2 B D 9\n3 B C 12',
    sampleOutput: 'Taxi: 1 is allocated...\nTaxi: 2 is allocated...\nTaxi: 1 is allocated...\n\nTaxi-1 Total Earning -200\nBookingID  Customer Id  From  To  Pickup Time  Drop Timing\n1          1            A     B   9            10\n3          3            B     C   12           13\n\nTaxi-2 Total Earning -250\nBookingID  Customer Id  From  To  Pickup Time  Drop Timing\n2          2            B     D   9            11\n\nTaxi-3 Total Earning -0\nTaxi-4 Total Earning -0',
    invalidInput: '1\n1 A D 5\n2 A B 5',
    invalidOutput: 'Taxi: 1 is allocated...\nNo Taxi is available..',
    constraints: [
      '1 ≤ number of taxis ≤ 100',
      'Locations are uppercase letters A through Z',
      '0 ≤ pickupTime ≤ 24',
      'Each taxi handles only one booking at a time',
      'Taxi becomes free only after completing the current ride',
      'All taxis start at location A',
    ],
  },
  {
  "id": 6,
  "free": false,
  "title": "Library Management System",
  "subtitle": "Book Borrowing with Availability Tracking",
  "difficulty": "Medium",
  "icon": "📚",
  "color": "#22c55e",
  "bg": "rgba(34,197,94,0.12)",
  "border": "rgba(34,197,94,0.25)",
  "tags": ["OOP", "HashMap", "List", "State Management"],
  "codeLink": "https://onlinegdb.com/A5HC7aLYW",
  "description": "Build a library system that manages books, allows users to borrow and return books, and tracks availability. Focuses on object modeling, state changes, and edge case handling.",
  
  "usecases": [
    "Add books with bookId, title, and total copies",
    "Register users with userId and name",
    "Borrow a book if copies are available",
    "Prevent borrowing if no copies are available",
    "Return a book and increase available copies",
    "View all books with available count",
    "View all borrowed books per user"
  ],
  
  "oopConcepts": [
    "Book class — bookId, title, totalCopies, availableCopies",
    "User class — userId, name, List<Book>",
    "Library class — Map<Integer, Book>, Map<Integer, User>",
    "Borrow reduces availableCopies, return increases it",
    "Use List to track borrowed books per user"
  ],
  
  "hiddenTwist": "A user can borrow the same book multiple times if multiple copies exist. However, the system does not prevent duplicate borrowing entries. Also, no due date tracking is implemented — interviewer expects you to identify this missing feature.",
  
  "sampleInput": "1\n101 Java\n3\n\n2\n1 Ram\n\n3\n1 101\n\n3\n1 101\n\n4\n\n5\n1\n\n6",
  
  "sampleOutput": "Book added\nUser registered\nBook borrowed successfully\nBook borrowed successfully\n\nBook ID:101 | Title:Java | Available:1\n\nUser 1 borrowed:\nJava\nJava",
  
  "invalidInput": "3\n1 999",
  
  "invalidOutput": "Book not found",
  
  "constraints": [
    "1 ≤ bookId ≤ 10^5",
    "1 ≤ userId ≤ 10^5",
    "0 ≤ copies ≤ 1000",
    "User must exist before borrowing",
    "Book must exist before borrowing",
    "Borrow only if availableCopies > 0"
  ]
},
]

const DIFF_STYLE = {
  Easy:   { bg: 'rgba(34,197,94,0.12)',  color: '#4ade80',  border: 'rgba(34,197,94,0.25)'  },
  Medium: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24',  border: 'rgba(251,191,36,0.25)' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',  color: '#f87171',  border: 'rgba(239,68,68,0.25)'  },
}

function ProjectCard({ p }) {
      const { user } = useAuth()               // ← add this
  const isPro = user?.role === 'PRO'       // ← add this
  const locked = !p.free && !isPro
  const [open, setOpen] = useState(p.free)
  const [tab, setTab] = useState('usecases')
  const ds = DIFF_STYLE[p.difficulty]
  

  return (
    <div style={{
      background: '#111827',
      border: open ? '1px solid ' + p.border : locked ? '1px solid rgba(234,179,8,0.15)' : '1px solid #1f2937',
      borderRadius: 16, overflow: 'hidden', transition: 'border-color .2s',
    }}>

      <button
        onClick={function() { if (!locked) setOpen(!open) }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 20px', background: open ? p.bg : 'transparent',
          border: 'none', cursor: locked ? 'default' : 'pointer', textAlign: 'left',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 14, background: p.bg,
          border: '1px solid ' + p.border, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
        }}>
          {p.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{p.title}</span>
            {p.free && (
              <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>
                FREE
              </span>
            )}
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: ds.bg, color: ds.color, border: '1px solid ' + ds.border }}>
              {p.difficulty}
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>{p.subtitle}</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {p.tags.map(function(t) {
              return (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}>
                  {t}
                </span>
              )
            })}
          </div>
        </div>

        {locked ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 10, background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', flexShrink: 0 }}>
            <Lock size={13} color="#facc15" />
            <span style={{ fontSize: 12, color: '#facc15', fontWeight: 700 }}>Pro only</span>
          </div>
        ) : (
          <div style={{ color: '#4b5563', flexShrink: 0 }}>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </button>

      {open && !locked && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid #1f2937' }}>

          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.75, margin: '14px 0' }}>
            {p.description}
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: '#0d1117', padding: 4, borderRadius: 12, marginBottom: 14 }}>
            {[
              { id: 'usecases',    label: '📋 Use Cases'     },
              { id: 'oop',         label: '🧱 OOP Design'    },
              { id: 'io',          label: '⌨️ I/O Example'   },
              { id: 'constraints', label: '⚠️ Constraints'   },
            ].map(function(t) {
              return (
                <button
                  key={t.id}
                  onClick={function() { setTab(t.id) }}
                  style={{
                    flex: 1, padding: '7px 6px', borderRadius: 8,
                    border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
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

          {/* Use Cases tab */}
          {tab === 'usecases' && (
            <div style={{ background: p.bg, border: '1px solid ' + p.border, borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>
                What Zoho expects you to implement
              </div>
              {p.usecases.map(function(uc, i) {
                return (
                  <div key={uc} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '7px 0', borderBottom: i < p.usecases.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: p.color + '22', color: p.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800, marginTop: 1,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{uc}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* OOP Design tab */}
          {tab === 'oop' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>
                  Classes and concepts to use
                </div>
                {p.oopConcepts.map(function(oc) {
                  return (
                    <div key={oc} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '5px 0' }}>
                      <Code2 size={13} color="#c084fc" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{oc}</span>
                    </div>
                  )
                })}
              </div>
              {p.hiddenTwist && (
                <div style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12 }}>
                  <AlertTriangle size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>
                      🔍 Zoho Hidden Twist — many students miss this
                    </div>
                    <p style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.7 }}>{p.hiddenTwist}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* I/O tab */}
          {tab === 'io' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                    Sample Input
                  </div>
                  <pre style={{ fontSize: 12, color: '#4ade80', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>
                    {p.sampleInput}
                  </pre>
                </div>
                <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                    Sample Output
                  </div>
                  <pre style={{ fontSize: 12, color: '#60a5fa', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>
                    {p.sampleOutput}
                  </pre>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: '#0d1117', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                    Invalid Input
                  </div>
                  <pre style={{ fontSize: 12, color: '#fca5a5', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>
                    {p.invalidInput}
                  </pre>
                </div>
                <div style={{ background: '#0d1117', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                    Error Output
                  </div>
                  <pre style={{ fontSize: 12, color: '#fca5a5', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>
                    {p.invalidOutput}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Constraints tab */}
          {tab === 'constraints' && (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>
                Constraints and rules
              </div>
              {p.constraints.map(function(c) {
                return (
                  <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '5px 0' }}>
                    <CheckCircle size={13} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.5 }}>{c}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Footer links */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a
              href={p.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 10,
                background: p.bg, border: '1px solid ' + p.border,
                fontSize: 13, fontWeight: 700, color: p.color, textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} /> View Java Solution on OnlineGDB
            </a>
            <Link
              to="/dashboard/problems"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 10,
                background: '#1f2937', border: '1px solid #374151',
                fontSize: 13, fontWeight: 700, color: '#9ca3af', textDecoration: 'none',
              }}
            >
              <Code2 size={13} /> Practice DSA
            </Link>
          </div>
        </div>
      )}

      {/* Locked footer */}
      {locked && (
        <div style={{
          padding: '10px 20px 14px', borderTop: '1px solid rgba(234,179,8,0.1)',
          background: 'rgba(234,179,8,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}>
          <span style={{ fontSize: 12, color: '#78716c' }}>
            Unlock full solution + use cases + OOP breakdown
          </span>
          <Link
            to="/dashboard/pricing"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '7px 16px', borderRadius: 9,
              background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)',
              fontSize: 12, fontWeight: 700, color: '#facc15', textDecoration: 'none',
            }}
          >
            <Crown size={12} /> Upgrade to Pro — ₹299/month
          </Link>
        </div>
      )}
    </div>
  )
}

export default function ZohoRound3Page( ) {
    const { user } = useAuth()                 // ← add this
  const isPro = user?.role === 'PRO' 
  const freeCount = PROJECTS.filter(function(p) { return p.free }).length
  const proCount = PROJECTS.filter(function(p) { return !p.free }).length

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: "'DM Sans','Inter',sans-serif" }}>

      {/* Hero */}
      <div style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0f1a 0%, #1a0a0a 100%)',
        border: '1px solid rgba(239,68,68,0.2)', padding: '2rem', marginBottom: '2rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .05, backgroundImage: 'linear-gradient(rgba(239,68,68,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,.4) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.08), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 20, padding: '4px 14px' }}>
            <span style={{ fontSize: 12 }}>🏢</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '.08em' }}>Zoho Round 3 — Mini Projects</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>
            Crack the round that eliminates<br />
            <span style={{ color: '#f87171' }}>most candidates</span>
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.75, maxWidth: 540, marginBottom: '1.25rem' }}>
            Many students pass rounds 1 and 2 but fail round 3. Zoho asks you to build a mini project with 6–7 use cases and evaluates your OOP thinking, class design, and edge case handling — not just syntax.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { n: PROJECTS.length, label: 'projects' },
              { n: freeCount, label: 'free' },
              { n: proCount, label: 'pro projects' },
              { n: 'Java', label: 'language' },
            ].map(function(s) {
              return (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: '#4b5563' }}>{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Why students fail */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginBottom: '1.5rem' }}>
        {[
          { icon: '😰', title: 'Know syntax, not design', desc: 'They can write loops and conditions but cannot split logic into proper classes.' },
          { icon: '🐛', title: 'Miss edge cases', desc: 'Invalid input, duplicate IDs, insufficient balance — these fail submissions in round 3.' },
          { icon: '🏃', title: 'No practice under time pressure', desc: 'Round 3 is timed. Without prior practice, building 6 use cases in 60–90 minutes is very hard.' },
        ].map(function(r) {
          return (
            <div key={r.title} style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 14, padding: '1rem' }}>
              <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{r.icon}</span>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f87171', marginBottom: 4 }}>{r.title}</div>
              <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          )
        })}
      </div>

      {/* What Zoho checks */}
      <div style={{ background: '#111827', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Target size={15} color="#fbbf24" />
          <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>What Zoho actually checks in round 3</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
          {[
            { label: 'Class structure', desc: 'Are your classes well separated?' },
            { label: 'Encapsulation', desc: 'Is data protected inside classes?' },
            { label: 'Edge cases', desc: 'Do you handle invalid input?' },
            { label: 'Clean code', desc: 'Is it readable and well named?' },
          ].map(function(c) {
            return (
              <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <CheckCircle size={13} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{c.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Also prepare DSA banner */}
      <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)', borderLeft: '3px solid #60a5fa', borderRadius: '0 12px 12px 0', padding: '10px 14px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={14} color="#60a5fa" />
          <span style={{ fontSize: 13, color: '#93c5fd' }}>
            Zoho round 3 can also be advanced DSA instead of a project. Prepare both.
          </span>
        </div>
        <Link to="/dashboard/problems" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 14px', borderRadius: 8, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', fontSize: 12, fontWeight: 700, color: '#60a5fa', textDecoration: 'none' }}>
          <ArrowRight size={12} /> Go to DSA Problems
        </Link>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '.07em' }}>
          {PROJECTS.length} mini projects — click any to expand
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PROJECTS.map(function(p) {
          return <ProjectCard key={p.id} p={p} isPro={isPro} />
        })}
      </div>

      {/* Pro upgrade CTA */}
      {!isPro && (
        <div style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(234,179,8,0.06), rgba(249,115,22,0.04))', border: '2px solid rgba(234,179,8,0.25)', borderRadius: 18, padding: '1.75rem', textAlign: 'center' }}>
          <Crown size={28} color="#facc15" style={{ margin: '0 auto 10px' }} />
          <div style={{ fontSize: 18, fontWeight: 900, color: 'white', marginBottom: 6 }}>
            Unlock all {proCount} Pro projects
          </div>
          <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 16px' }}>
            Train Reservation, Student Management, Task Manager, and Taxi Booking — each with full use cases, OOP design breakdown, hidden Zoho twists, and working Java solutions on OnlineGDB.
          </p>
          <Link
            to="/dashboard/pricing"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: '#f59e0b', color: '#000', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none' }}
          >
            <Crown size={15} /> Upgrade to Pro — ₹299/month
          </Link>
          <p style={{ fontSize: 11, color: '#4b5563', marginTop: 8 }}>
            Also includes 500 DSA problems · AI mock interviews · Resume review · System design
          </p>
        </div>
      )}

    </div>
  )
}