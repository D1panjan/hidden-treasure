/**
 * Rooms data API route.
 * Returns room information from StayFlexi (or hardcoded fallback).
 * Cached with HTTP headers — clients get stale data while revalidating.
 */

import { NextResponse } from "next/server";
import { getRooms } from "@/lib/stayflexi";
import { logger } from "@/lib/logger";

export async function GET() {
  const startTime = Date.now();

  try {
    const rooms = await getRooms();
    const durationMs = Date.now() - startTime;

    logger.info("rooms_api_success", {
      roomCount: rooms.length,
      durationMs,
    });

    return NextResponse.json(
      { rooms },
      {
        status: 200,
        headers: {
          // Cache for 1 hour, serve stale data for up to 24 hours while revalidating
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    const durationMs = Date.now() - startTime;
    logger.error("rooms_api_error", {
      error: (error as Error).message,
      durationMs,
    });

    return NextResponse.json(
      { error: "Failed to load room data. Please try again later." },
      { status: 500 }
    );
  }
}
