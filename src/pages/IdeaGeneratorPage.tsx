import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Lightbulb,
  ArrowRight,
  Save,
  Wand2,
  Copy,
  Check,
  Zap,
  Target,
  ShieldCheck,
  Coins,
  Layers,
  Edit3,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { IdeaInput, StartupConcept } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingState } from '../components/common/LoadingState';
import { RefineAiModal } from '../components/common/RefineAiModal';

const INDUSTRY_PRESETS = [
  'B2B Enterprise SaaS',
  'HealthTech & Longevity',
  'Fintech & Payments',
  'AI Developer Tools',
  'Supply Chain & Logistics',
  'EdTech & Continuous Learning',
  'Cybersecurity & Privacy',
  'CleanTech & Energy',
];

const BUSINESS_TYPES = [
  'B2B SaaS (Subscription)',
  'D2C Physical & Digital',
  'Two-Sided Marketplace',
  'API & Consumption Platform',
  'Hardware + Software Ecosystem',
];

export const IdeaGeneratorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    activeProject,
    selectProject,
    generateConcept,
    generateEntireStartupPlan,
    refineSectionData,
    updateProject,
    isGenerating,
    exportPdf,
  } = useStartup();

  const currentProj = projects.find((p) => p.id === id) || activeProject;

  const [formData, setFormData] = useState<IdeaInput>({
    rawIdea: '',
    industry: 'B2B Enterprise SaaS',
    targetAudience: '',
    locationMarket: 'Global (English-First)',
    businessType: 'B2B SaaS (Subscription)',
    context: '',
  });

  const [isEditingConcept, setIsEditingConcept] = useState(false);
  const [editedConcept, setEditedConcept] = useState<StartupConcept | null>(null);
  const [refineModalOpen, setRefineModalOpen] = useState(false);

  useEffect(() => {
    if (id && (!activeProject || activeProject.id !== id)) {
      selectProject(id);
    }
  }, [id, activeProject, selectProject]);

  useEffect(() => {
    if (currentProj) {
      setFormData({
        rawIdea: currentProj.ideaInput.rawIdea || '',
        industry: currentProj.ideaInput.industry || 'B2B Enterprise SaaS',
        targetAudience: currentProj.ideaInput.targetAudience || '',
        locationMarket: currentProj.ideaInput.locationMarket || 'Global (English-First)',
        businessType: currentProj.ideaInput.businessType || 'B2B SaaS (Subscription)',
        context: currentProj.ideaInput.context || '',
      });
      if (currentProj.concept) {
        setEditedConcept(currentProj.concept);
      }
    }
  }, [currentProj]);

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

  const handleGenerateConceptOnly = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.rawIdea.trim() || isGenerating) return;
    await generateConcept(currentProj.id, formData);
  };

  const handleGenerateAll = async () => {
    if (!formData.rawIdea.trim() || isGenerating) return;
    await generateEntireStartupPlan(currentProj.id, formData);
  };

  const handleSaveEditedConcept = () => {
    if (!editedConcept) return;
    updateProject({
      ...currentProj,
      name: editedConcept.startupName || currentProj.name,
      concept: editedConcept,
      updatedAt: new Date().toISOString(),
    });
    setIsEditingConcept(false);
  };

  const handleCopyConcept = () => {
    if (!currentProj.concept) return;
    navigator.clipboard.writeText(JSON.stringify(currentProj.concept, null, 2));
  };

  return (
    <div id="idea-generator-page" className="space-y-8 max-w-5xl mx-auto">
      <SectionHeader
        badge="Phase 1: Venture Architecture"
        title="AI Startup Idea & Concept Formulation"
        description="Transform raw seed thoughts into structured, defensible value propositions with market moats."
        onRegenerate={currentProj.concept ? () => handleGenerateConceptOnly() : undefined}
        onRefine={currentProj.concept ? () => setRefineModalOpen(true) : undefined}
        onCopy={currentProj.concept ? handleCopyConcept : undefined}
        onExportPdf={() => exportPdf(currentProj.id)}
        isGenerating={isGenerating}
      />

      {/* Input Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Venture Seed Input
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              setFormData({
                rawIdea:
                  'Autonomous AI workflow platform that monitors continuous cloud spend and auto-optimizes microservices kubernetes clusters.',
                industry: 'AI Developer Tools',
                targetAudience: 'DevOps leads, Site Reliability Engineers, and CTOs at scaleups.',
                locationMarket: 'North America & Europe',
                businessType: 'B2B SaaS (Subscription)',
                context: 'Cloud egress and idling GPU resources waste $40k/month on average.',
              })
            }
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Load Example Idea
          </button>
        </div>

        <form onSubmit={handleGenerateConceptOnly} className="space-y-5">
          {/* Main Idea Textarea */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
              Startup Idea / Problem Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="raw-idea-input"
              rows={3}
              required
              value={formData.rawIdea}
              onChange={(e) => setFormData({ ...formData, rawIdea: e.target.value })}
              placeholder="e.g., A mobile app that connects local organic bakeries with neighborhood cafes to eliminate daily pastry waste through dynamic morning flash-auctions..."
              className="w-full px-4 py-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />
          </div>

          {/* Grid inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                Industry & Domain
              </label>
              <input
                id="idea-industry-input"
                type="text"
                list="industry-presets"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g. HealthTech, B2B SaaS"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <datalist id="industry-presets">
                {INDUSTRY_PRESETS.map((p, idx) => (
                  <option key={idx} value={p} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                Target Audience / ICP
              </label>
              <input
                id="idea-audience-input"
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Remote design agencies, Fleet managers"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                Target Market / Geography
              </label>
              <input
                id="idea-location-input"
                type="text"
                value={formData.locationMarket}
                onChange={(e) => setFormData({ ...formData, locationMarket: e.target.value })}
                placeholder="e.g. Global, US Tier-1 Metros"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                Business Model Type
              </label>
              <select
                id="idea-businesstype-select"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {BUSINESS_TYPES.map((bt, idx) => (
                  <option key={idx} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
              Additional Context / Constraints (Optional)
            </label>
            <input
              id="idea-context-input"
              type="text"
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              placeholder="e.g., Must integrate with Stripe, requires HIPAA compliance, bootstrapped budget..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs text-neutral-400">
              Powered by Google Gemini 3.7 Flash
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                id="generate-concept-btn"
                disabled={!formData.rawIdea.trim() || isGenerating}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-900 shadow-sm transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate Concept'}</span>
              </button>

              <button
                type="button"
                id="generate-full-plan-btn"
                onClick={handleGenerateAll}
                disabled={!formData.rawIdea.trim() || isGenerating}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:scale-102 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>1-Click Full Startup Plan</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Loading state */}
      {isGenerating && <LoadingState message="Formulating structured venture concept..." />}

      {/* Generated Result Display */}
      {currentProj.concept && !isGenerating && (
        <div id="generated-concept-cards" className="space-y-6 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Concept Generated
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isEditingConcept ? (
                <button
                  id="save-concept-edits-btn"
                  onClick={handleSaveEditedConcept}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Edits</span>
                </button>
              ) : (
                <button
                  id="edit-concept-btn"
                  onClick={() => setIsEditingConcept(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in Place</span>
                </button>
              )}
            </div>
          </div>

          {/* Hero Pitch Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/40 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100/60 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  Venture Brand & Tagline
                </span>
                {isEditingConcept ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedConcept?.startupName || ''}
                      onChange={(e) =>
                        setEditedConcept((c) => (c ? { ...c, startupName: e.target.value } : null))
                      }
                      className="text-2xl font-extrabold font-display px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 w-full"
                    />
                    <input
                      type="text"
                      value={editedConcept?.tagline || ''}
                      onChange={(e) =>
                        setEditedConcept((c) => (c ? { ...c, tagline: e.target.value } : null))
                      }
                      className="text-sm px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 w-full"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-display">
                      {currentProj.concept.startupName}
                    </h2>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {currentProj.concept.tagline}
                    </p>
                  </>
                )}
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 shrink-0">
                {currentProj.concept.suggestedIndustry}
              </div>
            </div>

            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                One-Line Pitch
              </span>
              {isEditingConcept ? (
                <textarea
                  rows={2}
                  value={editedConcept?.oneLinePitch || ''}
                  onChange={(e) =>
                    setEditedConcept((c) => (c ? { ...c, oneLinePitch: e.target.value } : null))
                  }
                  className="w-full text-base font-medium px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                />
              ) : (
                <p className="text-base sm:text-lg font-medium text-neutral-800 dark:text-neutral-100 leading-relaxed">
                  "{currentProj.concept.oneLinePitch}"
                </p>
              )}
            </div>
          </div>

          {/* Problem vs Solution Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  The Problem & Friction
                </h3>
              </div>
              {isEditingConcept ? (
                <textarea
                  rows={4}
                  value={editedConcept?.problem || ''}
                  onChange={(e) =>
                    setEditedConcept((c) => (c ? { ...c, problem: e.target.value } : null))
                  }
                  className="w-full text-xs p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 leading-relaxed"
                />
              ) : (
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {currentProj.concept.problem}
                </p>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  The Breakthrough Solution
                </h3>
              </div>
              {isEditingConcept ? (
                <textarea
                  rows={4}
                  value={editedConcept?.solution || ''}
                  onChange={(e) =>
                    setEditedConcept((c) => (c ? { ...c, solution: e.target.value } : null))
                  }
                  className="w-full text-xs p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 leading-relaxed"
                />
              ) : (
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {currentProj.concept.solution}
                </p>
              )}
            </div>
          </div>

          {/* Value Prop & Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Value Prop */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Value Proposition
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                {currentProj.concept.valueProposition}
              </p>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Target Customer Archetypes
                </span>
                <ul className="space-y-1.5">
                  {currentProj.concept.targetCustomers.map((tc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{tc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Product Capabilities */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Core Product Capabilities
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentProj.concept.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60 text-xs text-neutral-800 dark:text-neutral-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Moat & Opportunity Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Competitive Advantage & Moat
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {currentProj.concept.competitiveAdvantage}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Monetization & Revenue Opportunity
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {currentProj.concept.revenueOpportunity}
              </p>
            </div>
          </div>

          {/* Next Step CTA */}
          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Concept complete! Ready for Brand Identity?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Generate palettes, logos, typography, brand voice, and origin stories.
              </p>
            </div>

            <button
              id="next-branding-cta-btn"
              onClick={() => navigate(`/project/${currentProj.id}/branding`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-102 transition-all shrink-0"
            >
              <span>Next: Brand Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Refine Modal */}
      <RefineAiModal
        isOpen={refineModalOpen}
        onClose={() => setRefineModalOpen(false)}
        sectionName="concept"
        onRefine={async (prompt) => {
          await refineSectionData(currentProj.id, 'concept', prompt);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
};
