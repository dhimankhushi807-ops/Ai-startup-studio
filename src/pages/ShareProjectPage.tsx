import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Download,
  Presentation,
  Check,
  Palette,
  LineChart,
  LayoutGrid,
  Rocket,
  ArrowLeft,
  ExternalLink,
  Target,
  Shield,
  Layers,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { exportStartupToPdf } from '../services/pdfService';

export const ShareProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useStartup();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'branding' | 'market' | 'canvas' | 'launch'
  >('overview');

  const project = projects.find((p) => p.id === id) || projects[0];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
          Project Not Found
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          The requested startup blueprint could not be loaded from local storage.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  const concept = project.concept;
  const branding = project.branding;
  const market = project.marketResearch;
  const canvas = project.businessModelCanvas;
  const launch = project.launchPlan;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Studio</span>
          </button>
          <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-xs font-bold text-neutral-900 dark:text-white font-display truncate">
            {concept?.startupName || project.name}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            Read-Only Blueprint
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportStartupToPdf(project)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => navigate(`/project/${project.id}/presentation`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
          >
            <Presentation className="w-3.5 h-3.5 text-indigo-500" />
            <span>Deck Mode</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="max-w-5xl mx-auto p-6 sm:p-8 space-y-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/90">
              {concept?.suggestedIndustry || project.industry}
            </span>
            <span className="text-xs text-indigo-200/70">•</span>
            <span className="text-xs text-indigo-200/70">Seed Venture Blueprint</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            {concept?.startupName || project.name}
          </h1>

          <p className="text-base sm:text-lg text-indigo-100 font-medium max-w-2xl leading-relaxed">
            "{concept?.tagline || 'Autonomous venture framework.'}"
          </p>

          <p className="text-xs sm:text-sm text-indigo-200/80 max-w-3xl leading-relaxed pt-2 border-t border-white/10">
            {concept?.oneLinePitch}
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-neutral-200 dark:border-neutral-800 text-xs">
          {[
            { id: 'overview' as const, label: 'Executive Concept', icon: Sparkles },
            { id: 'branding' as const, label: 'Brand & Palette', icon: Palette },
            { id: 'market' as const, label: 'Market Intelligence', icon: LineChart },
            { id: 'canvas' as const, label: 'Business Canvas', icon: LayoutGrid },
            { id: 'launch' as const, label: 'Launch Roadmap', icon: Rocket },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Executive Concept */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-500 font-display">
                  The Problem & Market Drag
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {concept?.problem || 'Market workflow fragmentation.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 font-display">
                  The Solution
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {concept?.solution || 'Unified autonomous workflow engine.'}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Core Product Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(concept?.keyFeatures || []).map((f, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200 flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Branding */}
        {activeTab === 'branding' && branding && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Primary', color: branding.colors.primary },
                { label: 'Secondary', color: branding.colors.secondary },
                { label: 'Accent', color: branding.colors.accent },
                { label: 'Neutral', color: branding.colors.neutral },
              ].map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <div
                    className="w-full h-16 rounded-xl mb-2 shadow-inner"
                    style={{ backgroundColor: c.color.hex }}
                  />
                  <span className="text-[10px] font-bold text-neutral-400 block">{c.label}</span>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                    {c.color.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">{c.color.hex}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Brand Origin Story
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {branding.brandStory}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Market */}
        {activeTab === 'market' && market && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">TAM</span>
                <span className="text-2xl font-extrabold text-neutral-900 dark:text-white font-display">
                  {market.marketOverview.tam}
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-indigo-200 dark:border-indigo-900 text-center">
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
                  SAM
                </span>
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                  {market.marketOverview.sam}
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900 text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                  SOM
                </span>
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                  {market.marketOverview.som}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Canvas */}
        {activeTab === 'canvas' && canvas && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-neutral-400">Value Propositions</h4>
              <ul className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                {canvas.valuePropositions.map((v, i) => (
                  <li key={i}>• {v}</li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-neutral-400">Revenue Streams</h4>
              <ul className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                {canvas.revenueStreams.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-neutral-400">Customer Segments</h4>
              <ul className="space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                {canvas.customerSegments.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 5: Launch */}
        {activeTab === 'launch' && launch && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Phase 1: Pre-Launch Tasks
              </h4>
              <div className="space-y-2">
                {launch.preLaunch.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 text-xs text-neutral-800 dark:text-neutral-200 flex items-center justify-between"
                  >
                    <span>{t.title}</span>
                    <span className="font-mono text-[10px] text-neutral-400">{t.timeline}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
