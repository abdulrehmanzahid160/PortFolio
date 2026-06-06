import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import GrainOverlay from "@/components/GrainOverlay";
import MagneticCursor from "@/components/MagneticCursor";

export const metadata: Metadata = {
  title: "Abdul Rehman — App Developer & AI Student",
  description: "Portfolio of Abdul Rehman, an AI Student and App Developer from Nutech University Islamabad. Showcasing Android, Flutter, and AI projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-warm antialiased selection:bg-accent selection:bg-opacity-30">
        <LenisProvider>
          <GrainOverlay />
          <MagneticCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
