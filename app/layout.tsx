import type { Metadata } from "next";
import { Geist, Geist_Mono, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const marathiFont = Tiro_Devanagari_Marathi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-marathi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pathare Mutton Khanaval",
  description: "Digital Menu powered by TableOS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${marathiFont.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
