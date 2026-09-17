'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSkillX } from '@/context/SkillXContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { CandidateMatchCard } from '@/components/recruiter/CandidateMatchCard';
import { calculateCandidateJobMatch } from '@/lib/utils/scoreCalculator';
import { ArrowLeft, Filter, Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function CandidateMatchesPage() {
  const params = useParams();
  const jobId = (params?.id as string) || 'job-01-fullstack';
  const { jobs, candidates } = useSkillX();

  const [minMatchThreshold, setMinMatchThreshold] = useState<number>(60);

  const job = jobs.find((j) => j.id === jobId) || jobs[0];

  // Calculate live matches for all candidates
  const matches = candidates
    .map((candidate) => calculateCandidateJobMatch(candidate, job))
    .filter((match) => match.matchScore >= minMatchThreshold)
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-8 py-4 pb-16">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <Link href="/recruiter/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Recruiter Dashboard
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            LIVE PROOF LEADERBOARD
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO DATA SYNC
          </Badge>
        </div>
      </div>

      {/* Job Title & Criteria Summary */}
      <Card className="border-indigo-500/30 bg-card/90 p-6 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{job.title}</h1>
              <Badge variant="outline" className="text-xs">{job.company}</Badge>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Location: {job.location} • Department: {job.department}
            </p>
          </div>

          <Link href="/recruiter/jobs/new">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Adjust Skill Weights
            </Button>
          </Link>
        </div>

        {/* Required Skills Row */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
          <span className="text-xs font-semibold text-slate-400 block my-auto mr-2">Required Skills:</span>
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
      </Card>

      {/* Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/30 border border-border/60 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200">
            Filter Candidate Match Threshold:
          </span>
          <span className="font-mono text-indigo-400 font-bold text-xs">{minMatchThreshold}% Min Match</span>
        </div>

        <div className="w-full sm:w-64">
          <Slider
            value={minMatchThreshold}
            min={40}
            max={90}
            step={5}
            onValueChange={(val) => setMinMatchThreshold(val)}
          />
        </div>
      </div>

      {/* Leaderboard Candidate List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-400" />
            Ranked Candidate Leaderboard ({matches.length} Candidates Matched)
          </h2>
          <span className="text-xs text-muted-foreground">
            Ranked by weighted proof score algorithm
          </span>
        </div>

        {matches.length > 0 ? (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <CandidateMatchCard key={match.candidateId} match={match} rank={index + 1} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center space-y-3">
            <p className="text-sm text-slate-300">No candidates match the selected filter threshold ({minMatchThreshold}%).</p>
            <Button variant="outline" size="sm" onClick={() => setMinMatchThreshold(40)}>
              Lower Threshold Filter
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
