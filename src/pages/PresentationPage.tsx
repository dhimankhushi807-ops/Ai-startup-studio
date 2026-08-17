import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Share2,
  Sparkles,
  Layers,
  Target,
  LineChart,
  DollarSign,
  Rocket,
  Palette,
  Shield,
  FileText,
} from 'lucide-react';
import { useStartup } from '../context/StartupContext';
import { exportStartupToPdf } from '../services/pdfService';
import { ShareModal } from '../components/common/ShareModal';

export const PresentationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, activeProject, exportPdf } = useStartup();

  const currentProj = projects.find((p) => p.id === id) || activeProject;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const concept = currentProj.concept;
  const branding = currentProj.branding;
  const market = currentProj.marketResearch;
  const canvas = currentProj.businessModelCanvas;
  const launch = currentProj.launchPlan;

  // Define the 10 Deck Slides
  const slides = [
    // 1. Cover
    {
      id: 'cover',
      category: 'TITLE',
      title: concept?.startupName || currentProj.name,
      subtitle: concept?.tagline || currentProj.industry,
      speakerNotes: `Welcome everyone. Today we are presenting ${concept?.startupName || currentProj.name}: ${concept?.tagline}.`,
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full py-12 px-6 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white text-3xl font-extrabold font-display shadow-2xl shadow-indigo-500/40">
            {concept?.startupName?.slice(0, 1) || 'S'}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-neutral-900 dark:text-white">
            {concept?.startupName || currentProj.name}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-indigo-600 dark:text-indigo-400 max-w-2xl">
            {concept?.tagline || 'Venture Pitch Deck'}
          </p>
          <div className="pt-8 flex items-center gap-3 text-xs font-semibold text-neutral-400">
            <span>{concept?.suggestedIndustry || currentProj.industry}</span>
            <span>•</span>
            <span>Seed Stage</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },

    // 2. The Problem
    {
      id: 'problem',
      category: 'THE PROBLEM',
      title: 'Market Friction & Customer Pain',
      subtitle: 'Existing legacy solutions create immense operational drag and lost revenue.',
      speakerNotes:
        'The key pain point here is clear: target customers currently suffer from high fragmentation and manual bottlenecks.',
      content: (
        <div className="h-full flex flex-col justify-center max-w-3xl mx-auto space-y-6 px-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-4">
            <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white font-display">
              {concept?.problem || 'Current industry workflows are inefficient, high-friction, and costly.'}
            </h3>
            {market?.customerPainPoints && market.customerPainPoints.length > 0 && (
              <div className="pt-3 border-t border-red-200/60 dark:border-red-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-2">
                  Critical Customer Pain Points:
                </span>
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {market.customerPainPoints.slice(0, 3).map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{p.painPoint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ),
    },

    // 3. The Solution
    {
      id: 'solution',
      category: 'THE SOLUTION',
      title: 'The Breakthrough Architecture',
      subtitle: 'A modern, unified platform delivering immediate measurable ROI.',
      speakerNotes: `Here is our solution: ${concept?.solution}`,
      content: (
        <div className="h-full flex flex-col justify-center max-w-3xl mx-auto space-y-6 px-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-4">
            <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white font-display">
              {concept?.solution || 'Autonomous intelligent workflows delivering fast time-to-value.'}
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-medium">
              {concept?.valueProposition}
            </p>
          </div>
        </div>
      ),
    },

    // 4. Product Features
    {
      id: 'product',
      category: 'PRODUCT',
      title: 'Core Product Capabilities',
      subtitle: 'Engineered for seamless integration and delightful user experiences.',
      speakerNotes: 'Let us walk through the four pillars of our product architecture.',
      content: (
        <div className="h-full flex flex-col justify-center max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(concept?.keyFeatures || [
              'Intelligent automated workflow engine',
              'Real-time analytics and telemetry dashboard',
              'Enterprise-grade RBAC & security compliance',
              'High-throughput distributed API integrations',
            ]).map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 shadow-xs flex items-start gap-3"
              >
                <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // 5. Market Sizing
    {
      id: 'market',
      category: 'MARKET SIZE',
      title: 'Massive Addressable Market Opportunity',
      subtitle: `Demonstrating bottom-up TAM expansion with ${market?.marketOverview?.growthRate || 'strong'} CAGR.`,
      speakerNotes: `Our total addressable market is ${market?.marketOverview?.tam || 'significant'}, with SAM of ${market?.marketOverview?.sam || 'scalable size'}.`,
      content: (
        <div className="h-full flex flex-col justify-center max-w-4xl mx-auto px-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                TAM (Total Market)
              </span>
              <div className="text-3xl font-extrabold text-neutral-900 dark:text-white font-display">
                {market?.marketOverview?.tam || '$24.5B'}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-center space-y-1 border border-indigo-200 dark:border-indigo-900">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                SAM (Serviceable)
              </span>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                {market?.marketOverview?.sam || '$4.2B'}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-1 border border-emerald-200 dark:border-emerald-900">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                SOM (Target Capture)
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                {market?.marketOverview?.som || '$350M'}
              </div>
            </div>
          </div>

          <p className="text-sm text-center text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            {market?.marketOverview?.summary || 'Driven by industry tailwinds and increasing demand for autonomous tooling.'}
          </p>
        </div>
      ),
    },

    // 6. Competitive Advantage
    {
      id: 'competition',
      category: 'COMPETITION & MOAT',
      title: 'Defensible Advantage & Moats',
      subtitle: 'Why we win against incumbent legacy providers.',
      speakerNotes: `Our moat lies in: ${concept?.competitiveAdvantage}`,
      content: (
        <div className="h-full flex flex-col justify-center max-w-3xl mx-auto space-y-6 px-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
              Core Strategic Moat
            </span>
            <h3 className="text-lg sm:text-2xl font-bold font-display leading-relaxed">
              {concept?.competitiveAdvantage || 'Proprietary models, workflow hooks, and network effects.'}
            </h3>
          </div>

          {market?.competitors && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {market.competitors.slice(0, 3).map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs"
                >
                  <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                    {c.name}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400">{c.differentiation}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },

    // 7. Business Model
    {
      id: 'business-model',
      category: 'BUSINESS MODEL',
      title: 'Monetization & Unit Economics',
      subtitle: 'Predictable high-margin recurring SaaS revenue mechanics.',
      speakerNotes: 'Here is how our revenue model scales with customer volume.',
      content: (
        <div className="h-full flex flex-col justify-center max-w-4xl mx-auto px-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-display">
                Revenue Streams
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {(canvas?.revenueStreams || [
                  'Tiered monthly/annual subscription licensing',
                  'Enterprise customized SLAs & dedicated clusters',
                  'Usage-based consumption overages',
                ]).map((rev, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{rev}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-red-50/40 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-300 font-display">
                Cost Structure Drivers
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {(canvas?.costStructure || [
                  'Cloud infrastructure and GPU compute inference',
                  'Core software engineering & product design',
                  'Enterprise outbound sales & customer success',
                ]).map((cost, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },

    // 8. Go-To-Market
    {
      id: 'gtm',
      category: 'GO-TO-MARKET',
      title: 'Phased Launch & Distribution Blitz',
      subtitle: 'Execution milestones for customer acquisition and viral loops.',
      speakerNotes: 'Our Go-to-market plan focuses on pre-launch beta tests and developer advocacy.',
      content: (
        <div className="h-full flex flex-col justify-center max-w-4xl mx-auto px-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                Phase 1: Pre-Launch
              </span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Closed Beta & VIP Waitlist
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Direct interviews with 50 early adopters to establish product-market fit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                Phase 2: Launch Blitz
              </span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Public Distribution Day
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Product Hunt #1 campaign, TechCrunch press exclusive, and founder demo videos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                Phase 3: Scale
              </span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                Growth & Enterprise Expansion
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Content flywheels, ecosystem integrations, and channel partner programs.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // 9. Brand & Mission
    {
      id: 'vision',
      category: 'BRAND ETHOS',
      title: 'Our Mission & Long-Term Vision',
      subtitle: branding?.tagline || 'Building the future of software automation.',
      speakerNotes: `Our mission is: ${branding?.mission}`,
      content: (
        <div className="h-full flex flex-col justify-center max-w-3xl mx-auto space-y-6 px-6 text-center">
          <p className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-white leading-relaxed">
            "{branding?.mission || 'To empower every builder with intelligent software architecture.'}"
          </p>
          <p className="text-sm sm:text-base text-indigo-600 dark:text-indigo-400 font-medium">
            "{branding?.vision || 'A world where ideas turn into enterprise companies in hours, not years.'}"
          </p>
        </div>
      ),
    },

    // 10. The Ask
    {
      id: 'the-ask',
      category: 'THE ASK & NEXT STEPS',
      title: 'Join Us on the Journey',
      subtitle: 'Seed funding, pilot customers, and early talent recruitment.',
      speakerNotes: 'Thank you for your time. We are now open for Q&A.',
      content: (
        <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-6 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl font-display shadow-xl">
            {concept?.startupName?.slice(0, 1) || 'S'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-neutral-900 dark:text-white">
            Thank You
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            Let's build the future together. Open for investor discussions & early pilot partnerships.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => exportPdf(currentProj.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Blueprint PDF</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all"
            >
              <Share2 className="w-4 h-4 text-indigo-500" />
              <span>Share Deck</span>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  return (
    <div
      id="presentation-mode-container"
      className={`flex flex-col space-y-4 max-w-6xl mx-auto ${
        isFullscreen ? 'fixed inset-0 z-50 bg-neutral-950 p-4 max-w-none' : ''
      }`}
    >
      {/* Top Deck Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
              Pitch Deck Mode
            </h2>
            <span className="text-xs text-neutral-400">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              showSpeakerNotes
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800'
                : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>

          <button
            onClick={() => exportPdf(currentProj.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div
        id="pitch-slide-canvas"
        className="w-full aspect-video min-h-[460px] max-h-[680px] rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden flex flex-col justify-between relative transition-all"
      >
        {/* Slide Header */}
        <div className="p-6 pb-0 flex items-center justify-between z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-900/40">
            {currentSlide.category}
          </span>
          <span className="text-xs font-mono text-neutral-400">
            {currentProj.concept?.startupName || currentProj.name}
          </span>
        </div>

        {/* Slide Inner Body */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8">
          {currentSlide.content}
        </div>

        {/* Slide Footer */}
        <div className="p-6 pt-0 flex items-center justify-between text-xs text-neutral-400 z-10">
          <span>Confidential · AI Startup Studio</span>
          <span>
            {currentSlideIndex + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Slide Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          id="deck-prev-btn"
          disabled={currentSlideIndex === 0}
          onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Slide Indicator Dots / Thumbnails */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlideIndex === idx
                  ? 'w-8 bg-indigo-600 dark:bg-indigo-400'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
              }`}
              title={`Slide ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        <button
          id="deck-next-btn"
          disabled={currentSlideIndex === slides.length - 1}
          onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Speaker Notes Drawer */}
      {showSpeakerNotes && (
        <div
          id="speaker-notes-box"
          className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 animate-in fade-in duration-200"
        >
          <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider block mb-1">
            Speaker Notes:
          </span>
          <p className="leading-relaxed">{currentSlide.speakerNotes}</p>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        project={currentProj}
      />
    </div>
  );
};
