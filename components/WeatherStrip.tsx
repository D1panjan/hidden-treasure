"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  ThermometerSun,
} from "lucide-react";

type WeatherData = {
  currentTemp: number;
  condition: string;
  isDay: boolean;
};

/** Maximum number of retry attempts before giving up */
const MAX_RETRIES = 3;

/** Base delay between retries in ms — doubles each attempt */
const RETRY_DELAY_MS = 2000;

/**
 * WeatherStrip component that fetches live weather for Kalga.
 * Includes automatic retry with exponential backoff on failure.
 */
export default function WeatherStrip() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /** Fetches weather data with retry logic */
  const fetchWeather = useCallback(async (attempt: number = 1) => {
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(false);
    } catch (err) {
      console.error(`Weather fetch attempt ${attempt} failed:`, err);

      if (attempt < MAX_RETRIES) {
        // Exponential backoff: 2s, 4s, 8s
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        setTimeout(() => fetchWeather(attempt + 1), delay);
        return;
      }

      // All retries exhausted
      setError(true);
    } finally {
      if (attempt === 1) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (error) {
    return (
      <div className="bg-forest-light text-cream/80 py-2 text-center text-sm">
        Weather currently unavailable
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="bg-forest-light text-cream py-2 text-center text-sm animate-pulse">
        Fetching conditions...
      </div>
    );
  }

  /** Returns the appropriate weather icon based on the condition string */
  const getIcon = () => {
    const cond = data.condition.toLowerCase();
    if (cond.includes("rain") || cond.includes("drizzle"))
      return <CloudRain size={16} className="mr-2" />;
    if (cond.includes("snow"))
      return <Snowflake size={16} className="mr-2" />;
    if (cond.includes("cloud"))
      return <Cloud size={16} className="mr-2" />;
    if (cond.includes("clear") || cond.includes("sun"))
      return <Sun size={16} className="mr-2 text-gold" />;
    return <ThermometerSun size={16} className="mr-2" />;
  };

  return (
    <div className="bg-forest text-cream py-2 border-y border-gold/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-sm font-medium tracking-wide">
        {getIcon()}
        <span>
          Live Kalga Weather: {data.currentTemp}°C, {data.condition}
        </span>
      </div>
    </div>
  );
}
