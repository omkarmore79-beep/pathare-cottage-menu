"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";
import CategoryBar from "@/components/menu/CategoryBar";
import SearchBar from "@/components/menu/SearchBar";
import DishCard from "@/components/menu/DishCard";

interface Category {
  id: string;
  name_en: string;
}

interface Dish {
  id: string;
  name_en: string;
  description_en: string | null;
  image_url: string | null;
  is_veg: boolean;
  is_chef_special: boolean;
  is_pathare_special: boolean;
  is_bestseller: boolean;
  category_id: string;
  dish_prices: {
    label_en: string;
    price: number;
  }[];
}

export default function FoodMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // 🔥 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name_en")
        .eq("restaurant_id", RESTAURANT_ID);

      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  // 🔥 Fetch Dishes + Prices
  useEffect(() => {
    const fetchDishes = async () => {
      const { data } = await supabase
        .from("dishes")
        .select(`
          *,
          dish_prices (
            label_en,
            price
          )
        `)
        .eq("restaurant_id", RESTAURANT_ID);

      if (data) {
        setDishes(data);
      }
    };

    fetchDishes();
  }, []);

  // 🔥 Filter Logic
  const filtered = dishes.filter((dish) => {
    const matchesSearch = dish.name_en
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      categories.find((c) => c.id === dish.category_id)?.name_en ===
        activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f3e6d3] px-4 pb-10">

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#f3e6d3] pt-6 pb-4">

        <h1 className="text-2xl font-semibold text-[#5a1f1f] mb-4">
          Food Menu
        </h1>

        <CategoryBar
          categories={["All", ...categories.map((c) => c.name_en)]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <SearchBar value={search} onChange={setSearch} />

      </div>

      {/* Dish List */}
      <div className="mt-6 flex flex-col gap-6">

        {filtered.length === 0 && (
          <p className="text-center text-[#5a1f1f]/70">
            No dishes found
          </p>
        )}

        {filtered.map((dish) => (
          <DishCard
            key={dish.id}
            dish={{
              id: dish.id,
              name: dish.name_en,
              description: dish.description_en || "",
              image: dish.image_url || "",
              isVeg: dish.is_veg,
              isChefSpecial: dish.is_chef_special,
              isPathareSpecial: dish.is_pathare_special,
              isBestseller: dish.is_bestseller,
              prices: dish.dish_prices.map((p) => ({
                label: p.label_en,
                price: p.price,
              })),
            }}
          />
        ))}

      </div>
    </div>
  );
}
