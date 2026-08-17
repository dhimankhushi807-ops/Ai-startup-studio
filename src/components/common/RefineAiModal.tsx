import React, { useState } from 'react';
import { X, Wand2, Sparkles } from 'lucide-react';

interface RefineAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  onRefine: (prompt: string) => Promise<void>;
  isGenerating?: boolean;
}

export const RefineAiModal: React.FC<RefineAiModalProps> = ({
  isOpen,
  onClose,
  sectionName,
  onRefine,
  isGenerating = false,
}) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    await onRefine(prompt.trim());
    setPrompt('');
    onClose();
  };

  const samplePrompts = [
    `Make the ${sectionName} more focused on enterprise B2B customers`,
    `Highlight defensible technology and high barriers to entry`,
    `Adjust the pricing model to value-based consumption metrics`,
    `Tone down buzzwords and make the phrasing more concrete and concise`,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        id="refine-ai-modal"
        className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 relative"
      >
        <button
          id="close-refine-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Refine {sectionName} with AI
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Provide specific strategic guidance or adjustments
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              id="refine-prompt-input"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`e.g., Focus more on healthcare compliance, emphasize privacy, adjust the SWOT threats...`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>

          <div>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(sp)}
                  className="text-xs text-left px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 transition-colors"
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Applying AI...' : 'Apply Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
