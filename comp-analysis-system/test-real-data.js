import express from 'express';
import { chromium } from 'playwright';

// Import API handlers
import getCompetitors from './api/get-competitors.js';
import analyzePagespeed from './api/analyze-pagespeed.js';
import analyzeContent from './api/analyze-content.js';
import analyzeSecurity from './api/analyze-security.js';
import runFullAnalysis from './api/run-full-analysis.js';

// Create test server
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('dashboard.html', { root: './public' });
});

app.use(express.static('public'));

// API routes
app.get('/api/get-competitors', (req, res) => getCompetitors(req, res));
app.post('/api/analyze-pagespeed', (req, res) => analyzePagespeed(req, res));
app.post('/api/analyze-content', (req, res) => analyzeContent(req, res));
app.post('/api/analyze-security', (req, res) => analyzeSecurity(req, res));
app.post('/api/run-full-analysis', (req, res) => runFullAnalysis(req, res));

async function testRealDataCollection() {
    console.log('🔍 Testing REAL competitive data collection...\n');
    
    // Test real competitors
    const testCompetitors = [
        { name: 'Progressive Dental', domain: 'progressivedental.com' },
        { name: 'Firegang', domain: 'firegang.com' },
        { name: 'WEO Media', domain: 'weomedia.com' }
    ];
    
    for (const competitor of testCompetitors) {
        console.log(`\n📊 Analyzing ${competitor.name} (${competitor.domain})...\n`);
        
        // Test content analysis
        console.log('📝 Content Analysis:');
        try {
            const contentResponse = await fetch('http://localhost:3003/api/analyze-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    url: `https://${competitor.domain}`,
                    domain: competitor.domain 
                })
            });
            
            const contentData = await contentResponse.json();
            console.log(`   ✅ Blog posts found: ${contentData.content?.totalBlogPosts || 'N/A'}`);
            console.log(`   ✅ Publishing frequency: ${contentData.content?.publishingFrequency || 'Unknown'}`);
            console.log(`   ✅ Categories: ${contentData.content?.contentCategories?.join(', ') || 'None'}`);
            console.log(`   ✅ RSS feed: ${contentData.content?.hasRSSFeed ? 'Yes' : 'No'}`);
            
            if (contentData.content?.recentPosts?.length > 0) {
                console.log(`   ✅ Recent posts: ${contentData.content.recentPosts.length} found`);
                console.log(`      Latest: "${contentData.content.recentPosts[0].title}"`);
            }
        } catch (error) {
            console.log(`   ❌ Content analysis failed: ${error.message}`);
        }
        
        // Test performance analysis  
        console.log('\n⚡ Performance Analysis:');
        try {
            const perfResponse = await fetch('http://localhost:3003/api/analyze-pagespeed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: `https://${competitor.domain}` })
            });
            
            const perfData = await perfResponse.json();
            const mobile = perfData.results?.mobile?.scores;
            const desktop = perfData.results?.desktop?.scores;
            
            if (mobile) {
                console.log(`   ✅ Mobile performance: ${Math.round(mobile.performance || 0)}/100`);
                console.log(`   ✅ Mobile SEO: ${Math.round(mobile.seo || 0)}/100`);
            }
            if (desktop) {
                console.log(`   ✅ Desktop performance: ${Math.round(desktop.performance || 0)}/100`);
            }
            
            if (perfData.fallback) {
                console.log(`   ⚠️  Using fallback data (load time: ${perfData.loadTime}ms)`);
            }
        } catch (error) {
            console.log(`   ❌ Performance analysis failed: ${error.message}`);
        }
        
        // Test security analysis
        console.log('\n🔒 Security Analysis:');
        try {
            const secResponse = await fetch('http://localhost:3003/api/analyze-security', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: competitor.domain })
            });
            
            const secData = await secResponse.json();
            const security = secData.security?.security;
            
            if (security) {
                console.log(`   ✅ Security score: ${security.score}/100`);
                console.log(`   ✅ SSL valid: ${secData.security.ssl?.valid ? 'Yes' : 'No'}`);
                console.log(`   ✅ SSL expires: ${secData.security.ssl?.daysUntilExpiry} days`);
                
                if (security.issues?.length > 0) {
                    console.log(`   ⚠️  Issues found: ${security.issues.join(', ')}`);
                }
            }
        } catch (error) {
            console.log(`   ❌ Security analysis failed: ${error.message}`);
        }
        
        console.log('\n' + '─'.repeat(80));
    }
}

async function testDashboardFlow() {
    console.log('\n🖥️  Testing dashboard with real data...\n');
    
    // Start server
    const server = app.listen(3003);
    console.log('Test server running on http://localhost:3003');
    
    // Test API data collection first
    await testRealDataCollection();
    
    // Test dashboard UI
    console.log('\n🎭 Testing dashboard UI...\n');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Go to dashboard
        await page.goto('http://localhost:3003');
        await page.waitForSelector('#competitorsGrid', { visible: true });
        
        // Take initial screenshot
        await page.screenshot({ path: 'real-data-1-initial.png', fullPage: true });
        console.log('✅ Initial dashboard screenshot: real-data-1-initial.png');
        
        // Count competitor cards
        const cards = await page.$$('.bg-gray-800.border.border-gray-700');
        console.log(`✅ Found ${cards.length} competitor cards`);
        
        // Click "Run Full Analysis" and wait for real results
        const fullAnalysisBtn = await page.$('button:has-text("Run Full Analysis")');
        if (fullAnalysisBtn) {
            console.log('🔄 Clicking "Run Full Analysis" - this will take time with real data...');
            await fullAnalysisBtn.click();
            
            // Wait longer for real API calls
            await page.waitForTimeout(30000); // 30 seconds
            
            // Take progress screenshot
            await page.screenshot({ path: 'real-data-2-progress.png', fullPage: true });
            console.log('✅ Progress screenshot: real-data-2-progress.png');
            
            // Wait for completion
            await page.waitForTimeout(30000); // Another 30 seconds
            
            // Take final screenshot
            await page.screenshot({ path: 'real-data-3-final.png', fullPage: true });
            console.log('✅ Final screenshot: real-data-3-final.png');
            
            // Check for LIVE METRICS
            const liveMetrics = await page.$$('h4:has-text("LIVE METRICS")');
            console.log(`✅ Competitors with LIVE METRICS: ${liveMetrics.length}`);
            
            // Get actual performance scores
            const perfScores = await page.$$eval('[title="Mobile Performance Score"]', 
                elements => elements.map(el => el.textContent)
            );
            console.log('✅ Real performance scores:', perfScores);
            
            // Get blog counts
            const blogCounts = await page.$$eval('div:has-text("posts")', 
                elements => elements.map(el => el.textContent).filter(text => text.includes('posts'))
            );
            console.log('✅ Real blog counts:', blogCounts);
        }
        
        console.log('\n🎉 Real data test complete! Check screenshots for verification.');
        
    } catch (error) {
        console.error('❌ Dashboard test error:', error);
        await page.screenshot({ path: 'real-data-error.png', fullPage: true });
    } finally {
        // Keep browser open for inspection
        console.log('\nBrowser staying open for manual verification...');
        // Don't close automatically
    }
}

testDashboardFlow().catch(console.error);