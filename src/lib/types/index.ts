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

export interface StudentCareerProfile {
  studentName: string;
  education: string;
  currentSkills: string[];
  interests: string[];
  careerGoals: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  targetRole: string;
  updatedAt?: string;
}

export const INTEREST_OPTIONS = [
  'Web Development',
  'App Development',
  'Artificial Intelligence',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'UI/UX Design',
];

export const TARGET_CAREER_ROLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'AI/ML Engineer',
  'Cybersecurity Analyst',
  'Cloud Engineer',
  'UI/UX Designer',
];

export interface CandidateProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  impactResults: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  verificationStatus: 'Verified' | 'In Review' | 'Unverified';
  proofScoreContribution?: number;
  isDemoData?: true;
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
  careerProfile?: StudentCareerProfile;
  projects?: CandidateProject[];
}

export interface ResumeChecklistItem {
  id: string;
  sectionName: string;
  title: string;
  description: string;
  completed: boolean;
  isRequired: boolean;
  improvementSuggestion: string;
}

export interface InterviewQuestion {
  id: string;
  roleTitle: string; // e.g. Frontend Developer, Backend Developer, Full Stack Developer, Data Analyst, AI/ML Engineer, Cybersecurity Analyst
  category: 'Technical' | 'Behavioral' | 'HR';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  question: string;
  sampleAnswer: string;
  answerGuidance: string;
  isDemoData: true;
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

export interface CareerRecommendation {
  roleTitle: string;
  category: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendationReason: string;
  roadmapTopics: string[];
  isTargetRole: boolean;
}

export interface CareerRoleBenchmark {
  roleTitle: string;
  category: string;
  relatedInterests: string[];
  requiredSkills: string[];
  recommendedSkills: string[];
  suggestedRoadmap: string[];
  overview: string;
}

export interface MarketTrendInsight {
  roleTitle: string;
  demandIndicator: string;
  demandLevel: 'High' | 'Very High' | 'Critical';
  importantSkills: string[];
  emergingSkills: string[];
  growthOutlook: string;
  salaryRange: string;
  learningTopics: string[];
  isDemoData: true;
}

export interface RoadmapTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface RoadmapMilestoneItem {
  id: string;
  title: string;
  estimatedEffort: string;
  description: string;
  tasks: RoadmapTask[];
}

export type SkillGapStatus = 'Completed' | 'In Progress' | 'Not Started';

export interface SkillGapItem {
  skillName: string;
  status: SkillGapStatus;
  category: string;
  proofScore?: number;
  isRequired: boolean;
  recommendedAction: string;
}

export interface ReadinessRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  actionLabel: string;
  actionUrl: string;
}

export interface CareerReadinessAnalysis {
  roleTitle: string;
  overallReadinessPercentage: number;
  skillCompletionPercentage: number;
  roadmapCompletionPercentage: number;
  portfolioReadinessPercentage: number;
  resumeReadinessPercentage: number;
  completedSkillsCount: number;
  totalRequiredSkillsCount: number;
  remainingSkillsCount: number;
  skillsBreakdown: SkillGapItem[];
  recommendations: ReadinessRecommendation[];
  formulaDetails: {
    skillWeight: number;
    roadmapWeight: number;
    portfolioWeight: number;
    resumeWeight: number;
  };
}

