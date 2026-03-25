import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingWidget from "@/components/BookingWidget";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

/** Global metadata with Open Graph tags for social sharing */
export const metadata: Metadata = {
  metadataBase: new URL("https://thehiddentreasure.in"),
  title: "The Hidden Treasure | Premium Hotel in Kalga, Parvati Valley",
  description:
    "A boutique mountain hotel in Kalga village, Himachal Pradesh. Experience complete quiet, mountain views, and premium meals near the Kheerganga trek basecamp.",
  keywords: [
    "Kalga hotel",
    "Parvati Valley stay",
    "Kheerganga basecamp",
    "mountain hotel Himachal",
    "boutique hotel Kalga",
    "The Hidden Treasure",
    "Kasol nearby hotel",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Hidden Treasure",
    title: "The Hidden Treasure | Premium Hotel in Kalga, Parvati Valley",
    description:
      "A boutique mountain hotel in Kalga village, near Kheerganga trek. Wooden rooms, panoramic views, bonfire evenings.",
    images: [
      {
        url: "/images/THT_Photos/Apple_Cottage/SUM04131.jpg",
        width: 1200,
        height: 630,
        alt: "The Hidden Treasure - Apple Cottage with mountain views",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hidden Treasure | Kalga, Parvati Valley",
    description:
      "Boutique mountain hotel in Kalga. Wooden rooms, treks, bonfire evenings.",
    images: ["/images/THT_Photos/Apple_Cottage/SUM04131.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "YOUR_VERIFICATION_CODE_HERE",
  },
};

/** JSON-LD structured data for Google rich results */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "The Hidden Treasure",
  alternateName: "The Villster",
  description:
    "A premium boutique mountain hotel in Kalga village, Parvati Valley, Himachal Pradesh. Near Kheerganga trek basecamp.",
  url: "https://thehiddentreasure.in",
  telephone: "+918920018563",
  email: "thehiddentreasure16@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kalga Village",
    addressLocality: "Parvati Valley",
    addressRegion: "Himachal Pradesh",
    postalCode: "175105",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.9975,
    longitude: 77.4568,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "544",
    bestRating: "5",
  },
  starRating: {
    "@type": "Rating",
    ratingValue: "3",
  },
  checkinTime: "12:00",
  checkoutTime: "11:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi" },
    { "@type": "LocationFeatureSpecification", name: "Mountain Views" },
    { "@type": "LocationFeatureSpecification", name: "Bonfire" },
    { "@type": "LocationFeatureSpecification", name: "Home-cooked Meals" },
  ],
  priceRange: "₹1,000 - ₹5,000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://bookingengine.stayflexi.com" />
        <link
          rel="dns-prefetch"
          href="https://bookingengine.stayflexi.com"
        />
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow flex flex-col relative">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
        <BookingWidget />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
