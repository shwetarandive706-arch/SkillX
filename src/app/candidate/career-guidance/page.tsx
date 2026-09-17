'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSkillX } from '@/context/SkillXContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { generateCareerRecommendations, CAREER_BENCHMARKS } from '@/lib/utils/careerRecommender';
import { cn } from '@/lib/utils/utils';
import {
  Compass,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Target,
  FileCode,
  Edit3,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CareerGuidancePage() {
  const { activeCandidate } = useSkillX();
  const profile = activeCandidate.careerProfile;

  // Generate dynamic recommendations
  const recommendations = generateCareerRecommendations(activeCandidate);
  const topRecommendation = recommendations[0];

  // Selected benchmark for detailed skill gap analysis
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>(
    topRecommendation ? topRecommendation.roleTitle : 'Full Stack Developer'
  );

  const selectedBenchmark =
    CAREER_BENCHMARKS.find((b) => b.roleTitle === selectedRoleTitle) || CAREER_BENCHMARKS[0];

  // Calculate detailed gap metrics for selected role
  const candidateSkillMap = new Map<string, number>(
    activeCandidate.skills.map((s) => [s.skillName.toLowerCase(), s.proofScore.overall])
  );

  const gapAnalysis = selectedBenchmark.requiredSkills.map((reqSkill) => {
    let matchedScore: number | undefined = undefined;
    candidateSkillMap.forEach((score, name) => {
      if (name.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(name)) {
        matchedScore = score;
      }
    });

    const isVerified = matchedScore !== undefined && matchedScore >= 60;
    const isBaseline = matchedScore !== undefined && matchedScore < 60;

    return {
      skillName: reqSkill,
      score: matchedScore || 0,
      status: isVerified ? ('verified' as const) : isBaseline ? ('baseline' as const) : ('missing' as const),
    };
  });

  const verifiedCount = gapAnalysis.filter((g) => g.status === 'verified').length;
  const missingCount = gapAnalysis.filter((g) => g.status === 'missing').length;

  return (
    <div className="space-y-8 py-4 pb-16 max-w-6xl mx-auto">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <Link
          href="/candidate/dashboard"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'flex items-center gap-1.5 text-xs text-slate-400 hover:text-white')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Candidate Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs flex items-center gap-1">
            <Compass className="h-3.5 w-3.5" />
            AI CAREER GUIDANCE (ED-02)
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO RULE-BASED ENGINE
          </Badge>
        </div>
      </div>

      {/* Main Header Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/30 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                <Sparkles className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-black text-white">AI-Powered Career Guidance & Skill Gap Engine</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Transparent, explainable career recommendations mapping your verified skills, academic background,
              and areas of interest against industry benchmarks. Discover your optimal career path and close critical skill gaps.
            </p>
          </div>

          <Link href="/candidate/career-profile">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5 shrink-0 border-indigo-500/40">
              <Edit3 className="h-3.5 w-3.5" />
              Update Career Profile
            </Button>
          </Link>
        </div>
      </Card>

      {/* Transparent AI Disclosure Banner */}
      <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 text-xs text-blue-200 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Explainable Prototype Engine Note:</strong> Career recommendations are calculated deterministically by evaluating skill overlap, interest alignment, and target role goals. SkillX provides transparent insights without black-box claims or unverified market predictions.
        </div>
      </div>

      {/* Student Profile Overview Card */}
      <Card className="border-border/80 bg-card/90 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{profile?.studentName || activeCandidate.name}</h2>
                <Badge variant="outline" className="text-[10px]">
                  {profile?.experienceLevel || 'Intermediate'}
                </Badge>
              </div>
              <p className="text-xs text-slate-300 font-medium">{profile?.education || 'B.Tech Computer Science'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono block">Target Role Goal</span>
              <Badge variant="gold" className="text-xs flex items-center gap-1 mt-0.5">
                <Target className="h-3 w-3" />
                {profile?.targetRole || 'Full Stack Developer'}
              </Badge>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono block">Verified Proof Score</span>
              <ProofScoreBadge score={activeCandidate.overallProofScore} size="sm" showConfidence={false} />
            </div>
          </div>
        </div>

        {/* Selected Interests & Goals Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div>
            <span className="text-slate-400 block mb-1 font-semibold">Selected Areas of Interest:</span>
            <div className="flex flex-wrap gap-1.5">
              {profile?.interests && profile.interests.length > 0 ? (
                profile.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-[10px]">
                    {interest}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground italic">No interests selected yet.</span>
              )}
            </div>
          </div>

          <div>
            <span className="text-slate-400 block mb-1 font-semibold">Career Aspiration:</span>
            <p className="text-slate-300 italic line-clamp-2">
              &ldquo;{profile?.careerGoals || 'Building scalable web applications and technical leadership.'}&rdquo;
            </p>
          </div>
        </div>
      </Card>

      {/* Section 1: AI Recommended Career Roles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-400" />
            Recommended Career Pathways ({recommendations.length})
          </h2>
          <span className="text-xs text-muted-foreground">
            Ranked by deterministic skill & interest match algorithm
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.slice(0, 4).map((rec, index) => (
            <Card
              key={rec.roleTitle}
              className={`transition-all bg-card/90 space-y-4 ${
                rec.isTargetRole
                  ? 'border-indigo-500/60 shadow-xl shadow-indigo-500/10'
                  : 'border-border/80 hover:border-border'
              }`}
            >
              <CardHeader className="p-5 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-bold font-mono text-xs flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <CardTitle className="text-lg font-bold text-white">{rec.roleTitle}</CardTitle>
                    </div>
                    <CardDescription className="text-xs mt-1">{rec.category}</CardDescription>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">Match</span>
                    <span className="text-2xl font-mono font-black text-indigo-400">{rec.matchPercentage}%</span>
                  </div>
                </div>

                <Progress value={rec.matchPercentage} className="mt-2 h-1.5" />
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-3">
                {/* Recommendation Reason */}
                <div className="p-3 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-xs text-slate-200 flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{rec.recommendationReason}</p>
                </div>

                {/* Skill Overlap Breakdown */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-400 block mb-1">
                      Matching Skills ({rec.matchingSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.matchingSkills.length > 0 ? (
                        rec.matchingSkills.map((sk) => (
                          <Badge key={sk} variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-300">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-400" />
                            {sk}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground italic text-[11px]">No direct skill overlap yet.</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-400 block mb-1">
                      Skills to Learn / Close Gap ({rec.missingSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.missingSkills.length > 0 ? (
                        rec.missingSkills.map((sk) => (
                          <Badge key={sk} variant="outline" className="text-[10px] border-amber-500/30 text-amber-300">
                            <AlertCircle className="h-3 w-3 mr-1 text-amber-400" />
                            {sk}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-emerald-400 text-[11px]">All required skills present!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Suggested Learning Roadmap Snippet */}
                <div className="pt-2 border-t border-border/50">
                  <span className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                    Suggested Learning Milestones:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {rec.roadmapTopics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRoleTitle(rec.roleTitle)}
                  className="text-xs text-indigo-300 hover:text-white"
                >
                  Analyze Skill Gap
                </Button>

                <Link
                  href={`/candidate/assess/skill-nextjs`}
                  className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'text-xs flex items-center gap-1')}
                >
                  Verify Skill Proof
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 2: Detailed Skill Gap Analysis */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-400" />
              Target Role Skill Gap Analysis
            </h2>
            <p className="text-xs text-muted-foreground">
              Detailed breakdown comparing your verified Proof Scores against required competencies for{' '}
              <strong className="text-indigo-300">{selectedRoleTitle}</strong>.
            </p>
          </div>

          {/* Role selector dropdown */}
          <div className="w-full sm:w-64 shrink-0">
            <select
              value={selectedRoleTitle}
              onChange={(e) => setSelectedRoleTitle(e.target.value)}
              className="w-full h-9 rounded-xl border border-border bg-slate-900 px-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CAREER_BENCHMARKS.map((b) => (
                <option key={b.roleTitle} value={b.roleTitle}>
                  {b.roleTitle} ({b.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <Card className="border-indigo-500/30 bg-card/90 p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{selectedBenchmark.roleTitle} Benchmark</h3>
                <Badge variant="outline" className="text-xs">{selectedBenchmark.category}</Badge>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{selectedBenchmark.overview}</p>
            </div>

            <div className="flex items-center gap-4 bg-secondary/40 border border-border/80 p-3 rounded-xl shrink-0">
              <div className="text-center px-2">
                <span className="text-[10px] text-emerald-400 block font-bold font-mono">VERIFIED</span>
                <span className="text-xl font-black text-white font-mono">{verifiedCount}</span>
              </div>
              <div className="h-8 w-px bg-border/80" />
              <div className="text-center px-2">
                <span className="text-[10px] text-amber-400 block font-bold font-mono">MISSING GAP</span>
                <span className="text-xl font-black text-white font-mono">{missingCount}</span>
              </div>
            </div>
          </div>

          {/* Skill Breakdown Rows */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400">Required Competency Readiness Matrix:</h4>
            {gapAnalysis.map((item) => (
              <div
                key={item.skillName}
                className="p-3.5 rounded-xl border border-border/60 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  {item.status === 'verified' ? (
                    <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  ) : item.status === 'baseline' ? (
                    <span className="p-1 rounded-md bg-blue-500/20 text-blue-400">
                      <FileCode className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
                      <AlertCircle className="h-4 w-4" />
                    </span>
                  )}

                  <div>
                    <span className="font-bold text-white block">{item.skillName}</span>
                    <span className="text-[11px] text-slate-400">
                      {item.status === 'verified'
                        ? 'Verified with code artifacts / passed assessment'
                        : item.status === 'baseline'
                        ? 'Claimed level recorded; proof score unverified'
                        : 'Skill Gap: Not yet claimed or verified on candidate profile'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {item.status !== 'missing' ? (
                    <ProofScoreBadge score={item.score} size="sm" showConfidence={false} />
                  ) : (
                    <Badge variant="destructive" className="text-[10px]">
                      Skill Gap Missing
                    </Badge>
                  )}

                  <Link
                    href={`/candidate/assess/skill-nextjs`}
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-[11px] h-8')}
                  >
                    Take Test
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Full Learning Roadmap for Selected Role */}
          <div className="pt-4 border-t border-border/60 space-y-3">
            <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-indigo-400" />
              Curated Roadmap Milestones for {selectedBenchmark.roleTitle}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedBenchmark.suggestedRoadmap.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-xs flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-indigo-600 text-white font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 font-medium leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
