"use client";

import { useState } from "react";

interface Price {
  label?: string | null;
  price: number;
}

interface Dish {
  id: number | string;
  name: string;
  description?: string;
  image?: string;
  isVeg: boolean;
  isChefSpecial: boolean;
  isPathareSpecial: boolean;
  isBestseller: boolean;
  prices?: Price[];
}

export default function DishCard({ dish }: { dish: Dish }) {
  const [showImage, setShowImage] = useState(false);

  // Remove invalid prices safely
  const prices =
    (dish.prices || []).filter(
      (p) => p && p.price !== null && Number(p.price) > 0
    ) || [];

  const hasSinglePrice =
    prices.length === 1 &&
    (!prices[0].label || prices[0].label.trim() === "");

  return (
    <>
      <div className="border-b border-[#5a1f1f]/10 py-4">
        <div className="flex gap-3">

          {/* IMAGE (NOT COMPULSORY) */}
          {dish.image ? (
            <div
              className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
              onClick={() => setShowImage(true)}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {/* CONTENT + PRICE LAYOUT */}
          <div className="flex flex-1 justify-between gap-6">

            {/* LEFT SIDE */}
            <div className="flex-1">

              {/* Name + Veg */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[#5a1f1f] font-semibold text-sm">
                  {dish.name}
                </h3>

                {dish.isVeg ? (
                  <span className="w-4 h-4 border border-green-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-600" />
                  </span>
                ) : (
                  <span className="w-4 h-4 border border-red-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full" />
                  </span>
                )}
              </div>

              {/* Description */}
              {dish.description && dish.description.trim() !== "" && (
                <p className="text-xs text-[#6b4b3e] mt-1 leading-snug">
                  {dish.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {dish.isBestseller && (
                  <span className="text-[10px] px-2 py-[3px] bg-yellow-400 text-white font-semibold rounded-full">
                    Bestseller
                  </span>
                )}

                {dish.isChefSpecial && (
                  <span className="text-[10px] px-2 py-[3px] bg-purple-100 text-purple-700 rounded-full">
                    Chef Special
                  </span>
                )}

                {dish.isPathareSpecial && (
                  <span className="text-[10px] px-2 py-[3px] bg-amber-100 text-amber-700 rounded-full">
                    Pathare Special
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT SIDE PRICES */}
            <div className="flex flex-col items-end gap-1 min-w-[80px]">

              {prices.length > 0 && (
                <>
                  {hasSinglePrice ? (
                    <div className="text-sm font-semibold text-[#5a1f1f] whitespace-nowrap">
                      ₹{prices[0].price}
                    </div>
                  ) : (
                    prices.map((p, i) => (
                      <div
                        key={i}
                        className="text-sm font-semibold text-[#5a1f1f] whitespace-nowrap"
                      >
                        {p.label && (
                          <span className="text-xs font-medium mr-1 text-[#6b4b3e]">
                            {p.label}
                          </span>
                        )}
                        ₹{p.price}
                      </div>
                    ))
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN IMAGE MODAL */}
      {showImage && dish.image && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowImage(false)}
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </>
  );
}