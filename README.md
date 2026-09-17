# SkillX — Verifiable Skill Proof Engine

> **Hackathon Product Documentation & Architecture Overview**  
> SkillX is a verifiable skill proof & talent matching platform that replaces unverified resume keyword claims with transparent, math-backed **Proof Scores (0–100)** calculated from real code artifacts, live practical assessments, and evidence consistency metrics.

---

## 1. Project Overview
In modern tech hiring, traditional resumes are bloated with self-reported keyword claims that recruiters cannot easily verify without lengthy interview cycles. SkillX bridges this trust gap by introducing **Verifiable Skill Proof Scores**. 

Candidates connect GitHub repositories, deployed web applications, technical design RFCs, and complete practical coding challenges. Recruiters set job skill criteria with custom priority multipliers (Critical, Important, Nice-to-have) and match candidates based on objective evidence rather than resume keywords.

---

## 2. Problem Statement
* **Keyword Inflation:** 70%+ of software resumes contain self-reported skill claims without proof.
* **Recruiter Fatigue:** Recruiters spend hours scanning text resumes and running preliminary screening calls just to filter out unverified claims.
* **Candidate Frustration:** Talented developers with strong open-source codebases or practical skills often get filtered out by legacy Applicant Tracking Systems (ATS) searching for exact buzzwords.

---

## 3. Solution
SkillX introduces a **Verifiable Proof Score (0–100)** algorithm that combines:
1. **Code Artifact Verification (0–40 pts):** Direct evidence from GitHub repositories, lines of code, test coverage, and live project deployments.
2. **Interactive Skill Assessments (0–40 pts):** Timed practical challenges evaluating real code comprehension and problem solving.
3. **Consistency & Recency Index (0–20 pts):** Activity frequency and multi-artifact verification bonuses.

---

## 4. Key Features
* **Dual Portal Switcher:** Seamless context switching between Candidate and Recruiter views with real-time shared state.
* **Live Session Data Sync:** Taking an assessment or attaching evidence as a candidate instantly recalculates Proof Scores and updates candidate rankings on recruiter leaderboards.
* **Deterministic Math Audit Modal:** Transparent line-by-line breakdown of how every score is calculated.
* **Job Requirement Builder & JD Parser Simulator:** Extract skill requirements automatically from job descriptions and configure weighted priority multipliers.
* **Shareable Public Proof Portfolios:** Verified public candidate profile links with proof badges and GitHub commit metrics.

---

## 5. Technology Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript (Strict mode)
* **Styling:** Tailwind CSS, `shadcn/ui` design system primitives
* **Icons & Animation:** Lucide React icons, CSS backdrop blur, framer-motion ready styling
* **State Management:** React Context (`SkillXContext`) backed by `localStorage` persistence with reset capabilities

---

## 6. Application Workflow
```
Candidate Flow:
[Dashboard] ──> [Attach GitHub/Live Project Evidence] ──> [Take Interactive Skill Test] ──> [Instant Proof Score Update (0-100)] ──> [Shareable Public Portfolio]

Recruiter Flow:
[Job Requirement Builder] ──> [Set Min Proof Thresholds & Weights] ──> [Match Matrix Leaderboard] ──> [Audit Candidate Proof Trail] ──> [Shortlist Candidate]
```

---

## 7. Proof Score Explanation
$$\text{Proof Score} = \text{Evidence Weight (0–40)} + \text{Assessment Weight (0–40)} + \text{Consistency Weight (0–20)}$$

* **Confidence Levels:**
  * **Verified Gold:** Score $\ge 80$ (High verification confidence)
  * **Verified Silver:** Score $60–79$ (Moderate verification confidence)
  * **Self-Reported Baseline:** Score $< 60$ (Unverified baseline)

> *Ethics Boundary:* SkillX Proof Scores are objective algorithmic indicators of artifact evidence strength. SkillX never claims automated lie detection or automated hiring decisions. Final decision-making authority remains 100% human.

---

## 8. Candidate Workflow
1. Navigate to **Candidate Portal** (`/candidate/dashboard`).
2. Review verified skill breakdown and overall Proof Score gauge.
3. Click **"Add Evidence"** to submit a GitHub repository URL, test coverage metrics, or deployed web app link.
4. Click **"Take Test"** to launch interactive skill challenges (`/candidate/assess/[skillId]`).
5. Upon test submission, accuracy is evaluated instantly, updating the candidate's score live across all portals.
6. Share verified public proof profile URL (`/candidate/portfolio`).

---

## 9. Recruiter Workflow
1. Navigate to **Recruiter Portal** (`/recruiter/dashboard`).
2. Click **"Create Job Skill Rule"** (`/recruiter/jobs/new`) to set required skills, minimum proof thresholds, and priority weights (`Critical` 1.8x, `Important` 1.2x, `Nice to Have` 0.6x).
3. View the **Ranked Candidate Leaderboard** (`/recruiter/jobs/[id]/matches`) sorted by weighted match percentage.
4. Filter candidates using the match threshold slider.
5. Click **"Audit Skill Proofs"** (`/recruiter/candidate/[id]`) to inspect line-by-line GitHub metrics, test attempts, and proof formulas before shortlisting.

---

## 10. Installation Instructions
Ensure Node.js (v18.0.0 or higher) is installed on your machine.

```bash
# Clone the repository
git clone https://github.com/demo/skillx.git

# Navigate to project directory
cd SkillX

# Install dependencies
npm install
```

---

## 11. How to Run the Project
```bash
# Run Development Server
npm run dev

# Run Production Build
npm run build

# Start Production Server
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the hackathon MVP demo.

---

## 12. Known Limitations (Hackathon MVP Scope)
* **Local Storage Persistence:** Uses browser `localStorage` for state persistence rather than a remote database (PostgreSQL/Supabase).
* **Simulated External APIs:** GitHub repository metrics and JD skill extraction are simulated using realistic local mock data engines to prevent API rate limits during judge evaluations.
* **Demo Data Labeling:** All mock candidates and job postings are explicitly tagged with `[Demo Data]` badges.

---

## 13. Future Scope
* **Live GitHub OAuth & Webhooks:** Automatic real-time repository indexing and commit pattern analysis.
* **Production PostgreSQL/Prisma Backend:** Secure server-side database storage with row-level security.
* **Verified Peer Endorsements:** Cryptographically signed peer code review attestations.
* **Interactive Code Sandbox:** Live WebContainer-based code execution environment for candidate practical tests.
