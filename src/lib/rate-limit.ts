interface RateLimitOptions {
  interval: number; // Time frame in milliseconds
  uniqueTokenPerInterval: number; // Max unique tokens per interval
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

class RateLimiter {
  private buckets: Map<string, TokenBucket>;
  private readonly maxTokens: number;
  private readonly refillRate: number; // tokens per millisecond
  private cleanupInterval: NodeJS.Timeout;

  constructor(
    private readonly options: {
      tokensPerInterval: number;
      interval: number;
      maxTokens?: number;
    }
  ) {
    this.buckets = new Map();
    this.maxTokens = options.maxTokens || options.tokensPerInterval;
    this.refillRate = options.tokensPerInterval / options.interval;

    // Clean up expired buckets every hour
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, bucket] of this.buckets.entries()) {
        if (now - bucket.lastRefill > options.interval * 2) {
          this.buckets.delete(key);
        }
      }
    }, 60 * 60 * 1000); // Every hour
  }

  cleanup() {
    clearInterval(this.cleanupInterval);
    this.buckets.clear();
  }

  async consume(key: string, tokens = 1): Promise<RateLimitResult> {
    // Skip rate limiting if disabled via env var
    if (process.env.RATE_LIMIT_DISABLED === 'true') {
      return {
        success: true,
        limit: this.maxTokens,
        remaining: this.maxTokens,
        resetTime: new Date(Date.now() + this.options.interval)
      };
    }

    const now = Date.now();
    let bucket = this.buckets.get(key);

    // Initialize bucket if it doesn't exist
    if (!bucket) {
      bucket = {
        tokens: this.maxTokens - tokens,
        lastRefill: now,
      };
      this.buckets.set(key, bucket);
      return {
        success: true,
        limit: this.maxTokens,
        remaining: this.maxTokens - tokens,
        resetTime: new Date(now + this.options.interval),
      };
    }

    // Calculate how many tokens to add based on time passed
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = timePassed * this.refillRate;

    // Update bucket
    bucket.tokens = Math.min(
      this.maxTokens,
      bucket.tokens + tokensToAdd
    );
    bucket.lastRefill = now;

    // Check if request is allowed
    if (bucket.tokens >= tokens) {
      bucket.tokens -= tokens;
      return {
        success: true,
        limit: this.maxTokens,
        remaining: Math.floor(bucket.tokens),
        resetTime: new Date(now + (1 / this.refillRate) * 1000),
      };
    }

    return {
      success: false,
      limit: this.maxTokens,
      remaining: 0,
      resetTime: new Date(now + ((tokens - bucket.tokens) / this.refillRate) * 1000),
    };
  }
}

// Create a singleton instance
let rateLimiter: RateLimiter | null = null;

export function createRateLimit(options: RateLimitOptions) {
  if (!rateLimiter) {
    rateLimiter = new RateLimiter({
      tokensPerInterval: options.uniqueTokenPerInterval,
      interval: options.interval,
    });
  }

  return {
    check: async (key: string, cost = 1): Promise<RateLimitResult> => {
      if (!rateLimiter) {
        throw new Error('Rate limiter not initialized');
      }
      return rateLimiter.consume(key, cost);
    },
  };
}

// Default export for backward compatibility
const rateLimit = (options: RateLimitOptions) => createRateLimit(options);
export default rateLimit;
// Global rate limiter for middleware (stricter)
export const globalRateLimiter = createRateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

// Local rate limiter for API routes (more permissive)
export const localRateLimiter = createRateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 1000,
});
