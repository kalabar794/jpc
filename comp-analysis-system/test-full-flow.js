import { chromium } from 'playwright';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import API handlers
import getCompetitors from './api/get-competitors.js';
import analyzePagespeed from './api/analyze-pagespeed.js';
import analyzeContent from './api/analyze-content.js';
import analyzeSecurity from './api/analyze-security.js';
import runFullAnalysis from './api/run-full-analysis.js';

// Create test server
const app = express();
app.use(express.json());

// Serve dashboard.html as index
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

async function testFullFlow() {
    // Start server
    const server = app.listen(3002);
    console.log('Test server running on http://localhost:3002');
    
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        console.log('🔄 Testing complete analysis flow...');
        
        // Go to dashboard
        await page.goto('http://localhost:3002');
        
        // Wait for grid to load
        await page.waitForSelector('#competitorsGrid', { visible: true });
        
        // Take initial screenshot
        await page.screenshot({ path: 'flow-1-loaded.png', fullPage: true });
        console.log('✅ Dashboard loaded - screenshot saved: flow-1-loaded.png');
        
        // Get competitor count
        const cards = await page.$$('.bg-gray-800.border.border-gray-700');
        console.log(`✅ Found ${cards.length} competitor cards`);
        
        // Click on first "Analyze" button
        console.log('🔄 Clicking first analyze button...');
        const firstAnalyzeBtn = await page.$('button[onclick*="runAnalysisForCompetitor"]');
        
        if (firstAnalyzeBtn) {
            await firstAnalyzeBtn.click();
            
            // Wait for analysis to complete
            console.log('⏳ Waiting for analysis to complete...');
            await page.waitForTimeout(8000);
            
            // Take screenshot after individual analysis
            await page.screenshot({ path: 'flow-2-analyzed-one.png', fullPage: true });
            console.log('✅ Individual analysis complete - screenshot saved: flow-2-analyzed-one.png');
            
            // Check if LIVE METRICS appeared
            const liveMetrics = await page.$('h4:has-text("LIVE METRICS")');
            console.log('✅ LIVE METRICS section visible:', !!liveMetrics);
        }
        
        // Now click "Run Full Analysis"
        console.log('🔄 Clicking Run Full Analysis...');
        const fullAnalysisBtn = await page.$('button:has-text("Run Full Analysis")');
        
        if (fullAnalysisBtn) {
            await fullAnalysisBtn.click();
            
            // Wait for full analysis
            console.log('⏳ Waiting for full analysis (may take up to 60 seconds)...');
            
            // Wait and take screenshots during analysis
            await page.waitForTimeout(10000);
            await page.screenshot({ path: 'flow-3-full-analysis-progress.png', fullPage: true });
            
            await page.waitForTimeout(20000);
            await page.screenshot({ path: 'flow-4-full-analysis-final.png', fullPage: true });
            console.log('✅ Full analysis screenshots saved');
            
            // Check final state
            const allLiveMetrics = await page.$$('h4:has-text("LIVE METRICS")');
            console.log(`✅ Number of competitors with LIVE METRICS: ${allLiveMetrics.length}`);
            
            // Get some metrics values
            const perfScores = await page.$$eval('[title="Mobile Performance Score"]', 
                elements => elements.map(el => el.textContent)
            );
            console.log('✅ Performance scores found:', perfScores);
        }
        
        console.log('🎉 Flow test complete! Check the screenshots to see the actual functionality.');
        
    } catch (error) {
        console.error('❌ Test error:', error);
        await page.screenshot({ path: 'flow-error.png', fullPage: true });
    } finally {
        // Keep browser open for manual inspection
        console.log('Browser staying open for inspection. Close manually when done.');
        // Don't close browser automatically
        // await browser.close();
        // server.close();
    }
}

testFullFlow();