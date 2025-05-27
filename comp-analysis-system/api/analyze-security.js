import https from 'https';
import { URL } from 'url';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const results = {
      ssl: {},
      headers: {},
      security: {
        score: 0,
        issues: [],
        recommendations: []
      }
    };

    // Check SSL certificate
    try {
      const sslInfo = await checkSSLCertificate(domain);
      results.ssl = sslInfo;
    } catch (error) {
      results.ssl.error = error.message;
    }

    // Check security headers
    try {
      const headers = await checkSecurityHeaders(domain);
      results.headers = headers;
    } catch (error) {
      results.headers.error = error.message;
    }

    // Calculate security score
    let score = 0;
    
    // SSL scoring (40 points)
    if (results.ssl.valid) score += 20;
    if (results.ssl.daysUntilExpiry > 30) score += 10;
    if (results.ssl.issuer?.includes('Let\'s Encrypt') || results.ssl.issuer?.includes('DigiCert')) score += 10;
    
    // Security headers scoring (60 points)
    if (results.headers.strictTransportSecurity) score += 15;
    if (results.headers.contentSecurityPolicy) score += 15;
    if (results.headers.xFrameOptions) score += 10;
    if (results.headers.xContentTypeOptions) score += 10;
    if (results.headers.referrerPolicy) score += 5;
    if (results.headers.permissionsPolicy) score += 5;
    
    results.security.score = score;
    
    // Generate issues and recommendations
    if (!results.ssl.valid) {
      results.security.issues.push('Invalid SSL certificate');
      results.security.recommendations.push('Install a valid SSL certificate');
    }
    
    if (results.ssl.daysUntilExpiry < 30) {
      results.security.issues.push(`SSL certificate expires in ${results.ssl.daysUntilExpiry} days`);
      results.security.recommendations.push('Renew SSL certificate soon');
    }
    
    if (!results.headers.strictTransportSecurity) {
      results.security.issues.push('Missing HSTS header');
      results.security.recommendations.push('Enable HTTP Strict Transport Security');
    }
    
    if (!results.headers.contentSecurityPolicy) {
      results.security.issues.push('Missing Content Security Policy');
      results.security.recommendations.push('Implement Content Security Policy to prevent XSS attacks');
    }
    
    res.status(200).json({
      domain,
      timestamp: new Date().toISOString(),
      security: results
    });
    
  } catch (error) {
    console.error('Security analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}

async function checkSSLCertificate(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 443,
      method: 'GET',
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      const cert = res.socket.getPeerCertificate();
      
      if (cert && cert.subject) {
        const now = new Date();
        const expiry = new Date(cert.valid_to);
        const daysUntilExpiry = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));
        
        resolve({
          valid: res.socket.authorized || true,
          issuer: cert.issuer?.O || cert.issuer?.CN,
          subject: cert.subject?.CN,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          daysUntilExpiry,
          protocol: res.socket.getProtocol(),
          cipher: res.socket.getCipher()?.name
        });
      } else {
        resolve({ valid: false, error: 'No certificate found' });
      }
    });

    req.on('error', (error) => {
      resolve({ valid: false, error: error.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ valid: false, error: 'Connection timeout' });
    });

    req.end();
  });
}

async function checkSecurityHeaders(domain) {
  return new Promise((resolve) => {
    const url = `https://${domain}`;
    
    fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WEO-SecurityBot/1.0)'
      }
    })
    .then(response => {
      const headers = {};
      
      // Check for important security headers
      headers.strictTransportSecurity = response.headers.get('strict-transport-security');
      headers.contentSecurityPolicy = response.headers.get('content-security-policy');
      headers.xFrameOptions = response.headers.get('x-frame-options');
      headers.xContentTypeOptions = response.headers.get('x-content-type-options');
      headers.referrerPolicy = response.headers.get('referrer-policy');
      headers.permissionsPolicy = response.headers.get('permissions-policy');
      headers.xXssProtection = response.headers.get('x-xss-protection');
      
      // Check for server info disclosure
      headers.server = response.headers.get('server');
      headers.xPoweredBy = response.headers.get('x-powered-by');
      
      resolve(headers);
    })
    .catch(error => {
      resolve({ error: error.message });
    });
  });
}