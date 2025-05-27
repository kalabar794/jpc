import puppeteer from 'puppeteer';

async function testUI() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Go to dashboard
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for content to load
    await page.waitForSelector('#competitorsGrid', { visible: true });
    
    // Take screenshot
    await page.screenshot({ 
        path: 'dashboard-test.png',
        fullPage: true 
    });
    
    console.log('Screenshot saved as dashboard-test.png');
    
    // Click on analyze button for first competitor
    const analyzeButtons = await page.$$('button[onclick*="runAnalysisForCompetitor"]');
    if (analyzeButtons.length > 0) {
        console.log('Found', analyzeButtons.length, 'analyze buttons');
        
        // Click the first one
        await analyzeButtons[0].click();
        
        // Wait a bit for analysis
        await page.waitForTimeout(5000);
        
        // Take another screenshot
        await page.screenshot({ 
            path: 'dashboard-after-analysis.png',
            fullPage: true 
        });
        
        console.log('Post-analysis screenshot saved');
    }
    
    await browser.close();
}

testUI().catch(console.error);