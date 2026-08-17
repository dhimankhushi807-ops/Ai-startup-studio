import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Palette,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Wand2,
  Type,
  Shield,
  BookOpen,
  Eye,
  RefreshCw,
  Compass,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { RefineAiModal } from '../components/common/RefineAiModal';

export const BrandingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    activeProject,
    generateBranding,
    refineSectionData,
    isGenerating,
    exportPdf,
  } = useStartup();

  const currentProj = projects.find((p) => p.id === id) || activeProject;
  const [refineModalOpen, setRefineModalOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

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
    await generateBranding(currentProj.id);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const branding = currentProj.branding;

  return (
    <div id="branding-generator-page" className="space-y-8 max-w-5xl mx-auto">
      <SectionHeader
        badge="Phase 2: Brand Identity"
        title="Brand Identity, Palette & Design System"
        description="Craft a high-converting brand system with harmonious color palettes, typography pairings, and origin stories."
        onRegenerate={branding ? handleGenerate : undefined}
        onRefine={branding ? () => setRefineModalOpen(true) : undefined}
        onCopy={
          branding
            ? () => navigator.clipboard.writeText(JSON.stringify(branding, null, 2))
            : undefined
        }
        onExportPdf={() => exportPdf(currentProj.id)}
        isGenerating={isGenerating}
      />

      {/* If no branding yet and not generating */}
      {!branding && !isGenerating && (
        <EmptyState
          icon={Palette}
          title="No Brand Identity Generated Yet"
          description={
            currentProj.concept
              ? `Ready to build the complete brand identity and design system for ${currentProj.concept.startupName}.`
              : 'Generate your startup idea concept first or build the brand identity directly.'
          }
          actionLabel="Generate Brand Identity"
          onAction={handleGenerate}
          secondaryActionLabel="Return to Idea Concept"
          onSecondaryAction={() => navigate(`/project/${currentProj.id}/idea`)}
        />
      )}

      {/* Loading State */}
      {isGenerating && (
        <LoadingState
          message="Synthesizing Brand Personality & Color Systems..."
          subtext="Generating harmonized Hex/RGB palettes, typography pairings, mission statements, and brand stories."
        />
      )}

      {/* Branding Content */}
      {branding && !isGenerating && (
        <div id="brand-identity-content" className="space-y-8 animate-in fade-in duration-300">
          {/* Brand Banner with Logo Preview */}
          <div className="p-8 rounded-3xl bg-neutral-900 text-white shadow-xl relative overflow-hidden">
            <div
              className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: branding.colors.primary.hex }}
            />
            <div
              className="absolute -left-12 -top-12 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: branding.colors.accent.hex }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Generated Geometric Logo Mark */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg text-2xl font-bold font-display shrink-0"
                  style={{
                    backgroundColor: branding.colors.primary.hex,
                    boxShadow: `0 10px 25px -5px ${branding.colors.primary.hex}50`,
                  }}
                >
                  {branding.brandName.slice(0, 1)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
                      {branding.brandName}
                    </h2>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-white/80">
                      Brand Core
                    </span>
                  </div>
                  <p className="text-sm text-neutral-300 font-medium mt-1">
                    "{branding.tagline}"
                  </p>
                </div>
              </div>

              {/* Personality Pills */}
              <div className="flex flex-wrap gap-1.5 max-w-sm">
                {branding.brandPersonality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/10"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Color Palette Grid */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-500" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                  Color Harmony Palette
                </h3>
              </div>
              <span className="text-xs text-neutral-400">Click swatch to copy HEX</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Primary Brand', color: branding.colors.primary },
                { label: 'Secondary Complement', color: branding.colors.secondary },
                { label: 'High-Impact Accent', color: branding.colors.accent },
                { label: 'Neutral Canvas', color: branding.colors.neutral },
              ].map((swatch, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopyHex(swatch.color.hex)}
                  id={`color-swatch-${idx}`}
                  className="group cursor-pointer p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 hover:scale-102 transition-all"
                >
                  {/* Swatch preview */}
                  <div
                    className="w-full h-20 rounded-xl shadow-inner mb-3 transition-transform group-hover:scale-101 relative flex items-center justify-center"
                    style={{ backgroundColor: swatch.color.hex }}
                  >
                    {copiedHex === swatch.color.hex && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm animate-in zoom-in-90">
                        Copied!
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    {swatch.label}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                    {swatch.color.name}
                  </h4>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
                    <span>{swatch.color.hex}</span>
                    <Copy className="w-3 h-3 text-neutral-400 group-hover:text-indigo-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Pairings */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-500" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                Typography Pairing & Scale
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/60 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Primary Display Font
                </span>
                <h4 className="text-xl font-bold font-display text-neutral-900 dark:text-white">
                  {branding.typography.headingFont}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Headings, hero titles, and branding display accents.
                </p>
                <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-700/60 font-display text-lg text-neutral-800 dark:text-neutral-200">
                  The quick brown fox jumps over the lazy dog. 1234567890
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/60 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Body & System Font
                </span>
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {branding.typography.bodyFont}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Interface body copy, tables, forms, and product descriptions.
                </p>
                <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-700/60 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Clear, highly legible typographic rendering engineered for high data density and effortless user scanning.
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision & Brand Story */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Mission Statement
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                "{branding.mission}"
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Long-Term Vision
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                "{branding.vision}"
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Brand Origin Story
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {branding.brandStory}
              </p>
            </div>
          </div>

          {/* Next Step CTA */}
          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Brand System Configured! Next: Market Intelligence
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Analyze TAM/SAM/SOM sizing, direct competitors, SWOT matrix, and positioning.
              </p>
            </div>

            <button
              id="next-market-research-cta-btn"
              onClick={() => navigate(`/project/${currentProj.id}/market-research`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-102 transition-all shrink-0"
            >
              <span>Next: Market Research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Refine AI Modal */}
      <RefineAiModal
        isOpen={refineModalOpen}
        onClose={() => setRefineModalOpen(false)}
        sectionName="branding"
        onRefine={async (prompt) => {
          await refineSectionData(currentProj.id, 'branding', prompt);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
};
