import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LineChart,
  TrendingUp,
  Users,
  Swords,
  ShieldAlert,
  ArrowRight,
  Info,
  DollarSign,
  Award,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { RefineAiModal } from '../components/common/RefineAiModal';

export const MarketResearchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    activeProject,
    generateMarketResearch,
    refineSectionData,
    isGenerating,
    exportPdf,
  } = useStartup();

  const currentProj = projects.find((p) => p.id === id) || activeProject;
  const [refineModalOpen, setRefineModalOpen] = useState(false);

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

  const handleGenerate = async () => {
    await generateMarketResearch(currentProj.id);
  };

  const research = currentProj.marketResearch;

  return (
    <div id="market-research-page" className="space-y-8 max-w-5xl mx-auto">
      <SectionHeader
        badge="Phase 3: Market Intelligence"
        title="Market Research & Competitive Intelligence"
        description="Bottom-up TAM/SAM/SOM market sizing, customer persona archetypes, competitor moats, and SWOT strategy."
        onRegenerate={research ? handleGenerate : undefined}
        onRefine={research ? () => setRefineModalOpen(true) : undefined}
        onCopy={
          research
            ? () => navigator.clipboard.writeText(JSON.stringify(research, null, 2))
            : undefined
        }
        onExportPdf={() => exportPdf(currentProj.id)}
        isGenerating={isGenerating}
      />

      {/* Empty State */}
      {!research && !isGenerating && (
        <EmptyState
          icon={LineChart}
          title="No Market Intelligence Generated Yet"
          description={
            currentProj.concept
              ? `Ready to generate comprehensive market sizing, SWOT analysis, and competitor tear-downs for ${currentProj.concept.startupName}.`
              : 'Generate your startup idea concept first to analyze the target market.'
          }
          actionLabel="Generate Market Research"
          onAction={handleGenerate}
          secondaryActionLabel="Return to Concept"
          onSecondaryAction={() => navigate(`/project/${currentProj.id}/idea`)}
        />
      )}

      {/* Loading State */}
      {isGenerating && (
        <LoadingState
          message="Synthesizing Market Intelligence..."
          subtext="Calculating TAM/SAM/SOM sizing, benchmarking direct competitors, and building SWOT matrices."
        />
      )}

      {/* Content */}
      {research && !isGenerating && (
        <div id="market-research-content" className="space-y-8 animate-in fade-in duration-300">
          {/* Disclaimer badge as required by prompt guideline #13 */}
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-800 dark:text-indigo-300">
            <Info className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
            <span>
              <strong>Market Sizing Note:</strong> Market estimates and competitor insights are AI-generated based on industry benchmarks. Always validate with direct customer interviews.
            </span>
          </div>

          {/* Market Sizing Metrics (TAM / SAM / SOM) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                  Market Sizing (TAM · SAM · SOM)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
                CAGR: {research.marketOverview.growthRate}
              </span>
            </div>

            {/* Sizing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Total Addressable Market (TAM)
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-display">
                  {research.marketOverview.tam}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Total global annual spend for this broader market category.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  Serviceable Addressable Market (SAM)
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                  {research.marketOverview.sam}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Specific segment addressable by current geographic and product scope.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                  Serviceable Obtainable Market (SOM)
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                  {research.marketOverview.som}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Realistic year 1–3 capture target based on initial distribution blitz.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-2 border-t border-neutral-100 dark:border-neutral-800">
              {research.marketOverview.summary}
            </p>
          </div>

          {/* Customer Segments & Personas */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Customer Segments & Key Motivations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {research.customerSegments.map((segment, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                      {segment.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold">
                      Priority: {segment.priority}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {segment.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">Estimated Segment Size:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white font-mono">
                      {segment.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Analysis Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Competitor Tear-Down & Strategic Moats
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {research.competitors.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                      {comp.name}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                      {comp.pricingModel}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                      Strengths
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-snug">
                      {comp.strengths}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-1">
                      Vulnerabilities / Weaknesses
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-snug">
                      {comp.weaknesses}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                      Our Advantage
                    </span>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                      {comp.differentiation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SWOT Analysis Matrix */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Strategic SWOT Matrix
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-display">
                    Strengths (Internal Advantages)
                  </h4>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {research.swot.strengths.map((s, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/70 dark:border-red-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300 font-display">
                    Weaknesses (Internal Gaps)
                  </h4>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {research.swot.weaknesses.map((w, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 font-display">
                    Opportunities (External Upside)
                  </h4>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {research.swot.opportunities.map((o, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 font-display">
                    Threats (External Risks)
                  </h4>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {research.swot.threats.map((t, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Positioning Statement Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white shadow-lg space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
              Market Positioning Statement
            </span>
            <p className="text-base sm:text-lg font-medium leading-relaxed font-display">
              "{research.positioningStatement}"
            </p>
          </div>

          {/* Next Step CTA */}
          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Market Validated! Next: Business Model Canvas
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Generate the 9-block business architecture (Revenue streams, cost drivers, channels, key partners).
              </p>
            </div>

            <button
              id="next-canvas-cta-btn"
              onClick={() => navigate(`/project/${currentProj.id}/canvas`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-102 transition-all shrink-0"
            >
              <span>Next: Business Canvas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Refine AI Modal */}
      <RefineAiModal
        isOpen={refineModalOpen}
        onClose={() => setRefineModalOpen(false)}
        sectionName="marketResearch"
        onRefine={async (prompt) => {
          await refineSectionData(currentProj.id, 'marketResearch', prompt);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
};
