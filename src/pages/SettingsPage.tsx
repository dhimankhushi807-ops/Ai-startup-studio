import React, { useState } from 'react';
import {
  Settings,
  Moon,
  Sun,
  Laptop,
  Download,
  Upload,
  Trash2,
  Sparkles,
  Shield,
  Database,
  Wifi,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ThemeMode } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    theme,
    setThemeMode,
    aiConfigured,
    isOnline,
    projects,
    exportDatabaseBackup,
    importDatabaseBackup,
    showNotification,
  } = useStartup();

  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  const handleDownloadBackup = () => {
    const jsonStr = exportDatabaseBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-startup-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Backup exported successfully!', 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        importDatabaseBackup(content);
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!importJsonText.trim()) return;
    const res = importDatabaseBackup(importJsonText);
    if (res.success) {
      setImportJsonText('');
      setShowImportArea(false);
    }
  };

  const handleResetData = () => {
    if (
      confirm(
        'Are you sure you want to reset all projects and restore the initial template startups? This action cannot be undone unless you have a JSON backup.'
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div id="settings-page" className="space-y-8 max-w-4xl mx-auto">
      <SectionHeader
        badge="Platform Configuration"
        title="Settings & Data Management"
        description="Manage workspace themes, export complete offline JSON backups, and monitor AI engine connections."
      />

      {/* 1. Theme Configuration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
          Interface Appearance
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Select your preferred visual mode or sync with system preferences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            { mode: 'light' as ThemeMode, label: 'Light Mode', icon: Sun, desc: 'Clean, high-contrast studio canvas' },
            { mode: 'dark' as ThemeMode, label: 'Dark Mode', icon: Moon, desc: 'Eye-friendly deep neutral dark mode' },
            { mode: 'system' as ThemeMode, label: 'System Default', icon: Laptop, desc: 'Sync automatically with OS' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.mode;

            return (
              <button
                key={item.mode}
                id={`settings-theme-${item.mode}-btn`}
                onClick={() => setThemeMode(item.mode)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'
                    }`}
                  />
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                </div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                  {item.label}
                </h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. AI Engine Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
          AI Reasoning Engine Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Primary Model
            </span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-bold text-neutral-900 dark:text-white">
                Google Gemini 3.7 Flash
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
              High-throughput multimodal reasoning with structured JSON validation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Backend Proxy Security
            </span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Active & Secured (No Client Key Leakage)
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
              Requests pass through Express /api proxy keeping API secrets protected.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Data Persistence & Backup */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
          Data Sovereignty & Persistence
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          You currently have <strong>{projects.length} startup blueprints</strong> stored in your browser's persistent storage. Export backups to safeguard your work.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            id="download-backup-btn"
            onClick={handleDownloadBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Complete JSON Backup</span>
          </button>

          <label
            htmlFor="upload-backup-input"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 cursor-pointer transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-500" />
            <span>Restore Backup File</span>
            <input
              id="upload-backup-input"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowImportArea(!showImportArea)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:underline"
          >
            <span>{showImportArea ? 'Hide JSON Input' : 'Paste JSON Directly'}</span>
          </button>
        </div>

        {/* Direct JSON Import Textarea */}
        {showImportArea && (
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 space-y-3 animate-in fade-in duration-200">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Paste Backup JSON Data:
            </label>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste raw backup JSON text here..."
              className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportArea(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-neutral-500"
              >
                Cancel
              </button>
              <button
                onClick={handleManualImport}
                disabled={!importJsonText.trim()}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
              >
                Restore Projects
              </button>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-red-600 dark:text-red-400">
              Reset Workspace Data
            </h4>
            <p className="text-[10px] text-neutral-400">
              Clear all custom saved startups and revert to initial demo blueprints.
            </p>
          </div>

          <button
            id="reset-database-btn"
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
