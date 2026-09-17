'use client';

import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { useSkillX } from '@/context/SkillXContext';
import { EvidenceType } from '@/lib/types';
import { Github, ShieldCheck } from 'lucide-react';

interface AddEvidenceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillId: string;
  skillName: string;
}

export const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({
  open,
  onOpenChange,
  skillId,
  skillName,
}) => {
  const { activeCandidateId, addEvidenceToSkill } = useSkillX();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EvidenceType>('github_repo');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [stars, setStars] = useState('120');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary) return;

    addEvidenceToSkill(activeCandidateId, skillId, {
      skillId,
      title,
      type,
      url: url || undefined,
      summary,
      verificationLevel: 'high',
      metrics: {
        stars: stars ? Number(stars) : undefined,
        commitsCount: 150,
        testCoverage: 90,
      }
    });

    // Reset form & close
    setTitle('');
    setUrl('');
    setSummary('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
              <Github className="h-4 w-4" />
            </span>
            <span className="text-xs text-indigo-300 font-mono font-bold uppercase">Add Verified Evidence Artifact</span>
          </div>
          <DialogTitle className="text-lg font-bold text-white mt-1">
            Attach Artifact for {skillName}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Link code repositories or project URLs to increase your verifiable Proof Score.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Artifact Title</label>
            <Input
              placeholder="e.g. Next.js E-Commerce Microservices Engine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Evidence Type</label>
              <Select value={type} onChange={(e) => setType(e.target.value as EvidenceType)}>
                <option value="github_repo" className="bg-slate-900">GitHub Repository</option>
                <option value="live_project" className="bg-slate-900">Live Deployed Web App</option>
                <option value="work_history" className="bg-slate-900">Technical Work Sample / RFC</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Repository Stars / Metrics</label>
              <Input
                type="number"
                placeholder="120"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Artifact URL (GitHub or Live Link)</label>
            <Input
              placeholder="https://github.com/username/project-repo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Technical Overview & Architecture Highlights</label>
            <Textarea
              placeholder="Describe technical implementation, architectural decisions, and testing setup..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            Attach & Recalculate Proof Score
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
