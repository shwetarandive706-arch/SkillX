'use client';

import React from 'react';
import Link from 'next/link';
import { useSkillX } from '@/context/SkillXContext';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/utils';
import { Briefcase, Plus, Users, Target, MapPin, ChevronRight } from 'lucide-react';

export default function RecruiterDashboardPage() {
  const { jobs, candidates } = useSkillX();

  return (
    <div className="space-y-8 pb-12">
      {/* Recruiter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-white">Recruiter Matching Console</h1>
            <Badge variant="demo" className="text-[10px]">DEMO RECRUITER</Badge>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Match candidates based on verified Proof Scores and custom skill weights instead of keyword searches.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/new"
          className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }), 'flex items-center gap-2')}
        >
          <Plus className="h-5 w-5" />
          Create Job Skill Rule
        </Link>
      </div>

      {/* Recruiter Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-border/80 bg-card/80 p-6 space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Active Job Criteria</span>
          <div className="text-3xl font-black text-white">{jobs.length}</div>
          <span className="text-xs text-indigo-400">Match rules active</span>
        </Card>

        <Card className="border-border/80 bg-card/80 p-6 space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Verified Talent Pool</span>
          <div className="text-3xl font-black text-white">{candidates.length}</div>
          <span className="text-xs text-emerald-400">100% verified proof profiles</span>
        </Card>

        <Card className="border-border/80 bg-card/80 p-6 space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Average Proof Confidence</span>
          <div className="text-3xl font-black text-white">85 / 100</div>
          <span className="text-xs text-amber-400">Verified Gold Tier standard</span>
        </Card>
      </div>

      {/* Active Job Postings List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-purple-400" />
          Active Job Requirements & Candidate Leaderboards
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="border-border/80 bg-card/90 hover:border-purple-500/40 transition-all p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <Badge variant="outline" className="text-xs">{job.company}</Badge>
                    <Badge variant="success" className="text-[10px]">{job.status}</Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-indigo-300">
                      <Target className="h-3.5 w-3.5" />
                      Min Target Score: <strong className="text-white">{job.minOverallProofScore}</strong>
                    </span>
                  </div>

                  {/* Required Skills Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.requirements.map((req) => (
                      <Badge
                        key={req.skillId}
                        variant={req.weight === 'critical' ? 'critical' : 'secondary'}
                        className="text-xs"
                      >
                        {req.skillName} (Min: {req.minProofScore})
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/recruiter/jobs/${job.id}/matches`}
                    className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }), 'w-full sm:w-auto flex items-center gap-2')}
                  >
                    <Users className="h-4 w-4" />
                    View Candidate Match Leaderboard
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
