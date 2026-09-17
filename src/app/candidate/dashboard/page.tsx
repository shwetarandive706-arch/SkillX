'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSkillX } from '@/context/SkillXContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { EvidenceCard } from '@/components/shared/EvidenceCard';
import { SkillRadarChart } from '@/components/candidate/SkillRadarChart';
import { ProofAuditModal } from '@/components/shared/ProofAuditModal';
import { AddEvidenceModal } from '@/components/candidate/AddEvidenceModal';
import { CandidateSkillProof } from '@/lib/types';
import { cn } from '@/lib/utils/utils';
import { ShieldCheck, Plus, ExternalLink, ArrowRight, Sparkles, FileCode } from 'lucide-react';

export default function CandidateDashboardPage() {
  const { activeCandidate } = useSkillX();
  const [selectedAuditSkill, setSelectedAuditSkill] = useState<CandidateSkillProof | null>(null);
  const [addEvidenceSkill, setAddEvidenceSkill] = useState<{ id: string; name: string } | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Candidate Profile Header Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/20 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Image
              src={activeCandidate.avatarUrl}
              alt={activeCandidate.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{activeCandidate.name}</h1>
                <Badge variant="demo" className="text-[10px]">DEMO CANDIDATE</Badge>
              </div>
              <p className="text-sm text-slate-300 font-medium">{activeCandidate.title}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">{activeCandidate.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-secondary/40 border border-border/80 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider block">Verified Proof Score</span>
              <ProofScoreBadge score={activeCandidate.overallProofScore} size="lg" showConfidence={true} />
            </div>

            <Link
              href="/candidate/portfolio"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex items-center gap-1.5 text-xs')}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Public Portfolio
            </Link>
          </div>
        </div>
      </Card>

      {/* Grid: Skill Matrix Chart + Recent Assessment Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Skill Matrix Radar / Bar */}
        <Card className="lg:col-span-2 border-border/80 bg-card/80 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                Verified Skill Proof Matrix
              </h2>
              <p className="text-xs text-muted-foreground">
                Proof scores calculated from code repositories, assessments, and consistency metrics.
              </p>
            </div>
          </div>

          <SkillRadarChart skills={activeCandidate.skills} />
        </Card>

        {/* Right Column: Assessment Engine Action Box */}
        <Card className="border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Boost Proof Score</h3>
              <p className="text-xs text-slate-300">Take 5-minute interactive code verification challenges.</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/candidate/assess/skill-nextjs"
              className={cn(buttonVariants({ variant: 'gradient' }), 'w-full justify-between text-xs h-11 flex items-center px-4')}
            >
              <span>Next.js App Router Challenge</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/candidate/assess/skill-react"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between text-xs h-11 border-indigo-500/30 hover:bg-indigo-950/50 flex items-center px-4')}
            >
              <span>React.js State Architecture</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/candidate/assess/skill-typescript"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between text-xs h-11 border-indigo-500/30 hover:bg-indigo-950/50 flex items-center px-4')}
            >
              <span>TypeScript Type Engine Challenge</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Verified Skill Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="h-5 w-5 text-blue-400" />
            Skill Proof Breakdown & Evidence Linkage
          </h2>
          <span className="text-xs text-muted-foreground">
            {activeCandidate.skills.length} Skills Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCandidate.skills.map((skillItem) => (
            <Card key={skillItem.skillId} className="border-border/80 bg-card/90 space-y-4">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                      {skillItem.skillName}
                      <Badge variant="outline" className="text-[10px]">
                        {skillItem.category}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Claimed Level: <strong className="text-slate-200">{skillItem.claimedLevel}</strong>
                    </CardDescription>
                  </div>

                  <div className="text-right">
                    <ProofScoreBadge score={skillItem.proofScore} size="md" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-3">
                {/* Evidence Artifacts */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 block">
                    Verified Artifacts ({skillItem.evidence.length}):
                  </span>

                  {skillItem.evidence.length > 0 ? (
                    skillItem.evidence.map((ev) => (
                      <EvidenceCard key={ev.id} evidence={ev} />
                    ))
                  ) : (
                    <div className="p-3 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">
                      No code artifacts attached yet. Attach a GitHub repo to boost score.
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAuditSkill(skillItem)}
                  className="text-xs text-indigo-300 hover:text-white"
                >
                  Inspect Math Audit
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAddEvidenceSkill({ id: skillItem.skillId, name: skillItem.skillName })}
                    className="text-xs flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Evidence
                  </Button>

                  <Link
                    href={`/candidate/assess/${skillItem.skillId}`}
                    className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'text-xs')}
                  >
                    Take Test
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Proof Audit Modal */}
      <ProofAuditModal
        open={!!selectedAuditSkill}
        onOpenChange={() => setSelectedAuditSkill(null)}
        skillProof={selectedAuditSkill}
        candidateName={activeCandidate.name}
      />

      {/* Add Evidence Modal */}
      {addEvidenceSkill && (
        <AddEvidenceModal
          open={!!addEvidenceSkill}
          onOpenChange={() => setAddEvidenceSkill(null)}
          skillId={addEvidenceSkill.id}
          skillName={addEvidenceSkill.name}
        />
      )}
    </div>
  );
}
