import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  Lock, Crown, ExternalLink, ChevronDown, ChevronUp,
  Zap, CheckCircle, ArrowRight, BookOpen, Code2,
  Server, Layers, Database, Globe
} from 'lucide-react'

// ── Company logos as SVG ───────────────────────────────────────
const CompanyLogo = ({ name, size = 32 }) => {
  const logos = {
    Google: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    ),
    Amazon: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#FF9900"/>
        <text x="24" y="30" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">a</text>
      </svg>
    ),
    Netflix: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#141414"/>
        <path fill="#E50914" d="M12 8h6l6 16V8h6v32h-6L18 24v16h-6z"/>
      </svg>
    ),
    Apple: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#1d1d1f"/>
        <path fill="white" d="M32.5 25.2c-.05-4.5 3.7-6.7 3.85-6.8-2.1-3.1-5.4-3.5-6.55-3.55-2.75-.3-5.4 1.65-6.8 1.65-1.4 0-3.55-1.6-5.85-1.55-3 .05-5.75 1.75-7.3 4.4-3.15 5.45-.8 13.5 2.2 17.95 1.5 2.15 3.25 4.55 5.55 4.45 2.25-.1 3.1-1.4 5.8-1.4 2.7 0 3.5 1.4 5.85 1.35 2.4-.05 3.9-2.15 5.4-4.3 1.7-2.45 2.4-4.85 2.45-4.95-.05-.05-4.55-1.75-4.6-6.2zM27.8 11.5c1.2-1.5 2.05-3.55 1.8-5.6-1.75.1-3.95 1.2-5.2 2.65-1.1 1.3-2.1 3.4-1.85 5.4 1.95.15 3.95-1 5.25-2.45z"/>
      </svg>
    ),
    Microsoft: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect x="4" y="4" width="18" height="18" fill="#F25022"/>
        <rect x="26" y="4" width="18" height="18" fill="#7FBA00"/>
        <rect x="4" y="26" width="18" height="18" fill="#00A4EF"/>
        <rect x="26" y="26" width="18" height="18" fill="#FFB900"/>
      </svg>
    ),
    Meta: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#0866FF"/>
        <path fill="white" d="M8 24c0-4.4 2.1-8.3 5.3-10.8C16 11 20 10.5 24 12c3.8 1.4 6.5 4.5 7.5 8.2.5 1.8.5 3.8-.2 5.6-.6 1.6-1.8 3-3.2 3.8-1.2.7-2.6.8-3.8.3-1-.4-1.8-1.3-2.1-2.4-.5-1.7 0-3.6 1.2-4.9 1-1.1 2.4-1.7 3.9-1.5"/>
      </svg>
    ),
    Uber: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#000"/>
        <text x="24" y="32" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Arial">U</text>
      </svg>
    ),
    Twitter: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#000"/>
        <path fill="white" d="M26.4 21.7L36.8 10h-2.5l-9.1 10.5L17.7 10H9l10.9 15.8L9 38h2.5l9.5-11.1L28.3 38H37L26.4 21.7zm-3.4 3.9l-1.1-1.6L12.4 11.8h3.9l7.2 10.2 1.1 1.6 9.4 13.4h-3.9l-7.1-10.4z"/>
      </svg>
    ),
  }
  return logos[name] || (
    <div style={{ width: size, height: size, borderRadius: 8, backgroundColor: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 'bold' }}>{name[0]}</span>
    </div>
  )
}

// ── System Design Problems ─────────────────────────────────────
const PROBLEMS = [
  // FREE
  {
    id: 1,
    type: 'HLD',
    title: 'Design URL Shortener',
    subtitle: 'Like bit.ly or TinyURL',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft'],
    tags: ['Hashing', 'Database', 'Caching', 'REST API'],
    duration: '45 mins',
    free: true,
    description: 'Design a system that takes a long URL and returns a short URL. Must handle millions of redirects per day.',
    keyComponents: ['API Gateway', 'URL Hash Generator', 'Key-Value Store', 'Cache Layer', 'Analytics Service'],
    requirements: {
      functional: ['Shorten URL', 'Redirect to original', 'Custom aliases', 'URL expiry', 'Analytics'],
      nonFunctional: ['100M URLs/day', '10:1 read/write ratio', '< 10ms redirect latency', '99.9% uptime'],
    },
    approach: `
1. **API Design** — POST /shorten → returns short URL, GET /{shortCode} → 302 redirect
2. **Hash Generation** — Use MD5/SHA256, take first 7 chars, handle collisions with counter
3. **Storage** — NoSQL (Cassandra/DynamoDB) for key-value: shortCode → longURL
4. **Cache** — Redis cache for hot URLs (80% reads from cache)
5. **Scale** — Load balancer → App servers → Cache → DB
    `,
    resources: [
      { label: 'Grokking SD — URL Shortener', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR' },
      { label: 'YouTube: Gaurav Sen', url: 'https://www.youtube.com/watch?v=fMZMm_0ZhK4' },
    ],
    solveOptions: [
      { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Free whiteboard for system diagrams' },
      { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Professional architecture diagrams' },
      { label: 'Google Docs', url: 'https://docs.google.com/', icon: '📄', desc: 'Write your design document' },
    ],
  },

  // PRO PROBLEMS
  {
    id: 2,
    type: 'HLD',
    title: 'Design Netflix',
    subtitle: 'Video streaming at 200M+ users',
    difficulty: 'Hard',
    companies: ['Netflix', 'Amazon', 'Google'],
    tags: ['CDN', 'Video Encoding', 'Microservices', 'Streaming'],
    duration: '60 mins',
    free: false,
    description: 'Design a video streaming platform that serves 200 million users globally with low latency.',
    keyComponents: ['CDN', 'Video Encoder', 'Recommendation Engine', 'Search Service', 'Payment Service'],
    requirements: {
      functional: ['Upload & stream videos', 'Search content', 'User recommendations', 'Multiple resolutions', 'Offline download'],
      nonFunctional: ['200M users', 'Global low latency', '99.99% uptime', 'Adaptive bitrate streaming'],
    },
    approach: `
1. **Video Upload Pipeline** — S3 → Transcoder → Multiple resolutions (4K, 1080p, 720p, 480p)
2. **CDN** — AWS CloudFront/Akamai — serve videos from edge nodes closest to user
3. **Adaptive Streaming** — DASH/HLS protocol, client switches quality based on bandwidth
4. **Recommendation** — Apache Kafka for events → ML pipeline → personalized feed
5. **Database** — User data (MySQL), Content metadata (Cassandra), Watch history (DynamoDB)
    `,
    resources: [
      { label: 'Netflix Tech Blog', url: 'https://netflixtechblog.com/' },
      { label: 'System Design Interview — Netflix', url: 'https://www.youtube.com/watch?v=psQzyFfsUGU' },
    ],
    solveOptions: [
      { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Free whiteboard for system diagrams' },
      { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Professional architecture diagrams' },
    ],
  },
  {
    id: 3,
    type: 'LLD',
    title: 'Design Parking Lot System',
    subtitle: 'OOP + Design Patterns',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Apple'],
    tags: ['OOP', 'Design Patterns', 'Java', 'Clean Code'],
    duration: '45 mins',
    free: false,
    description: 'Design a parking lot system with multiple floors, different vehicle types, and automated ticketing.',
    keyComponents: ['ParkingLot', 'ParkingFloor', 'ParkingSpot', 'Vehicle', 'Ticket', 'Payment'],
    requirements: {
      functional: ['Park vehicle', 'Exit vehicle', 'Calculate charges', 'Find nearest spot', 'Display board'],
      nonFunctional: ['Thread-safe for concurrent entries', 'Support 4 vehicle types', 'Extensible design'],
    },
    approach: `
1. **Classes** — ParkingLot (Singleton), ParkingFloor[], ParkingSpot, Vehicle (Abstract), Ticket
2. **Vehicle Types** — Motorcycle, Car, Bus, ElectricVehicle (inherits Vehicle)
3. **Spot Types** — Compact, Large, Handicapped, ElectricSpot
4. **Strategy Pattern** — PricingStrategy for different vehicle/time combinations
5. **Observer Pattern** — DisplayBoard updates when spots change
    `,
    resources: [
      { label: 'Grokking OOD — Parking Lot', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview' },
      { label: 'LeetCode Discuss', url: 'https://leetcode.com/discuss/interview-question/124565/' },
    ],
    solveOptions: [
      { label: 'Code on LeetCode', url: 'https://leetcode.com/', icon: '💻', desc: 'Write actual OOP code' },
      { label: 'Design on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Draw class diagrams' },
      { label: 'Use draw.io for UML', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'UML class diagrams' },
    ],
  },
  {
    id: 4,
    type: 'HLD',
    title: 'Design WhatsApp',
    subtitle: 'Real-time messaging at 2B users',
    difficulty: 'Hard',
    companies: ['Meta', 'Amazon', 'Google'],
    tags: ['WebSockets', 'Message Queue', 'End-to-End Encryption', 'Push Notifications'],
    duration: '60 mins',
    free: false,
    description: 'Design a real-time chat application serving 2 billion users with end-to-end encryption.',
    keyComponents: ['Chat Service', 'Presence Service', 'Notification Service', 'Media Service', 'Group Service'],
    requirements: {
      functional: ['1:1 messaging', 'Group chats', 'Media sharing', 'Read receipts', 'Voice/Video calls'],
      nonFunctional: ['2B users', 'Sub-100ms message delivery', 'E2E encryption', 'Offline message storage'],
    },
    approach: `
1. **Connection** — WebSocket persistent connections for real-time delivery
2. **Message Flow** — Client → Chat Server → Message Queue (Kafka) → Recipient Server → Client
3. **Storage** — HBase for messages (time-series), Cassandra for user/group data
4. **Presence** — Redis pub/sub for online status, heartbeat every 5s
5. **E2E Encryption** — Signal Protocol, keys stored only on devices
    `,
    resources: [
      { label: 'WhatsApp Architecture', url: 'https://highscalability.com/blog/2014/2/26/the-whatsapp-architecture-facebook-bought-for-19-billion.html' },
      { label: 'System Design: Chat App', url: 'https://www.youtube.com/watch?v=vvhC64hQZMk' },
    ],
    solveOptions: [
      { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Free whiteboard' },
      { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Architecture diagrams' },
    ],
  },
  {
    id: 5,
    type: 'LLD',
    title: 'Design Amazon Locker',
    subtitle: 'Package delivery & pickup system',
    difficulty: 'Medium',
    companies: ['Amazon'],
    tags: ['OOP', 'State Machine', 'Scheduling', 'Notifications'],
    duration: '40 mins',
    free: false,
    description: 'Design the Amazon Locker system where customers can pick up packages from automated lockers.',
    keyComponents: ['LockerSystem', 'Locker', 'Package', 'Customer', 'OTPService', 'NotificationService'],
    requirements: {
      functional: ['Assign locker to package', 'Generate OTP', 'Unlock locker', 'Handle expiry', 'Notify customer'],
      nonFunctional: ['Thread-safe concurrent access', 'Multiple locker sizes', 'Audit trail'],
    },
    approach: `
1. **Locker States** — Available → Reserved → Locked → Expired (State Pattern)
2. **Size Matching** — Small/Medium/Large lockers matched to package dimensions
3. **OTP Flow** — Package arrives → assign locker → generate 6-digit OTP → SMS customer
4. **Expiry** — Scheduler checks for expired packages (3 days), auto-release locker
5. **Singleton** — LockerSystem as singleton, thread-safe with synchronized blocks
    `,
    resources: [
      { label: 'Amazon Locker LLD', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview' },
    ],
    solveOptions: [
      { label: 'Code on Replit', url: 'https://replit.com/', icon: '💻', desc: 'Write and run Java/Python code' },
      { label: 'Design on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Draw class diagrams' },
    ],
  },
  {
    id: 6,
    type: 'HLD',
    title: 'Design Google Search',
    subtitle: 'Index the entire web',
    difficulty: 'Hard',
    companies: ['Google'],
    tags: ['Web Crawler', 'Inverted Index', 'PageRank', 'Distributed Systems'],
    duration: '75 mins',
    free: false,
    description: 'Design a web search engine that crawls, indexes, and ranks billions of web pages.',
    keyComponents: ['Web Crawler', 'Document Store', 'Inverted Index', 'Ranking Engine', 'Query Processor'],
    requirements: {
      functional: ['Crawl web pages', 'Index content', 'Search queries', 'Rank results', 'Handle updates'],
      nonFunctional: ['Crawl 10B pages', 'Index freshness', 'Sub-500ms search', 'Spell correction'],
    },
    approach: `
1. **Crawler** — Distributed crawlers with frontier queue (BFS), politeness delay, robots.txt
2. **Storage** — BigTable for raw pages, GFS for large files
3. **Inverted Index** — word → [doc1:pos, doc2:pos, ...] for fast lookup
4. **PageRank** — Link graph analysis, iterative MapReduce computation
5. **Query Processing** — Tokenize → lookup inverted index → score → rank → return top-k
    `,
    resources: [
      { label: 'Google BigTable Paper', url: 'https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf' },
      { label: 'System Design: Search Engine', url: 'https://www.youtube.com/watch?v=CeGtqouT8eA' },
    ],
    solveOptions: [
      { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'System architecture diagram' },
      { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Detailed component diagrams' },
    ],
  },
  {
    id: 7,
    type: 'LLD',
    title: 'Design Chess Game',
    subtitle: 'Complete OOP chess implementation',
    difficulty: 'Hard',
    companies: ['Microsoft', 'Apple', 'Amazon'],
    tags: ['OOP', 'Strategy Pattern', 'Board Game', 'State Machine'],
    duration: '50 mins',
    free: false,
    description: 'Design a chess game with all pieces, valid moves, check/checkmate detection, and game state management.',
    keyComponents: ['Board', 'Piece (abstract)', 'Player', 'Game', 'MoveValidator', 'GameHistory'],
    requirements: {
      functional: ['All piece movements', 'Check/Checkmate detection', 'Castling/En passant', 'Move history', 'Save/Load game'],
      nonFunctional: ['Extensible for new game modes', 'Clean separation of concerns'],
    },
    approach: `
1. **Pieces** — Abstract Piece class → King, Queen, Rook, Bishop, Knight, Pawn
2. **Move Validation** — Each piece implements getValidMoves() with board context
3. **Check Detection** — After each move, check if King is under attack
4. **Command Pattern** — Each move is a command object (enables undo/redo)
5. **Observer Pattern** — GameEventListener for UI updates (check, checkmate, draw)
    `,
    resources: [
      { label: 'Chess LLD GitHub', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview/blob/master/object-oriented-design-case-studies/design-chess.md' },
    ],
    solveOptions: [
      { label: 'Code on LeetCode', url: 'https://leetcode.com/', icon: '💻', desc: 'Write OOP implementation' },
      { label: 'Code on Replit', url: 'https://replit.com/', icon: '🔧', desc: 'Run and test your code' },
      { label: 'Design UML on draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Class diagram' },
    ],
  },
  {
    id: 8,
    type: 'HLD',
    title: 'Design Uber / Ride Sharing',
    subtitle: 'Real-time matching at global scale',
    difficulty: 'Hard',
    companies: ['Uber', 'Amazon', 'Google'],
    tags: ['Geospatial', 'Real-time Matching', 'WebSockets', 'Surge Pricing'],
    duration: '60 mins',
    free: false,
    description: 'Design a ride-sharing platform that matches riders with drivers in real-time across cities.',
    keyComponents: ['Location Service', 'Matching Engine', 'Trip Service', 'Payment Service', 'Notification Service'],
    requirements: {
      functional: ['Request ride', 'Match driver', 'Real-time tracking', 'Fare calculation', 'Ratings'],
      nonFunctional: ['< 1min match time', '1M concurrent users', 'Geospatial queries', 'Surge pricing'],
    },
    approach: `
1. **Location** — Drivers send GPS every 5s, store in Redis with geospatial index (GEOSEARCH)
2. **Matching** — Find drivers within radius → rank by distance + rating → offer to nearest
3. **WebSockets** — Persistent connections for real-time driver location on map
4. **Trip State** — State machine: REQUESTED → ACCEPTED → ARRIVED → IN_PROGRESS → COMPLETED
5. **Surge Pricing** — Lambda architecture: demand/supply ratio per geohash zone
    `,
    resources: [
      { label: 'Uber Engineering Blog', url: 'https://eng.uber.com/' },
      { label: 'System Design: Uber', url: 'https://www.youtube.com/watch?v=umWABit-wbk' },
    ],
    solveOptions: [
      { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'System architecture' },
      { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Component diagrams' },
    ],
  },
  {
    id: 9,
    type: 'LLD',
    title: 'Design BookMyShow',
    subtitle: 'Movie ticket booking system',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Google'],
    tags: ['OOP', 'Concurrency', 'Booking', 'Seat Selection'],
    duration: '45 mins',
    free: false,
    description: 'Design a movie ticket booking system handling concurrent seat selection across multiple cities.',
    keyComponents: ['Theater', 'Show', 'Seat', 'Booking', 'Payment', 'Notification'],
    requirements: {
      functional: ['Search movies/shows', 'Select seats', 'Book tickets', 'Cancellation', 'Seat lock (5 min)'],
      nonFunctional: ['Concurrent seat locking', 'No double booking', 'Multiple cities/screens'],
    },
    approach: `
1. **Seat Locking** — Optimistic locking with version number, 5-min expiry lock via Redis
2. **Concurrency** — Distributed lock (Redisson) for seat selection
3. **Classes** — Theater → Screen → Show → Seat → Booking → Payment
4. **State** — Seat: AVAILABLE → LOCKED → BOOKED / Booking: INITIATED → CONFIRMED → CANCELLED
5. **Notification** — Event-driven: BookingConfirmed → Email/SMS via Kafka consumer
    `,
    resources: [
      { label: 'BookMyShow LLD', url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview' },
    ],
    solveOptions: [
      { label: 'Code on Replit', url: 'https://replit.com/', icon: '💻', desc: 'Write Java/Python code' },
      { label: 'Design on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Draw class diagrams' },
    ],
  },
  {
    id: 10,
    type: 'HLD',
    title: 'Design Twitter / X',
    subtitle: 'Social media at 300M users',
    difficulty: 'Hard',
    companies: ['Twitter', 'Meta', 'Google'],
    tags: ['Fan-out', 'Timeline', 'Trending', 'Notifications'],
    duration: '60 mins',
    free: false,
    description: 'Design a social media platform with tweet posting, following, timeline generation, and trending topics.',
    keyComponents: ['Tweet Service', 'Timeline Service', 'Follow Service', 'Notification Service', 'Trend Engine'],
    requirements: {
      functional: ['Post tweet', 'Follow/unfollow', 'Timeline feed', 'Search tweets', 'Trending hashtags'],
      nonFunctional: ['300M users', '500M tweets/day', 'Timeline in < 200ms', 'Real-time trends'],
    },
    approach: `
1. **Tweet Storage** — Cassandra (time-series), media in S3 + CDN
2. **Fan-out** — On write (push model) for regular users, on read (pull) for celebrities
3. **Timeline** — Redis sorted set per user: timeline:{userId} → [tweetIds by timestamp]
4. **Trending** — Apache Storm/Flink for real-time hashtag counting with sliding window
5. **Search** — Elasticsearch for full-text tweet search
    `,
    resources: [
      { label: 'Twitter Engineering Blog', url: 'https://blog.twitter.com/engineering' },
      { label: 'System Design: Twitter', url: 'https://www.youtube.com/watch?v=wYk0xPP_P_8' },
    ],
    solveOptions: [
      { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Architecture diagram' },
      { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Detailed design' },
    ],
  },
  {
  id: 7,
  type: 'LLD',
  title: 'Design Call Taxi Booking System',
  subtitle: 'Like Uber / Ola',
  difficulty: 'Medium',
  companies: ['Zoho','Uber','Amazon'],
  tags: ['OOP','Design Patterns','Java','Scheduling'],
  duration: '45 mins',
  free: false,

  description: 'Design a taxi booking system where users can book taxis, drivers get assigned automatically, and fares are calculated based on distance.',

  keyComponents: [
    'TaxiBookingService',
    'Driver',
    'Passenger',
    'Ride',
    'LocationService',
    'FareCalculator'
  ],

  requirements: {
    functional: [
      'Book taxi',
      'Assign nearest driver',
      'Start and end ride',
      'Calculate fare',
      'Show ride history'
    ],
    nonFunctional: [
      'Handle multiple bookings simultaneously',
      'Driver location updates',
      'Low latency ride matching'
    ],
  },

  approach: `
1. **Classes**
   - Passenger
   - Driver
   - Ride
   - Location
   - TaxiBookingService

2. **Driver Matching**
   - Find nearest available driver using distance calculation.

3. **Ride Flow**
   Passenger → request ride → match driver → ride started → ride completed.

4. **Strategy Pattern**
   Different FareCalculation strategies (Normal, Surge).

5. **Observer Pattern**
   Notify driver and passenger for ride status updates.
  `,

  solveOptions: [
    { label: 'Design UML', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Draw class diagrams' },
    { label: 'Code on LeetCode', url: 'https://leetcode.com/', icon: '💻', desc: 'Implement classes in Java' },
  ],
}
]

// Generate remaining 20 pro problems
const MORE_PROBLEMS = [
  { id: 11, type: 'HLD', title: 'Design Instagram', subtitle: 'Photo sharing at 1B users', difficulty: 'Hard', companies: ['Meta', 'Amazon'], tags: ['CDN', 'Image Processing', 'Feed Generation'], duration: '60 mins', free: false },
  { id: 12, type: 'LLD', title: 'Design ATM Machine', subtitle: 'Banking OOP design', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], tags: ['OOP', 'State Machine', 'Security'], duration: '40 mins', free: false },
  { id: 13, type: 'HLD', title: 'Design Dropbox', subtitle: 'Cloud file storage sync', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['File Sync', 'Block Storage', 'Conflict Resolution'], duration: '60 mins', free: false },
  { id: 14, type: 'LLD', title: 'Design Snake & Ladder', subtitle: 'Classic board game OOP', difficulty: 'Easy', companies: ['Amazon', 'Google'], tags: ['OOP', 'Game Design', 'Clean Code'], duration: '30 mins', free: false },
  { id: 15, type: 'HLD', title: 'Design YouTube', subtitle: 'Video platform at 2B users', difficulty: 'Hard', companies: ['Google', 'Amazon', 'Netflix'], tags: ['Video CDN', 'Encoding', 'Recommendations'], duration: '75 mins', free: false },
  { id: 16, type: 'LLD', title: 'Design Elevator System', subtitle: 'Multi-elevator scheduling', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'], tags: ['Scheduling', 'OOP', 'State Machine'], duration: '40 mins', free: false },
  { id: 17, type: 'HLD', title: 'Design Zoom / Video Call', subtitle: 'Real-time video conferencing', difficulty: 'Hard', companies: ['Google', 'Amazon', 'Apple'], tags: ['WebRTC', 'TURN/STUN', 'Recording'], duration: '60 mins', free: false },
  { id: 18, type: 'LLD', title: 'Design Library System', subtitle: 'Book inventory & lending', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], tags: ['OOP', 'CRUD', 'Search'], duration: '35 mins', free: false },
  { id: 19, type: 'HLD', title: 'Design Payment Gateway', subtitle: 'Like Razorpay or Stripe', difficulty: 'Hard', companies: ['Amazon', 'Google'], tags: ['Transaction', 'ACID', 'Security', 'Idempotency'], duration: '60 mins', free: false },
  { id: 20, type: 'LLD', title: 'Design Vending Machine', subtitle: 'Automated product dispensing', difficulty: 'Easy', companies: ['Amazon', 'Apple'], tags: ['State Machine', 'OOP', 'Inventory'], duration: '30 mins', free: false },
  { id: 21, type: 'HLD', title: 'Design Airbnb', subtitle: 'Home rental marketplace', difficulty: 'Hard', companies: ['Amazon', 'Google'], tags: ['Search', 'Booking', 'Payments', 'Reviews'], duration: '60 mins', free: false },
  { id: 22, type: 'LLD', title: 'Design Rate Limiter', subtitle: 'API throttling system', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Netflix'], tags: ['Token Bucket', 'Sliding Window', 'Redis'], duration: '40 mins', free: false },
  { id: 23, type: 'HLD', title: 'Design Notification System', subtitle: 'Push, SMS, Email at scale', difficulty: 'Medium', companies: ['Amazon', 'Meta', 'Google'], tags: ['Push Notifications', 'Kafka', 'Templates'], duration: '45 mins', free: false },
  { id: 24, type: 'LLD', title: 'Design Logger Framework', subtitle: 'Logging library design', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], tags: ['Observer', 'Singleton', 'Strategy'], duration: '35 mins', free: false },
  { id: 25, type: 'HLD', title: 'Design Distributed Cache', subtitle: 'Like Redis/Memcached', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Netflix'], tags: ['Consistent Hashing', 'Eviction', 'Replication'], duration: '60 mins', free: false },
  { id: 26, type: 'LLD', title: 'Design Food Delivery App', subtitle: 'Like Swiggy or Zomato', difficulty: 'Medium', companies: ['Amazon', 'Uber'], tags: ['OOP', 'Order Management', 'Tracking'], duration: '45 mins', free: false },
  { id: 27, type: 'HLD', title: 'Design Stock Exchange', subtitle: 'High-frequency trading platform', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Apple'], tags: ['Order Book', 'Matching Engine', 'Low Latency'], duration: '75 mins', free: false },
  { id: 28, type: 'LLD', title: 'Design Car Rental System', subtitle: 'Vehicle booking & management', difficulty: 'Medium', companies: ['Amazon', 'Uber'], tags: ['OOP', 'Booking', 'Availability'], duration: '40 mins', free: false },
  { id: 29, type: 'HLD', title: 'Design Google Maps', subtitle: 'Navigation & routing at scale', difficulty: 'Hard', companies: ['Google', 'Uber', 'Apple'], tags: ['Graph', 'Dijkstra', 'ETA', 'Traffic'], duration: '75 mins', free: false },
  { id: 30, type: 'LLD', title: 'Design Online Voting System', subtitle: 'Secure e-voting platform', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], tags: ['Security', 'Concurrency', 'Audit Trail'], duration: '40 mins', free: false },
]

const ALL_PROBLEMS = [
  ...PROBLEMS,
  ...MORE_PROBLEMS.map(p => ({ ...p, description: '', keyComponents: [], requirements: { functional: [], nonFunctional: [] }, approach: '', resources: [], solveOptions: [
    { label: 'Draw on Excalidraw', url: 'https://excalidraw.com/', icon: '✏️', desc: 'Free whiteboard' },
    { label: 'Use draw.io', url: 'https://app.diagrams.net/', icon: '🗂️', desc: 'Architecture diagrams' },
  ]}))
]

const diffStyle = {
  Easy:   { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80', border: 'rgba(34,197,94,0.2)'  },
  Medium: { bg: 'rgba(234,179,8,0.1)', color: '#facc15', border: 'rgba(234,179,8,0.2)'  },
  Hard:   { bg: 'rgba(239,68,68,0.1)', color: '#f87171', border: 'rgba(239,68,68,0.2)'  },
}

export default function SystemDesignPage() {
  const { user } = useAuth()
  const isPro = user?.role === 'PRO'

  const [filter, setFilter]   = useState('All') // All | HLD | LLD
  const [expanded, setExpanded] = useState(null)
  const [solveModal, setSolveModal] = useState(null)

  const freeProblem  = ALL_PROBLEMS.filter(p => p.free)
  const proProblems  = ALL_PROBLEMS.filter(p => !p.free)

  const filterFn = (list) => filter === 'All' ? list : list.filter(p => p.type === filter)

  return (
    <div className="max-w-5xl mx-auto space-y-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden mb-8"
        style={{
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1f2d 50%, #0a1a0f 100%)',
          border: '1px solid rgba(34,197,94,0.15)',
          minHeight: 200,
        }}>

        {/* Background grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
                  NEW MODULE
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.3)', color: '#facc15' }}>
                  <Crown size={10} className="inline mr-1" />PRO
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                System Design
                <span className="block" style={{ color: '#4ade80' }}>Interview Prep</span>
              </h1>
              <p className="text-gray-400 text-base max-w-lg leading-relaxed">
                Master HLD & LLD with real problems asked at <strong className="text-white">Google, Amazon, Netflix, Apple</strong>.
                30 problems with detailed approaches, resources & tools.
              </p>

              <div className="flex gap-4 mt-5">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">30</div>
                  <div className="text-gray-500 text-xs">Problems</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black text-white">15</div>
                  <div className="text-gray-500 text-xs">HLD</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black text-white">15</div>
                  <div className="text-gray-500 text-xs">LLD</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: '#4ade80' }}>8</div>
                  <div className="text-gray-500 text-xs">Companies</div>
                </div>
              </div>
            </div>

            {/* Company logos */}
            <div className="flex flex-col gap-3">
              <p className="text-gray-600 text-xs uppercase tracking-widest">Top Companies</p>
              <div className="grid grid-cols-4 gap-2">
                {['Google', 'Amazon', 'Netflix', 'Apple', 'Microsoft', 'Meta', 'Uber', 'Twitter'].map(c => (
                  <div key={c} className="flex flex-col items-center gap-1 group">
                    <div className="rounded-xl p-1.5 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
                      <CompanyLogo name={c} size={28} />
                    </div>
                    <span className="text-gray-600 text-[9px]">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW TO SOLVE ──────────────────────────────────────── */}
      <div className="rounded-2xl p-5 mb-6"
        style={{ backgroundColor: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.2)' }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(14,165,233,0.15)' }}>
            <Layers size={15} style={{ color: '#38bdf8' }} />
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-1">How to solve System Design problems?</p>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              Unlike DSA, System Design has no online compiler. You <strong className="text-white">design on paper/whiteboard</strong> and
              explain your thinking. We've linked to the best free tools below each problem.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '✏️', name: 'Excalidraw', desc: 'Free whiteboard', url: 'https://excalidraw.com/' },
                { icon: '🗂️', name: 'draw.io', desc: 'Architecture & UML diagrams', url: 'https://app.diagrams.net/' },
                { icon: '💻', name: 'LeetCode', desc: 'For LLD coding', url: 'https://leetcode.com/' },
                { icon: '🔧', name: 'Replit', desc: 'Run code online', url: 'https://replit.com/' },
              ].map(tool => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#9ca3af', textDecoration: 'none' }}>
                  <span>{tool.icon}</span>
                  <span className="text-white">{tool.name}</span>
                  <span className="text-gray-600">· {tool.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2">
          {['All', 'HLD', 'LLD'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={filter === f
                ? { backgroundColor: '#22c55e', color: 'white', border: '2px solid #22c55e' }
                : { backgroundColor: '#111827', color: '#9ca3af', border: '1px solid #1f2937' }
              }>
              {f === 'HLD' ? '🏗️ HLD' : f === 'LLD' ? '🧱 LLD' : '🌐 All'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Server size={14} className="text-gray-600" />
          <span className="text-gray-500 text-xs">{ALL_PROBLEMS.length} total · 1 free · {ALL_PROBLEMS.length - 1} pro</span>
        </div>
      </div>

      {/* ── FREE PROBLEMS ─────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-white font-bold text-sm">Free Problems</span>
          <span className="text-xs text-gray-600">· Available to everyone</span>
        </div>
        {filterFn(freeProblem).map(p => (
          <ProblemCard key={p.id} p={p} expanded={expanded} setExpanded={setExpanded} setSolveModal={setSolveModal} />
        ))}
        {filterFn(freeProblem).length === 0 && (
          <p className="text-gray-600 text-sm py-4">No free {filter} problems. Switch to "All" to see the free problem.</p>
        )}
      </div>

      {/* ── PRO PROBLEMS ──────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Crown size={14} className="text-yellow-400" />
          <span className="text-white font-bold text-sm">Pro Problems</span>
          <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">
            {filterFn(proProblems).length} problems
          </span>
          {!isPro && <span className="text-xs text-gray-600">· Upgrade to unlock all</span>}
        </div>

        {isPro ? (
          filterFn(proProblems).map(p => (
            <ProblemCard key={p.id} p={p} expanded={expanded} setExpanded={setExpanded} setSolveModal={setSolveModal} />
          ))
        ) : (
          <>
            {/* Show 3 blurred previews */}
            {filterFn(proProblems).slice(0, 5).map((p, i) => (
              <BlurredCard key={p.id} p={p} i={i} />
            ))}

            {/* Upgrade CTA */}
            <div className="rounded-3xl p-10 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0a0f1a, #0d1f0d)',
                border: '2px solid rgba(234,179,8,0.3)',
              }}>
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(rgba(234,179,8,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.5) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.3)' }}>
                  <Crown size={30} className="text-yellow-400" />
                </div>
                <h3 className="text-white text-2xl font-black mb-2">
                  Unlock {filterFn(proProblems).length} {filter !== 'All' ? filter : ''} System Design Problems
                </h3>
                <p className="text-gray-400 text-sm mb-4 max-w-lg mx-auto">
                  Get full access to HLD & LLD problems asked at Google, Amazon, Netflix, Apple with
                  detailed approaches, key components, and direct links to free design tools.
                </p>

                {/* Company logos row */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  {['Google', 'Amazon', 'Netflix', 'Apple', 'Microsoft', 'Meta'].map(c => (
                    <div key={c} className="rounded-xl p-1.5"
                      style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
                      <CompanyLogo name={c} size={24} />
                    </div>
                  ))}
                </div>

                <Link to="/dashboard/pricing"
                  className="inline-flex items-center gap-2 font-black px-10 py-4 rounded-2xl text-base transition-all hover:scale-105"
                  style={{ backgroundColor: '#f59e0b', color: '#000' }}>
                  <Crown size={18} /> Unlock All 30 Problems — ₹499/month
                </Link>
                <p className="text-gray-600 text-xs mt-3">
                  Also includes: 500 DSA problems · AI Interview Practice · Resume Review · 8 Company Patterns
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Solve Modal */}
      {solveModal && (
        <SolveModal problem={solveModal} onClose={() => setSolveModal(null)} />
      )}
    </div>
  )
}

// ── Problem Card ───────────────────────────────────────────────
function ProblemCard({ p, expanded, setExpanded, setSolveModal }) {
  const isOpen = expanded === p.id
  const ds = diffStyle[p.difficulty]

  return (
    <div className="rounded-2xl mb-3 overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? '1px solid rgba(34,197,94,0.3)' : '1px solid #1f2937',
        backgroundColor: '#111827',
      }}>

      {/* Header */}
      <button onClick={() => setExpanded(isOpen ? null : p.id)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: isOpen ? 'rgba(34,197,94,0.04)' : 'transparent' }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.backgroundColor = '#1a2030' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent' }}>

        {/* Type badge */}
        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-center"
          style={{
            backgroundColor: p.type === 'HLD' ? 'rgba(14,165,233,0.1)' : 'rgba(168,85,247,0.1)',
            border: `1px solid ${p.type === 'HLD' ? 'rgba(14,165,233,0.2)' : 'rgba(168,85,247,0.2)'}`,
          }}>
          {p.type === 'HLD' ? <Globe size={16} style={{ color: '#38bdf8' }} /> : <Code2 size={16} style={{ color: '#c084fc' }} />}
          <span className="text-[9px] font-black mt-0.5" style={{ color: p.type === 'HLD' ? '#38bdf8' : '#c084fc' }}>{p.type}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-white font-bold text-sm">{p.title}</p>
            {p.free && <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded font-bold">FREE</span>}
          </div>
          <p className="text-gray-500 text-xs">{p.subtitle}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {p.companies.slice(0, 4).map(c => (
              <div key={c} className="flex items-center gap-1">
                <CompanyLogo name={c} size={14} />
                <span className="text-gray-600 text-[10px]">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-gray-600 text-xs">
            <BookOpen size={11} />
            {p.duration}
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
            {p.difficulty}
          </span>
          {isOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && p.description && (
        <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid #1f2937' }}>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
            {p.tags.map(t => (
              <span key={t} className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                style={{ backgroundColor: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}>
                {t}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-5">{p.description}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            {/* Requirements */}
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Database size={11} className="text-green-400" /> Functional Requirements
              </p>
              <ul className="space-y-1">
                {p.requirements.functional.map(r => (
                  <li key={r} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={11} className="text-green-500 mt-0.5 flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Server size={11} className="text-blue-400" /> Non-Functional
              </p>
              <ul className="space-y-1">
                {p.requirements.nonFunctional.map(r => (
                  <li key={r} className="flex items-start gap-2 text-xs text-gray-400">
                    <Zap size={11} className="text-blue-400 mt-0.5 flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Components */}
          <div className="mb-5">
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">Key Components</p>
            <div className="flex flex-wrap gap-2">
              {p.keyComponents.map((c, i) => (
                <div key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
                  style={{ backgroundColor: '#0f1923', border: '1px solid #1f2937', color: '#e2e8f0' }}>
                  <span className="text-green-400 font-bold">{i + 1}.</span>{c}
                </div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div className="rounded-xl p-4 mb-5"
            style={{ backgroundColor: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
            <p className="text-green-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers size={11} /> Design Approach
            </p>
            <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-sans">{p.approach.trim()}</pre>
          </div>

          {/* Resources */}
          {p.resources.length > 0 && (
            <div className="mb-5">
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">📚 Study Resources</p>
              <div className="flex flex-wrap gap-2">
                {p.resources.map(r => (
                  <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
                    style={{ backgroundColor: '#1f2937', color: '#60a5fa', border: '1px solid #374151', textDecoration: 'none' }}>
                    <ExternalLink size={10} />{r.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Solve CTA */}
          <div className="rounded-xl p-4"
            style={{ backgroundColor: '#0f1923', border: '1px solid #1f2937' }}>
            <p className="text-white font-bold text-xs mb-3">🛠️ Start Solving</p>
            <div className="flex flex-wrap gap-2">
              {p.solveOptions.map(opt => (
                <a key={opt.label} href={opt.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: 'white', textDecoration: 'none' }}>
                  <span>{opt.icon}</span>
                  <div>
                    <div>{opt.label}</div>
                    <div className="text-gray-500 font-normal text-[10px]">{opt.desc}</div>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-gray-600 text-[10px] mt-3">
              💡 Tip: Design on whiteboard first, then explain your approach out loud. Interviewers value communication over perfection.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Blurred locked card ────────────────────────────────────────
function BlurredCard({ p }) {
  const ds = diffStyle[p.difficulty]
  return (
    <div className="rounded-2xl mb-3 overflow-hidden relative cursor-not-allowed select-none"
      style={{ border: '1px solid rgba(234,179,8,0.15)', backgroundColor: '#111827' }}>
      <div className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,15,26,0.7)' }}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
          <Lock size={13} className="text-yellow-400" />
          <span className="text-yellow-400 text-xs font-bold">Pro Only</span>
          <Crown size={11} className="text-yellow-400" />
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center"
          style={{
            backgroundColor: p.type === 'HLD' ? 'rgba(14,165,233,0.1)' : 'rgba(168,85,247,0.1)',
            border: `1px solid ${p.type === 'HLD' ? 'rgba(14,165,233,0.2)' : 'rgba(168,85,247,0.2)'}`,
          }}>
          {p.type === 'HLD' ? <Globe size={16} style={{ color: '#38bdf8' }} /> : <Code2 size={16} style={{ color: '#c084fc' }} />}
          <span className="text-[9px] font-black mt-0.5" style={{ color: p.type === 'HLD' ? '#38bdf8' : '#c084fc' }}>{p.type}</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">{p.title}</p>
          <p className="text-gray-500 text-xs">{p.subtitle}</p>
          <div className="flex gap-2 mt-1">
            {p.companies.slice(0, 3).map(c => <CompanyLogo key={c} name={c} size={14} />)}
          </div>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
          {p.difficulty}
        </span>
      </div>
    </div>
  )
}

// ── Solve Modal (unused but ready) ────────────────────────────
function SolveModal({ problem, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="rounded-2xl p-6 max-w-md w-full"
        style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
        onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold text-lg mb-1">Choose where to solve</h3>
        <p className="text-gray-400 text-sm mb-4">{problem.title}</p>
        <div className="space-y-3">
          {problem.solveOptions?.map(opt => (
            <a key={opt.label} href={opt.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80 block"
              style={{ backgroundColor: '#1f2937', border: '1px solid #374151', textDecoration: 'none' }}>
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{opt.label}</p>
                <p className="text-gray-500 text-xs">{opt.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-500 ml-auto" />
            </a>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2.5 rounded-xl text-gray-400 text-sm hover:text-white transition-colors"
          style={{ backgroundColor: '#1f2937' }}>
          Close
        </button>
      </div>
    </div>
  )
}