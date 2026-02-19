"use client";

import Link from "next/link";

export default function MenuButtons() {
  return (
    <div className="flex flex-col gap-14">

      {/* FOOD SECTION */}
      <div className="flex flex-col gap-5">
        <p className="text-amber-300 text-[11px] tracking-[4px] uppercase text-center font-light">
          Food Menu
        </p>

        <Link
          href="/menu/en"
          className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300
          text-black font-semibold py-3 rounded-2xl text-center
          shadow-lg shadow-yellow-600/30
          transition-all duration-300
          hover:scale-[1.05]
          hover:shadow-yellow-500/40
          active:scale-95"
        >
          View Food Menu
        </Link>

        <Link
          href="/menu/mr"
          className="bg-[#f2c97d]
          text-black font-semibold py-3 rounded-2xl text-center
          transition-all duration-300
          hover:scale-[1.05]
          active:scale-95"
        >
          खाद्य मेनू पहा
        </Link>
      </div>

      {/* Gold Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      {/* ALCOHOL SECTION */}
      <div className="flex flex-col gap-5 pt-2">
        <p className="text-amber-300 text-[11px] tracking-[4px] uppercase text-center font-light">
          Alcohol Menu
        </p>

        <Link
          href="/alcohol/en"
          className="bg-gradient-to-r from-[#121212] via-[#2a0e0e] to-[#121212]
          text-white font-semibold py-3 rounded-2xl text-center
          border border-amber-400
          shadow-lg shadow-black/40
          transition-all duration-300
          hover:scale-[1.05]
          hover:border-amber-300
          active:scale-95"
        >
          View Alcohol Menu
        </Link>
      </div>

    </div>
  );
}
