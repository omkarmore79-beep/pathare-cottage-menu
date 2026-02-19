"use client";

import { useEffect, useState } from "react";

export default function StickyHeader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#2b0f0f]/95 backdrop-blur-md z-50 py-3 shadow-lg">
      <div className="max-w-[480px] mx-auto text-center text-amber-300 font-medium tracking-wide">
        पाथरे खानावळ
      </div>
    </div>
  );
}
