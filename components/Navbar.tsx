"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// The main navigation bar with a mobile hamburger menu
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading text-2xl font-semibold text-forest">
              The Hidden Treasure
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/rooms" className="text-text-main hover:text-gold transition-colors">
              Rooms
            </Link>
            <Link href="/experiences" className="text-text-main hover:text-gold transition-colors">
              Experiences
            </Link>
            <Link href="/getting-here" className="text-text-main hover:text-gold transition-colors">
              Getting Here
            </Link>
            <Link href="/contact" className="text-text-main hover:text-gold transition-colors">
              Contact
            </Link>
            <Link
              href="/rooms"
              className="bg-forest hover:bg-forest-light text-cream px-6 py-2.5 rounded-sm transition-colors uppercase tracking-wide text-sm font-medium"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-forest hover:text-gold p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cream border-t border-gold/10 absolute w-full left-0 shadow-lg">
          <div className="px-4 py-4 space-y-3 flex flex-col">
            <Link
              href="/rooms"
              className="block px-3 py-2 text-text-main hover:text-gold hover:bg-gold/5 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Rooms
            </Link>
            <Link
              href="/experiences"
              className="block px-3 py-2 text-text-main hover:text-gold hover:bg-gold/5 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Experiences
            </Link>
            <Link
              href="/getting-here"
              className="block px-3 py-2 text-text-main hover:text-gold hover:bg-gold/5 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Getting Here
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-text-main hover:text-gold hover:bg-gold/5 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/rooms"
              className="block w-full text-center mt-4 bg-forest text-cream px-3 py-3 rounded-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
