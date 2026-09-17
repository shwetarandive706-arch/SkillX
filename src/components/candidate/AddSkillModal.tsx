'use client';

import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useSkillX } from '@/context/SkillXContext';
import { ShieldCheck, Plus } from 'lucide-react';

interface AddSkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSkillModal: React.FC<AddSkillModalProps> = ({ open, onOpenChange }) => {
  const { activeCandidateId, activeCandidate, skills, addSkillClaim } = useSkillX();
  const [selectedSkillId, setSelectedSkillId] = useState<string>('skill-nodejs');
  const [claimedLevel, setClaimedLevel] = useState<'Junior' | 'Mid' | 'Senior' | 'Expert'>('Senior');

  // Filter out skills candidate already has
  const existingSkillIds = new Set(activeCandidate.skills.map((s) => s.skillId));
  const availableSkills = skills.filter((s) => !existingSkillIds.has(s.id));
  const defaultSkill = availableSkills[0] || skills[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSkillId = availableSkills.length > 0 ? selectedSkillId : defaultSkill.id;
    addSkillClaim(activeCandidateId, targetSkillId, claimedLevel);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-xs text-indigo-300 font-mono font-bold uppercase">Claim New Technical Skill</span>
          </div>
          <DialogTitle className="text-lg font-bold text-white mt-1">
            Add Skill Claim to Profile
          </DialogTitle>
          <DialogDescription className="text-xs">
            State your proficiency level. Attach GitHub repositories or take an assessment to calculate your verifiable Proof Score.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Select Technical Skill</label>
            <Select
              value={availableSkills.length > 0 ? selectedSkillId : defaultSkill?.id}
              onChange={(e) => setSelectedSkillId(e.target.value)}
            >
              {availableSkills.length > 0 ? (
                availableSkills.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900">
                    {s.name} ({s.category})
                  </option>
                ))
              ) : (
                <option value={defaultSkill?.id} className="bg-slate-900">
                  {defaultSkill?.name} (Already claimed)
                </option>
              )}
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Self-Reported Proficiency Level</label>
            <Select
              value={claimedLevel}
              onChange={(e) => setClaimedLevel(e.target.value as 'Junior' | 'Mid' | 'Senior' | 'Expert')}
            >
              <option value="Junior" className="bg-slate-900">Junior (0-2 Years Practical Experience)</option>
              <option value="Mid" className="bg-slate-900">Mid-Level (2-4 Years Practical Experience)</option>
              <option value="Senior" className="bg-slate-900">Senior (5+ Years Practical Experience)</option>
              <option value="Expert" className="bg-slate-900">Expert / Staff Architect</option>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            Add Skill Claim
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
