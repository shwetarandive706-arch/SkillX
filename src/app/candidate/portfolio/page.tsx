'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useSkillX } from '@/context/SkillXContext';
import { CandidateProject } from '@/lib/types';
import { AddProjectModal } from '@/components/candidate/AddProjectModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProofScoreBadge } from '@/components/shared/ProofScoreBadge';
import { EvidenceCard } from '@/components/shared/EvidenceCard';
import {
  ShieldCheck,
  MapPin,
  Github,
  Award,
  Share2,
  FolderGit2,
  Plus,
  Edit,
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';

function PortfolioContent() {
  const searchParams = useSearchParams();
  const candidateId = searchParams?.get('id');
  const {
    candidates,
    activeCandidate,
    candidateProjects,
    addCandidateProject,
    updateCandidateProject,
  } = useSkillX();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CandidateProject | null>(null);

  const candidate = candidateId
    ? candidates.find((c) => c.id === candidateId) || activeCandidate
    : activeCandidate;

  const projectsList = candidateProjects || [];

  // Calculate portfolio metrics
  const totalProjects = projectsList.length;
  const verifiedProjects = projectsList.filter((p) => p.verificationStatus === 'Verified').length;
  const hasGithub = !!(candidate.githubUsername || projectsList.some((p) => p.githubUrl));

  let portfolioCompletion = 40;
  if (totalProjects > 0) portfolioCompletion += 25;
  if (verifiedProjects > 0) portfolioCompletion += 20;
  if (hasGithub) portfolioCompletion += 15;
  portfolioCompletion = Math.min(100, portfolioCompletion);

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Verified Proof Portfolio link copied to clipboard!');
    }
  };

  const handleSaveProject = (projectData: Omit<CandidateProject, 'id'> | CandidateProject) => {
    if ('id' in projectData && projectData.id) {
      updateCandidateProject(projectData as CandidateProject);
    } else {
      addCandidateProject(projectData);
    }
  };

  const handleEditClick = (project: CandidateProject) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto pb-16">
      {/* Top Banner / Share Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="gold" className="text-xs px-3 py-1 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            VERIFIED PUBLIC PROOF PORTFOLIO
          </Badge>
          <Badge variant="demo" className="text-[10px]">
            DEMO DATA
          </Badge>
        </div>

        <Button variant="outline" size="sm" onClick={handleCopyShareLink} className="flex items-center gap-1.5 text-xs w-fit">
          <Share2 className="h-3.5 w-3.5" />
          Share Verified Portfolio
        </Button>
      </div>

      {/* Candidate Profile Card Header */}
      <Card className="border-indigo-500/40 bg-card/90 p-8 rounded-3xl shadow-xl gradient-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <Image
              src={candidate.avatarUrl}
              alt={candidate.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-white">{candidate.name}</h1>
                {candidate.careerProfile?.targetRole && (
                  <Badge variant="gold" className="text-[10px]">
                    {candidate.careerProfile.targetRole}
                  </Badge>
                )}
              </div>
              <p className="text-base font-medium text-slate-300 mt-1">{candidate.title}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {candidate.location}
                </span>
                {candidate.githubUsername && (
                  <a
                    href={`https://github.com/${candidate.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-300 hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    github.com/{candidate.githubUsername}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="text-center bg-secondary/50 border border-border/80 p-5 rounded-2xl shrink-0 space-y-1">
            <span className="text-xs text-slate-400 block uppercase font-mono tracking-wider">Overall Proof Score</span>
            <ProofScoreBadge score={candidate.overallProofScore} size="xl" showConfidence={true} />
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mt-6 pt-6 border-t border-border/60">
          {candidate.bio}
        </p>
      </Card>

      {/* Portfolio Readiness Metric Banner */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-card via-indigo-950/30 to-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <FolderGit2 className="h-4 w-4 text-indigo-400" />
                Portfolio Readiness Score
              </span>
              <span className="font-mono font-bold text-indigo-400">{portfolioCompletion}%</span>
            </div>
            <Progress value={portfolioCompletion} className="h-2" />
            <p className="text-[11px] text-slate-400">
              Evaluates total projects, verified code artifacts, and repository linkages.
            </p>
          </div>

          <div className="flex items-center justify-around md:col-span-2 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Total Projects</span>
              <span className="text-xl font-bold text-white">{totalProjects}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Verified Artifacts</span>
              <span className="text-xl font-bold text-emerald-400">{verifiedProjects}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">GitHub Linked</span>
              <span className="text-xl font-bold text-indigo-400">{hasGithub ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Portfolio Projects Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FolderGit2 className="h-6 w-6 text-indigo-400" />
              Verified Portfolio Projects ({totalProjects})
            </h2>
            <span className="text-xs text-slate-400">
              Technical software projects linked to candidate proof profile
            </span>
          </div>

          <Button variant="gradient" size="sm" onClick={handleAddClick} className="text-xs flex items-center gap-1.5 shrink-0">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {totalProjects > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsList.map((project) => (
              <Card key={project.id} className="border-border/80 bg-card/90 p-6 space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                        <Badge
                          variant={
                            project.verificationStatus === 'Verified'
                              ? 'success'
                              : project.verificationStatus === 'In Review'
                              ? 'gold'
                              : 'outline'
                          }
                          className="text-[10px]"
                        >
                          {project.verificationStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{project.description}</p>
                    </div>

                    <button
                      onClick={() => handleEditClick(project)}
                      className="p-1.5 rounded-lg border border-border/60 bg-secondary/30 text-slate-400 hover:text-white hover:bg-secondary shrink-0"
                      title="Edit Project"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px]">
                        <Code2 className="h-3 w-3 mr-1 text-indigo-400" />
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Impact Results */}
                  <div className="p-3 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      Verified Impact / Results:
                    </span>
                    <p className="text-[11px] leading-normal">{project.impactResults}</p>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-300 hover:text-white flex items-center gap-1"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Repository
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-300 hover:text-white flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    +{project.proofScoreContribution || 20} Proof Pts
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="p-8 border-dashed border-border text-center space-y-3">
            <FolderGit2 className="h-10 w-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Portfolio Projects Added Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Attach technical software projects and code repository links to build your verified proof score.
            </p>
            <Button variant="gradient" size="sm" onClick={handleAddClick} className="text-xs inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Add First Project
            </Button>
          </Card>
        )}
      </div>

      {/* Verified Skills Grid Audit Trail */}
      <div className="space-y-6 pt-6 border-t border-border/60">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-400" />
          Verified Skills & Code Artifact Audit Trail
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidate.skills.map((skillItem) => (
            <Card key={skillItem.skillId} className="border-border/80 bg-card/80 p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{skillItem.skillName}</h3>
                  <Badge variant="outline" className="text-[10px] mt-1">
                    {skillItem.category} • Claimed: {skillItem.claimedLevel}
                  </Badge>
                </div>
                <ProofScoreBadge score={skillItem.proofScore} size="md" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 block">
                  Attached Proof Evidence ({skillItem.evidence.length}):
                </span>

                {skillItem.evidence.length > 0 ? (
                  skillItem.evidence.map((ev) => <EvidenceCard key={ev.id} evidence={ev} />)
                ) : (
                  <p className="text-xs text-muted-foreground italic">Self-reported baseline (no code artifacts attached).</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal Container */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />
    </div>
  );
}

export default function PublicPortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-400 font-mono text-sm animate-pulse">
          Loading Verified Proof Portfolio...
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
