import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | The Hidden Treasure",
  description:
    "Reach out to The Hidden Treasure in Kalga. Call, WhatsApp, or send us a message for bookings, group trips, or general queries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
