import { test } from '@playwright/test';

test('Capture projects page', async ({ page }) => {
  await page.goto('http://localhost:3000/projects');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Scroll to show all projects
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(1000);
  
  // Capture full page
  await page.screenshot({ 
    path: 'projects-page-all.png', 
    fullPage: true 
  });
  
  // Also capture just the projects section
  const projectsSection = page.locator('section').nth(2);
  await projectsSection.screenshot({ 
    path: 'projects-cards.png' 
  });
  
  console.log('✅ Projects page screenshots saved');
});