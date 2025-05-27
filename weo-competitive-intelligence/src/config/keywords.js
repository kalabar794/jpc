export const keywords = {
  primary: [
    'dental marketing agency',
    'dental marketing company',
    'dental practice marketing',
    'dentist marketing services',
    'dental SEO services',
    'dental website design',
    'dental digital marketing',
    'dental marketing consultant',
    'dental marketing experts',
    'dental marketing firm'
  ],
  
  serviceSpecific: [
    'dental SEO company',
    'dental PPC management',
    'dental social media marketing',
    'dental website development',
    'dental logo design',
    'dental brand development',
    'dental reputation management',
    'dental email marketing',
    'dental content marketing',
    'dental marketing strategy'
  ],
  
  specialty: [
    'orthodontist marketing',
    'pediatric dentist marketing',
    'oral surgeon marketing',
    'endodontist marketing',
    'periodontist marketing',
    'cosmetic dentist marketing',
    'implant dentist marketing',
    'prosthodontist marketing',
    'dental specialist marketing',
    'DSO marketing services'
  ],
  
  localService: [
    'dental marketing agency near me',
    'best dental marketing companies',
    'top dental SEO companies',
    'dental marketing agency reviews',
    'affordable dental marketing',
    'dental marketing agency pricing',
    'dental marketing ROI',
    'dental patient acquisition',
    'dental new patient marketing',
    'dental practice growth'
  ],
  
  comparison: [
    'WEO Media alternatives',
    'ProSites competitors',
    'SmileShop Marketing reviews',
    'dental marketing company comparison',
    'GPM vs WEO Media',
    'best dental website companies',
    'dental marketing cost',
    'dental marketing pricing',
    'dental marketing packages',
    'dental marketing solutions'
  ]
};

export const trackingSettings = {
  searchEngine: 'google',
  location: 'United States',
  language: 'en',
  resultsPerPage: 100,
  maxPages: 3,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  delays: {
    betweenSearches: parseInt(process.env.SEARCH_DELAY) || 5000,
    pageLoad: 3000,
    scrollDelay: 1000
  }
};

export const rankingAlerts = {
  significantChange: 3, // Alert if position changes by more than 3
  topPositions: 10,     // Always alert for changes in top 10
  newRankings: true,    // Alert when we rank for new keywords
  lostRankings: true,   // Alert when we lose rankings
  competitorMovement: {
    enabled: true,
    threshold: 5        // Alert if competitor moves up/down by 5+ positions
  }
};

export const targetCompetitors = [
  'prosites.com',
  'smileshopmarketing.com',
  'goldenproportions.com',
  'roadsidedentalmarketing.com',
  'weomedia.com'
];

// Get all keywords as a flat array
export const getAllKeywords = () => {
  return [
    ...keywords.primary,
    ...keywords.serviceSpecific,
    ...keywords.specialty,
    ...keywords.localService,
    ...keywords.comparison
  ];
};

// Get keywords by priority for daily vs weekly tracking
export const getKeywordsByPriority = () => {
  return {
    daily: [...keywords.primary, ...keywords.serviceSpecific],
    weekly: [...keywords.specialty, ...keywords.localService, ...keywords.comparison]
  };
};