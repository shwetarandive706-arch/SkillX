'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useSkillX } from '@/context/SkillXContext';
import { AssessmentRunner } from '@/components/candidate/AssessmentRunner';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Assessment } from '@/lib/types';

export default function SkillAssessmentPage() {
  const params = useParams();
  const skillId = (params?.skillId as string) || 'skill-nextjs';
  const { assessments, skills } = useSkillX();

  const masterSkill = skills.find((s) => s.id === skillId);

  // Fallback assessment generator for any unmapped skill ID
  const fallbackAssessment: Assessment = {
    id: `assess-${skillId}`,
    skillId: skillId,
    skillName: masterSkill ? masterSkill.name : 'Technical Skill Verification',
    durationMinutes: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q1',
        question: `What is a primary architectural best practice when working with ${masterSkill ? masterSkill.name : 'modern software design'}?`,
        options: [
          'Maintain modular separation of concerns and write type-safe code',
          'Bypass all input validation checks in production',
          'Store mutable application state in global un-encapsulated variables',
          'Disable error logging in production environments'
        ],
        correctOptionIndex: 0,
        explanation: 'Modular design, input validation, and type safety are foundational architectural principles.'
      },
      {
        id: 'q2',
        question: `How do you optimize system performance and reliability for ${masterSkill ? masterSkill.name : 'distributed services'}?`,
        options: [
          'Utilize asynchronous non-blocking patterns, efficient caching, and test coverage',
          'Execute synchronous blocking operations on the single thread',
          'Avoid caching static assets',
          'Increase server allocations without profiling bottlenecks'
        ],
        correctOptionIndex: 0,
        explanation: 'Non-blocking I/O execution, automated testing, and multi-tier caching maximize overall throughput.'
      },
      {
        id: 'q3',
        question: `What is the most effective approach to managing state and security in ${masterSkill ? masterSkill.name : 'application development'}?`,
        options: [
          'Enforce strict input sanitization, least-privilege permissions, and immutable state updates',
          'Store secrets in public client-side JavaScript bundles',
          'Ignore edge cases during error handling',
          'Rely exclusively on third-party client plugins for security'
        ],
        correctOptionIndex: 0,
        explanation: 'Input sanitization, least-privilege authorization, and state immutability prevent vulnerability vectors.'
      },
      {
        id: 'q4',
        question: `Why is automated unit and integration testing essential when scaling ${masterSkill ? masterSkill.name : 'codebases'}?`,
        options: [
          'Catches regressions early, documents software behavior, and enables confident refactoring',
          'Doubles runtime execution speed of production servers',
          'Replaces the need for code reviews entirely',
          'Eliminates the need for database indexing'
        ],
        correctOptionIndex: 0,
        explanation: 'Automated test suites catch regressions early and document expected system behavior.'
      },
      {
        id: 'q5',
        question: `What step is critical before deploying updates to production systems?`,
        options: [
          'Run automated CI validation suites, build checks, and staged rollout verification',
          'Deploy directly from local developer branches without building',
          'Remove all environment configuration variables',
          'Turn off API rate limits'
        ],
        correctOptionIndex: 0,
        explanation: 'Automated CI pipelines verify build integrity and regression safety prior to release.'
      }
    ]
  };

  const assessment = assessments[skillId] || fallbackAssessment;

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/candidate/dashboard"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'flex items-center gap-1.5 text-xs text-slate-400 hover:text-white')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Skill Portfolio
        </Link>
      </div>

      <AssessmentRunner assessment={assessment} />
    </div>
  );
}
