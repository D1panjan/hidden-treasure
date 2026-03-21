"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const rooms = [
  {
    name: "Wooden Double King",
    size: "27 m² · Queen Bed · Up to 3 Guests",
    description: "Cozy handcrafted wooden room with a queen bed and stunning mountain views from the window. Perfect for couples or solo travellers looking for a warm basecamp.",
    price: "₹2,500",
    amenities: ["Mountain View", "Free Wi-Fi", "Daily Housekeeping", "Hot Water 24/7", "Blackout Curtains"],
    image: "https://images.unsplash.com/photo-1598928506311-c55dd580e55c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Wooden Chalet",
    size: "28 m² · Queen Bed · Up to 4 Guests",
    description: "A spacious chalet-style room built entirely from local wood. Accommodates families with extra floor bedding available. Panoramic mountain views from every angle.",
    price: "₹3,500",
    amenities: ["Mountain View", "Free Wi-Fi", "Extra Bedding Available", "Daily Housekeeping", "Blackout Curtains", "Laundry Service"],
    image: "https://images.unsplash.com/photo-1522771731550-b43bd5123d5e?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "Wooden Cabin with Balcony",
    size: "30 m² · Queen Bed · 2 Bedrooms · Up to 4 Guests",
    description: "Our finest offering — a two-bedroom wooden cabin with a private sit-out balcony overlooking the apple orchards and the valley. Total privacy and maximum comfort.",
    price: "₹4,500",
    amenities: ["Private Balcony", "Mountain & Orchard View", "2 Bedrooms", "Free Wi-Fi", "Daily Housekeeping", "Blackout Curtains", "Laundry Service"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function RoomsPage() {
  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-forest mb-4">Our Rooms</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Traditional Himachali woodwork meets modern comfort. Every room is designed to keep you warm and connected to nature.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mb-24">
          {rooms.map((room, idx) => (
            <div key={idx} className="bg-white rounded-sm overflow-hidden shadow-md border border-gold/20 flex flex-col md:flex-row">
              <div className="relative h-64 md:h-auto md:w-2/5 aspect-[4/3] md:aspect-auto">
                <Image 
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center w-full md:w-3/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-heading text-3xl text-forest">{room.name}</h2>
                    <p className="text-sm text-text-muted mt-1">{room.size}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-gold">{room.price}</span>
                    <span className="text-sm text-text-muted">per night</span>
                  </div>
                </div>
                <p className="text-text-muted mb-6 text-lg">{room.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-forest mb-3 uppercase tracking-wide text-sm">Amenities</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {room.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-center text-sm text-text-muted">
                        <Check size={16} className="text-gold mr-2" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <a 
                    href="#availability-checker"
                    className="inline-block px-8 py-3 bg-forest hover:bg-forest-light text-cream font-medium rounded-sm transition-colors"
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Availability Checker Form */}
        <div id="availability-checker" className="bg-forest text-cream p-8 md:p-12 rounded-sm shadow-xl max-w-4xl mx-auto -mb-24 relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl text-gold mb-8 text-center">Check Dates</h2>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Availability checking will be connected to StayFlexi API soon.");
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="checkin" className="text-sm font-medium tracking-wide uppercase">Check-in</label>
              <input 
                type="date" 
                id="checkin" 
                required
                className="w-full bg-cream text-forest px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="checkout" className="text-sm font-medium tracking-wide uppercase">Check-out</label>
              <input 
                type="date" 
                id="checkout" 
                required
                className="w-full bg-cream text-forest px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="guests" className="text-sm font-medium tracking-wide uppercase">Guests</label>
              <select 
                id="guests" 
                className="w-full bg-cream text-forest px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-forest font-bold py-3 px-4 rounded-sm transition-colors text-center shadow-lg"
            >
              Check
            </button>
          </form>
        </div>
      </div>
      
      {/* Visual spacer to account for the overlapping form above */}
      <div className="h-24 md:h-32 bg-forest-light w-full mt-24"></div>
    </div>
  );
}