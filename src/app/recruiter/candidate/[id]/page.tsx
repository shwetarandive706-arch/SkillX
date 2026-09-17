'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSkillX } from '@/context/SkillXContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { EvidenceCard } from '@/components/shared/EvidenceCard';
import { ProofAuditModal } from '@/components/shared/ProofAuditModal';
import { CandidateSkillProof } from '@/lib/types';
import { ShieldCheck, MapPin, Github, ArrowLeft, Bookmark, FileCode } from 'lucide-react';

export default function RecruiterCandidateAuditPage() {
  const params = useParams();
  const candidateId = params?.id as string;
  const { candidates } = useSkillX();

  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0];
  const [selectedAuditSkill, setSelectedAuditSkill] = useState<CandidateSkillProof | null>(null);
  const [isShortlisted, setIsShortlisted] = useState<boolean>(false);

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto pb-16">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <Link href="/recruiter/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Recruiter Dashboard
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            RECRUITER PROOF AUDIT VIEW
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO CANDIDATE
          </Badge>
        </div>
      </div>

      {/* Candidate Profile Summary Banner */}
      <Card className="border-indigo-500/40 bg-card/90 p-8 rounded-3xl shadow-xl gradient-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <Image
              src={candidate.avatarUrl}
              alt={candidate.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{candidate.name}</h1>
              </div>
              <p className="text-sm font-medium text-slate-300 mt-0.5">{candidate.title}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {candidate.location}
                </span>
                {candidate.githubUsername && (
                  <span className="flex items-center gap-1 text-indigo-300">
                    <Github className="h-3.5 w-3.5" />
                    github.com/{candidate.githubUsername}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center bg-secondary/50 border border-border/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1 uppercase font-mono tracking-wider">Overall Proof Score</span>
              <ProofScoreBadge score={candidate.overallProofScore} size="lg" showConfidence={true} />
            </div>

            <Button
              variant={isShortlisted ? 'secondary' : 'gradient'}
              size="lg"
              onClick={() => setIsShortlisted(!isShortlisted)}
              className="w-full sm:w-auto flex items-center gap-2 text-xs"
            >
              <Bookmark className={`h-4 w-4 ${isShortlisted ? 'fill-indigo-400 text-indigo-400' : ''}`} />
              {isShortlisted ? 'Candidate Shortlisted' : 'Shortlist Candidate'}
            </Button>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mt-6 pt-6 border-t border-border/60">
          {candidate.bio}
        </p>
      </Card>

      {/* Verified Skills & Line-by-Line Evidence Audit */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCode className="h-5 w-5 text-indigo-400" />
          Verified Skill Proofs & Artifact Trail Audit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidate.skills.map((skillItem) => (
            <Card key={skillItem.skillId} className="border-border/80 bg-card/80 p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{skillItem.skillName}</h3>
                  <Badge variant="outline" className="text-[10px] mt-1">
                    {skillItem.category} • Level: {skillItem.claimedLevel}
                  </Badge>
                </div>
                <ProofScoreBadge score={skillItem.proofScore} size="md" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Attached Evidence ({skillItem.evidence.length}):
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAuditSkill(skillItem)}
                    className="text-xs text-indigo-300 hover:text-white"
                  >
                    View Math Audit
                  </Button>
                </div>

                {skillItem.evidence.length > 0 ? (
                  skillItem.evidence.map((ev) => <EvidenceCard key={ev.id} evidence={ev} />)
                ) : (
                  <p className="text-xs text-muted-foreground italic">Self-reported baseline score.</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Proof Audit Modal */}
      <ProofAuditModal
        open={!!selectedAuditSkill}
        onOpenChange={() => setSelectedAuditSkill(null)}
        skillProof={selectedAuditSkill}
        candidateName={candidate.name}
      />
    </div>
  );
}
