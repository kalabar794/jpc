export const competitors = [
  {
    name: 'ProSites',
    url: 'https://prosites.com',
    selectors: {
      title: 'title',
      metaDescription: 'meta[name="description"]',
      h1: 'h1',
      h2: 'h2',
      pricing: '.pricing, .plans, [class*="price"]',
      clientCount: '[class*="client"], [class*="customer"]',
      awards: '[class*="award"], [class*="testimonial"]'
    },
    monitorPages: [
      '/',
      '/plans',
      '/about',
      '/features'
    ],
    keyMetrics: [
      'client_count',
      'pricing_changes',
      'new_features',
      'awards_mentions'
    ]
  },
  {
    name: 'SmileShop Marketing',
    url: 'https://smileshopmarketing.com',
    selectors: {
      title: 'title',
      metaDescription: 'meta[name="description"]',
      h1: 'h1',
      h2: 'h2',
      services: '.services, [class*="service"]',
      partnership: '[class*="partner"], [class*="certification"]',
      team: '.team, [class*="team"]'
    },
    monitorPages: [
      '/',
      '/services',
      '/about',
      '/blog'
    ],
    keyMetrics: [
      'partnership_announcements',
      'service_offerings',
      'team_growth',
      'blog_frequency'
    ]
  },
  {
    name: 'Golden Proportions Marketing',
    url: 'https://goldenproportions.com',
    selectors: {
      title: 'title',
      metaDescription: 'meta[name="description"]',
      h1: 'h1',
      h2: 'h2',
      testimonials: '.testimonial, [class*="testimonial"]',
      results: '[class*="result"], [class*="metric"]',
      services: '.services, [class*="service"]'
    },
    monitorPages: [
      '/',
      '/services',
      '/results',
      '/testimonials'
    ],
    keyMetrics: [
      'client_testimonials',
      'results_metrics',
      'service_updates',
      'pricing_transparency'
    ]
  },
  {
    name: 'Roadside Dental Marketing',
    url: 'https://roadsidedentalmarketing.com',
    selectors: {
      title: 'title',
      metaDescription: 'meta[name="description"]',
      h1: 'h1',
      h2: 'h2',
      branding: '[class*="logo"], [class*="brand"]',
      navigation: 'nav, .navigation',
      messaging: '[class*="message"], [class*="tagline"]'
    },
    monitorPages: [
      '/',
      '/about',
      '/services',
      '/contact'
    ],
    keyMetrics: [
      'rebrand_progress',
      'url_redirects',
      'messaging_changes',
      'client_retention'
    ]
  }
];

export const alertTriggers = {
  critical: [
    'new_service_launch',
    'partnership_announcement',
    'pricing_model_change',
    'acquisition_merger',
    'complete_redesign'
  ],
  high: [
    'new_case_studies',
    'award_recognition',
    'executive_hire',
    'technology_change',
    'major_client_win'
  ],
  medium: [
    'blog_posts',
    'social_campaigns',
    'testimonial_updates',
    'design_changes',
    'navigation_updates'
  ],
  low: [
    'meta_description_changes',
    'footer_updates',
    'copyright_changes',
    'image_updates',
    'minor_text_edits'
  ]
};

export const competitorSettings = {
  screenshotOptions: {
    fullPage: true,
    quality: 80,
    type: 'jpeg'
  },
  browserOptions: {
    headless: process.env.HEADLESS === 'true',
    timeout: parseInt(process.env.BROWSER_TIMEOUT) || 30000,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  delays: {
    betweenRequests: parseInt(process.env.COMPETITOR_DELAY) || 3000,
    pageLoad: 2000,
    screenshot: 1000
  }
};