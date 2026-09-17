'use client';

import React from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CandidateSkillProof } from '@/lib/types';
import { ShieldCheck, FileCode, Award, CheckCircle, Info } from 'lucide-react';

interface ProofAuditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillProof: CandidateSkillProof | null;
  candidateName: string;
}

export const ProofAuditModal: React.FC<ProofAuditModalProps> = ({
  open,
  onOpenChange,
  skillProof,
  candidateName,
}) => {
  if (!skillProof) return null;

  const { proofScore, skillName, category, evidence } = skillProof;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            PROOF SCORE AUDIT
          </Badge>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        <DialogTitle className="text-xl font-bold text-white mt-2 flex items-center justify-between">
          <span>{skillName} Proof Score</span>
          <span className="text-2xl font-mono text-indigo-400 font-black">{proofScore.overall}/100</span>
        </DialogTitle>
        <DialogDescription>
          Transparent proof mathematical breakdown for candidate <strong className="text-slate-200">{candidateName}</strong>.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        {/* Score Breakdown Bars */}
        <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <FileCode className="h-3.5 w-3.5" />
                Verified Code Artifacts Weight
              </span>
              <span className="font-mono text-white">{proofScore.evidenceWeight} / 40 pts</span>
            </div>
            <Progress value={(proofScore.evidenceWeight / 40) * 100} indicatorClassName="bg-indigo-500" />
            <span className="text-[11px] text-muted-foreground mt-1 block">
              Calculated from {evidence.length} verified GitHub repositories and live project artifacts.
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle className="h-3.5 w-3.5" />
                Interactive Skill Assessment Weight
              </span>
              <span className="font-mono text-white">{proofScore.assessmentWeight} / 40 pts</span>
            </div>
            <Progress value={(proofScore.assessmentWeight / 40) * 100} indicatorClassName="bg-blue-500" />
            <span className="text-[11px] text-muted-foreground mt-1 block">
              {skillProof.lastAssessedAt
                ? `Passed practical challenge on ${new Date(skillProof.lastAssessedAt).toLocaleDateString()}`
                : 'No recent test taken yet (baseline default applied).'}
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Award className="h-3.5 w-3.5" />
                Consistency & Recency Index
              </span>
              <span className="font-mono text-white">{proofScore.consistencyWeight} / 20 pts</span>
            </div>
            <Progress value={(proofScore.consistencyWeight / 20) * 100} indicatorClassName="bg-amber-500" />
            <span className="text-[11px] text-muted-foreground mt-1 block">
              Bonus awarded for multi-artifact verification and high assessment precision.
            </span>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-950/30 p-3 flex items-start gap-2 text-xs text-blue-200">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Verification Engine Note:</strong> Proof Scores are deterministic objective indicators of artifact evidence strength. SkillX never claims automated lie detection or automated hiring decisions.
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close Audit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
