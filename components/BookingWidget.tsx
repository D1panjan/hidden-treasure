"use client";

import { Phone } from "lucide-react";

export default function BookingWidget() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-cream border-t border-forest/10 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3">
      <a 
        href="https://wa.me/918920018563" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-sm flex items-center justify-center font-medium shadow-sm active:scale-95 transition-transform"
      >
        WhatsApp Us
      </a>
      
      <a 
        href="tel:+918920018563"
        className="bg-forest/10 text-forest p-3 rounded-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
