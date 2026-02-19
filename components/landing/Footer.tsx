"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#2b0f0f] text-white pt-20 pb-12 px-6 overflow-hidden">

      {/* Subtle Animated Top Glow */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[220px] bg-amber-500/10 blur-[90px] rounded-full pointer-events-none"
      />

      {/* Gold Animated Divider */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "140px" }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10"
      />

      {/* Branding */}
      <div className="text-center space-y-4 relative z-10">

        <p className="text-xs tracking-[4px] text-amber-300 uppercase">
          Digital Menu Experience
        </p>

        <p className="text-lg font-light">
          Powered by{" "}
          <a
            href="https://tableos.in"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-amber-400 font-semibold transition duration-300 hover:text-amber-300"
          >
            tableos.in
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-amber-400 transition-all duration-300 hover:w-full" />
          </a>
        </p>

        <p className="text-xs text-white/50 mt-6 tracking-wide">
          © {new Date().getFullYear()} Pathare Khanaval. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
