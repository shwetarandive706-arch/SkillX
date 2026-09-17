'use client';

import React from 'react';
import { CandidateSkillProof } from '@/lib/types';

interface SkillRadarChartProps {
  skills: CandidateSkillProof[];
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ skills }) => {
  // Top 6 skills
  const topSkills = skills.slice(0, 6);

  return (
    <div className="w-full space-y-3">
      {topSkills.map((s) => (
        <div key={s.skillId} className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-200 flex items-center gap-1.5">
              {s.skillName}
              <span className="text-[10px] text-muted-foreground font-normal">({s.category})</span>
            </span>
            <span className="font-mono text-indigo-400 font-bold">{s.proofScore.overall}/100</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-secondary/80 overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                s.proofScore.overall >= 80
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  : s.proofScore.overall >= 60
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-amber-500 to-orange-400'
              }`}
              style={{ width: `${s.proofScore.overall}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
