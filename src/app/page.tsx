'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSkillX } from '@/context/SkillXContext';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { cn } from '@/lib/utils/utils';
import { ShieldCheck, UserCheck, Briefcase, FileCode, ArrowRight, Zap, Target } from 'lucide-react';

export default function LandingPage() {
  const { setActiveRole, activeCandidate } = useSkillX();

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-6">
        <Badge variant="demo" className="px-3 py-1 text-xs mx-auto">
          <ShieldCheck className="h-3.5 w-3.5 mr-1 text-blue-400" />
          VERIFIABLE SKILL PROOF PLATFORM
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Stop Hiring Keywords. <br />
          Verify Real <span className="gradient-text">Skill Proof Scores</span>.
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          SkillX replaces unverified resume claims with transparent, math-backed <strong className="text-white">Proof Scores (0–100)</strong> calculated from real code artifacts, live assessments, and project evidence.
        </p>

        {/* Dual Portal CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/candidate/dashboard"
            onClick={() => setActiveRole('candidate')}
            className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }), 'w-full sm:w-auto h-14 px-8 text-base flex items-center gap-2')}
          >
            <UserCheck className="h-5 w-5" />
            Candidate Demo: Verify Skills
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/recruiter/dashboard"
            onClick={() => setActiveRole('recruiter')}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto h-14 px-8 text-base border-purple-500/40 hover:bg-purple-950/30 text-purple-200 flex items-center gap-2')}
          >
            <Briefcase className="h-5 w-5 text-purple-400" />
            Recruiter Demo: Match Verified Talent
          </Link>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/80 bg-card/80 p-6 space-y-3">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileCode className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">1. Connect Real Code Artifacts</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Candidates attach verified GitHub repos, deployed web apps, and technical RFCs to build a transparent proof trail.
          </p>
        </Card>

        <Card className="border-border/80 bg-card/80 p-6 space-y-3">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">2. Interactive Skill Tests</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Take timed practical code challenges to boost your Proof Score instantly. Scores update live across all recruiter match matrix leaderboards.
          </p>
        </Card>

        <Card className="border-border/80 bg-card/80 p-6 space-y-3">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">3. Proof Match Matrix</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Recruiters build skill requirements with custom weights (Critical vs Nice-to-have) and match candidate proof scores, not keyword fluff.
          </p>
        </Card>
      </div>

      {/* Active Demo Candidate Spotlight */}
      <Card className="border-indigo-500/40 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Image
              src={activeCandidate.avatarUrl}
              alt={activeCandidate.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="text-[10px]">VERIFIED CANDIDATE</Badge>
                <Badge variant="demo" className="text-[9px]">ACTIVE SESSION</Badge>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">{activeCandidate.name}</h2>
              <p className="text-sm text-slate-300">{activeCandidate.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="text-xs text-slate-400 block mb-1">Overall Proof Score</span>
              <ProofScoreBadge score={activeCandidate.overallProofScore} size="lg" showConfidence={true} />
            </div>

            <Link
              href="/candidate/dashboard"
              className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }), 'flex items-center gap-2')}
            >
              Explore Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
