import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoGuard — Predictive Vehicle Maintenance",
  description: "AI-driven predictive maintenance dashboard for vehicle sensor data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
