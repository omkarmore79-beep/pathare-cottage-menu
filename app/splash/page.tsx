"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Video */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/splash.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay (optional premium feel) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Bottom branding */}
      <div className="absolute bottom-6 w-full text-center text-white text-sm tracking-wide">
        Digital Menu by <span className="font-semibold">TableOS</span>
      </div>
    </div>
  );
}
