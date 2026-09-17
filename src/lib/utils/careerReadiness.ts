import { Candidate, CareerReadinessAnalysis, SkillGapItem, ReadinessRecommendation } from '../types';
import { CAREER_BENCHMARKS } from './careerRecommender';

/**
 * Calculates deterministic career readiness score & skill gap breakdown for a candidate
 * against a target career role.
 */
export function calculateCareerReadiness(
  candidate: Candidate,
  completedTaskIds: Record<string, boolean> = {},
  selectedRoleTitle?: string
): CareerReadinessAnalysis {
  // Determine target role
  const roleTitle = selectedRoleTitle || candidate.careerProfile?.targetRole || 'Full Stack Developer';

  // Find role benchmark
  const benchmark =
    CAREER_BENCHMARKS.find((b) => b.roleTitle.toLowerCase() === roleTitle.toLowerCase()) ||
    CAREER_BENCHMARKS.find((b) => b.roleTitle === 'Full Stack Developer') ||
    CAREER_BENCHMARKS[0];

  const requiredSkills = benchmark.requiredSkills || [];
  const recommendedSkills = benchmark.recommendedSkills || [];
  const allRoleSkills = Array.from(new Set([...requiredSkills, ...recommendedSkills]));

  // Map candidate skills for quick lookup
  const candidateSkillMap = new Map<string, { overallScore: number; verifiedCount: number }>();
  if (candidate?.skills) {
    candidate.skills.forEach((s) => {
      candidateSkillMap.set(s.skillName.toLowerCase(), {
        overallScore: s.proofScore.overall,
        verifiedCount: s.evidence?.length || 0,
      });
    });
  }

  // Evaluate each skill status
  const skillsBreakdown: SkillGapItem[] = allRoleSkills.map((skillName) => {
    const isReq = requiredSkills.includes(skillName);
    const existing = candidateSkillMap.get(skillName.toLowerCase());

    let status: 'Completed' | 'In Progress' | 'Not Started' = 'Not Started';
    let proofScore: number | undefined = undefined;
    let recommendedAction = `Learn ${skillName} fundamentals`;

    if (existing) {
      proofScore = existing.overallScore;
      if (existing.overallScore >= 60 || existing.verifiedCount > 0) {
        status = 'Completed';
        recommendedAction = 'Skill verified & benchmarked';
      } else {
        status = 'In Progress';
        recommendedAction = 'Take 5-min assessment to boost proof score';
      }
    } else {
      // Check if skill is in user's claimed interests or profile current skills
      const isClaimedInProfile = candidate.careerProfile?.currentSkills?.some(
        (cs) => cs.toLowerCase() === skillName.toLowerCase()
      );
      if (isClaimedInProfile) {
        status = 'In Progress';
        recommendedAction = 'Attach repository evidence or attempt assessment';
      } else {
        status = 'Not Started';
        recommendedAction = isReq
          ? 'High priority: Add to learning roadmap'
          : 'Recommended: Explore introductory topics';
      }
    }

    return {
      skillName,
      status,
      category: isReq ? 'Required Core' : 'Recommended',
      proofScore,
      isRequired: isReq,
      recommendedAction,
    };
  });

  // Calculate Sub-Scores
  const completedRequiredCount = skillsBreakdown.filter((s) => s.isRequired && s.status === 'Completed').length;
  const inProgressRequiredCount = skillsBreakdown.filter((s) => s.isRequired && s.status === 'In Progress').length;
  const totalRequiredSkillsCount = requiredSkills.length || 1;

  // Skill Completion Score (40% weight)
  const skillPoints = completedRequiredCount * 1.0 + inProgressRequiredCount * 0.5;
  const skillCompletionPercentage = Math.min(100, Math.round((skillPoints / totalRequiredSkillsCount) * 100));

  // Learning Roadmap Completion Score (25% weight)
  const roleTaskKeys = Object.keys(completedTaskIds).filter((key) => key.includes(benchmark.roleTitle));
  const completedTaskCount = roleTaskKeys.filter((k) => completedTaskIds[k]).length;
  const totalRoadmapTasks = 12; // 4 milestones * 3 tasks
  const roadmapCompletionPercentage =
    roleTaskKeys.length > 0
      ? Math.min(100, Math.round((completedTaskCount / totalRoadmapTasks) * 100))
      : candidate.careerProfile?.currentSkills?.length
      ? Math.min(100, candidate.careerProfile.currentSkills.length * 20)
      : 30;

  // Portfolio Readiness Score (20% weight)
  const hasAssessmentHistory = (candidate.recentAssessments?.length || 0) > 0;
  const hasExternalLinks = !!(candidate.githubUsername || candidate.portfolioUrl || candidate.linkedinUrl);
  let portfolioReadinessPercentage = Math.min(100, Math.round(candidate.overallProofScore || 50));
  if (hasAssessmentHistory) portfolioReadinessPercentage = Math.min(100, portfolioReadinessPercentage + 15);
  if (hasExternalLinks) portfolioReadinessPercentage = Math.min(100, portfolioReadinessPercentage + 15);

  // Resume & Profile Readiness Score (15% weight)
  let resumeReadinessPercentage = 40;
  if (candidate.careerProfile) {
    const cp = candidate.careerProfile;
    if (cp.studentName && cp.education) resumeReadinessPercentage += 20;
    if (cp.targetRole && cp.careerGoals) resumeReadinessPercentage += 20;
    if (cp.interests?.length) resumeReadinessPercentage += 20;
  }
  resumeReadinessPercentage = Math.min(100, resumeReadinessPercentage);

  // Formula Weighting
  const W_SKILL = 0.4;
  const W_ROADMAP = 0.25;
  const W_PORTFOLIO = 0.2;
  const W_RESUME = 0.15;

  const overallReadinessPercentage = Math.round(
    skillCompletionPercentage * W_SKILL +
      roadmapCompletionPercentage * W_ROADMAP +
      portfolioReadinessPercentage * W_PORTFOLIO +
      resumeReadinessPercentage * W_RESUME
  );

  // Actionable Personalized Recommendations
  const recommendations: ReadinessRecommendation[] = [];

  const missingCoreSkills = skillsBreakdown.filter((s) => s.isRequired && s.status === 'Not Started');
  if (missingCoreSkills.length > 0) {
    recommendations.push({
      id: 'rec-missing-skills',
      title: `Close Skill Gap in ${missingCoreSkills[0].skillName}`,
      description: `Target role "${benchmark.roleTitle}" requires proficiency in ${missingCoreSkills
        .map((s) => s.skillName)
        .slice(0, 3)
        .join(', ')}.`,
      priority: 'High',
      actionLabel: 'Open Learning Roadmap',
      actionUrl: `/candidate/learning-roadmap?role=${encodeURIComponent(benchmark.roleTitle)}`,
    });
  }

  if (roadmapCompletionPercentage < 75) {
    recommendations.push({
      id: 'rec-roadmap-milestones',
      title: 'Complete Milestone Tasks in Learning Roadmap',
      description: `Your roadmap progress is at ${roadmapCompletionPercentage}%. Complete interactive milestone checklists to boost readiness.`,
      priority: 'High',
      actionLabel: 'View Milestones',
      actionUrl: `/candidate/learning-roadmap?role=${encodeURIComponent(benchmark.roleTitle)}`,
    });
  }

  const unverifiedSkills = skillsBreakdown.filter((s) => s.status === 'In Progress');
  if (unverifiedSkills.length > 0 || (candidate.recentAssessments?.length || 0) < 2) {
    recommendations.push({
      id: 'rec-verify-skills',
      title: 'Verify Skills via 5-Minute Practical Code Assessments',
      description:
        'Convert self-claimed skills into verified proof scores by attempting interactive 5-question code challenges.',
      priority: 'Medium',
      actionLabel: 'Take Code Assessment',
      actionUrl: '/candidate/assess/skill-nextjs',
    });
  }

  if (!candidate.githubUsername || !candidate.portfolioUrl) {
    recommendations.push({
      id: 'rec-add-portfolio',
      title: 'Link GitHub Repository & Portfolio Projects',
      description:
        'Proof-based hiring platforms favor verified code evidence. Attach your public GitHub username and repository artifacts.',
      priority: 'Medium',
      actionLabel: 'Update Portfolio Evidence',
      actionUrl: '/candidate/dashboard',
    });
  }

  recommendations.push({
    id: 'rec-resume-optimization',
    title: 'Refine Student Career Profile & Target Preferences',
    description:
      'Ensure your education branch, preferred job roles, and skill tags are up to date for precise AI career recommendations.',
    priority: 'Low',
    actionLabel: 'Edit Profile',
    actionUrl: '/candidate/career-guidance',
  });

  return {
    roleTitle: benchmark.roleTitle,
    overallReadinessPercentage,
    skillCompletionPercentage,
    roadmapCompletionPercentage,
    portfolioReadinessPercentage,
    resumeReadinessPercentage,
    completedSkillsCount: completedRequiredCount,
    totalRequiredSkillsCount,
    remainingSkillsCount: totalRequiredSkillsCount - completedRequiredCount,
    skillsBreakdown,
    recommendations,
    formulaDetails: {
      skillWeight: 40,
      roadmapWeight: 25,
      portfolioWeight: 20,
      resumeWeight: 15,
    },
  };
}
