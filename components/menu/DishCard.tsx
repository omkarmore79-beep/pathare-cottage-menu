"use client";

interface Price {
  label: string;
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
  const prices = dish.prices || [];

  // ✅ image exists only if it’s a non-empty string
  const hasImage = Boolean(dish.image && dish.image.trim().length > 0);

  return (
    <div className="border-b border-[#5a1f1f]/10 py-4">
      <div className="flex gap-3">
        {/* ✅ Image only when available (no "No Image" placeholder) */}
        {hasImage && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={dish.image!}
              alt={dish.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Content + Prices Layout */}
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

          {/* RIGHT SIDE PRICES (STACKED) */}
          <div className="flex flex-col items-end gap-1 min-w-[80px]">
            {prices.map((p, idx) => (
              <div
                key={`${dish.id}-${p.label}-${idx}`}
                className="text-sm font-semibold text-[#5a1f1f] whitespace-nowrap"
              >
                {p.label && prices.length > 1 && (
                  <span className="text-xs font-medium mr-1 text-[#6b4b3e]">
                    {p.label}
                  </span>
                )}
                ₹{p.price}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
