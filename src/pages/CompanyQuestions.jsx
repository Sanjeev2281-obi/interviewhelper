import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Crown, Lock, ChevronDown, ChevronUp, ExternalLink,
  CheckCircle, Clock, Code2, Brain, FileText, Users, Zap
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const COMPANIES = [
  {
    id: 'zoho',
    name: 'Zoho',
    free: true,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.2)',
    roles: ['Software Engineer', 'Technical Support', 'Product Manager'],
    difficulty: 'Medium',
    avgPackage: '₹5–12 LPA',
    rounds: [
      {
        round: 1,
        title: 'Aptitude + Technical MCQs',
        duration: '90 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: 'Online written test with aptitude (quantitative, reasoning, verbal) and technical MCQs on C, Java, Data Structures.',
        topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'C Programming', 'Data Structures MCQs', 'DBMS Basics', 'OS Concepts'],
        tips: 'Practice GeeksforGeeks MCQs. Focus on pointers in C, sorting algorithms, and basic SQL queries.',
      },
      {
        round: 2,
        title: 'Programming Test (DSA)',
        duration: '120 mins',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'Solve 5 coding problems of increasing difficulty. Tests your problem solving and code quality.',
        topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Recursion', 'Sorting & Searching', 'Basic DP'],
        tips: 'Write clean, commented code. They value code quality. Solve all 5 even partially — partial marks are given.',
        problems: [
          { title: 'Reverse a Linked List', difficulty: 'easy', link: 'https://leetcode.com/problems/reverse-linked-list/' },
          { title: 'Valid Parentheses', difficulty: 'easy', link: 'https://leetcode.com/problems/valid-parentheses/' },
          { title: 'Find Duplicates in Array', difficulty: 'easy', link: 'https://leetcode.com/problems/find-the-duplicate-number/' },
          { title: 'Anagram Check', difficulty: 'easy', link: 'https://leetcode.com/problems/valid-anagram/' },
          { title: 'Binary Search Tree Operations', difficulty: 'medium', link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
        ],
      },
      {
        round: 3,
        title: 'Advanced Programming',
        duration: '90 mins',
        icon: '🔥',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'Harder DSA problems + OOP design. They may ask you to design a small system or extend your previous code.',
        topics: ['Dynamic Programming', 'Graph Traversal', 'OOP Design', 'String Manipulation', 'Tree Problems', 'Heaps & Priority Queue'],
        tips: 'Focus on DP patterns (knapsack, LCS, LIS). Know BFS/DFS well. Practice OOP design — they love designing real-world systems.',
      },
      {
        round: 4,
        title: 'HR + Managerial Round',
        duration: '45 mins',
        icon: '🤝',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Discussion about your background, projects, Zoho products, and career goals. Also tests cultural fit.',
        topics: ['Tell me about yourself', 'Why Zoho?', 'Project walkthrough', 'Team collaboration', 'Zoho product knowledge', 'Salary negotiation'],
        tips: 'Research Zoho products (Zoho CRM, Zoho Books, Zoho One). Show genuine interest in product development. Zoho values long-term commitment.',
      },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    free: false,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.2)',
    roles: ['SDE-1', 'SDE-2', 'Data Engineer'],
    difficulty: 'Hard',
    avgPackage: '₹20–45 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Assessment (OA)',
        duration: '105 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '2 DSA problems + Work Simulation Test (Workstyle Assessment). Timed, auto-graded.',
        topics: ['Arrays', 'Strings', 'Trees', 'DP', 'Amazon Leadership Principles', 'Workstyle Assessment'],
        tips: 'OA is strictly timed. Practice on HackerRank. Read Amazon Leadership Principles (16 of them) — they influence everything.',
      },
      {
        round: 2,
        title: 'Technical Phone Screen',
        duration: '60 mins',
        icon: '📞',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: '1–2 DSA problems with live coding + 1–2 Leadership Principle behavioral questions.',
        topics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Trees', 'Leadership Principles (STAR)'],
        tips: 'Think aloud always. Start with brute force, then optimize. For behavioral: prepare STAR stories for each LP.',
        problems: [
          { title: 'Two Sum', difficulty: 'easy', link: 'https://leetcode.com/problems/two-sum/' },
          { title: 'LRU Cache', difficulty: 'medium', link: 'https://leetcode.com/problems/lru-cache/' },
          { title: 'Number of Islands', difficulty: 'medium', link: 'https://leetcode.com/problems/number-of-islands/' },
        ],
      },
      {
        round: 3,
        title: 'Virtual On-Site (4 Loops)',
        duration: '4 × 60 mins',
        icon: '🖥️',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: '4 back-to-back interviews: 2 DSA + 1 System Design + 1 Leadership/Behavioral. Each interviewer covers 2 Leadership Principles.',
        topics: ['Hard DSA', 'System Design (HLD)', 'Leadership Principles', 'Behavioral (STAR)', 'Object Oriented Design'],
        tips: 'Each loop has a "bar raiser." Be consistent. For SD: Design URL shortener, parking lot, WhatsApp. Always relate answers back to LPs.',
      },
      {
        round: 4,
        title: 'Bar Raiser Round',
        duration: '60 mins',
        icon: '⭐',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.1)',
        border: 'rgba(239,68,68,0.2)',
        description: 'A neutral interviewer (not from your team) who has veto power. Focuses on culture fit + a hard problem.',
        topics: ['Amazon Culture & LPs', 'Hard DSA / Puzzle', 'Situational Judgment', 'Long-term goals'],
        tips: 'The bar raiser is checking if you raise the average bar of Amazon. Be genuine. Avoid canned answers.',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    free: false,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.1)',
    border: 'rgba(14,165,233,0.2)',
    roles: ['SDE', 'SDE-2', 'Principal Engineer'],
    difficulty: 'Hard',
    avgPackage: '₹25–55 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Test',
        duration: '90 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '3–4 DSA coding questions on Codility or HackerRank.',
        topics: ['Arrays', 'Strings', 'Recursion', 'Binary Search', 'Basic Trees'],
        tips: 'Focus on correctness first. Edge cases matter a lot at Microsoft.',
      },
      {
        round: 2,
        title: 'Technical Interview × 3',
        duration: '45 mins each',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: '3 technical rounds with different engineers. Each focuses on DSA + some behavioral.',
        topics: ['Hard DSA', 'Trees & Graphs', 'DP', 'System Design Basics', 'OOP', 'Code Quality'],
        tips: 'Communicate your thought process. Interviewers at MS value how you approach problems more than the final answer.',
        problems: [
          { title: 'Binary Tree Level Order Traversal', difficulty: 'medium', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
          { title: 'Clone Graph', difficulty: 'medium', link: 'https://leetcode.com/problems/clone-graph/' },
          { title: 'Serialize Binary Tree', difficulty: 'hard', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
        ],
      },
      {
        round: 3,
        title: 'System Design (LLD/HLD)',
        duration: '60 mins',
        icon: '🏗️',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Design a real-world system. May include LLD (class diagrams, OOP) or HLD (scalability, databases).',
        topics: ['Design Patterns', 'LLD: Parking Lot, Chess, BookMyShow', 'HLD: URL Shortener, WhatsApp', 'REST API Design', 'Database Design', 'Scalability'],
        tips: 'Start with requirements → high-level design → deep dive. Draw diagrams. Discuss trade-offs.',
      },
      {
        round: 4,
        title: 'As-Appropriate (AA) Round',
        duration: '60 mins',
        icon: '🎯',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'With a senior engineer or manager. Mix of technical depth + leadership potential.',
        topics: ['Past project deep dive', 'Technical decision making', 'Growth mindset', 'Conflict resolution', 'Culture fit'],
        tips: 'Be ready to defend every technical decision in your resume. Know your projects deeply.',
      },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    free: false,
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    border: 'rgba(74,222,128,0.2)',
    roles: ['L3 SWE', 'L4 SWE', 'Staff Engineer'],
    difficulty: 'Very Hard',
    avgPackage: '₹35–80 LPA',
    rounds: [
      {
        round: 1,
        title: 'Resume Screening + Recruiter Call',
        duration: '30 mins',
        icon: '📋',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: 'Recruiter call to assess background, experience, and motivation. No coding.',
        topics: ['Career story', 'Why Google', 'Role expectations', 'Visa/location', 'Timeline'],
        tips: 'Be concise about your experience. Show passion for large-scale engineering problems.',
      },
      {
        round: 2,
        title: 'Phone Screen (Technical)',
        duration: '45 mins',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: '1–2 coding problems on Google Docs (no IDE). Tests problem-solving + communication.',
        topics: ['Arrays', 'Strings', 'Hash Maps', 'Trees', 'Graphs', 'Time/Space Complexity'],
        tips: 'Practice coding without autocomplete. Google uses Google Docs — get used to plain text coding.',
        problems: [
          { title: 'Word Search', difficulty: 'medium', link: 'https://leetcode.com/problems/word-search/' },
          { title: 'Trapping Rain Water', difficulty: 'hard', link: 'https://leetcode.com/problems/trapping-rain-water/' },
        ],
      },
      {
        round: 3,
        title: 'On-Site Interviews × 4-5',
        duration: '45 mins each',
        icon: '🔥',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: '4–5 rounds: 2–3 coding + 1 system design + 1 Googleyness/leadership.',
        topics: ['Hard DSA', 'Graphs & Trees', 'DP', 'System Design (HLD)', 'Googleyness', 'Leadership'],
        tips: 'Google values "Googleyness" — intellectual humility, collaboration, fun. For SD: think about billions of users from the start.',
      },
      {
        round: 4,
        title: 'System Design (HLD)',
        duration: '45 mins',
        icon: '🏗️',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Design highly scalable systems. Google expects you to think at massive scale.',
        topics: ['Design Google Search', 'Design YouTube', 'Design Maps', 'CAP Theorem', 'Distributed Systems', 'Load Balancing', 'Sharding'],
        tips: 'Start with scale requirements. Always mention trade-offs. Know CAP theorem, consistent hashing, and CDN.',
      },
      {
        round: 5,
        title: 'Hiring Committee Review',
        duration: 'Internal',
        icon: '⭐',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.1)',
        border: 'rgba(239,68,68,0.2)',
        description: 'Your packet goes to a hiring committee (HC). They review all feedback and decide hire/no-hire.',
        topics: ['All interview feedback reviewed', 'Calibration against Google standards', 'Compensation discussion'],
        tips: 'Nothing you can do at this stage — but strong consistent performance across all rounds matters most.',
      },
    ],
  },
  {
    id: 'walmart',
    name: 'Walmart Global Tech',
    free: false,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.2)',
    roles: ['Software Engineer', 'Senior SDE', 'Data Engineer'],
    difficulty: 'Medium-Hard',
    avgPackage: '₹15–35 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Coding Test',
        duration: '90 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '2–3 DSA problems on HackerRank. Focus on medium-level questions.',
        topics: ['Arrays', 'Strings', 'Trees', 'Basic DP', 'SQL Queries'],
        tips: 'Walmart heavily uses Java and SQL. Practice SQL along with DSA.',
        problems: [
          { title: 'Coin Change', difficulty: 'medium', link: 'https://leetcode.com/problems/coin-change/' },
          { title: 'Number of Islands', difficulty: 'medium', link: 'https://leetcode.com/problems/number-of-islands/' },
        ],
      },
      {
        round: 2,
        title: 'Technical Interview × 2',
        duration: '60 mins each',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'DSA problems + technical discussion on system design basics and Java/Spring Boot.',
        topics: ['DSA', 'Java Core', 'Spring Boot', 'Microservices Basics', 'SQL & NoSQL', 'REST APIs'],
        tips: 'Know Java deeply — collections, multithreading, memory management. Walmart is a Java-heavy shop.',
      },
      {
        round: 3,
        title: 'System Design (LLD)',
        duration: '60 mins',
        icon: '🏗️',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Design a retail/e-commerce system. Think inventory management, order processing, payment systems.',
        topics: ['Design Shopping Cart', 'Design Inventory System', 'Order Management', 'Payment Gateway', 'Microservices', 'Kafka/Queues'],
        tips: 'Research Walmart tech blog. They deal with massive scale during events like Black Friday — mention scalability.',
      },
      {
        round: 4,
        title: 'HR + Managerial',
        duration: '45 mins',
        icon: '🤝',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'Culture fit, past experience, career goals, Walmart values alignment.',
        topics: ['Why Walmart?', 'Past projects', 'Conflict resolution', 'Team leadership', 'Walmart values'],
        tips: 'Walmart values "Service to the Customer" and "Respect for the Individual." Show alignment with these.',
      },
    ],
  },
  {
    id: 'infosys',
    name: 'Infosys',
    free: false,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
    border: 'rgba(167,139,250,0.2)',
    roles: ['Systems Engineer', 'Technology Analyst', 'Senior Engineer'],
    difficulty: 'Easy-Medium',
    avgPackage: '₹3.6–8 LPA',
    rounds: [
      {
        round: 1,
        title: 'Infosys Hackwithinfy / InfyTQ',
        duration: '3 hours',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: 'Online test: Aptitude + Verbal + Logical + 2 coding problems on HackerRank.',
        topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal English', 'Arrays', 'Strings', 'Basic Algorithms'],
        tips: 'Get InfyTQ certified — it gives direct interview call. Coding problems are easy-medium. Focus on passing all test cases.',
      },
      {
        round: 2,
        title: 'Technical Interview',
        duration: '30–45 mins',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'Basic DSA + DBMS + OS + your project discussion.',
        topics: ['OOPs concepts', 'DBMS (SQL, normalization)', 'OS (process, threads)', 'Networking basics', 'Project explanation'],
        tips: 'Infosys focuses on basics. Know your final year project very well. DBMS is heavily asked.',
        problems: [
          { title: 'Reverse a String', difficulty: 'easy', link: 'https://leetcode.com/problems/reverse-string/' },
          { title: 'Fibonacci Number', difficulty: 'easy', link: 'https://leetcode.com/problems/fibonacci-number/' },
        ],
      },
      {
        round: 3,
        title: 'HR Interview',
        duration: '20–30 mins',
        icon: '🤝',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Standard HR questions — personality, background, relocation, salary expectations.',
        topics: ['Introduce yourself', 'Strengths & weaknesses', 'Where do you see yourself in 5 years', 'Relocation flexibility', 'Salary expectations'],
        tips: 'Be confident and honest. Infosys HR is straightforward. Show willingness to learn and relocate.',
      },
    ],
  },
  {
    id: 'tcs',
    name: 'TCS',
    free: false,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    border: 'rgba(236,72,153,0.2)',
    roles: ['Systems Engineer', 'IT Analyst', 'Digital Engineer'],
    difficulty: 'Easy',
    avgPackage: '₹3.36–7 LPA',
    rounds: [
      {
        round: 1,
        title: 'TCS NQT (National Qualifier Test)',
        duration: '180 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: 'Numerical Ability + Verbal + Reasoning + Programming Logic + Coding (2 problems)',
        topics: ['Numerical Ability', 'Verbal Ability', 'Reasoning Ability', 'Programming Logic', 'Coding (C/Java/Python)'],
        tips: 'NQT score determines your role (Systems Engineer vs Digital). Practice TCS previous papers on PrepInsta.',
      },
      {
        round: 2,
        title: 'Technical Interview',
        duration: '20–30 mins',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'Basics of programming, DBMS, one coding question, and project discussion.',
        topics: ['C/Java basics', 'OOPs', 'SQL queries', 'Data Structures basics', 'Final year project'],
        tips: 'TCS is entry-level friendly. Know basic sorting, searching, SQL joins. Be confident about your project.',
      },
      {
        round: 3,
        title: 'Managerial + HR',
        duration: '30 mins',
        icon: '🤝',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Combined manager and HR round. Situational questions + HR formalities.',
        topics: ['Situational judgment', 'Team work', 'Relocation', 'Bond agreement', 'Career goals'],
        tips: 'TCS has a service bond. Be clear about relocation. Show long-term commitment.',
      },
    ],
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    free: false,
    color: '#facc15',
    bg: 'rgba(250,204,21,0.1)',
    border: 'rgba(250,204,21,0.2)',
    roles: ['SDE-1', 'SDE-2', 'Data Engineer'],
    difficulty: 'Hard',
    avgPackage: '₹18–40 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Coding Round',
        duration: '90 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '3 coding problems on HackerRank — easy to hard difficulty.',
        topics: ['Arrays', 'Strings', 'Trees', 'DP', 'Greedy'],
        tips: 'All 3 problems must be fully solved to proceed. Time management is key.',
      },
      {
        round: 2,
        title: 'Technical Interviews × 2',
        duration: '60 mins each',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'DSA + System Design basics + code walkthrough on whiteboard/Google Docs.',
        topics: ['Hard DSA', 'Graphs & Trees', 'System Design Basics', 'OOP', 'Java/Python', 'Code Review'],
        tips: 'Flipkart loves graph problems and DP. Practice Dijkstra, Floyd-Warshall, and DP on trees.',
        problems: [
          { title: 'Word Ladder', difficulty: 'hard', link: 'https://leetcode.com/problems/word-ladder/' },
          { title: 'Merge K Sorted Lists', difficulty: 'hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
        ],
      },
      {
        round: 3,
        title: 'System Design (HLD + LLD)',
        duration: '60 mins',
        icon: '🏗️',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Design an e-commerce feature — search, recommendation, cart, order management.',
        topics: ['Design Flipkart Search', 'Design Recommendation Engine', 'Order Management System', 'Flash Sale System', 'Payment Gateway'],
        tips: 'Think about Flipkart scale — millions of users, flash sales. Mention caching, CDN, queue-based processing.',
      },
      {
        round: 4,
        title: 'Culture Fit + HR',
        duration: '30 mins',
        icon: '🤝',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'Flipkart values ownership, bias for action, and customer obsession.',
        topics: ['Why Flipkart?', 'Past impact stories', 'Ownership examples', 'Customer focus', 'Ambiguity handling'],
        tips: "Flipkart's culture is similar to Amazon. Use STAR stories. Show you've driven impact, not just completed tasks.",
      },
    ],
  },
  {
    id: 'uber',
    name: 'Uber',
    free: false,
    color: '#1fbad6',
    bg: 'rgba(31,186,214,0.1)',
    border: 'rgba(31,186,214,0.2)',
    roles: ['SDE-1', 'SDE-2', 'Backend Engineer'],
    difficulty: 'Hard',
    avgPackage: '₹25–45 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Coding Test',
        duration: '90 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '3–4 coding problems on HackerRank/LeetCode covering arrays, strings, graphs, and design problems.',
        topics: ['Arrays', 'Strings', 'Graphs', 'Dynamic Programming', 'Design Patterns'],
        tips: 'Focus on optimal solutions and clean code. Uber emphasizes correctness under constraints.',
      },
      {
        round: 2,
        title: 'Technical Interviews × 2',
        duration: '60 mins each',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'DSA + OOP + small system design. Interviewers check problem-solving skills and scalability thinking.',
        topics: ['Hard DSA', 'Graphs', 'Trees', 'OOP', 'Concurrency', 'Hashing'],
        tips: 'Practice graph algorithms, DP, and coding with constraints. Be ready to explain your approach clearly.',
      },
      {
        round: 3,
        title: 'System Design',
        duration: '60 mins',
        icon: '🏗️',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.2)',
        description: 'Design a ride-hailing or delivery system: real-time matching, queues, and scalability.',
        topics: ['Ride Matching System', 'Notification System', 'Driver-Partner Allocation', 'Map Services'],
        tips: 'Focus on scalability, latency, and handling millions of concurrent requests.',
      },
      {
        round: 4,
        title: 'Culture + HR',
        duration: '30 mins',
        icon: '🤝',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'Uber values ownership, customer obsession, and operational excellence.',
        topics: ['Past Projects', 'Ownership', 'Problem-Solving Stories', 'Ambiguity Handling'],
        tips: 'Use STAR stories and show measurable impact. Be ready to discuss trade-offs in previous projects.',
      },
    ],
  },
  
  {
    id: 'snapchat',
    name: 'Snapchat',
    free: false,
    color: '#fffc00',
    bg: 'rgba(255,252,0,0.1)',
    border: 'rgba(255,252,0,0.2)',
    roles: ['SDE-1', 'SDE-2', 'Frontend/Backend Engineer'],
    difficulty: 'Medium',
    avgPackage: '₹20–35 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Coding Test',
        duration: '75 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '2–3 coding problems focused on strings, arrays, and basic graph traversal.',
        topics: ['Arrays', 'Strings', 'Hashing', 'Graphs', 'Recursion'],
        tips: 'Solve with clean code and optimize for time & space. Snapchat often tests edge cases.',
      },
      {
        round: 2,
        title: 'Technical Interviews',
        duration: '60 mins each',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'DSA + system design basics + problem-solving discussions.',
        topics: ['Graphs & Trees', 'Dynamic Programming', 'OOP', 'Concurrency'],
        tips: 'Be ready to explain your approach and write bug-free code on whiteboard/Google Docs.',
      },
      {
        round: 3,
        title: 'Culture + HR',
        duration: '30 mins',
        icon: '🤝',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'Snap values creativity, initiative, and collaborative mindset.',
        topics: ['Why Snapchat?', 'Past impact stories', 'Problem-solving mindset'],
        tips: 'Show you can think creatively and handle ambiguous situations.',
      },
    ],
  },
  
  {
    id: 'oracle',
    name: 'Oracle',
    free: false,
    color: '#f80000',
    bg: 'rgba(248,0,0,0.1)',
    border: 'rgba(248,0,0,0.2)',
    roles: ['SDE', 'Backend Engineer', 'Database Engineer'],
    difficulty: 'Medium',
    avgPackage: '₹15–30 LPA',
    rounds: [
      {
        round: 1,
        title: 'Online Coding Test',
        duration: '90 mins',
        icon: '📝',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.1)',
        border: 'rgba(59,130,246,0.2)',
        description: '3 coding problems on arrays, SQL queries, and basic data structures.',
        topics: ['Arrays', 'Strings', 'SQL', 'Hashing', 'Trees'],
        tips: 'Oracle focuses on correctness and understanding of database concepts along with coding.',
      },
      {
        round: 2,
        title: 'Technical Interviews × 2',
        duration: '60 mins each',
        icon: '💻',
        color: '#22c55e',
        bg: 'rgba(34,197,94,0.1)',
        border: 'rgba(34,197,94,0.2)',
        description: 'DSA + OOP + SQL + system design basics.',
        topics: ['LinkedList', 'Trees', 'HashMaps', 'Database design', 'OOP'],
        tips: 'Be clear in explaining your logic and trade-offs.',
      },
      {
        round: 3,
        title: 'HR + Culture',
        duration: '30 mins',
        icon: '🤝',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.2)',
        description: 'Oracle values teamwork, learning agility, and ownership.',
        topics: ['Past projects', 'Teamwork', 'Problem-solving approach'],
        tips: 'Show how you contribute to the team and solve complex problems efficiently.',
      },
    ],
  },
]

const diffBadge = {
  easy:       { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80', border: 'rgba(34,197,94,0.2)' },
  medium:     { bg: 'rgba(234,179,8,0.1)',  color: '#facc15', border: 'rgba(234,179,8,0.2)' },
  hard:       { bg: 'rgba(239,68,68,0.1)',  color: '#f87171', border: 'rgba(239,68,68,0.2)' },
  'Easy':         { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80',  border: 'rgba(34,197,94,0.2)' },
  'Medium':       { bg: 'rgba(234,179,8,0.1)', color: '#facc15',  border: 'rgba(234,179,8,0.2)' },
  'Hard':         { bg: 'rgba(239,68,68,0.1)', color: '#f87171',  border: 'rgba(239,68,68,0.2)' },
  'Medium-Hard':  { bg: 'rgba(249,115,22,0.1)', color: '#fb923c', border: 'rgba(249,115,22,0.2)' },
  'Very Hard':    { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  'Easy-Medium':  { bg: 'rgba(34,197,94,0.1)',  color: '#86efac',  border: 'rgba(34,197,94,0.2)' },
}

export default function CompanyQuestions() {
  const { user } = useAuth()
  const isPro = user?.role === 'PRO'
  const [selected, setSelected] = useState('zoho')
  const [openRound, setOpenRound] = useState(null)

  const company = COMPANIES.find(c => c.id === selected)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Company Interview Patterns</h1>
          <p className="text-gray-400 text-sm mt-1">Round-by-round breakdown for top tech companies</p>
        </div>
        {!isPro && (
          <Link to="/dashboard/pricing"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Crown size={14} /> Unlock All Companies
          </Link>
        )}
      </div>

      {/* Company Tabs */}
      <div className="flex flex-wrap gap-2">
        {COMPANIES.map(c => {
          const locked = !c.free && !isPro
          return (
            <button
              key={c.id}
              onClick={() => !locked && setSelected(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selected === c.id ? 'text-white' : locked ? 'opacity-40 cursor-not-allowed' : 'opacity-60 hover:opacity-100'
              }`}
              style={selected === c.id
                ? { backgroundColor: c.bg, border: `2px solid ${c.color}`, color: c.color }
                : { backgroundColor: '#111827', border: '1px solid #1f2937', color: '#9ca3af' }
              }
            >
              {locked && <Lock size={11} />}
              {c.name}
              {c.free && <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-bold">FREE</span>}
            </button>
          )
        })}
      </div>

      {/* Company Overview */}
      {company && (
        <>
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: `1px solid ${company.border}` }}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">{company.name}</h2>
                <p className="text-gray-400 text-sm mt-1">Roles: {company.roles.join(' · ')}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{company.avgPackage}</p>
                  <p className="text-gray-500 text-xs">Avg Package</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={diffBadge[company.difficulty] || diffBadge['Medium']}>
                  {company.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {company.rounds.map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span>{r.icon}</span>
                  <span>{r.title}</span>
                  {i < company.rounds.length - 1 && <span className="text-gray-700 mx-1">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Rounds */}
          <div className="space-y-3">
            {company.rounds.map((round, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden"
                style={{ border: openRound === idx ? `1px solid ${round.border}` : '1px solid #1f2937' }}>

                {/* Round Header */}
                <button
                  onClick={() => setOpenRound(openRound === idx ? null : idx)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left transition-colors"
                  style={{ backgroundColor: openRound === idx ? round.bg : '#111827' }}
                  onMouseEnter={e => { if (openRound !== idx) e.currentTarget.style.backgroundColor = '#1a2332' }}
                  onMouseLeave={e => { if (openRound !== idx) e.currentTarget.style.backgroundColor = '#111827' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: round.bg, border: `1px solid ${round.border}` }}>
                    {round.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: round.bg, color: round.color, border: `1px solid ${round.border}` }}>
                        Round {round.round}
                      </span>
                      <span className="text-white font-bold text-sm">{round.title}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Clock size={11} /> {round.duration}
                      </span>
                      <span className="text-gray-600 text-xs hidden sm:block">{round.description.slice(0, 60)}...</span>
                    </div>
                  </div>
                  {openRound === idx
                    ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                    : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                  }
                </button>

                {/* Round Details */}
                {openRound === idx && (
                  <div className="px-6 pb-6 pt-2" style={{ backgroundColor: '#0f1923', borderTop: `1px solid ${round.border}` }}>

                    <p className="text-gray-300 text-sm leading-relaxed mb-5">{round.description}</p>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      {/* Topics */}
                      <div>
                        <p className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Brain size={12} style={{ color: round.color }} /> Topics Covered
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {round.topics.map(t => (
                            <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                              style={{ backgroundColor: round.bg, color: round.color, border: `1px solid ${round.border}` }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div>
                        <p className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Zap size={12} className="text-yellow-400" /> Pro Tips
                        </p>
                        <div className="rounded-xl p-3"
                          style={{ backgroundColor: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.15)' }}>
                          <p className="text-yellow-200/80 text-xs leading-relaxed">{round.tips}</p>
                        </div>
                      </div>
                    </div>

                    {/* Practice Problems */}
                    {round.problems && round.problems.length > 0 && (
                      <div>
                        <p className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Code2 size={12} className="text-green-400" /> Frequently Asked Problems
                        </p>
                        <div className="space-y-2">
                          {round.problems.map((p, pi) => {
                            const ds = diffBadge[p.difficulty]
                            return (
                              <div key={pi} className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                                style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}>
                                <span className="text-gray-200 text-sm font-medium">{p.title}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                    style={{ backgroundColor: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
                                    {p.difficulty}
                                  </span>
                                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg transition-colors"
                                    style={{ backgroundColor: 'rgba(234,179,8,0.1)', color: '#facc15', border: '1px solid rgba(234,179,8,0.2)' }}>
                                    <ExternalLink size={10} /> Solve
                                  </a>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Upgrade CTA for non-pro */}
      {!isPro && (
        <div className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: 'rgba(234,179,8,0.05)', border: '2px solid rgba(234,179,8,0.2)' }}>
          <Crown size={32} className="text-yellow-400 mx-auto mb-3" />
          <h3 className="text-white text-xl font-bold mb-2">Unlock All 8 Companies</h3>
          <p className="text-gray-400 text-sm mb-2">
            Get full interview patterns for <strong className="text-white">Amazon, Microsoft, Google, Walmart, Infosys, TCS, Flipkart</strong>
            <br />with round-by-round breakdown, tips, and practice problems.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-5 mt-3">
            {COMPANIES.filter(c => !c.free).map(c => (
              <span key={c.id} className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                🔒 {c.name}
              </span>
            ))}
          </div>
          <Link to="/dashboard/pricing"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl transition-colors">
            <Crown size={15} /> Unlock All — ₹499/month
          </Link>
        </div>
      )}
    </div>
  )
}