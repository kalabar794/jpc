import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

async function testAPIs() {
    console.log('Testing Competitive Analysis APIs...\n');
    
    // Test 1: PageSpeed API
    console.log('1. Testing PageSpeed API...');
    try {
        const response = await fetch(`${BASE_URL}/analyze-pagespeed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: 'https://weomedia.com' })
        });
        const data = await response.json();
        console.log('✅ PageSpeed API:', response.ok ? 'Working' : 'Failed');
        if (data.results?.mobile?.scores?.performance) {
            console.log(`   Mobile Performance: ${data.results.mobile.scores.performance}`);
        }
    } catch (error) {
        console.log('❌ PageSpeed API Error:', error.message);
    }
    
    // Test 2: Content Analysis API
    console.log('\n2. Testing Content Analysis API...');
    try {
        const response = await fetch(`${BASE_URL}/analyze-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                url: 'https://progressivedental.com',
                domain: 'progressivedental.com' 
            })
        });
        const data = await response.json();
        console.log('✅ Content API:', response.ok ? 'Working' : 'Failed');
        if (data.content?.totalBlogPosts) {
            console.log(`   Blog Posts Found: ${data.content.totalBlogPosts}`);
        }
    } catch (error) {
        console.log('❌ Content API Error:', error.message);
    }
    
    // Test 3: Security Analysis API
    console.log('\n3. Testing Security Analysis API...');
    try {
        const response = await fetch(`${BASE_URL}/analyze-security`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain: 'weomedia.com' })
        });
        const data = await response.json();
        console.log('✅ Security API:', response.ok ? 'Working' : 'Failed');
        if (data.security?.security?.score !== undefined) {
            console.log(`   Security Score: ${data.security.security.score}/100`);
        }
    } catch (error) {
        console.log('❌ Security API Error:', error.message);
    }
    
    // Test 4: Full Analysis API
    console.log('\n4. Testing Full Analysis API...');
    try {
        const response = await fetch(`${BASE_URL}/run-full-analysis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ competitorId: 'weo_media' })
        });
        const data = await response.json();
        console.log('✅ Full Analysis API:', response.ok ? 'Working' : 'Failed');
        if (data.overallScore !== undefined) {
            console.log(`   Overall Score: ${data.overallScore}/100`);
        }
    } catch (error) {
        console.log('❌ Full Analysis API Error:', error.message);
    }
}

// Run tests
testAPIs().catch(console.error);