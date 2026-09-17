import { MarketTrendInsight } from '../types';

export const DEMO_MARKET_TRENDS: Record<string, MarketTrendInsight> = {
  'Full Stack Developer': {
    roleTitle: 'Full Stack Developer',
    demandIndicator: 'Critical Demand (+34% Growth)',
    demandLevel: 'Critical',
    importantSkills: ['Next.js (App Router)', 'React.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    emergingSkills: ['Server Actions', 'Edge API Routes', 'Vector DB Integration', 'Docker Containers'],
    growthOutlook: 'Illustrative Benchmark: Expected 34% employment expansion over 3 years driven by enterprise cloud and AI application adoption.',
    salaryRange: '$115,000 - $165,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'App Router Architecture & RSC',
      'Relational Database Indexing & ORMs',
      'REST & gRPC Microservices',
      'Containerization & Cloud Deployments'
    ],
    isDemoData: true,
  },
  'Frontend Developer': {
    roleTitle: 'Frontend Developer',
    demandIndicator: 'Very High Demand (+28% Growth)',
    demandLevel: 'Very High',
    importantSkills: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS'],
    emergingSkills: ['React Server Components', 'Core Web Vitals Optimization', 'WCAG AAA Accessibility'],
    growthOutlook: 'Illustrative Benchmark: Strong steady demand for modular design systems and accessible web interfaces.',
    salaryRange: '$95,000 - $145,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Modern React 18 State Synchronization',
      'Component Library Token Design',
      'Web Vitals & Performance Profiling',
      'Automated UI Integration Testing'
    ],
    isDemoData: true,
  },
  'Backend Developer': {
    roleTitle: 'Backend Developer',
    demandIndicator: 'High Demand (+26% Growth)',
    demandLevel: 'High',
    importantSkills: ['Node.js', 'PostgreSQL', 'System Design', 'Docker & DevOps'],
    emergingSkills: ['gRPC Protocol Buffers', 'Redis Cluster Caching', 'Event Loop Optimization'],
    growthOutlook: 'Illustrative Benchmark: Consistent demand for high-throughput API gateway and microservices architecture.',
    salaryRange: '$110,000 - $160,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Event-Driven Node.js Architecture',
      'PostgreSQL Query Optimization & Locks',
      'Rate Limiting & Token Bucket Algorithms',
      'Microservice Security & JWT Authentication'
    ],
    isDemoData: true,
  },
  'AI/ML Engineer': {
    roleTitle: 'AI/ML Engineer',
    demandIndicator: 'Critical Demand (+48% Growth)',
    demandLevel: 'Critical',
    importantSkills: ['Python & AI Engineering', 'Vector Search / RAG', 'TypeScript'],
    emergingSkills: ['Multi-Agent LLM Orchestration', 'Hybrid Sparse/Dense Vectors', 'Quantized Model Fine-Tuning'],
    growthOutlook: 'Illustrative Benchmark: Rapid 48% market expansion driven by enterprise generative AI integration and RAG pipelines.',
    salaryRange: '$135,000 - $195,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Python Async I/O & Memory Optimization',
      'Vector Embeddings & Similarity Search',
      'LLM Prompt Chains & Agent Frameworks',
      'Production Model Latency Profiling'
    ],
    isDemoData: true,
  },
  'Data Analyst': {
    roleTitle: 'Data Analyst',
    demandIndicator: 'High Demand (+22% Growth)',
    demandLevel: 'High',
    importantSkills: ['Python & AI Engineering', 'PostgreSQL', 'SQL Analytics'],
    emergingSkills: ['Automated BI Pipelines', 'Predictive Cohort Modeling', 'dbt Data Modeling'],
    growthOutlook: 'Illustrative Benchmark: Steady growth across finance, healthcare, and e-commerce analytics teams.',
    salaryRange: '$85,000 - $130,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Advanced SQL Window Functions & CTEs',
      'Pandas & NumPy Data Cleaning',
      'Executive Dashboard Storytelling',
      'Statistical Hypothesis Testing'
    ],
    isDemoData: true,
  },
  'Cybersecurity Analyst': {
    roleTitle: 'Cybersecurity Analyst',
    demandIndicator: 'Very High Demand (+31% Growth)',
    demandLevel: 'Very High',
    importantSkills: ['System Design', 'Node.js', 'PostgreSQL'],
    emergingSkills: ['Zero Trust Architecture', 'OWASP Top 10 Mitigation', 'Automated Penetration Scans'],
    growthOutlook: 'Illustrative Benchmark: Elevated hiring driven by cloud security compliance and threat mitigation.',
    salaryRange: '$105,000 - $155,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Application Security & OWASP Standards',
      'Identity & Access Control (RBAC)',
      'Network Protocol Inspection',
      'Security Audit Logging & Response'
    ],
    isDemoData: true,
  },
  'Cloud Engineer': {
    roleTitle: 'Cloud Engineer',
    demandIndicator: 'Very High Demand (+30% Growth)',
    demandLevel: 'Very High',
    importantSkills: ['Docker & DevOps', 'System Design', 'Node.js'],
    emergingSkills: ['Kubernetes Orchestration', 'Terraform IaC', 'Serverless Edge Functions'],
    growthOutlook: 'Illustrative Benchmark: Accelerating enterprise migration to multi-cloud containerized deployments.',
    salaryRange: '$120,000 - $170,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Multi-Stage Docker Image Shrinking',
      'Infrastructure as Code (IaC)',
      'Kubernetes Cluster Ingress Routing',
      'CI/CD Zero-Downtime Deployment'
    ],
    isDemoData: true,
  },
  'UI/UX Designer': {
    roleTitle: 'UI/UX Designer',
    demandIndicator: 'High Demand (+20% Growth)',
    demandLevel: 'High',
    importantSkills: ['React.js', 'Next.js (App Router)', 'HTML/CSS'],
    emergingSkills: ['Design System Tokens', 'Figma to React Handoff', 'WCAG AAA Accessibility'],
    growthOutlook: 'Illustrative Benchmark: Continuous demand for user-centered digital product interfaces and accessibility.',
    salaryRange: '$85,000 - $135,000 / year (Demo Industry Benchmark)',
    learningTopics: [
      'Target User Research & Personas',
      'Component Token Specification',
      'Interactive Prototyping in React',
      'Usability Audits & Handoff'
    ],
    isDemoData: true,
  }
};
