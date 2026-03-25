import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Footer component shared across all pages
export default function Footer() {
  return (
    <footer className="bg-forest text-cream py-12 border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Info */}
          <div>
            <h3 className="font-heading text-2xl mb-4 text-gold">The Hidden Treasure</h3>
            <p className="text-cream/80 mb-6 leading-relaxed">
              A premium mountain boutique hotel nestled in the quiet apple orchards of Kalga village, Parvati Valley.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/rooms" className="text-cream/80 hover:text-white transition-colors">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-cream/80 hover:text-white transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/getting-here" className="text-cream/80 hover:text-white transition-colors">
                  Getting Here
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-gold">Reach Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-gold shrink-0 mt-1" size={20} />
                <a 
                  href="https://maps.google.com/?q=31.9975,77.4568" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-white transition-colors"
                >
                  "The Villster", Kalga Village,<br />
                  Parvati Valley, Himachal Pradesh 175105
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-gold shrink-0" size={20} />
                <a href="tel:+918920018563" className="text-cream/80 hover:text-white transition-colors">
                  +91 89200 18563
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-3 text-gold shrink-0" size={20} />
                <span className="text-cream/80">
                  Open 24/7, Year-round
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-forest-light text-center text-sm text-cream/60 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 The Hidden Treasure. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
