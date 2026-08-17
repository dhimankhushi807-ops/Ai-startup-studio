import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Generating with Gemini AI...',
  subtext = 'Synthesizing structured venture insights, market data, and strategic blueprints.',
}) => {
  return (
    <div
      id="ai-loading-container"
      className="flex flex-col items-center justify-center p-12 text-center my-8 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 backdrop-blur-sm"
    >
      <div className="relative mb-5">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 animate-pulse">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-1 shadow">
          <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
        </div>
      </div>

      <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5 font-display">
        {message}
      </h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
        {subtext}
      </p>

      {/* Pulsing indicator dots */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};
