import { StartupProject } from '../types';

export const SAMPLE_PROJECTS: StartupProject[] = [
  {
    id: 'proj-omniroute-ai',
    name: 'OmniRoute AI',
    industry: 'Logistics & Supply Chain AI',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    completionPercentage: 100,
    currentStep: 'presentation',
    isFavorite: true,
    ideaInput: {
      rawIdea: 'AI-driven dynamic routing and dispatch optimization for mid-sized urban last-mile delivery fleets.',
      industry: 'Supply Chain & Logistics',
      targetAudience: 'Fleet managers, couriers, and regional e-commerce logistics coordinators.',
      locationMarket: 'North America & Europe',
      businessType: 'B2B SaaS',
      context: 'Fuel costs and traffic unpredictability reduce fleet margins by 22%.',
    },
    concept: {
      startupName: 'OmniRoute AI',
      tagline: 'Autonomous Last-Mile Logistics Orchestration',
      oneLinePitch: 'Predictive routing and real-time dispatch engine that cuts delivery costs by 28% while reducing carbon emissions.',
      problem: 'Mid-sized logistics fleets suffer from rigid dispatch algorithms, unpredictable traffic spikes, and lack of real-time multi-stop dynamic re-routing, causing delayed deliveries and skyrocketing fuel waste.',
      solution: 'A cloud-native SaaS platform utilizing real-time telematics and predictive machine learning to re-optimize delivery itineraries every 90 seconds based on live traffic, micro-weather, and driver capacity.',
      targetCustomers: [
        'Mid-market delivery companies (20-250 vehicles)',
        'Regional grocery and dark store operators',
        'Direct-to-consumer brand fulfillment networks',
        'Medical courier service providers'
      ],
      valueProposition: 'Saves 2.5 hours per driver daily, lowers fuel costs by 24%, and increases on-time delivery guarantees to 99.4%.',
      keyFeatures: [
        'Sub-second dynamic multi-stop route re-calculation',
        'Telematics IoT driver companion mobile app',
        'Automated time-window customer SMS notifications',
        'Carbon emission tracking and compliance export',
        'Plug-and-play integrations with Shopify, ERPs, and Samsara'
      ],
      businessOpportunity: 'The global last-mile delivery software market is surging past $9.8B with a 16.4% CAGR driven by rapid e-commerce expansion.',
      revenueOpportunity: 'Tiered subscription starting at $39/vehicle/month with enterprise custom API volume pricing.',
      suggestedIndustry: 'Enterprise Logistics Software',
      competitiveAdvantage: 'Proprietary graph optimization neural network trained on hyper-local urban traffic telemetry and loading bay dwell times.',
      elevatorPitch: 'OmniRoute AI brings hyper-optimized delivery intelligence to mid-market fleets, turning last-mile logistics from a cost center into a competitive superpower.',
    },
    branding: {
      brandName: 'OmniRoute AI',
      tagline: 'Precision in Motion',
      brandStory: 'Logistics is the circulatory system of modern commerce. When routes stall, businesses freeze. OmniRoute was born to bring effortless kinetic flow to every package, driver, and destination.',
      brandPersonality: ['Engineered', 'Reliable', 'Kinetic', 'Vigilant', 'Forward-Thinking'],
      mission: 'To eliminate friction and carbon waste in urban delivery networks worldwide.',
      vision: 'A synchronized global logistics grid where every mile traveled is mathematically optimal.',
      logoConcept: {
        description: 'An interconnected continuous geometric loop forming an abstract navigation compass and dynamic route nodes.',
        symbolism: 'Represents continuous optimization, precision, and global connectivity.',
        style: 'Minimalist geometric lines with optical weight',
        iconSuggestion: 'Compass / Navigation',
      },
      colors: {
        primary: { name: 'Hyper Blue', hex: '#2563EB', usage: 'Primary brand accent, main call-to-actions, headers' },
        secondary: { name: 'Slate Teal', hex: '#0D9488', usage: 'Status indicators, sustainability metrics, accents' },
        accent: { name: 'Solar Amber', hex: '#F59E0B', usage: 'Live alerts, dynamic route notifications, highlight badges' },
        neutral: { name: 'Carbon Black', hex: '#0F172A', usage: 'Backgrounds, high-contrast typography, structural panels' },
      },
      typography: {
        headingFont: 'Space Grotesk',
        bodyFont: 'Plus Jakarta Sans',
        styleNotes: 'High-contrast modern technical pairings that convey engineering rigor and operational confidence.',
      },
      brandVoice: {
        tone: 'Authoritative, concise, metrics-driven, and empowering.',
        keywords: ['Velocity', 'Precision', 'Autonomous', 'Optimization', 'Reliability'],
        dos: ['Lead with measurable operational impact', 'Use clean engineering terminology', 'Highlight real-time responsiveness'],
        donts: ['Avoid fluffy buzzwords without data', 'Do not sound speculative', 'Never minimize driver safety'],
      },
    },
    marketResearch: {
      marketOverview: {
        summary: 'Rapid e-commerce expectations have made 1-hour and same-day delivery standard, putting enormous pressure on legacy routing systems.',
        tam: '$16.2 Billion (Global Delivery Management Software)',
        sam: '$4.1 Billion (Mid-Market North American & European Fleets)',
        som: '$180 Million (Target capture in 4 years across tier-2 cities)',
        growthRate: '15.8% Annual Growth',
        isAiEstimate: true,
      },
      targetAudience: {
        primaryDemographic: 'Fleet operations directors aged 32-55, VP of Supply Chain, Logistics technology purchasers.',
        keyMotivations: ['Minimizing fuel and overtime labor costs', 'Increasing delivery density', 'Achieving SLA compliance metrics'],
        buyingBehaviors: ['Requires 14-day live sandbox pilot', 'Prioritizes open API and TMS integrations', 'Annual contract value orientation'],
      },
      customerSegments: [
        { name: 'Mid-Market Courier Fleets', description: 'Fleets of 30-150 vans servicing regional B2B/B2C deliveries', size: '42,000 companies in US/EU', priority: 'High' },
        { name: 'Grocery & Dark Store Chains', description: 'Fast fulfillment networks requiring <30 min route adjustments', size: '18,500 operations', priority: 'High' },
        { name: 'Specialty & Medical Logistics', description: 'High-compliance temperature and time-critical transports', size: '9,200 firms', priority: 'Medium' },
      ],
      customerPainPoints: [
        { painPoint: 'Manual or rigid morning dispatch schedules fail within 30 minutes due to congestion', severity: 'Critical', currentWorkaround: 'Dispatchers calling drivers or using Google Maps spreadsheets' },
        { painPoint: 'Spike in fuel costs and unmonitored idling eating 18-25% of net delivery margins', severity: 'High', currentWorkaround: 'Generic fuel cards with no route correlation' },
        { painPoint: 'Customer support overwhelmed by "Where Is My Order?" inquiries', severity: 'High', currentWorkaround: 'Manual email dispatch and phone tag' },
      ],
      competitors: [
        { name: 'Route4Me', strengths: 'Broad market awareness and legacy install base', weaknesses: 'Dated user interface, slow dynamic recalculation on live routes', differentiation: 'OmniRoute recalculates every 90s with machine learning weather/traffic sync', pricingModel: '$49/user/month' },
        { name: 'OptimoRoute', strengths: 'Reliable constraint planning', weaknesses: 'Limited developer APIs and basic telematics tie-in', differentiation: 'Deep IoT OBD2 vehicle sensor telemetry integration', pricingModel: '$35/driver/month' },
        { name: 'Bringg', strengths: 'Enterprise tier brand relationships', weaknesses: 'High enterprise barrier, $50k+ minimum deployments', differentiation: 'Self-serve onboarding for 10-200 vehicle fleets within 10 minutes', pricingModel: 'Enterprise quote only' },
      ],
      opportunities: [
        'EV Fleet transition mandates require range and battery-aware route calculations',
        'Surge in local same-day commerce requires autonomous micro-hub dispatching',
        'Insurance discount partnerships based on safe driving and optimal routing data'
      ],
      risks: [
        { risk: 'Driver resistance to adopting in-cab mobile tracking software', impact: 'High', mitigation: 'Gamified driver experience with fuel savings bonuses and intuitive dark-mode UI' },
        { risk: 'API cost inflation for live mapping and traffic data', impact: 'Medium', mitigation: 'Multi-provider fallback (OSRM + Mapbox + OpenStreetMap cache layers)' },
      ],
      trends: [
        'Decarbonization mandates in major European and US metropolitan zones',
        'Convergence of telematics hardware with cloud software suites',
        'Shift towards sub-2-hour local delivery windows'
      ],
      swot: {
        strengths: ['Real-time 90s neural re-routing algorithm', 'Seamless mobile driver experience', 'Fast 10-minute fleet self-serve setup'],
        weaknesses: ['New entrant brand recognition', 'Dependency on high-fidelity traffic data feeds'],
        opportunities: ['Electric vehicle range routing modules', 'Insurance telematics partner programs'],
        threats: ['Incumbents adding real-time recalculation features', 'Consolidation of large logistics conglomerates'],
      },
      positioningStatement: 'For growing delivery fleets struggling with chaotic traffic and high fuel expenses, OmniRoute AI is the only autonomous dispatch engine that continuously adapts live routes every 90 seconds, cutting cost per drop by 28%.',
    },
    businessModelCanvas: {
      keyPartners: [
        'Telematics & OBD2 hardware vendors (Geotab, Samsara)',
        'Mapping and geo-data providers (Mapbox, OpenStreetMap)',
        'E-commerce platforms (Shopify, WooCommerce, Magento)',
        'Commercial vehicle insurance underwriters'
      ],
      keyActivities: [
        'Proprietary algorithmic routing development & ML maintenance',
        'Real-time traffic telemetry ingestion and processing pipeline',
        'Customer success and driver app usability optimization',
        'B2B sales and outbound account-based marketing'
      ],
      keyResources: [
        'Proprietary graph optimization neural network',
        'Cloud infrastructure with 99.99% uptime SLA',
        'Specialized logistics data science engineering team',
        'High-density historical traffic data sets'
      ],
      valuePropositions: [
        '28% reduction in fuel and mileage expenses',
        '99.4% SLA on-time delivery rate guarantee',
        '2.5 hours saved per driver daily through automated dispatch',
        'Automated live-tracking customer communications'
      ],
      customerRelationships: [
        'Dedicated onboarding engineer for fleets >50 vehicles',
        'In-app live chat and 24/7 technical operations desk',
        'Quarterly ROI and carbon reduction efficiency reviews'
      ],
      channels: [
        'Direct B2B sales targeting Logistics Directors',
        'App store marketplaces (Shopify App Store, Samsara Marketplace)',
        'Industry trade publications and supply chain conferences',
        'Search and LinkedIn account-based advertising'
      ],
      customerSegments: [
        'Mid-tier regional courier & freight carriers (20-250 vans)',
        'Direct-to-consumer e-commerce brand fulfillment fleets',
        'Specialty food, floral, and rapid perishable distributors',
        'High-priority medical specimen logistics providers'
      ],
      costStructure: [
        'Cloud compute and distributed geospatial server infrastructure ($18k/mo)',
        'Mapping data API licenses and map tile egress',
        'Core engineering and product development payroll',
        'Sales commissions and customer acquisition costs'
      ],
      revenueStreams: [
        'SaaS Subscription: Starter ($29/vehicle/mo) and Pro ($49/vehicle/mo)',
        'Enterprise Custom API Tier ($0.03 per optimized stop calculation)',
        'Hardware OBD2 Telematics bundle markup ($12/unit/mo)'
      ],
    },
    launchPlan: {
      preLaunch: [
        { id: 'task-1', title: 'Complete Route Benchmark Algorithm Pilot', description: 'Run test datasets against 5 local logistics fleets with historical CSV routes to prove 25%+ efficiency gains.', priority: 'High', status: 'done', timeline: 'Week 1-3', category: 'Product Validation' },
        { id: 'task-2', title: 'Launch High-Converting Interactive Landing Page', description: 'Create responsive ROI Calculator showing annual fleet savings based on vehicle count.', priority: 'High', status: 'done', timeline: 'Week 3-4', category: 'Marketing' },
        { id: 'task-3', title: 'Publish Driver Companion App to iOS & Android', description: 'Secure production app store approvals for the driver turn-by-turn navigation app.', priority: 'High', status: 'in-progress', timeline: 'Week 4-6', category: 'Engineering' },
        { id: 'task-4', title: 'Recruit 10 Beta Fleets for 30-Day Zero-Risk Trial', description: 'Engage regional courier associations with free 30-day trial in exchange for case studies.', priority: 'Medium', status: 'in-progress', timeline: 'Week 5-7', category: 'Sales' },
      ],
      launch: [
        { id: 'task-5', title: 'Product Hunt & Hacker News Tech Showcase', description: 'Coordinate launch day campaign focusing on the real-time graph algorithm and carbon reduction angle.', priority: 'High', status: 'todo', timeline: 'Launch Week', category: 'Public Relations' },
        { id: 'task-6', title: 'Direct Outbound Outreach to 500 Fleet Managers', description: 'Execute personalized cold email & LinkedIn sequences sharing the published beta case studies.', priority: 'High', status: 'todo', timeline: 'Week 8-10', category: 'Sales' },
        { id: 'task-7', title: 'Launch Shopify & Samsara App Store Listings', description: 'Push live integrations to major ecosystem marketplaces for organic inbound installs.', priority: 'Medium', status: 'todo', timeline: 'Week 9-11', category: 'Partnerships' },
      ],
      postLaunch: [
        { id: 'task-8', title: 'Customer Feedback Sprints & Weekly Driver NPS', description: 'Analyze driver app telemetry and dispatch friction points; push bi-weekly software updates.', priority: 'High', status: 'todo', timeline: 'Month 3', category: 'Product' },
        { id: 'task-9', title: 'Implement EV Range & Charging Station Routing Module', description: 'Add support for commercial electric delivery vans to capture EV incentives and fleet budgets.', priority: 'Medium', status: 'todo', timeline: 'Month 4-6', category: 'R&D' },
        { id: 'task-10', title: 'Scale to Seed Round / Series A Fundraising', description: 'Prepare investor pitch deck with verified ARR, churn <0.5%, and 100+ active enterprise fleets.', priority: 'High', status: 'todo', timeline: 'Month 6', category: 'Finance' },
      ],
    },
    futureVision: {
      oneYearGoal: 'Reach $1.2M ARR across 250 active fleets with 8,000 connected vehicles in North America.',
      threeYearVision: 'Become the standard autonomous routing engine for global last-mile logistics, powering 100,000+ commercial vehicles.',
      moatAndDefensibility: 'Proprietary historical loading-bay dwell time database and neural micro-traffic graph models that improve with every million miles traveled.',
      keyMilestones: [
        { phase: 'Phase 1: Seed Validation', target: '30 live commercial fleets, $25k MRR, <1% monthly churn.' },
        { phase: 'Phase 2: Ecosystem Expansion', target: 'Shopify & Samsara top-rated partner apps, 120 fleets, $100k MRR.' },
        { phase: 'Phase 3: Autonomous Fleet OS', target: 'EV predictive charging routing, European multi-country rollout, $500k MRR.' }
      ]
    }
  },
  {
    id: 'proj-nourishlab',
    name: 'NourishLab',
    industry: 'HealthTech & Personalized Nutrition',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    completionPercentage: 85,
    currentStep: 'launch',
    isFavorite: false,
    ideaInput: {
      rawIdea: 'AI-personalized bio-adaptive meal and supplement delivery based on continuous glucose monitors and lifestyle trackers.',
      industry: 'Health & Wellness',
      targetAudience: 'Biohackers, endurance athletes, and busy professionals with metabolic health goals.',
      locationMarket: 'Tier 1 Metro Cities (US)',
      businessType: 'D2C Subscription',
      context: 'Generic diets fail 88% of users due to individual metabolic and microbiome variations.',
    },
    concept: {
      startupName: 'NourishLab',
      tagline: 'Metabolic Intelligence Delivered',
      oneLinePitch: 'Precision nutrition platform that syncs with CGM and wearable data to formulate personalized functional meals and micro-supplements.',
      problem: 'Standard diets and generic meal kits ignore personal glucose spikes, circadian sleep data, and biomarker variations, leading to energy crashes and abandoned health plans.',
      solution: 'An AI-powered metabolic companion app paired with ready-to-eat chef-crafted meals custom-balanced to stabilize blood sugar and optimize cellular energy.',
      targetCustomers: [
        'Health-conscious professionals seeking sustained energy',
        'Type-2 pre-diabetic individuals taking preventative action',
        'Endurance athletes seeking optimal glycogen recovery',
        'Tech workers managing high-stress cognitive loads'
      ],
      valueProposition: 'Eliminates glucose volatility by 40%, saves 8 hours of weekly meal prep, and personalizes micronutrients dynamically.',
      keyFeatures: [
        'Real-time CGM (Dexcom/Abbott) and Apple Health biomarker sync',
        'AI meal recipe customization and macronutrient adjusting',
        'Weekly chilled vacuum-sealed organic meal delivery',
        'Live metabolic score and bio-feedback coaching engine'
      ],
      businessOpportunity: 'The global personalized nutrition market is projected to reach $23.3B by 2030 at a 15.5% CAGR.',
      revenueOpportunity: '$149/week for 10 tailored meals + app subscription, with 38% gross margin.',
      suggestedIndustry: 'Personalized HealthTech',
      competitiveAdvantage: 'Direct biometric closed-loop algorithm linking real-time glycemic response to culinary ingredient formulation.',
      elevatorPitch: 'NourishLab replaces guesswork with metabolic data, delivering meals tailored specifically to your unique biological blueprint.',
    },
    branding: {
      brandName: 'NourishLab',
      tagline: 'Fuel Your Biology',
      brandStory: 'Your body is not a machine running on generic fuel; it is a complex biological symphony. NourishLab translates your cellular signals into precision nourishment.',
      brandPersonality: ['Clean', 'Scientific', 'Vital', 'Minimalist', 'Empathetic'],
      mission: 'To make metabolic vitality effortlessly accessible to every individual.',
      vision: 'A world where chronic metabolic disorders are eradicated through personalized nutrition.',
      logoConcept: {
        description: 'A stylized botanical leaf morphing seamlessly into an organic DNA double-helix.',
        symbolism: 'Unification of pure natural sustenance and cutting-edge genetic science.',
        style: 'Modern organic clean lines with gradient warmth',
        iconSuggestion: 'Leaf / Sparkles / HeartPulse',
      },
      colors: {
        primary: { name: 'Vital Sage', hex: '#059669', usage: 'Core brand identity, organic badges, primary CTAs' },
        secondary: { name: 'Warm Ochre', hex: '#D97706', usage: 'Energy metrics, metabolic highlights, warmth' },
        accent: { name: 'Deep Indigo', hex: '#4338CA', usage: 'Biomarker charts, clinical science sections, typography' },
        neutral: { name: 'Alabaster White', hex: '#FAFAF9', usage: 'Clean backgrounds, airy cards, tactile packaging' },
      },
      typography: {
        headingFont: 'Space Grotesk',
        bodyFont: 'Plus Jakarta Sans',
        styleNotes: 'Crisp, editorial, and scientifically credible with spacious breathability.',
      },
      brandVoice: {
        tone: 'Scientific yet warm, encouraging, educational, and precise.',
        keywords: ['Biomarkers', 'Vitality', 'Adaptive', 'Precision', 'Nourishment'],
        dos: ['Explain the biological why', 'Celebrate steady progress over quick fixes', 'Cite peer-reviewed research'],
        donts: ['Never promote crash diets', 'Avoid clinical medical jargon that intimidates', 'Do not shame food choices'],
      },
    },
    marketResearch: {
      marketOverview: {
        summary: 'Wearable health tracking adoption has exploded, creating immense consumer demand for actionable nutrition that matches their data.',
        tam: '$23.3 Billion (Global Personalized Nutrition)',
        sam: '$3.8 Billion (US Health-Conscious Urban Professionals)',
        som: '$95 Million (Initial 5 metro launch zones)',
        growthRate: '15.5% CAGR',
        isAiEstimate: true,
      },
      targetAudience: {
        primaryDemographic: 'Ages 26-48, household income $100k+, fitness tracker and smart watch owners.',
        keyMotivations: ['Sustained afternoon focus without caffeine crashes', 'Optimizing body composition', 'Preventative metabolic longevity'],
        buyingBehaviors: ['High subscription willingness for proven outcomes', 'Active reader of health podcasts and newsletters'],
      },
      customerSegments: [
        { name: 'High-Performance Professionals', description: 'Tech, finance, and legal workers seeking mental stamina', size: '4.2M individuals', priority: 'High' },
        { name: 'Preventative Wellness Seekers', description: 'Family history of diabetes focusing on insulin sensitivity', size: '6.8M individuals', priority: 'High' },
        { name: 'Endurance & Strength Athletes', description: 'Marathoners, triathletes, and CrossFit practitioners', size: '2.1M individuals', priority: 'Medium' },
      ],
      customerPainPoints: [
        { painPoint: 'Meal kits require 45 minutes of cooking and cleanup after tiring workdays', severity: 'High', currentWorkaround: 'Takeout salads and random protein bars' },
        { painPoint: 'Conflicting nutrition advice leaves users confused about what actually works for them', severity: 'Critical', currentWorkaround: 'Trial and error with Keto, Paleo, and intermittent fasting' },
      ],
      competitors: [
        { name: 'Zoë Nutrition', strengths: 'Strong scientific team and gut microbiome testing', weaknesses: 'Only provides recommendations, does not deliver cooked meals', differentiation: 'NourishLab provides the actual chef-prepared ready meals delivered to door', pricingModel: '$354 testing + $40/mo' },
        { name: 'Factor75', strengths: 'Large ready-meal logistics network', weaknesses: 'Generic high-sodium macro profiles, zero biometric personalization', differentiation: 'Dynamic biometric adjustment based on live glucose and sleep', pricingModel: '$13.50/meal' },
      ],
      opportunities: ['Integrations with Whoop, Oura Ring, and Apple Health', 'Corporate wellness perk programs for high-stress employers'],
      risks: [
        { risk: 'Cold-chain perishable shipping logistics costs and spoilage', impact: 'High', mitigation: 'Local ghost-kitchen fulfillment hubs within 40-mile metro radii' }
      ],
      trends: ['Continuous glucose monitors moving over-the-counter (FDA approved)', 'Rise of preventative longevity medicine (Peter Attia, Huberman)'],
      swot: {
        strengths: ['True closed-loop biometric to culinary personalization', 'Ready-to-eat gourmet organic recipes', 'High customer retention'],
        weaknesses: ['Perishable food supply chain complexity', 'Higher price point than mass meal kits'],
        opportunities: ['Corporate executive wellness programs', 'Physician and endocrinologist referral channels'],
        threats: ['Established grocery delivery giants entering personalized nutrition'],
      },
      positioningStatement: 'For busy professionals tired of afternoon energy crashes and generic diets, NourishLab is the first biometric meal delivery service that cooks precision food calibrated directly to your glucose and wearable data.',
    },
    businessModelCanvas: {
      keyPartners: ['Organic regional farm cooperatives', 'Dexcom & Abbott CGM sensor distributors', 'Registered Dietitians & Sports Endocrinologists', 'Commercial ghost kitchen networks'],
      keyActivities: ['Biometric algorithm refinement', 'Gourmet meal formulation and nutrient testing', 'Perishable eco-friendly packaging and cold logistics', 'Subscriber health concierge support'],
      keyResources: ['Proprietary Glycemic Response Prediction Model', 'Central culinary commissary facility', 'Certified nutrition coaching team', 'Software companion application'],
      valuePropositions: ['Steady all-day focus with zero post-lunch brain fog', '8 hours saved per week on shopping, cooking, and logging', 'Scientifically validated biomarker improvements within 30 days'],
      customerRelationships: ['Weekly automated metabolic insights digest', 'In-app messaging with assigned nutritionists', 'Community challenges and longevity workshops'],
      channels: ['Health and longevity podcast sponsorships', 'Physician and functional medicine referrals', 'Targeted Instagram and TikTok organic recipe breakdowns'],
      customerSegments: ['Metabolic health enthusiasts', 'Time-constrained urban executives', 'Pre-diabetic adults seeking lifestyle reversal'],
      costStructure: ['Organic ingredients and culinary labor (42% COGS)', 'Biodegradable vacuum-insulated packaging ($6.50/box)', 'Cold-chain same-day courier dispatch', 'Software engineering and data security'],
      revenueStreams: ['Weekly meal subscription ($139 - $189/week)', 'Metabolic Coach 1-on-1 add-on ($49/month)', 'Biomarker testing kit upsell ($99 one-time)'],
    },
    launchPlan: {
      preLaunch: [
        { id: 'task-nl-1', title: '50-Person Closed Beta with CGM Biomarker Tracking', description: 'Validate average 34% reduction in glucose spikes over 30 days of NourishLab meals.', priority: 'High', status: 'done', timeline: 'Month 1', category: 'Clinical Proof' },
        { id: 'task-nl-2', title: 'Secure Certified Organic Ghost Kitchen in Launch Metro', description: 'Finalize lease and health permits for San Francisco commercial kitchen hub.', priority: 'High', status: 'done', timeline: 'Month 2', category: 'Operations' },
        { id: 'task-nl-3', title: 'Influencer Seeding with 25 Longevity Creators', description: 'Send personalized 2-week meal drops to health podcast hosts and biohackers.', priority: 'High', status: 'in-progress', timeline: 'Month 2-3', category: 'Growth' },
      ],
      launch: [
        { id: 'task-nl-4', title: 'San Francisco & Bay Area Public Launch', description: 'Open first 500 subscription slots with launch discount and free CGM sensor.', priority: 'High', status: 'todo', timeline: 'Launch Day', category: 'Sales' },
        { id: 'task-nl-5', title: 'Publish 30-Day Clinical Case Study Whitepaper', description: 'Release verified blood sugar data and customer testimonials on TechCrunch and Medium.', priority: 'Medium', status: 'todo', timeline: 'Week 2', category: 'PR' },
      ],
      postLaunch: [
        { id: 'task-nl-6', title: 'Expand Culinary Hub to New York & Austin', description: 'Replicate kitchen playbook in next two highest-demand metro waitlists.', priority: 'High', status: 'todo', timeline: 'Month 6', category: 'Expansion' },
      ],
    },
    futureVision: {
      oneYearGoal: 'Achieve 2,500 active weekly subscribers ($18M run rate) with positive unit economics across 3 major metros.',
      threeYearVision: 'Become the global leader in clinical culinary medicine, integrating with insurer wellness reimbursements.',
      moatAndDefensibility: 'World largest dataset mapping individual food ingredient combinations to real-time continuous glycemic curves.',
      keyMilestones: [
        { phase: 'Year 1', target: '3 Metros, 2,500 active subscribers, $18M ARR.' },
        { phase: 'Year 2', target: '10 Metros, HSA/FSA reimbursement approval, nationwide delivery.' },
        { phase: 'Year 3', target: 'Clinical trial publication with top university hospital.' }
      ]
    }
  }
];
