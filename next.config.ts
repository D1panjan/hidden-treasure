import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bookingengine.stayflexi.com",
      },
    ],
    // Optimize image quality for mountain hotel photos
    formats: ["image/avif", "image/webp"],
  },
  // Enable HTTP compression for faster responses
  compress: true,
  // Strict mode for catching potential issues during development
  reactStrictMode: true,
  // Reduce bundle size by enabling tree shaking for barrel files
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
