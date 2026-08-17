import { StartupProject, ThemeMode } from '../types';
import { SAMPLE_PROJECTS } from '../data/sampleProjects';

const STORAGE_KEYS = {
  PROJECTS: 'ai_startup_studio_projects_v1',
  ACTIVE_PROJECT_ID: 'ai_startup_studio_active_id_v1',
  THEME: 'ai_startup_studio_theme_v1',
  FAVORITE_PROMPTS: 'ai_startup_studio_fav_prompts_v1',
  SETTINGS: 'ai_startup_studio_settings_v1',
};

export const storageService = {
  // Load all projects
  getProjects(): StartupProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        // Initialize with rich sample projects
        this.saveProjects(SAMPLE_PROJECTS);
        return SAMPLE_PROJECTS;
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_PROJECTS;
    } catch (e) {
      console.warn('Failed to read from localStorage, using sample data:', e);
      return SAMPLE_PROJECTS;
    }
  },

  // Save all projects
  saveProjects(projects: StartupProject[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  },

  // Save single project
  saveProject(project: StartupProject): void {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    const updated = {
      ...project,
      updatedAt: new Date().toISOString(),
      completionPercentage: calculateCompletion(project),
    };

    if (index >= 0) {
      projects[index] = updated;
    } else {
      projects.unshift(updated);
    }
    this.saveProjects(projects);
  },

  // Get project by ID
  getProjectById(id: string): StartupProject | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id);
  },

  // Delete project
  deleteProject(id: string): StartupProject[] {
    const projects = this.getProjects().filter((p) => p.id !== id);
    this.saveProjects(projects);
    if (this.getActiveProjectId() === id) {
      this.setActiveProjectId(projects[0]?.id || '');
    }
    return projects;
  },

  // Active Project ID
  getActiveProjectId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
    } catch {
      return null;
    }
  },

  setActiveProjectId(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, id);
    } catch (e) {
      console.error(e);
    }
  },

  // Theme
  getTheme(): ThemeMode {
    try {
      return (localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode) || 'system';
    } catch {
      return 'system';
    }
  },

  setTheme(theme: ThemeMode): void {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error(e);
    }
  },

  // Favorite Prompts
  getFavoritePrompts(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITE_PROMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavoritePrompt(promptId: string): string[] {
    const favs = this.getFavoritePrompts();
    const index = favs.indexOf(promptId);
    let updated: string[];
    if (index >= 0) {
      updated = favs.filter((id) => id !== promptId);
    } else {
      updated = [...favs, promptId];
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITE_PROMPTS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  // Export full JSON database backup
  exportAllData(): string {
    const state = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      projects: this.getProjects(),
      favoritePrompts: this.getFavoritePrompts(),
    };
    return JSON.stringify(state, null, 2);
  },

  // Import JSON database backup
  importData(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !Array.isArray(parsed.projects)) {
        throw new Error('Invalid JSON format: missing projects array.');
      }
      this.saveProjects(parsed.projects);
      if (Array.isArray(parsed.favoritePrompts)) {
        localStorage.setItem(STORAGE_KEYS.FAVORITE_PROMPTS, JSON.stringify(parsed.favoritePrompts));
      }
      return { success: true, count: parsed.projects.length };
    } catch (e: any) {
      return { success: false, count: 0, error: e.message || 'Malformed JSON file' };
    }
  },

  // Storage usage stats
  getStorageUsage(): { usedKb: number; projectCount: number } {
    let totalBytes = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalBytes += (localStorage[key]?.length || 0) * 2;
      }
    }
    return {
      usedKb: Math.round(totalBytes / 1024),
      projectCount: this.getProjects().length,
    };
  },
};

export function calculateCompletion(project: StartupProject): number {
  let score = 0;
  if (project.concept?.startupName && project.concept?.problem) score += 20;
  if (project.branding?.brandName && project.branding?.colors?.primary?.hex) score += 20;
  if (project.marketResearch?.targetAudience && project.marketResearch?.swot) score += 20;
  if (
    project.businessModelCanvas?.valuePropositions?.length &&
    project.businessModelCanvas?.revenueStreams?.length
  ) {
    score += 20;
  }
  if (
    project.launchPlan?.preLaunch?.length ||
    project.launchPlan?.launch?.length ||
    project.launchPlan?.postLaunch?.length
  ) {
    score += 20;
  }
  return score;
}
