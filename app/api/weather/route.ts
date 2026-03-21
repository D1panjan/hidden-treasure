import { NextResponse } from "next/server";

// Standard WMO Weather interpretation codes
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

export async function GET() {
  try {
    // Kalga coordinates: 31.9975° N, 77.4568° E
    const url = "https://api.open-meteo.com/v1/forecast?latitude=31.9975&longitude=77.4568&current=temperature_2m,is_day,weather_code&timezone=auto";
    
    const response = await fetch(url, { next: { revalidate: 3600 } }); // cache for 1 hour
    if (!response.ok) {
      throw new Error("Failed to fetch from Open-Meteo");
    }

    const data = await response.json();

    const currentTemp = Math.round(data.current.temperature_2m);
    const isDay = data.current.is_day === 1;
    const condition = getWeatherCondition(data.current.weather_code);

    return NextResponse.json({
      currentTemp,
      isDay,
      condition,
    });
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
