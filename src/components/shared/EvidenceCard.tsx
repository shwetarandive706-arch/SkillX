import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Evidence } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils/utils';
import { Github, ExternalLink, ShieldCheck, Star, GitCommit, FileCode, CheckCircle, Clock } from 'lucide-react';

interface EvidenceCardProps {
  evidence: Evidence;
  showSkillBadge?: boolean;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  const getIcon = () => {
    switch (evidence.type) {
      case 'github_repo':
        return <Github className="h-5 w-5 text-indigo-400" />;
      case 'live_project':
        return <ExternalLink className="h-5 w-5 text-emerald-400" />;
      case 'assessment_pass':
        return <CheckCircle className="h-5 w-5 text-blue-400" />;
      default:
        return <ShieldCheck className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <Card className="hover:border-indigo-500/40 transition-all bg-card/80">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-secondary/80 border border-border/60">
              {getIcon()}
            </div>
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-white">
                {evidence.title}
                {evidence.url && (
                  <a
                    href={evidence.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Clock className="h-3 w-3" />
                Verified {formatTimeAgo(evidence.verifiedAt)}
              </CardDescription>
            </div>
          </div>

          <Badge
            variant={
              evidence.verificationLevel === 'high'
                ? 'gold'
                : evidence.verificationLevel === 'medium'
                ? 'silver'
                : 'outline'
            }
            className="text-[10px]"
          >
            <ShieldCheck className="h-3 w-3 mr-1" />
            {evidence.verificationLevel.toUpperCase()} PROOF
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {evidence.summary}
        </p>

        {/* GitHub / Code Artifact Metrics */}
        {evidence.metrics && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40 text-[11px] font-mono text-slate-400">
            {evidence.metrics.stars !== undefined && (
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {evidence.metrics.stars} stars
              </span>
            )}
            {evidence.metrics.commitsCount !== undefined && (
              <span className="flex items-center gap-1 text-indigo-300">
                <GitCommit className="h-3 w-3 text-indigo-400" />
                {evidence.metrics.commitsCount} commits
              </span>
            )}
            {evidence.metrics.linesOfCode !== undefined && (
              <span className="flex items-center gap-1 text-slate-300">
                <FileCode className="h-3 w-3 text-slate-400" />
                {evidence.metrics.linesOfCode.toLocaleString()} LOC
              </span>
            )}
            {evidence.metrics.testCoverage !== undefined && (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="h-3 w-3 text-emerald-400" />
                {evidence.metrics.testCoverage}% test coverage
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
