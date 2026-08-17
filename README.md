# MASTER PROMPT — AI STARTUP STUDIO

You are a senior full-stack React developer, UI/UX designer, software architect, and AI integration specialist.

Build a **production-ready AI-powered SaaS web application called "AI Startup Studio"**.

The application must help users transform a startup idea into a complete startup plan using Generative AI.

---

## 1. TECH STACK

Use exactly:

* React.js
* Vite
* JavaScript ES6+
* Tailwind CSS
* React Router
* Context API for global state management
* Gemini API for AI generation
* LocalStorage or IndexedDB for offline persistence
* jsPDF or an equivalent client-side PDF library for PDF export

The application must be compatible with deployment on:

* Vercel
* Netlify

Do NOT introduce unnecessary frameworks.

---

# 2. DESIGN REQUIREMENTS

Create a premium, modern SaaS interface inspired by:

* Linear
* Notion
* Arc
* Craft
* Apple
* Framer

Design principles:

* Clean
* Minimal
* Professional
* Spacious
* Modern typography
* Rounded cards
* Subtle shadows
* Smooth transitions
* Excellent spacing
* Responsive design
* Mobile-first
* Desktop optimized
* Accessible UI

Provide:

* Light theme
* Dark theme
* System theme detection

Use a consistent design system throughout the application.

Avoid excessive gradients, excessive animations, cluttered layouts, and generic-looking AI interfaces.

---

# 3. MAIN APPLICATION WORKFLOW

The main workflow must be:

User opens application
↓
Dashboard
↓
Enter startup idea
↓
Generate startup concept using AI
↓
Generate branding
↓
Generate market research
↓
Generate Business Model Canvas
↓
Generate launch strategy
↓
Review complete startup plan
↓
Presentation Mode
↓
Export PDF
↓
Share project

---

# 4. REQUIRED PAGES

Create these pages:

1. Dashboard
2. AI Startup Idea Generator
3. Branding Generator
4. Market Research
5. Business Model Canvas
6. Launch Planner
7. Presentation Mode
8. Prompt Library
9. Settings

Use React Router for navigation.

---

# 5. DASHBOARD

Create a premium dashboard containing:

* Welcome section
* Create New Startup button
* Recent projects
* Startup progress indicator
* Quick actions
* Recent AI generations
* Project cards
* Completion percentage

Example progress:

Idea → Branding → Research → Business Model → Launch

Each project card should show:

* Startup name
* Industry
* Last updated
* Completion percentage
* Open button

---

# 6. AI STARTUP IDEA GENERATOR

Create a form with:

* Startup idea input
* Industry
* Target audience
* Location/market
* Business type
* Optional additional context

Add:

"Generate Startup Concept"

When clicked, call Gemini API.

Generate structured information:

* Startup Name
* One-line Pitch
* Problem
* Solution
* Target Customers
* Value Proposition
* Key Features
* Business Opportunity
* Revenue Opportunity
* Suggested Industry
* Competitive Advantage

Display the result in premium cards.

Include:

* Regenerate
* Edit
* Save
* Copy

Do NOT use fake hardcoded AI results when Gemini API is configured.

---

# 7. BRANDING GENERATOR

Use the startup concept as input.

Generate:

* Brand Name
* Tagline
* Brand Story
* Brand Personality
* Mission
* Vision
* Logo Concept
* Primary Color
* Secondary Color
* Accent Color
* Typography Suggestions
* Brand Voice

Show the branding system visually.

Include:

* Regenerate
* Save
* Copy

---

# 8. MARKET RESEARCH

Generate structured market research.

Sections:

* Market Overview
* Target Audience
* Customer Segments
* Customer Pain Points
* Competitor Analysis
* Market Opportunities
* Market Risks
* Trends
* SWOT-style analysis
* Suggested positioning

Clearly label AI-generated information as AI-generated insights where appropriate.

Do not falsely claim that generated information is verified real-world market data.

If external/current market data is not available, clearly indicate that the information is an AI estimate or hypothesis.

---

# 9. BUSINESS MODEL CANVAS

Create an interactive Business Model Canvas with the nine standard sections:

1. Key Partners
2. Key Activities
3. Key Resources
4. Value Propositions
5. Customer Relationships
6. Customer Segments
7. Channels
8. Cost Structure
9. Revenue Streams

Allow users to:

* Edit
* Add items
* Delete items
* Save changes

Make the canvas responsive.

---

# 10. LAUNCH PLANNER

Create a launch strategy divided into:

## Pre-Launch

Tasks:

* Market validation
* Landing page
* Branding
* MVP preparation
* Early users

## Launch

Tasks:

* Product launch
* Social media
* Email campaign
* Community outreach
* Product announcement

## Post-Launch

Tasks:

* Feedback collection
* Analytics
* Product improvements
* Customer retention

Each task should have:

* Title
* Description
* Priority
* Status
* Suggested timeline

Allow users to mark tasks complete.

---

# 11. PRESENTATION MODE

Create a presentation-style view of the generated startup.

Slides:

1. Startup Overview
2. Problem
3. Solution
4. Target Market
5. Product
6. Branding
7. Market Research
8. Business Model
9. Launch Strategy
10. Future Vision

Provide:

* Next
* Previous
* Fullscreen
* Exit Presentation

Make the presentation visually polished.

---

# 12. PDF EXPORT

Create a "Export PDF" feature.

The PDF should contain:

* Startup name
* Executive summary
* Problem
* Solution
* Target audience
* Branding
* Market research
* Business Model Canvas
* Launch strategy
* Future vision

The exported PDF should have:

* Professional typography
* Sections
* Page numbers
* Clean spacing
* Professional layout

---

# 13. SHAREABLE PROJECTS

Implement project sharing architecture.

Each saved project should have a unique project ID.

Provide:

* Share button
* Copy project link
* Shareable read-only project view

If a backend is not available, implement a local/demo sharing architecture and clearly document the limitation.

Do not pretend that a local-only project is publicly accessible.

---

# 14. OFFLINE SUPPORT

Implement offline support using:

* LocalStorage or IndexedDB

Persist:

* Projects
* Startup data
* Branding
* Market research
* Business model
* Launch plan
* User settings

Show an offline indicator when the browser is offline.

Previously saved projects must remain accessible offline.

---

# 15. PROMPT LIBRARY

Create a Prompt Library page.

Include reusable AI prompts for:

* Startup ideas
* Branding
* Market research
* Business models
* Launch strategies
* Pitch decks
* Customer personas

Allow users to:

* View prompt
* Copy prompt
* Save favorite prompts

---

# 16. CONTEXT API

Create a global application context.

Manage:

* Current project
* Projects
* Theme
* AI generation state
* Startup idea
* Branding
* Market research
* Business model
* Launch plan

Avoid prop drilling.

Create reusable hooks such as:

useApp()

or

useStartup()

---

# 17. PROJECT ARCHITECTURE

Use this folder structure:

src/
├── components/
├── context/
├── pages/
├── services/
├── utils/
├── hooks/
├── assets/
├── layouts/
├── data/
├── App.jsx
├── main.jsx

Suggested components:

components/
├── Navbar
├── Sidebar
├── Button
├── Card
├── Modal
├── LoadingState
├── EmptyState
├── ProjectCard
├── ProgressBar
├── SectionHeader
├── ThemeToggle

services/

├── geminiService.js
├── pdfService.js
└── storageService.js

context/

└── StartupContext.jsx

---

# 18. GEMINI API INTEGRATION

Create a dedicated AI service.

Do NOT put API logic directly inside UI components.

Create:

services/geminiService.js

Create reusable functions:

generateStartupIdea()
generateBranding()
generateMarketResearch()
generateBusinessModel()
generateLaunchPlan()

Use environment variables.

Example:

VITE_GEMINI_API_KEY

NEVER hardcode the API key inside source code.

Add:

.env.example

with:

VITE_GEMINI_API_KEY=your_api_key_here

Add .env to .gitignore.

---

# 19. AI OUTPUT FORMAT

Ask Gemini to return structured JSON whenever possible.

Validate AI responses before displaying them.

Handle:

* Invalid JSON
* Empty responses
* API errors
* Rate limits
* Network errors

Show user-friendly error messages.

Never crash the application because of malformed AI output.

---

# 20. LOADING STATES

Every AI generation must have a polished loading state.

Examples:

"Generating your startup concept..."

"Building your brand..."

"Analyzing your market..."

"Creating your business model..."

"Planning your launch..."

Disable duplicate generation requests while generation is running.

---

# 21. ERROR HANDLING

Implement proper error handling.

Display friendly messages such as:

"Something went wrong. Please try again."

"AI service is temporarily unavailable."

"Please check your internet connection."

Never expose raw API errors directly to users.

---

# 22. PERFORMANCE

Implement:

* Lazy loading
* React.lazy()
* Suspense
* Code splitting
* Memoization where useful
* Efficient Context usage
* Lazy lists where appropriate
* Avoid unnecessary re-renders

Do not optimize prematurely where it harms readability.

---

# 23. ACCESSIBILITY

Support:

* Keyboard navigation
* Proper button labels
* Accessible form labels
* Sufficient contrast
* Focus states
* Semantic HTML
* Screen-reader-friendly structure

---

# 24. RESPONSIVE DESIGN

The application must work properly on:

* Mobile
* Tablet
* Laptop
* Desktop

Do not create layouts that break on small screens.

---

# 25. EMPTY STATES

Every page must have a meaningful empty state.

Example:

"No startup projects yet."

"Create your first startup idea to get started."

Include an appropriate CTA.

---

# 26. SAMPLE DATA

Use sample/demo data ONLY for initial UI demonstration.

Once Gemini API is configured, AI-generated content must replace mock generation.

Clearly separate:

* Demo data
* Real AI data

---

# 27. SECURITY

Never expose secrets.

Use:

.env

for API configuration.

Add .env to .gitignore.

Never commit:

* API keys
* passwords
* private credentials

---

# 28. README

Create a professional README containing:

* Project title
* Description
* Features
* Tech stack
* Installation
* Environment variables
* Gemini API setup
* Development commands
* Build command
* Deployment instructions
* Folder structure
* Screenshots section
* Future scope

---

# 29. ARCHITECTURE DOCUMENTATION

Create documentation explaining:

* Application architecture
* Component architecture
* Context API
* AI service
* Data flow
* Storage
* PDF generation
* Offline support
* Performance strategy

---

# 30. AI PROMPT LIBRARY DOCUMENTATION

Create a document containing all important prompts used by the application.

Explain:

* Prompt purpose
* Input
* Expected output
* JSON structure
* Error handling

---

# 31. TESTING

Implement a reasonable testing strategy.

Test:

* UI components
* Context state
* AI service error handling
* Project saving
* Project loading
* PDF export
* Main user workflow

Document the testing approach in README.

---

# 32. CODE QUALITY

Follow these rules:

* Clean readable code
* Reusable components
* Small functions
* Meaningful variable names
* No unnecessary duplication
* No TODO placeholders
* No broken imports
* No unused imports
* No console errors
* No fake functionality presented as completed functionality

---

# 33. FINAL QUALITY CHECK

Before considering the project complete, verify:

* npm install works
* npm run dev works
* npm run build works
* No compilation errors
* No broken routes
* No missing components
* No missing imports
* Responsive UI works
* Dark mode works
* AI generation works when API key is configured
* Offline saved projects work
* PDF export works
* Main workflow works

---

# 34. IMPORTANT DEVELOPMENT RULE

Do NOT generate the entire project as one huge uncontrolled response.

Build the application systematically.

First create:

1. Project setup
2. Folder structure
3. Global styles
4. Routing
5. Layout
6. Dashboard
7. Startup Idea Generator

Then progressively implement:

8. Branding
9. Market Research
10. Business Model
11. Launch Planner
12. Presentation Mode
13. PDF Export
14. Sharing
15. Offline Support
16. Prompt Library
17. Testing
18. Documentation
19. Deployment preparation

After each major stage, verify that the application still builds successfully.

If you need to modify an existing file, preserve its existing functionality unless the change is required.

Do not delete working features just to simplify implementation.

---

# 35. FINAL DELIVERABLE

The final application should be a polished, responsive, production-oriented **AI Startup Studio SaaS platform** where a user can go from:

STARTUP IDEA
→ AI CONCEPT
→ BRANDING
→ MARKET RESEARCH
→ BUSINESS MODEL
→ LAUNCH PLAN
→ PRESENTATION
→ PDF EXPORT
→ SHARE

The result should look like a real premium SaaS product rather than a basic student CRUD project.

Start by creating the React + Vite project structure and implement the foundation first.
