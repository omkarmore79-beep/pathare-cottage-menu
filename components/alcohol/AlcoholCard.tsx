"use client";

interface Price {
  label?: string | null;
  price: number;
}

interface Drink {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isBestseller: boolean;
  prices?: Price[];
}

export default function AlcoholCard({ drink }: { drink: Drink }) {
  const prices = (drink.prices || []).filter(
    (p) => p.price !== null && Number(p.price) > 0
  );

  const hasSinglePrice =
    prices.length === 1 &&
    (!prices[0].label || prices[0].label.trim() === "");

  return (
    <div className="border-b border-[#5a1f1f]/10 py-4">

      <div className="flex gap-3">

        {/* ✅ Only render image section if image exists */}
        {drink.image && drink.image.trim() !== "" && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={drink.image}
              alt={drink.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">

          {/* Name + Bestseller */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[#5a1f1f] font-semibold text-sm">
              {drink.name}
            </h3>

            {drink.isBestseller && (
              <span className="text-[10px] px-2 py-[3px] bg-yellow-400 text-white font-semibold rounded-full whitespace-nowrap">
                Bestseller
              </span>
            )}
          </div>

          {/* Description */}
          {drink.description && drink.description.trim() !== "" && (
            <p className="text-xs text-[#6b4b3e] mt-1 leading-snug">
              {drink.description}
            </p>
          )}

          {/* Price Section */}
          {prices.length > 0 && (
            <div className="mt-2 text-xs font-medium text-[#5a1f1f]">

              {/* Single price (no badge) */}
              {hasSinglePrice ? (
                <div className="text-right font-semibold">
                  ₹{prices[0].price}
                </div>
              ) : (
                prices.map((p, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{p.label}</span>
                    <span>₹{p.price}</span>
                  </div>
                ))
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
