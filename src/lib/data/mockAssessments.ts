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
      },
      {
        id: 'q4',
        question: 'Which Next.js server function invalidates cached data associated with a specific route path after a Server Action mutation?',
        options: [
          'revalidatePath("/dashboard")',
          'clearRouteCache("/dashboard")',
          'resetStaticProps("/dashboard")',
          'refreshRouter("/dashboard")'
        ],
        correctOptionIndex: 0,
        explanation: 'revalidatePath Purges cached data on-demand for a specific path segment.'
      },
      {
        id: 'q5',
        question: 'In Next.js App Router, what directory naming convention is used to define named parallel route slots?',
        options: [
          '@slotName (e.g. @modal)',
          '$slotName (e.g. $modal)',
          '#slotName (e.g. #modal)',
          '~slotName (e.g. ~modal)'
        ],
        correctOptionIndex: 0,
        explanation: 'Parallel routes use named slots defined with the @folder convention.'
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
      },
      {
        id: 'q3',
        question: 'What primary problem does the `useCallback` hook solve in React applications?',
        options: [
          'It caches the returned JSX element in memory.',
          'It returns a memoized version of a callback function to prevent unnecessary child re-renders when passing functions as props.',
          'It converts asynchronous functions into synchronous operations.',
          'It automatically handles HTTP API request errors.'
        ],
        correctOptionIndex: 1,
        explanation: 'useCallback memoizes function instances between renders so child components relying on reference equality do not re-render.'
      },
      {
        id: 'q4',
        question: 'What is the purpose of React 18\'s `useTransition` hook?',
        options: [
          'To animate CSS transitions between page navigation',
          'To mark state updates as non-urgent transitions so the UI remains responsive during heavy renders',
          'To handle page route transitions in Next.js',
          'To transition component state from Client to Server'
        ],
        correctOptionIndex: 1,
        explanation: 'useTransition lets you mark updates as transitions, allowing urgent inputs (like typing) to interrupt non-urgent rendering.'
      },
      {
        id: 'q5',
        question: 'Why does React in Development Mode execute effect hooks twice when wrapped in `<React.StrictMode>`?',
        options: [
          'To double check for syntax errors in your code',
          'To help surface bugs caused by missing cleanup logic in effects',
          'To speed up component rendering performance',
          'It is a known unfixed bug in React development builds'
        ],
        correctOptionIndex: 1,
        explanation: 'StrictMode intentionally mounts and unmounts components in development to ensure effects properly clean up side effects.'
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
      },
      {
        id: 'q3',
        question: 'Which TypeScript utility type extracts the return type of a function type T?',
        options: [
          'ReturnType<T>',
          'InstanceType<T>',
          'ExtractReturn<T>',
          'FunctionResult<T>'
        ],
        correctOptionIndex: 0,
        explanation: 'ReturnType<T> yields the return type of a function signature T.'
      },
      {
        id: 'q4',
        question: 'What key pattern distinguishes a Discriminated Union in TypeScript?',
        options: [
          'A union of object types that share a common single literal property tag',
          'A class that implements multiple abstract interfaces',
          'A function that accepts any number of arguments',
          'A tuple with fixed array lengths'
        ],
        correctOptionIndex: 0,
        explanation: 'Discriminated unions use a common literal property (e.g. `type: "success" | "error"`) to narrow union members safely.'
      },
      {
        id: 'q5',
        question: 'What is the benefit of using the `satisfies` operator over a type assertion (`as Type`) in TypeScript 4.9+?',
        codeSnippet: `const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, string | number[]>;`,
        options: [
          'It validates that an expression matches a type without changing or widening the inferred precise type of the expression.',
          'It casts invalid objects to correct types at runtime.',
          'It prevents compilation errors if properties are missing.',
          'It converts TypeScript objects into JSON strings automatically.'
        ],
        correctOptionIndex: 0,
        explanation: 'satisfies checks type compliance while preserving the exact inferred type and property methods.'
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
      },
      {
        id: 'q2',
        question: 'In a read-heavy key-value caching strategy, what is the Cache-Aside (Lazy Loading) pattern?',
        options: [
          'The application reads from the cache first; if missing (cache miss), it reads from DB and updates the cache.',
          'The cache synchronously updates the database on every write operation.',
          'The database updates the cache asynchronously using triggers.',
          'All database queries bypass the cache entirely.'
        ],
        correctOptionIndex: 0,
        explanation: 'Cache-Aside checks the cache first, loads from DB on misses, and populates the cache for subsequent reads.'
      },
      {
        id: 'q3',
        question: 'What is the primary advantage of Consistent Hashing over simple modulo hashing (hash(key) % N) in load balancers?',
        options: [
          'Minimizes the number of keys that need to be remapped when server nodes are added or removed.',
          'Encrypts network traffic using hardware keys.',
          'Guarantees 100% CPU utilization across all nodes.',
          'Eliminates database deadlocks automatically.'
        ],
        correctOptionIndex: 0,
        explanation: 'Consistent hashing ensures that adding or removing a node only affects K/N keys rather than reallocating almost all keys.'
      },
      {
        id: 'q4',
        question: 'What mechanism prevents data corruption when multiple concurrent database transactions attempt to modify the same row?',
        options: [
          'Pessimistic or Optimistic Concurrency Locking (Row-level Locks / MVCC)',
          'Load Balancing round-robin routing',
          'SSL Certificate pinning',
          'DNS caching'
        ],
        correctOptionIndex: 0,
        explanation: 'Concurrency control mechanisms (row-level locking, MVCC) prevent dirty reads and race conditions during simultaneous writes.'
      },
      {
        id: 'q5',
        question: 'Which rate limiting algorithm allows short high-volume traffic bursts while maintaining a smooth average rate over time?',
        options: [
          'Token Bucket algorithm',
          'Round-robin algorithm',
          'Shortest Job First algorithm',
          'First-In-First-Out queue'
        ],
        correctOptionIndex: 0,
        explanation: 'The Token Bucket algorithm allows tokens to accumulate up to a burst limit while refilling at a steady rate.'
      }
    ]
  },
  'skill-nodejs': {
    id: 'assess-node-01',
    skillId: 'skill-nodejs',
    skillName: 'Node.js',
    durationMinutes: 5,
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q1',
        question: 'Which phase of the Node.js Event Loop executes callbacks scheduled by `setTimeout()` and `setInterval()`?',
        options: [
          'Timers phase',
          'Pending callbacks phase',
          'Poll phase',
          'Check phase'
        ],
        correctOptionIndex: 0,
        explanation: 'The Timers phase executes callbacks scheduled by setTimeout() and setInterval() whose threshold has elapsed.'
      },
      {
        id: 'q2',
        question: 'What is "backpressure" in Node.js Streams and how is it handled?',
        options: [
          'When data is written faster than the destination can consume; handled when writable.write() returns false to pause the reader.',
          'When memory usage exceeds 2GB; handled by restarting the process.',
          'When CPU usage reaches 100%; handled by creating a worker thread.',
          'When network latency is high; handled by dropping TCP packets.'
        ],
        correctOptionIndex: 0,
        explanation: 'Backpressure occurs when the writable stream buffer fills up. Pausing the readable source until the "drain" event fires prevents memory overflow.'
      },
      {
        id: 'q3',
        question: 'How does the Node.js `cluster` module enable applications to handle higher request concurrency?',
        options: [
          'By spawning multiple child processes sharing the same server port to utilize multi-core CPU architectures.',
          'By running multiple threads inside a single V8 isolate.',
          'By compiling JavaScript code to C++ native binaries dynamically.',
          'By bypassing the V8 engine for HTTP parsing.'
        ],
        correctOptionIndex: 0,
        explanation: 'The cluster module forks child processes that share server ports, distributing incoming HTTP connections across CPU cores.'
      },
      {
        id: 'q4',
        question: 'What is the execution priority difference between `process.nextTick()` and `setImmediate()` in Node.js?',
        options: [
          '`process.nextTick()` fires immediately after the current operation finishes, before continuing the event loop phases; `setImmediate()` fires in the Check phase.',
          '`setImmediate()` runs before `process.nextTick()`.',
          'Both execute at identical times in the Poll phase.',
          '`process.nextTick()` only runs when the CPU is idle.'
        ],
        correctOptionIndex: 0,
        explanation: 'process.nextTick() processes its queue immediately after the current script executes, before the event loop advances to the next phase.'
      },
      {
        id: 'q5',
        question: 'What is a common cause of memory leaks in long-running Node.js processes related to EventEmitters?',
        options: [
          'Adding event listeners inside request handlers without removing them on completion',
          'Using const variables instead of let',
          'Calling JSON.parse() on large payloads',
          'Using async/await functions'
        ],
        correctOptionIndex: 0,
        explanation: 'Retaining references in EventEmitter listener arrays prevents unreferenced listener closures from being garbage collected.'
      }
    ]
  },
  'skill-postgres': {
    id: 'assess-pg-01',
    skillId: 'skill-postgres',
    skillName: 'PostgreSQL',
    durationMinutes: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q1',
        question: 'Which PostgreSQL command displays the execution plan generated by the planner along with actual execution times for a query?',
        options: [
          'EXPLAIN ANALYZE SELECT ...',
          'SHOW QUERY COST SELECT ...',
          'PROFILE SELECT ...',
          'DEBUG PLAN SELECT ...'
        ],
        correctOptionIndex: 0,
        explanation: 'EXPLAIN ANALYZE executes the statement and returns timing and scan metrics for each node in the query plan.'
      },
      {
        id: 'q2',
        question: 'Which index type in PostgreSQL is best suited for querying elements inside JSONB document columns?',
        options: [
          'GIN (Generalized Inverted Index)',
          'B-Tree Index',
          'Hash Index',
          'BRIN (Block Range Index)'
        ],
        correctOptionIndex: 0,
        explanation: 'GIN indexes are designed for composite values where keys/elements within the items (such as JSONB keys/values or array elements) are queried.'
      },
      {
        id: 'q3',
        question: 'What default transaction isolation level does PostgreSQL use unless configured otherwise?',
        options: [
          'Read Committed',
          'Read Uncommitted',
          'Repeatable Read',
          'Serializable'
        ],
        correctOptionIndex: 0,
        explanation: 'PostgreSQL defaults to Read Committed, where queries see only data committed before the query began.'
      },
      {
        id: 'q4',
        question: 'Why is a connection pooler like PgBouncer recommended for serverless or high-scale Next.js apps connecting to PostgreSQL?',
        options: [
          'PostgreSQL creates a dedicated process per connection; pooling prevents process creation overhead and connection exhaustion.',
          'It automatically converts SQL into GraphQL queries.',
          'It encrypts database tables on disk.',
          'It rewrites slow SELECT queries into faster joins.'
        ],
        correctOptionIndex: 0,
        explanation: 'Postgres uses a process-per-connection model. PgBouncer manages pool connections to avoid running out of database memory and file descriptors.'
      },
      {
        id: 'q5',
        question: 'What is the purpose of the `VACUUM` command in PostgreSQL?',
        options: [
          'To reclaim storage occupied by dead tuples resulting from UPDATE and DELETE operations.',
          'To delete all backup files on disk.',
          'To clear the query cache memory.',
          'To drop unused table indexes automatically.'
        ],
        correctOptionIndex: 0,
        explanation: 'Due to MVCC, deleted or updated rows leave dead tuples behind. VACUUM reclaims this space for reuse.'
      }
    ]
  },
  'skill-python': {
    id: 'assess-py-01',
    skillId: 'skill-python',
    skillName: 'Python & AI Engineering',
    durationMinutes: 5,
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q1',
        question: 'What is the key memory efficiency advantage of a Generator expression over a List comprehension in Python?',
        options: [
          'Generators yield items one at a time lazily using `yield`, keeping memory usage constant regardless of dataset size.',
          'Generators run faster by executing on the GPU.',
          'Generators create immutable tuples instead of lists.',
          'Generators bypass Python type checking rules.'
        ],
        correctOptionIndex: 0,
        explanation: 'Generator expressions compute values on-demand using lazy evaluation, consuming O(1) memory instead of allocating the full list in RAM.'
      },
      {
        id: 'q2',
        question: 'How does the GIL (Global Interpreter Lock) impact CPython multithreading for CPU-bound tasks?',
        options: [
          'It prevents multiple native threads from executing Python bytecode in parallel on multiple CPU cores.',
          'It speeds up mathematical matrix calculations automatically.',
          'It disables asynchronous I/O operations.',
          'It prevents files from being read concurrently.'
        ],
        correctOptionIndex: 0,
        explanation: 'The GIL allows only one thread to hold the Python interpreter lock at a time, making multiprocessing required for CPU-bound speedup.'
      },
      {
        id: 'q3',
        question: 'Which magic methods must a Python class implement to support the `with` statement context manager protocol?',
        options: [
          '__enter__() and __exit__()',
          '__open__() and __close__()',
          '__start__() and __stop__()',
          '__init__() and __del__()'
        ],
        correctOptionIndex: 0,
        explanation: '__enter__() sets up the context resource and __exit__() handles teardown and cleanup.'
      },
      {
        id: 'q4',
        question: 'Why should custom Python decorators use `@functools.wraps(func)`?',
        options: [
          'To preserve the original function\'s __name__, docstring, and function signature attributes.',
          'To make the decorated function run twice as fast.',
          'To auto-convert function arguments to Pydantic models.',
          'To cache the function return value in Redis.'
        ],
        correctOptionIndex: 0,
        explanation: '@functools.wraps copies name, docstring, and annotations from the wrapped function to the wrapper function.'
      },
      {
        id: 'q5',
        question: 'In AI / Vector search systems, when comparing normalized embedding vectors, which metric produces identical ranking order to Cosine Similarity?',
        options: [
          'Dot Product (Inner Product)',
          'Manhattan Distance (L1)',
          'Jaccard Distance',
          'Hamming Distance'
        ],
        correctOptionIndex: 0,
        explanation: 'For unit-normalized vectors (magnitude = 1), Cosine Similarity equals the Dot Product, allowing fast BLAS matrix multiplication.'
      }
    ]
  },
  'skill-docker': {
    id: 'assess-docker-01',
    skillId: 'skill-docker',
    skillName: 'Docker & DevOps',
    durationMinutes: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary architectural benefit of Multi-Stage Docker builds (`FROM node:18 AS builder` ... `FROM node:18-alpine`)?',
        options: [
          'Significantly reduces final production container image size by separating build tools from runtime artifacts.',
          'Executes container builds across multiple remote cloud servers simultaneously.',
          'Allows running Windows and Linux containers in a single image.',
          'Automates Kubernetes deployment manifests.'
        ],
        correctOptionIndex: 0,
        explanation: 'Multi-stage builds leave compiler toolchains and dev dependencies in build stages, copying only final production binaries to slim runtime images.'
      },
      {
        id: 'q2',
        question: 'In a Dockerfile, what is the key functional difference between `CMD` and `ENTRYPOINT`?',
        options: [
          '`ENTRYPOINT` sets the default executable to run; `CMD` provides default arguments that can be easily overridden via CLI.',
          '`CMD` runs during build time; `ENTRYPOINT` runs at container runtime.',
          '`CMD` can only accept shell commands; `ENTRYPOINT` accepts JSON arrays.',
          'There is no functional difference.'
        ],
        correctOptionIndex: 0,
        explanation: 'ENTRYPOINT specifies the container binary to execute, while CMD supplies default parameters that CLI invocation easily overrides.'
      },
      {
        id: 'q3',
        question: 'Which Docker volume type is managed entirely by Docker on the host filesystem and is recommended for database persistence?',
        options: [
          'Named Docker Volumes',
          'Bind mounts',
          'tmpfs mounts',
          'Overlay mounts'
        ],
        correctOptionIndex: 0,
        explanation: 'Named volumes are fully managed by Docker in a dedicated storage area (/var/lib/docker/volumes), isolated from host directory dependencies.'
      },
      {
        id: 'q4',
        question: 'Why is it a best practice in Dockerfiles to copy `package.json` and run `npm install` BEFORE copying the rest of the application source code?',
        options: [
          'Leverages Docker layer caching so npm dependencies are not reinstalled when source files change.',
          'Required by npm to prevent file permission errors.',
          'Ensures node_modules directory is encrypted.',
          'Speeds up git commits on host machine.'
        ],
        correctOptionIndex: 0,
        explanation: 'Docker caches layers based on file hashes. Placing package.json first avoids re-running expensive npm installs when only app code changes.'
      },
      {
        id: 'q5',
        question: 'Which Docker network driver isolates containers on the same Docker host so they can communicate using container names?',
        options: [
          'User-defined Bridge network',
          'Host network',
          'None network',
          'Macvlan network'
        ],
        correctOptionIndex: 0,
        explanation: 'Custom user-defined bridge networks provide automatic DNS resolution between container names on the local host.'
      }
    ]
  }
};
