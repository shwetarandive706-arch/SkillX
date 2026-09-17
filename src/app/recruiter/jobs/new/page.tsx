'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { SkillWeightSlider } from '@/components/recruiter/SkillWeightSlider';
import { SkillRequirement } from '@/lib/types';
import { Sparkles, Plus, Briefcase, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function NewJobRequirementPage() {
  const router = useRouter();
  const { skills, createJobPosting } = useSkillX();

  const [title, setTitle] = useState('Senior Full Stack Architect');
  const [company, setCompany] = useState('Nexus AI Labs');
  const [department] = useState('Core Platform');
  const [location, setLocation] = useState('San Francisco, CA (Remote)');
  const [minOverallProofScore, setMinOverallProofScore] = useState(75);
  const [rawJDText, setRawJDText] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const [requirements, setRequirements] = useState<SkillRequirement[]>([
    {
      skillId: 'skill-nextjs',
      skillName: 'Next.js (App Router)',
      minProofScore: 75,
      weight: 'critical',
    },
    {
      skillId: 'skill-react',
      skillName: 'React.js',
      minProofScore: 80,
      weight: 'critical',
    },
    {
      skillId: 'skill-typescript',
      skillName: 'TypeScript',
      minProofScore: 75,
      weight: 'important',
    }
  ]);

  const [selectedAddSkillId, setSelectedAddSkillId] = useState(skills[3]?.id || 'skill-nodejs');

  // Simulated AI JD Parser
  const handleParseJD = () => {
    if (!rawJDText) return;
    setIsParsing(true);

    setTimeout(() => {
      // Automatically detect skills from JD text
      const textLower = rawJDText.toLowerCase();
      const detectedReqs: SkillRequirement[] = [];

      skills.forEach((s) => {
        if (textLower.includes(s.name.toLowerCase()) || textLower.includes(s.category.toLowerCase())) {
          detectedReqs.push({
            skillId: s.id,
            skillName: s.name,
            minProofScore: 75,
            weight: detectedReqs.length === 0 ? 'critical' : 'important',
          });
        }
      });

      if (detectedReqs.length > 0) {
        setRequirements(detectedReqs);
      }
      setIsParsing(false);
    }, 800);
  };

  const handleAddRequirement = () => {
    const skillObj = skills.find((s) => s.id === selectedAddSkillId);
    if (!skillObj) return;

    if (requirements.some((r) => r.skillId === skillObj.id)) return;

    setRequirements([
      ...requirements,
      {
        skillId: skillObj.id,
        skillName: skillObj.name,
        minProofScore: 70,
        weight: 'important',
      }
    ]);
  };

  const handleUpdateRequirement = (index: number, updated: SkillRequirement) => {
    const copy = [...requirements];
    copy[index] = updated;
    setRequirements(copy);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || requirements.length === 0) return;

    const newJobId = createJobPosting({
      title,
      company,
      department,
      location,
      rawJDText,
      minOverallProofScore,
      requirements,
      status: 'Active',
    });

    router.push(`/recruiter/jobs/${newJobId}/matches`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 pb-16">
      <Link href="/recruiter/dashboard">
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Recruiter Dashboard
        </Button>
      </Link>

      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            Job Requirement & Proof Rule Builder
          </h1>
          <p className="text-xs text-slate-300">
            Define verifiable skill score criteria and priority multipliers to rank candidates.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details Card */}
        <Card className="border-border/80 bg-card/90 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            1. Role Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Job Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name</label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Minimum Overall Proof Threshold</label>
              <Input
                type="number"
                value={minOverallProofScore}
                onChange={(e) => setMinOverallProofScore(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 block">Paste Raw Job Description (Optional Simulator)</label>
              <Button type="button" variant="ghost" size="sm" onClick={handleParseJD} disabled={!rawJDText || isParsing} className="text-xs text-indigo-300">
                {isParsing ? 'Extracting Skills...' : 'Auto-Extract Requirements'}
              </Button>
            </div>
            <Textarea
              placeholder="Paste job description text here to automatically extract technical skill requirements..."
              value={rawJDText}
              onChange={(e) => setRawJDText(e.target.value)}
              rows={3}
            />
          </div>
        </Card>

        {/* Skill Requirements Builder Card */}
        <Card className="border-border/80 bg-card/90 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              2. Skill Proof Criteria & Priority Multipliers
            </h2>

            <div className="flex items-center gap-2">
              <Select
                value={selectedAddSkillId}
                onChange={(e) => setSelectedAddSkillId(e.target.value)}
                className="h-8 text-xs w-48"
              >
                {skills.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900">
                    {s.name} ({s.category})
                  </option>
                ))}
              </Select>
              <Button type="button" variant="outline" size="sm" onClick={handleAddRequirement} className="text-xs flex items-center gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add Skill
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <SkillWeightSlider
                key={req.skillId}
                requirement={req}
                onUpdate={(updated) => handleUpdateRequirement(idx, updated)}
                onRemove={() => handleRemoveRequirement(idx)}
              />
            ))}
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Link href="/recruiter/dashboard">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="gradient" size="lg" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Save Match Rule & Generate Leaderboard
          </Button>
        </div>
      </form>
    </div>
  );
}
