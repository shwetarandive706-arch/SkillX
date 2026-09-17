import { CandidateProject } from '../types';

export const DEMO_CANDIDATE_PROJECTS: CandidateProject[] = [
  {
    id: 'proj-01',
    title: 'SkillX Proof Verification Platform',
    description: 'Full-stack Next.js application separating self-claimed skills from verified code evidence and interactive 5-question code assessments.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Context', 'LocalStorage'],
    impactResults: 'Achieved 88/100 verified proof score with transparent mathematical audit logs and recruiter job-matching ranking.',
    githubUrl: 'https://github.com/alexchen-dev/SkillX',
    liveDemoUrl: 'https://skillx-proof.vercel.app',
    verificationStatus: 'Verified',
    proofScoreContribution: 35,
    isDemoData: true,
  },
  {
    id: 'proj-02',
    title: 'Real-Time Distributed Telemetry Dashboard',
    description: 'High-throughput analytics engine processing streaming IoT sensor metrics with Redis caching and PostgreSQL storage.',
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    impactResults: 'Processed 5,000 requests/sec with sub-50ms query latencies and 99.9% uptime SLA.',
    githubUrl: 'https://github.com/alexchen-dev/telemetry-engine',
    liveDemoUrl: 'https://telemetry-demo.alexchen.dev',
    verificationStatus: 'Verified',
    proofScoreContribution: 30,
    isDemoData: true,
  },
  {
    id: 'proj-03',
    title: 'AI Semantic Document Retrieval Engine',
    description: 'Hybrid sparse and dense vector search prototype indexing technical PDF documentation with local RAG embeddings.',
    technologies: ['Python', 'TypeScript', 'Vector DB', 'RAG Architecture'],
    impactResults: 'Improved search retrieval accuracy by 45% compared to baseline keyword search.',
    githubUrl: 'https://github.com/alexchen-dev/rag-document-search',
    verificationStatus: 'In Review',
    proofScoreContribution: 15,
    isDemoData: true,
  }
];
