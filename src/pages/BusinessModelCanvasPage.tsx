import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Save,
  Users,
  Layers,
  Share2,
  Handshake,
  DollarSign,
  Briefcase,
  HeartHandshake,
  Radio,
  Building,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { RefineAiModal } from '../components/common/RefineAiModal';
import { BusinessModelCanvasData } from '../types';

export const BusinessModelCanvasPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    activeProject,
    generateBusinessModel,
    refineSectionData,
    updateProject,
    isGenerating,
    exportPdf,
  } = useStartup();

  const currentProj = projects.find((p) => p.id === id) || activeProject;
  const [refineModalOpen, setRefineModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCanvas, setEditedCanvas] = useState<BusinessModelCanvasData | null>(null);

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

  const canvas = currentProj.businessModelCanvas;

  const handleGenerate = async () => {
    await generateBusinessModel(currentProj.id);
  };

  const startEditing = () => {
    if (canvas) {
      setEditedCanvas(JSON.parse(JSON.stringify(canvas)));
      setIsEditing(true);
    }
  };

  const handleSaveEdits = () => {
    if (!editedCanvas) return;
    updateProject({
      ...currentProj,
      businessModelCanvas: editedCanvas,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const addItemToBlock = (blockKey: keyof BusinessModelCanvasData) => {
    if (!editedCanvas) return;
    const currentList = editedCanvas[blockKey] || [];
    setEditedCanvas({
      ...editedCanvas,
      [blockKey]: [...currentList, 'New item description...'],
    });
  };

  const removeItemFromBlock = (blockKey: keyof BusinessModelCanvasData, index: number) => {
    if (!editedCanvas) return;
    const currentList = [...(editedCanvas[blockKey] || [])];
    currentList.splice(index, 1);
    setEditedCanvas({
      ...editedCanvas,
      [blockKey]: currentList,
    });
  };

  const updateItemText = (
    blockKey: keyof BusinessModelCanvasData,
    index: number,
    text: string
  ) => {
    if (!editedCanvas) return;
    const currentList = [...(editedCanvas[blockKey] || [])];
    currentList[index] = text;
    setEditedCanvas({
      ...editedCanvas,
      [blockKey]: currentList,
    });
  };

  const renderBlock = (
    title: string,
    blockKey: keyof BusinessModelCanvasData,
    icon: React.ElementType,
    items: string[],
    className = ''
  ) => {
    const Icon = icon;
    const activeItems = isEditing && editedCanvas ? editedCanvas[blockKey] : items;

    return (
      <div
        className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between ${className}`}
      >
        <div>
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-indigo-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-display">
                {title}
              </h4>
            </div>

            {isEditing && (
              <button
                onClick={() => addItemToBlock(blockKey)}
                className="p-1 rounded-md text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                title="Add item"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {activeItems.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/50 text-xs text-neutral-800 dark:text-neutral-200 flex items-start justify-between gap-2 group"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItemText(blockKey, idx, e.target.value)}
                    className="w-full bg-white dark:bg-neutral-800 px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                  />
                ) : (
                  <span className="leading-snug">{item}</span>
                )}

                {isEditing && (
                  <button
                    onClick={() => removeItemFromBlock(blockKey, idx)}
                    className="text-neutral-400 hover:text-red-500 p-1 shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="business-model-canvas-page" className="space-y-8 max-w-6xl mx-auto">
      <SectionHeader
        badge="Phase 4: Business Architecture"
        title="Interactive Business Model Canvas"
        description="The classic 9-block Osterwalder canvas mapping value propositions, customer segments, channels, and unit economics."
        onRegenerate={canvas ? handleGenerate : undefined}
        onRefine={canvas ? () => setRefineModalOpen(true) : undefined}
        onCopy={
          canvas
            ? () => navigator.clipboard.writeText(JSON.stringify(canvas, null, 2))
            : undefined
        }
        onExportPdf={() => exportPdf(currentProj.id)}
        isGenerating={isGenerating}
      />

      {/* Empty State */}
      {!canvas && !isGenerating && (
        <EmptyState
          icon={LayoutGrid}
          title="No Business Model Canvas Generated Yet"
          description={
            currentProj.concept
              ? `Ready to generate the 9-block Business Model Canvas for ${currentProj.concept.startupName}.`
              : 'Generate your startup idea concept first to build the business canvas.'
          }
          actionLabel="Generate Business Model Canvas"
          onAction={handleGenerate}
          secondaryActionLabel="Return to Concept"
          onSecondaryAction={() => navigate(`/project/${currentProj.id}/idea`)}
        />
      )}

      {/* Loading State */}
      {isGenerating && (
        <LoadingState
          message="Formulating 9-Block Business Model Canvas..."
          subtext="Mapping key partners, cost drivers, revenue mechanics, customer segments, and delivery channels."
        />
      )}

      {/* Canvas Display */}
      {canvas && !isGenerating && (
        <div id="business-model-canvas-grid" className="space-y-6 animate-in fade-in duration-300">
          {/* Edit / Save Toolbar */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Interactive 9-block strategic matrix
            </span>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <button
                  id="save-canvas-edits-btn"
                  onClick={handleSaveEdits}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  id="edit-canvas-btn"
                  onClick={startEditing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <span>Edit Canvas Blocks</span>
                </button>
              )}
            </div>
          </div>

          {/* 9-Block Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* 1. Key Partners (Left Column, Row 1-2) */}
            <div className="md:col-span-1">
              {renderBlock(
                'Key Partners',
                'keyPartners',
                Handshake,
                canvas.keyPartners,
                'h-full'
              )}
            </div>

            {/* 2 & 6. Key Activities & Key Resources (Column 2) */}
            <div className="md:col-span-1 space-y-4">
              {renderBlock(
                'Key Activities',
                'keyActivities',
                Briefcase,
                canvas.keyActivities
              )}
              {renderBlock(
                'Key Resources',
                'keyResources',
                Building,
                canvas.keyResources
              )}
            </div>

            {/* 3. Value Propositions (Center Column, Row 1-2) */}
            <div className="md:col-span-1">
              {renderBlock(
                'Value Propositions',
                'valuePropositions',
                Layers,
                canvas.valuePropositions,
                'h-full border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/20 dark:bg-indigo-950/10'
              )}
            </div>

            {/* 4 & 7. Customer Relationships & Channels (Column 4) */}
            <div className="md:col-span-1 space-y-4">
              {renderBlock(
                'Relationships',
                'customerRelationships',
                HeartHandshake,
                canvas.customerRelationships
              )}
              {renderBlock(
                'Channels',
                'channels',
                Radio,
                canvas.channels
              )}
            </div>

            {/* 5. Customer Segments (Right Column, Row 1-2) */}
            <div className="md:col-span-1">
              {renderBlock(
                'Customer Segments',
                'customerSegments',
                Users,
                canvas.customerSegments,
                'h-full'
              )}
            </div>
          </div>

          {/* Bottom Row: Cost Structure & Revenue Streams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderBlock(
              'Cost Structure (Key Drivers)',
              'costStructure',
              DollarSign,
              canvas.costStructure,
              'bg-red-50/20 dark:bg-red-950/10 border-red-200/50 dark:border-red-900/40'
            )}

            {renderBlock(
              'Revenue Streams (Monetization)',
              'revenueStreams',
              DollarSign,
              canvas.revenueStreams,
              'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/40'
            )}
          </div>

          {/* Next Step CTA */}
          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Business Canvas Ready! Next: Launch Roadmap
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Generate action steps for Pre-Launch validation, Product Launch blitz, and Post-Launch growth.
              </p>
            </div>

            <button
              id="next-launch-cta-btn"
              onClick={() => navigate(`/project/${currentProj.id}/launch`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-102 transition-all shrink-0"
            >
              <span>Next: Launch Planner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Refine Modal */}
      <RefineAiModal
        isOpen={refineModalOpen}
        onClose={() => setRefineModalOpen(false)}
        sectionName="businessModelCanvas"
        onRefine={async (prompt) => {
          await refineSectionData(currentProj.id, 'businessModelCanvas', prompt);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
};
