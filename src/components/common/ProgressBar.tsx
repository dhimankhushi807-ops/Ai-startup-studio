import React from 'react';
import { Lightbulb, Palette, LineChart, LayoutGrid, Rocket, Presentation } from 'lucide-react';
import { StepId } from '../../types';

interface ProgressBarProps {
  currentStep: StepId;
  completionPercentage: number;
  onStepClick?: (step: StepId) => void;
  className?: string;
}

const STEPS: { id: StepId; label: string; icon: React.ElementType }[] = [
  { id: 'idea', label: '1. Concept', icon: Lightbulb },
  { id: 'branding', label: '2. Branding', icon: Palette },
  { id: 'research', label: '3. Market', icon: LineChart },
  { id: 'canvas', label: '4. Canvas', icon: LayoutGrid },
  { id: 'launch', label: '5. Launch', icon: Rocket },
  { id: 'presentation', label: '6. Deck', icon: Presentation },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  completionPercentage,
  onStepClick,
  className = '',
}) => {
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div id="startup-progress-bar" className={`w-full ${className}`}>
      {/* Top percentage line */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Venture Blueprint Progress
        </span>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
          {completionPercentage}% Complete
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(5, completionPercentage)}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = idx < stepIndex || completionPercentage === 100;

          return (
            <button
              key={step.id}
              id={`progress-step-btn-${step.id}`}
              onClick={() => onStepClick && onStepClick(step.id)}
              disabled={!onStepClick}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                  : isCompleted
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
