---
title: "Building CompetitorScope: How I Created a Real Competitor Analysis Tool as a Marketing Professional"
slug: "building-competitorscope-real-competitor-analysis-tool"
date: "2025-01-12"
author: "Jonathon"
excerpt: "The real story of building CompetitorScope - a React/TypeScript competitor analysis platform that integrates Google PageSpeed, Firecrawl, Claude AI, and more. Learn how Claude Code helped a marketer create a production-ready SaaS tool."
category: "AI Development"
tags:
  - "Competitor Analysis"
  - "React Development"
  - "Claude Code"
  - "Marketing Technology"
  - "TypeScript"
  - "Vite"
  - "API Integration"
  - "SaaS Development"
  - "Firecrawl"
heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&crop=center"
featured: true
status: "published"
seo:
  title: "Building CompetitorScope: Real Competitor Analysis Tool Development | Claude Code"
  description: "Learn how a marketing professional built CompetitorScope - a React-based competitor analysis platform with real APIs like Google PageSpeed, Firecrawl, and Claude AI. The complete development story."
  keywords:
    - "CompetitorScope development"
    - "competitor analysis tool"
    - "React TypeScript SaaS"
    - "Claude Code development"
    - "Firecrawl integration"
    - "Google PageSpeed API"
    - "marketing tool development"
    - "Vite React project"
    - "API integration tutorial"
---

# Building CompetitorScope: How I Created a Real Competitor Analysis Tool as a Marketing Professional

## The Real Story Behind CompetitorScope

Let me tell you the actual story of building [CompetitorScope](https://www.competitorscope.com) - not a fictional narrative, but the real journey of a marketing professional learning to code and building a production SaaS tool with Claude Code's help.

## The Problem I Was Solving

As a marketer, I was frustrated with existing competitor analysis tools:
- **SEMrush and Ahrefs**: $100-500/month and overwhelming for basic needs
- **Manual Analysis**: Hours spent checking competitors, taking screenshots, copying data
- **Shallow Insights**: Most tools just show numbers, not actionable intelligence

I wanted something that would:
1. Show me real performance data (not estimates)
2. Extract actual content and SEO elements
3. Provide AI-powered insights that matter
4. Cost a fraction of enterprise tools

## The Tech Stack I Actually Built With

After exploring options with Claude Code, here's what CompetitorScope actually uses:

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for the UI (with glassmorphism design)
- **Recharts** for data visualization
- **React Router** for navigation

### APIs & Services (The Real Ones)
1. **Google PageSpeed Insights API** - Real performance metrics and Core Web Vitals
2. **Firecrawl API** - Website content extraction and crawling
3. **Claude AI (Anthropic)** - Strategic analysis and SEO insights
4. **Chrome UX Report API** - Real user experience data
5. **Archive.org Wayback Machine** - Historical website tracking
6. **Moz API** (v3) - Domain authority and backlink data

### Deployment
- **Vercel** for hosting
- **GitHub** for version control
- **Stripe** for payments (Professional and Business tiers)

## The Development Journey with Claude Code

### Starting Point: Zero React Experience

I came into this project knowing marketing and having "vibe coded" some basic scripts, but I'd never built a React app. Here's how Claude Code helped:

#### 1. Project Setup
```bash
# Claude Code helped me understand modern tooling
npm create vite@latest competitorscope -- --template react-ts
cd competitorscope
npm install
```

Claude Code explained why Vite over Create React App, why TypeScript matters, and how to structure a modern React project.

#### 2. Understanding React Components

My first component attempt was messy. Claude Code taught me proper patterns:

```typescript
// My initial attempt (messy)
function CompetitorInput() {
  let competitors = []
  function addCompetitor(url) {
    competitors.push(url)
    // This doesn't work - React doesn't re-render!
  }
}

// Claude Code's teaching (proper React)
function CompetitorInput() {
  const [competitors, setCompetitors] = useState<string[]>([])
  
  const addCompetitor = (url: string) => {
    setCompetitors(prev => [...prev, url])
  }
  
  // Proper controlled components, event handling, etc.
}
```

#### 3. API Integration Challenges

The biggest learning curve was integrating multiple APIs. Claude Code helped create a service architecture:

```typescript
// ApiService.ts - The actual structure we use
export class ApiService {
  static async analyzeCompetitor(
    domain: string,
    progressCallback?: (update: ProgressUpdate) => void
  ): Promise<EnhancedCompetitorData> {
    // Check cache first
    const cached = await cacheManager.get(domain)
    if (cached) return cached
    
    // Parallel API calls for efficiency
    const [firecrawlData, pageSpeedData, chromeUXData] = await Promise.all([
      this.fetchWithProgress('firecrawl', () => FirecrawlService.analyze(domain), progressCallback),
      this.fetchWithProgress('pagespeed', () => GooglePageSpeedService.analyze(domain), progressCallback),
      this.fetchWithProgress('chrome-ux', () => ChromeUXReportService.analyze(domain), progressCallback)
    ])
    
    // AI enhancement
    const aiInsights = await ClaudeService.generateInsights(combinedData)
    
    return enhancedData
  }
}
```

## Real Technical Challenges I Faced

### 1. The Claude API Authentication Bug

One of my biggest debugging sessions was fixing Claude AI insights. They weren't showing up in production. After hours of debugging with Claude Code, we discovered:

```javascript
// WRONG - What I was using
headers: {
  'Authorization': `Bearer ${apiKey}` // This doesn't work with Anthropic!
}

// CORRECT - What Claude API actually needs
headers: {
  'x-api-key': apiKey,
  'anthropic-version': '2023-06-01'
}
```

This single header issue took days to diagnose but taught me about API authentication patterns.

### 2. Rate Limiting and Cost Management

With real APIs come real costs. Claude Code helped implement intelligent caching:

```typescript
// CacheManager.ts - Saving thousands in API costs
export class CacheManager {
  private static CACHE_DURATION = 3600000 // 1 hour
  
  static async get(key: string): Promise<any> {
    const cached = localStorage.getItem(`cache_${key}`)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > this.CACHE_DURATION) {
      localStorage.removeItem(`cache_${key}`)
      return null
    }
    
    return data
  }
}
```

This simple caching reduced API costs by 80%!

### 3. Handling API Failures Gracefully

Real-world APIs fail. Claude Code taught me defensive programming:

```typescript
// Demo mode fallback when APIs are unavailable
if (!FirecrawlService.hasApiKey() || isError) {
  console.log('Using demo mode - no API keys configured')
  return MockDataService.generateCompetitorData(domain)
}
```

## The Features That Actually Shipped

### 1. Performance Analysis (Google PageSpeed)
- Lighthouse scores (Performance, SEO, Accessibility, Best Practices)
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Mobile vs Desktop comparison
- Specific optimization recommendations

### 2. SEO Intelligence (Firecrawl + Claude AI)
- Title, meta description, heading extraction
- Content analysis (word count, readability)
- Claude AI insights for strategic recommendations
- Technical SEO checks (robots.txt, sitemap, SSL)

### 3. Social Media Analysis
- Automatic extraction of social profiles
- Platform presence scoring
- Engagement indicators
- Competitive opportunities

### 4. Historical Tracking (Archive.org)
- Website evolution over time
- Major redesign detection
- Content strategy changes

### 5. Contact Intelligence
- Email extraction (support, sales, info)
- Phone number detection
- Business address parsing
- Company size indicators

## The Business Model That Emerged

CompetitorScope uses a freemium model with real Stripe integration:

### Free Tier
- 10 analyses per month
- Demo mode (no API keys needed)
- All core features

### Starter ($19/month)
- 50 analyses
- Email reports
- 7-day data retention

### Professional ($49/month) 
- 200 analyses
- API access
- White-label reports
- 30-day retention

### Business ($99/month)
- 1000 analyses
- Bulk tools
- Custom branding
- 90-day retention

## Lessons Learned Building a Real SaaS

### 1. Start with the Free Tier
Making CompetitorScope work without API keys (demo mode) was crucial. Users can try it immediately without setup.

### 2. Error Messages Matter
Claude Code taught me to write helpful error messages:
```typescript
// Bad
throw new Error('Failed')

// Good
throw new Error(`Failed to analyze ${domain}: API rate limit exceeded. Try again in ${retryAfter} seconds.`)
```

### 3. Performance is a Feature
React can be slow if you're not careful. Claude Code helped optimize:
- Lazy loading with React.lazy()
- Proper memo usage
- Efficient state management
- Bundle size optimization (890KB total)

### 4. Security Can't Be an Afterthought
Real API keys need real security:
- Environment variables only (never in client code)
- Server-side API routes for sensitive operations
- Proper CORS configuration
- Rate limiting to prevent abuse

## The Role of Claude Code

Claude Code wasn't just a code generator - it was my programming mentor:

1. **Architecture Decisions**: Explained trade-offs between different approaches
2. **Debugging Partner**: Helped diagnose issues like the authentication bug
3. **Code Reviews**: Improved my messy code into production-ready solutions
4. **Teaching Moments**: Every interaction taught me programming concepts
5. **Best Practices**: Security, performance, error handling - all built in

Example of Claude Code's teaching approach:
```typescript
// Me: "How do I update the progress bar?"

// Claude Code: "Let me show you the React way with proper types and error handling:"

interface ProgressUpdate {
  step: AnalysisStep
  progress: number
  message: string
  details?: Partial<EnhancedCompetitorData>
}

const updateProgress = useCallback((update: ProgressUpdate) => {
  setProgress(prev => ({
    ...prev,
    [update.step]: {
      progress: update.progress,
      message: update.message,
      status: update.progress === 100 ? 'completed' : 'in-progress'
    }
  }))
}, [])
```

## Current Status and Future Plans

CompetitorScope is live at [competitorscope.com](https://www.competitorscope.com) with:
- Real users analyzing competitors daily
- All APIs working in production
- Positive user feedback on the AI insights
- Growing revenue from paid tiers

### What's Next
1. **Competitor Monitoring**: Alert when competitors change
2. **Bulk Analysis**: Analyze multiple competitors at once
3. **API Webhooks**: Let users integrate with their tools
4. **More AI Features**: Predictive analytics, content suggestions

## Advice for Marketers Who Want to Build

1. **Start Small**: My first version just called one API. Build incrementally.
2. **Use TypeScript**: Yes, it's harder initially, but it catches so many bugs.
3. **Learn React Properly**: Don't just copy-paste. Understand hooks and state.
4. **APIs Cost Money**: Plan for this. Implement caching early.
5. **Ship Early**: CompetitorScope wasn't perfect when I launched. That's okay.

## The Code is Real

Unlike fictional case studies, you can actually:
- Try CompetitorScope at [competitorscope.com](https://www.competitorscope.com)
- See the 180+ test files that ensure it works
- Use the tool in demo mode without any setup
- Sign up for a real account with Stripe

## Conclusion: You Can Build Too

Six months ago, I couldn't build a React component. Today, CompetitorScope is a real SaaS tool helping real businesses analyze their competition. The difference? Claude Code as my programming partner.

The future of software isn't about replacing developers - it's about empowering domain experts to build solutions. If you understand a problem deeply and have Claude Code to guide you, you can build the solution.

The code is real. The tool is live. The journey continues.

---

*Want to see CompetitorScope in action? Visit [competitorscope.com](https://www.competitorscope.com) and try the demo mode - no API keys required. Have questions about building your own SaaS tool? I'm always happy to help fellow marketers become builders.*