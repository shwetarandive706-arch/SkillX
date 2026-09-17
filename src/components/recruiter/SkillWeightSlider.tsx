'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SkillRequirement } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface SkillWeightSliderProps {
  requirement: SkillRequirement;
  onUpdate: (updated: SkillRequirement) => void;
  onRemove: () => void;
}

export const SkillWeightSlider: React.FC<SkillWeightSliderProps> = ({
  requirement,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-white">{requirement.skillName}</span>
          <Badge
            variant={
              requirement.weight === 'critical'
                ? 'critical'
                : requirement.weight === 'important'
                ? 'default'
                : 'secondary'
            }
            className="text-[10px]"
          >
            {requirement.weight.toUpperCase()}
          </Badge>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Min Proof Score Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Target Min Proof Score:</span>
            <span className="font-mono text-indigo-400 font-bold">{requirement.minProofScore} / 100</span>
          </div>
          <Slider
            value={requirement.minProofScore}
            min={40}
            max={95}
            step={5}
            onValueChange={(val) => onUpdate({ ...requirement, minProofScore: val })}
          />
        </div>

        {/* Priority Weight Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">Requirement Priority</label>
          <Select
            value={requirement.weight}
            onChange={(e) =>
              onUpdate({
                ...requirement,
                weight: e.target.value as SkillRequirement['weight'],
              })
            }
            className="h-9 text-xs"
          >
            <option value="critical" className="bg-slate-900">Critical Requirement (1.8x Multiplier)</option>
            <option value="important" className="bg-slate-900">Important Skill (1.2x Multiplier)</option>
            <option value="nice_to_have" className="bg-slate-900">Nice to Have (0.6x Multiplier)</option>
          </Select>
        </div>
      </div>
    </div>
  );
};
