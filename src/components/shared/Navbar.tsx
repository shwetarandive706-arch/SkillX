'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { buttonVariants } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils/utils';
import { Award, UserCheck, Briefcase, Sparkles, CheckCircle2, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { setActiveRole, candidates, activeCandidateId, setActiveCandidateId } = useSkillX();

  const isCandidateRoute = pathname.startsWith('/candidate') && !pathname.includes('/career-');
  const isCareerGuidanceRoute = pathname.includes('/career-guidance');
  const isCareerProfileRoute = pathname.includes('/career-profile');
  const isRecruiterRoute = pathname.startsWith('/recruiter');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              X
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                Skill<span className="gradient-text">X</span>
              </span>
              <span className="text-[10px] text-indigo-400 font-mono tracking-wide -mt-1">
                VERIFIABLE SKILL PROOF
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/candidate/dashboard"
              onClick={() => setActiveRole('candidate')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCandidateRoute
                  ? 'bg-secondary text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <UserCheck className="h-4 w-4 text-blue-400" />
              Candidate Portal
            </Link>

            <Link
              href="/candidate/career-guidance"
              onClick={() => setActiveRole('candidate')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCareerGuidanceRoute
                  ? 'bg-secondary text-indigo-400 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              AI Career Guidance
            </Link>

            <Link
              href="/candidate/career-profile"
              onClick={() => setActiveRole('candidate')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCareerProfileRoute
                  ? 'bg-secondary text-indigo-400 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Compass className="h-4 w-4 text-indigo-400" />
              Student Profile
            </Link>

            <Link
              href="/recruiter/dashboard"
              onClick={() => setActiveRole('recruiter')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isRecruiterRoute
                  ? 'bg-secondary text-purple-400 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Briefcase className="h-4 w-4 text-purple-400" />
              Recruiter Portal
            </Link>

            <Link
              href="/candidate/portfolio"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 flex items-center gap-1.5"
            >
              <Award className="h-4 w-4 text-amber-400" />
              Public Proof Profile
            </Link>
          </nav>
        </div>

        {/* Dynamic Context Switcher Controls */}
        <div className="flex items-center gap-3">
          {/* Active Demo Candidate Switcher */}
          <div className="flex items-center gap-2 bg-secondary/40 border border-border/80 px-2.5 py-1 rounded-xl">
            <span className="text-xs text-muted-foreground hidden sm:inline">Active Candidate:</span>
            <Select
              value={activeCandidateId}
              onChange={(e) => setActiveCandidateId(e.target.value)}
              className="h-8 text-xs font-semibold bg-transparent border-0 py-0 focus:ring-0 cursor-pointer text-indigo-300 w-36 sm:w-44"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.name} (Score: {c.overallProofScore})
                </option>
              ))}
            </Select>
          </div>

          {/* Quick Action */}
          {isRecruiterRoute ? (
            <Link
              href="/recruiter/jobs/new"
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'hidden sm:flex items-center gap-1.5 text-xs')}
            >
              <Sparkles className="h-3.5 w-3.5" />
              New Job Match Rule
            </Link>
          ) : (
            <Link
              href="/candidate/assess/skill-nextjs"
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'hidden sm:flex items-center gap-1.5 text-xs')}
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
