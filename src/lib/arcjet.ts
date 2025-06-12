import arcjet, { 
  shield, 
  detectBot,
  tokenBucket,
  ArcjetDecision 
} from "@arcjet/next";

// Create a base Arcjet instance
export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Arcjet API key from environment
  characteristics: ["ip.src"], // Use IP address for rate limiting
  // Global rules that apply to all routes
  rules: [
    // Shield protects against common attacks like SQL injection
    shield({
      mode: "LIVE", // Block malicious requests in production
    }),
  ],
});

// Bot protection configuration for content pages
export const botProtection = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Allow search engines
        "CATEGORY:MONITOR", // Allow monitoring services
      ],
    }),
  ],
});

// Rate limiting for API routes
export const rateLimitedRoute = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 requests per minute
      interval: 60, // 60 seconds
      capacity: 10, // Maximum 10 tokens
    }),
  ],
});

// Strict rate limiting for contact form
export const contactFormProtection = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [], // Don't allow any bots on contact form
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 3, // 3 submissions per hour
      interval: 3600, // 1 hour in seconds
      capacity: 3, // Maximum 3 tokens
    }),
  ],
});

// Helper function to handle Arcjet decisions
export function handleArcjetDecision(decision: ArcjetDecision) {
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return {
        error: "Too many requests. Please try again later.",
        status: 429,
      };
    } else if (decision.reason.isBot()) {
      return {
        error: "Bot detected. Access denied.",
        status: 403,
      };
    } else if (decision.reason.isShield()) {
      return {
        error: "Request blocked for security reasons.",
        status: 403,
      };
    }
    return {
      error: "Access denied.",
      status: 403,
    };
  }
  return null; // Request allowed
}