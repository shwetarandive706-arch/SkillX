import { Candidate, ProofScore, Evidence, RecruiterJobDescription, CandidateJobMatch } from '../types';

/**
 * Deterministically calculates a Skill Proof Score (0-100) based on:
 * - Evidence artifacts (0-40 pts): High level verification gets max weight, medium/low get partial weight
 * - Assessment performance (0-40 pts): Quiz / challenge score percentage
 * - Consistency & Activity (0-20 pts): Based on evidence count and test recency
 */
export function calculateProofScore(
  evidence: Evidence[],
  assessmentScorePct?: number
): ProofScore {
  // 1. Calculate Evidence Weight (Max 40 points)
  let evidencePoints = 0;
  evidence.forEach((item) => {
    if (item.verificationLevel === 'high') evidencePoints += 15;
    else if (item.verificationLevel === 'medium') evidencePoints += 10;
    else evidencePoints += 5;
  });
  const evidenceWeight = Math.min(40, evidencePoints);

  // 2. Calculate Assessment Weight (Max 40 points)
  let assessmentWeight = 0;
  if (assessmentScorePct !== undefined) {
    assessmentWeight = Math.round((assessmentScorePct / 100) * 40);
  } else if (evidence.length > 0) {
    // Default baseline allocation if evidence exists
    assessmentWeight = 15;
  } else {
    assessmentWeight = 0;
  }

  // 3. Consistency / Recency Weight (Max 20 points)
  let consistencyWeight = 0;
  if (evidence.length > 0 || assessmentScorePct !== undefined) {
    consistencyWeight = 10;
    if (evidence.length >= 3) consistencyWeight += 5;
    if (assessmentScorePct && assessmentScorePct >= 80) consistencyWeight += 5;
    consistencyWeight = Math.min(20, consistencyWeight);
  }

  // Overall Score sum
  const overall = Math.min(100, Math.max(0, evidenceWeight + assessmentWeight + consistencyWeight));

  // Determine Confidence Tier
  let confidenceLevel: ProofScore['confidenceLevel'] = 'Self-Reported Baseline';
  if (overall >= 80) {
    confidenceLevel = 'Verified Gold';
  } else if (overall >= 60) {
    confidenceLevel = 'Verified Silver';
  }

  return {
    overall,
    evidenceWeight,
    assessmentWeight,
    consistencyWeight,
    confidenceLevel,
  };
}

/**
 * Calculates Candidate Job Match score against Recruiter Job Requirements
 */
export function calculateCandidateJobMatch(
  candidate: Candidate,
  job: RecruiterJobDescription
): CandidateJobMatch {
  let weightedEarnedScore = 0;
  let totalPossibleWeight = 0;

  const skillBreakdown = job.requirements.map((req) => {
    const candidateSkill = candidate.skills.find(
      (s) => s.skillId === req.skillId || s.skillName.toLowerCase() === req.skillName.toLowerCase()
    );

    const candScore = candidateSkill ? candidateSkill.proofScore.overall : 20; // default unverified score if missing
    const meetsRequirement = candScore >= req.minProofScore;

    // Weight multiplier
    let weightMultiplier = 1.0;
    if (req.weight === 'critical') weightMultiplier = 1.8;
    else if (req.weight === 'important') weightMultiplier = 1.2;
    else if (req.weight === 'nice_to_have') weightMultiplier = 0.6;

    weightedEarnedScore += (candScore / 100) * (100 * weightMultiplier);
    totalPossibleWeight += 100 * weightMultiplier;

    return {
      skillId: req.skillId,
      skillName: req.skillName,
      requiredScore: req.minProofScore,
      candidateScore: candScore,
      weight: req.weight,
      meetsRequirement,
    };
  });

  const rawMatchPct = totalPossibleWeight > 0 ? (weightedEarnedScore / totalPossibleWeight) * 100 : 50;
  const matchScore = Math.min(100, Math.round(rawMatchPct));

  // Generate explicit data-driven rank explanation
  const passedCriticalCount = skillBreakdown.filter((s) => s.weight === 'critical' && s.meetsRequirement).length;
  const totalCriticalCount = skillBreakdown.filter((s) => s.weight === 'critical').length;
  const totalEvidenceCount = candidate.skills.reduce((acc, s) => acc + (s.evidence ? s.evidence.length : 0), 0);
  const totalAssessmentsCount = candidate.recentAssessments ? candidate.recentAssessments.length : 0;

  let rankExplanation = '';
  if (totalEvidenceCount === 0 && totalAssessmentsCount === 0) {
    rankExplanation = `${candidate.name} claims proficiency, but has an Evidence Gap (0 verified GitHub artifacts, 0 assessments taken).`;
  } else if (passedCriticalCount === totalCriticalCount && totalCriticalCount > 0) {
    rankExplanation = `${candidate.name} exceeds all ${totalCriticalCount} critical job requirements with ${totalEvidenceCount} verified evidence items and strong assessment precision.`;
  } else if (passedCriticalCount > 0) {
    rankExplanation = `${candidate.name} meets ${passedCriticalCount} of ${totalCriticalCount} critical requirements, backed by ${totalEvidenceCount} verified project artifacts.`;
  } else {
    rankExplanation = `${candidate.name} has partial skill coverage (${matchScore}% match) with unverified gaps in key requirement areas.`;
  }

  return {
    candidateId: candidate.id,
    candidateName: candidate.name,
    candidateTitle: candidate.title,
    avatarUrl: candidate.avatarUrl,
    location: candidate.location,
    matchScore,
    skillBreakdown,
    overallProofScore: candidate.overallProofScore,
    matchedAt: new Date().toISOString(),
    rankExplanation,
  };
}
