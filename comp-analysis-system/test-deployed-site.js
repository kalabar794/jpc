import { chromium } from 'playwright';

async function testDeployedSite() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('Testing deployed site...');
        
        // Go to the new deployed URL
        await page.goto('https://comp-analysis-system-lb4b95ru4-vibejpc.vercel.app', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Wait a bit for any authentication
        await page.waitForTimeout(3000);
        
        // Take a screenshot of what we actually see
        await page.screenshot({ 
            path: 'deployed-site-actual.png', 
            fullPage: true 
        });
        
        // Check what's actually on the page
        const pageTitle = await page.title();
        console.log('Page title:', pageTitle);
        
        // Check for key elements
        const hasAuthPage = await page.$('h1:has-text("Authentication")') !== null;
        const hasAuthRequired = await page.$('text=Authentication Required') !== null;
        const hasCompetitorGrid = await page.$('#competitorsGrid') !== null;
        const hasRunAnalysis = await page.$('button:has-text("Run Full Analysis")') !== null;
        const hasAnalyzeButtons = await page.$$('button[onclick*="runAnalysisForCompetitor"]');
        
        console.log('Has authentication page:', hasAuthPage);
        console.log('Has auth required:', hasAuthRequired);
        console.log('Has competitor grid:', hasCompetitorGrid);
        console.log('Has Run Full Analysis button:', hasRunAnalysis);
        console.log('Number of analyze buttons:', hasAnalyzeButtons.length);
        
        // Get page content preview
        const bodyText = await page.textContent('body');
        console.log('Page content preview:', bodyText.substring(0, 300));
        
        // If we see authentication, try to bypass or check what the actual dashboard looks like
        if (hasAuthPage || hasAuthRequired) {
            console.log('❌ Site is showing authentication - cannot test dashboard features');
            
            // Try to access the dashboard directly
            await page.goto('https://comp-analysis-system-1ozlc91lj-vibejpc.vercel.app/dashboard.html', {
                waitUntil: 'networkidle',
                timeout: 10000
            });
            
            await page.screenshot({ 
                path: 'deployed-dashboard-direct.png', 
                fullPage: true 
            });
            
            const dashboardTitle = await page.title();
            console.log('Dashboard direct access title:', dashboardTitle);
        }
        
    } catch (error) {
        console.error('❌ Test error:', error.message);
        
        // Take error screenshot
        await page.screenshot({ 
            path: 'deployed-site-error.png', 
            fullPage: true 
        });
    } finally {
        await browser.close();
    }
}

testDeployedSite();