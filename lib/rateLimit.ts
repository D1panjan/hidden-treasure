/**
 * In-memory sliding window rate limiter.
 * Tracks request counts per IP address using a Map.
 * 
 * Note: On Vercel serverless, each function instance has its own memory,
 * so this won't perfectly share state across instances. But it still
 * prevents rapid abuse from a single client hitting the same instance.
 * For stronger protection, upgrade to Upstash Redis rate limiting later.
 */

import { logger } from "./logger";

/** Stores the request timestamps for each IP address */
type RateLimitEntry = {
  /** Timestamps of recent requests within the window */
  timestamps: number[];
};

/** The in-memory store for rate limit tracking */
const rateLimitStore = new Map<string, RateLimitEntry>();

/** Clean up expired entries every 5 minutes to prevent memory leaks */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

let lastCleanup = Date.now();

/**
 * Removes expired entries from the rate limit store.
 * Called automatically before each rate limit check.
 */
function cleanupExpiredEntries(windowMs: number): void {
  const now = Date.now();

  // Only clean up every 5 minutes to avoid overhead
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  const cutoff = now - windowMs;

  for (const [key, entry] of rateLimitStore.entries()) {
    // Remove timestamps older than the window
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

    // Remove the entry entirely if no recent timestamps
    if (entry.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  }
}

/** Result of a rate limit check */
type RateLimitResult = {
  /** Whether the request is allowed */
  allowed: boolean;
  /** How many requests remain in the current window */
  remaining: number;
  /** Unix timestamp (seconds) when the window resets */
  resetAt: number;
};

/**
 * Checks if a request from the given IP is within the rate limit.
 * Uses a sliding window algorithm.
 * 
 * @param ip - The client IP address
 * @param maxRequests - Maximum requests allowed in the window (default: 10)
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  // Periodically clean up old entries
  cleanupExpiredEntries(windowMs);

  // Get or create the entry for this IP
  let entry = rateLimitStore.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitStore.set(ip, entry);
  }

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  const remaining = Math.max(0, maxRequests - entry.timestamps.length);
  const resetAt = Math.ceil((now + windowMs) / 1000);

  if (entry.timestamps.length >= maxRequests) {
    logger.warn("rate_limit_exceeded", {
      ip,
      maxRequests,
      windowMs,
      currentCount: entry.timestamps.length,
    });

    return { allowed: false, remaining: 0, resetAt };
  }

  // Record this request
  entry.timestamps.push(now);

  return { allowed: true, remaining: remaining - 1, resetAt };
}

/**
 * Returns standard rate limit headers for the HTTP response.
 * Attach these to API responses so clients know their limits.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAt),
  };
}
