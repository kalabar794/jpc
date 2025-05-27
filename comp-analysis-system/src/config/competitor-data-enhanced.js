// Enhanced competitor data structure based on Excel spreadsheet
export const competitorDataPoints = {
  // Company Information
  location: {
    label: 'Location',
    type: 'text',
    description: 'Headquarters location'
  },
  companySize: {
    label: 'Company Size',
    type: 'number',
    description: 'Number of employees'
  },
  founded: {
    label: 'Founded',
    type: 'year',
    description: 'Year company was founded'
  },
  
  // Business Focus
  coreFocus: {
    label: 'Core Focus',
    type: 'text',
    description: 'Primary business focus and specialization'
  },
  dsoMarketing: {
    label: 'DSO Marketing',
    type: 'boolean',
    description: 'Offers Dental Service Organization marketing'
  },
  verticalsServed: {
    label: 'Verticals Served',
    type: 'array',
    description: 'Industries/verticals served'
  },
  
  // Marketing Capabilities
  seo: {
    label: 'SEO Services',
    type: 'boolean',
    description: 'Offers SEO services'
  },
  emailMarketing: {
    label: 'Email Marketing',
    type: 'boolean',
    description: 'Offers email marketing services'
  },
  socialMediaMarketing: {
    label: 'Social Media Marketing',
    type: 'boolean',
    description: 'Offers social media marketing'
  },
  
  // Online Presence
  reviews: {
    label: 'Reviews',
    type: 'object',
    description: 'Online review ratings and counts',
    subfields: {
      googleRating: 'number',
      googleCount: 'number',
      yelpRating: 'number',
      yelpCount: 'number'
    }
  },
  socialFollowers: {
    label: 'Social Followers',
    type: 'object',
    description: 'Social media follower counts',
    subfields: {
      facebook: 'number',
      instagram: 'number',
      linkedin: 'number',
      twitter: 'number',
      youtube: 'number',
      total: 'number'
    }
  },
  
  // Business Metrics
  clientsEstimated: {
    label: 'Clients (Estimated)',
    type: 'number',
    description: 'Estimated number of clients'
  },
  revenues: {
    label: 'Revenues',
    type: 'currency',
    description: 'Annual revenue (if available)'
  },
  pricing: {
    label: 'Pricing',
    type: 'object',
    description: 'Pricing structure and ranges',
    subfields: {
      model: 'text', // 'subscription', 'project', 'retainer'
      minimumContract: 'currency',
      averageClient: 'currency',
      transparency: 'text' // 'public', 'contact', 'hidden'
    }
  },
  
  // Marketing & Branding
  brandMessaging: {
    label: 'Brand Messaging',
    type: 'text',
    description: 'Key brand messaging and positioning'
  },
  reputation: {
    label: 'Reputation',
    type: 'text',
    description: 'Market reputation and positioning'
  },
  events: {
    label: 'Events',
    type: 'array',
    description: 'Industry events participation'
  }
};

// Updated competitor profiles with enhanced data
export const enhancedCompetitorData = {
  weo_media: {
    id: 'weo_media',
    name: 'WEO Media',
    domain: 'weomedia.com',
    location: 'Beaverton, Oregon',
    companySize: 48,
    founded: 2009,
    coreFocus: 'Full Service Dental Marketing with focus on DSOs',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true,
    clientsEstimated: 2000,
    pricing: {
      model: 'retainer',
      transparency: 'contact'
    }
  },
  smc_national: {
    id: 'smc_national',
    name: 'SMC National',
    domain: 'smcnational.com',
    location: 'Roseville, CA',
    companySize: 47,
    founded: 2007,
    coreFocus: 'Full Service Dental Marketing with focus on DSOs',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  progressive_dental: {
    id: 'progressive_dental',
    name: 'Progressive Dental',
    domain: 'progressivedental.com',
    location: 'Clearwater, Florida',
    companySize: 71,
    founded: 2009,
    coreFocus: 'High-end Full Service Dental Marketing with focus on large cases & DSOs',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  henry_schein_one: {
    id: 'henry_schein_one',
    name: 'Henry Schein One',
    domain: 'henryscheinone.com',
    location: 'American Fork, Utah',
    companySize: 1000, // Large corporation
    founded: null, // Part of Henry Schein
    coreFocus: 'Dental software and marketing solutions',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  sesame_communications: {
    id: 'sesame_communications',
    name: 'Sesame Communications',
    domain: 'sesamecommunications.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Dental practice marketing and patient engagement',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  pbhs_revenuewell: {
    id: 'pbhs_revenuewell',
    name: 'PBHS - A RevenueWell Co.',
    domain: 'revenuewell.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Dental marketing automation and patient communications',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  prosites: {
    id: 'prosites',
    name: 'ProSites',
    domain: 'prosites.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Dental website design and digital marketing',
    dsoMarketing: false,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  patientpop: {
    id: 'patientpop',
    name: 'Patientpop',
    domain: 'patientpop.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Practice growth platform for healthcare',
    dsoMarketing: false,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  roadside_dental: {
    id: 'roadside_dental',
    name: 'Roadside Dental Marketing',
    domain: 'roadsidedentalmarketing.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Comprehensive dental practice marketing',
    dsoMarketing: false,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  adit: {
    id: 'adit',
    name: 'Adit',
    domain: 'adit.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Dental practice management and marketing software',
    dsoMarketing: true,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  },
  firegang: {
    id: 'firegang',
    name: 'Firegang',
    domain: 'firegang.com',
    location: null,
    companySize: null,
    founded: null,
    coreFocus: 'Dental marketing and website design',
    dsoMarketing: false,
    seo: true,
    emailMarketing: true,
    socialMediaMarketing: true
  }
};

// Function to get all trackable metrics
export const getTrackableMetrics = () => {
  return Object.entries(competitorDataPoints).map(([key, config]) => ({
    key,
    ...config
  }));
};

// Function to get competitor by any identifier
export const findCompetitor = (identifier) => {
  const searchTerm = identifier.toLowerCase().replace(/\s+/g, '_');
  return Object.values(enhancedCompetitorData).find(comp => 
    comp.id === searchTerm ||
    comp.name.toLowerCase() === identifier.toLowerCase() ||
    comp.domain === identifier
  );
};