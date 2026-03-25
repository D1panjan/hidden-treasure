# Hidden Treasure — Project Context

## What this is
Production hotel booking website for "The Hidden Treasure", a boutique mountain hotel 
in Kalga village, Parvati Valley, Himachal Pradesh. Built and maintained by a single 
engineer (4th year CSE student). This is a real business — real guests, real payments, 
real bookings. Not a demo or portfolio toy.

## The business
- Hotel name: The Hidden Treasure
- Location: Kalga, Parvati Valley, HP 175105
- Phone: +91 89200 18563
- Email: thehiddentreasure16@gmail.com
- Google Maps listing: "The Villster" in Kalga
- Google rating: 4.6 stars, 544 reviews
- Altitude: ~2300m, near Kheerganga trek trail
- Open: 24/7, year-round
- Target guests: trekkers, backpackers, couples, nature seekers

## Tech stack
- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS v4
- Hosting: Vercel (frontend + API routes)
- Analytics: Vercel Web Analytics + Vercel Speed Insights
- Domain: Hostinger (DNS only)
- Booking engine: StayFlexi (embedded booking widget, hotel ID: 31225)
- Payment gateway: Handled by StayFlexi booking widget (Razorpay integrated within StayFlexi)
- SEO: Next.js metadata API + JSON-LD structured data (Hotel schema)

## Project structure
- app/ — Next.js App Router pages and API routes
- app/api/ — backend API routes (weather, contact, rooms, health)
- components/ — reusable React components (Navbar, Footer, WeatherStrip, BookingWidget, ErrorBoundary)
- lib/ — shared utilities and API clients (apiClient, logger, rateLimit, stayflexi)
- public/ — static assets (images, icons)
- middleware.ts — global security headers

## Architecture
```
Frontend (Next.js SSR + ISR)
  ↓
API Layer (/api/* routes with rate limiting, validation, logging)
  ↓
Cache Layer (HTTP Cache-Control + Next.js ISR revalidate)
  ↓
External APIs (Open-Meteo for weather, StayFlexi for rooms, Resend for email)
```

## Engineering principles
- Every API route must validate inputs and handle errors gracefully
- Never expose API keys — all secrets in .env.local only
- All pages must score 90+ on Lighthouse (Performance, SEO, Accessibility)
- Mobile-first — guests are on phones with patchy hill station internet
- Images must be optimized via next/image with proper alt text
- Every page needs proper meta tags and Open Graph tags
- All external API calls go through lib/apiClient.ts (retry + logging)
- Rate limiting on all public API endpoints via lib/rateLimit.ts
- Structured JSON logging via lib/logger.ts for Vercel log aggregation
- Observability: Vercel Web Analytics and Speed Insights for performance monitoring
- React ErrorBoundary wraps all page content for graceful error handling

## Key pages
- / — Homepage with hero, features, live weather strip, reviews, CTA
- /rooms — Room listings with pricing and amenities
- /experiences — Kheerganga, Bunbuni Pass, Kasol, Manikaran
- /getting-here — Route from Delhi/Chandigarh, map embed
- /contact — Contact form (validated, rate-limited) + phone + WhatsApp link
- /booking — Embedded StayFlexi booking engine (iframe)

## Key API routes
- /api/weather — fetches live weather from Open-Meteo (cached 1hr)
- /api/contact — handles contact form with validation, rate limiting, optional Resend email
- /api/rooms — returns room data (hardcoded fallback, ready for StayFlexi API)
- /api/health — health check for uptime monitoring

## Environment variables needed
STAYFLEXI_API_KEY= (pending from StayFlexi)
STAYFLEXI_HOTEL_ID=31225
RESEND_API_KEY= (optional — contact form logs to console without it)
NEXT_PUBLIC_SITE_URL=https://thehiddentreasure.in

## What to never do
- Never use any mock/dummy data in production-facing code
- Never commit .env.local
- Never call third-party APIs from client components
- Never skip error handling in API routes
- Never use inline styles — use Tailwind classes only
- Never make the site feel like a generic template