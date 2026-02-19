"use client";

import { motion } from "framer-motion";
import { Instagram, Phone, MessageCircle, MapPin, Clock, Navigation } from "lucide-react";

export default function VisitSection() {
  return (
    <section className="relative py-28 px-6 bg-[#efe0c8] overflow-hidden">

      {/* Warm Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl font-semibold text-[#5a1f1f]">
          Visit Us
        </h2>

        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4 opacity-80" />

        <p className="text-[#6b4b3e] text-sm mt-4 max-w-md mx-auto">
          Experience tradition, flavour and hospitality at Pathare Khanaval.
        </p>
      </div>

      {/* Address & Timings */}
      <div className="space-y-5 mb-10 relative z-10">

        <div className="flex items-start gap-3 text-[#5a1f1f]">
          <MapPin className="text-amber-600 mt-1" size={20} />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Pathare Hotel</p>
            <p>Maharashtra, India</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-[#5a1f1f]">
          <Clock className="text-amber-600 mt-1" size={20} />
          <div className="text-sm">
            <p className="font-semibold">Opening Hours</p>
            <p>11:00 AM – 11:30 PM</p>
          </div>
        </div>

        {/* Get Directions */}
        <a
          href="https://www.google.com/maps/place/pathare+hotel/data=!4m2!3m1!1s0x3bc2b78734587a61:0xbe6cd420ff608797"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a1f1f] border-b border-amber-500 hover:text-amber-700 transition"
        >
          <Navigation size={16} />
          Get Directions
        </a>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-[#5a1f1f]/10 mb-12 relative z-10"
      >
        <iframe
          src="https://www.google.com/maps?q=pathare+hotel&output=embed"
          className="w-full h-60 border-0"
          loading="lazy"
        />
      </motion.div>

      {/* Contact Buttons */}
      <div className="flex flex-col gap-6 relative z-10">

        <a
          href="https://www.instagram.com/pathare__mutton__khanaval"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 
          bg-gradient-to-r from-black to-[#3a0f0f]
          text-white font-semibold py-3 rounded-2xl
          border border-amber-400/60
          shadow-lg shadow-black/20
          transition-all duration-300 hover:scale-[1.03]"
        >
          <Instagram size={18} />
          Follow on Instagram
        </a>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 
          bg-gradient-to-r from-green-600 to-green-700
          text-white font-semibold py-3 rounded-2xl
          shadow-lg shadow-green-700/30
          transition-all duration-300 hover:scale-[1.03]"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>

        <a
          href="tel:+919999999999"
          className="flex items-center justify-center gap-3 
          bg-[#5a1f1f]
          text-white font-semibold py-3 rounded-2xl
          border border-amber-400/60
          shadow-lg shadow-[#5a1f1f]/30
          transition-all duration-300 hover:scale-[1.03]"
        >
          <Phone size={18} />
          Call Restaurant
        </a>

      </div>
    </section>
  );
}
