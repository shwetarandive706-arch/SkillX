'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { AssessmentRunner } from '@/components/candidate/AssessmentRunner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function SkillAssessmentPage() {
  const params = useParams();
  const skillId = (params?.skillId as string) || 'skill-nextjs';
  const { assessments } = useSkillX();

  const assessment = assessments[skillId] || assessments['skill-nextjs'];

  if (!assessment) {
    return (
      <div className="py-12 text-center max-w-md mx-auto space-y-4">
        <Card className="p-8 space-y-4">
          <AlertCircle className="h-12 w-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Assessment Not Found</h2>
          <p className="text-xs text-muted-foreground">
            No active challenge found for skill ID: {skillId}.
          </p>
          <Link href="/candidate/dashboard">
            <Button variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/candidate/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Skill Portfolio
          </Button>
        </Link>
      </div>

      <AssessmentRunner assessment={assessment} />
    </div>
  );
}
