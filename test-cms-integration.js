const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🧪 Testing CMS Integration...\n');
  
  const baseUrl = 'https://stalwart-smakager-b57fc1.netlify.app';
  const results = {
    about: { loaded: false, cmsConnected: false, error: null },
    aiGallery: { loaded: false, cmsConnected: false, error: null },
    photoGallery: { loaded: false, cmsConnected: false, error: null },
    admin: { loaded: false, working: false, error: null }
  };
  
  try {
    // Test About Page
    console.log('📄 Testing About Page...');
    await page.goto(`${baseUrl}/about`);
    await page.waitForTimeout(3000);
    
    results.about.loaded = await page.locator('h1').isVisible();
    
    // Check if CMS content is loaded (look for the indicator)
    const cmsIndicator = await page.locator('text=/CMS Content Loaded|Fallback Content/').textContent().catch(() => '');
    results.about.cmsConnected = cmsIndicator.includes('CMS Content Loaded');
    
    console.log(`   ✅ About page loaded: ${results.about.loaded}`);
    console.log(`   📝 CMS connected: ${results.about.cmsConnected ? '✅' : '❌'} (${cmsIndicator})`);
    
    // Test AI Gallery
    console.log('\n🎨 Testing AI Gallery...');
    await page.goto(`${baseUrl}/gallery/ai`);
    await page.waitForTimeout(3000);
    
    results.aiGallery.loaded = await page.locator('h1').isVisible();
    
    // Check if gallery shows content or "no content" message
    const hasImages = await page.locator('img[alt*="AI"]').count() > 0;
    const hasNoContentMessage = await page.locator('text=/No AI Artworks Yet|Open Admin Panel/').isVisible();
    results.aiGallery.cmsConnected = hasImages || hasNoContentMessage;
    
    console.log(`   ✅ AI Gallery loaded: ${results.aiGallery.loaded}`);
    console.log(`   🖼️  CMS connected: ${results.aiGallery.cmsConnected ? '✅' : '❌'} (${hasImages ? 'Has images' : 'Empty but connected'})`);
    
    // Test Photography Gallery
    console.log('\n📸 Testing Photography Gallery...');
    await page.goto(`${baseUrl}/gallery/photography`);
    await page.waitForTimeout(3000);
    
    results.photoGallery.loaded = await page.locator('h1').isVisible();
    
    const hasPhotos = await page.locator('img[alt*="photo"]').count() > 0;
    const hasNoPhotosMessage = await page.locator('text=/No Photos Yet|Open Admin Panel/').isVisible();
    results.photoGallery.cmsConnected = hasPhotos || hasNoPhotosMessage;
    
    console.log(`   ✅ Photo Gallery loaded: ${results.photoGallery.loaded}`);
    console.log(`   📷 CMS connected: ${results.photoGallery.cmsConnected ? '✅' : '❌'} (${hasPhotos ? 'Has photos' : 'Empty but connected'})`);
    
    // Test Admin Panel
    console.log('\n⚙️  Testing Admin Panel...');
    await page.goto(`${baseUrl}/admin/`);
    await page.waitForTimeout(5000);
    
    results.admin.loaded = await page.locator('body').isVisible();
    
    // Check if login is available (means CMS is working)
    const hasLogin = await page.locator('text=/Login|GitHub/').isVisible();
    const hasError = await page.locator('text=/Error|Failed/').isVisible();
    results.admin.working = hasLogin && !hasError;
    
    console.log(`   ✅ Admin panel loaded: ${results.admin.loaded}`);
    console.log(`   🔧 Admin working: ${results.admin.working ? '✅' : '❌'} (${hasLogin ? 'Login available' : 'No login found'})`);
    
    if (hasError) {
      const errorText = await page.locator('text=/Error|Failed/').first().textContent();
      results.admin.error = errorText;
      console.log(`   ❌ Error found: ${errorText?.substring(0, 100)}...`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  // Summary
  console.log('\n📊 SUMMARY:');
  console.log('='.repeat(50));
  
  const working = [
    results.about.loaded && results.about.cmsConnected,
    results.aiGallery.loaded && results.aiGallery.cmsConnected, 
    results.photoGallery.loaded && results.photoGallery.cmsConnected,
    results.admin.loaded && results.admin.working
  ];
  
  const workingCount = working.filter(Boolean).length;
  
  console.log(`✅ About Page: ${results.about.loaded && results.about.cmsConnected ? 'WORKING' : 'BROKEN'}`);
  console.log(`✅ AI Gallery: ${results.aiGallery.loaded && results.aiGallery.cmsConnected ? 'WORKING' : 'BROKEN'}`);
  console.log(`✅ Photo Gallery: ${results.photoGallery.loaded && results.photoGallery.cmsConnected ? 'WORKING' : 'BROKEN'}`);
  console.log(`✅ Admin Panel: ${results.admin.loaded && results.admin.working ? 'WORKING' : 'BROKEN'}`);
  
  console.log(`\n🎯 RESULT: ${workingCount}/4 integrations working`);
  
  if (workingCount === 4) {
    console.log('🎉 ALL CMS INTEGRATIONS WORKING!');
  } else {
    console.log('⚠️  Some integrations need fixing');
  }
  
  await browser.close();
})();