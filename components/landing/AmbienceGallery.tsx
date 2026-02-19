"use client";

import { motion } from "framer-motion";

export default function AmbienceGallery() {
  return (
    <section className="relative py-28 bg-[#5a1f1f] text-white overflow-hidden">

      {/* Background Golden Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10 px-6">
        <h2 className="text-3xl font-semibold text-amber-400 tracking-wide">
          Our Ambience
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 opacity-80" />
        <p className="text-amber-200/70 text-sm mt-4 max-w-md mx-auto">
          Experience a warm, traditional dining space rooted in
          Maharashtrian culture and hospitality.
        </p>
      </div>

      {/* Scroll Container Wrapper */}
      <div className="relative">

        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#5a1f1f] to-transparent z-20" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#5a1f1f] to-transparent z-20" />

        {/* Horizontal Scroll */}
        <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth px-6 relative z-10">

          {[1, 2, 3].map((img) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="min-w-[90%] max-w-md snap-center rounded-3xl overflow-hidden
              border border-amber-400/30
              shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]
              hover:scale-[1.02] transition-all duration-500"
            >
              <div className="relative">

                {/* Image */}
                <img
                  src={`/ambience${img}.jpeg`}
                  alt="Ambience"
                  className="w-full h-[300px] object-cover"
                />

                {/* Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Soft Gold Frame Glow */}
                <div className="absolute inset-0 ring-1 ring-amber-400/40 pointer-events-none rounded-3xl" />

                {/* Optional Caption */}
                <div className="absolute bottom-6 left-6 text-amber-200 text-sm tracking-wide">
                  Traditional Dining Experience
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <p className="text-center text-amber-300/60 text-xs mt-10 tracking-[3px]">
        — Swipe to Explore —
      </p>
    </section>
  );
}
