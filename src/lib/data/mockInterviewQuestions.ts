import { InterviewQuestion } from '../types';

export const DEMO_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // Full Stack Developer
  {
    id: 'q-fs-01',
    roleTitle: 'Full Stack Developer',
    category: 'Technical',
    difficulty: 'Intermediate',
    topic: 'Next.js App Router & Server Components',
    question: 'How do React Server Components (RSC) differ from Client Components in Next.js 14, and when should you pass state across boundaries?',
    sampleAnswer: 'React Server Components execute strictly on the server, producing zero client-side JavaScript bundle weight for rendered markup. Client Components ("use client") run on both server (SSR) and client, enabling interactivity, state (useState/useEffect), and DOM event handlers. State should remain inside Client Components at leaf nodes, passing data down as serializable props or via server actions.',
    answerGuidance: 'Highlight bundle size benefits, security of server-side data fetching, and boundary boundaries using "use client" directives.',
    isDemoData: true,
  },
  {
    id: 'q-fs-02',
    roleTitle: 'Full Stack Developer',
    category: 'Technical',
    difficulty: 'Advanced',
    topic: 'System Design & State Flow',
    question: 'Explain how you would handle race conditions and optimistic UI updates when mutating relational database records from a Next.js frontend.',
    sampleAnswer: 'Use optimistic updates (useOptimistic hook) to render state immediately on the client while sending a Server Action. On the backend, wrap database mutations in SQL transactions with row-level locks (SELECT FOR UPDATE) or optimistic concurrency control using version numbers. Roll back client state gracefully if the server action rejects.',
    answerGuidance: 'Mention optimistic UI rendering, SQL transactions, idempotency keys, and error recovery handling.',
    isDemoData: true,
  },
  {
    id: 'q-fs-03',
    roleTitle: 'Full Stack Developer',
    category: 'Behavioral',
    difficulty: 'Intermediate',
    topic: 'Conflict Resolution & Delivery',
    question: 'Describe a situation where backend API constraints clashed with frontend user experience requirements. How did you resolve it?',
    sampleAnswer: 'In a past project, backend pagination required heavy payload transformations that slowed client rendering. I proposed establishing a GraphQL middleware layer and implementing database query indexing, which reduced latency by 60% while maintaining clean component interfaces.',
    answerGuidance: 'Structure your answer with the STAR framework (Situation, Task, Action, Result). Focus on collaboration and quantitative impact.',
    isDemoData: true,
  },

  // Frontend Developer
  {
    id: 'q-fe-01',
    roleTitle: 'Frontend Developer',
    category: 'Technical',
    difficulty: 'Intermediate',
    topic: 'React Performance Optimization',
    question: 'How do you diagnose and eliminate unnecessary re-renders in a complex React component tree?',
    sampleAnswer: 'Use React DevTools Profiler to record rendering passes and identify flamegraph bottlenecks. Memoize heavy calculations with useMemo, wrap child components in React.memo, and stabilize callback references using useCallback. Additionally, push state down to leaf components to isolate re-render scope.',
    answerGuidance: 'Discuss React DevTools Profiler, React.memo, state colocation, and avoiding inline object instantiations in JSX.',
    isDemoData: true,
  },
  {
    id: 'q-fe-02',
    roleTitle: 'Frontend Developer',
    category: 'Technical',
    difficulty: 'Advanced',
    topic: 'Web Vitals & Layout Shift',
    question: 'What is Cumulative Layout Shift (CLS), and how do you achieve a CLS score below 0.1 in Next.js applications?',
    sampleAnswer: 'CLS measures unexpected layout shifts during page loading. Achieve low CLS by specifying explicit aspect ratio dimensions on images/videos, pre-allocating ad/hero skeleton containers, using Next.js next/font for font optimization, and avoiding inserting dynamic content above existing content without user interaction.',
    answerGuidance: 'Focus on dimensions, font swap strategies, layout placeholders, and Web Vitals targets.',
    isDemoData: true,
  },

  // Backend Developer
  {
    id: 'q-be-01',
    roleTitle: 'Backend Developer',
    category: 'Technical',
    difficulty: 'Intermediate',
    topic: 'Database Query Optimization',
    question: 'What is the N+1 query problem in relational databases, and how do you prevent it in Node.js ORMs?',
    sampleAnswer: 'The N+1 problem occurs when an application executes 1 query to fetch parent records, followed by N separate queries for each parent record\'s child relations. Solve it by using eager loading (JOIN fetches), batching queries with tools like DataLoader, or constructing raw optimized SQL JOIN queries.',
    answerGuidance: 'Explain SQL JOINs, eager loading vs lazy loading, DataLoader batching, and query execution plan analysis (EXPLAIN ANALYZE).',
    isDemoData: true,
  },
  {
    id: 'q-be-02',
    roleTitle: 'Backend Developer',
    category: 'Technical',
    difficulty: 'Advanced',
    topic: 'Distributed Caching & Rate Limiting',
    question: 'Design a distributed rate limiter that handles 10,000 requests per second across multiple server instances.',
    sampleAnswer: 'Implement a Token Bucket or Sliding Window Log algorithm backed by Redis memory clusters. Use Redis atomic Lua scripts (EVAL) to increment hit counts atomically per IP/API key. Set key TTLs matching window durations to prevent memory bloat.',
    answerGuidance: 'Cover Token Bucket vs Sliding Window, Redis Lua scripts, TTL expiration, and graceful 429 HTTP response headers.',
    isDemoData: true,
  },

  // Data Analyst
  {
    id: 'q-da-01',
    roleTitle: 'Data Analyst',
    category: 'Technical',
    difficulty: 'Intermediate',
    topic: 'SQL Window Functions',
    question: 'Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() in SQL analytics queries.',
    sampleAnswer: 'ROW_NUMBER() assigns a unique sequential integer to every row regardless of ties. RANK() assigns equal ranks to tied values but skips subsequent numbers (e.g. 1, 2, 2, 4). DENSE_RANK() assigns equal ranks to ties without skipping numbers (e.g. 1, 2, 2, 3).',
    answerGuidance: 'Demonstrate clear understanding of tie handling and rank gaps across analytical window partitions.',
    isDemoData: true,
  },

  // AI/ML Engineer
  {
    id: 'q-ai-01',
    roleTitle: 'AI/ML Engineer',
    category: 'Technical',
    difficulty: 'Advanced',
    topic: 'RAG Architecture & Vector Search',
    question: 'How do you optimize retrieval accuracy in a Retrieval-Augmented Generation (RAG) system handling technical documentation?',
    sampleAnswer: 'Optimize chunking strategies using semantic chunking with overlapping windows (e.g., 512 tokens with 50-token overlap). Combine dense vector similarity (cosine distance on embeddings) with sparse keyword search (BM25) using Reciprocal Rank Fusion (RRF). Apply a cross-encoder re-ranker model to score top 20 retrieved chunks before passing to LLM context.',
    answerGuidance: 'Discuss semantic chunking, hybrid vector/sparse retrieval, RRF fusion, and cross-encoder re-ranking.',
    isDemoData: true,
  },

  // Cybersecurity Analyst
  {
    id: 'q-sec-01',
    roleTitle: 'Cybersecurity Analyst',
    category: 'Technical',
    difficulty: 'Intermediate',
    topic: 'OWASP Security & JWT Handling',
    question: 'What security vulnerabilities exist when storing JSON Web Tokens (JWT) in browser localStorage vs HTTP-Only cookies?',
    sampleAnswer: 'localStorage is vulnerable to Cross-Site Scripting (XSS) attacks because any malicious script running in the browser can read tokens. HTTP-Only cookies prevent JavaScript access, eliminating token theft via XSS, though CSRF mitigations (SameSite=Strict, anti-CSRF tokens) must be enforced.',
    answerGuidance: 'Compare XSS vs CSRF, HTTP-Only cookies, SameSite attributes, and token refresh mechanisms.',
    isDemoData: true,
  },

  // Universal HR Question
  {
    id: 'q-hr-01',
    roleTitle: 'Full Stack Developer',
    category: 'HR',
    difficulty: 'Beginner',
    topic: 'Career Trajectory & Continuous Learning',
    question: 'Why are you interested in proof-based hiring platforms like SkillX, and how do you stay updated with rapid technical developments?',
    sampleAnswer: 'Proof-based platforms like SkillX allow engineers to demonstrate verifiable skill competency rather than relying solely on self-claimed resumes. I stay updated by reading technical blogs, experimenting with open-source repositories, and completing practical code assessments.',
    answerGuidance: 'Align your answer with SkillX proof-verification philosophy, active learning, and passion for engineering quality.',
    isDemoData: true,
  }
];
