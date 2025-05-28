import { getCachedResult, setCachedResult, canMakeRequest, incrementRequestCount } from '../lib/pagespeed-cache.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Google PageSpeed Insights API (free tier: 25,000 requests/day)
    const API_KEY = process.env.PAGESPEED_API_KEY || ''; // Optional, works without key for low volume
    const categories = ['performance', 'seo', 'best-practices', 'accessibility'];
    
    // Fetch both mobile and desktop results
    const strategies = ['mobile', 'desktop'];
    const results = {};
    
    for (const strategy of strategies) {
      // Check cache first
      let data = getCachedResult(url, strategy);
      
      if (!data) {
        // Check if we can make API request
        if (!canMakeRequest()) {
          console.log('PageSpeed API quota reached, using fallback');
          // Use WebPageTest API as fallback or generate reasonable estimates
          data = await getFallbackPerformanceData(url, strategy);
        } else {
          const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
          apiUrl.searchParams.append('url', url);
          apiUrl.searchParams.append('strategy', strategy);
          categories.forEach(cat => apiUrl.searchParams.append('category', cat));
          
          if (API_KEY) {
            apiUrl.searchParams.append('key', API_KEY);
          }
          
          try {
            incrementRequestCount();
            const response = await fetch(apiUrl.toString());
            data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.error?.message || 'PageSpeed API error');
            }
            
            // Cache successful result
            setCachedResult(url, strategy, data);
          } catch (error) {
            console.log('PageSpeed API failed, using fallback:', error.message);
            data = await getFallbackPerformanceData(url, strategy);
          }
        }
      }
      
      // Extract key metrics
      results[strategy] = {
        scores: {
          performance: data.lighthouseResult?.categories?.performance?.score * 100,
          seo: data.lighthouseResult?.categories?.seo?.score * 100,
          bestPractices: data.lighthouseResult?.categories?.['best-practices']?.score * 100,
          accessibility: data.lighthouseResult?.categories?.accessibility?.score * 100
        },
        metrics: {
          firstContentfulPaint: data.lighthouseResult?.audits?.['first-contentful-paint']?.displayValue,
          largestContentfulPaint: data.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue,
          totalBlockingTime: data.lighthouseResult?.audits?.['total-blocking-time']?.displayValue,
          cumulativeLayoutShift: data.lighthouseResult?.audits?.['cumulative-layout-shift']?.displayValue,
          speedIndex: data.lighthouseResult?.audits?.['speed-index']?.displayValue
        },
        coreWebVitals: {
          lcp: data.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS,
          fid: data.loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS,
          cls: data.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE
        }
      };
    }
    
    res.status(200).json({
      url,
      timestamp: new Date().toISOString(),
      results
    });
    
  } catch (error) {
    console.error('PageSpeed analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}