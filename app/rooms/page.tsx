import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

const rooms = [
  {
    name: "Khanoor",
    size: "20 m² · Queen Bed · Up to 3 Guests",
    description: "Khanoor Room is a comfortable, well-furnished space ideal for short stays, offering privacy, convenience, and a peaceful ambiance.",
    price: "₹1,000",
    amenities: ["Mountain View", "Shared Bathroom", "Heating", "Hardwood Floors", "Free Wi-Fi", "Daily Housekeeping"],
    image: "/images/rooms/khanoor_1.jpg"
  },
  {
    name: "Mohru",
    size: "24 m² · Queen Bed · Up to 3 Guests",
    description: "A tranquil wooden room offering a blend of rustic charm and modern comfort, perfect for those seeking peace and scenic views.",
    price: "₹2,000",
    amenities: ["Mountain View", "Private Bathroom", "Balcony", "Private Entrance", "Fire Pit Access", "Electric Blankets"],
    image: "/images/rooms/mohru_1.jpg"
  },
  {
    name: "Deodar",
    size: "26 m² · King Bed · Up to 3 Guests",
    description: "The Deodar Room is a cozy, elegantly designed space featuring wooden accents, serene views, and modern amenities for a relaxing stay.",
    price: "₹2,200",
    amenities: ["Mountain View", "Private Bathroom", "King Bed", "Hardwood Floors", "Electric Blankets", "Daily Housekeeping"],
    image: "/images/rooms/deodar_1.jpg"
  },
  {
    name: "Apple Cottage",
    size: "38 m² · King Bed · Up to 4 Guests",
    description: "Apple Cottage is a charming, private retreat nestled among apple orchards, offering rustic elegance, scenic views, and a peaceful atmosphere.",
    price: "₹4,000",
    amenities: ["Orchard View", "Private Entrance", "Balcony", "Fire Pit", "Outdoor Dining Area", "Large Living Space"],
    image: "/images/rooms/apple_cottage_1.jpg"
  },
  {
    name: "Walnut Cottage",
    size: "48 m² · 2 Queen Beds · Up to 5 Guests",
    description: "Walnut Cottage is a warm, inviting space surrounded by walnut trees, featuring cozy interiors, natural charm, and serene mountain views.",
    price: "₹5,000",
    amenities: ["Mountain View", "Fireplace", "Interconnecting Rooms", "Outdoor Furniture", "Wardrobe", "Dining Area"],
    image: "/images/rooms/walnut_cottage_1.jpg"
  },
  {
    name: "Kayal",
    size: "24 m² · Queen Bed · Up to 4 Guests",
    description: "The Kayal Room offers a tranquil retreat with serene mountain views, tasteful décor, and all the essentials for a comfortable stay.",
    price: "₹3,200",
    amenities: ["Mountain View", "Private Bathroom", "Hardwood Floors", "Sofa", "Fire Pit Access", "Daily Housekeeping"],
    image: "/images/rooms/kayal_1.jpg"
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
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={idx === 0}
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
                  <Link 
                    href="/booking"
                    className="inline-block px-8 py-3 bg-forest hover:bg-forest-light text-cream font-medium rounded-sm transition-colors"
                  >
                    Check Availability
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Availability Checker Form */}
        <div id="availability-checker" className="bg-forest text-cream p-12 md:p-16 rounded-sm shadow-xl max-w-4xl mx-auto -mb-24 relative z-10 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-gold mb-6">Ready to Book?</h2>
          <p className="text-xl text-cream/80 mb-10 max-w-2xl mx-auto font-light">
            Check live availability for all our wooden rooms and cabins using our integrated booking engine.
          </p>
          
          <Link 
            href="/booking"
            className="inline-block bg-gold hover:bg-gold-light text-forest font-bold py-5 px-12 rounded-sm transition-all transform hover:-translate-y-1 shadow-xl text-xl"
          >
            Open Booking Engine
          </Link>
        </div>
      </div>
      
      {/* Visual spacer to account for the overlapping form above */}
      <div className="h-24 md:h-32 bg-forest-light w-full mt-24"></div>
    </div>
  );
}