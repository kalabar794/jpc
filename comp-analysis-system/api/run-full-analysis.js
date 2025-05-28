export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { competitorId } = req.body;
    
    if (!competitorId) {
      return res.status(400).json({ error: 'Competitor ID is required' });
    }

    // Get competitor data
    const competitorData = await getCompetitorData(competitorId);
    if (!competitorData) {
      return res.status(404).json({ error: 'Competitor not found' });
    }

    const { domain, name } = competitorData;
    const baseUrl = `https://${domain}`;
    
    // Run all analyses in parallel for speed
    const [pageSpeedData, contentData, securityData, aiAnalysis] = await Promise.allSettled([
      // PageSpeed Analysis
      fetch(`${req.headers.origin}/api/analyze-pagespeed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: baseUrl })
      }).then(r => r.json()),
      
      // Content Analysis
      fetch(`${req.headers.origin}/api/analyze-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: baseUrl, domain })
      }).then(r => r.json()),
      
      // Security Analysis
      fetch(`${req.headers.origin}/api/analyze-security`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      }).then(r => r.json()),
      
      // AI Analysis (if API key exists)
      process.env.CLAUDE_API_KEY ? 
        fetch(`${req.headers.origin}/api/analyze-competitor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: baseUrl, competitorName: name })
        }).then(r => r.json()) : 
        Promise.resolve({ skipped: true, reason: 'No API key' })
    ]);

    // Compile results
    const analysis = {
      competitorId,
      name,
      domain,
      timestamp: new Date().toISOString(),
      performance: pageSpeedData.status === 'fulfilled' ? pageSpeedData.value : { error: pageSpeedData.reason },
      content: contentData.status === 'fulfilled' ? contentData.value : { error: contentData.reason },
      security: securityData.status === 'fulfilled' ? securityData.value : { error: securityData.reason },
      aiInsights: aiAnalysis.status === 'fulfilled' ? aiAnalysis.value : { error: aiAnalysis.reason }
    };

    // Calculate overall health score
    analysis.overallScore = calculateOverallScore(analysis);
    
    // Generate insights
    analysis.insights = generateInsights(analysis);
    
    // Save to storage
    await saveAnalysis(competitorId, analysis);
    
    res.status(200).json(analysis);
    
  } catch (error) {
    console.error('Full analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}

async function getCompetitorData(competitorId) {
  // Return hardcoded competitor data (same as in get-competitors.js)
  const competitors = {
    'weo_media': {
      name: 'WEO Media',
      domain: 'weomedia.com'
    },
    'progressive_dental': {
      name: 'Progressive Dental',
      domain: 'progressivedental.com'
    },
    'wordstream': {
      name: 'WordStream',
      domain: 'wordstream.com'
    },
    'my_social_practice': {
      name: 'My Social Practice',
      domain: 'mysocialpractice.com'
    },
    'wonderist_agency': {
      name: 'Wonderist Agency',
      domain: 'wonderistagency.com'
    },
    'firegang': {
      name: 'Firegang',
      domain: 'firegang.com'
    },
    'roadside_dental': {
      name: 'Roadside Dental',
      domain: 'roadsidedental.com'
    },
    'smc_national': {
      name: 'SMC National',
      domain: 'smcnational.com'
    }
  };
  
  return competitors[competitorId];
}

function calculateOverallScore(analysis) {
  let score = 0;
  let maxScore = 0;
  
  // Performance score (0-100)
  if (analysis.performance?.results) {
    const mobileScore = analysis.performance.results.mobile?.scores?.performance || 0;
    const desktopScore = analysis.performance.results.desktop?.scores?.performance || 0;
    score += (mobileScore + desktopScore) / 2;
    maxScore += 100;
  }
  
  // Security score (0-100)
  if (analysis.security?.security?.score !== undefined) {
    score += analysis.security.security.score;
    maxScore += 100;
  }
  
  // Content score (0-100)
  if (analysis.content?.content) {
    const contentScore = Math.min(100, (analysis.content.content.totalBlogPosts || 0) * 2);
    score += contentScore;
    maxScore += 100;
  }
  
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
}

function generateInsights(analysis) {
  const insights = {
    strengths: [],
    weaknesses: [],
    opportunities: []
  };
  
  // Performance insights
  if (analysis.performance?.results) {
    const mobilePerf = analysis.performance.results.mobile?.scores?.performance || 0;
    if (mobilePerf >= 90) {
      insights.strengths.push('Excellent mobile performance');
    } else if (mobilePerf < 50) {
      insights.weaknesses.push('Poor mobile performance may hurt search rankings');
      insights.opportunities.push('Optimize mobile site speed for better user experience');
    }
  }
  
  // Security insights
  if (analysis.security?.security) {
    const secScore = analysis.security.security.score;
    if (secScore >= 80) {
      insights.strengths.push('Strong security implementation');
    } else if (secScore < 50) {
      insights.weaknesses.push('Security vulnerabilities detected');
      analysis.security.security.recommendations?.forEach(rec => {
        insights.opportunities.push(rec);
      });
    }
  }
  
  // Content insights
  if (analysis.content?.content) {
    const totalPosts = analysis.content.content.totalBlogPosts || 0;
    const frequency = analysis.content.content.publishingFrequency;
    
    if (totalPosts > 50) {
      insights.strengths.push(`Active content marketing with ${totalPosts}+ blog posts`);
    } else if (totalPosts < 10) {
      insights.weaknesses.push('Limited content marketing presence');
      insights.opportunities.push('Increase blog content to improve SEO and engagement');
    }
    
    if (frequency && parseInt(frequency) > 4) {
      insights.strengths.push(`Consistent publishing schedule: ${frequency}`);
    }
  }
  
  return insights;
}

async function saveAnalysis(competitorId, analysis) {
  // In a real implementation, this would save to GitHub or a database
  // For now, we'll just log it
  console.log(`Saving analysis for ${competitorId}:`, analysis);
  
  // You could implement GitHub storage here using Octokit
  // or save to a database
}