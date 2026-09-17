import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { CandidateJobMatch } from '@/lib/types';
import { cn } from '@/lib/utils/utils';
import { ShieldCheck, CheckCircle2, XCircle, MapPin, ExternalLink } from 'lucide-react';

interface CandidateMatchCardProps {
  match: CandidateJobMatch;
  rank: number;
}

export const CandidateMatchCard: React.FC<CandidateMatchCardProps> = ({ match, rank }) => {
  const isTopMatch = rank === 1;

  return (
    <Card
      className={`transition-all bg-card/90 ${
        isTopMatch
          ? 'border-indigo-500/60 shadow-xl shadow-indigo-500/10 gradient-border'
          : 'border-border/80 hover:border-border'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Candidate Profile Info */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <span className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-indigo-600 text-white font-bold font-mono text-xs flex items-center justify-center border-2 border-background shadow-md">
                #{rank}
              </span>
              <Image
                src={match.avatarUrl}
                alt={match.candidateName}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-border shadow-md"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white hover:text-indigo-300 transition-colors">
                  <Link href={`/recruiter/candidate/${match.candidateId}`}>{match.candidateName}</Link>
                </h3>
                <Badge variant="demo" className="text-[9px]">
                  DEMO TALENT
                </Badge>
              </div>
              <p className="text-xs text-slate-300 font-medium">{match.candidateTitle}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{match.location}</span>
              </div>
            </div>
          </div>

          {/* Scores Column */}
          <div className="flex items-center gap-6 border-y md:border-y-0 md:border-x border-border/60 py-4 md:py-0 md:px-6">
            {/* Match Score */}
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">Job Match</span>
              <div className="text-3xl font-mono font-black text-indigo-400 mt-0.5">{match.matchScore}%</div>
            </div>

            {/* Verifiable Skill Proof Score */}
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">Proof Score</span>
              <div className="mt-1">
                <ProofScoreBadge score={match.overallProofScore} size="md" showConfidence={false} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2 shrink-0">
            <Link
              href={`/recruiter/candidate/${match.candidateId}`}
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'w-full flex items-center justify-center gap-1.5 text-xs')}
            >
              <ShieldCheck className="h-4 w-4" />
              Audit Skill Proofs
            </Link>
            <Link
              href={`/candidate/portfolio?id=${match.candidateId}`}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full flex items-center justify-center gap-1.5 text-xs')}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Public Portfolio
            </Link>
          </div>
        </div>

        {/* Skill Requirement Breakdown Pills */}
        <div className="mt-5 pt-4 border-t border-border/50">
          <span className="text-xs font-semibold text-slate-400 block mb-2.5">
            Verified Skill Breakdown Against Job Requirements:
          </span>
          <div className="flex flex-wrap gap-2">
            {match.skillBreakdown.map((sb) => (
              <div
                key={sb.skillId}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium ${
                  sb.meetsRequirement
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                }`}
              >
                {sb.meetsRequirement ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 text-amber-400" />
                )}
                <span>{sb.skillName}</span>
                <span className="font-mono font-bold ml-1">
                  {sb.candidateScore}/{sb.requiredScore}
                </span>
                {sb.weight === 'critical' && (
                  <span className="text-[9px] font-mono text-rose-400 uppercase font-bold ml-0.5">(Critical)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
