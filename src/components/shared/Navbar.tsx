'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { buttonVariants } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils/utils';
import {
  Award,
  UserCheck,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Compass,
  BookOpen,
  Target,
  FileText,
  HelpCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { setActiveRole, candidates, activeCandidateId, setActiveCandidateId } = useSkillX();

  const isCandidateRoute =
    pathname === '/candidate/dashboard' ||
    (pathname.startsWith('/candidate') &&
      !pathname.includes('/career-') &&
      !pathname.includes('/learning-') &&
      !pathname.includes('/resume-') &&
      !pathname.includes('/interview-') &&
      !pathname.includes('/portfolio'));
  const isCareerGuidanceRoute = pathname.includes('/career-guidance');
  const isCareerReadinessRoute = pathname.includes('/career-readiness');
  const isResumeRoute = pathname.includes('/resume-readiness');
  const isInterviewRoute = pathname.includes('/interview-preparation');
  const isRoadmapRoute = pathname.includes('/learning-roadmap');
  const isCareerProfileRoute = pathname.includes('/career-profile');
  const isRecruiterRoute = pathname.startsWith('/recruiter');
  const isPortfolioRoute = pathname.includes('/portfolio');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-3 sm:px-6 gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              X
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                Skill<span className="gradient-text">X</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-indigo-400 font-mono tracking-wide -mt-1 hidden sm:inline">
                VERIFIABLE SKILL PROOF
              </span>
            </div>
          </Link>
        </div>

        {/* Scrollable Nav Links Container */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none max-w-full">
          <Link
            href="/candidate/dashboard"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isCandidateRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5 text-blue-400" />
            Candidate
          </Link>

          <Link
            href="/candidate/career-guidance"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isCareerGuidanceRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Guidance
          </Link>

          <Link
            href="/candidate/career-readiness"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isCareerReadinessRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <Target className="h-3.5 w-3.5 text-indigo-400" />
            Readiness
          </Link>

          <Link
            href="/candidate/resume-readiness"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isResumeRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-indigo-400" />
            Resume
          </Link>

          <Link
            href="/candidate/interview-preparation"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isInterviewRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            Interview
          </Link>

          <Link
            href="/candidate/learning-roadmap"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isRoadmapRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
            Roadmap
          </Link>

          <Link
            href="/candidate/career-profile"
            onClick={() => setActiveRole('candidate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isCareerProfileRoute
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-indigo-400" />
            Profile
          </Link>

          <Link
            href="/recruiter/dashboard"
            onClick={() => setActiveRole('recruiter')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isRecruiterRoute
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5 text-purple-400" />
            Recruiter
          </Link>

          <Link
            href="/candidate/portfolio"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isPortfolioRoute
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-secondary/60'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            Portfolio
          </Link>
        </nav>

        {/* Dynamic Context Switcher & CTA Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Active Demo Candidate Switcher */}
          <div className="flex items-center gap-1.5 bg-secondary/40 border border-border/80 px-2 py-1 rounded-xl">
            <span className="text-[11px] text-muted-foreground hidden xl:inline">Candidate:</span>
            <Select
              value={activeCandidateId}
              onChange={(e) => setActiveCandidateId(e.target.value)}
              className="h-7 text-xs font-semibold bg-transparent border-0 py-0 focus:ring-0 cursor-pointer text-indigo-300 w-28 sm:w-36"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.name} ({c.overallProofScore})
                </option>
              ))}
            </Select>
          </div>

          {/* Quick Action Button */}
          {isRecruiterRoute ? (
            <Link
              href="/recruiter/jobs/new"
              className={cn(
                buttonVariants({ variant: 'gradient', size: 'sm' }),
                'hidden md:flex items-center gap-1.5 text-xs px-3 h-8'
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              New Job Match
            </Link>
          ) : (
            <Link
              href="/candidate/assess/skill-nextjs"
              className={cn(
                buttonVariants({ variant: 'gradient', size: 'sm' }),
                'hidden md:flex items-center gap-1.5 text-xs px-3 h-8 whitespace-nowrap'
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Take Proof Assessment
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
