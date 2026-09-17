'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useSkillX } from '@/context/SkillXContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { EvidenceCard } from '@/components/shared/EvidenceCard';
import { ShieldCheck, MapPin, Github, Award, Share2 } from 'lucide-react';

function PortfolioContent() {
  const searchParams = useSearchParams();
  const candidateId = searchParams.get('id');
  const { candidates, activeCandidate } = useSkillX();

  const candidate = candidateId
    ? candidates.find((c) => c.id === candidateId) || activeCandidate
    : activeCandidate;

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Proof Profile link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto pb-16">
      {/* Top Banner / Share Controls */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <Badge variant="gold" className="text-xs px-3 py-1 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4" />
          VERIFIED PUBLIC PROOF PORTFOLIO
        </Badge>

        <Button variant="outline" size="sm" onClick={handleCopyShareLink} className="flex items-center gap-1.5 text-xs">
          <Share2 className="h-3.5 w-3.5" />
          Share Verified Portfolio
        </Button>
      </div>

      {/* Candidate Profile Card Header */}
      <Card className="border-indigo-500/40 bg-card/90 p-8 rounded-3xl shadow-xl gradient-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <Image
              src={candidate.avatarUrl}
              alt={candidate.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-white">{candidate.name}</h1>
                <Badge variant="demo" className="text-[10px]">DEMO DATA</Badge>
              </div>
              <p className="text-base font-medium text-slate-300 mt-1">{candidate.title}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {candidate.location}
                </span>
                {candidate.githubUsername && (
                  <a
                    href={`https://github.com/${candidate.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-300 hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    github.com/{candidate.githubUsername}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="text-center bg-secondary/50 border border-border/80 p-5 rounded-2xl shrink-0">
            <span className="text-xs text-slate-400 block mb-1 uppercase font-mono tracking-wider">Overall Proof Score</span>
            <ProofScoreBadge score={candidate.overallProofScore} size="xl" showConfidence={true} />
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mt-6 pt-6 border-t border-border/60">
          {candidate.bio}
        </p>
      </Card>

      {/* Verified Skills Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-400" />
          Verified Skills & Code Artifact Audit Trail
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidate.skills.map((skillItem) => (
            <Card key={skillItem.skillId} className="border-border/80 bg-card/80 p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{skillItem.skillName}</h3>
                  <Badge variant="outline" className="text-[10px] mt-1">
                    {skillItem.category} • Claimed: {skillItem.claimedLevel}
                  </Badge>
                </div>
                <ProofScoreBadge score={skillItem.proofScore} size="md" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 block">
                  Attached Proof Evidence ({skillItem.evidence.length}):
                </span>

                {skillItem.evidence.length > 0 ? (
                  skillItem.evidence.map((ev) => <EvidenceCard key={ev.id} evidence={ev} />)
                ) : (
                  <p className="text-xs text-muted-foreground italic">Self-reported baseline (no code artifacts attached).</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PublicPortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-400 font-mono text-sm animate-pulse">
          Loading Verified Proof Portfolio...
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
