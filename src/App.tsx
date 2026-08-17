/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartupProvider } from './context/StartupContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { IdeaGeneratorPage } from './pages/IdeaGeneratorPage';
import { BrandingPage } from './pages/BrandingPage';
import { MarketResearchPage } from './pages/MarketResearchPage';
import { BusinessModelCanvasPage } from './pages/BusinessModelCanvasPage';
import { LaunchPlannerPage } from './pages/LaunchPlannerPage';
import { PresentationPage } from './pages/PresentationPage';
import { PromptLibraryPage } from './pages/PromptLibraryPage';
import { SettingsPage } from './pages/SettingsPage';
import { ShareProjectPage } from './pages/ShareProjectPage';

export default function App() {
  return (
    <BrowserRouter>
      <StartupProvider>
        <Routes>
          {/* Main App Layout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/project/:id/idea" element={<IdeaGeneratorPage />} />
            <Route path="/project/:id/branding" element={<BrandingPage />} />
            <Route path="/project/:id/market-research" element={<MarketResearchPage />} />
            <Route path="/project/:id/canvas" element={<BusinessModelCanvasPage />} />
            <Route path="/project/:id/launch" element={<LaunchPlannerPage />} />
            <Route path="/project/:id/presentation" element={<PresentationPage />} />
            <Route path="/prompts" element={<PromptLibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Standalone Share Route */}
          <Route path="/share/:id" element={<ShareProjectPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StartupProvider>
    </BrowserRouter>
  );
}
