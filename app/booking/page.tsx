"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

/**
 * BookingPage component that embeds the StayFlexi booking engine in an iframe.
 * Providing a seamless, inline booking experience for guests.
 */
export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(true);

  // The StayFlexi booking engine URL for the hotel
  const bookingUrl = "https://bookingengine.stayflexi.com/?hotel_id=31225";

  return (
    <div className="bg-cream min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl text-forest mb-2">Book Your Stay</h1>
          <p className="text-forest/60 italic">Secure your retreat in the heart of Kalga</p>
        </div>

        <div className="relative w-full bg-white rounded-sm shadow-2xl border border-gold/10 overflow-hidden min-h-[800px]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/50 backdrop-blur-sm z-10 transition-opacity duration-500">
              <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
              <p className="font-heading text-xl text-forest tracking-wider uppercase">Loading Booking Engine...</p>
            </div>
          )}
          
          <iframe
            src={bookingUrl}
            className="w-full min-h-[800px] border-none"
            onLoad={() => setIsLoading(false)}
            title="StayFlexi Booking Engine"
            allow="payment"
          />
        </div>

        <div className="mt-8 text-center text-forest/40 text-sm">
          <p>Powered by StayFlexi Booking Engine &bull; Secure Connection</p>
        </div>
      </div>
    </div>
  );
}
