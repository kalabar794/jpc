import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function convertToMatrix() {
  try {
    // Read the raw data
    const rawData = await fs.readFile(path.join(__dirname, 'data/deep-analysis/latest.json'), 'utf8');
    const results = JSON.parse(rawData);
    
    // Create matrix format
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
    
    // Convert each competitor
    for (const [competitorId, data] of Object.entries(results)) {
      if (data.metrics) {
        matrix.competitors[competitorId] = {
          name: data.name,
          domain: data.domain,
          blogPosts: data.metrics.blogs?.totalPosts || 0,
          blogFrequency: data.metrics.blogs?.postingFrequency || 'Unknown',
          lastBlogPost: data.metrics.blogs?.lastPostDate || null,
          startingPrice: data.metrics.pricing?.startingPrice || null,
          pricingModel: data.metrics.pricing?.pricingModel || 'Unknown',
          socialChannels: data.metrics.social?.activeChannels?.length || 0,
          socialEngagement: data.metrics.social?.engagementLevel || 'Unknown',
          contentTypes: data.metrics.content?.contentTypes?.length || 0,
          hasResourceCenter: data.metrics.content?.hasResourceCenter || false,
          technology: data.metrics.technology?.cms || 'Unknown',
          analytics: data.metrics.technology?.analytics || [],
          seoOptimized: (data.metrics.seo?.schemaMarkup && data.metrics.seo?.sitemapFound) || false,
          dentalFocus: data.metrics.services?.dentalFocus || false,
          coreServices: data.metrics.services?.coreServices?.length || 0,
          marketingChannels: Object.entries(data.metrics.marketing || {})
            .filter(([_, active]) => active)
            .map(([channel, _]) => channel)
        };
      }
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
    
    // Save the matrix format
    await fs.writeFile(
      path.join(__dirname, 'data/deep-analysis/latest-matrix.json'),
      JSON.stringify(matrix, null, 2)
    );
    
    console.log('✓ Converted to matrix format');
    console.log(`Total competitors: ${Object.keys(matrix.competitors).length}`);
    console.log('\nCompetitors in matrix:');
    Object.values(matrix.competitors).forEach(comp => {
      console.log(`- ${comp.name}: ${comp.blogPosts} posts, ${comp.socialChannels} social channels`);
    });
    
  } catch (error) {
    console.error('Error converting:', error);
  }
}

convertToMatrix();