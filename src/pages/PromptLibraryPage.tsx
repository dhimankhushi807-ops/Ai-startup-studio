import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Star,
  Copy,
  Check,
  ArrowRight,
  Lightbulb,
  Palette,
  LineChart,
  LayoutGrid,
  Rocket,
  Presentation,
  Users,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { PROMPT_LIBRARY } from '../data/promptLibrary';
import { SectionHeader } from '../components/common/SectionHeader';
import { PromptTemplate } from '../types';

export const PromptLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeProject,
    favoritePrompts,
    toggleFavoritePrompt,
    showNotification,
  } = useStartup();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const categories: { label: string; value: string; icon?: React.ElementType }[] = [
    { label: 'All Prompts', value: 'all' },
    { label: 'Idea & Validation', value: 'idea', icon: Lightbulb },
    { label: 'Branding & Naming', value: 'branding', icon: Palette },
    { label: 'Market Research', value: 'research', icon: LineChart },
    { label: 'Business Model', value: 'canvas', icon: LayoutGrid },
    { label: 'Launch & GTM', value: 'launch', icon: Rocket },
    { label: 'Pitch & Investors', value: 'pitch', icon: Presentation },
    { label: 'ICP & Personas', value: 'persona', icon: Users },
  ];

  const filteredPrompts = useMemo(() => {
    return PROMPT_LIBRARY.filter((item: PromptTemplate) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.variables.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (id: string, text: string) => {
    let processedText = text;
    if (activeProject) {
      processedText = processedText
        .replace(/\[STARTUP_NAME\]|\[startup name\]/gi, activeProject.concept?.startupName || activeProject.name)
        .replace(/\[INDUSTRY\]|\[industry\]/gi, activeProject.industry)
        .replace(/\[TARGET_AUDIENCE\]|\[target audience\]/gi, activeProject.ideaInput.targetAudience || 'our target market');
    }

    navigator.clipboard.writeText(processedText);
    setCopiedPromptId(id);
    showNotification('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleApplyToProject = (promptText: string, category: string) => {
    if (!activeProject) {
      navigate('/');
      return;
    }
    // Navigate to respective project section based on category
    if (category === 'branding') {
      navigate(`/project/${activeProject.id}/branding`);
    } else if (category === 'research' || category === 'persona') {
      navigate(`/project/${activeProject.id}/market-research`);
    } else if (category === 'canvas') {
      navigate(`/project/${activeProject.id}/canvas`);
    } else if (category === 'launch') {
      navigate(`/project/${activeProject.id}/launch`);
    } else if (category === 'pitch') {
      navigate(`/project/${activeProject.id}/presentation`);
    } else {
      navigate(`/project/${activeProject.id}/idea`);
    }
  };

  return (
    <div id="prompt-library-page" className="space-y-8 max-w-6xl mx-auto">
      <SectionHeader
        badge="Curated Intelligence"
        title="Venture Prompt Library"
        description="20+ battle-tested prompts crafted for deep venture reasoning, product-market fit validation, and investor pitch decks."
      />

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="prompt-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts by keyword or variable..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((item) => {
          const isFav = favoritePrompts.includes(item.id);
          const isCopied = copiedPromptId === item.id;

          return (
            <div
              key={item.id}
              id={`prompt-card-${item.id}`}
              className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-600 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/40 truncate">
                    {item.category}
                  </span>

                  <button
                    onClick={() => toggleFavoritePrompt(item.id)}
                    className={`p-1 rounded-lg text-xs transition-colors ${
                      isFav
                        ? 'text-amber-500'
                        : 'text-neutral-400 hover:text-amber-500'
                    }`}
                    title="Favorite prompt"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display mb-1">
                  {item.title}
                </h4>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Prompt Text Box */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 text-xs font-mono text-neutral-800 dark:text-neutral-200 leading-relaxed max-h-32 overflow-y-auto">
                  {item.prompt}
                </div>
              </div>

              <div>
                {/* Variables */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.variables.map((v, vIdx) => (
                    <span
                      key={vIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60"
                    >
                      [{v}]
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleCopy(item.id, item.prompt)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleApplyToProject(item.prompt, item.category)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Use Prompt</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
