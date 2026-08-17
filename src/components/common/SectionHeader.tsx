import React, { useState } from 'react';
import { Sparkles, Copy, Check, Wand2, Download } from 'lucide-react';

interface SectionHeaderProps {
  id?: string;
  badge?: string;
  title: string;
  description?: string;
  onRegenerate?: () => void;
  onRefine?: () => void;
  onCopy?: () => void;
  onExportPdf?: () => void;
  isGenerating?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id = 'section-header',
  badge,
  title,
  description,
  onRegenerate,
  onRefine,
  onCopy,
  onExportPdf,
  isGenerating = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id={id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-8">
      <div>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-2">
            <Sparkles className="w-3 h-3" />
            {badge}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-display">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {onRefine && (
          <button
            id={`${id}-refine-btn`}
            onClick={onRefine}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all disabled:opacity-50"
            title="Refine with specific AI prompt"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Refine AI</span>
          </button>
        )}

        {onCopy && (
          <button
            id={`${id}-copy-btn`}
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all"
            title="Copy section data"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}

        {onExportPdf && (
          <button
            id={`${id}-pdf-btn`}
            onClick={onExportPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all"
            title="Export full PDF report"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>PDF</span>
          </button>
        )}

        {onRegenerate && (
          <button
            id={`${id}-regenerate-btn`}
            onClick={onRegenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Generating...' : 'Regenerate'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
