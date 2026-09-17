import { RecruiterJobDescription } from '../types';

export const INITIAL_MOCK_JOBS: RecruiterJobDescription[] = [
  {
    id: 'job-01-fullstack',
    isDemoData: true,
    title: 'Senior Full Stack Engineer (Next.js & React)',
    company: 'Veloce AI',
    department: 'Core Product Engineering',
    location: 'San Francisco, CA / Remote',
    rawJDText: `We are looking for a Senior Full Stack Engineer to lead our front-end architecture and API integration. 
Requirements:
- Strong hands-on proof in Next.js App Router (minimum Proof Score 75)
- Deep expertise in React.js and TypeScript (minimum Proof Score 80)
- Proven experience with Node.js backend services and PostgreSQL data modeling.
- System Design capability for real-time collaboration tools.`,
    minOverallProofScore: 80,
    createdAt: '2026-09-10T09:00:00Z',
    status: 'Active',
    requirements: [
      {
        skillId: 'skill-nextjs',
        skillName: 'Next.js (App Router)',
        minProofScore: 75,
        weight: 'critical',
      },
      {
        skillId: 'skill-react',
        skillName: 'React.js',
        minProofScore: 80,
        weight: 'critical',
      },
      {
        skillId: 'skill-typescript',
        skillName: 'TypeScript',
        minProofScore: 75,
        weight: 'important',
      },
      {
        skillId: 'skill-nodejs',
        skillName: 'Node.js',
        minProofScore: 70,
        weight: 'important',
      },
      {
        skillId: 'skill-sysdesign',
        skillName: 'System Design',
        minProofScore: 70,
        weight: 'nice_to_have',
      }
    ]
  },
  {
    id: 'job-02-ai-eng',
    isDemoData: true,
    title: 'Lead AI & Python Systems Engineer',
    company: 'Cognitive Scale Labs',
    department: 'Applied AI',
    location: 'New York, NY / Remote',
    rawJDText: `Seeking an experienced AI Engineer to design RAG architectures, LLM fine-tuning pipelines, and high-performance Python services.`,
    minOverallProofScore: 82,
    createdAt: '2026-09-12T11:00:00Z',
    status: 'Active',
    requirements: [
      {
        skillId: 'skill-python',
        skillName: 'Python & AI Engineering',
        minProofScore: 85,
        weight: 'critical',
      },
      {
        skillId: 'skill-sysdesign',
        skillName: 'System Design',
        minProofScore: 75,
        weight: 'important',
      },
      {
        skillId: 'skill-postgres',
        skillName: 'PostgreSQL',
        minProofScore: 70,
        weight: 'nice_to_have',
      }
    ]
  },
  {
    id: 'job-03-backend',
    isDemoData: true,
    title: 'Staff Backend & Database Architect',
    company: 'DataPulse Cloud',
    department: 'Infrastructure',
    location: 'Seattle, WA',
    rawJDText: `Looking for a backend architect with proven experience in database query optimization, Node.js services, and distributed systems.`,
    minOverallProofScore: 80,
    createdAt: '2026-09-08T14:00:00Z',
    status: 'Active',
    requirements: [
      {
        skillId: 'skill-nodejs',
        skillName: 'Node.js',
        minProofScore: 85,
        weight: 'critical',
      },
      {
        skillId: 'skill-postgres',
        skillName: 'PostgreSQL',
        minProofScore: 80,
        weight: 'critical',
      },
      {
        skillId: 'skill-sysdesign',
        skillName: 'System Design',
        minProofScore: 80,
        weight: 'important',
      }
    ]
  }
];
