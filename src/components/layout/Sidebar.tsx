import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  Palette,
  LineChart,
  LayoutGrid,
  Rocket,
  Presentation,
  BookOpen,
  Settings,
  Sparkles,
  ChevronRight,
  FolderDot,
} from 'lucide-react';
import { useStartup } from '../../context/StartupContext';

export const Sidebar: React.FC = () => {
  const { activeProject, projects } = useStartup();
  const location = useLocation();

  const currentProjectId = activeProject?.id || projects[0]?.id || 'default';

  const navItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: '1. Idea Generator',
      path: `/project/${currentProjectId}/idea`,
      icon: Lightbulb,
      badge: activeProject?.concept?.startupName ? 'Done' : null,
    },
    {
      label: '2. Branding',
      path: `/project/${currentProjectId}/branding`,
      icon: Palette,
      badge: activeProject?.branding ? 'Done' : null,
    },
    {
      label: '3. Market Research',
      path: `/project/${currentProjectId}/market-research`,
      icon: LineChart,
      badge: activeProject?.marketResearch ? 'Done' : null,
    },
    {
      label: '4. Business Canvas',
      path: `/project/${currentProjectId}/canvas`,
      icon: LayoutGrid,
      badge: activeProject?.businessModelCanvas ? 'Done' : null,
    },
    {
      label: '5. Launch Planner',
      path: `/project/${currentProjectId}/launch`,
      icon: Rocket,
      badge: activeProject?.launchPlan ? 'Done' : null,
    },
    {
      label: '6. Pitch Presentation',
      path: `/project/${currentProjectId}/presentation`,
      icon: Presentation,
      badge: 'Slides',
    },
    {
      label: 'Prompt Library',
      path: '/prompts',
      icon: BookOpen,
      badge: '20+ Prompts',
    },
    {
      label: 'Settings & Data',
      path: '/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      id="app-sidebar"
      className="hidden lg:flex flex-col w-64 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 h-[calc(100vh-4rem)] sticky top-16 shrink-0 select-none"
    >
      {/* Current Project Card in Sidebar */}
      {activeProject && (
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Active Blueprint
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
              {activeProject.completionPercentage}% Complete
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 font-bold text-xs font-display">
              {activeProject.concept?.startupName?.slice(0, 1) || activeProject.name.slice(0, 1)}
            </div>
            <div className="truncate">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {activeProject.concept?.startupName || activeProject.name}
              </h4>
              <p className="text-[10px] text-neutral-400 truncate">
                {activeProject.industry || 'Seed Venture'}
              </p>
            </div>
          </div>

          {/* Mini progress bar */}
          <div className="w-full bg-neutral-200 dark:bg-neutral-700/60 h-1 rounded-full overflow-hidden mt-2.5">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, activeProject.completionPercentage)}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Main Workflow
        </div>

        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={idx}
              to={item.path}
              id={`nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs shadow-indigo-500/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-neutral-400 dark:text-neutral-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge === 'Done'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-neutral-200/80 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Pro Footer */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/30">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-neutral-900 dark:text-white font-display">
              Venture AI Engine
            </span>
          </div>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Multi-stage reasoning tuned for venture blueprints & fundraising.
          </p>
        </div>
      </div>
    </aside>
  );
};
