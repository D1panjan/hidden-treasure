import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms & Rates | The Hidden Treasure",
  description:
    "Explore our handcrafted wooden rooms with panoramic views of the Parvati Valley. Check availability and book your stay in Kalga.",
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
