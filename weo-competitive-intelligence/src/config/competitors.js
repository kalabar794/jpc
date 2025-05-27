export const competitors = [
  {
    name: 'Scorpion',
    domain: 'scorpion.co',
    paths: {
      pricing: '/pricing',
      features: '/features',
      blog: '/blog',
      caseStudies: '/case-studies'
    },
    selectors: {
      pricing: '.pricing-card, .price-box, [data-price]',
      features: '.feature-list, .services-grid',
      testimonials: '.testimonial, .review-card'
    }
  },
  {
    name: 'PatientPop',
    domain: 'patientpop.com',
    paths: {
      pricing: '/pricing',
      solutions: '/solutions',
      resources: '/resources'
    },
    selectors: {
      pricing: '.pricing-tier, .plan-card',
      features: '.solution-card, .feature-item'
    }
  },
  {
    name: 'ProSites',
    domain: 'prosites.com',
    paths: {
      pricing: '/pricing',
      portfolio: '/portfolio',
      services: '/services'
    },
    selectors: {
      pricing: '.package-box, .pricing-table',
      portfolio: '.portfolio-item, .website-example'
    }
  },
  {
    name: 'Dental Marketing Guy',
    domain: 'dentalmarketingguy.com',
    paths: {
      services: '/services',
      blog: '/blog',
      about: '/about'
    },
    selectors: {
      services: '.service-item, .offering-card',
      pricing: '.price, .cost'
    }
  },
  {
    name: 'GPM Dental',
    domain: 'gpmdental.com',
    paths: {
      services: '/services',
      results: '/results',
      pricing: '/pricing'
    },
    selectors: {
      pricing: '.pricing-option, .plan-details',
      results: '.case-study, .result-metric'
    }
  }
];

export const trackingMetrics = [
  'pricing_changes',
  'new_features',
  'content_updates',
  'promotional_offers',
  'case_studies_added',
  'service_modifications',
  'ui_changes'
];