/**
 * Centralized HTTP client with retry logic, timeout, and structured error handling.
 * All external API calls in the app should go through this client.
 */

import { logger } from "./logger";

/** Options for configuring an API request */
type ApiClientOptions = {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Request timeout in milliseconds (default: 10000) */
  timeoutMs?: number;
  /** Base delay between retries in ms — doubles each attempt (default: 1000) */
  retryDelayMs?: number;
  /** Additional headers to send */
  headers?: Record<string, string>;
  /** Cache control for Next.js fetch — seconds to cache (default: no cache) */
  revalidate?: number;
};

/** Standard error returned by the API client */
export class ApiError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

/**
 * Waits for a given number of milliseconds.
 * Used for retry backoff delays.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Makes an HTTP GET request with automatic retries and exponential backoff.
 * Logs every attempt and failure for observability.
 */
export async function apiGet<T>(
  url: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    timeoutMs = 10000,
    retryDelayMs = 1000,
    headers = {},
    revalidate,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal: controller.signal,
      };

      // Add Next.js caching if specified
      if (revalidate !== undefined) {
        fetchOptions.next = { revalidate };
      }

      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      const durationMs = Date.now() - startTime;

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          url
        );
      }

      const data = (await response.json()) as T;

      logger.info("api_request_success", {
        url,
        attempt,
        durationMs,
        status: response.status,
      });

      return data;
    } catch (error) {
      const durationMs = Date.now() - startTime;
      lastError = error as Error;

      logger.warn("api_request_failed", {
        url,
        attempt,
        maxRetries,
        durationMs,
        error: (error as Error).message,
      });

      // Don't retry on 4xx errors (client errors) — only retry on 5xx/network errors
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = retryDelayMs * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
  }

  // All retries exhausted
  logger.error("api_request_exhausted", {
    url,
    maxRetries,
    error: lastError?.message || "Unknown error",
  });

  throw lastError || new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
}

/**
 * Makes an HTTP POST request with automatic retries and exponential backoff.
 * Used for contact form submissions, webhook calls, etc.
 */
export async function apiPost<T>(
  url: string,
  body: unknown,
  options: ApiClientOptions = {}
): Promise<T> {
  const {
    maxRetries = 2,
    timeoutMs = 10000,
    retryDelayMs = 1000,
    headers = {},
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const durationMs = Date.now() - startTime;

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          url
        );
      }

      const data = (await response.json()) as T;

      logger.info("api_post_success", {
        url,
        attempt,
        durationMs,
        status: response.status,
      });

      return data;
    } catch (error) {
      const durationMs = Date.now() - startTime;
      lastError = error as Error;

      logger.warn("api_post_failed", {
        url,
        attempt,
        maxRetries,
        durationMs,
        error: (error as Error).message,
      });

      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = retryDelayMs * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
  }

  logger.error("api_post_exhausted", {
    url,
    maxRetries,
    error: lastError?.message || "Unknown error",
  });

  throw lastError || new Error(`Failed to POST ${url} after ${maxRetries} attempts`);
}
