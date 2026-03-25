/**
 * StayFlexi API client.
 * Wraps room data and availability calls to the StayFlexi CMS.
 * 
 * Currently uses hardcoded room data as fallback since the
 * STAYFLEXI_API_KEY is not yet available. When the key is provided,
 * this module will fetch live data and fall back to hardcoded on failure.
 * 
 * Hotel ID: 31225
 */

import { logger } from "./logger";

/** The shape of a single room returned by our API */
export type Room = {
  name: string;
  size: string;
  description: string;
  price: string;
  amenities: string[];
  image: string;
};

/** StayFlexi hotel ID — used for booking engine and API calls */
export const STAYFLEXI_HOTEL_ID = "31225";

/** The booking engine URL for embedding */
export const BOOKING_ENGINE_URL = `https://bookingengine.stayflexi.com/?hotel_id=${STAYFLEXI_HOTEL_ID}`;

/**
 * Hardcoded room data — serves as the fallback when StayFlexi API
 * is not configured or returns an error. Updated manually from
 * the StayFlexi booking engine dashboard.
 */
const FALLBACK_ROOMS: Room[] = [
  {
    name: "Khanoor",
    size: "20 m² · Queen Bed · Up to 3 Guests",
    description:
      "Khanoor Room is a comfortable, well-furnished space ideal for short stays, offering privacy, convenience, and a peaceful ambiance.",
    price: "₹1,000",
    amenities: [
      "Mountain View",
      "Shared Bathroom",
      "Heating",
      "Hardwood Floors",
      "Free Wi-Fi",
      "Daily Housekeeping",
    ],
    image: "/images/rooms/khanoor_1.jpg",
  },
  {
    name: "Mohru",
    size: "24 m² · Queen Bed · Up to 3 Guests",
    description:
      "A tranquil wooden room offering a blend of rustic charm and modern comfort, perfect for those seeking peace and scenic views.",
    price: "₹2,000",
    amenities: [
      "Mountain View",
      "Private Bathroom",
      "Balcony",
      "Private Entrance",
      "Fire Pit Access",
      "Electric Blankets",
    ],
    image: "/images/rooms/mohru_1.jpg",
  },
  {
    name: "Deodar",
    size: "26 m² · King Bed · Up to 3 Guests",
    description:
      "The Deodar Room is a cozy, elegantly designed space featuring wooden accents, serene views, and modern amenities for a relaxing stay.",
    price: "₹2,200",
    amenities: [
      "Mountain View",
      "Private Bathroom",
      "King Bed",
      "Hardwood Floors",
      "Electric Blankets",
      "Daily Housekeeping",
    ],
    image: "/images/rooms/deodar_1.jpg",
  },
  {
    name: "Apple Cottage",
    size: "38 m² · King Bed · Up to 4 Guests",
    description:
      "Apple Cottage is a charming, private retreat nestled among apple orchards, offering rustic elegance, scenic views, and a peaceful atmosphere.",
    price: "₹4,000",
    amenities: [
      "Orchard View",
      "Private Entrance",
      "Balcony",
      "Fire Pit",
      "Outdoor Dining Area",
      "Large Living Space",
    ],
    image: "/images/rooms/apple_cottage_1.jpg",
  },
  {
    name: "Walnut Cottage",
    size: "48 m² · 2 Queen Beds · Up to 5 Guests",
    description:
      "Walnut Cottage is a warm, inviting space surrounded by walnut trees, featuring cozy interiors, natural charm, and serene mountain views.",
    price: "₹5,000",
    amenities: [
      "Mountain View",
      "Fireplace",
      "Interconnecting Rooms",
      "Outdoor Furniture",
      "Wardrobe",
      "Dining Area",
    ],
    image: "/images/rooms/walnut_cottage_1.jpg",
  },
  {
    name: "Kayal",
    size: "24 m² · Queen Bed · Up to 4 Guests",
    description:
      "The Kayal Room offers a tranquil retreat with serene mountain views, tasteful décor, and all the essentials for a comfortable stay.",
    price: "₹3,200",
    amenities: [
      "Mountain View",
      "Private Bathroom",
      "Hardwood Floors",
      "Sofa",
      "Fire Pit Access",
      "Daily Housekeeping",
    ],
    image: "/images/rooms/kayal_1.jpg",
  },
];

/**
 * Fetches room data from StayFlexi API, falling back to hardcoded data.
 * When STAYFLEXI_API_KEY is available, this will call the real API first.
 */
export async function getRooms(): Promise<Room[]> {
  const apiKey = process.env.STAYFLEXI_API_KEY;

  // If no API key is configured, use fallback data
  if (!apiKey) {
    logger.info("stayflexi_using_fallback", {
      reason: "STAYFLEXI_API_KEY not configured",
      roomCount: FALLBACK_ROOMS.length,
    });
    return FALLBACK_ROOMS;
  }

  // TODO: When StayFlexi provides the API key, implement the real API call here.
  // The pattern should be:
  // 1. Call StayFlexi API via apiGet() from lib/apiClient.ts
  // 2. Transform the response into Room[] format
  // 3. On failure, fall back to FALLBACK_ROOMS
  // 4. Log the result

  logger.info("stayflexi_using_fallback", {
    reason: "API integration not yet implemented",
    roomCount: FALLBACK_ROOMS.length,
  });

  return FALLBACK_ROOMS;
}
