'use client';

import React from 'react';
import Link from 'next/link';
import { useSkillX } from '@/context/SkillXContext';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils/utils';
import {
  FileText,
  CheckSquare,
  Square,
  Sparkles,
  ArrowRight,
  Info,
  FolderGit2
} from 'lucide-react';

interface ResumeSectionItem {
  id: string;
  sectionName: string;
  title: string;
  description: string;
  isRequired: boolean;
  improvementSuggestion: string;
  sampleExample: string;
}

const RESUME_SECTIONS: ResumeSectionItem[] = [
  {
    id: 'res-objective',
    sectionName: 'Career Objective',
    title: 'Tailored Career Goal & Target Role',
    description: 'Concise 2-sentence summary tailored to your target software role (e.g., Full Stack / AI Engineer).',
    isRequired: true,
    improvementSuggestion: 'State target role title explicitly and highlight primary stack competencies.',
    sampleExample: '"Results-driven Full Stack Engineer with expertise in Next.js, React, and PostgreSQL seeking to build scalable cloud applications."',
  },
  {
    id: 'res-skills',
    sectionName: 'Technical Skills',
    title: 'Categorized Technical Stack & Frameworks',
    description: 'Organized lists of languages, frameworks, databases, and DevOps tools with proficiency levels.',
    isRequired: true,
    improvementSuggestion: 'Group skills by category (Languages, Frontend, Backend, Databases) rather than an unstructured cloud.',
    sampleExample: 'Languages: TypeScript, JavaScript, SQL | Frontend: Next.js 14, React 18, Tailwind | Backend: Node.js, PostgreSQL',
  },
  {
    id: 'res-edu',
    sectionName: 'Education',
    title: 'Academic Background & Degree Credentials',
    description: 'Degree program, university name, branch/discipline, graduation year, and GPA/percentage.',
    isRequired: true,
    improvementSuggestion: 'Include relevant coursework (Data Structures, Database Management, Web Engineering).',
    sampleExample: 'B.Tech in Computer Science & Engineering | Tier-1 Institute | CGPA: 8.9/10 | Expected Graduation: May 2026',
  },
  {
    id: 'res-projects',
    sectionName: 'Projects',
    title: 'Verified Software Projects & Artifact Links',
    description: '2-3 key technical projects detailing problem statement, technology stack, and quantitative results.',
    isRequired: true,
    improvementSuggestion: 'Use STAR format (Situation, Task, Action, Result) with quantitative metrics (% speedup, user count).',
    sampleExample: '"SkillX Verification Engine: Architected Next.js App Router app processing 500+ proof scores with zero hydration lag."',
  },
  {
    id: 'res-certs',
    sectionName: 'Certifications',
    title: 'Verified Badges & Industry Certifications',
    description: 'Proof-based assessment badges (e.g. SkillX Gold Proof Badge, AWS Certified Developer).',
    isRequired: false,
    improvementSuggestion: 'Add SkillX Verified Code Assessment badges to demonstrate empirical skill competence.',
    sampleExample: 'SkillX Gold Proof Verification (Next.js & React) | AWS Certified Cloud Practitioner',
  },
  {
    id: 'res-achievements',
    sectionName: 'Achievements',
    title: 'Hackathons, Competitions & Academic Honors',
    description: 'Recognitions, coding competition rankings, or open-source pull request contributions.',
    isRequired: false,
    improvementSuggestion: 'Highlight hackathon wins, open-source PR merges, or high ranking in coding challenges.',
    sampleExample: 'Top 5 Finalist at National EduTech Hackathon 2026 | Merged 12 PRs to public open-source web repositories',
  },
  {
    id: 'res-github',
    sectionName: 'GitHub & LinkedIn Links',
    title: 'Public Repository & Professional Profile Links',
    description: 'Clickable links to your active GitHub profile, LinkedIn URL, and personal portfolio site.',
    isRequired: true,
    improvementSuggestion: 'Ensure GitHub repositories have clean README files and license documentation.',
    sampleExample: 'github.com/alexchen-dev | linkedin.com/in/alexchen-demo | alexchen.dev',
  },
  {
    id: 'res-contact',
    sectionName: 'Contact Information',
    title: 'Verified Email, Phone & Location',
    description: 'Professional email address, contact phone number, and location preference.',
    isRequired: true,
    improvementSuggestion: 'Use a professional email handle (first.last@email.com) and specify remote/city preferences.',
    sampleExample: 'alex.chen@domain.dev | +1 (555) 019-2834 | San Francisco, CA (Open to Remote)',
  }
];

export default function ResumeReadinessPage() {
  const { activeCandidate, resumeChecklistState, toggleResumeCheckitem } = useSkillX();

  const totalSections = RESUME_SECTIONS.length;
  const completedCount = RESUME_SECTIONS.filter((s) => !!resumeChecklistState[s.id]).length;
  const resumeReadinessPct = Math.round((completedCount / totalSections) * 100);

  const missingSections = RESUME_SECTIONS.filter((s) => !resumeChecklistState[s.id]);

  return (
    <div className="space-y-8 py-4 pb-16 max-w-6xl mx-auto">
      {/* Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <Link
          href="/candidate/dashboard"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'flex items-center gap-1.5 text-xs text-slate-400 hover:text-white')}
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to Candidate Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            RESUME READINESS AUDIT
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO CHECKLIST
          </Badge>
        </div>
      </div>

      {/* Main Title & Hero Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/40 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                <FileText className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-black text-white">Student Resume Readiness Checklist</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Section-by-section resume optimization guide for <strong className="text-white">{activeCandidate.name}</strong>.
              Audit your resume structure, technical stack categorization, and repository artifact linkages.
            </p>
          </div>

          {/* Progress Bar Gauge */}
          <div className="flex items-center gap-4 bg-secondary/40 border border-border/80 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono block">Resume Readiness</span>
              <span className="text-2xl font-mono font-black text-indigo-400">{resumeReadinessPct}%</span>
            </div>
            <div className="w-24">
              <Progress value={resumeReadinessPct} className="h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Mandatory Disclosure Note */}
      <Card className="border-border/80 bg-card/90 p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Resume Audit Note:</strong> Checklist progress auto-saves state to local browser storage.
            </span>
          </div>
          <Badge variant="secondary" className="text-[10px] shrink-0 font-normal">
            This is a demo resume readiness estimate and does not replace professional resume review.
          </Badge>
        </div>
      </Card>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-border/80 bg-card/90 space-y-1">
          <span className="text-xs text-slate-400 block font-semibold">Completed Sections</span>
          <span className="text-2xl font-bold font-mono text-emerald-400">{completedCount} / {totalSections}</span>
          <span className="text-[11px] text-slate-400 block">Verified resume components</span>
        </Card>

        <Card className="p-5 border-border/80 bg-card/90 space-y-1">
          <span className="text-xs text-slate-400 block font-semibold">Missing / Action Items</span>
          <span className="text-2xl font-bold font-mono text-amber-400">{missingSections.length}</span>
          <span className="text-[11px] text-slate-400 block">Recommended section enhancements</span>
        </Card>

        <Card className="p-5 border-border/80 bg-card/90 space-y-1">
          <span className="text-xs text-slate-400 block font-semibold">Proof-Linked Evidence</span>
          <span className="text-2xl font-bold font-mono text-indigo-400">
            {activeCandidate.skills.length} Skills
          </span>
          <span className="text-[11px] text-slate-400 block">Verified skill audit trails</span>
        </Card>
      </div>

      {/* Interactive Resume Checklist Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-indigo-400" />
            Interactive Resume Checklist Items
          </h2>
          <span className="text-xs text-slate-400">Click checkboxes to update completion score</span>
        </div>

        <div className="space-y-4">
          {RESUME_SECTIONS.map((section) => {
            const isChecked = !!resumeChecklistState[section.id];
            return (
              <Card
                key={section.id}
                className={`p-5 transition-all bg-card/90 space-y-3 ${
                  isChecked ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-border/80'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleResumeCheckitem(section.id)}
                      className="mt-1 shrink-0 text-indigo-400 hover:text-white"
                    >
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Square className="h-5 w-5 text-slate-500" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base font-bold ${isChecked ? 'text-emerald-200 line-through' : 'text-white'}`}>
                          {section.sectionName}: {section.title}
                        </h3>
                        {section.isRequired && (
                          <Badge variant="outline" className="text-[10px] text-indigo-300 border-indigo-500/30">
                            Essential
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-300">{section.description}</p>
                    </div>
                  </div>

                  <Badge variant={isChecked ? 'success' : 'outline'} className="text-[10px] shrink-0">
                    {isChecked ? 'Section Completed' : 'Needs Optimization'}
                  </Badge>
                </div>

                {/* Improvement Suggestion Box */}
                <div className="p-3 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-xs text-slate-300 space-y-1.5 ml-8">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                    <Sparkles className="h-3.5 w-3.5" />
                    Improvement Suggestion:
                  </div>
                  <p className="text-[11px] leading-relaxed">{section.improvementSuggestion}</p>
                  <div className="text-[11px] text-slate-400 italic pt-1 border-t border-border/40">
                    Sample Example: {section.sampleExample}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Action Prompts Footer */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-card to-indigo-950/40 p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-indigo-400" />
              Need to Attach Project Evidence to Your Resume?
            </h3>
            <p className="text-xs text-slate-300">
              Link verified software project artifacts directly to your SkillX proof portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/candidate/portfolio"
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'text-xs flex items-center gap-1.5')}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              Manage Portfolio
            </Link>
            <Link
              href="/candidate/career-readiness"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs flex items-center gap-1.5')}
            >
              Career Readiness
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
