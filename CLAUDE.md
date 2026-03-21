# Hidden Treasure — Project Context

## What this is
Production hotel booking website for "The Hidden Treasure", a boutique mountain hotel 
in Kalga village, Parvati Valley, Himachal Pradesh. Built and maintained by a single 
engineer (4th year CSE student). This is a real business — real guests, real payments, 
real bookings. Not a demo or portfolio toy.

## The business
- Hotel name: The Hidden Treasure
- Location: Kalga, Parvati Valley, HP 175105
- Phone: +91 85271 70999
- Google Maps listing: "The Wilstor" in Kalga
- Google rating: 4.6 stars, 544 reviews
- Altitude: ~2300m, near Kheerganga trek trail
- Open: 24/7, year-round
- Target guests: trekkers, backpackers, couples, nature seekers

## Tech stack
- Framework: Next.js 14 (App Router, TypeScript)
- Styling: Tailwind CSS
- Hosting: Vercel (frontend + API routes)
- Domain: Hostinger (DNS only)
- Booking engine: StayFlexi (API integration)
- Payment gateway: Razorpay (direct to owner's bank)
- Email: Resend (transactional emails)
- SEO: next-seo + JSON-LD structured data

## Project structure
- app/ — Next.js App Router pages and API routes
- app/api/ — backend API routes (webhook handlers, payment, availability)
- components/ — reusable React components
- lib/ — third-party API clients (StayFlexi, Razorpay, Resend)
- public/ — static assets (images, icons)

## Engineering principles
- Every API route must validate inputs and handle errors gracefully
- Never expose API keys — all secrets in .env.local only
- Razorpay webhook must verify signature before processing
- StayFlexi API calls must be server-side only (API routes, never client)
- All pages must score 90+ on Lighthouse (Performance, SEO, Accessibility)
- Mobile-first — guests are on phones with patchy hill station internet
- Images must be optimized via next/image with proper alt text
- Every page needs proper meta tags and Open Graph tags

## Key pages
- / — Homepage with hero, features, live weather strip, reviews, CTA
- /rooms — Room listings with availability checker
- /experiences — Kheerganga, Bunbuni Pass, Kasol, Manikaran
- /getting-here — Route from Delhi/Chandigarh, map embed
- /contact — Contact form + phone + WhatsApp link

## Key API routes
- /api/availability — fetches live room availability from StayFlexi
- /api/payment/create-order — creates Razorpay order server-side
- /api/payment/webhook — verifies and processes Razorpay payment confirmation
- /api/contact — handles contact form, sends email via Resend

## Environment variables needed
STAYFLEXI_API_KEY=
STAYFLEXI_PROPERTY_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_SITE_URL=

## What to never do
- Never use any mock/dummy data in production-facing code
- Never commit .env.local
- Never call third-party APIs from client components
- Never skip error handling in API routes
- Never use inline styles — use Tailwind classes only
- Never make the site feel like a generic template