import Anthropic from '@anthropic-ai/sdk';
import * as cheerio from 'cheerio';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, competitorName } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch the webpage
    const response = await fetch(url);
    const html = await response.text();
    
    // Parse HTML with cheerio
    const $ = cheerio.load(html);
    
    // Extract basic data
    const basicData = {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content') || '',
      h1: $('h1').first().text(),
      socialLinks: []
    };

    // Find social media links
    $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="linkedin.com"], a[href*="instagram.com"], a[href*="youtube.com"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !basicData.socialLinks.includes(href)) {
        basicData.socialLinks.push(href);
      }
    });

    // Use Claude to analyze the content
    const pageText = $('body').text().replace(/\s+/g, ' ').substring(0, 8000); // Limit text length
    
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Analyze this dental marketing competitor website for ${competitorName || 'this company'}. 
        
Page content: "${pageText}"

Extract and analyze:
1. Core services offered
2. Target market (DSOs, single practices, specialties)
3. Unique value propositions
4. Pricing model (if mentioned)
5. Technology/platforms they mention
6. Marketing channels they focus on
7. Any client numbers or success metrics mentioned

Format as JSON with these keys: services, targetMarket, valueProps, pricingModel, technology, marketingChannels, metrics`
      }]
    });

    let analysis = {};
    try {
      // Extract JSON from Claude's response
      const responseText = message.content[0].text;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse Claude response:', e);
      analysis = { error: 'Failed to parse AI analysis' };
    }

    res.status(200).json({
      basicData,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error analyzing competitor:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}