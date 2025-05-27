import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, domain } = req.body;
    
    if (!url || !domain) {
      return res.status(400).json({ error: 'URL and domain are required' });
    }

    // Common blog URL patterns for dental marketing agencies
    const blogPatterns = [
      '/blog',
      '/resources',
      '/articles',
      '/insights',
      '/news',
      '/posts'
    ];
    
    const results = {
      blogs: [],
      totalPosts: 0,
      recentPosts: [],
      publishingFrequency: null,
      contentCategories: new Set(),
      lastUpdated: null
    };
    
    // Try different blog URL patterns
    for (const pattern of blogPatterns) {
      try {
        const blogUrl = new URL(pattern, `https://${domain}`).href;
        const response = await fetch(blogUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; WEO-CompetitorBot/1.0)'
          }
        });
        
        if (response.ok) {
          const html = await response.text();
          const $ = cheerio.load(html);
          
          // Extract blog posts - common selectors
          const postSelectors = [
            'article',
            '.blog-post',
            '.post',
            '.article',
            '.entry',
            '[class*="blog-item"]',
            '[class*="post-item"]'
          ];
          
          let posts = [];
          for (const selector of postSelectors) {
            const elements = $(selector);
            if (elements.length > 0) {
              elements.each((i, el) => {
                const $post = $(el);
                
                // Extract post data
                const titleEl = $post.find('h1, h2, h3, h4').first();
                const linkEl = $post.find('a').first();
                const dateEl = $post.find('time, .date, .post-date, [class*="date"]').first();
                const categoryEl = $post.find('.category, .tag, [class*="category"]').first();
                
                const post = {
                  title: titleEl.text().trim(),
                  url: linkEl.attr('href'),
                  date: dateEl.text().trim() || dateEl.attr('datetime'),
                  category: categoryEl.text().trim()
                };
                
                if (post.title) {
                  posts.push(post);
                  if (post.category) {
                    results.contentCategories.add(post.category);
                  }
                }
              });
              
              if (posts.length > 0) break;
            }
          }
          
          // Store results for this blog section
          if (posts.length > 0) {
            results.blogs.push({
              url: blogUrl,
              postCount: posts.length,
              posts: posts.slice(0, 10) // Keep only recent 10
            });
            results.totalPosts += posts.length;
            results.recentPosts = [...results.recentPosts, ...posts].slice(0, 5);
          }
          
          // Try to find pagination to estimate total posts
          const paginationSelectors = [
            '.pagination',
            '.page-numbers',
            '.pager',
            '[class*="pagination"]'
          ];
          
          for (const selector of paginationSelectors) {
            const pagination = $(selector);
            if (pagination.length > 0) {
              const lastPage = pagination.find('a').last().text();
              const pageNum = parseInt(lastPage);
              if (!isNaN(pageNum)) {
                results.totalPosts = Math.max(results.totalPosts, pageNum * posts.length);
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching ${pattern}:`, error.message);
      }
    }
    
    // Calculate publishing frequency if we have dates
    const datedPosts = results.recentPosts.filter(p => p.date);
    if (datedPosts.length >= 2) {
      try {
        const dates = datedPosts.map(p => new Date(p.date)).filter(d => !isNaN(d));
        dates.sort((a, b) => b - a);
        
        if (dates.length >= 2) {
          const daysDiff = (dates[0] - dates[dates.length - 1]) / (1000 * 60 * 60 * 24);
          const postsPerMonth = Math.round((dates.length / daysDiff) * 30);
          results.publishingFrequency = `~${postsPerMonth} posts/month`;
          results.lastUpdated = dates[0].toISOString();
        }
      } catch (error) {
        console.error('Error calculating frequency:', error);
      }
    }
    
    // Also check for RSS feeds
    try {
      const homePage = await fetch(`https://${domain}`);
      const homeHtml = await homePage.text();
      const $home = cheerio.load(homeHtml);
      
      const rssLinks = $home('link[type="application/rss+xml"], link[type="application/atom+xml"]');
      results.rssFeed = rssLinks.attr('href');
    } catch (error) {
      console.error('Error checking RSS:', error);
    }
    
    res.status(200).json({
      domain,
      timestamp: new Date().toISOString(),
      content: {
        totalBlogPosts: results.totalPosts,
        publishingFrequency: results.publishingFrequency,
        lastPublished: results.lastUpdated,
        contentCategories: Array.from(results.contentCategories),
        recentPosts: results.recentPosts.slice(0, 5),
        blogSections: results.blogs.map(b => ({
          url: b.url,
          postCount: b.postCount
        })),
        hasRSSFeed: !!results.rssFeed
      }
    });
    
  } catch (error) {
    console.error('Content analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}