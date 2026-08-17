import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Rocket,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Calendar,
  Layers,
  Flag,
  Presentation,
  CheckSquare,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { RefineAiModal } from '../components/common/RefineAiModal';
import { LaunchTask } from '../types';

export const LaunchPlannerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    activeProject,
    generateLaunchPlan,
    refineSectionData,
    updateProject,
    isGenerating,
    exportPdf,
  } = useStartup();

  const currentProj = projects.find((p) => p.id === id) || activeProject;
  const [refineModalOpen, setRefineModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'preLaunch' | 'launch' | 'postLaunch'>('all');

  if (!currentProj) {
    return (
      <div className="p-8 text-center text-neutral-500">
        Project not found.{' '}
        <button onClick={() => navigate('/')} className="text-indigo-600 underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const launchPlan = currentProj.launchPlan;

  const handleGenerate = async () => {
    await generateLaunchPlan(currentProj.id);
  };

  const toggleTaskStatus = (phase: 'preLaunch' | 'launch' | 'postLaunch', taskId: string) => {
    if (!launchPlan) return;
    const currentTasks = [...launchPlan[phase]];
    const updatedTasks = currentTasks.map((t) =>
      t.id === taskId
        ? { ...t, status: (t.status === 'done' ? 'todo' : 'done') as 'done' | 'todo' }
        : t
    );

    updateProject({
      ...currentProj,
      launchPlan: {
        ...launchPlan,
        [phase]: updatedTasks,
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const allTasks = launchPlan
    ? [...launchPlan.preLaunch, ...launchPlan.launch, ...launchPlan.postLaunch]
    : [];
  const completedTasks = allTasks.filter((t) => t.status === 'done').length;
  const totalTasks = allTasks.length;
  const launchProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const renderTaskCard = (task: LaunchTask, phase: 'preLaunch' | 'launch' | 'postLaunch') => {
    const isDone = task.status === 'done';

    return (
      <div
        key={task.id}
        id={`task-card-${task.id}`}
        onClick={() => toggleTaskStatus(phase, task.id)}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group select-none ${
          isDone
            ? 'bg-neutral-50/60 dark:bg-neutral-900/40 border-neutral-200/60 dark:border-neutral-800 opacity-60'
            : 'bg-white dark:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs'
        }`}
      >
        <button
          type="button"
          className="mt-0.5 text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0"
        >
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                task.category === 'Marketing'
                  ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                  : task.category === 'Engineering'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                  : task.category === 'Operations'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              {task.category}
            </span>

            <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              {task.timeline}
            </span>
          </div>

          <h4
            className={`text-xs sm:text-sm font-bold text-neutral-900 dark:text-white ${
              isDone ? 'line-through text-neutral-400 dark:text-neutral-500' : ''
            }`}
          >
            {task.title}
          </h4>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
            {task.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div id="launch-planner-page" className="space-y-8 max-w-5xl mx-auto">
      <SectionHeader
        badge="Phase 5: Go-To-Market"
        title="Go-To-Market Launch Strategy & Execution Roadmap"
        description="Actionable multi-phase launch checklist spanning pre-launch discovery, launch distribution blitz, and post-launch scale."
        onRegenerate={launchPlan ? handleGenerate : undefined}
        onRefine={launchPlan ? () => setRefineModalOpen(true) : undefined}
        onCopy={
          launchPlan
            ? () => navigator.clipboard.writeText(JSON.stringify(launchPlan, null, 2))
            : undefined
        }
        onExportPdf={() => exportPdf(currentProj.id)}
        isGenerating={isGenerating}
      />

      {/* Empty State */}
      {!launchPlan && !isGenerating && (
        <EmptyState
          icon={Rocket}
          title="No Launch Roadmap Generated Yet"
          description={
            currentProj.concept
              ? `Ready to generate the phased Go-To-Market execution checklist for ${currentProj.concept.startupName}.`
              : 'Generate your startup idea concept first to synthesize the launch roadmap.'
          }
          actionLabel="Generate Launch Plan"
          onAction={handleGenerate}
          secondaryActionLabel="Return to Concept"
          onSecondaryAction={() => navigate(`/project/${currentProj.id}/idea`)}
        />
      )}

      {/* Loading State */}
      {isGenerating && (
        <LoadingState
          message="Synthesizing Launch Strategy & Milestones..."
          subtext="Building timeline-based checklists across Pre-Launch validation, Launch blitz, and Post-Launch growth."
        />
      )}

      {/* Phased Roadmap Content */}
      {launchPlan && !isGenerating && (
        <div id="launch-roadmap-content" className="space-y-8 animate-in fade-in duration-300">
          {/* Progress Overview Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                    Launch Execution Velocity
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {completedTasks} of {totalTasks} tactical tasks completed ({launchProgress}%)
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs">
                {(['all', 'preLaunch', 'launch', 'postLaunch'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    {tab === 'all'
                      ? 'All Tasks'
                      : tab === 'preLaunch'
                      ? 'Pre-Launch'
                      : tab === 'launch'
                      ? 'Launch Day'
                      : 'Post-Launch'}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Progress Track */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${launchProgress}%` }}
              />
            </div>
          </div>

          {/* Phase 1: Pre-Launch */}
          {(activeTab === 'all' || activeTab === 'preLaunch') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-display">
                  Phase 1: Pre-Launch (Weeks -4 to -1)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {launchPlan.preLaunch.map((task) => renderTaskCard(task, 'preLaunch'))}
              </div>
            </div>
          )}

          {/* Phase 2: Launch */}
          {(activeTab === 'all' || activeTab === 'launch') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-display">
                  Phase 2: Launch Day Blitz (Week 1)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {launchPlan.launch.map((task) => renderTaskCard(task, 'launch'))}
              </div>
            </div>
          )}

          {/* Phase 3: Post-Launch */}
          {(activeTab === 'all' || activeTab === 'postLaunch') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-display">
                  Phase 3: Post-Launch Growth & Retention (Weeks 2–8)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {launchPlan.postLaunch.map((task) => renderTaskCard(task, 'postLaunch'))}
              </div>
            </div>
          )}

          {/* Next Step CTA */}
          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                All 5 Venture Stages Complete!
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Review your high-impact pitch deck presentation slides or export the complete PDF.
              </p>
            </div>

            <button
              id="next-presentation-cta-btn"
              onClick={() => navigate(`/project/${currentProj.id}/presentation`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-102 transition-all shrink-0"
            >
              <Presentation className="w-4 h-4" />
              <span>Open Pitch Deck Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Refine Modal */}
      <RefineAiModal
        isOpen={refineModalOpen}
        onClose={() => setRefineModalOpen(false)}
        sectionName="launchPlan"
        onRefine={async (prompt) => {
          await refineSectionData(currentProj.id, 'launchPlan', prompt);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
};
