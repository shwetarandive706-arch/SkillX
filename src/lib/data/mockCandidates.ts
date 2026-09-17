import { Candidate } from '../types';

export const INITIAL_MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-alex-chen',
    isDemoData: true,
    name: 'Alex Chen',
    title: 'Senior Full Stack & AI Engineer',
    bio: 'Passionate about building scalable web applications with Next.js, React, and TypeScript. 6+ years experience crafting performant UI and real-time state synchronization.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'San Francisco, CA (Remote)',
    githubUsername: 'alexchen-dev',
    linkedinUrl: 'https://linkedin.com/in/alexchen-demo',
    portfolioUrl: 'https://alexchen.dev',
    overallProofScore: 88,
    recentAssessments: [
      {
        id: 'att-01',
        assessmentId: 'assess-nextjs-01',
        candidateId: 'cand-alex-chen',
        scorePercentage: 100,
        completedAt: '2026-09-15T10:30:00Z',
        passed: true,
      },
      {
        id: 'att-02',
        assessmentId: 'assess-react-01',
        candidateId: 'cand-alex-chen',
        scorePercentage: 100,
        completedAt: '2026-09-10T14:15:00Z',
        passed: true,
      }
    ],
    skills: [
      {
        skillId: 'skill-nextjs',
        skillName: 'Next.js (App Router)',
        category: 'Frontend',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 92,
          evidenceWeight: 38,
          assessmentWeight: 38,
          consistencyWeight: 16,
          confidenceLevel: 'Verified Gold',
        },
        lastAssessedAt: '2026-09-15T10:30:00Z',
        evidence: [
          {
            id: 'ev-01',
            skillId: 'skill-nextjs',
            title: 'E-Commerce App Router Storefront',
            type: 'github_repo',
            url: 'https://github.com/alexchen-dev/nextjs-ecommerce-store',
            summary: 'Production Next.js 14 App Router project utilizing Server Actions, Parallel Routes, and Edge Middleware for real-time inventory updates.',
            verificationLevel: 'high',
            verifiedAt: '2026-09-01T08:00:00Z',
            metrics: {
              stars: 142,
              commitsCount: 310,
              linesOfCode: 18400,
              testCoverage: 92,
            },
          },
          {
            id: 'ev-02',
            skillId: 'skill-nextjs',
            title: 'Server Action Streaming Benchmark',
            type: 'live_project',
            url: 'https://next-stream-benchmark.vercel.app',
            summary: 'Live benchmark suite testing RSC payload streaming speed vs traditional client fetch hooks.',
            verificationLevel: 'high',
            verifiedAt: '2026-08-20T12:00:00Z',
          }
        ]
      },
      {
        skillId: 'skill-react',
        skillName: 'React.js',
        category: 'Frontend',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 90,
          evidenceWeight: 36,
          assessmentWeight: 38,
          consistencyWeight: 16,
          confidenceLevel: 'Verified Gold',
        },
        lastAssessedAt: '2026-09-10T14:15:00Z',
        evidence: [
          {
            id: 'ev-03',
            skillId: 'skill-react',
            title: 'Custom React Canvas Diagramming Library',
            type: 'github_repo',
            url: 'https://github.com/alexchen-dev/react-canvas-flow',
            summary: 'High performance React flow diagram editor built with custom hooks and requestAnimationFrame optimization.',
            verificationLevel: 'high',
            verifiedAt: '2026-07-11T00:00:00Z',
            metrics: {
              stars: 480,
              commitsCount: 520,
              linesOfCode: 24500,
              testCoverage: 88,
            },
          }
        ]
      },
      {
        skillId: 'skill-typescript',
        skillName: 'TypeScript',
        category: 'Frontend',
        claimedLevel: 'Expert',
        proofScore: {
          overall: 87,
          evidenceWeight: 35,
          assessmentWeight: 35,
          consistencyWeight: 17,
          confidenceLevel: 'Verified Gold',
        },
        evidence: [
          {
            id: 'ev-04',
            skillId: 'skill-typescript',
            title: 'Type-Safe Router Engine',
            type: 'github_repo',
            url: 'https://github.com/alexchen-dev/typed-router',
            summary: 'Zero-dependency TypeScript path params validator utilizing advanced template literal type inference.',
            verificationLevel: 'high',
            verifiedAt: '2026-06-01T00:00:00Z',
            metrics: {
              stars: 95,
              commitsCount: 84,
              linesOfCode: 4200,
              testCoverage: 98,
            },
          }
        ]
      },
      {
        skillId: 'skill-nodejs',
        skillName: 'Node.js',
        category: 'Backend',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 84,
          evidenceWeight: 34,
          assessmentWeight: 34,
          consistencyWeight: 16,
          confidenceLevel: 'Verified Gold',
        },
        evidence: [
          {
            id: 'ev-05',
            skillId: 'skill-nodejs',
            title: 'High-Throughput WebSocket Server',
            type: 'github_repo',
            url: 'https://github.com/alexchen-dev/node-ws-cluster',
            summary: 'Cluster-mode Node.js event-driven server handling 50k concurrent connection updates.',
            verificationLevel: 'medium',
            verifiedAt: '2026-05-14T00:00:00Z',
          }
        ]
      },
      {
        skillId: 'skill-postgres',
        skillName: 'PostgreSQL',
        category: 'Database',
        claimedLevel: 'Mid',
        proofScore: {
          overall: 76,
          evidenceWeight: 30,
          assessmentWeight: 30,
          consistencyWeight: 16,
          confidenceLevel: 'Verified Silver',
        },
        evidence: [
          {
            id: 'ev-06',
            skillId: 'skill-postgres',
            title: 'Automated Migration & Indexing Pipeline',
            type: 'live_project',
            summary: 'Implemented partitioning strategies for multi-tenant analytics data in production.',
            verificationLevel: 'medium',
            verifiedAt: '2026-04-02T00:00:00Z',
          }
        ]
      },
      {
        skillId: 'skill-sysdesign',
        skillName: 'System Design',
        category: 'System Design',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 85,
          evidenceWeight: 35,
          assessmentWeight: 35,
          consistencyWeight: 15,
          confidenceLevel: 'Verified Gold',
        },
        evidence: [
          {
            id: 'ev-07',
            skillId: 'skill-sysdesign',
            title: 'Distributed Rate Limiter RFC',
            type: 'work_history',
            summary: 'Authored technical design proposal for Redis token-bucket rate limiter adopted across company engineering teams.',
            verificationLevel: 'high',
            verifiedAt: '2026-03-20T00:00:00Z',
          }
        ]
      }
    ]
  },
  {
    id: 'cand-sarah-jenkins',
    isDemoData: true,
    name: 'Sarah Jenkins',
    title: 'Frontend Platform Specialist',
    bio: 'Dedicated to UI design systems, micro-frontend architecture, and web accessibility standards.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    location: 'Austin, TX (Hybrid)',
    githubUsername: 'sjenkins-ui',
    overallProofScore: 65,
    recentAssessments: [
      {
        id: 'att-sj-01',
        assessmentId: 'assess-react-01',
        candidateId: 'cand-sarah-jenkins',
        scorePercentage: 75,
        completedAt: '2026-08-10T10:00:00Z',
        passed: true,
      }
    ],
    skills: [
      {
        skillId: 'skill-react',
        skillName: 'React.js',
        category: 'Frontend',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 68,
          evidenceWeight: 20,
          assessmentWeight: 30,
          consistencyWeight: 18,
          confidenceLevel: 'Verified Silver',
        },
        evidence: [
          {
            id: 'ev-sj-01',
            skillId: 'skill-react',
            title: 'Accessible Design System Core',
            type: 'github_repo',
            url: 'https://github.com/sjenkins-ui/accessible-react-ui',
            summary: 'WCAG 2.1 AAA compliant component library built with Tailwind CSS and Radix UI.',
            verificationLevel: 'medium',
            verifiedAt: '2026-08-12T00:00:00Z',
            metrics: {
              stars: 45,
              commitsCount: 60,
              testCoverage: 80,
            }
          }
        ]
      },
      {
        skillId: 'skill-nextjs',
        skillName: 'Next.js (App Router)',
        category: 'Frontend',
        claimedLevel: 'Mid',
        proofScore: {
          overall: 62,
          evidenceWeight: 15,
          assessmentWeight: 32,
          consistencyWeight: 15,
          confidenceLevel: 'Verified Silver',
        },
        evidence: [
          {
            id: 'ev-sj-02',
            skillId: 'skill-nextjs',
            title: 'Corporate Blog & Documentation Portal',
            type: 'live_project',
            summary: 'Static MDX documentation platform built on Next.js 14.',
            verificationLevel: 'low',
            verifiedAt: '2026-06-18T00:00:00Z',
          }
        ]
      },
      {
        skillId: 'skill-typescript',
        skillName: 'TypeScript',
        category: 'Frontend',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 60,
          evidenceWeight: 15,
          assessmentWeight: 30,
          consistencyWeight: 15,
          confidenceLevel: 'Verified Silver',
        },
        evidence: []
      }
    ]
  },
  {
    id: 'cand-marcus-vance',
    isDemoData: true,
    name: 'Marcus Vance',
    title: 'Unverified Candidate (Evidence Gap Demo)',
    bio: 'Self-reported Full Stack Engineer claiming Expert proficiency across Next.js, React, and TypeScript without linked proof.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Seattle, WA (Remote)',
    githubUsername: 'mvance-unverified',
    overallProofScore: 0,
    recentAssessments: [],
    skills: [
      {
        skillId: 'skill-nextjs',
        skillName: 'Next.js (App Router)',
        category: 'Frontend',
        claimedLevel: 'Expert',
        proofScore: {
          overall: 0,
          evidenceWeight: 0,
          assessmentWeight: 0,
          consistencyWeight: 0,
          confidenceLevel: 'Self-Reported Baseline',
        },
        evidence: []
      },
      {
        skillId: 'skill-react',
        skillName: 'React.js',
        category: 'Frontend',
        claimedLevel: 'Expert',
        proofScore: {
          overall: 0,
          evidenceWeight: 0,
          assessmentWeight: 0,
          consistencyWeight: 0,
          confidenceLevel: 'Self-Reported Baseline',
        },
        evidence: []
      },
      {
        skillId: 'skill-typescript',
        skillName: 'TypeScript',
        category: 'Frontend',
        claimedLevel: 'Senior',
        proofScore: {
          overall: 0,
          evidenceWeight: 0,
          assessmentWeight: 0,
          consistencyWeight: 0,
          confidenceLevel: 'Self-Reported Baseline',
        },
        evidence: []
      }
    ]
  },
  {
    id: 'cand-elena-rostova',
    isDemoData: true,
    name: 'Elena Rostova',
    title: 'AI Solutions & ML Engineer',
    bio: 'Building production LLM agents, vector retrieval pipelines, and fine-tuned embeddings for real-world enterprise applications.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    location: 'New York, NY (Hybrid)',
    githubUsername: 'erostova-ai',
    overallProofScore: 86,
    recentAssessments: [],
    skills: [
      {
        skillId: 'skill-python',
        skillName: 'Python & AI Engineering',
        category: 'AI / ML',
        claimedLevel: 'Expert',
        proofScore: {
          overall: 95,
          evidenceWeight: 40,
          assessmentWeight: 38,
          consistencyWeight: 17,
          confidenceLevel: 'Verified Gold',
        },
        evidence: [
          {
            id: 'ev-er-01',
            skillId: 'skill-python',
            title: 'Multi-Agent RAG Orchestrator',
            type: 'github_repo',
            url: 'https://github.com/erostova-ai/rag-agent-orchestrator',
            summary: 'Sub-second hybrid sparse/dense vector retrieval framework powering legal document Q&A.',
            verificationLevel: 'high',
            verifiedAt: '2026-09-02T00:00:00Z',
            metrics: {
              stars: 890,
              commitsCount: 430,
              testCoverage: 94,
            }
          }
        ]
      },
      {
        skillId: 'skill-typescript',
        skillName: 'TypeScript',
        category: 'Frontend',
        claimedLevel: 'Mid',
        proofScore: {
          overall: 78,
          evidenceWeight: 30,
          assessmentWeight: 33,
          consistencyWeight: 15,
          confidenceLevel: 'Verified Silver',
        },
        evidence: []
      },
      {
        skillId: 'skill-nextjs',
        skillName: 'Next.js (App Router)',
        category: 'Frontend',
        claimedLevel: 'Mid',
        proofScore: {
          overall: 72,
          evidenceWeight: 28,
          assessmentWeight: 30,
          consistencyWeight: 14,
          confidenceLevel: 'Verified Silver',
        },
        evidence: []
      }
    ]
  }
];
