import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingWidget from "@/components/BookingWidget";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const jost = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "The Hidden Treasure | Premium Hotel in Kalga, Parvati Valley",
  description: "A boutique mountain hotel in Kalga village, Himachal Pradesh. Experience complete quiet, mountain views, and premium meals near the Kheerganga trek basecamp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://bookingengine.stayflexi.com" />
        <link rel="dns-prefetch" href="https://bookingengine.stayflexi.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>
        <Footer />
        <BookingWidget />
      </body>
    </html>
  );
}
