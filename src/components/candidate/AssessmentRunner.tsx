'use client';

import React, { useState } from 'react';
import { Assessment } from '@/lib/types';
import { useSkillX } from '@/context/SkillXContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Timer, Sparkles, Award } from 'lucide-react';
import Link from 'next/link';

interface AssessmentRunnerProps {
  assessment: Assessment;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({ assessment }) => {
  const { activeCandidateId, updateAssessmentScore } = useSkillX();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultScorePct, setResultScorePct] = useState<number>(0);

  const currentQ = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;
  const progressPct = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    assessment.questions.forEach((q) => {
      if (selectedOptions[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    setResultScorePct(scorePct);
    setIsSubmitted(true);

    // Live update Candidate state & recalculated Proof Score
    updateAssessmentScore(activeCandidateId, assessment.skillId, scorePct);
  };

  if (isSubmitted) {
    const passed = resultScorePct >= 70;

    return (
      <Card className="max-w-2xl mx-auto border-indigo-500/30 bg-card/90 shadow-2xl animate-in zoom-in-95 duration-300">
        <CardHeader className="text-center p-8 pb-4">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Award className="h-8 w-8" />
          </div>
          <Badge variant={passed ? 'gold' : 'destructive'} className="mx-auto text-xs mb-2">
            {passed ? 'SKILL VERIFICATION PASSED' : 'ASSESSMENT COMPLETED'}
          </Badge>
          <CardTitle className="text-3xl font-black text-white">
            {assessment.skillName} Challenge Results
          </CardTitle>
          <CardDescription className="text-sm">
            Instant evaluation complete. Your skill proof confidence index has been dynamically updated.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-0 space-y-6 text-center">
          <div className="rounded-2xl border border-border/80 bg-secondary/40 p-6 max-w-sm mx-auto">
            <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">Test Accuracy</span>
            <div className="text-5xl font-mono font-black text-indigo-400 my-1">{resultScorePct}%</div>
            <span className="text-xs text-slate-300">
              {resultScorePct === 100
                ? 'Flawless score! Maximum assessment weight applied.'
                : passed
                ? 'Great performance! High proof score contribution.'
                : 'Need review. You can retake to improve your proof score.'}
            </span>
          </div>

          <div className="space-y-4 text-left border-t border-border/60 pt-4">
            <h4 className="text-sm font-semibold text-white">Question Review & Explanations:</h4>
            {assessment.questions.map((q, idx) => {
              const selected = selectedOptions[q.id];
              const isCorrect = selected === q.correctOptionIndex;
              return (
                <div key={q.id} className="rounded-xl border border-border/60 p-4 bg-secondary/20 space-y-2">
                  <div className="flex items-start justify-between gap-2 text-xs font-medium">
                    <span className="text-slate-200">
                      Q{idx + 1}: {q.question}
                    </span>
                    <Badge variant={isCorrect ? 'success' : 'destructive'} className="text-[10px]">
                      {isCorrect ? 'Correct (+1)' : 'Incorrect'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-secondary/30 flex justify-between gap-4">
          <Link href="/candidate/dashboard">
            <Button variant="outline" size="lg">
              Return to Candidate Dashboard
            </Button>
          </Link>
          <Link href="/recruiter/jobs/job-01-fullstack/matches">
            <Button variant="gradient" size="lg" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              View Updated Recruiter Leaderboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto border-border/80 bg-card/90 shadow-xl">
      <CardHeader className="p-6 pb-4 border-b border-border/60">
        <div className="flex items-center justify-between gap-4 mb-2">
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            VERIFIABLE ASSESSMENT
          </Badge>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Timer className="h-4 w-4 text-indigo-400" />
            <span>{assessment.durationMinutes} min limit</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white">{assessment.skillName}</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Difficulty: {assessment.difficulty} • Question {currentQuestionIndex + 1} of {totalQuestions}
            </CardDescription>
          </div>
          <span className="font-mono text-xs text-indigo-300 font-bold">
            {Math.round(progressPct)}% Completed
          </span>
        </div>

        <Progress value={progressPct} className="mt-3 h-2" />
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-100 leading-snug">
            {currentQ.question}
          </h3>

          {currentQ.codeSnippet && (
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-indigo-200 font-mono overflow-x-auto my-3 leading-relaxed">
              <code>{currentQ.codeSnippet}</code>
            </pre>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((optionText, optIdx) => {
            const isSelected = selectedOptions[currentQ.id] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-md shadow-indigo-500/10'
                    : 'border-border/80 bg-secondary/30 text-slate-300 hover:bg-secondary/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-6 w-6 rounded-full border text-xs font-bold flex items-center justify-center ${
                      isSelected ? 'border-indigo-400 bg-indigo-600 text-white' : 'border-slate-600 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{optionText}</span>
                </div>
                {isSelected && <CheckCircle2 className="h-5 w-5 text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="p-6 border-t border-border/60 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button
            variant="default"
            onClick={handleNext}
            disabled={selectedOptions[currentQ.id] === undefined}
            className="flex items-center gap-1.5"
          >
            Next Question
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="gradient"
            onClick={handleSubmit}
            disabled={Object.keys(selectedOptions).length < totalQuestions}
            className="flex items-center gap-1.5"
          >
            Submit Assessment & Recalculate Score
            <Sparkles className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
