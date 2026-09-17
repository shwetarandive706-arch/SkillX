'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSkillX } from '@/context/SkillXContext';
import { DEMO_INTERVIEW_QUESTIONS } from '@/lib/data/mockInterviewQuestions';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils/utils';
import {
  HelpCircle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function InterviewPreparationPage() {
  const { activeCandidate, practicedQuestionIds, togglePracticedQuestion } = useSkillX();

  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Filter questions
  const filteredQuestions = DEMO_INTERVIEW_QUESTIONS.filter((q) => {
    if (selectedRole !== 'All' && q.roleTitle.toLowerCase() !== selectedRole.toLowerCase()) return false;
    if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Calculate practice metrics
  const totalQuestionsCount = DEMO_INTERVIEW_QUESTIONS.length;
  const practicedQuestionsCount = DEMO_INTERVIEW_QUESTIONS.filter((q) => !!practicedQuestionIds[q.id]).length;
  const practiceCompletionPct = Math.round((practicedQuestionsCount / (totalQuestionsCount || 1)) * 100);

  const recentlyPracticed = DEMO_INTERVIEW_QUESTIONS.filter((q) => !!practicedQuestionIds[q.id]).slice(0, 3);

  const toggleExpand = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const availableRoles = [
    'All',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Data Analyst',
    'AI/ML Engineer',
    'Cybersecurity Analyst',
  ];

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
            <HelpCircle className="h-3.5 w-3.5" />
            INTERVIEW PREPARATION HUB
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO QUESTIONS
          </Badge>
        </div>
      </div>

      {/* Main Title & Hero Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/40 to-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
                <HelpCircle className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-black text-white">Interactive Technical Interview Preparation</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Curated role-based interview questions, architectural system design guidance, and HR behavioral prompts for <strong className="text-white">{activeCandidate.name}</strong>.
            </p>
          </div>

          {/* Progress Gauge */}
          <div className="flex items-center gap-4 bg-secondary/40 border border-border/80 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-mono block">Practice Completion</span>
              <span className="text-2xl font-mono font-black text-indigo-400">{practiceCompletionPct}%</span>
            </div>
            <div className="w-24">
              <Progress value={practiceCompletionPct} className="h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Practice Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-border/80 bg-card/90 space-y-1">
          <span className="text-xs text-slate-400 block font-semibold">Questions Practiced</span>
          <span className="text-2xl font-bold font-mono text-emerald-400">
            {practicedQuestionsCount} / {totalQuestionsCount}
          </span>
          <span className="text-[11px] text-slate-400 block">Interactive sample answers mastered</span>
        </Card>

        <Card className="p-5 border-border/80 bg-card/90 space-y-1">
          <span className="text-xs text-slate-400 block font-semibold">Questions Remaining</span>
          <span className="text-2xl font-bold font-mono text-amber-400">
            {totalQuestionsCount - practicedQuestionsCount}
          </span>
          <span className="text-[11px] text-slate-400 block">Role & technical challenges</span>
        </Card>

        <Card className="p-5 border-border/80 bg-card/90 space-y-1">
          <span className="text-xs text-slate-400 block font-semibold">Recommended Focus</span>
          <span className="text-sm font-bold text-indigo-300 block truncate">
            {activeCandidate.careerProfile?.targetRole || 'Full Stack Developer'}
          </span>
          <span className="text-[11px] text-slate-400 block">Target career role questions</span>
        </Card>
      </div>

      {/* Recently Practiced Banner */}
      {recentlyPracticed.length > 0 && (
        <Card className="border-emerald-500/30 bg-emerald-950/10 p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">
                <strong>Recently Practiced:</strong> {recentlyPracticed.map((q) => q.topic).join(', ')}
              </span>
            </div>
            <span className="text-[11px] text-emerald-300 italic font-mono shrink-0">
              {practicedQuestionsCount} questions saved in local storage
            </span>
          </div>
        </Card>
      )}

      {/* Filter Control Bar */}
      <Card className="p-4 border-border/80 bg-card/90 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 border-b border-border/50 pb-2">
          <Filter className="h-4 w-4 text-indigo-400" />
          Filter Interview Questions
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Role Selector */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-semibold">Target Career Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {availableRoles.map((role) => (
                <option key={role} value={role} className="bg-slate-900">
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-semibold">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All" className="bg-slate-900">All Categories</option>
              <option value="Technical" className="bg-slate-900">Technical Questions</option>
              <option value="Behavioral" className="bg-slate-900">Behavioral Questions</option>
              <option value="HR" className="bg-slate-900">HR Questions</option>
            </select>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-semibold">Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All" className="bg-slate-900">All Difficulties</option>
              <option value="Beginner" className="bg-slate-900">Beginner</option>
              <option value="Intermediate" className="bg-slate-900">Intermediate</option>
              <option value="Advanced" className="bg-slate-900">Advanced</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Filtered Question Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            Interview Question Cards ({filteredQuestions.length})
          </h2>
          <span className="text-xs text-slate-400">
            Showing {filteredQuestions.length} of {totalQuestionsCount} questions
          </span>
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="space-y-4">
            {filteredQuestions.map((item) => {
              const isPracticed = !!practicedQuestionIds[item.id];
              const isExpanded = expandedQuestionId === item.id;

              return (
                <Card
                  key={item.id}
                  className={`p-5 transition-all bg-card/90 space-y-4 ${
                    isPracticed ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-border/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="gold" className="text-[10px]">
                          {item.roleTitle}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {item.category}
                        </Badge>
                        <Badge
                          variant={
                            item.difficulty === 'Advanced'
                              ? 'destructive'
                              : item.difficulty === 'Intermediate'
                              ? 'outline'
                              : 'secondary'
                          }
                          className="text-[10px]"
                        >
                          {item.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-indigo-300 border-indigo-500/30">
                          {item.topic}
                        </Badge>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">{item.question}</h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePracticedQuestion(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                        isPracticed
                          ? 'border-emerald-500/40 bg-emerald-600 text-white shadow-sm'
                          : 'border-border/80 bg-secondary/30 text-slate-300 hover:bg-secondary'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isPracticed ? 'Practiced' : 'Mark as Practiced'}
                    </button>
                  </div>

                  {/* Accordion Toggle Button for Sample Answer */}
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {isExpanded ? 'Hide Sample Answer & Guidance' : 'View Sample Answer & Guidance'}
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    <span className="text-[10px] text-slate-400 italic">
                      {isPracticed ? 'Status: Practiced' : 'Status: Not Practiced'}
                    </span>
                  </div>

                  {/* Expandable Content Box */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 space-y-3 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-indigo-300 block">Sample Answer:</span>
                        <p className="text-slate-200 leading-relaxed text-[11px]">{item.sampleAnswer}</p>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-border/40">
                        <span className="font-bold text-slate-300 block">Answer Guidance / Key Points to Mention:</span>
                        <p className="text-slate-400 leading-relaxed text-[11px] italic">{item.answerGuidance}</p>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 border-dashed border-border text-center space-y-2">
            <HelpCircle className="h-8 w-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Questions Match Selected Filters</h3>
            <p className="text-xs text-slate-400">Try changing the role, category, or difficulty filter.</p>
          </Card>
        )}
      </div>

      {/* Action Prompts Footer */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-card to-indigo-950/40 p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
              Ready to Verify Your Knowledge in Code Challenges?
            </h3>
            <p className="text-xs text-slate-300">
              Attempt interactive 5-question practical code assessments to earn verifiable proof scores.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/candidate/assess/skill-nextjs"
              className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'text-xs flex items-center gap-1.5')}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Take Assessment
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
