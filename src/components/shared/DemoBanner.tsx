'use client';

import React from 'react';
import { useSkillX } from '@/context/SkillXContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, ShieldCheck } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { activeRole, setActiveRole, resetDemoData } = useSkillX();

  return (
    <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/90 to-purple-950/80 border-b border-indigo-500/20 px-4 py-2.5 text-xs text-indigo-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="demo" className="flex items-center gap-1 bg-blue-500/20 border-blue-400/40 text-blue-300">
            <ShieldCheck className="h-3 w-3 text-blue-400" />
            Hackathon MVP
          </Badge>

          <span className="font-medium text-slate-200 hidden sm:inline">
            <strong className="text-white">SkillX Verifiable Proof Engine</strong> — Local state with shared live candidate & recruiter sync.
          </span>
          <span className="text-slate-400 hidden lg:inline">
            (No lie detection claimed; human decision helper)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-indigo-500/30">
            <button
              onClick={() => setActiveRole('candidate')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeRole === 'candidate'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Candidate View
            </button>
            <button
              onClick={() => setActiveRole('recruiter')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeRole === 'recruiter'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Recruiter View
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetDemoData}
            className="h-7 text-xs text-slate-300 hover:text-white hover:bg-indigo-900/50 flex items-center gap-1 border border-slate-700/50"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
};
