/**
 * Weather API route.
 * Fetches current weather for Kalga from Open-Meteo (free, no API key needed).
 * Includes rate limiting, structured logging, and HTTP cache headers.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

/** Standard WMO Weather interpretation codes mapped to human-readable strings */
function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear sky";
  if (code === 1 || code === 2 || code === 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Unknown";
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Rate limit check — 30 requests per IP per minute
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 30, 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimit),
        }
      );
    }

    // Kalga coordinates: 31.9975° N, 77.4568° E
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=31.9975&longitude=77.4568&current=temperature_2m,is_day,weather_code&timezone=auto";

    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`Open-Meteo returned ${response.status}`);
    }

    const data = await response.json();

    const currentTemp = Math.round(data.current.temperature_2m);
    const isDay = data.current.is_day === 1;
    const condition = getWeatherCondition(data.current.weather_code);

    const durationMs = Date.now() - startTime;

    logger.info("weather_api_success", {
      currentTemp,
      condition,
      durationMs,
    });

    return NextResponse.json(
      { currentTemp, isDay, condition },
      {
        status: 200,
        headers: {
          // Cache for 1 hour, serve stale for 30 min while revalidating
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=1800",
          ...rateLimitHeaders(rateLimit),
        },
      }
    );
  } catch (error) {
    const durationMs = Date.now() - startTime;

    logger.error("weather_api_error", {
      error: (error as Error).message,
      durationMs,
    });

    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
