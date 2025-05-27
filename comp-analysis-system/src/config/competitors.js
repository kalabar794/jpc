export const competitors = [
  {
    id: 'progressive_dental',
    name: 'Progressive Dental',
    domain: 'progressivedental.com',
    marketPosition: 'Dental practice marketing and patient acquisition',
    keyFocus: 'Lead generation and patient conversion',
    urls: {
      home: 'https://www.progressivedental.com',
      services: 'https://www.progressivedental.com/services',
      about: 'https://www.progressivedental.com/about',
      contact: 'https://www.progressivedental.com/contact'
    },
    selectors: {
      services: '.service-card, .offering, .solution',
      pricing: '.pricing-table, .plan-card, [data-price]',
      testimonials: '.testimonial, .review, .client-story',
      results: '.result-metric, .stat, .outcome',
      team: '.team-member, .staff, .expert'
    },
    tracking: {
      serviceOfferings: true,
      pricingChanges: true,
      clientTestimonials: true,
      resultsMetrics: true,
      teamUpdates: true
    }
  },
  {
    id: 'wordstream',
    name: 'WordStream',
    domain: 'wordstream.com',
    marketPosition: 'PPC and digital advertising platform with dental focus',
    keyFocus: 'Google Ads management and optimization',
    urls: {
      home: 'https://www.wordstream.com',
      dental: 'https://www.wordstream.com/industries/dental',
      pricing: 'https://www.wordstream.com/pricing',
      blog: 'https://www.wordstream.com/blog',
      resources: 'https://www.wordstream.com/resources'
    },
    selectors: {
      dentalContent: '.dental, .dentist, .orthodontist',
      pricing: '.pricing-table, .plan-card, [data-price]',
      blogPosts: '.blog-post, article, .content-item',
      caseStudies: '.case-study, .success-story, .client-result',
      features: '.feature-list, .benefit, .capability'
    },
    tracking: {
      dentalSpecificContent: true,
      pricingChanges: true,
      blogFrequency: true,
      caseStudies: true,
      featureUpdates: true
    }
  },
  {
    id: 'my_social_practice',
    name: 'My Social Practice',
    domain: 'mysocialpractice.com',
    marketPosition: 'Social media marketing for dental practices',
    keyFocus: 'Social media management and patient engagement',
    urls: {
      home: 'https://www.mysocialpractice.com',
      services: 'https://www.mysocialpractice.com/services',
      pricing: 'https://www.mysocialpractice.com/pricing',
      portfolio: 'https://www.mysocialpractice.com/portfolio',
      blog: 'https://www.mysocialpractice.com/blog'
    },
    selectors: {
      socialServices: '.social-media, .social-service, .platform',
      portfolioItems: '.portfolio-item, .case-study, .example',
      pricing: '.pricing-table, .package, [data-price]',
      clientWork: '.client-work, .success-story',
      blogContent: '.blog-post, article, .content'
    },
    tracking: {
      socialMediaServices: true,
      portfolioUpdates: true,
      pricingChanges: true,
      clientShowcase: true,
      contentMarketing: true
    }
  },
  {
    id: 'wonderist_agency',
    name: 'Wonderist Agency',
    domain: 'wonderistagency.com',
    marketPosition: 'Digital marketing agency with healthcare focus',
    keyFocus: 'Comprehensive digital marketing solutions',
    urls: {
      home: 'https://www.wonderistagency.com',
      services: 'https://www.wonderistagency.com/services',
      healthcare: 'https://www.wonderistagency.com/healthcare',
      case_studies: 'https://www.wonderistagency.com/case-studies',
      about: 'https://www.wonderistagency.com/about'
    },
    selectors: {
      healthcareContent: '.healthcare, .medical, .dental',
      services: '.service-card, .offering, .solution',
      caseStudies: '.case-study, .success-story, .project',
      team: '.team-member, .expert, .specialist',
      awards: '.award, .recognition, .certification'
    },
    tracking: {
      healthcareFocus: true,
      serviceExpansion: true,
      caseStudyUpdates: true,
      teamGrowth: true,
      industryRecognition: true
    }
  },
  {
    id: 'firegang',
    name: 'Firegang',
    domain: 'firegang.com',
    marketPosition: 'Dental marketing and website development',
    keyFocus: 'Websites, SEO, and practice growth',
    urls: {
      home: 'https://www.firegang.com',
      dental: 'https://www.firegang.com/dental-marketing',
      services: 'https://www.firegang.com/services',
      portfolio: 'https://www.firegang.com/portfolio',
      pricing: 'https://www.firegang.com/pricing'
    },
    selectors: {
      dentalServices: '.dental, .practice, .dentist',
      portfolioItems: '.portfolio-item, .website-example, .project',
      pricing: '.pricing-table, .package, [data-price]',
      seoContent: '.seo, .search-optimization',
      testimonials: '.testimonial, .review, .client-feedback'
    },
    tracking: {
      dentalSpecialization: true,
      portfolioGrowth: true,
      pricingStrategy: true,
      seoServices: true,
      clientFeedback: true
    }
  },
  {
    id: 'roadside_dental',
    name: 'Roadside Dental Marketing',
    domain: 'roadsidedentalmarketing.com',
    marketPosition: 'Established dental marketing with recent rebrand',
    keyFocus: 'Comprehensive dental practice marketing',
    urls: {
      home: 'https://www.roadsidedentalmarketing.com',
      services: 'https://www.roadsidedentalmarketing.com/services',
      about: 'https://www.roadsidedentalmarketing.com/about',
      contact: 'https://www.roadsidedentalmarketing.com/contact',
      blog: 'https://www.roadsidedentalmarketing.com/blog'
    },
    selectors: {
      branding: '.logo, .brand-name, .company-name',
      services: '.service-card, .offering, .solution',
      testimonials: '.testimonial, .review, .success-story',
      team: '.team-member, .staff, .expert',
      blogPosts: '.blog-post, article, .content-item'
    },
    tracking: {
      rebrandProgress: true,
      serviceOfferings: true,
      clientTestimonials: true,
      teamChanges: true,
      contentStrategy: true
    }
  },
  {
    id: 'smc_national',
    name: 'SMC National',
    domain: 'smcnational.com',
    marketPosition: 'National dental marketing and practice consulting',
    keyFocus: 'Practice management and marketing solutions',
    urls: {
      home: 'https://www.smcnational.com',
      services: 'https://www.smcnational.com/services',
      consulting: 'https://www.smcnational.com/consulting',
      training: 'https://www.smcnational.com/training',
      about: 'https://www.smcnational.com/about'
    },
    selectors: {
      services: '.service-card, .offering, .solution',
      consulting: '.consulting, .advisory, .guidance',
      training: '.training, .education, .course',
      results: '.result-metric, .stat, .outcome',
      testimonials: '.testimonial, .review, .success-story'
    },
    tracking: {
      servicePortfolio: true,
      consultingServices: true,
      trainingPrograms: true,
      clientResults: true,
      testimonialUpdates: true
    }
  }
];

// WEO Media - Your company (for reference and internal tracking)
export const weoMedia = {
  id: 'weo_media',
  name: 'WEO Media',
  domain: 'weomedia.com',
  marketPosition: 'Leading dental marketing agency',
  keyStrengths: 'Comprehensive digital marketing solutions for dental practices',
  urls: {
    home: 'https://www.weomedia.com',
    services: 'https://www.weomedia.com/services',
    about: 'https://www.weomedia.com/about',
    blog: 'https://www.weomedia.com/blog',
    contact: 'https://www.weomedia.com/contact'
  },
  tracking: {
    competitivePositioning: true,
    serviceComparison: true,
    contentStrategy: true,
    marketShare: true
  }
};

export const getCompetitorById = (id) => {
  return competitors.find(comp => comp.id === id);
};

export const getAllCompetitorUrls = () => {
  return competitors.flatMap(comp => Object.values(comp.urls));
};

export const getCompetitorsByFocus = (focus) => {
  return competitors.filter(comp => 
    comp.keyFocus.toLowerCase().includes(focus.toLowerCase())
  );
};

export const getDentalSpecificCompetitors = () => {
  return competitors.filter(comp => 
    comp.marketPosition.toLowerCase().includes('dental') ||
    comp.keyFocus.toLowerCase().includes('dental')
  );
};