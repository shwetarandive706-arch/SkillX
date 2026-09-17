'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { MarketTrendsCard } from '@/components/candidate/MarketTrendsCard';
import { CAREER_BENCHMARKS } from '@/lib/utils/careerRecommender';
import { cn } from '@/lib/utils/utils';
import {
  BookOpen,
  ArrowLeft,
  CheckSquare,
  Square,
  Sparkles,
  Target,
  GraduationCap,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export default function LearningRoadmapPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Learning Roadmap...</div>}>
      <LearningRoadmapContent />
    </Suspense>
  );
}

function LearningRoadmapContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams?.get('role');
  const { activeCandidate, completedTaskIds, toggleRoadmapTask } = useSkillX();

  const profile = activeCandidate.careerProfile;
  const targetRole = roleParam || profile?.targetRole || 'Full Stack Developer';

  const benchmark =
    CAREER_BENCHMARKS.find((b) => b.roleTitle.toLowerCase() === targetRole.toLowerCase()) ||
    CAREER_BENCHMARKS.find((b) => b.roleTitle === 'Full Stack Developer') ||
    CAREER_BENCHMARKS[0];

  // Define structured milestone tasks for the role
  const milestones = [
    {
      id: 'm1',
      title: 'Milestone 1: Foundational Competencies & Syntax',
      estimatedEffort: '2 Weeks (15 Hours/wk)',
      description: 'Establish core language proficiency, type safety, and component fundamentals.',
      tasks: [
        { id: `task-${benchmark.roleTitle}-1-1`, text: `Master ${benchmark.requiredSkills[0] || 'Core Syntax'} fundamentals and type annotations.` },
        { id: `task-${benchmark.roleTitle}-1-2`, text: 'Set up modular repository structure with strict linting rules.' },
        { id: `task-${benchmark.roleTitle}-1-3`, text: `Complete baseline exercises in ${benchmark.requiredSkills[1] || 'Framework Essentials'}.` },
      ]
    },
    {
      id: 'm2',
      title: 'Milestone 2: Framework Architecture & State Flow',
      estimatedEffort: '3 Weeks (20 Hours/wk)',
      description: 'Build real-world application features, state management, and API integrations.',
      tasks: [
        { id: `task-${benchmark.roleTitle}-2-1`, text: `Implement production feature using ${benchmark.suggestedRoadmap[0] || 'App Architecture'}.` },
        { id: `task-${benchmark.roleTitle}-2-2`, text: 'Build responsive UI components and handle error boundaries.' },
        { id: `task-${benchmark.roleTitle}-2-3`, text: `Integrate asynchronous API data fetching and state caching.` },
      ]
    },
    {
      id: 'm3',
      title: 'Milestone 3: Database Optimization & Infrastructure',
      estimatedEffort: '2 Weeks (15 Hours/wk)',
      description: 'Optimize data storage, query execution, and deployment pipelines.',
      tasks: [
        { id: `task-${benchmark.roleTitle}-3-1`, text: `Configure schema migrations & indexing for ${benchmark.requiredSkills[2] || 'Database Storage'}.` },
        { id: `task-${benchmark.roleTitle}-3-2`, text: 'Containerize application with Docker & multi-stage builds.' },
        { id: `task-${benchmark.roleTitle}-3-3`, text: 'Perform security vulnerability checks & environment config.' },
      ]
    },
    {
      id: 'm4',
      title: 'Milestone 4: SkillX Proof Verification & Portfolio Readiness',
      estimatedEffort: '1 Week (10 Hours/wk)',
      description: 'Verify skill proofs via interactive code assessments and GitHub evidence linkage.',
      tasks: [
        { id: `task-${benchmark.roleTitle}-4-1`, text: `Complete 5-question practical assessment for ${benchmark.requiredSkills[0] || 'Primary Skill'}.` },
        { id: `task-${benchmark.roleTitle}-4-2`, text: 'Attach verified GitHub repository artifact to Candidate Portfolio.' },
        { id: `task-${benchmark.roleTitle}-4-3`, text: 'Achieve Gold/Silver Proof Score confidence badge on SkillX.' },
      ]
    }
  ];

  // Calculate overall task progress
  const allTasks = milestones.flatMap((m) => m.tasks);
  const totalTasks = allTasks.length;
  const completedCount = allTasks.filter((t) => !!completedTaskIds[t.id]).length;
  const progressPercentage = Math.round((completedCount / (totalTasks || 1)) * 100);

  // Analyze current candidate skills vs benchmark requirements
  const candidateSkills = new Set(activeCandidate.skills.map((s) => s.skillName.toLowerCase()));
  const verifiedSkillsCount = benchmark.requiredSkills.filter((s) => candidateSkills.has(s.toLowerCase())).length;

  return (
    <div className="space-y-8 py-4 pb-16 max-w-6xl mx-auto">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <Link
          href="/candidate/career-guidance"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'flex items-center gap-1.5 text-xs text-slate-400 hover:text-white')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AI Career Guidance
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            PERSONALIZED LEARNING ROADMAP
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO CURATED ROADMAP
          </Badge>
        </div>
      </div>

      {/* Main Header Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/30 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                <BookOpen className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-black text-white">{benchmark.roleTitle} Learning Roadmap</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Personalized learning sequence tailored for <strong className="text-white">{activeCandidate.name}</strong>.
              Track milestone progress, complete interactive learning tasks, and close skill gaps to achieve proof verification.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-secondary/40 border border-border/80 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono block">Roadmap Completion</span>
              <span className="text-2xl font-mono font-black text-indigo-400">{progressPercentage}%</span>
            </div>
            <div className="w-24">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Student & Role Context Card */}
      <Card className="border-border/80 bg-card/90 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 block font-semibold flex items-center gap-1">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              Student Profile
            </span>
            <span className="text-sm font-bold text-white block">{activeCandidate.name}</span>
            <span className="text-xs text-slate-300 block">{profile?.education || 'B.Tech Computer Science'}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 block font-semibold flex items-center gap-1">
              <Target className="h-4 w-4 text-amber-400" />
              Target Career Role
            </span>
            <Badge variant="gold" className="text-xs">
              {benchmark.roleTitle} ({benchmark.category})
            </Badge>
            <span className="text-xs text-slate-300 block mt-1">
              {verifiedSkillsCount} of {benchmark.requiredSkills.length} required skills verified
            </span>
          </div>

          <div className="space-y-1 md:text-right">
            <span className="text-xs text-slate-400 block font-semibold">Verified Proof Readiness</span>
            <ProofScoreBadge score={activeCandidate.overallProofScore} size="sm" showConfidence={true} />
          </div>
        </div>
      </Card>

      {/* Milestone Tasks Sequence */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            Milestone Sequence & Task Checklists ({completedCount}/{totalTasks} Tasks)
          </h2>
          <span className="text-xs text-muted-foreground">
            Checkboxes auto-save state to local storage
          </span>
        </div>

        <div className="space-y-6">
          {milestones.map((m) => {
            const milestoneCompletedTasks = m.tasks.filter((t) => !!completedTaskIds[t.id]).length;
            const milestoneTotal = m.tasks.length;
            const isMilestoneDone = milestoneCompletedTasks === milestoneTotal;

            return (
              <Card
                key={m.id}
                className={`transition-all bg-card/90 space-y-4 ${
                  isMilestoneDone ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-border/80'
                }`}
              >
                <CardHeader className="p-5 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-7 w-7 rounded-xl text-xs font-bold font-mono flex items-center justify-center ${
                          isMilestoneDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        }`}
                      >
                        {m.id.replace('m', 'M')}
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          {m.title}
                          {isMilestoneDone && (
                            <Badge variant="success" className="text-[10px]">
                              Milestone Completed
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5">{m.description}</CardDescription>
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs flex items-center gap-1 shrink-0 w-fit">
                      <Clock className="h-3 w-3 text-indigo-400" />
                      {m.estimatedEffort}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-2">
                  <div className="space-y-2 text-xs pt-2 border-t border-border/50">
                    {m.tasks.map((task) => {
                      const isChecked = !!completedTaskIds[task.id];
                      return (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => toggleRoadmapTask(task.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-start gap-3 ${
                            isChecked
                              ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200'
                              : 'border-border/60 bg-secondary/20 text-slate-300 hover:bg-secondary/50'
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-500" />
                            )}
                          </span>
                          <span className={isChecked ? 'line-through opacity-80' : ''}>
                            {task.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Action Prompt Card to Verify Skills */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-card to-indigo-950/40 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Ready to Verify Milestone Skills?</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Take a 5-minute practical code assessment or attach a GitHub repository to verify your proof score.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/candidate/career-readiness?role=${encodeURIComponent(benchmark.roleTitle)}`}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs border-indigo-500/40 text-indigo-300 hover:text-white')}
            >
              View Skill Gap Analysis
            </Link>
            <Link
              href="/candidate/assess/skill-nextjs"
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'text-xs flex items-center gap-1.5')}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Take Assessment
            </Link>
          </div>
        </div>
      </Card>

      {/* Embedded Market Insights Section */}
      <MarketTrendsCard roleTitle={benchmark.roleTitle} />
    </div>
  );
}
