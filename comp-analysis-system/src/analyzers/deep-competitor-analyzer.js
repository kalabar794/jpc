import { chromium } from 'playwright';
import { competitors } from '../config/competitors.js';
import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export class DeepCompetitorAnalyzer {
  constructor() {
    this.browser = null;
    this.results = {};
  }

  async initialize() {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS_MODE !== 'false',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log(chalk.green('✓ Deep analyzer initialized'));
  }

  async analyzeAll() {
    console.log(chalk.bold.cyan('\n🔍 Starting Deep Competitor Analysis...\n'));
    
    for (const competitor of competitors) {
      console.log(chalk.blue(`\nAnalyzing ${competitor.name}...`));
      this.results[competitor.id] = await this.analyzeCompetitor(competitor);
    }

    // Save results
    await this.saveResults();
    return this.results;
  }

  async analyzeCompetitor(competitor) {
    const page = await this.browser.newPage();
    const analysis = {
      name: competitor.name,
      domain: competitor.domain,
      timestamp: new Date().toISOString(),
      metrics: {
        blogs: {},
        pricing: {},
        services: {},
        social: {},
        seo: {},
        content: {},
        technology: {},
        marketing: {}
      }
    };

    try {
      // Set user agent
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      });

      // 1. BLOG ANALYSIS
      console.log(chalk.gray('  📝 Analyzing blog content...'));
      analysis.metrics.blogs = await this.analyzeBlog(page, competitor);

      // 2. PRICING INTELLIGENCE
      console.log(chalk.gray('  💰 Extracting pricing data...'));
      analysis.metrics.pricing = await this.analyzePricing(page, competitor);

      // 3. SERVICE OFFERINGS
      console.log(chalk.gray('  🛠️  Analyzing services...'));
      analysis.metrics.services = await this.analyzeServices(page, competitor);

      // 4. SOCIAL MEDIA PRESENCE
      console.log(chalk.gray('  📱 Checking social media...'));
      analysis.metrics.social = await this.analyzeSocialMedia(page, competitor);

      // 5. SEO METRICS
      console.log(chalk.gray('  🔍 Analyzing SEO...'));
      analysis.metrics.seo = await this.analyzeSEO(page, competitor);

      // 6. CONTENT STRATEGY
      console.log(chalk.gray('  📊 Evaluating content strategy...'));
      analysis.metrics.content = await this.analyzeContentStrategy(page, competitor);

      // 7. TECHNOLOGY STACK
      console.log(chalk.gray('  🔧 Detecting technology...'));
      analysis.metrics.technology = await this.detectTechnology(page, competitor);

      // 8. MARKETING CHANNELS
      console.log(chalk.gray('  📣 Identifying marketing channels...'));
      analysis.metrics.marketing = await this.analyzeMarketingChannels(page, competitor);

    } catch (error) {
      console.error(chalk.red(`  ❌ Error analyzing ${competitor.name}:`), error.message);
    } finally {
      await page.close();
    }

    return analysis;
  }

  async analyzeBlog(page, competitor) {
    const blogData = {
      totalPosts: 0,
      recentPosts: [],
      postingFrequency: 'Unknown',
      topics: [],
      lastPostDate: null,
      averageLength: 0,
      engagement: {
        hasComments: false,
        hasSocialSharing: false,
        hasNewsletter: false
      }
    };

    try {
      // Check for blog URL
      const blogUrl = competitor.urls.blog || `${competitor.urls.home}/blog`;
      
      await page.goto(blogUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Count blog posts
      const postSelectors = [
        'article', '.blog-post', '.post', '.article-item', 
        '[class*="blog-item"]', '[class*="post-item"]',
        '.entry', '.content-item', 'h2 a', 'h3 a'
      ];

      for (const selector of postSelectors) {
        const posts = await page.$$(selector);
        if (posts.length > 0) {
          blogData.totalPosts = posts.length;
          
          // Get recent posts data
          const recentPostsData = await page.evaluate((sel) => {
            const posts = document.querySelectorAll(sel);
            return Array.from(posts).slice(0, 5).map(post => {
              const titleEl = post.querySelector('h1, h2, h3, h4, a');
              const dateEl = post.querySelector('time, .date, .post-date, [class*="date"]');
              const excerptEl = post.querySelector('.excerpt, .summary, p');
              
              return {
                title: titleEl?.textContent?.trim() || 'Untitled',
                date: dateEl?.textContent?.trim() || dateEl?.getAttribute('datetime') || null,
                excerpt: excerptEl?.textContent?.trim()?.substring(0, 150) || null
              };
            });
          }, selector);

          blogData.recentPosts = recentPostsData;
          break;
        }
      }

      // Try to get total count from pagination or archives
      const totalCountText = await page.evaluate(() => {
        const countElements = Array.from(document.querySelectorAll('*')).filter(el => 
          el.textContent.match(/\d+\s*(posts?|articles?|blogs?)/i)
        );
        return countElements[0]?.textContent || null;
      });

      if (totalCountText) {
        const match = totalCountText.match(/(\d+)/);
        if (match) blogData.totalPosts = parseInt(match[1]);
      }

      // Calculate posting frequency
      if (blogData.recentPosts.length >= 2) {
        const dates = blogData.recentPosts
          .map(p => p.date)
          .filter(d => d)
          .map(d => new Date(d))
          .filter(d => !isNaN(d));
        
        if (dates.length >= 2) {
          const daysDiff = Math.abs(dates[0] - dates[1]) / (1000 * 60 * 60 * 24);
          if (daysDiff <= 7) blogData.postingFrequency = 'Weekly';
          else if (daysDiff <= 14) blogData.postingFrequency = 'Bi-weekly';
          else if (daysDiff <= 31) blogData.postingFrequency = 'Monthly';
          else blogData.postingFrequency = 'Sporadic';
          
          blogData.lastPostDate = dates[0].toISOString();
        }
      }

      // Extract topics/categories
      const topics = await page.evaluate(() => {
        const categoryElements = document.querySelectorAll('.category, .tag, [class*="category"], [class*="tag"]');
        const topicSet = new Set();
        categoryElements.forEach(el => {
          const text = el.textContent.trim();
          if (text && text.length < 50) topicSet.add(text);
        });
        return Array.from(topicSet).slice(0, 10);
      });
      blogData.topics = topics;

      // Check for engagement features
      blogData.engagement = await page.evaluate(() => {
        return {
          hasComments: !!document.querySelector('.comments, #comments, [class*="comment"]'),
          hasSocialSharing: !!document.querySelector('.share, .social-share, [class*="share"]'),
          hasNewsletter: !!document.querySelector('.newsletter, .subscribe, [class*="newsletter"]')
        };
      });

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze blog: ${error.message}`));
    }

    return blogData;
  }

  async analyzePricing(page, competitor) {
    const pricingData = {
      hasPricingPage: false,
      pricingModel: 'Unknown',
      packages: [],
      customQuoting: false,
      startingPrice: null,
      enterprisePricing: false
    };

    try {
      const pricingUrl = competitor.urls.pricing || `${competitor.urls.home}/pricing`;
      const response = await page.goto(pricingUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      if (response && response.status() === 200) {
        pricingData.hasPricingPage = true;

        // Extract pricing information
        const pricingInfo = await page.evaluate(() => {
          const packages = [];
          const priceElements = document.querySelectorAll('[class*="price"], [class*="plan"], [class*="package"], [class*="tier"]');
          
          priceElements.forEach(el => {
            const priceText = el.textContent;
            const priceMatch = priceText.match(/\$\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
            
            if (priceMatch) {
              const titleEl = el.querySelector('h2, h3, h4, .title, .name') || 
                              el.closest('[class*="plan"]')?.querySelector('h2, h3, h4, .title, .name');
              
              packages.push({
                name: titleEl?.textContent?.trim() || 'Package',
                price: priceMatch[0],
                priceValue: parseFloat(priceMatch[1].replace(/,/g, '')),
                features: []
              });
            }
          });

          // Check for custom pricing
          const pageText = document.body.textContent.toLowerCase();
          const customQuoting = pageText.includes('custom') || 
                               pageText.includes('quote') || 
                               pageText.includes('contact us') ||
                               pageText.includes('get pricing');
          
          return { packages, customQuoting };
        });

        pricingData.packages = pricingInfo.packages;
        pricingData.customQuoting = pricingInfo.customQuoting;
        
        if (pricingData.packages.length > 0) {
          pricingData.packages.sort((a, b) => a.priceValue - b.priceValue);
          pricingData.startingPrice = pricingData.packages[0].price;
          pricingData.enterprisePricing = pricingData.packages.some(p => 
            p.name.toLowerCase().includes('enterprise') || 
            p.name.toLowerCase().includes('custom')
          );
        }

        // Determine pricing model
        if (pricingData.packages.length >= 3) {
          pricingData.pricingModel = 'Tiered';
        } else if (pricingData.customQuoting) {
          pricingData.pricingModel = 'Custom Quote';
        } else if (pricingData.packages.length === 1) {
          pricingData.pricingModel = 'Single Package';
        } else {
          pricingData.pricingModel = 'Multiple Options';
        }
      }
    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze pricing: ${error.message}`));
    }

    return pricingData;
  }

  async analyzeServices(page, competitor) {
    const servicesData = {
      coreServices: [],
      specializations: [],
      dentalFocus: false,
      serviceCategories: {},
      uniqueOfferings: []
    };

    try {
      const servicesUrl = competitor.urls.services || `${competitor.urls.home}/services`;
      await page.goto(servicesUrl, { waitUntil: 'networkidle', timeout: 30000 });

      const services = await page.evaluate(() => {
        const serviceElements = document.querySelectorAll('.service, [class*="service"], h2, h3, .offering');
        const servicesList = [];
        
        serviceElements.forEach(el => {
          const text = el.textContent.trim();
          if (text.length < 100 && text.length > 3) {
            servicesList.push(text);
          }
        });

        // Look for dental-specific services
        const dentalKeywords = ['dental', 'dentist', 'orthodont', 'oral', 'teeth', 'smile'];
        const dentalServices = servicesList.filter(s => 
          dentalKeywords.some(keyword => s.toLowerCase().includes(keyword))
        );

        return {
          all: [...new Set(servicesList)].slice(0, 20),
          dental: dentalServices
        };
      });

      servicesData.coreServices = services.all;
      servicesData.dentalFocus = services.dental.length > 0;
      servicesData.specializations = services.dental;

      // Categorize services
      const categories = {
        'Digital Marketing': ['seo', 'ppc', 'sem', 'google ads', 'facebook', 'social media'],
        'Website': ['website', 'web design', 'development', 'hosting'],
        'Content': ['content', 'blog', 'writing', 'video'],
        'Branding': ['brand', 'logo', 'identity', 'design'],
        'Analytics': ['analytics', 'reporting', 'tracking', 'roi'],
        'Reputation': ['reputation', 'reviews', 'testimonial']
      };

      for (const [category, keywords] of Object.entries(categories)) {
        servicesData.serviceCategories[category] = services.all.filter(service => 
          keywords.some(keyword => service.toLowerCase().includes(keyword))
        );
      }

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze services: ${error.message}`));
    }

    return servicesData;
  }

  async analyzeSocialMedia(page, competitor) {
    const socialData = {
      platforms: {},
      totalFollowers: 0,
      engagementLevel: 'Unknown',
      activeChannels: []
    };

    try {
      await page.goto(competitor.urls.home, { waitUntil: 'networkidle', timeout: 30000 });

      const socialLinks = await page.evaluate(() => {
        const platforms = {
          facebook: { pattern: /facebook\.com/, followers: null },
          twitter: { pattern: /twitter\.com|x\.com/, followers: null },
          linkedin: { pattern: /linkedin\.com/, followers: null },
          instagram: { pattern: /instagram\.com/, followers: null },
          youtube: { pattern: /youtube\.com/, followers: null },
          tiktok: { pattern: /tiktok\.com/, followers: null }
        };

        const links = document.querySelectorAll('a[href*="facebook"], a[href*="twitter"], a[href*="x.com"], a[href*="linkedin"], a[href*="instagram"], a[href*="youtube"], a[href*="tiktok"]');
        const foundPlatforms = {};

        links.forEach(link => {
          const href = link.href;
          for (const [platform, config] of Object.entries(platforms)) {
            if (config.pattern.test(href)) {
              foundPlatforms[platform] = {
                url: href,
                found: true
              };
            }
          }
        });

        return foundPlatforms;
      });

      socialData.platforms = socialLinks;
      socialData.activeChannels = Object.keys(socialLinks);

      // Determine engagement level based on number of active channels
      if (socialData.activeChannels.length >= 4) {
        socialData.engagementLevel = 'High';
      } else if (socialData.activeChannels.length >= 2) {
        socialData.engagementLevel = 'Medium';
      } else if (socialData.activeChannels.length >= 1) {
        socialData.engagementLevel = 'Low';
      } else {
        socialData.engagementLevel = 'None';
      }

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze social media: ${error.message}`));
    }

    return socialData;
  }

  async analyzeSEO(page, competitor) {
    const seoData = {
      metaTitle: '',
      metaDescription: '',
      headingStructure: {},
      schemaMarkup: false,
      sitemapFound: false,
      robotsTxtFound: false,
      pageSpeed: 'Unknown',
      mobileOptimized: false
    };

    try {
      await page.goto(competitor.urls.home, { waitUntil: 'networkidle', timeout: 30000 });

      // Extract SEO elements
      const seoElements = await page.evaluate(() => {
        return {
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.content || '',
          h1Count: document.querySelectorAll('h1').length,
          h2Count: document.querySelectorAll('h2').length,
          h3Count: document.querySelectorAll('h3').length,
          hasSchema: !!document.querySelector('script[type="application/ld+json"]'),
          viewport: !!document.querySelector('meta[name="viewport"]')
        };
      });

      seoData.metaTitle = seoElements.title;
      seoData.metaDescription = seoElements.metaDescription;
      seoData.headingStructure = {
        h1: seoElements.h1Count,
        h2: seoElements.h2Count,
        h3: seoElements.h3Count
      };
      seoData.schemaMarkup = seoElements.hasSchema;
      seoData.mobileOptimized = seoElements.viewport;

      // Check for sitemap
      try {
        const sitemapResponse = await page.goto(`${competitor.urls.home}/sitemap.xml`, { timeout: 10000 });
        seoData.sitemapFound = sitemapResponse && sitemapResponse.status() === 200;
      } catch (e) {
        seoData.sitemapFound = false;
      }

      // Check for robots.txt
      try {
        const robotsResponse = await page.goto(`${competitor.urls.home}/robots.txt`, { timeout: 10000 });
        seoData.robotsTxtFound = robotsResponse && robotsResponse.status() === 200;
      } catch (e) {
        seoData.robotsTxtFound = false;
      }

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze SEO: ${error.message}`));
    }

    return seoData;
  }

  async analyzeContentStrategy(page, competitor) {
    const contentData = {
      hasResourceCenter: false,
      contentTypes: [],
      leadMagnets: [],
      caseStudies: false,
      whitepapers: false,
      webinars: false,
      podcasts: false,
      videos: false,
      ebooks: false
    };

    try {
      await page.goto(competitor.urls.home, { waitUntil: 'networkidle', timeout: 30000 });

      // Navigate through site looking for content
      const contentIndicators = await page.evaluate(() => {
        const text = document.body.textContent.toLowerCase();
        const links = Array.from(document.querySelectorAll('a')).map(a => a.textContent.toLowerCase());
        
        return {
          hasResourceCenter: links.some(l => l.includes('resource') || l.includes('library')),
          caseStudies: text.includes('case stud') || links.some(l => l.includes('case stud')),
          whitepapers: text.includes('whitepaper') || text.includes('white paper'),
          webinars: text.includes('webinar') || links.some(l => l.includes('webinar')),
          podcasts: text.includes('podcast') || links.some(l => l.includes('podcast')),
          videos: !!document.querySelector('video, iframe[src*="youtube"], iframe[src*="vimeo"]'),
          ebooks: text.includes('ebook') || text.includes('e-book') || text.includes('guide')
        };
      });

      Object.assign(contentData, contentIndicators);

      // Determine content types
      const types = [];
      if (contentData.caseStudies) types.push('Case Studies');
      if (contentData.whitepapers) types.push('Whitepapers');
      if (contentData.webinars) types.push('Webinars');
      if (contentData.podcasts) types.push('Podcasts');
      if (contentData.videos) types.push('Videos');
      if (contentData.ebooks) types.push('E-books/Guides');
      
      contentData.contentTypes = types;

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze content strategy: ${error.message}`));
    }

    return contentData;
  }

  async detectTechnology(page, competitor) {
    const techData = {
      cms: 'Unknown',
      analytics: [],
      marketing: [],
      hosting: 'Unknown',
      ssl: false,
      cdn: false
    };

    try {
      await page.goto(competitor.urls.home, { waitUntil: 'networkidle', timeout: 30000 });

      // Detect technologies
      const technologies = await page.evaluate(() => {
        const tech = {
          cms: 'Unknown',
          analytics: [],
          marketing: []
        };

        // CMS Detection
        if (document.querySelector('meta[name="generator"]')) {
          tech.cms = document.querySelector('meta[name="generator"]').content;
        } else if (window.wp || document.querySelector('[class*="wp-"]')) {
          tech.cms = 'WordPress';
        } else if (document.querySelector('[class*="drupal"]')) {
          tech.cms = 'Drupal';
        } else if (document.querySelector('[class*="joomla"]')) {
          tech.cms = 'Joomla';
        }

        // Analytics Detection
        if (window.ga || window.gtag) tech.analytics.push('Google Analytics');
        if (window._gaq) tech.analytics.push('Google Analytics Classic');
        if (window.fbq) tech.analytics.push('Facebook Pixel');
        if (window.hj) tech.analytics.push('Hotjar');

        // Marketing Tools
        if (window.HubSpotConversations) tech.marketing.push('HubSpot');
        if (window.Intercom) tech.marketing.push('Intercom');
        if (window.drift) tech.marketing.push('Drift');
        if (document.querySelector('[class*="marketo"]')) tech.marketing.push('Marketo');

        return tech;
      });

      Object.assign(techData, technologies);

      // Check SSL
      techData.ssl = competitor.urls.home.startsWith('https://');

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not detect technology: ${error.message}`));
    }

    return techData;
  }

  async analyzeMarketingChannels(page, competitor) {
    const marketingData = {
      paidSearch: false,
      organicSearch: true,
      socialMedia: false,
      emailMarketing: false,
      contentMarketing: false,
      videoMarketing: false,
      partnerships: false,
      affiliates: false,
      chatSupport: false,
      phoneSupport: false
    };

    try {
      await page.goto(competitor.urls.home, { waitUntil: 'networkidle', timeout: 30000 });

      const channelIndicators = await page.evaluate(() => {
        const indicators = {};
        
        // Email marketing
        indicators.emailMarketing = !!document.querySelector('.newsletter, .subscribe, [class*="newsletter"], [type="email"]');
        
        // Chat support
        indicators.chatSupport = !!(window.Intercom || window.drift || window.tawk || document.querySelector('[class*="chat"]'));
        
        // Phone support
        indicators.phoneSupport = !!document.querySelector('a[href^="tel:"]');
        
        // Video marketing
        indicators.videoMarketing = !!document.querySelector('iframe[src*="youtube"], iframe[src*="vimeo"], video');
        
        // Partnership indicators
        const text = document.body.textContent.toLowerCase();
        indicators.partnerships = text.includes('partner') || text.includes('partnership');
        indicators.affiliates = text.includes('affiliate') || text.includes('referral program');
        
        return indicators;
      });

      Object.assign(marketingData, channelIndicators);

      // Social media presence indicates social media marketing
      const socialData = await this.analyzeSocialMedia(page, competitor);
      marketingData.socialMedia = socialData.activeChannels.length > 0;

      // Blog presence indicates content marketing
      const blogData = await this.analyzeBlog(page, competitor);
      marketingData.contentMarketing = blogData.totalPosts > 0;

    } catch (error) {
      console.log(chalk.yellow(`    ⚠️  Could not analyze marketing channels: ${error.message}`));
    }

    return marketingData;
  }

  async saveResults() {
    const analysisDir = path.join(dataDir, 'deep-analysis');
    await fs.mkdir(analysisDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `competitor-analysis-${timestamp}.json`;
    
    // Generate matrix format for saving
    const matrix = await this.generateMatrix();
    
    // Save full results
    await fs.writeFile(
      path.join(analysisDir, filename),
      JSON.stringify(this.results, null, 2)
    );

    // Save matrix format as latest for dashboard
    await fs.writeFile(
      path.join(analysisDir, 'latest.json'),
      JSON.stringify(matrix, null, 2)
    );
    
    // Also save raw results for backup
    await fs.writeFile(
      path.join(analysisDir, 'latest-raw.json'),
      JSON.stringify(this.results, null, 2)
    );

    console.log(chalk.green(`\n✓ Analysis saved to ${filename}`));
  }

  async generateMatrix() {
    const matrix = {
      timestamp: new Date().toISOString(),
      competitors: {},
      summary: {
        mostActiveBlogs: [],
        pricingLeaders: [],
        socialMediaLeaders: [],
        contentLeaders: [],
        techLeaders: []
      }
    };

    for (const [competitorId, data] of Object.entries(this.results)) {
      matrix.competitors[competitorId] = {
        name: data.name,
        domain: data.domain,
        blogPosts: data.metrics.blogs.totalPosts,
        blogFrequency: data.metrics.blogs.postingFrequency,
        lastBlogPost: data.metrics.blogs.lastPostDate,
        startingPrice: data.metrics.pricing.startingPrice,
        pricingModel: data.metrics.pricing.pricingModel,
        socialChannels: data.metrics.social.activeChannels.length,
        socialEngagement: data.metrics.social.engagementLevel,
        contentTypes: data.metrics.content.contentTypes.length,
        hasResourceCenter: data.metrics.content.hasResourceCenter,
        technology: data.metrics.technology.cms,
        analytics: data.metrics.technology.analytics,
        seoOptimized: data.metrics.seo.schemaMarkup && data.metrics.seo.sitemapFound,
        dentalFocus: data.metrics.services.dentalFocus,
        coreServices: data.metrics.services.coreServices.length,
        marketingChannels: Object.entries(data.metrics.marketing)
          .filter(([_, active]) => active)
          .map(([channel, _]) => channel)
      };
    }

    // Calculate leaders
    const competitors = Object.entries(matrix.competitors);
    
    // Most active blogs
    matrix.summary.mostActiveBlogs = competitors
      .sort((a, b) => b[1].blogPosts - a[1].blogPosts)
      .slice(0, 3)
      .map(([_, data]) => `${data.name} (${data.blogPosts} posts)`);

    // Social media leaders
    matrix.summary.socialMediaLeaders = competitors
      .sort((a, b) => b[1].socialChannels - a[1].socialChannels)
      .slice(0, 3)
      .map(([_, data]) => `${data.name} (${data.socialChannels} channels)`);

    // Content leaders
    matrix.summary.contentLeaders = competitors
      .sort((a, b) => b[1].contentTypes - a[1].contentTypes)
      .slice(0, 3)
      .map(([_, data]) => `${data.name} (${data.contentTypes} types)`);

    return matrix;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new DeepCompetitorAnalyzer();
  
  try {
    await analyzer.initialize();
    await analyzer.analyzeAll();
    const matrix = await analyzer.generateMatrix();
    
    console.log(chalk.bold.green('\n📊 Competitor Matrix Summary:\n'));
    console.log(JSON.stringify(matrix.summary, null, 2));
    
  } catch (error) {
    console.error(chalk.red('Analysis failed:'), error);
  } finally {
    await analyzer.close();
  }
}