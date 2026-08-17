import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  id?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id = 'empty-state-view',
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40 my-6"
    >
      <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5 font-display">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <button
            id={`${id}-primary-action-btn`}
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{actionLabel}</span>
          </button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <button
            id={`${id}-secondary-action-btn`}
            onClick={onSecondaryAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all"
          >
            <span>{secondaryActionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
