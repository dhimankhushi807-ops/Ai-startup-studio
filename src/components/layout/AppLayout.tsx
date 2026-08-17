import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useStartup } from '../../context/StartupContext';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
  LayoutDashboard,
  Lightbulb,
  Palette,
  LineChart,
  LayoutGrid,
  Rocket,
} from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { isGenerating, generatingPhase, error, clearError, notification, activeProject, projects } = useStartup();
  const location = useLocation();
  const navigate = useNavigate();

  const currentProjectId = activeProject?.id || projects[0]?.id || 'default';

  // Mobile Bottom Nav items
  const mobileNavItems = [
    { label: 'Home', path: '/', icon: LayoutDashboard },
    { label: 'Idea', path: `/project/${currentProjectId}/idea`, icon: Lightbulb },
    { label: 'Brand', path: `/project/${currentProjectId}/branding`, icon: Palette },
    { label: 'Market', path: `/project/${currentProjectId}/market-research`, icon: LineChart },
    { label: 'Canvas', path: `/project/${currentProjectId}/canvas`, icon: LayoutGrid },
    { label: 'Launch', path: `/project/${currentProjectId}/launch`, icon: Rocket },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors">
      {/* Top Navigation */}
      <Navbar />

      {/* Floating AI Generation Status Banner */}
      {isGenerating && (
        <div
          id="global-ai-generating-banner"
          className="fixed top-18 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-neutral-900/90 text-white dark:bg-white/90 dark:text-neutral-900 backdrop-blur-md shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          </div>
          <span className="text-xs font-semibold">
            {generatingPhase || 'Synthesizing with Gemini 3.7 AI...'}
          </span>
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        </div>
      )}

      {/* Global Toast Notification */}
      {notification && (
        <div
          id="global-notification-toast"
          className={`fixed bottom-18 lg:bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-900/90 text-white border-emerald-500/40'
              : notification.type === 'error'
              ? 'bg-red-900/90 text-white border-red-500/40'
              : notification.type === 'warning'
              ? 'bg-amber-900/90 text-white border-amber-500/40'
              : 'bg-neutral-900/90 text-white border-neutral-700'
          }`}
        >
          {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {notification.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Global Error Banner */}
      {error && (
        <div
          id="global-error-banner"
          className="mx-4 sm:mx-6 mt-4 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-300 text-xs flex items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
          <button
            onClick={clearError}
            className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-0">
        <Sidebar />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div
        id="mobile-bottom-nav"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around px-2"
      >
        {mobileNavItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-12 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
