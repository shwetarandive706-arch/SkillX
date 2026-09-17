'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSkillX } from '@/context/SkillXContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { INTEREST_OPTIONS, TARGET_CAREER_ROLES, StudentCareerProfile } from '@/lib/types';
import { cn } from '@/lib/utils/utils';
import {
  ArrowLeft,
  GraduationCap,
  Target,
  Sparkles,
  CheckCircle2,
  BookmarkCheck,
  User,
  Compass,
  Save,
  Briefcase
} from 'lucide-react';

export default function StudentCareerProfilePage() {
  const { activeCandidate, activeCandidateId, updateStudentProfile, skills: masterSkills } = useSkillX();

  const existingProfile = activeCandidate.careerProfile || {
    studentName: activeCandidate.name,
    education: 'B.Tech Computer Science & Engineering',
    currentSkills: activeCandidate.skills.map((s) => s.skillName),
    interests: ['Web Development', 'Artificial Intelligence'],
    careerGoals: activeCandidate.bio || 'Build scalable web platforms and lead software architecture.',
    experienceLevel: 'Intermediate',
    targetRole: 'Full Stack Developer',
  };

  const [studentName, setStudentName] = useState(existingProfile.studentName);
  const [education, setEducation] = useState(existingProfile.education);
  const [targetRole, setTargetRole] = useState(existingProfile.targetRole);
  const [experienceLevel, setExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(
    existingProfile.experienceLevel
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(existingProfile.interests || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    existingProfile.currentSkills || activeCandidate.skills.map((s) => s.skillName)
  );
  const [careerGoals, setCareerGoals] = useState(existingProfile.careerGoals);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state when active candidate changes
  useEffect(() => {
    if (activeCandidate.careerProfile) {
      setStudentName(activeCandidate.careerProfile.studentName);
      setEducation(activeCandidate.careerProfile.education);
      setTargetRole(activeCandidate.careerProfile.targetRole);
      setExperienceLevel(activeCandidate.careerProfile.experienceLevel);
      setSelectedInterests(activeCandidate.careerProfile.interests || []);
      setSelectedSkills(activeCandidate.careerProfile.currentSkills || activeCandidate.skills.map((s) => s.skillName));
      setCareerGoals(activeCandidate.careerProfile.careerGoals);
    } else {
      setStudentName(activeCandidate.name);
      setSelectedSkills(activeCandidate.skills.map((s) => s.skillName));
    }
  }, [activeCandidate]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: StudentCareerProfile = {
      studentName,
      education,
      currentSkills: selectedSkills,
      interests: selectedInterests,
      careerGoals,
      experienceLevel,
      targetRole,
      updatedAt: new Date().toISOString(),
    };

    updateStudentProfile(activeCandidateId, updatedProfile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 py-4 pb-16 max-w-5xl mx-auto">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <Link
          href="/candidate/dashboard"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'flex items-center gap-1.5 text-xs text-slate-400 hover:text-white')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Candidate Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs flex items-center gap-1">
            <Compass className="h-3.5 w-3.5" />
            ED-02 CAREER PROFILE
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO DATA SYNC
          </Badge>
        </div>
      </div>

      {/* Main Header Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/30 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                <GraduationCap className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-black text-white">Student Career Profile</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Define your academic background, technical interests, current skills, and target career goals.
              This profile powers explainable career guidance recommendations and skill-gap analysis in SkillX.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
              Active Candidate Proof
            </span>
            <ProofScoreBadge score={activeCandidate.overallProofScore} size="md" showConfidence={true} />
          </div>
        </div>
      </Card>

      {/* Success Feedback Alert */}
      {saveSuccess && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Success!</strong> Student Career Profile saved successfully and synchronized with state & localStorage.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Editable Form */}
        <Card className="lg:col-span-2 border-border/80 bg-card/90">
          <form onSubmit={handleSaveProfile}>
            <CardHeader className="p-6 border-b border-border/60">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-400" />
                Edit Student Profile Details
              </CardTitle>
              <CardDescription className="text-xs">
                Fill in your background to enable tailored career guidance and verification analysis.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Row 1: Student Name & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Student Full Name
                  </label>
                  <Input
                    placeholder="e.g. Alex Chen"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Education / Branch
                  </label>
                  <Input
                    placeholder="e.g. B.Tech Computer Science & Engineering"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Target Career Role & Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Target Career Role
                  </label>
                  <Select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
                    {TARGET_CAREER_ROLES.map((role) => (
                      <option key={role} value={role} className="bg-slate-900">
                        {role}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Experience Level
                  </label>
                  <Select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                  >
                    <option value="Beginner" className="bg-slate-900">Beginner (0-1 Years / Student)</option>
                    <option value="Intermediate" className="bg-slate-900">Intermediate (2-3 Years / Associate)</option>
                    <option value="Advanced" className="bg-slate-900">Advanced (4+ Years / Senior)</option>
                  </Select>
                </div>
              </div>

              {/* Row 3: Areas of Interest (Multi-select) */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Areas of Interest <span className="text-muted-foreground font-normal">(Select multiple)</span>
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {INTEREST_OPTIONS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-600/30 text-white shadow-md shadow-indigo-500/20'
                            : 'border-border/80 bg-secondary/30 text-slate-400 hover:text-white hover:bg-secondary/60'
                        }`}
                      >
                        {isSelected ? <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" /> : <BookmarkCheck className="h-3.5 w-3.5 opacity-40" />}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Current Skills Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Current Skills <span className="text-muted-foreground font-normal">(Click to select your current skill set)</span>
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {masterSkills.map((s) => {
                    const isSelected = selectedSkills.includes(s.name);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleSkill(s.name)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                            : 'border-border/80 bg-secondary/20 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Preferred Career Goals */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Preferred Career Goals & Aspirations
                </label>
                <Textarea
                  placeholder="Describe your long-term career aspirations, target companies, or technical domains..."
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="p-6 border-t border-border/60 bg-secondary/20 flex justify-between gap-4">
              <Link href="/candidate/dashboard">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" variant="gradient" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Student Career Profile
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Right 1 Column: Saved Profile Summary Preview */}
        <div className="space-y-6">
          <Card className="border-indigo-500/30 bg-card/90 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-400" />
                Saved Profile Overview
              </h3>
              <Badge variant="outline" className="text-[10px]">
                {experienceLevel}
              </Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Student Name:</span>
                <strong className="text-white text-sm">{studentName || 'Not Set'}</strong>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Education Branch:</span>
                <span className="text-slate-200 font-medium">{education || 'Not Set'}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Target Role Goal:</span>
                <Badge variant="gold" className="mt-1 text-xs flex items-center gap-1 w-fit">
                  <Briefcase className="h-3 w-3" />
                  {targetRole}
                </Badge>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Selected Interests ({selectedInterests.length}):</span>
                {selectedInterests.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInterests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-[10px]">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">No interests selected yet.</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Current Skills ({selectedSkills.length}):</span>
                {selectedSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkills.map((sk) => (
                      <Badge key={sk} variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                        {sk}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">No skills selected.</span>
                )}
              </div>

              <div className="pt-2 border-t border-border/50">
                <span className="text-slate-400 block text-[11px]">Career Goals Summary:</span>
                <p className="text-slate-300 italic mt-0.5 leading-snug line-clamp-3">
                  &ldquo;{careerGoals}&rdquo;
                </p>
              </div>
            </div>
          </Card>

          {/* Prompt card pointing to candidate dashboard */}
          <Card className="border-border/80 bg-gradient-to-b from-indigo-950/40 to-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white">Next Step for Student Profile</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Once your career profile is set, visit your candidate portfolio to attach GitHub artifacts and take 5-question code proof assessments.
            </p>
            <Link
              href="/candidate/dashboard"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full text-xs justify-center')}
            >
              Go to Candidate Skill Portfolio
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
