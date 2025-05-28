import { chromium } from 'playwright';

async function testDeployedRealData() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        console.log('🔍 Testing deployed site with REAL data collection...\n');
        
        const deployedUrl = 'https://competitive-intelligence-8xxn4cqih-vibejpc.vercel.app';
        
        // Go to deployed site
        await page.goto(deployedUrl, { waitUntil: 'networkidle' });
        
        // Take initial screenshot
        await page.screenshot({ path: 'deployed-real-1-loaded.png', fullPage: true });
        console.log('✅ Initial deployed site screenshot: deployed-real-1-loaded.png');
        
        // Wait for competitor grid
        await page.waitForSelector('#competitorsGrid', { visible: true });
        
        // Count competitors
        const cards = await page.$$('.bg-gray-800.border.border-gray-700');
        console.log(`✅ Found ${cards.length} competitor cards on deployed site`);
        
        // Check for "Run Full Analysis" button
        const fullAnalysisBtn = await page.$('button:has-text("Run Full Analysis")');
        console.log(`✅ "Run Full Analysis" button: ${fullAnalysisBtn ? 'Found' : 'NOT FOUND'}`);
        
        // Test individual analysis first (faster)
        console.log('\n🔄 Testing individual competitor analysis...');
        const firstAnalyzeBtn = await page.$('button[onclick*="runAnalysisForCompetitor"]');
        
        if (firstAnalyzeBtn) {
            await firstAnalyzeBtn.click();
            console.log('⏳ Waiting for individual analysis with real data...');
            
            // Wait for analysis to complete
            await page.waitForTimeout(15000); // 15 seconds for real API calls
            
            // Take screenshot after individual analysis
            await page.screenshot({ path: 'deployed-real-2-individual.png', fullPage: true });
            console.log('✅ Individual analysis screenshot: deployed-real-2-individual.png');
            
            // Check if LIVE METRICS appeared
            const liveMetrics = await page.$('h4:has-text("LIVE METRICS")');
            console.log(`✅ LIVE METRICS visible after individual analysis: ${!!liveMetrics}`);
            
            if (liveMetrics) {
                // Get the metrics
                const metricsData = await page.$eval('div:has(h4:has-text("LIVE METRICS"))', 
                    el => el.textContent
                );
                console.log('📊 Individual analysis metrics:', metricsData);
            }
        }
        
        // Now test full analysis
        if (fullAnalysisBtn) {
            console.log('\n🔄 Running full analysis with real data...');
            await fullAnalysisBtn.click();
            
            // Monitor progress
            for (let i = 0; i < 6; i++) {
                await page.waitForTimeout(10000); // Wait 10 seconds
                
                const buttonText = await fullAnalysisBtn.textContent();
                console.log(`⏳ Progress check ${i+1}/6: Button shows "${buttonText}"`);
                
                if (!buttonText.includes('Analyzing')) {
                    console.log('✅ Analysis appears complete');
                    break;
                }
                
                // Take progress screenshot
                await page.screenshot({ 
                    path: `deployed-real-3-progress-${i+1}.png`, 
                    fullPage: true 
                });
            }
            
            // Take final screenshot
            await page.screenshot({ path: 'deployed-real-4-final.png', fullPage: true });
            console.log('✅ Final analysis screenshot: deployed-real-4-final.png');
            
            // Check final results
            const allLiveMetrics = await page.$$('h4:has-text("LIVE METRICS")');
            console.log(`✅ Total competitors with LIVE METRICS: ${allLiveMetrics.length}/8`);
            
            // Get performance scores
            const perfScores = await page.$$eval('[title="Mobile Performance Score"]', 
                elements => elements.map(el => el.textContent)
            ).catch(() => []);
            console.log(`✅ Performance scores found: ${perfScores.length}`);
            if (perfScores.length > 0) {
                console.log(`📊 Sample scores: ${perfScores.slice(0, 3).join(', ')}`);
            }
            
            // Get blog counts
            const blogElements = await page.$$eval('div:has-text("posts")', 
                elements => elements.map(el => el.textContent).filter(text => text.includes('posts'))
            ).catch(() => []);
            console.log(`✅ Blog counts found: ${blogElements.length}`);
            if (blogElements.length > 0) {
                console.log(`📝 Sample blog data: ${blogElements.slice(0, 3).join(', ')}`);
            }
            
            // Get security grades  
            const sslGrades = await page.$$eval('div:has-text("SSL:")', 
                elements => elements.map(el => el.textContent)
            ).catch(() => []);
            console.log(`✅ SSL grades found: ${sslGrades.length}`);
            
            console.log('\n🎉 DEPLOYED SITE REAL DATA TEST COMPLETE!');
            console.log('📸 Check the screenshots to verify the automated features are working');
            console.log('🌐 Deployed URL:', deployedUrl);
            
        } else {
            console.log('❌ No "Run Full Analysis" button found');
        }
        
    } catch (error) {
        console.error('❌ Deployed test error:', error);
        await page.screenshot({ path: 'deployed-real-error.png', fullPage: true });
    } finally {
        console.log('\nBrowser staying open for manual verification...');
        // Keep browser open for manual inspection
    }
}

testDeployedRealData();