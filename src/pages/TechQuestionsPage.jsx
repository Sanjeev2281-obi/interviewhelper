import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  Lock, Crown, ChevronDown, ChevronUp, Zap, Globe, Tv, ShoppingCart,
  MessageSquare, Car, Music, Building2, Cpu, BookOpen, Network,
  Monitor, Database, Code2, Server, Layers
} from 'lucide-react'

// ── Company Logo SVGs ─────────────────────────────────────────
const CompanyLogo = ({ name, size = 20 }) => {
  const logos = {
    Google:    <svg width={size} height={size} viewBox="0 0 48 48"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>,
    Amazon:    <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#131921"/><text x="24" y="29" textAnchor="middle" fill="#FF9900" fontSize="26" fontWeight="900" fontFamily="Georgia,serif">a</text></svg>,
    Meta:      <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#0866FF"/><path fill="white" d="M10 28c0-6.6 5.4-12 12-12s12 5.4 12 12c0 5-3.1 9.3-7.5 11.1V32h2.5l.5-4H26.5v-2.5c0-1.1.5-2 2.2-2H30v-3.5s-1.5-.3-2.9-.3c-3 0-5.1 1.8-5.1 5v2.8H19l-.5 4H22v7.1C17.1 37.3 10 33.3 10 28z"/></svg>,
    Netflix:   <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#141414"/><path fill="#E50914" d="M13 8h6.5l4.5 14V8h5v32h-6.5L18 26v14h-5z"/></svg>,
    Microsoft: <svg width={size} height={size} viewBox="0 0 48 48"><rect x="4" y="4" width="18" height="18" fill="#F25022"/><rect x="26" y="4" width="18" height="18" fill="#7FBA00"/><rect x="4" y="26" width="18" height="18" fill="#00A4EF"/><rect x="26" y="26" width="18" height="18" fill="#FFB900"/></svg>,
    Apple:     <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#1d1d1f"/><path fill="white" d="M32.5 25.1c-.1-4.4 3.6-6.5 3.7-6.6-2-3-5.2-3.4-6.3-3.4-2.7-.3-5.2 1.6-6.6 1.6-1.4 0-3.5-1.5-5.7-1.5-2.9.1-5.6 1.7-7.1 4.3-3 5.2-.8 12.9 2.2 17.1 1.4 2.1 3.2 4.4 5.4 4.3 2.1-.1 3-1.4 5.6-1.4 2.6 0 3.3 1.4 5.6 1.3 2.3 0 3.8-2.1 5.3-4.1 1.6-2.4 2.3-4.7 2.3-4.8-.1 0-4.4-1.7-4.4-5.8zM28 11.5c1.2-1.5 2-3.5 1.8-5.5-1.7.1-3.9 1.2-5.1 2.6-1.1 1.3-2.1 3.3-1.8 5.2 1.9.1 3.9-.9 5.1-2.3z"/></svg>,
    Uber:      <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#000"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="Arial">UBER</text></svg>,
    Flipkart:  <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#2874F0"/><polygon points="24,10 36,18 36,30 24,38 12,30 12,18" fill="#F8E71C"/><text x="24" y="29" textAnchor="middle" fill="#2874F0" fontSize="10" fontWeight="900" fontFamily="Arial">F</text></svg>,
    TCS:       <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#0A2F6B"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial">TCS</text></svg>,
    Wipro:     <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#341F6E"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="Arial">WIPRO</text></svg>,
    Infosys:   <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#007CC3"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="Arial">INFOSYS</text></svg>,
    Accenture: <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#A100FF"/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="Arial">ACN</text></svg>,
    Cognizant: <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#1B4E9B"/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="Arial">CTS</text></svg>,
    HCL:       <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#0D6B3C"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial">HCL</text></svg>,
    Capgemini: <svg width={size} height={size} viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#0070AD"/><text x="24" y="29" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="Arial">CAP</text></svg>,
  }
  return logos[name] || <div style={{ width: size, height: size, borderRadius: 6, backgroundColor: '#1f2937' }} />
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT-BASED QUESTIONS (FAANG Scenarios)
// ═══════════════════════════════════════════════════════════════
const PRODUCT_QUESTIONS = [
  { id:1, free:true, category:'Scalability', icon:Tv, iconColor:'#ef4444', iconBg:'rgba(239,68,68,0.12)', companies:['Hotstar','Netflix','Amazon'], question:'Hotstar had 30 crore concurrent viewers during IPL final. Why did it not crash?', difficulty:'Hard', tag:'Real Event', answer:{ headline:'CDN pre-warming + adaptive bitrate streaming + AWS auto-scaling + load shedding.', keyPoints:[{title:'CDN Pre-warming',detail:'Content pushed to thousands of CDN edge nodes globally before the match. Viewers get video from the nearest server, not origin.'},{title:'Adaptive Bitrate (ABR)',detail:'HLS/DASH auto-drops quality 1080p→480p→240p when bandwidth is low. Prevents buffering and reduces server load during spikes.'},{title:'AWS Auto-scaling',detail:'Pre-scales to 10x expected load 1 hour before the event using predictive scaling, not reactive.'},{title:'Load Shedding',detail:'If traffic exceeds capacity, gracefully degrade quality instead of crashing. App shows "HD available" only when bandwidth allows.'},{title:'Regional Isolation',detail:'Mumbai viewers get Mumbai servers. Latency kept under 100ms by regional deployment.'}], techStack:['AWS CloudFront CDN','HLS/DASH Streaming','Apache Kafka','Redis (session cache)','Auto Scaling Groups'], interviewTip:'Start with scale → What breaks first? (origin servers, DB) → How do we prevent each failure?' } },
  { id:2, free:true, category:'Scalability', icon:ShoppingCart, iconColor:'#f97316', iconBg:'rgba(249,115,22,0.12)', companies:['Amazon','Flipkart'], question:'Flipkart Big Billion Day — 1 lakh orders in 10 minutes. How does the system handle it?', difficulty:'Hard', tag:'Real Event', answer:{ headline:'Queue-based order processing + Redis inventory locking + pre-scaled infrastructure + circuit breakers.', keyPoints:[{title:'Order Queue (Kafka)',detail:'Orders go into Kafka queue first, not directly to DB. Workers process async — decouples frontend from slow DB writes.'},{title:'Redis Inventory Lock',detail:'Redis DECR is atomic. When you click Buy, Redis decrements count. DB updated async. Prevents overselling.'},{title:'Pre-scaling',detail:'Flipkart spins up 10x normal server count 2 hours before sale. No cold starts during peak.'},{title:'Circuit Breakers',detail:'If payment service goes down, circuit breaker trips → shows "Try again in 30s" instead of cascading failure.'},{title:'Database Sharding',detail:'Orders sharded by user_id. user 1-10M → DB1, 10M-20M → DB2. No single DB handles all 1 lakh orders.'}], techStack:['Apache Kafka','Redis (inventory)','MySQL (sharded)','Hystrix (circuit breaker)','Docker + K8s'], interviewTip:'Key insight: separate write path (fast, async via queue) from read path (cached). Never let 1 lakh users hit the DB simultaneously.' } },
  { id:3, free:true, category:'Real-time Systems', icon:MessageSquare, iconColor:'#22c55e', iconBg:'rgba(34,197,94,0.12)', companies:['Meta','WhatsApp'], question:'WhatsApp delivers messages in under 1 second to 2 billion users. How?', difficulty:'Hard', tag:'Architecture', answer:{ headline:'Persistent WebSocket connections + Erlang/Ejabberd + offline message queue.', keyPoints:[{title:'Persistent TCP Connections',detail:'WhatsApp keeps a permanent WebSocket connection open. No polling — server pushes messages directly the moment they arrive.'},{title:'Erlang / Ejabberd',detail:'Erlang handles millions of concurrent lightweight processes. Each user connection is an Erlang process, not an OS thread.'},{title:'Offline Queue',detail:'If offline, messages stored in queue. On reconnect, queue flushes instantly.'},{title:'E2E Encryption (Signal Protocol)',detail:'Keys generated on-device. Server only routes encrypted blobs — reduces server processing.'},{title:'Minimal Fan-out',detail:'1:1 messages: Sender → Server → Recipient. Groups capped at 1024. Limits fan-out explosion.'}], techStack:['Erlang/OTP (Ejabberd)','XMPP Protocol','WebSockets','Signal Protocol E2E','Media stored on S3'], interviewTip:'"Why Erlang?" — lightweight processes, built-in fault tolerance (let it crash + supervisor trees), built for telecom concurrency.' } },
  { id:4, free:true, category:'Distributed Systems', icon:Globe, iconColor:'#06b6d4', iconBg:'rgba(6,182,212,0.12)', companies:['Google'], question:'Google Search returns results in 0.5 seconds by scanning billions of pages. How?', difficulty:'Hard', tag:'Architecture', answer:{ headline:'Pre-built inverted index + parallel query processing across thousands of servers + aggressive caching.', keyPoints:[{title:'Inverted Index (Pre-computed)',detail:'Google doesn\'t search the web at query time. It searches a pre-built index: every word maps to [list of pages + positions]. Built by crawlers 24/7.'},{title:'Parallel Processing',detail:'Query split across 1000s of servers simultaneously. Each handles one partition of the index. Results merged in milliseconds.'},{title:'Colossus File System',detail:'Distributed file system stores index across thousands of machines. Data replicated 3x for fault tolerance.'},{title:'PageRank Pre-computation',detail:'PageRank scores computed offline. At query time, ranking just looks up pre-computed scores — no graph traversal.'},{title:'Spanner (Global DB)',detail:'Globally distributed SQL DB with atomic clocks for global consistency. Millisecond reads from any data center.'}], techStack:['Colossus (GFS2)','Bigtable','Spanner','MapReduce','TensorFlow (ranking)'], interviewTip:'The magic word: "Pre-computation". Almost everything at large scale is pre-computed offline and cached.' } },
  { id:5, free:true, category:'Ride Sharing', icon:Car, iconColor:'#a855f7', iconBg:'rgba(168,85,247,0.12)', companies:['Uber','Ola'], question:'How does Uber match you with the nearest driver in under 30 seconds across an entire city?', difficulty:'Medium', tag:'Geospatial', answer:{ headline:'S2 geometry cells + real-time driver location in Redis GeoSET + ETA-based ranking.', keyPoints:[{title:'S2 Geometry Library',detail:'City divided into hexagonal S2 cells. Each driver tagged to their cell. Find nearby drivers = find drivers in adjacent S2 cells. O(1) lookup.'},{title:'Driver Location in Redis',detail:'Drivers send GPS every 4 seconds. Stored in Redis GeoSET. GEORADIUS finds all drivers within 5km in microseconds.'},{title:'Dispatch Algorithm',detail:'Not just nearest — ranked by: distance × ETA × surge factor × driver rating. Best composite score gets the request first.'},{title:'City Isolation',detail:'Each city runs on separate dispatch servers. Mumbai rides → Mumbai servers. No global coordination.'},{title:'Timeout & Re-offer',detail:'If driver doesn\'t accept in 15s, offer goes to next best driver. Prevents queue blocking.'}], techStack:['Redis GEORADIUS','S2 Geometry','Apache Kafka','Node.js (dispatch)','Google Maps API'], interviewTip:'"Naive approach: calculate distance to every driver — O(N). Smart: geospatial indexing (S2 cells/geohashing) — O(1)."' } },
  { id:6, free:true, category:'Recommendation', icon:Music, iconColor:'#ec4899', iconBg:'rgba(236,72,153,0.12)', companies:['Netflix','Spotify','YouTube'], question:'Netflix recommends the perfect show instantly. How does their recommendation engine work?', difficulty:'Medium', tag:'ML System', answer:{ headline:'Collaborative filtering + content-based filtering + real-time session signals.', keyPoints:[{title:'Collaborative Filtering',detail:'"Users like you also watched..." — Netflix clusters users by watch history. Pattern mining at massive scale.'},{title:'Content-Based Filtering',detail:'Tags each show: genre, actors, director, mood, pacing. Finds similar content to what you like.'},{title:'Real-time Signals',detail:'Tracks: pause, rewind, watch at 1.5x, abandon at minute 3. Updates your profile in real-time.'},{title:'A/B Testing',detail:'250+ A/B tests at any time. Even thumbnails are personalized — action fans see action thumbnails.'},{title:'Offline vs Online Pipeline',detail:'Offline: batch ML training weekly (Spark). Online: real-time feature lookup (Cassandra). Recommendations = offline model + online freshness.'}], techStack:['Apache Spark (ML)','Cassandra (features)','TensorFlow','Kafka (events)','AWS S3 (model storage)'], interviewTip:'Two-tower model: one tower for user embeddings, one for content. Recommendation = find content vectors closest to user vector.' } },
  { id:7, free:true, category:'High Availability', icon:Globe, iconColor:'#22c55e', iconBg:'rgba(34,197,94,0.12)', companies:['Amazon','Google'], question:'AWS had an outage in us-east-1 and took down Netflix, Slack. Why do companies still use one region?', difficulty:'Medium', tag:'Cloud Architecture', answer:{ headline:'Multi-region is 3-4x expensive + introduces CAP theorem problems. Most companies accept single-region risk.', keyPoints:[{title:'Cost of Multi-Region',detail:'Running in 2 regions costs 3-4x, not 2x. Needs data replication, LBs, engineers for failover.'},{title:'CAP Theorem',detail:'Can\'t have Consistency + Availability + Partition Tolerance simultaneously. Multi-region forces a choice: stale data (AP) or failed requests (CP).'},{title:'Netflix IS Multi-Region',detail:'Netflix runs in 3 AWS regions. During 2021 outage they failed over in minutes — but spent years building this.'},{title:'AZs vs Regions',detail:'Most "single region" deployments use 3 Availability Zones — separate data centers 10-20km apart. Handles most failures.'},{title:'RTO vs RPO',detail:'RTO (how long down) and RPO (how much data loss) define the requirement. 4-hour RTO is fine for startups. Netflix needs 0.'}], techStack:['AWS Multi-AZ','Route 53 (DNS failover)','RDS Multi-AZ','Cross-region replication','CloudFront'], interviewTip:'"Start with multi-AZ, add cross-region read replicas, then active-active only when RTO demands it."' } },
  { id:8, free:true, category:'Database', icon:Cpu, iconColor:'#f59e0b', iconBg:'rgba(245,158,11,0.12)', companies:['Google','Amazon','Microsoft'], question:'UPI processes 10 billion transactions/month. How does it ensure no transaction is processed twice?', difficulty:'Hard', tag:'Financial Systems', answer:{ headline:'Idempotency keys + database unique constraints + two-phase commit + nightly reconciliation.', keyPoints:[{title:'Idempotency Keys',detail:'Every transaction gets a unique transaction_id. Same ID twice → return previous result without reprocessing.'},{title:'ACID Transactions',detail:'Debit and credit in a single ACID transaction. Either both happen or neither. No half-processed payments.'},{title:'Two-Phase Commit (2PC)',detail:'Sending bank (debit) and receiving bank (credit) both confirm before completing. Either fails → both rolled back.'},{title:'Message Deduplication',detail:'NPCI maintains 24-hour dedup window. Same transaction_id rejected as duplicate. Redis with TTL=24h.'},{title:'Reconciliation Jobs',detail:'Nightly batch reconciles all bank ledgers. Any discrepancy triggers automatic reversal.'}], techStack:['IBM Mainframe (core banking)','Redis (dedup cache)','Oracle DB (ACID)','Kafka (async settlement)','NPCI IMPS rails'], interviewTip:'"Idempotency at every layer — API (idempotency keys), DB (unique constraints), message (exactly-once Kafka), reconciliation (nightly batch)."' } },
  { id:9, free:false, category:'Social Media', icon:Globe, iconColor:'#3b82f6', iconBg:'rgba(59,130,246,0.12)', companies:['Twitter','Meta'], question:'When Elon Musk tweets, 100 million people see it instantly. How does Twitter fan-out work at this scale?', difficulty:'Hard', tag:'Fan-out Architecture', answer:{ headline:'Hybrid push-pull: regular users get pre-populated timelines, celebrities use pull on read.', keyPoints:[{title:'Push Model',detail:'On tweet, pushed to all followers\' Redis caches. 1000 followers = 1000 writes. Fast reads, expensive writes.'},{title:'Pull Model for Celebrities',detail:'Elon Musk has 100M followers — can\'t push to 100M caches per tweet. Tweets pulled and merged at read time.'},{title:'Hybrid Approach',detail:'Regular users (<100K): push fan-out. Celebrities (>1M): pull. Your timeline = cached tweets + celebrity tweets fetched on demand.'},{title:'Redis Sorted Set',detail:'timeline:{userId} → [(tweet_id, timestamp)]. Fetch is O(log N). Stores IDs only, not full content.'},{title:'Async via Kafka',detail:'Fan-out done async via Kafka. Tweet published → workers consume → update Redis caches. Decoupled from tweet write.'}], techStack:['Redis Sorted Sets','Apache Kafka','Cassandra (tweets)','Flink (real-time)','FlockDB (social graph)'], interviewTip:'"You can\'t treat all users equally. Celebrities need pull model, or async pre-warming only for active followers."' } },
  { id:10, free:false, category:'Video Streaming', icon:Tv, iconColor:'#ef4444', iconBg:'rgba(239,68,68,0.12)', companies:['YouTube','Netflix'], question:'YouTube gets 500 hours of video uploaded every minute. How is it processed and made playable instantly?', difficulty:'Hard', tag:'Media Processing', answer:{ headline:'Distributed transcoding pipeline with parallel encoding, progressive streaming, CDN distribution.', keyPoints:[{title:'Upload to Raw Storage',detail:'Video uploaded in chunks to Cloud Storage. Not processed during upload — stored raw first.'},{title:'Parallel Transcoding',detail:'Raw video split into GoP segments. Each segment transcoded in parallel: 360p, 480p, 720p, 1080p, 4K simultaneously.'},{title:'Progressive Availability',detail:'Watch at 360p seconds after upload — before higher quality is ready. Higher qualities become available progressively.'},{title:'Container Formats',detail:'MP4 (H.264) for compatibility, WebM (VP9) for Chrome, HLS for iOS. Codec selection automatic by device/browser.'},{title:'CDN Distribution',detail:'After transcoding, segments pushed to global CDN PoPs in 200+ cities. Served from nearest PoP.'}], techStack:['Google Cloud Storage','Custom transcoder','HLS/DASH','Google CDN','Pub/Sub (pipeline events)'], interviewTip:'"500 hrs/min = 30,000 hrs/hr. With 5 quality levels = 150,000 transcoding jobs/hr. Must be fully distributed and parallelized."' } },
  { id:11, free:false, category:'Search', icon:Globe, iconColor:'#4285f4', iconBg:'rgba(66,133,244,0.12)', companies:['Google','Amazon'], question:'Google Autocomplete shows suggestions in under 100ms as you type. How?', difficulty:'Medium', tag:'Trie + Caching', answer:{ headline:'Pre-built trie of popular searches in RAM + aggressive multi-layer caching.', keyPoints:[{title:'In-Memory Trie',detail:'Trie of popular queries in RAM. Each node stores top-10 completions for that prefix. Lookup is O(prefix_length).'},{title:'Pre-warming Cache',detail:'Top 10M query prefixes pre-loaded in Memcached. "how to" → completions already in cache before you finish typing.'},{title:'Federated Approach',detail:'Suggestions from: popular global searches, your history, trending topics, location-specific — merged and ranked.'},{title:'Client-side Debouncing',detail:'Frontend waits 50ms after last keypress before sending request. Prevents a request per letter.'},{title:'Personalization',detail:'Previous "Python tutorial" search → "Python" shows "Python tutorial" before global popular "Python download".'}], techStack:['In-memory Trie (C++)','Memcached','BigTable (personalization)','gRPC (low latency)','Client-side debounce'], interviewTip:'"Most autocomplete queries hit a tiny set of popular prefixes. Cache those top-10M prefixes in RAM = most queries never touch DB."' } },
  { id:12, free:false, category:'Payments', icon:ShoppingCart, iconColor:'#22c55e', iconBg:'rgba(34,197,94,0.12)', companies:['Amazon','Flipkart'], question:'Amazon processes Black Friday — 1000 orders/second. How does inventory stay accurate?', difficulty:'Hard', tag:'Inventory Management', answer:{ headline:'Redis atomic DECR + optimistic locking in DB + oversell buffer + warehouse sharding.', keyPoints:[{title:'Redis Atomic Decrement',detail:'Inventory in Redis. DECR is atomic — no two requests decrement simultaneously. Count > 0 → proceed; else reject.'},{title:'Optimistic Locking in DB',detail:'Each inventory record has version number. If two requests read version=5 and both update, only first succeeds. Second gets conflict, retries.'},{title:'Oversell Buffer',detail:'Amazon sometimes allows slight overselling (102 units when 100 in stock). Compensates via waitlists/substitute SKUs.'},{title:'Warehouse Sharding',detail:'Inventory sharded by warehouse. Seattle DB handles only Seattle stock. No global lock contention.'},{title:'Async DB Sync',detail:'Redis is fast path. MySQL/DynamoDB updated async. Periodic reconciliation catches drift.'}], techStack:['Redis DECR','DynamoDB conditional writes','Kafka (order events)','AWS Lambda','SQS (retry queue)'], interviewTip:'"Redis atomic operations" is the hero answer. Redis is single-threaded — DECR is guaranteed atomic without locks.' } },
  { id:13, free:false, category:'Real-time', icon:MessageSquare, iconColor:'#8b5cf6', iconBg:'rgba(139,92,246,0.12)', companies:['Meta','Google'], question:'Google Docs lets 100 people edit the same document simultaneously without conflicts. How?', difficulty:'Hard', tag:'CRDT / OT', answer:{ headline:'Operational Transformation resolves concurrent edits by transforming operations before applying.', keyPoints:[{title:'Operational Transformation',detail:'Two people type at same position simultaneously — OT adjusts second edit\'s position. INSERT at pos 5 by A shifts B\'s INSERT to pos 6.'},{title:'Operations, Not State',detail:'Not document state — operations: INSERT("H", pos:5), DELETE(pos:10). Sent to server, broadcast to all clients.'},{title:'Server Ordering',detail:'Server assigns global sequence number to every operation. All clients apply in this order. Conflicts resolved deterministically.'},{title:'CRDTs (Modern Alternative)',detail:'Conflict-free Replicated Data Types — mathematical structures that merge without conflicts regardless of order.'},{title:'Cursor Awareness',detail:'Each user\'s cursor broadcast via WebSocket every 500ms. Rendered as colored cursors on all other clients.'}], techStack:['WebSockets','OT algorithm','Google Spanner (storage)','gRPC (operations)','Redis (presence)'], interviewTip:'"Operational Transformation" is the answer. CRDT is the modern answer. Mention both and explain tradeoffs.' } },
  { id:14, free:false, category:'CDN', icon:Globe, iconColor:'#06b6d4', iconBg:'rgba(6,182,212,0.12)', companies:['Netflix'], question:'Netflix serves 15% of global internet traffic. What is Open Connect and how does it work?', difficulty:'Hard', tag:'CDN Architecture', answer:{ headline:'Netflix\'s own CDN with servers physically inside ISPs — eliminating internet transit entirely.', keyPoints:[{title:'Open Connect Appliances',detail:'Netflix ships custom servers to ISPs like Airtel, Jio. Servers sit inside ISP\'s data center. Video comes from inside Airtel, not Netflix HQ.'},{title:'Proactive Caching',detail:'Every night at 2AM, Netflix pushes next day\'s predicted popular content to all OCAs. 95% of popular content cached at ISP by morning.'},{title:'No Internet Transit',detail:'Airtel customer watching Netflix never crosses public internet. Phone → Airtel network → Airtel OCA → Phone.'},{title:'Popularity Prediction',detail:'ML predicts what each region will watch next day. "Squid Game" pre-cached at Jio servers before you search for it.'},{title:'Fallback Chain',detail:'OCA miss → Regional Netflix CDN → Netflix Origin. 95%+ served from OCA, <1% from origin.'}], techStack:['Open Connect Appliances','BGP Routing','FreeBSD (OCA OS)','NGINX','Netflix MSL (encryption)'], interviewTip:'"Bring content to users, not users to content. Negotiate with ISPs directly — bypass the public internet entirely."' } },
  { id:15, free:false, category:'Rate Limiting', icon:Cpu, iconColor:'#f59e0b', iconBg:'rgba(245,158,11,0.12)', companies:['Stripe','Amazon','Google'], question:'Stripe rate limits 1000 req/sec per customer without a global lock. How?', difficulty:'Medium', tag:'Rate Limiting', answer:{ headline:'Token Bucket in Redis with sliding window counters — no global lock needed.', keyPoints:[{title:'Token Bucket',detail:'Each customer gets N tokens. Each request costs 1 token. Refills at R/sec. Bucket empty = rate limited. Redis DECR is atomic.'},{title:'Sliding Window',detail:'Redis ZADD stores timestamps of recent requests. ZCOUNT counts requests in last 60s. Count > limit → reject.'},{title:'Local Rate Limiting First',detail:'Each API server does local in-memory rate limiting first. Only spills to Redis if exceeded. Reduces Redis calls by 90%.'},{title:'Distributed Counters',detail:'Rate limit key = "rate:{customer_id}:{minute}". Sharded by customer_id across Redis cluster.'},{title:'Graceful Headers',detail:'Stripe sends: X-RateLimit-Remaining, X-RateLimit-Reset. Clients can back off intelligently.'}], techStack:['Redis (token bucket)','Nginx (local limiting)','Lua scripts (atomic ops)','Envoy (sidecar)','Prometheus (metrics)'], interviewTip:'Token Bucket = allows burst. Fixed Window = simple but double-burst at boundary. Sliding Window = most accurate but expensive. Know all three.' } },
]

// ═══════════════════════════════════════════════════════════════
// SERVICE-BASED QUESTIONS (TCS, Wipro, etc.)
// ═══════════════════════════════════════════════════════════════
const SERVICE_SUBJECTS = [
  { id: 'oops',       label: 'OOP',       icon: Code2,     color: '#22c55e', bg: 'rgba(34,197,94,0.1)'   },
  { id: 'dbms',       label: 'DBMS',      icon: Database,  color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
  { id: 'os',         label: 'OS',        icon: Monitor,   color: '#a855f7', bg: 'rgba(168,85,247,0.1)'  },
  { id: 'networking', label: 'Networking',icon: Network,   color: '#f97316', bg: 'rgba(249,115,22,0.1)'  },
  { id: 'java',       label: 'Java',      icon: Cpu,       color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  { id: 'sql',        label: 'SQL',       icon: Layers,    color: '#ec4899', bg: 'rgba(236,72,153,0.1)'  },
  { id: 'system',     label: 'System Design', icon: Server,color: '#ef4444', bg: 'rgba(239,68,68,0.1)'  },
  { id: 'dsa',        label: 'DS & Algo', icon: BookOpen,  color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
]

const SERVICE_COMPANIES = ['TCS','Wipro','Infosys','Accenture','Cognizant','HCL','Capgemini']

const SERVICE_QUESTIONS = {
  oops: {
    free: [
      { id:'o1', question:'What is the difference between Abstraction and Encapsulation?', companies:['TCS','Wipro','Infosys'], difficulty:'Easy', answer:'Abstraction hides complexity (showing only what is necessary via abstract classes/interfaces). Encapsulation hides data (wrapping data and methods in a class, using access modifiers). Example: Car steering (abstraction — you don\'t know HOW it works) vs Car engine compartment (encapsulation — engine details hidden inside the bonnet).', example:'Abstraction: interface Shape { double area(); }\nEncapsulation: class BankAccount { private double balance; public void deposit(double amt){...} }', tip:'Abstraction = "what" (hide complexity from user). Encapsulation = "how" (hide implementation details).' },
      { id:'o2', question:'What is polymorphism? Explain compile-time vs runtime polymorphism.', companies:['TCS','Cognizant','Accenture'], difficulty:'Easy', answer:'Polymorphism = "many forms". Same interface, different behavior. Compile-time (static): Method Overloading — same method name, different parameters. Resolved at compile time. Runtime (dynamic): Method Overriding — child class overrides parent method. Resolved at runtime via virtual method table.', example:'Compile-time: add(int a, int b) and add(double a, double b)\nRuntime: Animal.sound() → Dog.sound() says "Woof", Cat.sound() says "Meow"', tip:'In Java, all non-static, non-final, non-private methods are virtual by default — runtime polymorphism works automatically.' },
      { id:'o3', question:'What is the difference between Interface and Abstract Class in Java?', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Medium', answer:'Abstract class: can have instance variables, constructors, concrete methods. A class can extend only ONE abstract class. Interface (Java 8+): all fields are public static final. Can have default/static methods. A class can IMPLEMENT multiple interfaces. When to use: Abstract class for "is-a" relationship with shared state. Interface for "can-do" behavior across unrelated classes.', example:'Abstract: abstract class Vehicle { int speed; abstract void move(); }\nInterface: interface Flyable { void fly(); } interface Swimmable { void swim(); }\nclass Duck extends Animal implements Flyable, Swimmable {...}', tip:'"A dog IS an Animal (abstract class). A dog CAN FLY if it has wings (interface)."' },
      { id:'o4', question:'Explain the SOLID principles with a real-world example.', companies:['Infosys','Accenture','HCL','Capgemini'], difficulty:'Medium', answer:'S - Single Responsibility: A class should have only one reason to change. O - Open/Closed: Open for extension, closed for modification. L - Liskov Substitution: Subtypes must be substitutable for their base types. I - Interface Segregation: Don\'t force classes to implement unused methods. D - Dependency Inversion: Depend on abstractions, not concretions.', example:'S: OrderService handles only order logic (not email — EmailService does that)\nO: Add new payment type by creating new class, not modifying existing\nD: OrderService depends on IPaymentGateway interface, not RazorpayImpl directly', tip:'In interviews: say "SOLID helps write maintainable, testable code. The most important in large projects is Dependency Inversion — it enables mocking in unit tests."' },
    ],
    pro: [
      { id:'o5', question:'What is the difference between composition and inheritance? When to prefer composition?', companies:['TCS','Wipro'], difficulty:'Medium', answer:'"Favor composition over inheritance" (GoF). Inheritance = is-a relationship, creates tight coupling. Composition = has-a relationship, more flexible. Inheritance problem: fragile base class — changing parent breaks children. Composition: change the contained object without affecting the container.', example:'Bad inheritance: class Stack extends ArrayList (Stack IS-NOT-A ArrayList)\nGood composition: class Stack { private ArrayList<Object> list; ... }', tip:'"Composition over inheritance" is a senior-level insight that impresses interviewers.' },
      { id:'o6', question:'Explain Design Patterns: Singleton, Factory, Observer, Strategy.', companies:['Infosys','Accenture','Cognizant'], difficulty:'Hard', answer:'Singleton: Only one instance. Thread-safe via double-checked locking or enum. Factory: Creates objects without specifying exact class. Hides creation logic. Observer: One-to-many dependency. Subject notifies all observers on change (Event system). Strategy: Define family of algorithms, make them interchangeable at runtime (Sorting strategy).', example:'Singleton: Logger.getInstance()\nFactory: ShapeFactory.create("circle") returns Circle\nObserver: EventEmitter in Node.js, Java Swing listeners\nStrategy: Sorter with BubbleSortStrategy or QuickSortStrategy', tip:'Real-world: Spring Framework uses Factory (BeanFactory), Singleton (Spring beans), Observer (ApplicationEvents).' },
      { id:'o7', question:'What is the difference between deep copy and shallow copy?', companies:['TCS','Wipro','HCL'], difficulty:'Easy', answer:'Shallow copy: copies object references. Both original and copy point to SAME nested objects. Changing nested object in copy affects original. Deep copy: copies all objects recursively. Completely independent copy. Change in copy does NOT affect original.', example:'Shallow: Address addr = new Address("Chennai"); Person p2 = p1.clone(); // p2.address == p1.address (same object)\nDeep: p2.address = new Address(p1.address.city); // independent copy', tip:'In Java: Object.clone() is shallow. For deep copy: implement Cloneable and override clone(), or use serialization/deserialization, or copy constructor.' },
      { id:'o8', question:'Explain method hiding vs method overriding.', companies:['TCS','Cognizant'], difficulty:'Medium', answer:'Method Overriding: instance methods. Decision at RUNTIME based on actual object type. Method Hiding: static methods. Decision at COMPILE TIME based on reference type. With overriding, polymorphism works. With hiding, polymorphism does NOT work.', example:'Overriding:\nAnimal a = new Dog(); a.sound(); // calls Dog.sound() — runtime decision\n\nHiding:\nAnimal a = new Dog(); a.staticMethod(); // calls Animal.staticMethod() — compile time decision', tip:'"Static methods belong to class, not to instance — so they cannot be overridden, only hidden."' },
    ]
  },
  dbms: {
    free: [
      { id:'d1', question:'What are the ACID properties? Explain each with a real example.', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'A - Atomicity: All operations in a transaction succeed or all fail. (Bank transfer: debit and credit both happen or neither.) C - Consistency: DB moves from one valid state to another. Constraints maintained. I - Isolation: Concurrent transactions don\'t interfere with each other. D - Durability: Once committed, changes persist even after crash. Stored in non-volatile memory.', example:'Bank transfer Rs 1000 from A to B:\nAtomicity: Debit A AND Credit B (not one without the other)\nIsolation: Another transaction reading A\'s balance won\'t see intermediate state\nDurability: After commit, even if server crashes, transfer is saved', tip:'"ACID is why banks use relational databases and not NoSQL for core transactions."' },
      { id:'d2', question:'What is database normalization? Explain 1NF, 2NF, 3NF.', companies:['TCS','Wipro','HCL','Capgemini'], difficulty:'Medium', answer:'Normalization eliminates data redundancy and update anomalies. 1NF: Each column has atomic (indivisible) values. No repeating groups. 2NF: 1NF + No partial dependency (non-key attribute must depend on WHOLE primary key). 3NF: 2NF + No transitive dependency (non-key attribute must not depend on another non-key attribute).', example:'1NF violation: Phone_Numbers = "9876,8765" (not atomic)\n1NF fix: separate row per phone number\n\n2NF violation: (OrderID, ProductID) → ProductName. ProductName depends only on ProductID (partial)\n2NF fix: separate Products table\n\n3NF violation: StudentID → ZipCode → City. City depends on ZipCode, not StudentID\n3NF fix: separate ZipCode table', tip:'Mnemonic: "The key (1NF), the whole key (2NF), and nothing but the key (3NF)."' },
      { id:'d3', question:'What are different types of JOINs in SQL? Give examples.', companies:['TCS','Wipro','Infosys','Accenture','Cognizant'], difficulty:'Easy', answer:'INNER JOIN: Returns rows where condition matches in BOTH tables. LEFT JOIN: All rows from left table + matching from right. Non-matching right = NULL. RIGHT JOIN: All rows from right + matching from left. FULL OUTER JOIN: All rows from both. Non-matching = NULL. CROSS JOIN: Cartesian product — every row of A × every row of B. SELF JOIN: Join table with itself.', example:'INNER: SELECT * FROM Orders O INNER JOIN Customers C ON O.CustID = C.ID\n-- Only orders that have a matching customer\n\nLEFT: SELECT * FROM Customers C LEFT JOIN Orders O ON C.ID = O.CustID\n-- All customers, even those with no orders (Orders cols = NULL)', tip:'"Left join shows all customers including those who never ordered — useful for finding customers who haven\'t placed orders (WHERE O.OrderID IS NULL)."' },
      { id:'d4', question:'What is an index in a database? How does it improve query performance?', companies:['Infosys','Accenture','HCL'], difficulty:'Medium', answer:'Index is a data structure (B-Tree or Hash) that allows fast lookup of rows without full table scan. Without index: O(N) — scan every row. With B-Tree index: O(log N). Types: Clustered Index (actual data sorted by index — one per table, usually PK). Non-clustered Index (separate structure pointing to data rows — multiple allowed). Covering Index (index includes all query columns — no table lookup needed).', example:'Without index: SELECT * FROM Users WHERE email="john@gmail.com"\n-- Scans all 10 million rows\n\nWith index on email: B-Tree lookup → finds row in O(log 10M) = ~23 comparisons\n\nCREATE INDEX idx_email ON Users(email);', tip:'"Indexes speed up reads but slow down writes (index must be updated on INSERT/UPDATE/DELETE). Don\'t over-index."' },
    ],
    pro: [
      { id:'d5', question:'What are database transactions? Explain isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.', companies:['TCS','Wipro','Infosys'], difficulty:'Hard', answer:'Isolation levels control how transactions see each other\'s changes. Read Uncommitted: Can read dirty (uncommitted) data. Fastest but unreliable. Read Committed (default in PostgreSQL): Can only read committed data. Prevents dirty reads. Repeatable Read (default in MySQL): Same query returns same results within transaction. Prevents non-repeatable reads. Serializable: Transactions run as if sequential. Prevents phantom reads. Slowest.', example:'Dirty Read: T1 updates balance to 100, T2 reads 100, T1 rolls back — T2 read wrong data\nNon-repeatable Read: T1 reads balance=100, T2 updates to 200, T1 reads again = 200 (different result same transaction)\nPhantom Read: T1 counts rows=5, T2 inserts new row, T1 counts again=6', tip:'"In banking apps use Serializable or Repeatable Read. In read-heavy apps like dashboards, Read Committed is fine — better performance."' },
      { id:'d6', question:'What is the difference between SQL and NoSQL? When to use which?', companies:['Accenture','Cognizant','HCL','Capgemini'], difficulty:'Medium', answer:'SQL (Relational): Fixed schema, ACID, JOIN support, vertical scaling. Best for: financial systems, user management, orders — anything needing transactions. NoSQL types: Document (MongoDB) — flexible schema, nested JSON. Key-Value (Redis) — ultra-fast cache. Column (Cassandra) — high write throughput, time-series. Graph (Neo4j) — relationship queries. When to use NoSQL: Massive scale, flexible/evolving schema, no complex JOINs needed.', example:'SQL use case: Bank account, orders, user profiles (need transactions, JOINs)\nMongoDB use case: Product catalog (different fields per product type)\nCassandra use case: IoT sensor data (millions of writes/sec, time-series)\nRedis use case: Session cache, rate limiting, leaderboard', tip:'"Start with PostgreSQL. Switch to NoSQL only when you have a specific scale or schema flexibility problem PostgreSQL can\'t solve."' },
      { id:'d7', question:'Explain stored procedures vs functions vs triggers in SQL.', companies:['TCS','Wipro','Infosys'], difficulty:'Medium', answer:'Stored Procedure: Pre-compiled SQL code stored in DB. Can have input/output params. Cannot be used in SELECT. Can contain DML (INSERT/UPDATE/DELETE). Function: Returns a value. Can be used in SELECT. Should not have side effects. Typically no DML. Trigger: Automatically executes on INSERT/UPDATE/DELETE. Cannot be called manually. Used for audit logging, maintaining derived data.', example:'Stored Proc:\nCREATE PROCEDURE TransferMoney(from_id INT, to_id INT, amount DECIMAL)\nBEGIN\n  UPDATE accounts SET balance = balance - amount WHERE id = from_id;\n  UPDATE accounts SET balance = balance + amount WHERE id = to_id;\nEND;\n\nTrigger:\nCREATE TRIGGER after_salary_update\nAFTER UPDATE ON employees\nFOR EACH ROW INSERT INTO salary_audit VALUES(OLD.salary, NEW.salary, NOW());', tip:'"Triggers are powerful but dangerous — they run automatically and can cause performance issues if poorly designed. Always document them."' },
      { id:'d8', question:'What is a deadlock in database? How to prevent it?', companies:['TCS','Wipro','Accenture'], difficulty:'Hard', answer:'Deadlock: T1 holds lock on A, waits for B. T2 holds lock on B, waits for A. Neither can proceed — circular wait. Prevention strategies: 1) Always acquire locks in the same order (T1 and T2 both lock A then B). 2) Use timeout — if lock not acquired in N seconds, rollback. 3) Deadlock detection — DB detects cycle and kills one transaction. 4) Use optimistic locking instead of pessimistic locking.', example:'Deadlock scenario:\nT1: LOCK A → try LOCK B (waiting)\nT2: LOCK B → try LOCK A (waiting)\n→ Deadlock!\n\nPrevention:\nT1: LOCK A first, then B\nT2: LOCK A first, then B\n→ T2 waits for T1 to release A. No deadlock.', tip:'"MySQL/PostgreSQL detect deadlocks automatically and kill one transaction. But deadlock detection is expensive — prevention via consistent lock ordering is better."' },
    ]
  },
  os: {
    free: [
      { id:'s1', question:'What is the difference between Process and Thread?', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'Process: Independent program in execution. Has its own memory space, PCB, file descriptors. Heavyweight — creation costs ~1-2ms. Isolated — one process crash doesn\'t affect others. Thread: Lightweight unit within a process. Shares memory with other threads in same process. Creation costs ~100μs. Context switch faster than process switch. Communication via shared memory (no IPC needed).', example:'Chrome: Each tab = separate Process (crash isolation)\nWord: Each feature (spell check, autosave) = Thread within same process\n\nThread advantage: Thread A can directly access Thread B\'s variables (shared heap)\nThread disadvantage: Thread A can corrupt Thread B\'s data (race condition)', tip:'"Chrome\'s multi-process architecture explains why one tab crashing doesn\'t kill the whole browser."' },
      { id:'s2', question:'What is a deadlock? Explain the 4 Coffman conditions.', companies:['TCS','Wipro','Infosys'], difficulty:'Medium', answer:'Deadlock: Set of processes permanently blocked waiting for each other. Coffman Conditions (all 4 must hold for deadlock): 1) Mutual Exclusion: Resource held by only one process. 2) Hold and Wait: Process holding resource waits for another. 3) No Preemption: Resource can\'t be forcibly taken. 4) Circular Wait: P1→P2→P3→P1 cycle of waiting.', example:'Dining Philosophers: 5 philosophers, 5 forks. Each needs 2 adjacent forks to eat.\nDeadlock: All pick left fork → all wait for right fork → circular wait!\n\nSolution: One philosopher picks RIGHT fork first (breaks circular wait).', tip:'"To prevent deadlock: break any one Coffman condition. Most practical: break Circular Wait by imposing resource ordering."' },
      { id:'s3', question:'What is virtual memory? How does paging work?', companies:['Accenture','HCL','Capgemini'], difficulty:'Medium', answer:'Virtual Memory: Illusion of more RAM than physically available. Each process thinks it has its own large address space. Paging: Divide virtual address space into fixed-size pages (4KB). Physical RAM divided into frames (same size). Page Table maps virtual page → physical frame. Pages not currently in RAM stored on disk (swap space). Page Fault: When process accesses page not in RAM → OS loads it from disk.', example:'Process A has virtual address 0x1000.\nCPU → MMU translates → Page Table lookup → Physical address 0x4000 in RAM\n\nIf page not in RAM: Page Fault → OS loads page from disk → updates page table → retries\n\nVirtual advantage: 32 processes each thinking they have 4GB RAM, but actual RAM = 16GB', tip:'"Page Fault is not an error — it\'s normal OS behavior. Excessive page faults = "thrashing" = system mostly doing disk I/O instead of work."' },
      { id:'s4', question:'Explain CPU scheduling algorithms: FCFS, SJF, Round Robin, Priority.', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Medium', answer:'FCFS (First Come First Served): Non-preemptive. Simple but convoy effect — short jobs wait behind long ones. SJF (Shortest Job First): Optimal for average waiting time, but starvation of long jobs. Need to know burst time in advance. Round Robin: Each process gets fixed time quantum. Preemptive. Good for time-sharing. Context switch overhead. Priority Scheduling: Higher priority runs first. Preemptive or non-preemptive. Problem: starvation of low priority. Solution: Aging (increase priority over time).', example:'RQ: P1(24ms), P2(3ms), P3(3ms) — time quantum = 4ms\nRound Robin: P1(4)→P2(3)→P3(3)→P1(4)→P1(4)→P1(4)→P1(4)→P1(4)\nP1 finishes at 30ms, P2 at 7ms, P3 at 10ms', tip:'"Modern OS uses Multilevel Feedback Queue — combination of all algorithms. Linux uses CFS (Completely Fair Scheduler) — O(log N) using red-black tree."' },
    ],
    pro: [
      { id:'s5', question:'What are the different types of memory: Stack vs Heap vs Code vs Static?', companies:['TCS','Wipro','HCL'], difficulty:'Medium', answer:'Code Segment: Compiled program instructions. Read-only. Shared between processes running same program. Static/Data Segment: Global variables, static variables. Initialized data section (int x=5) and BSS (uninitialized). Stack: Function call frames. Local variables, parameters, return addresses. Grows down. Fixed size (typically 8MB). Heap: Dynamic allocation (malloc/new). Grows up. Managed by programmer (or GC in Java/Python). Stack is fast (SP increment). Heap requires memory management overhead.', example:'int globalVar = 10; // Static segment\nvoid foo() {\n  int localVar = 5; // Stack\n  int* ptr = malloc(100); // ptr on Stack, 100 bytes on Heap\n}\n// Stack overflow: infinite recursion exhausts 8MB stack', tip:'"Stack overflow in Java: StackOverflowError from deep recursion. Heap memory in Java: OutOfMemoryError. Both map directly to these memory segments."' },
      { id:'s6', question:'What is a mutex vs semaphore? When to use which?', companies:['TCS','Accenture','Cognizant'], difficulty:'Hard', answer:'Mutex (Mutual Exclusion): Binary lock. Only the thread that ACQUIRED it can RELEASE it. Used for protecting critical section. Ownership concept. Semaphore: Counter. Can be acquired by one thread and released by another. Binary semaphore ≈ mutex (but no ownership). Counting semaphore: controls access to N resources. Mutex: Thread safety of shared data. Semaphore: Signaling between threads, limiting concurrent access (e.g., max 5 DB connections).', example:'Mutex:\nlock(mutex); // Thread A acquires\n// critical section\nunlock(mutex); // Only Thread A can unlock\n\nSemaphore (producer-consumer):\nfull.acquire(); // consumer waits until item available\nbuffer.get();\nempty.release(); // signal producer: space available', tip:'"Mutex is a locking mechanism. Semaphore is a signaling mechanism. Mutex = binary semaphore with ownership. Never release a mutex from a different thread — undefined behavior."' },
      { id:'s7', question:'What is context switching? Why is it expensive?', companies:['TCS','Wipro','Infosys'], difficulty:'Medium', answer:'Context Switch: OS saves current process state (PCB: registers, PC, stack pointer, page table) and loads another process\'s state. Cost factors: 1) Save/restore registers (~200 instructions). 2) TLB flush (Translation Lookaside Buffer — cache of page table entries). 3) Cache invalidation — new process has different working set, cold cache. 4) Scheduler decision overhead. Context switch takes ~1-10 microseconds but cache miss penalty can be much higher.', example:'WHY goroutines are cheaper than OS threads:\nOS thread context switch: ~5-10μs + TLB flush + cache miss\nGoroutine switch: ~100ns (no OS involvement, no TLB flush, smaller stack 2KB vs 8MB)', tip:'"Node.js single-threaded model avoids context switches — uses async I/O instead. This is why Node.js handles 10K concurrent connections efficiently."' },
      { id:'s8', question:'What is thrashing in OS? How does the OS prevent it?', companies:['Accenture','HCL','Capgemini'], difficulty:'Hard', answer:'Thrashing: OS spends more time swapping pages in/out of disk than actually executing processes. Cause: Too many processes in RAM, each with insufficient frames. Solution: Working Set Model — track pages a process actually uses in recent N memory references. Ensure each process has at least its working set in RAM. Page Fault Frequency: If PFF too high → allocate more frames. If PFF too low → take away frames for other processes.', example:'System has 100 frames, 5 processes each needing 25 frames = 125 frames\n→ All 5 can\'t fit in RAM simultaneously\n→ Constant page faults → thrashing\n\nSolution: Suspend 1-2 processes to give remaining processes enough frames', tip:'"AWS Lambda functions have memory allocation — under-allocating causes thrashing. Setting 512MB for a function that needs 400MB working set prevents this."' },
    ]
  },
  networking: {
    free: [
      { id:'n1', question:'What happens when you type www.google.com in browser? Explain step by step.', companies:['TCS','Wipro','Infosys','Accenture','Cognizant'], difficulty:'Medium', answer:'1) DNS Resolution: Browser cache → OS cache → Router cache → ISP DNS → Root DNS → .com TLD → Google\'s authoritative DNS → returns 142.250.x.x. 2) TCP Connection: 3-way handshake (SYN → SYN-ACK → ACK). 3) TLS Handshake: ClientHello → ServerHello + Certificate → Key exchange → Encrypted channel. 4) HTTP Request: GET / HTTP/2, sends cookies, headers. 5) Server Processing: Load balancer → app server → maybe DB → render response. 6) Browser Rendering: Parse HTML → DOM → CSS → CSSOM → Render tree → Layout → Paint.', example:'DNS: ~20ms | TCP handshake: ~20ms | TLS: ~30ms | Server: ~50ms | Render: ~70ms\nTotal: ~200ms for a fast website', tip:'"This answer spans all layers of networking and system design. Structure it as: DNS → Transport (TCP/TLS) → Application (HTTP) → Server → Browser."' },
      { id:'n2', question:'What is the OSI model? Explain all 7 layers with examples.', companies:['TCS','Wipro','HCL','Capgemini'], difficulty:'Easy', answer:'L7 Application: HTTP, HTTPS, FTP, DNS, SMTP (what user sees). L6 Presentation: Encryption (SSL/TLS), compression, encoding (JSON→binary). L5 Session: Managing sessions (maintaining state between client-server). L4 Transport: TCP (reliable, ordered, error-checked) / UDP (fast, unreliable). Ports. L3 Network: IP routing, logical addressing (IP addresses). L2 Data Link: MAC addresses, switches, frames. L1 Physical: Bits over cables/WiFi. Voltages, frequencies.', example:'Sending an email:\nL7: SMTP protocol sends email content\nL4: TCP port 25, ensures delivery\nL3: IP packet routed to recipient\'s mail server IP\nL2: Frame delivered to next-hop router MAC\nL1: Transmitted as electrical signals on cable', tip:'"Please Do Not Throw Sausage Pizza Away" = Physical, Data Link, Network, Transport, Session, Presentation, Application.' },
      { id:'n3', question:'TCP vs UDP — when to use which? Give real-world examples.', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'TCP: Connection-oriented, reliable, ordered, error-checked. 3-way handshake. Acknowledgments for every segment. Flow control and congestion control. Higher latency. UDP: Connectionless, no reliability guarantees. No handshake, no ACK. Lower latency. No retransmission.', example:'TCP use cases: HTTP/HTTPS (web), Email (SMTP), File transfer (FTP), Banking\n→ Reliability > speed. Missing a byte of your bank statement is unacceptable.\n\nUDP use cases: Video calls (Zoom, WhatsApp), Live streaming, Online gaming, DNS queries\n→ Speed > reliability. Video call with 1 frame dropped is fine. 500ms delay is not.', tip:'"In video calls, if a packet is late — better to drop the frame than wait for retransmission (TCP). UDP lets the application decide what to do with loss."' },
      { id:'n4', question:'What is the difference between HTTP, HTTPS, HTTP/2, and HTTP/3?', companies:['Infosys','Accenture','HCL'], difficulty:'Medium', answer:'HTTP/1.1: Text-based, one request per TCP connection (or persistent with keep-alive). Head-of-line blocking — one slow request blocks others. HTTPS = HTTP + TLS: Encrypts all traffic. Certificate-based server authentication. HTTP/2: Binary protocol. Multiplexing — multiple requests over one TCP connection simultaneously. Header compression (HPACK). Server Push. HTTP/3 (QUIC): Uses UDP instead of TCP. Eliminates TCP head-of-line blocking. Faster connection establishment (0-RTT resumption). Built-in encryption.', example:'HTTP/1.1: 10 requests → 10 sequential TCP connections (or 6 parallel in browsers)\nHTTP/2: 10 requests → 1 TCP connection, all multiplexed\nHTTP/3: 10 requests → 1 UDP connection, no head-of-line blocking\n\nHTTP/2 result: 50-60% faster page loads', tip:'"HTTP/3 is why Google says "adopt QUIC" — especially for mobile users where TCP handshakes over lossy networks are expensive."' },
    ],
    pro: [
      { id:'n5', question:'What is the difference between IPv4 and IPv6? Why is IPv6 needed?', companies:['TCS','Wipro','Infosys'], difficulty:'Easy', answer:'IPv4: 32-bit address. 2^32 = ~4.3 billion addresses. Format: 192.168.1.1. IPv6: 128-bit address. 2^128 = 340 undecillion addresses. Format: 2001:0db8:85a3:0000:0000:8a2e:0370:7334. IPv4 exhaustion: All IPv4 public addresses allocated by 2011. Temporary solutions: NAT (multiple devices share one public IP), CIDR, private address ranges. IPv6 benefits: No NAT needed, built-in IPSec security, auto-configuration, larger header but faster routing.', example:'IPv4 private ranges: 192.168.x.x (home), 10.x.x.x (enterprise)\nYour home router: 1 public IPv4 IP, NAT translates to 192.168.1.2-254 for all your devices\n\nIPv6: Your phone can have a globally unique address directly', tip:'"India has 700M internet users. With IPv4 exhaustion, every ISP uses CGNAT (Carrier-Grade NAT). IPv6 deployment is accelerating — 50%+ of Google traffic is IPv6."' },
      { id:'n6', question:'What is DNS? Explain the complete DNS resolution process.', companies:['TCS','Accenture','Cognizant'], difficulty:'Medium', answer:'DNS (Domain Name System): Translates human-readable names to IP addresses. Hierarchical distributed database. Resolution steps: 1) Browser cache. 2) OS cache (/etc/hosts, OS DNS cache). 3) Recursive Resolver (ISP\'s DNS server). 4) Root DNS Servers (13 root servers worldwide — know where .com, .in etc. are). 5) TLD DNS (.com nameserver — knows where google.com NS is). 6) Authoritative DNS (google.com\'s own server — returns IP). Result cached at each level with TTL.', example:'Query: www.google.com\nRoot DNS: "I don\'t know google.com but .com is handled by a.gtld-servers.net"\nTLD DNS: "google.com is handled by ns1.google.com"\nAuthoritative: "www.google.com = 142.250.77.78"\n\nTTL = 300s → cached for 5 minutes everywhere', tip:'"Low TTL (60s) = changes propagate fast but more DNS traffic. High TTL (86400s) = efficient caching but slow propagation. Companies use low TTL before planned changes."' },
      { id:'n7', question:'What is a firewall? Difference between stateful and stateless firewall?', companies:['TCS','Wipro','HCL','Capgemini'], difficulty:'Medium', answer:'Firewall: Network security device that monitors and controls incoming/outgoing traffic based on rules. Stateless Firewall: Inspects each packet independently. Based on: source IP, dest IP, port, protocol. Fast but can be bypassed (e.g., spoofed packets). Stateful Firewall: Tracks connection state. Maintains connection table. Knows if a packet is part of an established connection. Blocks packets that don\'t belong to any established connection. More secure, slightly slower.', example:'Stateless: Rule "Allow port 80 inbound" → allows ANY packet to port 80\nAttacker sends RST packet to port 80 → stateless allows it (matches rule)\n\nStateful: Tracks that no SYN was sent for this RST → rejects it\n(RST must belong to an established connection)', tip:'"AWS Security Groups are stateful (you only need to allow inbound — response traffic is automatically allowed). AWS NACLs are stateless (must explicitly allow both inbound and outbound)."' },
      { id:'n8', question:'What is CORS? Why does the browser block cross-origin requests?', companies:['Infosys','Accenture','Cognizant'], difficulty:'Medium', answer:'CORS (Cross-Origin Resource Sharing): Security mechanism preventing malicious websites from making API calls on behalf of users. Same-Origin Policy: Browser blocks JS on evil.com from calling api.bank.com (different origin). CORS allows servers to whitelist specific origins. Preflight: Browser sends OPTIONS request first for non-simple requests (POST with JSON). Server responds with allowed origins/methods/headers. If origin not in allow-list → browser blocks response (request went through but browser hides response).', example:'Scenario:\nYou\'re logged into bank.com (cookie in browser)\nEvil.com JS tries: fetch("https://api.bank.com/transfer", {method:"POST", ...})\nBrowser sends preflight to api.bank.com\nBank\'s CORS: "only bank.com allowed"\n→ Browser blocks evil.com from seeing response\n\nFix for legitimate use:\nAccess-Control-Allow-Origin: https://myapp.com', tip:'"CORS is enforced by browsers, not servers. The API request DOES reach the server — CORS just prevents the browser from giving the response to the requesting page."' },
    ]
  },
  java: {
    free: [
      { id:'j1', question:'What is the difference between == and .equals() in Java?', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'== compares references (memory addresses) for objects. Compares values for primitives. .equals() compares actual content. Can be overridden to define custom equality. By default (Object.equals), == and .equals() behave identically. String, Integer etc. override equals() to compare content.', example:'String a = new String("hello");\nString b = new String("hello");\na == b → false (different objects in heap)\na.equals(b) → true (same content)\n\nString a = "hello"; // String pool\nString b = "hello"; // Same pool object\na == b → true (same reference, String interning)', tip:'"String interning: literal strings go to String pool. new String() creates a new heap object. Always use .equals() for String comparison in production code."' },
      { id:'j2', question:'What is the difference between ArrayList and LinkedList in Java?', companies:['TCS','Wipro','Infosys'], difficulty:'Easy', answer:'ArrayList: Dynamic array. O(1) random access (get(i)). O(n) insert/delete in middle (shift elements). O(1) amortized add at end. Better cache performance (contiguous memory). LinkedList: Doubly linked list. O(n) random access (traverse from head). O(1) insert/delete at known position (just update pointers). O(1) add/remove from front/back. More memory (stores prev/next pointers).', example:'ArrayList: better for: read-heavy, random access, cache-friendly iteration\nLinkedList: better for: frequent insert/delete at front/middle, queue/deque operations\n\nIn practice: Use ArrayList 95% of the time. LinkedList rarely used in modern Java.', tip:'"LinkedList sounds better for insert/delete but in practice ArrayList wins even for inserts because of CPU cache. Benchmarks show ArrayList faster even for many inserts."' },
      { id:'j3', question:'Explain Java Memory Model: Stack vs Heap, Garbage Collection.', companies:['Infosys','Accenture','HCL'], difficulty:'Medium', answer:'Stack: Each thread has its own stack. Stores: local variables, method call frames, object references. LIFO. Automatically managed. Stack Overflow = too deep recursion. Heap: Shared by all threads. Stores: objects, instance variables, arrays. GC Managed. Heap divided: Young Generation (Eden + Survivor spaces) → Old Generation → Metaspace (class metadata). GC Roots: static variables, local variables, active threads. GC marks all reachable objects from roots, sweeps unreachable ones.', example:'void foo() {\n  int x = 5; // Stack\n  String s = new String("hi"); // s (reference) on Stack, "hi" object on Heap\n  Person p = new Person(); // p on Stack, Person object on Heap\n} // s and p references destroyed from Stack. Objects eligible for GC.', tip:'"OOM: OutOfMemoryError: Java heap space → Heap too full. StackOverflowError → Stack too deep. -Xmx sets max heap. -Xss sets stack size."' },
      { id:'j4', question:'What is multithreading in Java? Explain synchronized keyword.', companies:['TCS','Wipro','Cognizant'], difficulty:'Medium', answer:'Thread creation: extend Thread or implement Runnable. synchronized keyword: ensures only one thread executes the synchronized method/block at a time. Acquires the object\'s intrinsic lock (monitor). synchronized method: locks the entire object. synchronized block: more granular — lock a specific object. volatile: ensures variable reads/writes go to main memory (not CPU cache). Doesn\'t guarantee atomicity.', example:'class Counter {\n  private int count = 0;\n  public synchronized void increment() { count++; } // only 1 thread at a time\n  // Without synchronized: count++ is 3 operations — read, increment, write\n  // Race condition: two threads both read 5, both write 6 → count=6 not 7\n}', tip:'"synchronized is fine for simple cases. For high concurrency use java.util.concurrent: ReentrantLock (try-lock), AtomicInteger (lock-free), ConcurrentHashMap (segment locking)."' },
    ],
    pro: [
      { id:'j5', question:'What are Java 8 features? Explain Lambda, Stream API, Optional.', companies:['TCS','Wipro','Infosys','Accenture'], difficulty:'Medium', answer:'Lambda: Anonymous function. Enables functional programming. Reduces boilerplate. Implements Functional Interfaces (1 abstract method). Stream API: Declarative data processing pipeline. Lazy evaluation — intermediate ops not executed until terminal op. Parallel processing easy: .parallelStream(). Optional: Container that may or may not contain a non-null value. Eliminates NullPointerException. Forces explicit null handling.', example:'// Before Lambda:\nCollections.sort(list, new Comparator<String>() {\n  public int compare(String a, String b) { return a.compareTo(b); }\n});\n// After Lambda:\nlist.sort((a, b) -> a.compareTo(b));\n\n// Stream:\nList<String> filtered = names.stream()\n  .filter(n -> n.startsWith("A"))\n  .map(String::toUpperCase)\n  .collect(Collectors.toList());\n\n// Optional:\nOptional<User> user = userRepo.findById(id);\nuser.ifPresent(u -> System.out.println(u.getName()));', tip:'"Stream API replaces for loops for data processing. Key insight: intermediate operations (filter/map) are LAZY — not executed until terminal operation (collect/forEach/count) is called."' },
      { id:'j6', question:'What is the Java Collections Framework? HashMap internals.', companies:['TCS','Wipro','Infosys','HCL'], difficulty:'Hard', answer:'HashMap internals: Array of buckets (default 16). Key → hashCode() → compressed to bucket index. Each bucket is a linked list (or red-black tree if >8 entries). Put: hash key → find bucket → check for existing key (equals()) → add/update. Get: hash key → find bucket → traverse list/tree → return value. Load Factor (default 0.75): When 75% full → resize to 2x and rehash. Java 8+: Bucket becomes red-black tree when >8 entries → O(log n) instead of O(n) for hash collisions.', example:'HashMap<String, Integer> map = new HashMap<>();\nmap.put("apple", 1); // hash("apple") = 92599, bucket = 92599 % 16 = 3, store at bucket[3]\nmap.put("appLe", 2); // different hash → different bucket, no collision\n// If two keys hash to same bucket → linked list/tree at that bucket', tip:'"hashCode() and equals() contract: if a.equals(b) then a.hashCode() == b.hashCode(). Violate this → objects can\'t be found in HashMap."' },
      { id:'j7', question:'What is exception handling in Java? Checked vs Unchecked exceptions.', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'Checked Exception: Compiler forces you to handle or declare them. Extends Exception. e.g., IOException, SQLException. Must use try-catch or throws. Unchecked Exception: Runtime exceptions. Extends RuntimeException. Not checked at compile time. e.g., NullPointerException, ArrayIndexOutOfBoundsException. try-with-resources: Auto-closes Closeable resources (files, DB connections). Finally: Always executes (even after return/exception).', example:'// Checked:\ntry {\n  FileReader f = new FileReader("file.txt"); // throws IOException (checked)\n} catch (IOException e) { e.printStackTrace(); }\n\n// Unchecked:\nString s = null;\ns.length(); // NullPointerException — no compiler warning!\n\n// try-with-resources:\ntry (Connection conn = DriverManager.getConnection(url)) {\n  // conn auto-closed even if exception\n}', tip:'"Best practice: Use checked exceptions for recoverable conditions (file not found — user can retry). Use unchecked for programming errors (null pointer — fix the code)."' },
      { id:'j8', question:'What is the difference between final, finally, and finalize in Java?', companies:['TCS','Wipro','Infosys','Cognizant','HCL'], difficulty:'Easy', answer:'final (keyword): Variable: value cannot be changed (constant). Method: cannot be overridden. Class: cannot be extended (e.g., String class is final). finally (block): Always executes after try-catch, even if exception thrown or return statement executed. Used for cleanup (close connections, files). finalize (method): Called by GC before object is destroyed. Deprecated in Java 9. Unreliable — no guarantee when or if it\'s called. Use try-with-resources or close() instead.', example:'final int MAX = 100; // constant\nfinal class String {} // cannot extend String\n\nvoid method() {\n  try { return; } // return executed\n  finally { System.out.println("cleanup"); } // STILL runs before method returns\n}\n\n@Override\nprotected void finalize() { // Called by GC — avoid in modern Java\n  connection.close(); // Bad: GC may never call this!\n}', tip:'"finalize() is deprecated and unreliable. Never use it for resource cleanup. Always use try-with-resources or explicit close() in finally block."' },
    ]
  },
  sql: {
    free: [
      { id:'q1', question:'What is the difference between WHERE and HAVING clause?', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'WHERE: Filters rows BEFORE grouping. Works on individual rows. Cannot use aggregate functions (SUM, COUNT, AVG). HAVING: Filters groups AFTER GROUP BY. Works on aggregated values. Can use aggregate functions. Order of execution: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', example:'-- Wrong: WHERE with aggregate\nSELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept; -- ERROR!\n\n-- Correct: HAVING for aggregates\nSELECT dept, COUNT(*) as count FROM emp\nGROUP BY dept\nHAVING COUNT(*) > 5; -- departments with more than 5 employees\n\n-- WHERE + HAVING together:\nSELECT dept, AVG(salary) FROM emp\nWHERE location = "Mumbai" -- filter individual rows first\nGROUP BY dept\nHAVING AVG(salary) > 50000; -- filter groups', tip:'"WHERE is for rows, HAVING is for groups. If you can use WHERE, prefer it — WHERE filters early (less data for GROUP BY to process)."' },
      { id:'q2', question:'Write a SQL query to find the second highest salary.', companies:['TCS','Wipro','Infosys','Accenture','Cognizant','HCL'], difficulty:'Medium', answer:'Multiple approaches — all valid. Know at least 2.', example:'-- Method 1: Subquery (most common answer)\nSELECT MAX(salary) FROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);\n\n-- Method 2: DENSE_RANK (handles duplicates)\nSELECT salary FROM (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM employees\n) ranked WHERE rnk = 2;\n\n-- Method 3: LIMIT OFFSET (MySQL)\nSELECT DISTINCT salary FROM employees\nORDER BY salary DESC LIMIT 1 OFFSET 1;\n\n-- Nth highest salary (generalized):\nSELECT salary FROM (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM employees\n) t WHERE rnk = N;', tip:'"Interviewers love DENSE_RANK() approach — handles ties correctly. If 3 employees have salary 90000 (max), subquery method returns 90000 as 2nd highest — wrong!"' },
      { id:'q3', question:'What are SQL indexes? Explain clustered vs non-clustered index.', companies:['TCS','Infosys','Accenture','Cognizant'], difficulty:'Medium', answer:'Clustered Index: Actual data rows sorted and stored according to index key. Only ONE per table (usually PK). Determines physical order of data. InnoDB (MySQL) always has a clustered index. Non-Clustered Index: Separate structure with index key + pointer (RID or clustered key) to actual row. Multiple per table. Doesn\'t affect physical data order. Composite Index: Index on multiple columns. Useful for queries filtering on multiple columns. Follow leftmost prefix rule.', example:'-- Clustered: Physical data sorted by employee_id\nCREATE CLUSTERED INDEX idx_emp ON employees(employee_id);\n-- Query: WHERE employee_id BETWEEN 100 AND 200 → direct range scan\n\n-- Non-clustered: Separate B-tree, points to data rows\nCREATE INDEX idx_email ON employees(email);\n-- Query: WHERE email="john@..." → B-tree lookup → get RID → fetch row\n\n-- Composite:\nCREATE INDEX idx_dept_salary ON employees(department, salary);\n-- Useful for: WHERE department="IT" AND salary > 50000\n-- NOT useful for: WHERE salary > 50000 (no leftmost prefix)', tip:'"Covering index: if index contains all columns in your query, DB never touches the actual table. Ultra-fast. SELECT email, name WHERE email=? — index on (email, name) is covering."' },
      { id:'q4', question:'What are SQL window functions? Explain ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG.', companies:['Infosys','Accenture','HCL','Capgemini'], difficulty:'Hard', answer:'Window functions perform calculations across rows related to current row without collapsing them (unlike GROUP BY). ROW_NUMBER(): Unique sequential number. No ties. 1,2,3,4. RANK(): Skips numbers after ties. 1,2,2,4. DENSE_RANK(): No skips after ties. 1,2,2,3. LAG(col, N): Value from N rows before current row. LEAD(col, N): Value from N rows after current row. Useful for comparing with previous/next records.', example:'SELECT name, salary, dept,\n  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as row_num,\n  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rnk,\n  DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as dense_rnk,\n  LAG(salary, 1, 0) OVER (ORDER BY salary) as prev_salary,\n  LEAD(salary, 1, 0) OVER (ORDER BY salary) as next_salary\nFROM employees;\n\n-- Result for IT dept (salaries 100,90,90,80):\n-- ROW_NUMBER: 1,2,3,4\n-- RANK:       1,2,2,4\n-- DENSE_RANK: 1,2,2,3', tip:'"Window functions are one of the most asked advanced SQL topics. Know the difference between RANK and DENSE_RANK — it\'s a common interview trick question."' },
    ],
    pro: [
      { id:'q5', question:'What is a transaction in SQL? Write example with COMMIT and ROLLBACK.', companies:['TCS','Wipro','Infosys'], difficulty:'Medium', answer:'Transaction groups multiple SQL statements into a single unit. Either all succeed (COMMIT) or all fail (ROLLBACK). SAVEPOINT: Partial rollback within a transaction. BEGIN TRANSACTION: Starts a transaction (auto-commit disabled). COMMIT: Makes all changes permanent. ROLLBACK: Undoes all changes since BEGIN. Implicit transaction: Each DML statement is its own transaction by default (auto-commit=true in MySQL).', example:'-- Bank transfer\nBEGIN TRANSACTION;\n  UPDATE accounts SET balance = balance - 1000 WHERE id = 1; -- Debit\n  UPDATE accounts SET balance = balance + 1000 WHERE id = 2; -- Credit\n  IF @@ERROR <> 0\n    ROLLBACK; -- something went wrong, undo both\n  ELSE\n    COMMIT; -- both succeeded, make permanent\n\n-- With SAVEPOINT:\nBEGIN;\n  INSERT INTO orders VALUES (1, "Product A");\n  SAVEPOINT after_order;\n  INSERT INTO payments VALUES (1, 500); -- this might fail\n  ROLLBACK TO after_order; -- undo only payment, keep order\nCOMMIT;', tip:'"In Spring Boot: @Transactional annotation handles BEGIN/COMMIT/ROLLBACK automatically. Methods throw unchecked exceptions → Spring rolls back automatically."' },
      { id:'q6', question:'What is SQL injection? How to prevent it?', companies:['TCS','Wipro','Infosys','Accenture','Cognizant'], difficulty:'Medium', answer:'SQL Injection: Attacker inserts malicious SQL code via input fields to manipulate database queries. Classic example: login bypass with \' OR 1=1 --. Prevention: 1) Prepared Statements / Parameterized Queries (most important). 2) Stored Procedures. 3) Input validation and escaping. 4) ORM frameworks (Hibernate handles this). 5) Principle of least privilege (DB user has minimal permissions).', example:'// Vulnerable:\nString query = "SELECT * FROM users WHERE name=\'" + username + "\'";\n// If username = "admin\' OR 1=1 --"\n// Query becomes: SELECT * FROM users WHERE name=\'admin\' OR 1=1 --\'\n// Returns ALL users! Bypasses login.\n\n// Safe: Prepared Statement\nPreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE name=?");\nps.setString(1, username); // username is treated as data, not code\n// Input "admin\' OR 1=1 --" becomes literal string, not SQL', tip:'"Always use PreparedStatement or ORM (Hibernate/JPA). Never concatenate user input into SQL strings. This is the #1 web security vulnerability (OWASP Top 10)."' },
      { id:'q7', question:'What is the difference between DELETE, TRUNCATE, and DROP in SQL?', companies:['TCS','Wipro','Infosys','HCL'], difficulty:'Easy', answer:'DELETE: DML. Removes specific rows (WHERE clause). Logged per row. Triggers fire. Can be rolled back. Slow for large deletions. Auto-increment NOT reset. TRUNCATE: DDL. Removes ALL rows. Not logged per row (just deallocates pages). Faster than DELETE. Triggers do NOT fire. Can be rolled back in some DBs (PostgreSQL yes, MySQL no). Resets auto-increment. DROP: DDL. Removes the entire table (structure + data). Cannot be rolled back. Table no longer exists.', example:'DELETE FROM users WHERE id = 5; -- removes 1 row, logged, can rollback\nDELETE FROM users; -- removes all rows, slow (row by row logging)\n\nTRUNCATE TABLE users; -- removes all rows fast, resets auto_increment\n-- users table still exists, just empty\n\nDROP TABLE users; -- table is gone completely!', tip:'"Interview trick: TRUNCATE vs DELETE for clearing a table. TRUNCATE is 10-100x faster for large tables because it doesn\'t log individual row deletions."' },
      { id:'q8', question:'What are Common Table Expressions (CTEs)? How are they different from subqueries?', companies:['Infosys','Accenture','HCL','Capgemini'], difficulty:'Medium', answer:'CTE (WITH clause): Named temporary result set. Defined once, referenced multiple times in query. Improves readability. Supports recursive CTEs (hierarchical data). Subquery: Inline query. Can only be used once. Can be correlated (references outer query). CTEs vs Subqueries: Both same performance in most databases (optimizer handles them similarly). CTEs are more readable for complex queries. Recursive CTEs are unique — no equivalent with regular subqueries.', example:'-- Subquery (hard to read):\nSELECT e.name FROM employees e\nWHERE e.dept_id IN (SELECT d.id FROM departments d WHERE d.budget > 1000000);\n\n-- CTE (readable):\nWITH high_budget_depts AS (\n  SELECT id FROM departments WHERE budget > 1000000\n)\nSELECT e.name FROM employees e\nJOIN high_budget_depts h ON e.dept_id = h.id;\n\n-- Recursive CTE (employee hierarchy):\nWITH RECURSIVE hierarchy AS (\n  SELECT id, name, manager_id, 1 as level FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, h.level+1 FROM employees e\n  JOIN hierarchy h ON e.manager_id = h.id\n)\nSELECT * FROM hierarchy;', tip:'"Recursive CTEs are the only SQL solution for hierarchical data (org charts, bill of materials, filesystem trees). This is a senior-level SQL topic."' },
    ]
  },
  system: {
    free: [
      { id:'sy1', question:'What is the difference between monolithic and microservices architecture?', companies:['TCS','Wipro','Infosys','Accenture'], difficulty:'Medium', answer:'Monolith: Single deployable unit. All features in one codebase. Simple to develop initially. Hard to scale specific components. One bug can crash everything. Deployment: entire app redeployed. Microservices: Collection of small, independent services. Each has its own DB. Communicate via APIs (REST/gRPC) or messages (Kafka). Scale individual services. Independent deployment. Complexity: service discovery, distributed tracing, network latency, data consistency challenges.', example:'Monolith example: Old Flipkart — one codebase with catalog, orders, payments, users all together.\nMicroservices example: New Flipkart — separate services for: ProductService, OrderService, PaymentService, UserService, NotificationService.\n\nWhen to use Monolith: Early startup, small team, simple domain.\nWhen to use Microservices: Large team, different scaling requirements, independent deployment needed.', tip:'"Start with a monolith. Migrate to microservices when: different components need different scaling, different teams own different services, deployment independence needed."' },
      { id:'sy2', question:'What is an API? Difference between REST and SOAP?', companies:['TCS','Wipro','Infosys','Cognizant'], difficulty:'Easy', answer:'API (Application Programming Interface): Contract defining how software components communicate. REST (Representational State Transfer): Architectural style. Uses HTTP methods (GET, POST, PUT, DELETE). JSON/XML. Stateless. Resource-based URLs. Lightweight. Most common for web APIs. SOAP (Simple Object Access Protocol): Protocol. XML-based messaging. WSDL defines contract. Supports WS-Security, WS-Reliability. More complex. Used in enterprise/banking. gRPC: Google\'s RPC framework. Binary (Protocol Buffers). Much faster than REST. Used for microservice communication.', example:'REST:\nGET /users/123 → returns user JSON\nPOST /orders → creates new order\nDELETE /products/456 → deletes product\n\nSOAP:\n<soap:Envelope>\n  <soap:Body>\n    <GetUser><userId>123</userId></GetUser>\n  </soap:Body>\n</soap:Envelope>\n\nREST wins: simple, human-readable, works everywhere (browser, mobile, server)\nSOAP wins: banking (ACID guarantees, WS-Security), legacy enterprise systems', tip:'"95% of new APIs are REST. SOAP exists in legacy banking and enterprise. gRPC is rising for internal microservice communication where performance matters."' },
    ],
    pro: [
      { id:'sy3', question:'What is load balancing? Explain different algorithms.', companies:['TCS','Wipro','Infosys','Accenture'], difficulty:'Medium', answer:'Load Balancer distributes incoming requests across multiple servers to prevent overload and improve availability. Algorithms: Round Robin — each server gets requests in turn. Equal load assumed. Least Connections — route to server with fewest active connections. Best for variable request duration. Weighted Round Robin — servers get proportional traffic based on capacity. IP Hash — same client always goes to same server (session affinity). Health checks: LB pings servers; removes unhealthy ones from rotation.', example:'Round Robin: 3 servers, requests go: S1, S2, S3, S1, S2, S3...\nLeast Connections: S1 has 10 active, S2 has 3, S3 has 8 → new request goes to S2\n\nTypes:\nL4 LB: Routes by IP/port (TCP level) — ultra-fast, dumb\nL7 LB: Routes by URL/headers (HTTP level) — smart routing, more features\n\nExamples: AWS ALB (L7), AWS NLB (L4), Nginx (both), HAProxy', tip:'"In interviews: mention both L4 and L7 load balancing. L4 for raw performance, L7 for smart routing (route /api to one cluster, /static to CDN)."' },
      { id:'sy4', question:'What is caching? Explain cache eviction policies: LRU, LFU, FIFO.', companies:['TCS','Wipro','Infosys','Accenture','Cognizant'], difficulty:'Medium', answer:'Cache: Temporary storage of frequently accessed data for faster retrieval. Types: L1/L2/L3 CPU cache, Browser cache, CDN cache, Application cache (Redis/Memcached). Eviction Policies (when cache is full): LRU (Least Recently Used): Evicts least recently accessed item. Good for temporal locality. LFU (Least Frequently Used): Evicts least often accessed item. Good for popularity-based access. FIFO: Evicts oldest inserted item. Simple but ignores usage patterns. Cache strategies: Cache-aside (lazy loading), Write-through, Write-behind.', example:'LRU example (cache size=3):\nAccess: A, B, C, A, D\nAfter A,B,C: Cache=[A,B,C]\nAfter A: Cache=[B,C,A] (A moved to front)\nAfter D: Cache=[C,A,D] (B evicted — least recently used)\n\nRedis eviction: maxmemory-policy = allkeys-lru (default)\nRedis evicts LRU key when memory full', tip:'"Implement LRU Cache is a classic interview problem. Solution: HashMap (O(1) lookup) + Doubly Linked List (O(1) move to front / remove). Combined = O(1) get and put."' },
    ]
  },
  dsa: {
    free: [
      { id:'a1', question:'What is the time complexity of common data structure operations?', companies:['TCS','Wipro','Infosys','Accenture','Cognizant'], difficulty:'Easy', answer:'Array: Access O(1), Search O(n), Insert/Delete O(n). LinkedList: Access O(n), Insert/Delete at head O(1), at tail O(n) without tail pointer. HashMap: Average O(1) for get/put/delete. Worst O(n) with hash collisions. BST: Average O(log n), Worst O(n) (unbalanced). AVL/Red-Black Tree: O(log n) guaranteed. Heap: Insert O(log n), Extract-min/max O(log n), Get-min/max O(1). Sort: Merge Sort O(n log n), Quick Sort O(n log n) average O(n²) worst.', example:'Which data structure for these requirements?\n- "Find student by ID in O(1)": HashMap\n- "Maintain sorted order with fast insert": BST/TreeMap\n- "Get max score in O(1)": MaxHeap\n- "FIFO queue with O(1) enqueue/dequeue": LinkedList/ArrayDeque\n- "Prefix search (autocomplete)": Trie', tip:'"Space vs Time tradeoff: HashMap uses O(n) space but gives O(1) time. If memory is constraint, use sorted array + binary search: O(log n) time, O(1) extra space."' },
      { id:'a2', question:'What is the difference between BFS and DFS? When to use each?', companies:['TCS','Wipro','Infosys'], difficulty:'Medium', answer:'BFS (Breadth-First Search): Level by level. Uses Queue. Finds SHORTEST PATH in unweighted graphs. Good for: shortest path, level-order traversal, finding nearest neighbor. Space: O(V) — stores entire level. DFS (Depth-First Search): Go deep first. Uses Stack (or recursion). Good for: cycle detection, topological sort, finding paths, maze solving, strongly connected components. Space: O(h) — recursion depth. When to use: Shortest path = BFS. Explore all paths = DFS.', example:'BFS (find shortest path A to F):\nVisit: A → B,C → D,E,F\nF found at level 3 = 3 hops minimum\n\nDFS (find if path exists):\nVisit: A → B → D → backtrack → E → backtrack → C → F\nFound F (might not be shortest path)\n\nReal usage:\nBFS: Social network "6 degrees of separation", GPS shortest route\nDFS: File system search, solving puzzles, Git branch exploration', tip:'"BFS uses more memory (entire frontier). DFS uses less memory (just current path). For wide trees: prefer DFS (BFS would store entire wide level). For deep trees: prefer BFS (DFS might stackoverflow)."' },
    ],
    pro: [
      { id:'a3', question:'What is dynamic programming? Explain with Fibonacci and 0/1 Knapsack.', companies:['Infosys','Accenture','HCL','Capgemini'], difficulty:'Hard', answer:'DP: Optimization technique for problems with overlapping subproblems and optimal substructure. Store solutions to subproblems to avoid recomputation. Two approaches: Top-down (Memoization): Recursive + cache. Bottom-up (Tabulation): Iterative, fill table from base cases. Key insight: if problem has both overlapping subproblems AND optimal substructure → DP is the solution.', example:'Fibonacci (Naive O(2^n) → DP O(n)):\nfib(5) = fib(4) + fib(3)\n       = fib(3)+fib(2) + fib(2)+fib(1) // fib(3) computed twice!\n\nDP Memoization:\nint[] memo = new int[n+1];\nfib(n) = memo[n] != 0 ? memo[n] : memo[n] = fib(n-1) + fib(n-2);\n\n0/1 Knapsack (capacity W, n items with weight/value):\ndp[i][w] = max value using first i items with capacity w\ndp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])\n           // either skip item i, or take item i', tip:'"DP in 3 steps: 1) Define state (what does dp[i] mean?), 2) Recurrence (how is dp[i] related to dp[i-1]?), 3) Base cases. Master this framework."' },
      { id:'a4', question:'What is a Binary Search Tree? How to insert, delete, and balance it?', companies:['TCS','Wipro','Infosys','HCL'], difficulty:'Medium', answer:'BST Property: Left subtree < root < right subtree. Allows O(log n) search, insert, delete for balanced tree. Insert: Recursively compare with current node, go left if smaller, right if larger. Delete: 3 cases: 1) Leaf node → simply remove. 2) One child → replace with child. 3) Two children → replace with inorder successor (smallest in right subtree). Self-balancing BSTs: AVL Tree (strict height balance, more rotations), Red-Black Tree (relaxed balance, fewer rotations — used in Java TreeMap, C++ std::map).', example:'BST Insert 50, 30, 70, 20, 40:\n      50\n     /  \\\n   30    70\n  /  \\\n20   40\n\nSearch 40: 50→(40<50, go left)→30→(40>30, go right)→40 found! O(log n)\n\nUnbalanced problem:\nInsert 1,2,3,4,5: becomes a right-skewed linked list → O(n) search\n\nAVL/RB-Tree: Automatically rotates to maintain balance → O(log n) guaranteed', tip:'"In Java, TreeMap/TreeSet use Red-Black Tree internally. HashMap gives O(1) average but unordered. TreeMap gives O(log n) but maintains sorted order. Use TreeMap when you need sorted keys."' },
    ]
  }
}

// ═══════════════════════════════════════════════════════════════
// DIFF STYLE
// ═══════════════════════════════════════════════════════════════
const diffStyle = {
  Hard:   { bg:'rgba(239,68,68,0.1)',  color:'#f87171', border:'rgba(239,68,68,0.2)'  },
  Medium: { bg:'rgba(234,179,8,0.1)', color:'#facc15', border:'rgba(234,179,8,0.2)'  },
  Easy:   { bg:'rgba(34,197,94,0.1)',  color:'#4ade80', border:'rgba(34,197,94,0.2)'  },
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function TechQuestionsPage() {
  const { user } = useAuth()
  const isPro = user?.role === 'PRO'

  const [mainTab,  setMainTab]  = useState('product') // 'product' | 'service'
  const [expanded, setExpanded] = useState(null)
  const [search,   setSearch]   = useState('')
  const [diff,     setDiff]     = useState('All')
  const [activeSubject, setActiveSubject] = useState('oops')

  // Product-based filters
  const freeQs = PRODUCT_QUESTIONS.filter(q => q.free)
  const proQs  = PRODUCT_QUESTIONS.filter(q => !q.free)
  const applyFilters = list => list.filter(q => {
    const ms = q.question.toLowerCase().includes(search.toLowerCase()) || q.companies.some(c => c.toLowerCase().includes(search.toLowerCase()))
    const md = diff === 'All' || q.difficulty === diff
    return ms && md
  })
  const filteredFree = applyFilters(freeQs)
  const filteredPro  = applyFilters(proQs)
  const proDisplay   = isPro ? filteredPro : filteredPro.slice(0, 6)

  // Service-based
  const subjectData   = SERVICE_QUESTIONS[activeSubject] || { free: [], pro: [] }
  const subjectConfig = SERVICE_SUBJECTS.find(s => s.id === activeSubject)

  return (
    <div className="max-w-5xl mx-auto space-y-5">

      {/* ── HERO ── */}
      <div className="rounded-3xl overflow-hidden relative" style={{ background:'linear-gradient(135deg,#04080f 0%,#0d1f2d 50%,#080f04 100%)', border:'1px solid rgba(34,197,94,0.15)', minHeight:200 }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage:'linear-gradient(rgba(34,197,94,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.4) 1px,transparent 1px)',backgroundSize:'40px 40px' }}/>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background:'radial-gradient(circle,#22c55e,transparent)',filter:'blur(40px)' }}/>
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-black px-3 py-1 rounded-full" style={{ backgroundColor:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.3)',color:'#4ade80' }}>TECHNICAL INTERVIEW PREP</span>
                <span className="text-xs font-black px-3 py-1 rounded-full" style={{ backgroundColor:'rgba(234,179,8,0.15)',border:'1px solid rgba(234,179,8,0.3)',color:'#fbbf24' }}><Crown size={10} className="inline mr-1"/>PRO</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                Technical<br/><span style={{ color:'#4ade80' }}>Interview Questions</span>
              </h1>
              <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
                <strong className="text-white">Product Companies:</strong> Real scenario questions (Hotstar IPL, WhatsApp, Uber) <br/>
                <strong className="text-white">Service Companies:</strong> OOP, DBMS, OS, Networking, Java, SQL core concepts
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-700 text-xs uppercase tracking-widest">Covers</p>
              <div className="grid grid-cols-4 gap-2">
                {['Google','Amazon','Netflix','Apple','TCS','Wipro','Infosys','Accenture'].map(c => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div className="rounded-xl p-1.5" style={{ backgroundColor:'#111827',border:'1px solid #1f2937' }}>
                      <CompanyLogo name={c} size={24}/>
                    </div>
                    <span className="text-gray-700 text-[8px]">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN TAB TOGGLE ── */}
      <div className="flex gap-2 p-1.5 rounded-2xl" style={{ backgroundColor:'#0d1117',border:'1px solid #1f2937' }}>
        <button onClick={() => setMainTab('product')} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
          style={mainTab === 'product'
            ? { background:'linear-gradient(135deg,rgba(34,197,94,0.2),rgba(6,182,212,0.1))', color:'#4ade80', border:'1px solid rgba(34,197,94,0.3)' }
            : { color:'#475569', backgroundColor:'transparent' }}>
          <Globe size={15}/> 🏢 Product-Based Companies
          <span className="text-[10px] px-2 py-0.5 rounded-full font-black" style={{ backgroundColor:'rgba(34,197,94,0.15)',color:'#4ade80' }}>FAANG</span>
        </button>
        <button onClick={() => setMainTab('service')} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
          style={mainTab === 'service'
            ? { background:'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(59,130,246,0.1))', color:'#c084fc', border:'1px solid rgba(168,85,247,0.3)' }
            : { color:'#475569', backgroundColor:'transparent' }}>
          <Building2 size={15}/> 🏭 Service-Based Companies
          <span className="text-[10px] px-2 py-0.5 rounded-full font-black" style={{ backgroundColor:'rgba(168,85,247,0.15)',color:'#c084fc' }}>TCS · Wipro · Infosys</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PRODUCT-BASED TAB
      ══════════════════════════════════════════════════════════ */}
      {mainTab === 'product' && (
        <div className="space-y-5">
          {/* Info bar */}
          <div className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor:'rgba(14,165,233,0.06)',border:'1px solid rgba(14,165,233,0.2)' }}>
            <Zap size={16} className="text-cyan-400 mt-0.5 flex-shrink-0"/>
            <p className="text-gray-400 text-xs leading-relaxed">
              Real scenario questions asked at FAANG companies. <strong className="text-white">Structure your answer:</strong> State the scale → What breaks first → How each component prevents failure → Mention tech stack.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"/>
              <input type="text" placeholder="Search by scenario or company..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none"
                style={{ backgroundColor:'#111827',border:'1px solid #1f2937' }}/>
            </div>
            <select value={diff} onChange={e => setDiff(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none"
              style={{ backgroundColor:'#111827',border:'1px solid #1f2937' }}>
              {['All','Hard','Medium','Easy'].map(d => <option key={d} value={d}>{d === 'All' ? 'All Difficulty' : d}</option>)}
            </select>
          </div>

          {/* Free questions */}
          {filteredFree.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={13} className="text-green-400"/>
                <span className="text-white font-bold text-sm">Free Scenario Questions</span>
                <span className="text-gray-600 text-xs">· {filteredFree.length} questions</span>
              </div>
              <div className="space-y-3">
                {filteredFree.map(q => <ProductCard key={q.id} q={q} expanded={expanded} setExpanded={setExpanded}/>)}
              </div>
            </div>
          )}

          {/* Pro questions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown size={13} className="text-yellow-400"/>
              <span className="text-white font-bold text-sm">Pro Scenario Questions</span>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">{filteredPro.length} questions</span>
              {!isPro && <span className="text-gray-600 text-xs">· Upgrade to unlock</span>}
            </div>
            <div className="space-y-3">
              {isPro
                ? filteredPro.map(q => <ProductCard key={q.id} q={q} expanded={expanded} setExpanded={setExpanded}/>)
                : <>
                    {proDisplay.map(q => <ProductBlurCard key={q.id} q={q}/>)}
                    <UpgradeCTA count={proQs.length} type="product"/>
                  </>
              }
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          SERVICE-BASED TAB
      ══════════════════════════════════════════════════════════ */}
      {mainTab === 'service' && (
        <div className="space-y-5">
          {/* Companies */}
          <div className="rounded-2xl p-4" style={{ backgroundColor:'rgba(168,85,247,0.05)',border:'1px solid rgba(168,85,247,0.2)' }}>
            <p className="text-purple-300 font-bold text-xs mb-3 flex items-center gap-2">
              <Building2 size={13}/> Questions asked at:
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_COMPANIES.map(c => (
                <div key={c} className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ backgroundColor:'#111827',border:'1px solid #1f2937' }}>
                  <CompanyLogo name={c} size={16}/>
                  <span className="text-gray-300 text-xs font-semibold">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject tabs */}
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Select Subject</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SERVICE_SUBJECTS.map(s => {
                const Icon = s.icon
                const isActive = activeSubject === s.id
                return (
                  <button key={s.id} onClick={() => { setActiveSubject(s.id); setExpanded(null) }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all"
                    style={isActive
                      ? { backgroundColor: s.bg, color: s.color, border:`2px solid ${s.color}40` }
                      : { backgroundColor:'#0d1117', color:'#475569', border:'1px solid #1f2937' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isActive ? s.color+'30' : '#1f2937' }}>
                      <Icon size={14} style={{ color: isActive ? s.color : '#475569' }}/>
                    </div>
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Subject header */}
          {subjectConfig && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: subjectConfig.bg, border:`1px solid ${subjectConfig.color}30` }}>
              {(() => { const Icon = subjectConfig.icon; return <Icon size={16} style={{ color: subjectConfig.color }}/> })()}
              <p className="font-bold text-sm" style={{ color: subjectConfig.color }}>
                {subjectConfig.label} Interview Questions
                <span className="font-normal text-xs ml-2 opacity-70">
                  · {subjectData.free.length} free + {subjectData.pro.length} pro questions
                  · Asked at {SERVICE_COMPANIES.join(', ')}
                </span>
              </p>
            </div>
          )}

          {/* Free subject questions */}
          {subjectData.free.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={13} className="text-green-400"/>
                <span className="text-white font-bold text-sm">Free Questions</span>
                <span className="text-gray-600 text-xs">· {subjectData.free.length} questions</span>
              </div>
              <div className="space-y-3">
                {subjectData.free.map(q => <ServiceCard key={q.id} q={q} expanded={expanded} setExpanded={setExpanded} subjectConfig={subjectConfig}/>)}
              </div>
            </div>
          )}

          {/* Pro subject questions */}
          {subjectData.pro.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown size={13} className="text-yellow-400"/>
                <span className="text-white font-bold text-sm">Pro Questions</span>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">{subjectData.pro.length} questions</span>
              </div>
              {isPro
                ? <div className="space-y-3">{subjectData.pro.map(q => <ServiceCard key={q.id} q={q} expanded={expanded} setExpanded={setExpanded} subjectConfig={subjectConfig}/>)}</div>
                : <>
                    <div className="space-y-3">{subjectData.pro.slice(0,3).map(q => <ServiceBlurCard key={q.id} q={q} subjectConfig={subjectConfig}/>)}</div>
                    <div className="mt-3"><UpgradeCTA count={subjectData.pro.length} type="service" subject={subjectConfig?.label}/></div>
                  </>
              }
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT QUESTION CARD
// ═══════════════════════════════════════════════════════════════
function ProductCard({ q, expanded, setExpanded }) {
  const isOpen = expanded === q.id
  const ds = diffStyle[q.difficulty]
  const Icon = q.icon
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: isOpen ? '1px solid rgba(34,197,94,0.3)' : '1px solid #1f2937', backgroundColor:'#111827' }}>
      <button onClick={() => setExpanded(isOpen ? null : q.id)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: isOpen ? 'rgba(34,197,94,0.03)' : 'transparent' }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.backgroundColor = '#1a2030' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent' }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: q.iconBg }}>
          <Icon size={18} style={{ color: q.iconColor }}/>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {q.companies.slice(0,3).map(c => (
              <div key={c} className="flex items-center gap-1">
                <CompanyLogo name={c} size={13}/>
                <span className="text-gray-600 text-[10px] font-medium">{c}</span>
              </div>
            ))}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: q.iconBg, color: q.iconColor }}>{q.category}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor:'rgba(99,102,241,0.1)',color:'#818cf8',border:'1px solid rgba(99,102,241,0.2)' }}>{q.tag}</span>
            {q.free && <span className="text-[9px] font-black bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded">FREE</span>}
          </div>
          <p className="text-white font-bold text-sm leading-relaxed">{q.question}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full hidden sm:block" style={{ backgroundColor: ds.bg, color: ds.color, border:`1px solid ${ds.border}` }}>{q.difficulty}</span>
          {isOpen ? <ChevronUp size={15} className="text-gray-400"/> : <ChevronDown size={15} className="text-gray-400"/>}
        </div>
      </button>
      {isOpen && q.answer && (
        <div className="px-5 pb-6 pt-2" style={{ borderTop:'1px solid #1f2937' }}>
          <div className="rounded-xl p-4 mb-5 mt-3" style={{ backgroundColor:'rgba(34,197,94,0.05)',border:'1px solid rgba(34,197,94,0.15)' }}>
            <p className="text-green-400 font-black text-xs uppercase tracking-wider mb-1.5">⚡ One-Line Answer</p>
            <p className="text-white text-sm leading-relaxed font-medium">{q.answer.headline}</p>
          </div>
          <p className="text-white font-bold text-xs uppercase tracking-wider mb-3">🔑 Key Technical Points</p>
          <div className="space-y-3 mb-5">
            {q.answer.keyPoints.map((kp, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor:'#0f1923' }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ backgroundColor: q.iconBg, color: q.iconColor }}>{i+1}</div>
                <div>
                  <p className="text-white font-bold text-xs mb-1">{kp.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{kp.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">🛠️ Tech Stack</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {q.answer.techStack.map(t => (
              <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ backgroundColor:'#1f2937',color:'#94a3b8',border:'1px solid #374151' }}>{t}</span>
            ))}
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor:'rgba(234,179,8,0.05)',border:'1px solid rgba(234,179,8,0.2)' }}>
            <p className="text-yellow-400 font-black text-xs uppercase tracking-wider mb-1.5">🎯 Interview Tip</p>
            <p className="text-yellow-200/80 text-xs leading-relaxed">{q.answer.interviewTip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SERVICE QUESTION CARD
// ═══════════════════════════════════════════════════════════════
function ServiceCard({ q, expanded, setExpanded, subjectConfig }) {
  const isOpen = expanded === q.id
  const ds = diffStyle[q.difficulty]
  const color  = subjectConfig?.color  || '#22c55e'
  const bgCol  = subjectConfig?.bg     || 'rgba(34,197,94,0.1)'
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ border: isOpen ? `1px solid ${color}40` : '1px solid #1f2937', backgroundColor:'#111827' }}>
      <button onClick={() => setExpanded(isOpen ? null : q.id)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: isOpen ? `${color}08` : 'transparent' }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.backgroundColor = '#1a2030' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent' }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {q.companies.slice(0,3).map(c => (
              <div key={c} className="flex items-center gap-1">
                <CompanyLogo name={c} size={13}/>
                <span className="text-gray-600 text-[10px]">{c}</span>
              </div>
            ))}
            {!q.free && <span className="text-[9px] font-black bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded">PRO</span>}
            {q.free  && <span className="text-[9px] font-black bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded">FREE</span>}
          </div>
          <p className="text-white font-bold text-sm leading-relaxed">{q.question}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: ds.bg, color: ds.color, border:`1px solid ${ds.border}` }}>{q.difficulty}</span>
          {isOpen ? <ChevronUp size={15} className="text-gray-400"/> : <ChevronDown size={15} className="text-gray-400"/>}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-6 pt-2" style={{ borderTop:'1px solid #1f2937' }}>
          {/* Answer */}
          <div className="rounded-xl p-4 mb-4 mt-3" style={{ backgroundColor: bgCol, border:`1px solid ${color}30` }}>
            <p className="font-black text-xs uppercase tracking-wider mb-2" style={{ color }}>📖 Answer</p>
            <p className="text-gray-200 text-sm leading-relaxed">{q.answer}</p>
          </div>
          {/* Code example */}
          {q.example && (
            <div className="mb-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">💻 Code Example</p>
              <pre className="text-green-300 text-xs leading-relaxed p-4 rounded-xl overflow-x-auto" style={{ backgroundColor:'#0a1a0a',border:'1px solid rgba(34,197,94,0.2)',fontFamily:"'Fira Code',monospace",whiteSpace:'pre-wrap' }}>{q.example}</pre>
            </div>
          )}
          {/* Interview tip */}
          {q.tip && (
            <div className="rounded-xl p-4" style={{ backgroundColor:'rgba(234,179,8,0.05)',border:'1px solid rgba(234,179,8,0.2)' }}>
              <p className="text-yellow-400 font-black text-xs uppercase tracking-wider mb-1.5">🎯 Interview Tip</p>
              <p className="text-yellow-200/80 text-xs leading-relaxed">{q.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// BLURRED CARDS
// ═══════════════════════════════════════════════════════════════
function ProductBlurCard({ q }) {
  const ds = diffStyle[q.difficulty]; const Icon = q.icon
  return (
    <div className="rounded-2xl overflow-hidden relative cursor-not-allowed select-none" style={{ border:'1px solid rgba(234,179,8,0.15)',backgroundColor:'#111827' }}>
      <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ backdropFilter:'blur(6px)',backgroundColor:'rgba(10,15,26,0.65)' }}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor:'rgba(234,179,8,0.1)',border:'1px solid rgba(234,179,8,0.3)' }}>
          <Lock size={12} className="text-yellow-400"/><span className="text-yellow-400 text-xs font-bold">Pro Only</span><Crown size={11} className="text-yellow-400"/>
        </div>
      </div>
      <div className="flex items-start gap-4 px-5 py-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: q.iconBg }}><Icon size={18} style={{ color: q.iconColor }}/></div>
        <div className="flex-1">
          <div className="flex gap-2 mb-1.5">{q.companies.slice(0,2).map(c => <div key={c} className="flex items-center gap-1"><CompanyLogo name={c} size={13}/><span className="text-gray-600 text-[10px]">{c}</span></div>)}</div>
          <p className="text-white font-bold text-sm">{q.question}</p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: ds.bg, color: ds.color, border:`1px solid ${ds.border}` }}>{q.difficulty}</span>
      </div>
    </div>
  )
}

function ServiceBlurCard({ q, subjectConfig }) {
  const ds = diffStyle[q.difficulty]
  const color = subjectConfig?.color || '#22c55e'
  return (
    <div className="rounded-2xl overflow-hidden relative cursor-not-allowed select-none" style={{ border:'1px solid rgba(234,179,8,0.15)',backgroundColor:'#111827' }}>
      <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ backdropFilter:'blur(6px)',backgroundColor:'rgba(10,15,26,0.65)' }}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor:'rgba(234,179,8,0.1)',border:'1px solid rgba(234,179,8,0.3)' }}>
          <Lock size={12} className="text-yellow-400"/><span className="text-yellow-400 text-xs font-bold">Pro Only</span>
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex-1">
          <div className="flex gap-2 mb-1.5 flex-wrap">{q.companies.slice(0,3).map(c => <div key={c} className="flex items-center gap-1"><CompanyLogo name={c} size={13}/><span className="text-gray-600 text-[10px]">{c}</span></div>)}</div>
          <p className="text-white font-bold text-sm">{q.question}</p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: ds.bg, color: ds.color, border:`1px solid ${ds.border}` }}>{q.difficulty}</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// UPGRADE CTA
// ═══════════════════════════════════════════════════════════════
function UpgradeCTA({ count, type, subject }) {
  return (
    <div className="rounded-3xl p-8 text-center relative overflow-hidden mt-4"
      style={{ background:'linear-gradient(135deg,#040810,#0a150a)',border:'2px solid rgba(234,179,8,0.3)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:'linear-gradient(rgba(234,179,8,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(234,179,8,0.5) 1px,transparent 1px)',backgroundSize:'30px 30px' }}/>
      <div className="relative z-10">
        <Crown size={28} className="text-yellow-400 mx-auto mb-3"/>
        <h3 className="text-white text-xl font-black mb-2">
          Unlock {count} {subject ? subject + ' ' : ''}{type === 'service' ? 'Core Subject' : 'Scenario'} Questions
        </h3>
        <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
          {type === 'service'
            ? `Complete answers with code examples, interview tips for all ${subject} questions asked at TCS, Wipro, Infosys, Accenture, Cognizant, HCL, Capgemini.`
            : 'Full access to real-world scenario questions from Google, Amazon, Netflix, Apple with detailed technical explanations.'
          }
        </p>
        <Link to="/dashboard/pricing"
          className="inline-flex items-center gap-2 font-black px-8 py-3.5 rounded-2xl text-sm transition-all hover:scale-105"
          style={{ backgroundColor:'#f59e0b',color:'#000' }}>
          <Crown size={15}/> Upgrade to Pro — ₹499/month
        </Link>
        <p className="text-gray-600 text-xs mt-3">Also includes: 500 DSA · System Design · AI Interview · Resume Review</p>
      </div>
    </div>
  )
}