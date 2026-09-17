'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { calculateCareerReadiness } from '@/lib/utils/careerReadiness';
import { CAREER_BENCHMARKS } from '@/lib/utils/careerRecommender';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { cn } from '@/lib/utils/utils';
import {
  ArrowLeft,
  Sparkles,
  Target,
  Award,
  BookOpen,
  Layers,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  BarChart3
} from 'lucide-react';

export default function CareerReadinessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Career Readiness Analysis...</div>}>
      <CareerReadinessContent />
    </Suspense>
  );
}

function CareerReadinessContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams?.get('role');
  const { activeCandidate, completedTaskIds } = useSkillX();

  const [selectedRole, setSelectedRole] = useState<string>(
    roleParam || activeCandidate.careerProfile?.targetRole || 'Full Stack Developer'
  );

  const readiness = calculateCareerReadiness(activeCandidate, completedTaskIds, selectedRole);

  const availableRoles = CAREER_BENCHMARKS.map((b) => b.roleTitle);

  return (
    <div className="space-y-8 py-4 pb-16 max-w-6xl mx-auto">
      {/* Top Header & Navigation */}
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
            <BarChart3 className="h-3.5 w-3.5" />
            CAREER READINESS & SKILL GAP
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO ESTIMATE
          </Badge>
        </div>
      </div>

      {/* Main Title & Role Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Target className="h-6 w-6 text-indigo-400" />
            Career Readiness Analysis
          </h1>
          <p className="text-xs text-slate-300">
            Skill gap breakdown & preparation readiness for <strong className="text-white">{activeCandidate.name}</strong>.
          </p>
        </div>

        {/* Role Selector Dropdown */}
        <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-xl border border-border/60">
          <span className="text-xs text-slate-400 font-semibold pl-2">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-card text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {availableRoles.map((role) => (
              <option key={role} value={role} className="bg-slate-900 text-white">
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Overview Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/40 to-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Score Column */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-2xl border border-indigo-500/20 text-center space-y-3">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Overall Career Readiness
            </span>
            <div className="relative flex items-center justify-center">
              <span className="text-5xl font-black font-mono text-indigo-400">
                {readiness.overallReadinessPercentage}%
              </span>
            </div>
            <Badge
              variant={
                readiness.overallReadinessPercentage >= 75
                  ? 'success'
                  : readiness.overallReadinessPercentage >= 50
                  ? 'gold'
                  : 'outline'
              }
              className="text-xs px-3 py-0.5"
            >
              {readiness.overallReadinessPercentage >= 75
                ? 'High Readiness'
                : readiness.overallReadinessPercentage >= 50
                ? 'Moderate Readiness'
                : 'Building Foundations'}
            </Badge>
            <p className="text-[11px] text-slate-400 leading-tight">
              Target Role: <strong className="text-white">{readiness.roleTitle}</strong>
            </p>
          </div>

          {/* Sub-Score Breakdown Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Skill Completion */}
            <div className="p-4 rounded-xl border border-border/80 bg-card/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Skill Completion
                </span>
                <span className="font-mono font-bold text-emerald-400">{readiness.skillCompletionPercentage}%</span>
              </div>
              <Progress value={readiness.skillCompletionPercentage} className="h-2" />
              <span className="text-[11px] text-slate-400 block">
                {readiness.completedSkillsCount} of {readiness.totalRequiredSkillsCount} required skills completed
              </span>
            </div>

            {/* Roadmap Progress */}
            <div className="p-4 rounded-xl border border-border/80 bg-card/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  Roadmap Progress
                </span>
                <span className="font-mono font-bold text-indigo-400">{readiness.roadmapCompletionPercentage}%</span>
              </div>
              <Progress value={readiness.roadmapCompletionPercentage} className="h-2" />
              <span className="text-[11px] text-slate-400 block">
                Interactive milestone checklists completed
              </span>
            </div>

            {/* Portfolio Readiness */}
            <div className="p-4 rounded-xl border border-border/80 bg-card/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-amber-400" />
                  Portfolio & Artifacts
                </span>
                <span className="font-mono font-bold text-amber-400">{readiness.portfolioReadinessPercentage}%</span>
              </div>
              <Progress value={readiness.portfolioReadinessPercentage} className="h-2" />
              <span className="text-[11px] text-slate-400 block">
                Verified proof score & linked repositories
              </span>
            </div>

            {/* Resume & Profile */}
            <div className="p-4 rounded-xl border border-border/80 bg-card/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-blue-400" />
                  Profile Readiness
                </span>
                <span className="font-mono font-bold text-blue-400">{readiness.resumeReadinessPercentage}%</span>
              </div>
              <Progress value={readiness.resumeReadinessPercentage} className="h-2" />
              <span className="text-[11px] text-slate-400 block">
                Education, target role & preference tags
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Transparent Formula Note Card */}
      <Card className="border-border/80 bg-card/90 p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Score Formula:</strong> {readiness.formulaDetails.skillWeight}% Skill Completion +{' '}
              {readiness.formulaDetails.roadmapWeight}% Roadmap Progress +{' '}
              {readiness.formulaDetails.portfolioWeight}% Portfolio Readiness +{' '}
              {readiness.formulaDetails.resumeWeight}% Profile Completion.
            </span>
          </div>
          <Badge variant="secondary" className="text-[10px] shrink-0 font-normal">
            This is a demo readiness estimate based on your profile data.
          </Badge>
        </div>
      </Card>

      {/* Skill Gap Analysis Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              Skill Gap Analysis ({readiness.roleTitle})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparison between required role competencies and student claimed / verified skills.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Badge variant="success" className="text-[10px]">
              {readiness.skillsBreakdown.filter((s) => s.status === 'Completed').length} Completed
            </Badge>
            <Badge variant="gold" className="text-[10px]">
              {readiness.skillsBreakdown.filter((s) => s.status === 'In Progress').length} In Progress
            </Badge>
            <Badge variant="outline" className="text-[10px] text-rose-400 border-rose-500/30">
              {readiness.skillsBreakdown.filter((s) => s.status === 'Not Started').length} Not Started
            </Badge>
          </div>
        </div>

        {/* Skill Gap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readiness.skillsBreakdown.map((item) => (
            <Card
              key={item.skillName}
              className={`p-4 transition-all bg-card/90 space-y-3 ${
                item.status === 'Completed'
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : item.status === 'In Progress'
                  ? 'border-amber-500/30 bg-amber-950/10'
                  : 'border-border/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.skillName}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300">{item.recommendedAction}</p>
                </div>

                {/* Status Badge */}
                <span className="shrink-0">
                  {item.status === 'Completed' ? (
                    <Badge variant="success" className="text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </Badge>
                  ) : item.status === 'In Progress' ? (
                    <Badge variant="gold" className="text-[10px] flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      In Progress
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] text-rose-400 border-rose-500/40 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Not Started
                    </Badge>
                  )}
                </span>
              </div>

              {/* Bottom Proof Score or CTA link */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
                {item.proofScore !== undefined ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Proof Score:</span>
                    <ProofScoreBadge score={item.proofScore} size="sm" />
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">No verified proof score yet</span>
                )}

                <Link
                  href={
                    item.status === 'Not Started'
                      ? `/candidate/learning-roadmap?role=${encodeURIComponent(readiness.roleTitle)}`
                      : '/candidate/assess/skill-nextjs'
                  }
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  {item.status === 'Completed' ? 'Re-verify Skill' : item.status === 'In Progress' ? 'Verify Skill' : 'Learn Skill'}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Actionable Personalized Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            Actionable Readiness Recommendations
          </h2>
          <span className="text-xs text-slate-400">Step-by-step career readiness plan</span>
        </div>

        <div className="space-y-3">
          {readiness.recommendations.map((rec) => (
            <Card
              key={rec.id}
              className="p-5 border-border/80 bg-card/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      rec.priority === 'High'
                        ? 'gold'
                        : rec.priority === 'Medium'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="text-[10px]"
                  >
                    {rec.priority} Priority
                  </Badge>
                  <h3 className="text-sm font-bold text-white">{rec.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>
              </div>

              <Link
                href={rec.actionUrl}
                className={cn(
                  buttonVariants({
                    variant: rec.priority === 'High' ? 'gradient' : 'outline',
                    size: 'sm',
                  }),
                  'text-xs flex items-center gap-1.5 shrink-0 w-fit'
                )}
              >
                {rec.actionLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-card to-indigo-950/40 p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Ready to Boost Your Readiness Score?</h3>
            </div>
            <p className="text-xs text-slate-300">
              Complete interactive milestone tasks in your learning roadmap or take a 5-minute code assessment.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/candidate/learning-roadmap?role=${encodeURIComponent(readiness.roleTitle)}`}
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'text-xs flex items-center gap-1.5')}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Open Learning Roadmap
            </Link>
            <Link
              href="/candidate/assess/skill-nextjs"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs flex items-center gap-1.5')}
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
