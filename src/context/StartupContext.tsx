import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  StartupProject,
  StartupConcept,
  BrandingData,
  MarketResearchData,
  BusinessModelCanvasData,
  LaunchPlanData,
  ThemeMode,
  IdeaInput,
} from '../types';
import { storageService, calculateCompletion } from '../services/storageService';
import * as geminiService from '../services/geminiService';
import { exportStartupToPdf } from '../services/pdfService';
import confetti from 'canvas-confetti';

interface StartupContextType {
  projects: StartupProject[];
  activeProject: StartupProject | null;
  theme: ThemeMode;
  isOnline: boolean;
  aiConfigured: boolean;
  favoritePrompts: string[];
  isGenerating: boolean;
  generatingPhase: string | null;
  error: string | null;
  notification: { message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;

  // Actions
  selectProject: (id: string) => void;
  createNewProject: (initialData?: Partial<IdeaInput>) => StartupProject;
  updateProject: (updated: StartupProject) => void;
  deleteProject: (id: string) => void;
  toggleFavoriteProject: (id: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleFavoritePrompt: (promptId: string) => void;
  clearError: () => void;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // AI Generation workflows
  generateConcept: (projectId: string, input: IdeaInput) => Promise<boolean>;
  generateBranding: (projectId: string) => Promise<boolean>;
  generateMarketResearch: (projectId: string) => Promise<boolean>;
  generateBusinessModel: (projectId: string) => Promise<boolean>;
  generateLaunchPlan: (projectId: string) => Promise<boolean>;
  generateEntireStartupPlan: (projectId: string, input: IdeaInput) => Promise<boolean>;
  refineSectionData: (projectId: string, sectionName: string, prompt: string) => Promise<boolean>;

  // Export & Utilities
  exportPdf: (projectId?: string) => void;
  exportDatabaseBackup: () => string;
  importDatabaseBackup: (json: string) => { success: boolean; count: number; error?: string };
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export const StartupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<StartupProject[]>(() => storageService.getProjects());
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    const saved = storageService.getActiveProjectId();
    if (saved && storageService.getProjectById(saved)) return saved;
    return storageService.getProjects()[0]?.id || null;
  });
  const [theme, setThemeState] = useState<ThemeMode>(() => storageService.getTheme());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [aiConfigured, setAiConfigured] = useState<boolean>(true);
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>(() => storageService.getFavoritePrompts());
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatingPhase, setGeneratingPhase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  } | null>(null);

  // Sync active project
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || null;

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Health check on startup
    geminiService.checkAiHealth().then((res) => {
      setAiConfigured(res.aiConfigured);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme application
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Notifications helper
  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    storageService.setTheme(mode);
  }, []);

  const selectProject = useCallback((id: string) => {
    setActiveProjectId(id);
    storageService.setActiveProjectId(id);
  }, []);

  const updateProject = useCallback((updated: StartupProject) => {
    storageService.saveProject(updated);
    setProjects(storageService.getProjects());
  }, []);

  const deleteProject = useCallback((id: string) => {
    const remaining = storageService.deleteProject(id);
    setProjects(remaining);
    if (remaining.length > 0) {
      setActiveProjectId(remaining[0].id);
    } else {
      setActiveProjectId(null);
    }
    showNotification('Project deleted successfully', 'info');
  }, [showNotification]);

  const toggleFavoriteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
      storageService.saveProjects(updated);
      return updated;
    });
  }, []);

  const toggleFavoritePrompt = useCallback((promptId: string) => {
    const updated = storageService.toggleFavoritePrompt(promptId);
    setFavoritePrompts(updated);
  }, []);

  const createNewProject = useCallback((initialData?: Partial<IdeaInput>): StartupProject => {
    const newId = `proj-${Date.now()}`;
    const newProject: StartupProject = {
      id: newId,
      name: initialData?.rawIdea ? initialData.rawIdea.slice(0, 24) : 'Untitled Startup',
      industry: initialData?.industry || 'Technology',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completionPercentage: 0,
      currentStep: 'idea',
      ideaInput: {
        rawIdea: initialData?.rawIdea || '',
        industry: initialData?.industry || '',
        targetAudience: initialData?.targetAudience || '',
        locationMarket: initialData?.locationMarket || 'Global',
        businessType: initialData?.businessType || 'B2B SaaS',
        context: initialData?.context || '',
      },
    };

    storageService.saveProject(newProject);
    setProjects(storageService.getProjects());
    setActiveProjectId(newId);
    return newProject;
  }, []);

  // --- AI GENERATION WORKFLOWS ---

  const generateConcept = useCallback(
    async (projectId: string, input: IdeaInput): Promise<boolean> => {
      setIsGenerating(true);
      setGeneratingPhase('Generating startup concept & value proposition...');
      setError(null);

      try {
        const res = await geminiService.generateStartupIdea(input);
        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        if (!targetProj) throw new Error('Project not found');

        const updated: StartupProject = {
          ...targetProj,
          name: res.data.startupName || targetProj.name,
          industry: res.data.suggestedIndustry || input.industry || targetProj.industry,
          ideaInput: input,
          concept: res.data,
          currentStep: 'branding',
          updatedAt: new Date().toISOString(),
        };

        updated.completionPercentage = calculateCompletion(updated);
        updateProject(updated);

        showNotification(
          res.isAiGenerated
            ? `Startup concept generated for ${res.data.startupName}!`
            : `Startup concept drafted! (AI fallback mode)`,
          'success'
        );
        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to generate concept');
        showNotification('Concept generation error', 'error');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  const generateBranding = useCallback(
    async (projectId: string): Promise<boolean> => {
      setIsGenerating(true);
      setGeneratingPhase('Crafting brand identity, palette & typography...');
      setError(null);

      try {
        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        if (!targetProj || !targetProj.concept) {
          throw new Error('Please generate or provide a startup concept first.');
        }

        const res = await geminiService.generateBranding(targetProj.concept, targetProj.ideaInput);
        const updated: StartupProject = {
          ...targetProj,
          branding: res.data,
          currentStep: 'research',
          updatedAt: new Date().toISOString(),
        };

        updated.completionPercentage = calculateCompletion(updated);
        updateProject(updated);

        showNotification(
          res.isAiGenerated
            ? `Branding system built for ${res.data.brandName}!`
            : `Branding system generated!`,
          'success'
        );
        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to generate branding');
        showNotification('Branding generation error', 'error');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  const generateMarketResearch = useCallback(
    async (projectId: string): Promise<boolean> => {
      setIsGenerating(true);
      setGeneratingPhase('Conducting market intelligence & SWOT analysis...');
      setError(null);

      try {
        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        if (!targetProj || !targetProj.concept) {
          throw new Error('Please generate a startup concept first.');
        }

        const res = await geminiService.generateMarketResearch(targetProj.concept, targetProj.ideaInput);
        const updated: StartupProject = {
          ...targetProj,
          marketResearch: res.data,
          currentStep: 'canvas',
          updatedAt: new Date().toISOString(),
        };

        updated.completionPercentage = calculateCompletion(updated);
        updateProject(updated);

        showNotification(
          res.isAiGenerated
            ? `Market research insights ready!`
            : `Market research drafted!`,
          'success'
        );
        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to generate market research');
        showNotification('Market research generation error', 'error');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  const generateBusinessModel = useCallback(
    async (projectId: string): Promise<boolean> => {
      setIsGenerating(true);
      setGeneratingPhase('Structuring 9-block Business Model Canvas...');
      setError(null);

      try {
        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        if (!targetProj || !targetProj.concept) {
          throw new Error('Please generate a startup concept first.');
        }

        const res = await geminiService.generateBusinessModel(targetProj.concept, targetProj.marketResearch);
        const updated: StartupProject = {
          ...targetProj,
          businessModelCanvas: res.data,
          currentStep: 'launch',
          updatedAt: new Date().toISOString(),
        };

        updated.completionPercentage = calculateCompletion(updated);
        updateProject(updated);

        showNotification('Business Model Canvas generated!', 'success');
        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to generate business model canvas');
        showNotification('Business model generation error', 'error');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  const generateLaunchPlan = useCallback(
    async (projectId: string): Promise<boolean> => {
      setIsGenerating(true);
      setGeneratingPhase('Synthesizing Go-To-Market roadmap & launch tasks...');
      setError(null);

      try {
        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        if (!targetProj || !targetProj.concept) {
          throw new Error('Please generate a startup concept first.');
        }

        const res = await geminiService.generateLaunchPlan(targetProj.concept, targetProj.businessModelCanvas);
        const updated: StartupProject = {
          ...targetProj,
          launchPlan: res.data,
          currentStep: 'presentation',
          updatedAt: new Date().toISOString(),
        };

        updated.completionPercentage = calculateCompletion(updated);
        updateProject(updated);

        // Celebration confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }

        showNotification('Full Launch Roadmap synthesized!', 'success');
        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to generate launch plan');
        showNotification('Launch plan generation error', 'error');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  // Full End-to-End Generation
  const generateEntireStartupPlan = useCallback(
    async (projectId: string, input: IdeaInput): Promise<boolean> => {
      setIsGenerating(true);
      setError(null);

      try {
        setGeneratingPhase('Phase 1/5: Generating Startup Concept...');
        const conceptRes = await geminiService.generateStartupIdea(input);

        setGeneratingPhase('Phase 2/5: Designing Brand Identity & Palette...');
        const brandRes = await geminiService.generateBranding(conceptRes.data, input);

        setGeneratingPhase('Phase 3/5: Conducting Market Intelligence & Sizing...');
        const researchRes = await geminiService.generateMarketResearch(conceptRes.data, input);

        setGeneratingPhase('Phase 4/5: Building 9-Block Business Model Canvas...');
        const canvasRes = await geminiService.generateBusinessModel(conceptRes.data, researchRes.data);

        setGeneratingPhase('Phase 5/5: Orchestrating Go-To-Market Launch Roadmap...');
        const launchRes = await geminiService.generateLaunchPlan(conceptRes.data, canvasRes.data);

        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        const updated: StartupProject = {
          id: projectId,
          name: conceptRes.data.startupName || targetProj?.name || 'New Venture',
          industry: conceptRes.data.suggestedIndustry || input.industry,
          createdAt: targetProj?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completionPercentage: 100,
          currentStep: 'presentation',
          ideaInput: input,
          concept: conceptRes.data,
          branding: brandRes.data,
          marketResearch: researchRes.data,
          businessModelCanvas: canvasRes.data,
          launchPlan: launchRes.data,
          isFavorite: targetProj?.isFavorite || false,
        };

        updateProject(updated);

        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {
          // ignore
        }

        showNotification(`Full venture plan created for ${updated.name}!`, 'success');
        return true;
      } catch (err: any) {
        setError(err.message || 'End-to-end generation encountered an issue');
        showNotification('Generation error occurred', 'error');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  const refineSectionData = useCallback(
    async (projectId: string, sectionName: string, prompt: string): Promise<boolean> => {
      setIsGenerating(true);
      setGeneratingPhase(`Refining ${sectionName} with AI feedback...`);
      setError(null);

      try {
        const targetProj = projects.find((p) => p.id === projectId) || activeProject;
        if (!targetProj) throw new Error('Project not found');

        let currentSectionData: any = null;
        if (sectionName === 'concept') currentSectionData = targetProj.concept;
        else if (sectionName === 'branding') currentSectionData = targetProj.branding;
        else if (sectionName === 'marketResearch') currentSectionData = targetProj.marketResearch;
        else if (sectionName === 'businessModelCanvas') currentSectionData = targetProj.businessModelCanvas;
        else if (sectionName === 'launchPlan') currentSectionData = targetProj.launchPlan;

        const res = await geminiService.refineSection(sectionName, prompt, currentSectionData);

        const updated: StartupProject = {
          ...targetProj,
          [sectionName]: res.data,
          updatedAt: new Date().toISOString(),
        };

        updateProject(updated);
        showNotification(`${sectionName} updated successfully!`, 'success');
        return true;
      } catch (err: any) {
        setError(err.message || 'Failed to refine section');
        return false;
      } finally {
        setIsGenerating(false);
        setGeneratingPhase(null);
      }
    },
    [projects, activeProject, updateProject, showNotification]
  );

  const exportPdf = useCallback(
    (projectId?: string) => {
      const targetProj = projectId ? projects.find((p) => p.id === projectId) : activeProject;
      if (!targetProj) {
        showNotification('No project selected to export', 'warning');
        return;
      }
      try {
        exportStartupToPdf(targetProj);
        showNotification('PDF exported successfully!', 'success');
      } catch (err: any) {
        console.error('PDF export error:', err);
        showNotification('Failed to generate PDF', 'error');
      }
    },
    [projects, activeProject, showNotification]
  );

  const exportDatabaseBackup = useCallback(() => {
    return storageService.exportAllData();
  }, []);

  const importDatabaseBackup = useCallback(
    (json: string) => {
      const res = storageService.importData(json);
      if (res.success) {
        setProjects(storageService.getProjects());
        setFavoritePrompts(storageService.getFavoritePrompts());
        showNotification(`Restored ${res.count} projects from backup!`, 'success');
      } else {
        showNotification(res.error || 'Import failed', 'error');
      }
      return res;
    },
    [showNotification]
  );

  const value = {
    projects,
    activeProject,
    theme,
    isOnline,
    aiConfigured,
    favoritePrompts,
    isGenerating,
    generatingPhase,
    error,
    notification,
    selectProject,
    createNewProject,
    updateProject,
    deleteProject,
    toggleFavoriteProject,
    setThemeMode,
    toggleFavoritePrompt,
    clearError,
    showNotification,
    generateConcept,
    generateBranding,
    generateMarketResearch,
    generateBusinessModel,
    generateLaunchPlan,
    generateEntireStartupPlan,
    refineSectionData,
    exportPdf,
    exportDatabaseBackup,
    importDatabaseBackup,
  };

  return <StartupContext.Provider value={value}>{children}</StartupContext.Provider>;
};

export const useStartup = (): StartupContextType => {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error('useStartup must be used within a StartupProvider');
  }
  return context;
};
