'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSkillX } from '@/context/SkillXContext';
import { calculateCareerReadiness } from '@/lib/utils/careerReadiness';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { EvidenceCard } from '@/components/shared/EvidenceCard';
import { SkillRadarChart } from '@/components/candidate/SkillRadarChart';
import { ProofAuditModal } from '@/components/shared/ProofAuditModal';
import { AddEvidenceModal } from '@/components/candidate/AddEvidenceModal';
import { AddSkillModal } from '@/components/candidate/AddSkillModal';
import { CandidateSkillProof } from '@/lib/types';
import { cn } from '@/lib/utils/utils';
import { ShieldCheck, Plus, ArrowRight, Sparkles, FileCode, Compass, BookOpen, Target, FolderGit2, FileText, HelpCircle } from 'lucide-react';

export default function CandidateDashboardPage() {
  const {
    activeCandidate,
    completedTaskIds,
    candidateProjects,
    resumeChecklistState,
    practicedQuestionIds,
  } = useSkillX();
  const [selectedAuditSkill, setSelectedAuditSkill] = useState<CandidateSkillProof | null>(null);
  const [addEvidenceSkill, setAddEvidenceSkill] = useState<{ id: string; name: string } | null>(null);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState<boolean>(false);

  const readiness = calculateCareerReadiness(activeCandidate, completedTaskIds);

  return (
    <div className="space-y-8 pb-12">
      {/* Candidate Profile Header Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/20 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Image
              src={activeCandidate.avatarUrl}
              alt={activeCandidate.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{activeCandidate.name}</h1>
                <Badge variant="demo" className="text-[10px]">DEMO CANDIDATE</Badge>
                {activeCandidate.careerProfile?.targetRole && (
                  <Badge variant="gold" className="text-[10px]">
                    Goal: {activeCandidate.careerProfile.targetRole}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-300 font-medium">{activeCandidate.title}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">{activeCandidate.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-secondary/40 border border-border/80 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider block">Verified Proof Score</span>
              <ProofScoreBadge score={activeCandidate.overallProofScore} size="lg" showConfidence={true} />
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/candidate/career-guidance"
                className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'flex items-center gap-1.5 text-xs')}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Get Career Guidance
              </Link>
              <Link
                href="/candidate/career-profile"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex items-center gap-1.5 text-xs')}
              >
                <Compass className="h-3.5 w-3.5" />
                Student Profile
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Skill Matrix Chart + Recent Assessment & Career Guidance Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Skill Matrix Radar / Bar */}
        <Card className="lg:col-span-2 border-border/80 bg-card/80 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                Verified Skill Proof Matrix
              </h2>
              <p className="text-xs text-muted-foreground">
                Proof scores calculated from code repositories, assessments, and consistency metrics.
              </p>
            </div>
          </div>

          <SkillRadarChart skills={activeCandidate.skills} />
        </Card>

        {/* Right Column: Career Readiness, AI Guidance & Action Cards */}
        <div className="space-y-6">
          {/* Career Readiness & Skill Gap Card */}
          <Card className="border-indigo-500/40 bg-gradient-to-b from-card via-indigo-950/30 to-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Career Readiness</h3>
                  <p className="text-xs text-slate-300">Skill gap & readiness index</p>
                </div>
              </div>
              <span className="text-xl font-mono font-black text-indigo-400">{readiness.overallReadinessPercentage}%</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Goal: <strong className="text-white">{readiness.roleTitle}</strong></span>
                <span>{readiness.completedSkillsCount}/{readiness.totalRequiredSkillsCount} Skills</span>
              </div>
              <Progress value={readiness.overallReadinessPercentage} className="h-2" />
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {readiness.overallReadinessPercentage >= 75
                  ? 'High readiness. Ready for technical recruiter matching.'
                  : readiness.overallReadinessPercentage >= 50
                  ? 'Moderate readiness. Complete learning roadmap tasks and code challenges to boost score.'
                  : 'Foundational stage. Build skills via milestone roadmaps and proof assessments.'}
              </p>
            </div>

            <Link
              href={`/candidate/career-readiness?role=${encodeURIComponent(readiness.roleTitle)}`}
              className={cn(buttonVariants({ variant: 'gradient' }), 'w-full justify-between text-xs h-10 flex items-center px-4')}
            >
              <span>View Skill Gap & Readiness</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="border-indigo-500/40 bg-gradient-to-b from-indigo-950/50 to-card p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Career Guidance (ED-02)</h3>
                <p className="text-xs text-slate-300">Discover target roles & skill gap roadmaps.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Match your verified skills and interests against benchmark roles like Full Stack, AI/ML, and Cloud Engineering.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/candidate/career-guidance"
                className={cn(buttonVariants({ variant: 'gradient' }), 'w-full justify-between text-xs h-10 flex items-center px-4')}
              >
                <span>Explore Career Guidance Engine</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/candidate/learning-roadmap"
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between text-xs h-10 border-indigo-500/40 hover:bg-indigo-950/50 flex items-center px-4')}
              >
                <span className="flex items-center gap-1.5 text-indigo-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  My Learning Roadmap
                </span>
                <ArrowRight className="h-4 w-4 text-indigo-400" />
              </Link>
            </div>
          </Card>

          {/* Portfolio Readiness Card */}
          <Card className="border-indigo-500/40 bg-card/90 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Portfolio Readiness</h3>
                  <p className="text-xs text-slate-300">Verified projects & evidence</p>
                </div>
              </div>
              <span className="text-xl font-mono font-black text-indigo-400">
                {candidateProjects.length} Projects
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Attach technical project claims and code artifact evidence to boost your public proof portfolio.
            </p>

            <Link
              href="/candidate/portfolio"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between text-xs h-10 border-indigo-500/40 hover:bg-indigo-950/50 flex items-center px-4')}
            >
              <span>Manage Verified Portfolio</span>
              <ArrowRight className="h-4 w-4 text-indigo-400" />
            </Link>
          </Card>

          {/* Resume Readiness Card */}
          <Card className="border-indigo-500/40 bg-card/90 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Resume Readiness</h3>
                  <p className="text-xs text-slate-300">Section optimization audit</p>
                </div>
              </div>
              <span className="text-xl font-mono font-black text-emerald-400">
                {Math.round((Object.keys(resumeChecklistState).filter((k) => resumeChecklistState[k]).length / 8) * 100)}%
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Audit technical skills categorization, education credentials, and STAR project descriptions.
            </p>

            <Link
              href="/candidate/resume-readiness"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between text-xs h-10 border-indigo-500/40 hover:bg-indigo-950/50 flex items-center px-4')}
            >
              <span>Audit Resume Checklist</span>
              <ArrowRight className="h-4 w-4 text-indigo-400" />
            </Link>
          </Card>

          {/* Interview Preparation Card */}
          <Card className="border-indigo-500/40 bg-card/90 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Interview Prep Hub</h3>
                  <p className="text-xs text-slate-300">Technical & behavioral prompts</p>
                </div>
              </div>
              <span className="text-xl font-mono font-black text-indigo-400">
                {Object.keys(practicedQuestionIds).filter((k) => practicedQuestionIds[k]).length} Mastered
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Practice role-specific system design, React performance, SQL tuning, and behavioral STAR questions.
            </p>

            <Link
              href="/candidate/interview-preparation"
              className={cn(buttonVariants({ variant: 'gradient' }), 'w-full justify-between text-xs h-10 flex items-center px-4')}
            >
              <span>Open Interview Prep Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </div>

      {/* Verified Skill Cards List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCode className="h-5 w-5 text-blue-400" />
              Skill Proof Breakdown & Evidence Linkage
            </h2>
            <span className="text-xs text-muted-foreground">
              {activeCandidate.skills.length} Skills Verified
            </span>
          </div>

          <Button
            variant="gradient"
            size="sm"
            onClick={() => setIsAddSkillOpen(true)}
            className="text-xs flex items-center gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Skill Claim
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCandidate.skills.map((skillItem) => (
            <Card key={skillItem.skillId} className="border-border/80 bg-card/90 space-y-4">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                      {skillItem.skillName}
                      <Badge variant="outline" className="text-[10px]">
                        {skillItem.category}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Claimed Level: <strong className="text-slate-200">{skillItem.claimedLevel}</strong>
                    </CardDescription>
                  </div>

                  <div className="text-right">
                    <ProofScoreBadge score={skillItem.proofScore} size="md" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-3">
                {/* Evidence Artifacts */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 block">
                    Verified Artifacts ({skillItem.evidence.length}):
                  </span>

                  {skillItem.evidence.length > 0 ? (
                    skillItem.evidence.map((ev) => (
                      <EvidenceCard key={ev.id} evidence={ev} />
                    ))
                  ) : (
                    <div className="p-3 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">
                      No code artifacts attached yet. Attach a GitHub repo to boost score.
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAuditSkill(skillItem)}
                  className="text-xs text-indigo-300 hover:text-white"
                >
                  Inspect Math Audit
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAddEvidenceSkill({ id: skillItem.skillId, name: skillItem.skillName })}
                    className="text-xs flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Evidence
                  </Button>

                  <Link
                    href={`/candidate/assess/${skillItem.skillId}`}
                    className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'text-xs')}
                  >
                    Take Test
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Proof Audit Modal */}
      <ProofAuditModal
        open={!!selectedAuditSkill}
        onOpenChange={() => setSelectedAuditSkill(null)}
        skillProof={selectedAuditSkill}
        candidateName={activeCandidate.name}
      />

      {/* Add Evidence Modal */}
      {addEvidenceSkill && (
        <AddEvidenceModal
          open={!!addEvidenceSkill}
          onOpenChange={() => setAddEvidenceSkill(null)}
          skillId={addEvidenceSkill.id}
          skillName={addEvidenceSkill.name}
        />
      )}

      {/* Add Skill Claim Modal */}
      <AddSkillModal
        open={isAddSkillOpen}
        onOpenChange={setIsAddSkillOpen}
      />
    </div>
  );
}
