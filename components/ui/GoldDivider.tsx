"use client";

import { motion } from "framer-motion";

export default function GoldDivider() {
  return (
    <div className="flex justify-center py-6">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
      />
    </div>
  );
}
