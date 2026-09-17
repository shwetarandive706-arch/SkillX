import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Award } from 'lucide-react';
import { ProofScore } from '@/lib/types';

interface ProofScoreBadgeProps {
  score: number | ProofScore;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  showConfidence?: boolean;
}

export const ProofScoreBadge: React.FC<ProofScoreBadgeProps> = ({
  score,
  size = 'md',
  showConfidence = false,
}) => {
  const overall = typeof score === 'number' ? score : score.overall;
  const isGap = overall <= 0 || (typeof score === 'object' && score.evidenceWeight === 0 && score.assessmentWeight === 0);

  const confidence = typeof score === 'object'
    ? score.confidenceLevel
    : isGap
    ? 'Evidence Gap: High'
    : overall >= 80
    ? 'Verified Gold'
    : overall >= 60
    ? 'Verified Silver'
    : 'Self-Reported Baseline';

  let colorClass = 'from-emerald-500 to-teal-400 text-emerald-400 border-emerald-500/30';
  let bgGlow = 'shadow-emerald-500/20';

  if (isGap) {
    colorClass = 'from-rose-500 to-amber-500 text-rose-400 border-rose-500/30';
    bgGlow = 'shadow-rose-500/20';
  } else if (overall < 60) {
    colorClass = 'from-amber-500 to-orange-400 text-amber-400 border-amber-500/30';
    bgGlow = 'shadow-amber-500/20';
  } else if (overall < 75) {
    colorClass = 'from-blue-500 to-indigo-400 text-blue-400 border-blue-500/30';
    bgGlow = 'shadow-blue-500/20';
  }

  const dimensions = {
    sm: 'h-8 px-2.5 text-xs font-bold gap-1',
    md: 'h-10 px-3.5 text-sm font-extrabold gap-1.5',
    lg: 'h-14 px-5 text-xl font-black gap-2',
    xl: 'h-20 px-8 text-3xl font-black gap-3',
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`inline-flex items-center justify-center rounded-xl border bg-secondary/60 backdrop-blur-md shadow-lg ${bgGlow} ${dimensions[size]}`}
      >
        <ShieldCheck className={`${size === 'xl' ? 'h-7 w-7' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} ${colorClass.split(' ')[2]}`} />
        <span className={`bg-gradient-to-r ${colorClass} bg-clip-text text-transparent font-mono`}>
          {isGap ? 'Not Computable' : overall}
        </span>
        {!isGap && <span className="text-[10px] text-muted-foreground font-sans font-normal opacity-70">/100</span>}
      </div>

      {showConfidence && (
        <Badge
          variant={confidence === 'Verified Gold' ? 'gold' : confidence === 'Verified Silver' ? 'silver' : isGap ? 'destructive' : 'outline'}
          className="text-xs flex items-center gap-1"
        >
          <Award className="h-3 w-3" />
          {confidence}
        </Badge>
      )}
    </div>
  );
};
