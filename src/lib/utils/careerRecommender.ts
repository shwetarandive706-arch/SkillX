import { Candidate, CareerRoleBenchmark, CareerRecommendation } from '../types';

export const CAREER_BENCHMARKS: CareerRoleBenchmark[] = [
  {
    roleTitle: 'Full Stack Developer',
    category: 'Full Stack / Web',
    relatedInterests: ['Web Development', 'Cloud Computing', 'App Development'],
    requiredSkills: ['Next.js (App Router)', 'React.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    recommendedSkills: ['System Design', 'Docker & DevOps'],
    suggestedRoadmap: [
      'Master Next.js 14 App Router & Server Actions',
      'Architect Type-Safe REST & GraphQL APIs in Node.js',
      'Design Scalable PostgreSQL Schemas & Indexing',
      'Deploy Production Containers with Docker & Vercel'
    ],
    overview: 'Bridges frontend user interfaces with backend API services, relational database storage, and cloud deployments.'
  },
  {
    roleTitle: 'Frontend Developer',
    category: 'Frontend / Web',
    relatedInterests: ['Web Development', 'UI/UX Design', 'App Development'],
    requiredSkills: ['React.js', 'Next.js (App Router)', 'TypeScript'],
    recommendedSkills: ['System Design', 'Tailwind CSS', 'WCAG Accessibility'],
    suggestedRoadmap: [
      'Master Modern React 18 Hooks & State Architecture',
      'Build Responsive UI Systems with Tailwind CSS & Radix UI',
      'Optimize Web Vitals & Server Component Streaming',
      'Implement End-to-End Testing & Accessibility Standards'
    ],
    overview: 'Specializes in crafting responsive, performant, accessible web interfaces and design systems.'
  },
  {
    roleTitle: 'Backend Developer',
    category: 'Backend / Infrastructure',
    relatedInterests: ['Web Development', 'Cloud Computing', 'Cybersecurity'],
    requiredSkills: ['Node.js', 'PostgreSQL', 'System Design'],
    recommendedSkills: ['Docker & DevOps', 'Redis Caching', 'Microservices'],
    suggestedRoadmap: [
      'Master Node.js Event Loop, Streams & Backpressure',
      'Tune High-Performance PostgreSQL Queries & MVCC',
      'Implement Distributed Rate Limiting & Token Bucket Algorithms',
      'Architect gRPC & WebSocket Real-time Microservices'
    ],
    overview: 'Architects high-throughput server application logic, database pipelines, and microservice clusters.'
  },
  {
    roleTitle: 'AI/ML Engineer',
    category: 'Artificial Intelligence',
    relatedInterests: ['Artificial Intelligence', 'Data Science'],
    requiredSkills: ['Python & AI Engineering', 'TypeScript'],
    recommendedSkills: ['Vector Search / RAG', 'System Design', 'PyTorch / TensorFlow'],
    suggestedRoadmap: [
      'Master Python Generators, Async I/O & Memory Optimization',
      'Implement Hybrid Sparse/Dense Vector Retrieval (RAG)',
      'Orchestrate Multi-Agent LLM Frameworks & Prompt Pipelines',
      'Deploy Scalable Inference Endpoints with Latency Profiling'
    ],
    overview: 'Deploys predictive machine learning models, neural vector embeddings, and autonomous LLM agents.'
  },
  {
    roleTitle: 'Data Analyst',
    category: 'Data & Analytics',
    relatedInterests: ['Data Science', 'Artificial Intelligence'],
    requiredSkills: ['Python & AI Engineering', 'PostgreSQL'],
    recommendedSkills: ['Data Visualization', 'SQL Analytics', 'System Design'],
    suggestedRoadmap: [
      'Master Advanced SQL Aggregations, CTEs & Window Functions',
      'Perform Exploratory Data Analysis in Python & Pandas',
      'Build Interactive Executive Dashboards & Storytelling',
      'Apply Statistical Hypothesis Testing & Cohort Analysis'
    ],
    overview: 'Transforms raw relational databases and unstructured datasets into strategic business insights.'
  },
  {
    roleTitle: 'Cybersecurity Analyst',
    category: 'Security & Compliance',
    relatedInterests: ['Cybersecurity', 'Cloud Computing'],
    requiredSkills: ['System Design', 'Node.js', 'PostgreSQL'],
    recommendedSkills: ['Network Protocols', 'OWASP Security', 'Identity & Access'],
    suggestedRoadmap: [
      'Understand Application Security & OWASP Top 10 Mitigations',
      'Implement Robust Authentication & RBAC Access Controls',
      'Conduct Automated Penetration Testing & Vulnerability Scans',
      'Manage Infrastructure Audit Logs & Incident Response Protocols'
    ],
    overview: 'Protects enterprise web infrastructure, user authentication endpoints, and data storage systems.'
  },
  {
    roleTitle: 'Cloud Engineer',
    category: 'DevOps & Infrastructure',
    relatedInterests: ['Cloud Computing', 'Cybersecurity', 'Web Development'],
    requiredSkills: ['Docker & DevOps', 'System Design', 'Node.js'],
    recommendedSkills: ['PostgreSQL', 'Kubernetes', 'Terraform / IaC'],
    suggestedRoadmap: [
      'Master Multi-Stage Docker Builds & Image Optimization',
      'Configure Infrastructure as Code with Terraform / CloudFormation',
      'Manage Kubernetes Cluster Orchestration & Load Balancing',
      'Implement Continuous Delivery Pipelines & Zero-Downtime Releases'
    ],
    overview: 'Automates containerized software deployments, cloud infrastructure scaling, and CI/CD pipelines.'
  },
  {
    roleTitle: 'UI/UX Designer',
    category: 'Product Design',
    relatedInterests: ['UI/UX Design', 'Web Development', 'App Development'],
    requiredSkills: ['React.js', 'Next.js (App Router)'],
    recommendedSkills: ['Figma Design Systems', 'User Research', 'Wireframing'],
    suggestedRoadmap: [
      'Conduct Target Audience User Research & Persona Mapping',
      'Design Component Tokens & Figma UI Kits',
      'Build Interactive High-Fidelity Prototypes in React',
      'Perform Usability Testing & WCAG Accessibility Audits'
    ],
    overview: 'Crafts intuitive visual interfaces, interactive user journeys, and standardized design systems.'
  }
];

/**
 * Transparent, explainable rule-based recommendation generator
 */
export function generateCareerRecommendations(candidate: Candidate): CareerRecommendation[] {
  const profile = candidate.careerProfile;

  // Extract student skills (from candidate proof skills and self-reported skills)
  const candidateSkillNames = new Set<string>([
    ...candidate.skills.map((s) => s.skillName),
    ...(profile?.currentSkills || []),
  ]);

  const studentInterests = new Set<string>(profile?.interests || ['Web Development']);
  const targetRoleGoal = profile?.targetRole || 'Full Stack Developer';

  const recommendations: CareerRecommendation[] = CAREER_BENCHMARKS.map((benchmark) => {
    // 1. Skill overlap calculation
    const matchingSkills: string[] = [];
    const missingSkills: string[] = [];

    benchmark.requiredSkills.forEach((reqSkill) => {
      // Check for exact or partial name match
      const hasSkill = Array.from(candidateSkillNames).some(
        (candSkill) =>
          candSkill.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(candSkill.toLowerCase())
      );

      if (hasSkill) {
        matchingSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const skillScore =
      benchmark.requiredSkills.length > 0
        ? (matchingSkills.length / benchmark.requiredSkills.length) * 50
        : 25;

    // 2. Interest overlap calculation
    const matchingInterests = benchmark.relatedInterests.filter((interest) =>
      studentInterests.has(interest)
    );
    const interestScore =
      benchmark.relatedInterests.length > 0
        ? (matchingInterests.length / benchmark.relatedInterests.length) * 30
        : 15;

    // 3. Goal bonus
    const isTargetRole =
      targetRoleGoal.toLowerCase().includes(benchmark.roleTitle.toLowerCase()) ||
      benchmark.roleTitle.toLowerCase().includes(targetRoleGoal.toLowerCase());
    const goalBonus = isTargetRole ? 18 : 0;

    // Total Match Percentage (capped between 45% and 98%)
    const rawScore = Math.round(skillScore + interestScore + goalBonus);
    const matchPercentage = Math.min(98, Math.max(45, rawScore));

    // Generate transparent 1-2 sentence explanation
    let recommendationReason = '';
    if (isTargetRole && matchingSkills.length > 0) {
      recommendationReason = `Directly matches your target career goal (${benchmark.roleTitle}) and aligns with ${matchingSkills.length} of your current verified skills (${matchingSkills.slice(0, 2).join(', ')}).`;
    } else if (matchingInterests.length > 0 && matchingSkills.length > 0) {
      recommendationReason = `Strong alignment with your interest in ${matchingInterests[0]} and builds on your existing foundation in ${matchingSkills[0]}.`;
    } else if (matchingInterests.length > 0) {
      recommendationReason = `Matches your selected area of interest in ${matchingInterests.join(' & ')}, offering a clear growth path.`;
    } else {
      recommendationReason = `Recommended based on foundational software engineering skill requirements and market relevance.`;
    }

    return {
      roleTitle: benchmark.roleTitle,
      category: benchmark.category,
      matchPercentage,
      matchingSkills,
      missingSkills,
      recommendationReason,
      roadmapTopics: benchmark.suggestedRoadmap,
      isTargetRole,
    };
  });

  // Sort recommendations by match percentage descending (placing target role high)
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
