import { chromium } from 'playwright';

async function checkMatrixPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Opening matrix page...');
  await page.goto('http://localhost:3456/matrix');
  await page.waitForTimeout(2000);
  
  // Check if the matrix is visible
  const matrixVisible = await page.isVisible('#matrixContainer');
  console.log('Matrix container visible:', matrixVisible);
  
  // Get all competitor rows
  const competitors = await page.$$eval('#matrixBody tr', rows => {
    return rows.map(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) {
        return {
          name: cells[0]?.textContent?.trim() || 'Unknown',
          blogCount: cells[1]?.querySelector('.blog-count')?.textContent?.trim() || 'N/A',
          pricing: cells[2]?.querySelector('.price-display')?.textContent?.trim() || 'N/A',
          social: cells[3]?.querySelector('.metric-subtext')?.textContent?.trim() || 'N/A'
        };
      }
      return null;
    }).filter(Boolean);
  });
  
  console.log('\nCompetitors found in table:');
  competitors.forEach(comp => {
    console.log(`- ${comp.name}: ${comp.blogCount} blog posts`);
  });
  
  // Check API response
  const apiResponse = await page.evaluate(async () => {
    const response = await fetch('http://localhost:3457/api/deep-analysis');
    return await response.json();
  });
  
  console.log('\nAPI Response:');
  if (apiResponse.competitors) {
    console.log(`Total competitors in API: ${Object.keys(apiResponse.competitors).length}`);
    for (const [id, comp] of Object.entries(apiResponse.competitors)) {
      console.log(`- ${comp.name}: ${comp.blogPosts} posts`);
    }
  } else {
    console.log('Direct format data:');
    const competitorData = Object.entries(apiResponse).filter(([k,v]) => v.metrics);
    console.log(`Total competitors: ${competitorData.length}`);
    competitorData.forEach(([id, comp]) => {
      console.log(`- ${comp.name}: ${comp.metrics?.blogs?.totalPosts || 0} posts`);
    });
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'matrix-screenshot.png', fullPage: true });
  console.log('\nScreenshot saved as matrix-screenshot.png');
  
  await browser.close();
}

checkMatrixPage().catch(console.error);