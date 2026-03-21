"use client";

import { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, Snowflake, ThermometerSun } from "lucide-react";

type WeatherData = {
  currentTemp: number;
  condition: string;
  isDay: boolean;
};

export default function WeatherStrip() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

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

  const getIcon = () => {
    const cond = data.condition.toLowerCase();
    if (cond.includes("rain") || cond.includes("drizzle")) return <CloudRain size={16} className="mr-2" />;
    if (cond.includes("snow")) return <Snowflake size={16} className="mr-2" />;
    if (cond.includes("cloud")) return <Cloud size={16} className="mr-2" />;
    if (cond.includes("clear") || cond.includes("sun")) return <Sun size={16} className="mr-2 text-gold" />;
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
