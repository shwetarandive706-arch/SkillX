'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Candidate, RecruiterJobDescription, Skill, Assessment, Evidence, StudentCareerProfile } from '@/lib/types';
import { INITIAL_MOCK_CANDIDATES } from '@/lib/data/mockCandidates';
import { INITIAL_MOCK_JOBS } from '@/lib/data/mockJobs';
import { INITIAL_MOCK_SKILLS } from '@/lib/data/mockSkills';
import { INITIAL_MOCK_ASSESSMENTS } from '@/lib/data/mockAssessments';
import { calculateProofScore } from '@/lib/utils/scoreCalculator';

interface SkillXContextType {
  candidates: Candidate[];
  activeCandidate: Candidate;
  activeCandidateId: string;
  setActiveCandidateId: (id: string) => void;
  jobs: RecruiterJobDescription[];
  skills: Skill[];
  assessments: Record<string, Assessment>;
  activeRole: 'candidate' | 'recruiter';
  setActiveRole: (role: 'candidate' | 'recruiter') => void;
  updateAssessmentScore: (candidateId: string, skillId: string, scorePct: number) => void;
  addEvidenceToSkill: (candidateId: string, skillId: string, evidenceData: Omit<Evidence, 'id' | 'verifiedAt'>) => void;
  addSkillClaim: (candidateId: string, skillId: string, claimedLevel: 'Junior' | 'Mid' | 'Senior' | 'Expert') => void;
  updateStudentProfile: (candidateId: string, profile: StudentCareerProfile) => void;
  createJobPosting: (jobData: Omit<RecruiterJobDescription, 'id' | 'isDemoData' | 'createdAt'>) => string;
  resetDemoData: () => void;
  isLoaded: boolean;
}

const SkillXContext = createContext<SkillXContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'skillx_mvp_state_v1';

export const SkillXProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_MOCK_CANDIDATES);
  const [jobs, setJobs] = useState<RecruiterJobDescription[]>(INITIAL_MOCK_JOBS);
  const [skills] = useState<Skill[]>(INITIAL_MOCK_SKILLS);
  const [assessments] = useState<Record<string, Assessment>>(INITIAL_MOCK_ASSESSMENTS);
  const [activeCandidateId, setActiveCandidateId] = useState<string>('cand-alex-chen');
  const [activeRole, setActiveRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.candidates) setCandidates(parsed.candidates);
        if (parsed.jobs) setJobs(parsed.jobs);
        if (parsed.activeCandidateId) setActiveCandidateId(parsed.activeCandidateId);
        if (parsed.activeRole) setActiveRole(parsed.activeRole);
      }
    } catch (e) {
      console.error('Failed to parse localStorage for SkillX state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage on mutation
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            candidates,
            jobs,
            activeCandidateId,
            activeRole,
          })
        );
      } catch (e) {
        console.error('Failed to save SkillX state to localStorage:', e);
      }
    }
  }, [candidates, jobs, activeCandidateId, activeRole, isLoaded]);

  // Active candidate helper
  const activeCandidate =
    candidates.find((c) => c.id === activeCandidateId) || candidates[0] || INITIAL_MOCK_CANDIDATES[0];

  // Function: Submit Assessment and recalculate Proof Score live
  const updateAssessmentScore = (candidateId: string, skillId: string, scorePct: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((cand) => {
        if (cand.id !== candidateId) return cand;

        let skillFound = false;
        const updatedSkills = cand.skills.map((skillItem) => {
          if (skillItem.skillId !== skillId) return skillItem;

          skillFound = true;
          const newProofScore = calculateProofScore(skillItem.evidence, scorePct);

          return {
            ...skillItem,
            proofScore: newProofScore,
            lastAssessedAt: new Date().toISOString(),
          };
        });

        // If skill wasn't in candidate list, add it
        if (!skillFound) {
          const masterSkill = skills.find((s) => s.id === skillId);
          const skillName = masterSkill ? masterSkill.name : 'Technical Skill';
          const category = masterSkill ? masterSkill.category : 'Frontend';
          const newProofScore = calculateProofScore([], scorePct);

          updatedSkills.push({
            skillId,
            skillName,
            category,
            claimedLevel: scorePct >= 80 ? 'Senior' : 'Mid',
            proofScore: newProofScore,
            evidence: [],
            lastAssessedAt: new Date().toISOString(),
          });
        }

        // Recalculate candidate overall average proof score
        const totalOverallSum = updatedSkills.reduce((sum, s) => sum + s.proofScore.overall, 0);
        const newOverall = Math.round(totalOverallSum / (updatedSkills.length || 1));

        // Add to recent assessments log
        const newAttempt = {
          id: `attempt-${Date.now()}`,
          assessmentId: `assess-${skillId}`,
          candidateId,
          scorePercentage: scorePct,
          completedAt: new Date().toISOString(),
          passed: scorePct >= 70,
        };

        return {
          ...cand,
          skills: updatedSkills,
          overallProofScore: newOverall,
          recentAssessments: [newAttempt, ...cand.recentAssessments],
        };
      })
    );
  };

  // Function: Add Evidence artifact to skill
  const addEvidenceToSkill = (
    candidateId: string,
    skillId: string,
    evidenceData: Omit<Evidence, 'id' | 'verifiedAt'>
  ) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((cand) => {
        if (cand.id !== candidateId) return cand;

        const newEvidenceItem: Evidence = {
          ...evidenceData,
          id: `ev-${Date.now()}`,
          verifiedAt: new Date().toISOString(),
        };

        const updatedSkills = cand.skills.map((skillItem) => {
          if (skillItem.skillId !== skillId) return skillItem;

          const updatedEvidence = [newEvidenceItem, ...skillItem.evidence];
          const lastAssessmentPct = skillItem.proofScore.assessmentWeight
            ? Math.round((skillItem.proofScore.assessmentWeight / 40) * 100)
            : undefined;

          const newProofScore = calculateProofScore(updatedEvidence, lastAssessmentPct);

          return {
            ...skillItem,
            evidence: updatedEvidence,
            proofScore: newProofScore,
          };
        });

        const totalOverallSum = updatedSkills.reduce((sum, s) => sum + s.proofScore.overall, 0);
        const newOverall = Math.round(totalOverallSum / (updatedSkills.length || 1));

        return {
          ...cand,
          skills: updatedSkills,
          overallProofScore: newOverall,
        };
      })
    );
  };

  // Function: Add new Skill Claim
  const addSkillClaim = (
    candidateId: string,
    skillId: string,
    claimedLevel: 'Junior' | 'Mid' | 'Senior' | 'Expert'
  ) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((cand) => {
        if (cand.id !== candidateId) return cand;

        const existingIndex = cand.skills.findIndex((s) => s.skillId === skillId);
        if (existingIndex >= 0) {
          const updatedSkills = [...cand.skills];
          updatedSkills[existingIndex] = {
            ...updatedSkills[existingIndex],
            claimedLevel,
          };
          return { ...cand, skills: updatedSkills };
        }

        const masterSkill = skills.find((s) => s.id === skillId);
        const skillName = masterSkill ? masterSkill.name : 'Technical Skill';
        const category = masterSkill ? masterSkill.category : 'Frontend';
        const initialScore = calculateProofScore([]);

        const newSkillProof = {
          skillId,
          skillName,
          category,
          claimedLevel,
          proofScore: initialScore,
          evidence: [],
        };

        const updatedSkills = [...cand.skills, newSkillProof];
        const totalOverallSum = updatedSkills.reduce((sum, s) => sum + s.proofScore.overall, 0);
        const newOverall = Math.round(totalOverallSum / (updatedSkills.length || 1));

        return {
          ...cand,
          skills: updatedSkills,
          overallProofScore: newOverall,
        };
      })
    );
  };

  // Function: Update Student Career Profile
  const updateStudentProfile = (candidateId: string, profile: StudentCareerProfile) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((cand) => {
        if (cand.id !== candidateId) return cand;

        return {
          ...cand,
          name: profile.studentName || cand.name,
          careerProfile: {
            ...profile,
            updatedAt: new Date().toISOString(),
          },
        };
      })
    );
  };

  // Function: Create dynamic Job Posting
  const createJobPosting = (jobData: Omit<RecruiterJobDescription, 'id' | 'isDemoData' | 'createdAt'>): string => {
    const newId = `job-${Date.now()}`;
    const newJob: RecruiterJobDescription = {
      ...jobData,
      id: newId,
      isDemoData: true,
      createdAt: new Date().toISOString(),
    };

    setJobs((prev) => [newJob, ...prev]);
    return newId;
  };

  // Reset to initial mock dataset
  const resetDemoData = () => {
    setCandidates(INITIAL_MOCK_CANDIDATES);
    setJobs(INITIAL_MOCK_JOBS);
    setActiveCandidateId('cand-alex-chen');
    setActiveRole('candidate');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <SkillXContext.Provider
      value={{
        candidates,
        activeCandidate,
        activeCandidateId,
        setActiveCandidateId,
        jobs,
        skills,
        assessments,
        activeRole,
        setActiveRole,
        updateAssessmentScore,
        addEvidenceToSkill,
        addSkillClaim,
        updateStudentProfile,
        createJobPosting,
        resetDemoData,
        isLoaded,
      }}
    >
      {children}
    </SkillXContext.Provider>
  );
};

export const useSkillX = () => {
  const context = useContext(SkillXContext);
  if (!context) {
    throw new Error('useSkillX must be used within a SkillXProvider');
  }
  return context;
};
