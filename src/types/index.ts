export type StepId = 'idea' | 'branding' | 'research' | 'canvas' | 'launch' | 'presentation';

export interface IdeaInput {
  rawIdea: string;
  industry: string;
  targetAudience: string;
  locationMarket: string;
  businessType: string;
  context?: string;
}

export interface StartupConcept {
  startupName: string;
  tagline: string;
  oneLinePitch: string;
  problem: string;
  solution: string;
  targetCustomers: string[];
  valueProposition: string;
  keyFeatures: string[];
  businessOpportunity: string;
  revenueOpportunity: string;
  suggestedIndustry: string;
  competitiveAdvantage: string;
  elevatorPitch?: string;
}

export interface ColorDef {
  name: string;
  hex: string;
  usage: string;
}

export interface BrandingData {
  brandName: string;
  tagline: string;
  brandStory: string;
  brandPersonality: string[];
  mission: string;
  vision: string;
  logoConcept: {
    description: string;
    symbolism: string;
    style: string;
    iconSuggestion: string;
  };
  colors: {
    primary: ColorDef;
    secondary: ColorDef;
    accent: ColorDef;
    neutral: ColorDef;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    styleNotes: string;
  };
  brandVoice: {
    tone: string;
    keywords: string[];
    dos: string[];
    donts: string[];
  };
}

export interface MarketOverview {
  summary: string;
  tam: string;
  sam: string;
  som: string;
  growthRate: string;
  isAiEstimate: boolean;
}

export interface CustomerSegment {
  name: string;
  description: string;
  size: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface PainPoint {
  painPoint: string;
  severity: 'Critical' | 'High' | 'Moderate';
  currentWorkaround: string;
}

export interface CompetitorItem {
  name: string;
  strengths: string;
  weaknesses: string;
  differentiation: string;
  pricingModel: string;
}

export interface RiskItem {
  risk: string;
  impact: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface MarketResearchData {
  marketOverview: MarketOverview;
  targetAudience: {
    primaryDemographic: string;
    keyMotivations: string[];
    buyingBehaviors: string[];
  };
  customerSegments: CustomerSegment[];
  customerPainPoints: PainPoint[];
  competitors: CompetitorItem[];
  opportunities: string[];
  risks: RiskItem[];
  trends: string[];
  swot: SwotAnalysis;
  positioningStatement: string;
}

export interface BusinessModelCanvasData {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface LaunchTask {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'todo' | 'in-progress' | 'done';
  timeline: string;
  category: string;
}

export interface LaunchPlanData {
  preLaunch: LaunchTask[];
  launch: LaunchTask[];
  postLaunch: LaunchTask[];
}

export interface FutureVisionData {
  oneYearGoal: string;
  threeYearVision: string;
  moatAndDefensibility: string;
  keyMilestones: Array<{
    phase: string;
    target: string;
  }>;
}

export interface StartupProject {
  id: string;
  name: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
  currentStep: StepId;
  ideaInput: IdeaInput;
  concept?: StartupConcept;
  branding?: BrandingData;
  marketResearch?: MarketResearchData;
  businessModelCanvas?: BusinessModelCanvasData;
  launchPlan?: LaunchPlanData;
  futureVision?: FutureVisionData;
  isFavorite?: boolean;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'idea' | 'branding' | 'research' | 'canvas' | 'launch' | 'pitch' | 'persona';
  description: string;
  prompt: string;
  variables: string[];
  sampleOutput?: string;
  isFavorite?: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';
