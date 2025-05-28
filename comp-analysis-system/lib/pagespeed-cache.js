// Simple in-memory cache for PageSpeed results
// In production, this should use Redis or similar
const cache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function getCachedResult(url, strategy) {
  const key = `${url}-${strategy}`;
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Using cached PageSpeed result for ${key}`);
    return cached.data;
  }
  
  return null;
}

export function setCachedResult(url, strategy, data) {
  const key = `${url}-${strategy}`;
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  console.log(`Cached PageSpeed result for ${key}`);
}

// Quota tracking
let dailyRequests = 0;
let lastResetDate = new Date().toDateString();

export function canMakeRequest() {
  const today = new Date().toDateString();
  
  // Reset counter if it's a new day
  if (today !== lastResetDate) {
    dailyRequests = 0;
    lastResetDate = today;
  }
  
  // Conservative limit - keep well under the 25,000/day limit
  const DAILY_LIMIT = 100;
  return dailyRequests < DAILY_LIMIT;
}

export function incrementRequestCount() {
  dailyRequests++;
  console.log(`PageSpeed API requests today: ${dailyRequests}`);
}