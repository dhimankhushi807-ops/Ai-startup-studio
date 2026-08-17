import {
  IdeaInput,
  StartupConcept,
  BrandingData,
  MarketResearchData,
  BusinessModelCanvasData,
  LaunchPlanData,
} from '../types';

interface GenerationResponse<T> {
  success: boolean;
  data: T;
  isAiGenerated: boolean;
  error?: string;
}

// Check backend AI server status
export async function checkAiHealth(): Promise<{ aiConfigured: boolean; error?: string }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { aiConfigured: false };
    const data = await res.json();
    return { aiConfigured: !!data.aiConfigured };
  } catch (err: any) {
    return { aiConfigured: false, error: err.message };
  }
}

// Core helper to call /api/gemini/generate
async function callGeminiApi<T>(
  systemInstruction: string,
  prompt: string,
  fallbackFactory: () => T
): Promise<GenerationResponse<T>> {
  try {
    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction,
        prompt,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('API error from /api/gemini/generate:', errData);
      // If key is missing or server error, use structured fallback
      const fallback = fallbackFactory();
      return {
        success: true,
        data: fallback,
        isAiGenerated: false,
        error: errData.error || `Server returned ${response.status}`,
      };
    }

    const json = await response.json();
    if (json.success && json.data) {
      return {
        success: true,
        data: json.data as T,
        isAiGenerated: true,
      };
    }

    // Fallback if data is missing
    return {
      success: true,
      data: fallbackFactory(),
      isAiGenerated: false,
    };
  } catch (error: any) {
    console.warn('Gemini API fetch failure (using offline fallback):', error);
    return {
      success: true,
      data: fallbackFactory(),
      isAiGenerated: false,
      error: error.message || 'Network unreachable or offline',
    };
  }
}

// 1. Generate Startup Idea Concept
export async function generateStartupIdea(input: IdeaInput): Promise<GenerationResponse<StartupConcept>> {
  const systemInstruction = `You are an elite Silicon Valley startup incubator partner and venture architect (Y Combinator & Sequoia style).
Analyze the founder's raw startup idea and transform it into a crystal-clear, venture-fundable startup concept.
Return ONLY a valid JSON object matching the requested schema with no extra commentary.`;

  const prompt = `Convert this startup seed into a structured, high-conviction startup plan:
Raw Idea: ${input.rawIdea}
Industry: ${input.industry || 'Technology'}
Target Audience: ${input.targetAudience || 'Modern Businesses & Consumers'}
Location / Market: ${input.locationMarket || 'Global'}
Business Model: ${input.businessType || 'B2B SaaS'}
Additional Context: ${input.context || 'None'}

Return a JSON object strictly conforming to:
{
  "startupName": "Memorable, modern 1-2 word brand name",
  "tagline": "Punchy 4-8 word tagline",
  "oneLinePitch": "Clear, compelling one-sentence explanation of what it does and for whom",
  "problem": "Deep breakdown of the acute customer pain point and existing friction (2-3 sentences)",
  "solution": "How this product uniquely and definitively solves the problem (2-3 sentences)",
  "targetCustomers": ["Customer segment 1", "Customer segment 2", "Customer segment 3", "Customer segment 4"],
  "valueProposition": "Measurable ROI or emotional transformation for users (1-2 sentences)",
  "keyFeatures": ["Feature 1 with clear benefit", "Feature 2 with clear benefit", "Feature 3", "Feature 4", "Feature 5"],
  "businessOpportunity": "Market dynamic, tailwinds, and macro trends creating an urgent window of opportunity",
  "revenueOpportunity": "Monetization model, pricing structure, and contract value projections",
  "suggestedIndustry": "Precise industry classification",
  "competitiveAdvantage": "Defensible technological, network, or structural moat",
  "elevatorPitch": "High-impact 30-second investor pitch"
}`;

  return callGeminiApi<StartupConcept>(systemInstruction, prompt, () => ({
    startupName: input.rawIdea.split(' ')[0] ? `${input.rawIdea.split(' ')[0]}Flow` : 'VentureForge AI',
    tagline: 'Intelligent Automation for Next-Gen Scale',
    oneLinePitch: `An AI-powered platform transforming ${input.industry || 'operations'} for ${input.targetAudience || 'modern enterprises'}.`,
    problem: `Current solutions in ${input.industry || 'the industry'} are fragmented, slow, and manual, forcing teams to waste over 20+ hours weekly on repetitive coordination and error-prone processes.`,
    solution: `An integrated, autonomous platform combining predictive AI workflows, unified collaboration, and real-time intelligence to deliver 10x faster execution.`,
    targetCustomers: [
      'Fast-growing mid-market companies (50-500 employees)',
      'Enterprise teams seeking workflow optimization',
      'Modern digital operators and departmental leaders',
      'Independent specialists requiring automation',
    ],
    valueProposition: 'Cuts operational overhead by 40%, accelerates turnaround times by 3x, and provides continuous executive visibility.',
    keyFeatures: [
      'Autonomous workflow synthesis engine',
      'Unified real-time analytics and predictive forecasting',
      'Seamless multi-platform data integrations & webhooks',
      'Enterprise-grade SOC-2 ready security and role permissions',
      'Mobile-first collaborative workspace companion',
    ],
    businessOpportunity: `Accelerating shift toward automated productivity across ${input.industry || 'enterprise tech'}, where legacy toolsets cannot match modern AI-native speeds.`,
    revenueOpportunity: 'Tiered monthly SaaS subscription ($49 - $299/seat/month) with custom high-volume API enterprise agreements.',
    suggestedIndustry: input.industry || 'Enterprise B2B Software',
    competitiveAdvantage: 'Proprietary domain-specific fine-tuned models combined with zero-friction onboarding in under 5 minutes.',
    elevatorPitch: `We are building the intelligent operating system for ${input.industry || 'modern organizations'}, eliminating manual operational friction and unlocking exponential team velocity.`,
  }));
}

// 2. Generate Branding & Identity
export async function generateBranding(
  concept: StartupConcept,
  input?: IdeaInput
): Promise<GenerationResponse<BrandingData>> {
  const systemInstruction = `You are a world-class brand strategist and Creative Director at Pentagram and Linear.
Create a timeless, sophisticated brand identity system with cohesive color palettes (hex codes), typography pairings, voice guidelines, and logo symbolism.
Return ONLY valid JSON matching the exact schema.`;

  const prompt = `Develop a brand identity for:
Startup Name: ${concept.startupName}
Tagline: ${concept.tagline}
One-Line Pitch: ${concept.oneLinePitch}
Problem & Solution: ${concept.problem} / ${concept.solution}
Target Audience: ${concept.targetCustomers.join(', ')}

Return a JSON object strictly conforming to:
{
  "brandName": "${concept.startupName}",
  "tagline": "${concept.tagline}",
  "brandStory": "Compelling 3-4 sentence brand narrative and origin ethos",
  "brandPersonality": ["Trait 1", "Trait 2", "Trait 3", "Trait 4", "Trait 5"],
  "mission": "Clear, audacious mission statement (1-2 sentences)",
  "vision": "Long-term aspirational future state (1-2 sentences)",
  "logoConcept": {
    "description": "Visual description of the minimalist logo mark",
    "symbolism": "Underlying conceptual meaning of the geometry/metaphor",
    "style": "Visual style descriptor (e.g. Neo-brutalist, Swiss Modern, Organic Minimalist)",
    "iconSuggestion": "Name of relevant conceptual icon (e.g. Sparkles, Layers, Compass, Zap, Shield, Rocket)"
  },
  "colors": {
    "primary": { "name": "Color Name", "hex": "#hexcode", "usage": "Usage guideline" },
    "secondary": { "name": "Color Name", "hex": "#hexcode", "usage": "Usage guideline" },
    "accent": { "name": "Color Name", "hex": "#hexcode", "usage": "Usage guideline" },
    "neutral": { "name": "Color Name", "hex": "#hexcode", "usage": "Usage guideline" }
  },
  "typography": {
    "headingFont": "Space Grotesk or Plus Jakarta Sans or Syne or Cabinet Grotesk",
    "bodyFont": "Plus Jakarta Sans or Inter or Satoshi",
    "styleNotes": "Typographic hierarchy and tracking/kerning rules"
  },
  "brandVoice": {
    "tone": "Core communication tone summary",
    "keywords": ["Keyword1", "Keyword2", "Keyword3", "Keyword4"],
    "dos": ["Guideline 1", "Guideline 2", "Guideline 3"],
    "donts": ["Guideline 1", "Guideline 2", "Guideline 3"]
  }
}`;

  return callGeminiApi<BrandingData>(systemInstruction, prompt, () => ({
    brandName: concept.startupName,
    tagline: concept.tagline || 'Engineered for Extraordinary Impact',
    brandStory: `${concept.startupName} was founded on a simple conviction: the future belongs to those who eliminate unnecessary friction. By combining rigorous engineering with intuitive design, we turn operational complexity into effortless clarity.`,
    brandPersonality: ['Precise', 'Visionary', 'Minimalist', 'Relentless', 'Empowering'],
    mission: `To empower builders and teams with autonomous tools that unlock their highest potential.`,
    vision: `A world where human ingenuity is freed from manual drudgery.`,
    logoConcept: {
      description: 'A crisp interlocking geometric glyph representing convergence, speed, and continuous evolution.',
      symbolism: 'Symbolizes the seamless integration of raw intelligence and human ambition.',
      style: 'Modern Minimalist Line Geometry',
      iconSuggestion: 'Zap',
    },
    colors: {
      primary: { name: 'Hyper Indigo', hex: '#4F46E5', usage: 'Primary branding, hero badges, high-impact CTA buttons' },
      secondary: { name: 'Teal Velocity', hex: '#0EA5E9', usage: 'Progress indicators, secondary accents, active highlights' },
      accent: { name: 'Solar Amber', hex: '#F59E0B', usage: 'Attention badges, alerts, live status indicators' },
      neutral: { name: 'Slate Obsidian', hex: '#0F172A', usage: 'High contrast text, dark canvas surfaces, borders' },
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans',
      styleNotes: 'Use bold geometric headings paired with high-legibility sans-serif body for clean technical authority.',
    },
    brandVoice: {
      tone: 'Confident, concise, data-driven, and forward-looking.',
      keywords: ['Clarity', 'Velocity', 'Autonomous', 'Precision'],
      dos: ['Quantify benefits with concrete numbers', 'Speak with quiet confidence', 'Highlight user autonomy'],
      donts: ['Avoid hyperbolic marketing buzzwords', 'Do not make vague promises', 'Never use robotic technical jargon'],
    },
  }));
}

// 3. Generate Market Research
export async function generateMarketResearch(
  concept: StartupConcept,
  input?: IdeaInput
): Promise<GenerationResponse<MarketResearchData>> {
  const systemInstruction = `You are a Principal Market Intelligence Analyst at McKinsey and Gartner specializing in venture ecosystems.
Generate rigorous, structured market research with TAM/SAM/SOM estimations, competitor teardowns, customer segment personas, pain points, risks, and SWOT matrix.
Clearly note that quantitative projections are AI estimates and hypotheses.
Return ONLY valid JSON matching the exact schema.`;

  const prompt = `Conduct comprehensive market intelligence for:
Startup: ${concept.startupName}
Industry: ${concept.suggestedIndustry || 'Software & Tech'}
Problem: ${concept.problem}
Solution: ${concept.solution}
Target Customers: ${concept.targetCustomers.join(', ')}

Return a JSON object conforming strictly to:
{
  "marketOverview": {
    "summary": "2-3 sentence state of the global market and driving forces",
    "tam": "$X.X Billion (Total global market scope)",
    "sam": "$X.X Billion (Serviceable serviceable segment)",
    "som": "$XXX Million (Realistic 3-year capture)",
    "growthRate": "XX.X% CAGR",
    "isAiEstimate": true
  },
  "targetAudience": {
    "primaryDemographic": "Key decision-makers, titles, age, and organizational profile",
    "keyMotivations": ["Motivation 1", "Motivation 2", "Motivation 3"],
    "buyingBehaviors": ["Behavior 1", "Behavior 2", "Behavior 3"]
  },
  "customerSegments": [
    { "name": "Segment Name", "description": "Who they are and why they need it", "size": "Estimated volume", "priority": "High" },
    { "name": "Segment Name 2", "description": "Who they are", "size": "Estimated volume", "priority": "High" },
    { "name": "Segment Name 3", "description": "Who they are", "size": "Estimated volume", "priority": "Medium" }
  ],
  "customerPainPoints": [
    { "painPoint": "Specific burning issue", "severity": "Critical", "currentWorkaround": "How they cope today" },
    { "painPoint": "Second burning issue", "severity": "High", "currentWorkaround": "How they cope today" },
    { "painPoint": "Third burning issue", "severity": "Moderate", "currentWorkaround": "How they cope today" }
  ],
  "competitors": [
    { "name": "Competitor 1", "strengths": "What they do well", "weaknesses": "Where they fail users", "differentiation": "Our distinct wedge", "pricingModel": "Their typical pricing" },
    { "name": "Competitor 2", "strengths": "What they do well", "weaknesses": "Where they fail users", "differentiation": "Our distinct wedge", "pricingModel": "Their typical pricing" },
    { "name": "Competitor 3", "strengths": "What they do well", "weaknesses": "Where they fail users", "differentiation": "Our distinct wedge", "pricingModel": "Their typical pricing" }
  ],
  "opportunities": ["Growth vector 1", "Growth vector 2", "Growth vector 3"],
  "risks": [
    { "risk": "Primary market or tech risk", "impact": "High", "mitigation": "Strategic countermeasure" },
    { "risk": "Secondary risk", "impact": "Medium", "mitigation": "Strategic countermeasure" }
  ],
  "trends": ["Macro trend 1", "Technological shift 2", "Regulatory or consumer trend 3"],
  "swot": {
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "weaknesses": ["Weakness 1", "Weakness 2"],
    "opportunities": ["Opportunity 1", "Opportunity 2"],
    "threats": ["Threat 1", "Threat 2"]
  },
  "positioningStatement": "For [target] who [need], [startup] is a [category] that [benefit], unlike [alternative] our product [key differentiator]."
}`;

  return callGeminiApi<MarketResearchData>(systemInstruction, prompt, () => ({
    marketOverview: {
      summary: `The global market for ${concept.suggestedIndustry || 'digital solutions'} is experiencing exponential tailwinds driven by rapid automation demands, cloud migration, and productivity imperatives.`,
      tam: '$14.8 Billion (Global Industry Total)',
      sam: '$3.4 Billion (Mid-market & High-growth Sector)',
      som: '$120 Million (Initial 3-Year Obtainable Focus)',
      growthRate: '16.2% Annual CAGR',
      isAiEstimate: true,
    },
    targetAudience: {
      primaryDemographic: 'Department Heads, VP of Operations, Directors, and Tech-Savvy Founders (Ages 28-52).',
      keyMotivations: ['Cutting recurring operational costs', 'Eliminating human error in mission-critical workflows', 'Accelerating time-to-market'],
      buyingBehaviors: ['Values self-serve trials with transparent monthly pricing', 'Demands fast integrations with existing software stack'],
    },
    customerSegments: [
      { name: 'Growth-Stage Scaleups', description: 'Teams expanding rapidly needing standardized automated systems', size: '65,000+ businesses', priority: 'High' },
      { name: 'Mid-Market Enterprises', description: 'Established firms modernizing legacy disconnected tools', size: '120,000+ businesses', priority: 'High' },
      { name: 'Agile Boutique Operators', description: 'Specialized firms looking to achieve 5x output per team member', size: '280,000+ firms', priority: 'Medium' },
    ],
    customerPainPoints: [
      { painPoint: 'Fragmented data and manual copy-pasting across disparate applications', severity: 'Critical', currentWorkaround: 'Spreadsheets, manual emails, and fragile Zapier bridges' },
      { painPoint: 'High software bloat and bloated seat licenses that deliver low actual usage', severity: 'High', currentWorkaround: 'Paying for multiple overlapping tools' },
      { painPoint: 'Slow decision loops caused by lagging retrospective reporting', severity: 'High', currentWorkaround: 'Weekly manual slide decks and standup meetings' },
    ],
    competitors: [
      { name: 'Legacy Incumbent Corp', strengths: 'Deep enterprise contracts and legacy feature depth', weaknesses: 'Bloated UI, steep 3-month setup, prohibitively expensive', differentiation: `${concept.startupName} deploys in 5 minutes with modern AI workflows`, pricingModel: '$10k+ annual minimum' },
      { name: 'Point Solution App', strengths: 'Simple niche feature set', weaknesses: 'Lacks end-to-end orchestration and scalable API hooks', differentiation: 'Complete unified intelligence platform', pricingModel: '$29/user/month' },
    ],
    opportunities: [
      'Expansion into automated compliance and reporting modules',
      'Marketplace ecosystem for custom community workflow extensions',
      'API-first headless integration for enterprise customer portals',
    ],
    risks: [
      { risk: 'Customer inertia and switching costs from entrenched habits', impact: 'High', mitigation: 'One-click automated data migration and white-glove onboarding concierge' },
      { risk: 'Rapidly shifting AI model pricing and capabilities', impact: 'Medium', mitigation: 'Model-agnostic backend architecture enabling instant hot-swapping' },
    ],
    trends: [
      'Shift from reactive manual software to proactive autonomous agents',
      'Consolidation of single-purpose point tools into integrated workspaces',
      'Demand for privacy-first, enterprise-compliant data handling',
    ],
    swot: {
      strengths: ['AI-native architecture with zero technical debt', 'Radically intuitive modern UX', 'Fast sub-minute setup time'],
      weaknesses: ['Early brand awareness compared to decade-old incumbents', 'Smaller initial feature surface area'],
      opportunities: ['Direct partnership integrations with major tech platforms', 'Global international localization'],
      threats: ['Incumbents adding basic AI wrappers', 'General macroeconomic tightening of software budgets'],
    },
    positioningStatement: `For modern operators who need peak efficiency, ${concept.startupName} is the intelligent platform that automates complex workflows, delivering 10x faster execution without enterprise bloat.`,
  }));
}

// 4. Generate Business Model Canvas
export async function generateBusinessModel(
  concept: StartupConcept,
  marketResearch?: MarketResearchData
): Promise<GenerationResponse<BusinessModelCanvasData>> {
  const systemInstruction = `You are an expert venture strategist in Alexander Osterwalder's Business Model Generation framework.
Generate the complete 9-box Business Model Canvas for the startup.
Return ONLY valid JSON matching the exact schema.`;

  const prompt = `Create the 9-block Business Model Canvas for:
Startup: ${concept.startupName}
Pitch: ${concept.oneLinePitch}
Problem/Solution: ${concept.problem} / ${concept.solution}
Target Audience: ${concept.targetCustomers.join(', ')}
Revenue Concept: ${concept.revenueOpportunity}

Return a JSON object conforming strictly to:
{
  "keyPartners": ["Partner 1 with role", "Partner 2", "Partner 3", "Partner 4"],
  "keyActivities": ["Core activity 1", "Core activity 2", "Core activity 3", "Core activity 4"],
  "keyResources": ["Key resource 1", "Key resource 2", "Key resource 3", "Key resource 4"],
  "valuePropositions": ["Value prop 1", "Value prop 2", "Value prop 3", "Value prop 4"],
  "customerRelationships": ["Relationship model 1", "Relationship model 2", "Relationship model 3"],
  "channels": ["Channel 1", "Channel 2", "Channel 3", "Channel 4"],
  "customerSegments": ["Customer segment 1", "Customer segment 2", "Customer segment 3"],
  "costStructure": ["Primary cost driver 1", "Cost driver 2", "Cost driver 3", "Cost driver 4"],
  "revenueStreams": ["Revenue stream 1", "Revenue stream 2", "Revenue stream 3"]
}`;

  return callGeminiApi<BusinessModelCanvasData>(systemInstruction, prompt, () => ({
    keyPartners: [
      'Cloud Infrastructure & GPU Compute Providers (AWS, Google Cloud)',
      'Ecosystem Integration Partners (Slack, Zapier, Microsoft 365)',
      'Industry Associations and Channel Resellers',
      'Compliance and Data Security Auditors',
    ],
    keyActivities: [
      'Continuous algorithmic model training and workflow optimization',
      'Platform reliability engineering and 99.99% uptime maintenance',
      'Product-led growth loop optimization and onboarding UX',
      'Enterprise customer success and security compliance reviews',
    ],
    keyResources: [
      'Proprietary workflow automation models and algorithms',
      'High-velocity product & engineering talent',
      'Aggregated domain benchmarks and workflow templates',
      'Brand reputation and growing customer community',
    ],
    valuePropositions: [
      'Reduces weekly operational overhead by 40%+',
      'Eliminates manual human error in mission-critical data flows',
      '5-minute self-serve setup with zero onboarding friction',
      'Unified executive intelligence and real-time visibility',
    ],
    customerRelationships: [
      'Automated product-led onboarding with interactive guided tours',
      'Dedicated Customer Success Manager for Enterprise accounts',
      'Active developer and operator community forum',
    ],
    channels: [
      'Direct Product-Led Growth (viral referral & shared link loops)',
      'Content marketing & high-intent organic search SEO',
      'Ecosystem app stores and marketplace integrations',
      'Account-Based Outbound Sales targeting VP/Director level',
    ],
    customerSegments: [
      'High-growth tech startups and venture-backed scaleups',
      'Mid-market operations teams seeking consolidation',
      'Professional services and agency project managers',
    ],
    costStructure: [
      'Cloud compute, AI model API inference, and database egress',
      'Engineering and product research & development salaries',
      'Customer acquisition costs (paid channels, events, content)',
      'Regulatory compliance, SOC-2 certifications, and legal',
    ],
    revenueStreams: [
      'Starter Plan: $29/seat/month for agile teams (self-serve)',
      'Pro Plan: $79/seat/month with advanced integrations & automation',
      'Enterprise Custom: $25k+/year with SLA guarantees & custom security',
    ],
  }));
}

// 5. Generate Launch Planner
export async function generateLaunchPlan(
  concept: StartupConcept,
  canvas?: BusinessModelCanvasData
): Promise<GenerationResponse<LaunchPlanData>> {
  const systemInstruction = `You are a veteran Go-To-Market (GTM) growth strategist who has scaled multiple startups from 0 to $10M ARR.
Create a structured 3-phase launch roadmap (Pre-Launch, Launch, Post-Launch) with actionable tasks, priorities, categories, and suggested timelines.
Return ONLY valid JSON matching the exact schema.`;

  const prompt = `Generate a high-execution Launch Roadmap for:
Startup: ${concept.startupName}
One-Line Pitch: ${concept.oneLinePitch}
Target Customers: ${concept.targetCustomers.join(', ')}

Return a JSON object conforming strictly to:
{
  "preLaunch": [
    { "id": "task-pre-1", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Week 1-2", "category": "Product Validation" },
    { "id": "task-pre-2", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Week 2-3", "category": "Brand & Landing Page" },
    { "id": "task-pre-3", "title": "Clear task title", "description": "Specific tactical action step", "priority": "Medium", "status": "todo", "timeline": "Week 3-4", "category": "Community & Waitlist" },
    { "id": "task-pre-4", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Week 4", "category": "MVP Readiness" }
  ],
  "launch": [
    { "id": "task-l-1", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Launch Day", "category": "Public Relations" },
    { "id": "task-l-2", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Week 1", "category": "Social & Community" },
    { "id": "task-l-3", "title": "Clear task title", "description": "Specific tactical action step", "priority": "Medium", "status": "todo", "timeline": "Week 2", "category": "Direct Outbound" },
    { "id": "task-l-4", "title": "Clear task title", "description": "Specific tactical action step", "priority": "Medium", "status": "todo", "timeline": "Week 2-3", "category": "Partnership Co-Launch" }
  ],
  "postLaunch": [
    { "id": "task-post-1", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Month 1", "category": "Customer Retention" },
    { "id": "task-post-2", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Month 2", "category": "Analytics & Conversion" },
    { "id": "task-post-3", "title": "Clear task title", "description": "Specific tactical action step", "priority": "Medium", "status": "todo", "timeline": "Month 3", "category": "Product Iteration" },
    { "id": "task-post-4", "title": "Clear task title", "description": "Specific tactical action step", "priority": "High", "status": "todo", "timeline": "Month 3-6", "category": "Scale & Fundraising" }
  ]
}`;

  return callGeminiApi<LaunchPlanData>(systemInstruction, prompt, () => ({
    preLaunch: [
      { id: 'task-pre-1', title: 'Customer Problem Validation Interviews (20 ICPs)', description: 'Interview 20 prospective buyers using Mom Test framework to validate pricing and workflow severity.', priority: 'High', status: 'done', timeline: 'Week 1-2', category: 'Validation' },
      { id: 'task-pre-2', title: 'High-Converting Waitlist Landing Page', description: 'Launch interactive landing page with value demo video and viral referral sharing queue.', priority: 'High', status: 'in-progress', timeline: 'Week 2-3', category: 'Marketing' },
      { id: 'task-pre-3', title: 'Deploy Closed Private Beta for 15 Pilot Accounts', description: 'Instrument telemetry analytics (PostHog/Mixpanel) to measure day-1 activation and retention.', priority: 'High', status: 'todo', timeline: 'Week 3-4', category: 'Product' },
      { id: 'task-pre-4', title: 'Prepare Launch Media Kit & Founder Story Video', description: 'Create high-resolution product demo GIFs, founder video, and press release materials.', priority: 'Medium', status: 'todo', timeline: 'Week 4', category: 'Content' },
    ],
    launch: [
      { id: 'task-l-1', title: 'Product Hunt #1 of the Day Launch Campaign', description: 'Coordinate launch day schedule with active community engagement and first maker response.', priority: 'High', status: 'todo', timeline: 'Launch Day', category: 'Public Relations' },
      { id: 'task-l-2', title: 'Hacker News "Show HN" Technical Teardown', description: 'Publish technical deep dive explaining architectural innovations and performance benchmarks.', priority: 'High', status: 'todo', timeline: 'Launch Week', category: 'Developer Relations' },
      { id: 'task-l-3', title: 'Founder-Led LinkedIn & X Distribution Blitz', description: 'Release 5-part founder thought leadership series analyzing current industry inefficiencies.', priority: 'Medium', status: 'todo', timeline: 'Week 1-2', category: 'Social Media' },
      { id: 'task-l-4', title: 'Direct Personalized Outbound to 250 Qualified Leads', description: 'Send high-relevance video demo messages directly to validated ICP titles.', priority: 'High', status: 'todo', timeline: 'Week 2-3', category: 'Sales' },
    ],
    postLaunch: [
      { id: 'task-post-1', title: 'Weekly Cohort Retention & Churn Teardowns', description: 'Analyze drop-off points in user activation funnel; address top 3 user friction requests.', priority: 'High', status: 'todo', timeline: 'Month 1', category: 'Growth' },
      { id: 'task-post-2', title: 'Publish 3 Flagship Customer Success Case Studies', description: 'Document verified metrics: 40% time saved, measurable revenue acceleration, and ROI.', priority: 'High', status: 'todo', timeline: 'Month 2', category: 'Social Proof' },
      { id: 'task-post-3', title: 'Launch Self-Serve Pro Tier & Automated Billing', description: 'Optimize stripe checkout flow, automated annual upgrade prompts, and team seat invites.', priority: 'Medium', status: 'todo', timeline: 'Month 2-3', category: 'Monetization' },
      { id: 'task-post-4', title: 'Prepare Institutional Seed / Series A Data Room', description: 'Assemble verified metrics, cohort retention curves, cap table, and future 3-year vision.', priority: 'High', status: 'todo', timeline: 'Month 4-6', category: 'Fundraising' },
    ],
  }));
}

// 6. Refine Specific Section with Custom AI Prompt
export async function refineSection(
  sectionName: string,
  userInstruction: string,
  currentData: any
): Promise<GenerationResponse<any>> {
  const systemInstruction = `You are an expert startup advisor and product architect.
The user wants to refine or improve the '${sectionName}' section of their startup plan.
Apply their specific feedback while maintaining rigorous professionalism and clean structure.
Return ONLY valid JSON matching the exact schema of the original data.`;

  const prompt = `Refine this ${sectionName} data based on user feedback:
User Feedback: ${userInstruction}

Current Data:
${JSON.stringify(currentData, null, 2)}

Return the complete updated JSON object.`;

  return callGeminiApi<any>(systemInstruction, prompt, () => currentData);
}
