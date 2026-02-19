"use client";

import { motion } from "framer-motion";
import MenuButtons from "./MenuButtons";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[#7a2e2e] flex flex-col items-center px-6 py-14">

      {/* Marathi Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl text-white tracking-wide text-center mb-2"
      >
        पठारे मटण खाणावळ
      </motion.h1>

      {/* English Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-white/80 text-sm tracking-widest uppercase mb-4"
      >
        Pathare Khanaval
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="h-[2px] bg-yellow-400 mb-10"
      />

      {/* RESPONSIVE VIDEO FRAME */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        <div className="aspect-[4/5] rounded-[40px] overflow-hidden border-4 border-yellow-500 shadow-2xl shadow-black/40">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gold Ring Glow */}
        <div className="absolute inset-0 rounded-[40px] ring-2 ring-yellow-400/30 pointer-events-none" />
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 w-full max-w-sm"
      >
        <MenuButtons />
      </motion.div>

    </section>
  );
}
