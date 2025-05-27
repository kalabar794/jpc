// SEO keywords to track in Google rankings
export const primaryKeywords = [
  'dental marketing agency',
  'dental marketing company',
  'dental practice marketing',
  'dental SEO services',
  'dental website design',
  'dentist marketing',
  'dental digital marketing',
  'dental marketing consultant',
  'dental practice SEO',
  'dental office marketing'
];

export const secondaryKeywords = [
  'dental social media marketing',
  'dental PPC advertising',
  'dental Google ads',
  'dental reputation management',
  'dental patient acquisition',
  'dental marketing strategies',
  'dental marketing ideas',
  'dental practice growth',
  'dental new patient marketing',
  'dental marketing automation'
];

export const longTailKeywords = [
  'best dental marketing agency',
  'dental marketing agency near me',
  'affordable dental marketing services',
  'dental marketing for new practices',
  'dental marketing ROI',
  'dental marketing case studies',
  'dental implant marketing',
  'orthodontic marketing agency',
  'pediatric dental marketing',
  'cosmetic dentistry marketing'
];

export const competitorBrandKeywords = [
  'ProSites reviews',
  'SmileShop Marketing reviews',
  'Golden Proportions Marketing reviews',
  'Roadside dental marketing reviews',
  'ProSites alternatives',
  'dental marketing agency reviews'
];

export const localKeywords = [
  'dental marketing Los Angeles',
  'dental marketing California',
  'dental marketing agency USA',
  'dental SEO company USA'
];

// Combine all keywords for comprehensive tracking
export const allKeywords = [
  ...primaryKeywords,
  ...secondaryKeywords,
  ...longTailKeywords,
  ...competitorBrandKeywords,
  ...localKeywords
];

// Keywords to check daily (high priority)
export const dailyKeywords = primaryKeywords;

// Keywords to check weekly (lower priority)
export const weeklyKeywords = [
  ...secondaryKeywords,
  ...longTailKeywords,
  ...localKeywords
];

// Search intent categorization
export const keywordIntents = {
  commercial: [
    'dental marketing agency',
    'dental marketing company',
    'dental SEO services',
    'dental website design'
  ],
  informational: [
    'dental marketing strategies',
    'dental marketing ideas',
    'dental marketing ROI'
  ],
  navigational: [
    ...competitorBrandKeywords
  ],
  local: [
    ...localKeywords
  ]
};

// Expected ranking difficulty (1-10)
export const keywordDifficulty = {
  'dental marketing agency': 9,
  'dental marketing company': 8,
  'dental practice marketing': 7,
  'dental SEO services': 8,
  'dental website design': 7,
  'dentist marketing': 6,
  'dental digital marketing': 7,
  'dental marketing consultant': 6,
  'dental practice SEO': 7,
  'dental office marketing': 6
};