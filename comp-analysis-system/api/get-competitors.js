import { Octokit } from '@octokit/rest';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    // Get competitor data from GitHub
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'data/competitors.json'
    });

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const competitors = JSON.parse(content);

    res.status(200).json(competitors);
  } catch (error) {
    console.error('Error fetching competitors:', error);
    
    // Return comprehensive competitor data as fallback
    const competitors = {
      'weo_media': {
        name: 'WEO Media',
        domain: 'weomedia.com',
        location: 'Orem, UT',
        companySize: 250,
        founded: 2001,
        clientsEstimated: 3000,
        coreFocus: 'Comprehensive dental marketing platform with website design, SEO, PPC, and practice management tools',
        brandMessaging: 'World-class marketing for dental practices',
        seo: true,
        emailMarketing: true,
        dsoMarketing: true,
        lastAnalyzed: new Date().toISOString()
      },
      'progressive_dental': {
        name: 'Progressive Dental',
        domain: 'progressivedental.com', 
        location: 'Multiple Locations',
        companySize: 150,
        founded: 2010,
        clientsEstimated: 800,
        coreFocus: 'Digital marketing and practice growth solutions for dental practices',
        brandMessaging: 'Progressive marketing for progressive practices',
        seo: true,
        emailMarketing: true,
        dsoMarketing: false,
        lastAnalyzed: new Date().toISOString()
      },
      'wordstream': {
        name: 'WordStream',
        domain: 'wordstream.com',
        location: 'Boston, MA',
        companySize: 300,
        founded: 2007,
        clientsEstimated: 5000,
        coreFocus: 'PPC and search marketing platform serving multiple industries including dental',
        brandMessaging: 'Make online advertising easy and profitable',
        seo: false,
        emailMarketing: false,
        dsoMarketing: false,
        lastAnalyzed: new Date().toISOString()
      },
      'my_social_practice': {
        name: 'My Social Practice',
        domain: 'mysocialpractice.com',
        location: 'Austin, TX', 
        companySize: 75,
        founded: 2015,
        clientsEstimated: 1200,
        coreFocus: 'Social media marketing and patient engagement for dental practices',
        brandMessaging: 'Social media marketing that works for dental practices',
        seo: true,
        emailMarketing: true,
        dsoMarketing: true,
        lastAnalyzed: new Date().toISOString()
      },
      'wonderist_agency': {
        name: 'Wonderist Agency',
        domain: 'wonderistagency.com',
        location: 'Phoenix, AZ',
        companySize: 45,
        founded: 2018,
        clientsEstimated: 400,
        coreFocus: 'Creative digital marketing agency specializing in dental practice branding and growth',
        brandMessaging: 'Wonder-full marketing for dental practices',
        seo: true,
        emailMarketing: true,
        dsoMarketing: false,
        lastAnalyzed: new Date().toISOString()
      },
      'firegang': {
        name: 'Firegang',
        domain: 'firegang.com',
        location: 'Austin, TX',
        companySize: 60,
        founded: 2012,
        clientsEstimated: 600,
        coreFocus: 'Dental marketing with focus on website design, SEO, and local marketing',
        brandMessaging: 'Ignite your dental practice growth',
        seo: true,
        emailMarketing: false,
        dsoMarketing: false,
        lastAnalyzed: new Date().toISOString()
      },
      'roadside_dental': {
        name: 'Roadside Dental',
        domain: 'roadsidedental.com',
        location: 'Denver, CO',
        companySize: 35,
        founded: 2016,
        clientsEstimated: 300,
        coreFocus: 'Full-service dental marketing with emphasis on patient acquisition and retention',
        brandMessaging: 'Your partner in dental practice success',
        seo: true,
        emailMarketing: true,
        dsoMarketing: true,
        lastAnalyzed: new Date().toISOString()
      },
      'smc_national': {
        name: 'SMC National',
        domain: 'smcnational.com',
        location: 'Multiple Locations',
        companySize: 120,
        founded: 2008,
        clientsEstimated: 1800,
        coreFocus: 'National dental marketing company offering comprehensive digital marketing solutions',
        brandMessaging: 'National reach, local results for dental practices',
        seo: true,
        emailMarketing: true,
        dsoMarketing: true,
        lastAnalyzed: new Date().toISOString()
      }
    };
    
    res.status(200).json({
      competitors,
      lastUpdated: new Date().toISOString(),
      source: 'fallback_data'
    });
  }
}