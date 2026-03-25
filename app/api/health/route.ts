/**
 * Health check endpoint.
 * Returns the current status and timestamp.
 * Use this for uptime monitoring (e.g., UptimeRobot, Better Uptime).
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
}
