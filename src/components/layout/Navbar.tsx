import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  Share2,
  Download,
  Moon,
  Sun,
  Laptop,
  Wifi,
  WifiOff,
  ChevronDown,
  FolderOpen,
  CheckCircle2,
} from 'lucide-react';
import { useStartup } from '../../context/StartupContext';
import { ShareModal } from '../common/ShareModal';

export const Navbar: React.FC = () => {
  const {
    projects,
    activeProject,
    selectProject,
    createNewProject,
    theme,
    setThemeMode,
    isOnline,
    aiConfigured,
    exportPdf,
  } = useStartup();

  const navigate = useNavigate();
  const location = useLocation();
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleCreateNew = () => {
    const newProj = createNewProject();
    navigate(`/project/${newProj.id}/idea`);
  };

  const handleSelectProj = (id: string) => {
    selectProject(id);
    setProjectDropdownOpen(false);
    // If we're on a project-specific route, navigate to that step in the new project
    if (location.pathname.startsWith('/project/')) {
      const parts = location.pathname.split('/');
      const step = parts[3] || 'idea';
      navigate(`/project/${id}/${step}`);
    }
  };

  return (
    <>
      <header
        id="app-navbar"
        className="sticky top-0 z-30 w-full h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors"
      >
        {/* Left: Project Switcher & Brand */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-neutral-900 dark:text-white font-display tracking-tight">
                AI Startup Studio
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-5 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-1" />

          {/* Project Switcher Dropdown */}
          <div className="relative">
            <button
              id="project-switcher-btn"
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 transition-colors max-w-[200px] sm:max-w-[240px]"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">
                {activeProject?.concept?.startupName || activeProject?.name || 'Select Project'}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0 ml-auto" />
            </button>

            {projectDropdownOpen && (
              <div
                id="project-switcher-dropdown"
                className="absolute left-0 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Your Ventures
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {projects.map((p) => {
                    const isSelected = p.id === activeProject?.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProj(p.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                          isSelected
                            ? 'font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                            : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="truncate mr-2">
                          <p className="truncate">{p.concept?.startupName || p.name}</p>
                          <p className="text-[10px] text-neutral-400 truncate">{p.industry}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-1 mt-1 px-2">
                  <button
                    onClick={() => {
                      setProjectDropdownOpen(false);
                      handleCreateNew();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Startup</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Online & AI Status Badges */}
          <div className="hidden md:flex items-center gap-1.5">
            {isOnline ? (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40"
                title="Online — synced with LocalStorage"
              >
                <Wifi className="w-2.5 h-2.5" />
                <span>Online</span>
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40"
                title="Offline Mode Active"
              >
                <WifiOff className="w-2.5 h-2.5" />
                <span>Offline</span>
              </span>
            )}

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                aiConfigured
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/40'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
              <span>Gemini 3.7 AI</span>
            </span>
          </div>

          {/* Theme Mode Toggle */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl p-0.5 border border-neutral-200 dark:border-neutral-700">
            <button
              id="theme-light-btn"
              onClick={() => setThemeMode('light')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                theme === 'light'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Light theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-system-btn"
              onClick={() => setThemeMode('system')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                theme === 'system'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="System theme"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-dark-btn"
              onClick={() => setThemeMode('dark')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                theme === 'dark'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Dark theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Export PDF Button */}
          {activeProject && (
            <button
              id="navbar-export-pdf-btn"
              onClick={() => exportPdf(activeProject.id)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
              title="Export complete startup blueprint to PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          )}

          {/* Share Button */}
          {activeProject && (
            <button
              id="navbar-share-btn"
              onClick={() => setShareModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
              title="Share project preview"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Share</span>
            </button>
          )}

          {/* Create Startup CTA */}
          <button
            id="navbar-create-new-btn"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Startup</span>
          </button>
        </div>
      </header>

      {activeProject && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          project={activeProject}
        />
      )}
    </>
  );
};
