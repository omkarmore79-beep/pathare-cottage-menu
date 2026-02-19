"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/landing/HeroSection";
import SpecialDishes from "@/components/landing/SpecialDishes";
import AmbienceGallery from "@/components/landing/AmbienceGallery";
import VisitSection from "@/components/landing/VisitSection";
import Footer from "@/components/landing/Footer";
import StickyHeader from "@/components/landing/StickyHeader";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("seenSplash");

    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    sessionStorage.setItem("seenSplash", "true");

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 Splash UI directly here
  if (showSplash) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/splash.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-6 w-full text-center text-white text-sm tracking-wide">
          Digital Menu by <span className="font-semibold">TableOS</span>
        </div>
      </div>
    );
  }

  // 🔥 Normal Landing Page
  return (
    <main className="bg-white flex justify-center relative">
      <StickyHeader />

      <div className="w-full max-w-[480px]">

        <HeroSection />

        <SectionReveal>
          <SpecialDishes />
        </SectionReveal>

        <SectionReveal>
          <AmbienceGallery />
        </SectionReveal>

        <SectionReveal>
          <VisitSection />
        </SectionReveal>

        <SectionReveal>
          <Footer />
        </SectionReveal>

      </div>
    </main>
  );
}
