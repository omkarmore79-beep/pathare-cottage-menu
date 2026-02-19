"use client";

interface Props {
  categories?: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const defaultCategories = ["All", "Mutton", "Chicken", "Thali", "Specials"];

export default function CategoryBar({
  categories = defaultCategories,
  activeCategory,
  setActiveCategory,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm rounded-full whitespace-nowrap
            transition-all duration-300
            ${
              isActive
                ? "bg-[#5a1f1f] text-white shadow-md"
                : "bg-white text-[#5a1f1f] border border-[#5a1f1f]/20"
            }
            hover:scale-105 active:scale-95`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
