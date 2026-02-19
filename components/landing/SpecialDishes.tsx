"use client";

import { motion } from "framer-motion";

export default function SpecialDishes() {
  return (
    <section className="py-20 px-6 bg-[#f3e6d3]">
      
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-[#5a1f1f]">
          Signature Specials
        </h2>

        <div className="w-20 h-[2px] bg-amber-500 mx-auto mt-4" />
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">

        {[1, 2].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="min-w-[280px] snap-start rounded-3xl overflow-hidden
            bg-gradient-to-b from-white to-[#f9f4eb]
            shadow-xl shadow-[#5a1f1f]/10
            hover:shadow-[#5a1f1f]/20
            transition-all duration-300 hover:-translate-y-1"
          >

            {/* Image */}
            <div className="relative">
              <img
                src={`/special${item}.jpg`}
                className="w-full h-52 object-cover"
                alt="Special Dish"
              />

              {/* Premium Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[11px] tracking-wide px-4 py-1 rounded-full font-semibold shadow-md">
                Pathare Special
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-semibold text-lg text-[#5a1f1f] mb-3">
                Pathare Mutton
              </h3>

              <p className="text-sm text-[#6b4b3e] leading-relaxed">
                Slow-cooked spicy mutton prepared with authentic
                traditional masalas that reflect true Maharashtrian
                culinary heritage.
              </p>
            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}
