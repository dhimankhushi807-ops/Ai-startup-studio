import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  FolderDot,
  Lightbulb,
  Palette,
  LineChart,
  LayoutGrid,
  Rocket,
  Presentation,
  Download,
  BookOpen,
  Star,
  Trash2,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { ProgressBar } from '../components/common/ProgressBar';

export const DashboardPage: React.FC = () => {
  const {
    projects,
    activeProject,
    selectProject,
    createNewProject,
    deleteProject,
    toggleFavoriteProject,
    exportPdf,
  } = useStartup();

  const navigate = useNavigate();

  const handleCreateNew = () => {
    const newProj = createNewProject();
    navigate(`/project/${newProj.id}/idea`);
  };

  const handleOpenProject = (id: string, step?: string) => {
    selectProject(id);
    navigate(`/project/${id}/${step || 'idea'}`);
  };

  return (
    <div id="dashboard-page" className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-8 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-200 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Venture-Scale AI Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              AI Startup Studio
            </h1>
            <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed">
              Transform raw ideas into complete, venture-ready startup blueprints: AI concept formulation, brand systems, bottom-up market intelligence, 9-block canvases, and launch strategies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="dashboard-create-startup-btn"
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg shadow-black/20 hover:scale-102 active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Create New Startup</span>
            </button>
          </div>
        </div>

        {/* Quick workflow stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-indigo-200/70 block">Active Projects</span>
            <span className="text-xl font-bold font-display text-white">{projects.length}</span>
          </div>
          <div>
            <span className="text-indigo-200/70 block">AI Reasoning Engine</span>
            <span className="text-xl font-bold font-display text-white">Gemini 3.7 Flash</span>
          </div>
          <div>
            <span className="text-indigo-200/70 block">Offline Persistence</span>
            <span className="text-xl font-bold font-display text-emerald-400">Indexed Local</span>
          </div>
          <div>
            <span className="text-indigo-200/70 block">Export Formats</span>
            <span className="text-xl font-bold font-display text-white">PDF / Deck / JSON</span>
          </div>
        </div>
      </div>

      {/* 2. Active Project Focus & Progress Bar */}
      {activeProject && (
        <div
          id="dashboard-active-project-card"
          className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg font-display">
                {activeProject.concept?.startupName?.slice(0, 1) || activeProject.name.slice(0, 1)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
                    {activeProject.concept?.startupName || activeProject.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {activeProject.industry}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                  {activeProject.concept?.oneLinePitch || activeProject.ideaInput.rawIdea || 'Drafting startup concept...'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                id="active-proj-deck-btn"
                onClick={() => handleOpenProject(activeProject.id, 'presentation')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
              >
                <Presentation className="w-3.5 h-3.5 text-indigo-500" />
                <span>Presentation Mode</span>
              </button>

              <button
                id="active-proj-export-pdf-btn"
                onClick={() => exportPdf(activeProject.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>

              <button
                id="active-proj-open-btn"
                onClick={() => handleOpenProject(activeProject.id, activeProject.currentStep || 'idea')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
              >
                <span>Continue Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <ProgressBar
            currentStep={activeProject.currentStep || 'idea'}
            completionPercentage={activeProject.completionPercentage}
            onStepClick={(step) => handleOpenProject(activeProject.id, step)}
          />
        </div>
      )}

      {/* 3. Quick Action Tiles */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
          Quick Workflows
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            id="quick-action-idea"
            onClick={() => {
              if (activeProject) handleOpenProject(activeProject.id, 'idea');
              else handleCreateNew();
            }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display mb-1">
              1. Startup Idea
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Formulate value props, problem-solution statements, and moats.
            </p>
          </div>

          <div
            id="quick-action-branding"
            onClick={() => {
              if (activeProject) handleOpenProject(activeProject.id, 'branding');
              else handleCreateNew();
            }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display mb-1">
              2. Branding System
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Generate cohesive color palettes, typography, voice, and logos.
            </p>
          </div>

          <div
            id="quick-action-canvas"
            onClick={() => {
              if (activeProject) handleOpenProject(activeProject.id, 'canvas');
              else handleCreateNew();
            }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display mb-1">
              3. Business Model
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Build interactive 9-block Osterwalder canvas with cost & revenue streams.
            </p>
          </div>

          <div
            id="quick-action-prompts"
            onClick={() => navigate('/prompts')}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display mb-1">
              4. Prompt Library
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Explore 20+ tested venture prompts for pitch decks and personas.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Projects List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Saved Venture Projects
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Manage your generated startup blueprints and launch plans
            </p>
          </div>

          <button
            id="create-new-project-secondary-btn"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Venture</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => {
            const isSelected = proj.id === activeProject?.id;
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className={`p-5 rounded-3xl bg-white dark:bg-neutral-900 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500/80 dark:border-indigo-500/80 shadow-md ring-2 ring-indigo-500/10'
                    : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 truncate max-w-[160px]">
                      {proj.industry}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteProject(proj.id);
                        }}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          proj.isFavorite
                            ? 'text-amber-500'
                            : 'text-neutral-400 hover:text-amber-500'
                        }`}
                        title="Favorite project"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete '${proj.concept?.startupName || proj.name}'?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-neutral-900 dark:text-white font-display line-clamp-1 mb-1">
                    {proj.concept?.startupName || proj.name}
                  </h4>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {proj.concept?.oneLinePitch || proj.ideaInput.rawIdea || 'No concept generated yet.'}
                  </p>
                </div>

                <div>
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-400 mb-1">
                      <span>Completion</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {proj.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(5, proj.completionPercentage)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <button
                      onClick={() => handleOpenProject(proj.id, proj.currentStep || 'idea')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-indigo-600 hover:text-white dark:bg-neutral-800 dark:hover:bg-indigo-600 dark:text-neutral-200 text-neutral-700 transition-all"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
