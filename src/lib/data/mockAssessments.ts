import { Assessment } from '../types';

export const INITIAL_MOCK_ASSESSMENTS: Record<string, Assessment> = {
  'skill-nextjs': {
    id: 'assess-nextjs-01',
    skillId: 'skill-nextjs',
    skillName: 'Next.js (App Router)',
    durationMinutes: 5,
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q1',
        question: 'In Next.js App Router, which directive converts a React Server Component (RSC) into an interactive Client Component?',
        codeSnippet: `// Which directive must be placed at the very top of this file?
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
        options: [
          '"use client"',
          '"use server"',
          '"use interactive"',
          '"use react"'
        ],
        correctOptionIndex: 0,
        explanation: '"use client" marks the boundary between Server and Client module graphs in Next.js App Router.'
      },
      {
        id: 'q2',
        question: 'What is the default caching behavior of fetch() calls inside Next.js Server Components unless specified otherwise?',
        options: [
          'No cache (always dynamic)',
          'Force cache (static data fetching per request build cache)',
          'Cached only in development mode',
          'Cached in memory for 60 seconds'
        ],
        correctOptionIndex: 1,
        explanation: 'By default in Next.js 14, fetch requests are cached persistently (force-cache) unless revalidation or dynamic configs are set.'
      },
      {
        id: 'q3',
        question: 'How do you create a non-rendered layout segment for organizational grouping without affecting the URL path in Next.js App Router?',
        options: [
          'Enclose directory name in square brackets: [auth]',
          'Enclose directory name in parentheses: (auth)',
          'Prefix directory with underscore: _auth',
          'Prefix directory with hash: #auth'
        ],
        correctOptionIndex: 1,
        explanation: 'Route groups created with parentheses (e.g. (auth)) allow organizing routes without including the directory name in the URL path.'
      }
    ]
  },
  'skill-react': {
    id: 'assess-react-01',
    skillId: 'skill-react',
    skillName: 'React.js',
    durationMinutes: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q1',
        question: 'Why should you avoid mutating state objects directly in React (e.g., `user.age = 25; setUser(user)`)?',
        options: [
          'Direct mutations cause JavaScript syntax errors in strict mode.',
          'React relies on object reference comparison (shallow equality) to determine if a re-render is necessary.',
          'It deletes the original object properties permanently.',
          'React state can only store primitive data types.'
        ],
        correctOptionIndex: 1,
        explanation: 'React compares previous and next state references. Mutating the same object reference keeps the reference identical, preventing re-renders.'
      },
      {
        id: 'q2',
        question: 'When using useEffect to subscribe to an event stream, where should the cleanup function be placed?',
        codeSnippet: `useEffect(() => {
  const subscription = api.subscribe();
  // Where does cleanup code go?
}, []);`,
        options: [
          'Returned as a cleanup function from the useEffect callback',
          'In a second useEffect hook',
          'Passed as the second parameter in the dependency array',
          'Called immediately before api.subscribe()'
        ],
        correctOptionIndex: 0,
        explanation: 'The function returned by useEffect runs during component unmount or before running the effect on re-render.'
      }
    ]
  },
  'skill-typescript': {
    id: 'assess-ts-01',
    skillId: 'skill-typescript',
    skillName: 'TypeScript',
    durationMinutes: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q1',
        question: 'Which utility type constructs a type with all properties of T set to optional?',
        options: [
          'Partial<T>',
          'Required<T>',
          'Readonly<T>',
          'Pick<T, any>'
        ],
        correctOptionIndex: 0,
        explanation: 'Partial<T> makes all properties in T optional (property?: value).'
      },
      {
        id: 'q2',
        question: 'What is the main difference between the `unknown` type and `any` type in TypeScript?',
        options: [
          '`unknown` is identical to `any` in every compiler rule.',
          '`unknown` requires explicit type checking or narrowing before performing operations on it, whereas `any` bypasses all type checking.',
          '`any` only accepts numbers, while `unknown` accepts strings.',
          '`unknown` cannot be assigned any value.'
        ],
        correctOptionIndex: 1,
        explanation: '`unknown` is the type-safe counterpart of `any`. You must narrow or assert its type before usage.'
      }
    ]
  },
  'skill-sysdesign': {
    id: 'assess-sys-01',
    skillId: 'skill-sysdesign',
    skillName: 'System Design',
    durationMinutes: 5,
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q1',
        question: 'In a distributed database system, what does the CAP Theorem state you must trade off during a Network Partition (P)?',
        options: [
          'You must choose between Consistency (C) and Availability (A).',
          'You must choose between Performance and Encryption.',
          'You must choose between SQL and NoSQL storage engines.',
          'You can achieve Consistency, Availability, and Partition Tolerance simultaneously without tradeoff.'
        ],
        correctOptionIndex: 0,
        explanation: 'During a network partition (P), a distributed system must choose between returning consistent latest data (C) or remaining available (A).'
      }
    ]
  }
};
