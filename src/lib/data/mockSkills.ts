import { Skill } from '../types';

export const INITIAL_MOCK_SKILLS: Skill[] = [
  {
    id: 'skill-react',
    name: 'React.js',
    category: 'Frontend',
    description: 'Component lifecycle, hooks, state management, Fiber architecture, and performance optimization.',
    iconName: 'Code2',
  },
  {
    id: 'skill-nextjs',
    name: 'Next.js (App Router)',
    category: 'Frontend',
    description: 'Server Components, Server Actions, SSR/SSG caching strategies, dynamic routing, and middleware.',
    iconName: 'Layers',
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Generics, utility types, type narrowing, AST manipulation, and strict compiler configurations.',
    iconName: 'FileCode',
  },
  {
    id: 'skill-nodejs',
    name: 'Node.js',
    category: 'Backend',
    description: 'Event loop, non-blocking I/O, cluster mode, stream processing, and REST/gRPC API design.',
    iconName: 'Server',
  },
  {
    id: 'skill-postgres',
    name: 'PostgreSQL',
    category: 'Database',
    description: 'ACID transactions, indexing strategies (B-Tree, GIN), query execution plans, and schema migration.',
    iconName: 'Database',
  },
  {
    id: 'skill-sysdesign',
    name: 'System Design',
    category: 'System Design',
    description: 'Microservices, distributed caching, message queues (Kafka), load balancing, and rate limiting.',
    iconName: 'Cpu',
  },
  {
    id: 'skill-python',
    name: 'Python & AI Engineering',
    category: 'AI / ML',
    description: 'Asyncio, LLM integration, LangChain, vector embedding indexing, and PyTorch inference pipeline.',
    iconName: 'Sparkles',
  },
  {
    id: 'skill-docker',
    name: 'Docker & Kubernetes',
    category: 'DevOps',
    description: 'Multi-stage container builds, image size optimization, Helm charts, and CI/CD pipeline automation.',
    iconName: 'Box',
  }
];
