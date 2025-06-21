// Use Web Crypto API for edge runtime compatibility
const encoder = new TextEncoder();

/**
 * Hash an IP address for privacy compliance (GDPR)
 * Uses SHA-256 with a daily rotating salt to prevent rainbow table attacks
 * while still allowing daily analytics
 */
export async function hashIP(ip: string | null | undefined): Promise<string> {
  if (!ip) return 'unknown';
  
  // Create a daily salt to rotate hashes
  const today = new Date().toISOString().split('T')[0];
  const salt = process.env.IP_HASH_SALT || 'default-salt';
  const dailySalt = `${salt}-${today}`;
  
  // Hash the IP with the daily salt using Web Crypto API
  const data = encoder.encode(ip + dailySalt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.substring(0, 16); // Use first 16 chars for brevity
}

/**
 * Anonymize IP address by removing last octet (IPv4) or last 64 bits (IPv6)
 * This is an alternative to hashing that maintains some geographic info
 */
export function anonymizeIP(ip: string | null | undefined): string {
  if (!ip) return 'unknown';
  
  // IPv4
  if (ip.includes('.')) {
    const parts = ip.split('.');
    parts[3] = '0';
    return parts.join('.');
  }
  
  // IPv6
  if (ip.includes(':')) {
    const parts = ip.split(':');
    // Zero out last 4 segments (64 bits)
    for (let i = 4; i < 8; i++) {
      if (parts[i]) parts[i] = '0';
    }
    return parts.join(':');
  }
  
  return 'unknown';
}