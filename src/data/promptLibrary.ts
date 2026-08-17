import { PromptTemplate } from '../types';

export const PROMPT_LIBRARY: PromptTemplate[] = [
  // 1. Startup Ideas
  {
    id: 'prompt-idea-b2b-saas',
    title: 'B2B Micro-SaaS Problem Finder',
    category: 'idea',
    description: 'Generates niche B2B software opportunities based on overlooked business friction points.',
    prompt: `Analyze the [INDUSTRY] industry and identify 3 high-pain operational workflows currently managed via spreadsheets or manual emails. For each, propose a focused B2B SaaS solution targeting [TARGET_AUDIENCE] with clear pricing models and unfair advantages.`,
    variables: ['INDUSTRY', 'TARGET_AUDIENCE'],
    sampleOutput: 'Detailed breakdown of workflow bottlenecks, MVP feature scope, and willingness-to-pay analysis.',
  },
  {
    id: 'prompt-idea-ai-vertical',
    title: 'Vertical AI Copilot Architect',
    category: 'idea',
    description: 'Designs an AI specialized assistant tailored to a specific regulated or high-skill profession.',
    prompt: `Design a vertical AI Copilot for [PROFESSION_OR_NICHE]. Identify the top 5 cognitive bottlenecks they face daily, outline a multi-modal AI workflow that solves them, and detail data privacy requirements to establish enterprise trust.`,
    variables: ['PROFESSION_OR_NICHE'],
    sampleOutput: 'Target persona profile, key integrations (ERP/CRM/CAD), and moat defensibility strategy.',
  },
  {
    id: 'prompt-idea-d2c-sustainable',
    title: 'Sustainable Consumer Product Disruption',
    category: 'idea',
    description: 'Identifies high-margin eco-friendly consumer physical or digital product opportunities.',
    prompt: `Propose an innovative direct-to-consumer brand in the [PRODUCT_CATEGORY] market that replaces single-use or wasteful alternatives with a circular, premium subscription experience for [DEMOGRAPHIC].`,
    variables: ['PRODUCT_CATEGORY', 'DEMOGRAPHIC'],
    sampleOutput: 'Product specs, unboxing experience concept, supply chain sourcing angles, and margin breakdown.',
  },
  {
    id: 'prompt-idea-fintech-embedded',
    title: 'Embedded Fintech & Neobank Opportunity',
    category: 'idea',
    description: 'Formulates financial tools and payment workflows embedded into non-financial software.',
    prompt: `Identify an underserved vertical community ([COMMUNITY_OR_CREATOR_TYPE]) and design an embedded fintech product offering tailored underwriting, automated tax reserves, and instant liquidity.`,
    variables: ['COMMUNITY_OR_CREATOR_TYPE'],
  },

  // 2. Branding
  {
    id: 'prompt-brand-identity-full',
    title: 'Full Brand System & Archetype Strategy',
    category: 'branding',
    description: 'Generates comprehensive brand positioning, Jungian archetype, voice guidelines, and visual identity.',
    prompt: `Create an iconic brand identity system for a startup named [STARTUP_NAME] that solves [PROBLEM] for [AUDIENCE]. Define: 1. Brand Archetype, 2. Core Narrative & Origin Story, 3. Visual Aesthetic & Hex Color Harmony, 4. Typography Hierarchy, 5. Do's and Don'ts voice matrix.`,
    variables: ['STARTUP_NAME', 'PROBLEM', 'AUDIENCE'],
  },
  {
    id: 'prompt-brand-naming-sprint',
    title: '10-Vector Startup Naming Sprint',
    category: 'branding',
    description: 'Generates 20 distinct startup names categorized by phonetic strategy (invented, compound, metaphor, etc.).',
    prompt: `Generate 20 distinct brand name ideas for a [INDUSTRY] startup offering [VALUE_PROP]. Categorize them into: 1. Neologisms (invented), 2. Evocative Metaphors, 3. Compound Real Words, 4. Tech/Modern Minimalist. For top 3, suggest .com domain availability strategies and tagline pairings.`,
    variables: ['INDUSTRY', 'VALUE_PROP'],
  },
  {
    id: 'prompt-brand-storytelling',
    title: 'Hero\'s Journey Brand Origin Story',
    category: 'branding',
    description: 'Crafts a compelling founder story and manifesto using classic narrative arc techniques.',
    prompt: `Write a high-conviction 200-word founder manifesto and brand narrative for [STARTUP_NAME]. Frame the customer as the hero, [COMPETITOR_OR_STATUS_QUO] as the villain, and our product as the magical guide.`,
    variables: ['STARTUP_NAME', 'COMPETITOR_OR_STATUS_QUO'],
  },

  // 3. Market Research
  {
    id: 'prompt-research-tam-sam-som',
    title: 'Defensible TAM-SAM-SOM Bottom-Up Sizing',
    category: 'research',
    description: 'Calculates bottom-up market sizing estimates with realistic pricing and market penetration rates.',
    prompt: `Conduct a rigorous bottom-up market sizing for [STARTUP_NAME] operating in [SECTOR]. Calculate: Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and 3-Year Serviceable Obtainable Market (SOM). Clearly outline unit economics, total target entities, and assumptions.`,
    variables: ['STARTUP_NAME', 'SECTOR'],
  },
  {
    id: 'prompt-research-competitor-matrix',
    title: 'Competitor Vulnerability & Differentiation Matrix',
    category: 'research',
    description: 'Deep-dives into 4 primary direct and indirect competitors to reveal architectural weaknesses.',
    prompt: `Analyze the competitive landscape for [PRODUCT_CONCEPT]. Compare top 4 market incumbents across: Core strengths, primary user complaints (from G2/Trustpilot patterns), pricing barriers, and highlight the exact "Trojan Horse" angle for our new product.`,
    variables: ['PRODUCT_CONCEPT'],
  },
  {
    id: 'prompt-research-customer-interview',
    title: 'Mom Test Customer Discovery Script',
    category: 'research',
    description: 'Generates 10 non-leading interview questions to validate pain points without biasing responses.',
    prompt: `Create a 10-question user discovery interview script based on "The Mom Test" for interviewing [TARGET_USER] about their challenges with [PROBLEM_AREA]. Ensure zero leading questions or speculative pricing questions.`,
    variables: ['TARGET_USER', 'PROBLEM_AREA'],
  },

  // 4. Business Model Canvas
  {
    id: 'prompt-canvas-9-blocks',
    title: '9-Block Strategic Canvas Generator',
    category: 'canvas',
    description: 'Drafts all 9 standard Osterwalder canvas components with high density and cohesion.',
    prompt: `Generate a comprehensive Business Model Canvas for [STARTUP_NAME], a [BUSINESS_MODEL_TYPE] targeting [CUSTOMER_SEGMENT]. Populate: Key Partners, Key Activities, Key Resources, Value Propositions, Customer Relationships, Channels, Customer Segments, Cost Structure, and Revenue Streams with bulleted high-impact points.`,
    variables: ['STARTUP_NAME', 'BUSINESS_MODEL_TYPE', 'CUSTOMER_SEGMENT'],
  },
  {
    id: 'prompt-canvas-pricing-tiers',
    title: 'Value-Metric SaaS Pricing Tier Optimizer',
    category: 'canvas',
    description: 'Designs a 3-tier pricing strategy (Free/Starter, Pro, Enterprise) anchored to customer value metrics.',
    prompt: `Design a 3-tier pricing model for [PRODUCT_NAME] serving [TARGET_MARKET]. Define the core Value Metric (e.g., seats, usage, API calls), price points, feature gating logic, and enterprise expansion triggers.`,
    variables: ['PRODUCT_NAME', 'TARGET_MARKET'],
  },
  {
    id: 'prompt-canvas-unit-economics',
    title: 'CAC/LTV & Payback Period Modeling',
    category: 'canvas',
    description: 'Models customer acquisition cost, customer lifetime value, and cash payback periods.',
    prompt: `Estimate the unit economics for a [BUSINESS_MODEL] startup with an average order/contract value of [ACV]. Provide projected CAC across paid/organic channels, estimated churn rate, LTV:CAC ratio target, and monthly payback cycle.`,
    variables: ['BUSINESS_MODEL', 'ACV'],
  },

  // 5. Launch Strategies
  {
    id: 'prompt-launch-product-hunt',
    title: 'Product Hunt #1 Product of the Day Playbook',
    category: 'launch',
    description: 'Step-by-step 14-day checklist, teaser copy, hunter outreach, and maker first comment.',
    prompt: `Create a complete Product Hunt launch playbook for [STARTUP_NAME]. Include: 1. Punchy 60-character tagline, 2. First maker comment explaining why we built it, 3. 5 visual asset suggestions, 4. 14-day community warming roadmap.`,
    variables: ['STARTUP_NAME'],
  },
  {
    id: 'prompt-launch-waitlist-viral',
    title: 'Viral Waitlist & Referral Loop Engineering',
    category: 'launch',
    description: 'Designs a high-converting pre-launch landing page with referral gamification rewards.',
    prompt: `Design a viral waitlist campaign for [PRODUCT_NAME]. Detail: 1. Above-the-fold headline + CTA, 2. Milestone reward tiers (e.g. refer 3 friends for beta access, 10 for free lifetime credits), 3. Automated welcome email sequence.`,
    variables: ['PRODUCT_NAME'],
  },
  {
    id: 'prompt-launch-cold-outreach',
    title: 'B2B Founder-Led Outbound Email Sequence',
    category: 'launch',
    description: '3-stage concise, value-first cold email sequence tailored to C-level executives.',
    prompt: `Write a high-reply 3-step cold email sequence targeting [TARGET_TITLE] at [TARGET_COMPANY_TYPE] to book a demo for [STARTUP_NAME]. Keep each email under 90 words with zero generic fluff.`,
    variables: ['TARGET_TITLE', 'TARGET_COMPANY_TYPE', 'STARTUP_NAME'],
  },

  // 6. Pitch Decks
  {
    id: 'prompt-pitch-10-slide-sequoia',
    title: 'Sequoia Capital 10-Slide Pitch Outline',
    category: 'pitch',
    description: 'Generates slide-by-slide headlines, core data points, and visual slide direction for venture capital.',
    prompt: `Draft a 10-slide Seed stage pitch deck outline for [STARTUP_NAME], raising $[FUNDRAISING_AMOUNT]. Provide: Slide Title, Hero Takeaway sentence, Key Data/Bullet Points, and visual layout suggestion for each slide.`,
    variables: ['STARTUP_NAME', 'FUNDRAISING_AMOUNT'],
  },
  {
    id: 'prompt-pitch-one-pager',
    title: 'Venture Executive One-Pager Memo',
    category: 'pitch',
    description: 'Crafts a 1-page institutional investment memo summarizing traction, problem, moat, and team.',
    prompt: `Write a high-density 1-page Executive Investment Memo for [STARTUP_NAME]. Structure into: The Problem, The Breakthrough Technology, Business Model & Unit Economics, Go-To-Market Traction, and The Ask.`,
    variables: ['STARTUP_NAME'],
  },

  // 7. Customer Personas
  {
    id: 'prompt-persona-deep-profile',
    title: '360° ICP (Ideal Customer Profile) Dossier',
    category: 'persona',
    description: 'Deep qualitative breakdown including psychological triggers, KPIs, objections, and buying habits.',
    prompt: `Build a detailed Ideal Customer Profile (ICP) for the primary decision-maker of [PRODUCT_NAME]. Include: Demographic details, daily emotional friction points, professional KPIs they are judged on, main objections to buying, and where they consume industry information online.`,
    variables: ['PRODUCT_NAME'],
  },
  {
    id: 'prompt-persona-anti-customer',
    title: 'The Anti-Persona (Who NOT to Sell To)',
    category: 'persona',
    description: 'Defines customer types that cause high churn, support drain, or poor unit economics.',
    prompt: `Identify the 3 'Anti-Personas' for [STARTUP_NAME]. Explain why these specific customer types will drain engineering/support resources, demand custom features, and churn quickly, with qualification disqualifiers for sales reps.`,
    variables: ['STARTUP_NAME'],
  }
];
