'use client';

import React, { useState, useEffect } from 'react';
import { CandidateProject } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, FolderGit2, Sparkles } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<CandidateProject, 'id'> | CandidateProject) => void;
  editingProject?: CandidateProject | null;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [impactResults, setImpactResults] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'Verified' | 'In Review' | 'Unverified'>('Verified');

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title || '');
      setDescription(editingProject.description || '');
      setTechnologies(editingProject.technologies?.join(', ') || '');
      setImpactResults(editingProject.impactResults || '');
      setGithubUrl(editingProject.githubUrl || '');
      setLiveDemoUrl(editingProject.liveDemoUrl || '');
      setVerificationStatus(editingProject.verificationStatus || 'Verified');
    } else {
      setTitle('');
      setDescription('');
      setTechnologies('');
      setImpactResults('');
      setGithubUrl('');
      setLiveDemoUrl('');
      setVerificationStatus('Verified');
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectData = {
      ...(editingProject ? { id: editingProject.id } : {}),
      title: title.trim(),
      description: description.trim(),
      technologies: techArray.length > 0 ? techArray : ['Next.js', 'TypeScript'],
      impactResults: impactResults.trim() || 'Verified code artifact linked to candidate proof portfolio.',
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      verificationStatus,
      proofScoreContribution: 25,
      isDemoData: true as const,
    };

    onSave(projectData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="border-indigo-500/40 bg-card p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
              <FolderGit2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h2>
              <span className="text-xs text-slate-400 block">Link code artifacts & project impact evidence</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI-Powered Resume Screener"
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Project Description *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of architecture, problem statement, and solution..."
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Technologies Used (comma separated)</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Next.js, TypeScript, PostgreSQL, Docker"
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Impact & Verified Results</label>
            <input
              type="text"
              value={impactResults}
              onChange={(e) => setImpactResults(e.target.value)}
              placeholder="e.g. Handled 10k daily users with 99.9% uptime"
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">GitHub Repository URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Live Demo URL</label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://my-app.vercel.app"
                className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Verification Status</label>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value as 'Verified' | 'In Review' | 'Unverified')}
              className="w-full bg-secondary/40 border border-border rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Verified" className="bg-slate-900">Verified (Repository Artifact Attached)</option>
              <option value="In Review" className="bg-slate-900">In Review (Code Audit Pending)</option>
              <option value="Unverified" className="bg-slate-900">Unverified (Self-Claimed Baseline)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} className="text-xs">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" size="sm" className="text-xs flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {editingProject ? 'Save Changes' : 'Add Project to Portfolio'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
