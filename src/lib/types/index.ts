export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'System Design' | 'AI / ML';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  iconName?: string;
}

export type EvidenceType = 'github_repo' | 'live_project' | 'assessment_pass' | 'work_history' | 'peer_endorsement';

export interface EvidenceMetrics {
  stars?: number;
  commitsCount?: number;
  linesOfCode?: number;
  testCoverage?: number;
  pullRequests?: number;
}

export interface Evidence {
  id: string;
  skillId: string;
  title: string;
  type: EvidenceType;
  url?: string;
  summary: string;
  verificationLevel: 'high' | 'medium' | 'low';
  metrics?: EvidenceMetrics;
  verifiedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  skillId: string;
  skillName: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: AssessmentQuestion[];
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  candidateId: string;
  scorePercentage: number;
  completedAt: string;
  passed: boolean;
}

export interface ProofScore {
  overall: number; // 0-100
  evidenceWeight: number; // 0-40 points
  assessmentWeight: number; // 0-40 points
  consistencyWeight: number; // 0-20 points
  confidenceLevel: 'Verified Gold' | 'Verified Silver' | 'Self-Reported Baseline';
}

export interface CandidateSkillProof {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  claimedLevel: 'Junior' | 'Mid' | 'Senior' | 'Expert';
  proofScore: ProofScore;
  evidence: Evidence[];
  lastAssessedAt?: string;
}

export interface Candidate {
  id: string;
  isDemoData: true;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  githubUsername?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  overallProofScore: number;
  skills: CandidateSkillProof[];
  recentAssessments: AssessmentAttempt[];
}

export interface SkillRequirement {
  skillId: string;
  skillName: string;
  minProofScore: number;
  weight: 'critical' | 'important' | 'nice_to_have';
}

export interface RecruiterJobDescription {
  id: string;
  isDemoData: true;
  title: string;
  company: string;
  department: string;
  location: string;
  rawJDText?: string;
  requirements: SkillRequirement[];
  minOverallProofScore: number;
  createdAt: string;
  status: 'Active' | 'Draft' | 'Closed';
}

export interface CandidateJobMatch {
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  avatarUrl: string;
  location: string;
  matchScore: number; // 0 - 100%
  skillBreakdown: {
    skillId: string;
    skillName: string;
    requiredScore: number;
    candidateScore: number;
    weight: 'critical' | 'important' | 'nice_to_have';
    meetsRequirement: boolean;
  }[];
  overallProofScore: number;
  matchedAt: string;
  rankExplanation?: string;
}
