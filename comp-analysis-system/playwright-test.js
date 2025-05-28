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

async function test() {
    // Start server
    const server = app.listen(3001);
    console.log('Test server running on http://localhost:3001');
    
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Go to dashboard
        await page.goto('http://localhost:3001');
        
        // Debug: log any console messages
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        // Wait a bit for page to load
        await page.waitForTimeout(2000);
        
        // Check what's on the page
        const loadingDiv = await page.$('#loading');
        const gridDiv = await page.$('#competitorsGrid');
        
        console.log('Loading div exists:', !!loadingDiv);
        console.log('Grid div exists:', !!gridDiv);
        
        // Get page content for debugging
        const bodyText = await page.textContent('body');
        console.log('Page content preview:', bodyText.substring(0, 200));
        
        // Check if "Run Full Analysis" button exists
        const fullAnalysisBtn = await page.$('button:has-text("Run Full Analysis")');
        console.log('✅ Run Full Analysis button:', fullAnalysisBtn ? 'Found' : 'Not found');
        
        // Check if competitor cards loaded
        const cards = await page.$$('.bg-gray-800.border.border-gray-700');
        console.log('✅ Competitor cards loaded:', cards.length);
        
        // Check for LIVE METRICS section
        const liveMetrics = await page.$('h4:has-text("LIVE METRICS")');
        console.log('✅ LIVE METRICS section:', liveMetrics ? 'Found' : 'Not found');
        
        // Take screenshot
        await page.screenshot({ path: 'dashboard-loaded.png', fullPage: true });
        console.log('✅ Screenshot saved: dashboard-loaded.png');
        
        // Try clicking analyze on first competitor
        const analyzeBtn = await page.$('button[onclick*="runAnalysisForCompetitor"]');
        if (analyzeBtn) {
            console.log('📊 Clicking analyze button...');
            await analyzeBtn.click();
            
            // Wait for analysis to start
            await page.waitForTimeout(2000);
            
            // Take another screenshot
            await page.screenshot({ path: 'dashboard-analyzing.png', fullPage: true });
            console.log('✅ Analysis screenshot saved: dashboard-analyzing.png');
        }
        
    } catch (error) {
        console.error('❌ Test error:', error);
    } finally {
        await browser.close();
        server.close();
    }
}

test();