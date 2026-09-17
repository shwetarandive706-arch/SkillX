# SkillX — AI-Powered Career Guidance & Skill Verification Platform

> **Hackathon Product Documentation & Architecture Overview (ED-02 Problem Statement Alignment)**  
> SkillX is an AI-assisted career guidance and proof-based hiring platform for students. It combines **AI Career Recommendations (ED-02)** with verifiable math-backed **Proof Scores (0–100)** calculated from real code artifacts, practical code assessments, market trend insights, interactive learning roadmaps, resume readiness audits, and technical interview preparation.

---

## 1. Project Overview & ED-02 Problem Statement
Developing a comprehensive career guidance system for students based on:
1. **Student Skills** (Verified proof scores & claimed competencies)
2. **Areas of Interest & Career Goals** (Academic branch, target career roles, experience level)
3. **Market Trends & Industry Demand** (Role demand outlook, salary benchmarks, emerging skill shifts)

SkillX bridges the trust gap between student career preparation and hiring requirements by introducing verifiable skill proofs alongside personalized learning roadmaps.

---

## 2. Platform Modules & Completed Phases

### 🎓 Phase 1: Student Career Profile (`/candidate/career-profile`)
* Captures student name, academic branch/degree, current skill tags, areas of interest, career goals, experience level, and target career role.
* Provides instant profile completeness gauge and candidate context sync.

### 🤖 Phase 2: Personalized AI Career Guidance (`/candidate/career-guidance`)
* Deterministic career recommendation engine evaluating skill overlap, interest alignment, and benchmark expectations across 8 technical roles.
* Generates match percentages, matching skills, skill gap missing items, and recommendation rationales.

### 📈 Phase 3: Market Trends & Personalized Learning Roadmap (`/candidate/learning-roadmap`)
* Illustrative demo market insights dataset for 8 technical roles (Demand rating, average salary ranges INR/USD, emerging skills, career growth outlook).
* Role-based 4-stage milestone sequence (Foundational Syntax, Architecture & State Flow, Database & Infrastructure, SkillX Proof Verification).
* Interactive task checklists with `localStorage` state synchronization.

### 🎯 Phase 4: Career Readiness & Skill Gap Analysis (`/candidate/career-readiness`)
* Comprehensive readiness score engine (40% Skill Completion + 25% Roadmap Progress + 20% Portfolio Readiness + 15% Profile Completion).
* Skill Gap Comparison Matrix comparing required core role skills vs student claimed/verified skills (`Completed`, `In Progress`, `Not Started`).
* Actionable priority-ranked recommendations linking directly to learning roadmaps, code tests, and portfolio updates.

### 💼 Phase 5: Portfolio, Resume Audit & Interview Prep
* **Portfolio Readiness (`/candidate/portfolio`):** Portfolio completeness index, project cards, tech stack badges, verified impact/results, GitHub links, and interactive Add/Edit project modals.
* **Resume Readiness Audit (`/candidate/resume-readiness`):** 8-section resume checklist, section optimization suggestions, sample resume copy examples, and `localStorage` persistence.
* **Interview Preparation Hub (`/candidate/interview-preparation`):** Role/Category/Difficulty filters, technical & behavioral questions, expandable sample answer guidance, interactive "Mark as Practiced" button, and progress tracking.

### 🏢 Recruiter Portal & Skill Verification Engine
* **Recruiter Dashboard (`/recruiter/dashboard`):** Active job match rules and candidate match leaderboards.
* **Job Requirement Builder (`/recruiter/jobs/new`):** Weighted priority multipliers (Critical 1.8x, Important 1.2x, Nice to Have 0.6x).
* **Ranked Candidate Match Leaderboard (`/recruiter/jobs/[id]/matches`):** Match percentage matrix filtered by threshold slider.
* **Math Audit Modal (`/recruiter/candidate/[id]`):** Transparent line-by-line proof formula breakdown.
* **5-Question Code Assessments (`/candidate/assess/[skillId]`):** Interactive timed coding tests that recalculate candidate proof scores live.

---

## 3. Proof Score Formula
$$\text{Proof Score} = \text{Evidence Weight (0–40)} + \text{Assessment Weight (0–40)} + \text{Consistency Weight (0–20)}$$

* **Confidence Levels:**
  * **Verified Gold:** Score $\ge 80$ (High verification confidence)
  * **Verified Silver:** Score $60–79$ (Moderate verification confidence)
  * **Self-Reported Baseline:** Score $< 60$ (Unverified baseline)

> *Ethics & Disclosure Disclaimer:* All readiness estimates, recommendations, and market trends are illustrative demo indicators calculated deterministically from local profile data. SkillX never claims automated truth verification or lie detection.

---

## 4. Technology Stack
* **Framework:** Next.js 14.2 (App Router, Client & Server Components)
* **Language:** TypeScript (Strict mode)
* **Styling:** Tailwind CSS, custom dark navy & indigo/purple design system
* **Icons:** Lucide React icons
* **State Management:** React Context (`SkillXContext`) backed by `localStorage` persistence

---

## 5. Local Setup Instructions

Ensure Node.js (v18.0.0 or higher) is installed on your machine.

```bash
# 1. Open project directory
cd SkillX

# 2. Install dependencies
npm install

# 3. Run Development Server
npm run dev

# 4. Build for Production
npm run build

# 5. Start Production Build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Disclaimers & Hackathon MVP Notes
* **Local Storage Persistence:** Uses browser `localStorage` for state persistence rather than a remote server database.
* **Demo Data Labeling:** All mock candidates, jobs, and market insights are explicitly tagged with `[DEMO DATA]` badges.
