"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";
import CategoryBar from "@/components/menu/CategoryBar";
import SearchBar from "@/components/menu/SearchBar";
import DishCard from "@/components/menu/DishCard";

interface Category {
  id: string;
  name_mr: string;
}

interface DishFromDB {
  id: string;
  name_mr: string;
  description_mr: string | null;
  image_url: string | null;
  is_veg: boolean | null;
  is_chef_special: boolean | null;
  is_pathare_special: boolean | null;
  is_bestseller: boolean | null;
  is_visible: boolean;
  category_id: string;
  dish_prices: {
    label_mr: string;
    price: number;
  }[];
}

export default function MarathiMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<DishFromDB[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Categories (Marathi)
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name_mr")
        .eq("restaurant_id", RESTAURANT_ID)
        .order("name_mr", { ascending: true });

      if (error) {
        console.error("Category fetch error:", error);
        return;
      }

      if (data) setCategories(data);
    };

    fetchCategories();
  }, []);

  // 🔥 Fetch Visible Dishes Only
  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("dishes")
        .select(`
          *,
          dish_prices (
            label_mr,
            price
          )
        `)
        .eq("restaurant_id", RESTAURANT_ID)
        .eq("is_visible", true) // 🔥 hide/unhide support
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Dish fetch error:", error);
        setLoading(false);
        return;
      }

      if (data) setDishes(data);

      setLoading(false);
    };

    fetchDishes();
  }, []);

  // 🔥 Filtering
  const filteredDishes = dishes.filter((dish) => {

    const matchesSearch =
      dish.name_mr?.toLowerCase().includes(search.toLowerCase());

    const categoryName =
      categories.find((c) => c.id === dish.category_id)?.name_mr;

    const matchesCategory =
      activeCategory === "All" || categoryName === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f3e6d3] px-4 pb-10">

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#f3e6d3] pt-6 pb-4">

        <h1 className="text-2xl font-semibold text-[#5a1f1f] mb-4 font-[var(--font-marathi)]">
          खाद्य मेनू
        </h1>

        <CategoryBar
          categories={["All", ...categories.map((c) => c.name_mr)]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <SearchBar value={search} onChange={setSearch} />

      </div>

      {/* Dish List */}
      <div className="mt-6 flex flex-col gap-6">

        {loading && (
          <p className="text-center text-[#5a1f1f]/70 font-[var(--font-marathi)]">
            मेनू लोड होत आहे...
          </p>
        )}

        {!loading && filteredDishes.length === 0 && (
          <p className="text-center text-[#5a1f1f]/70 font-[var(--font-marathi)]">
            कोणतेही पदार्थ उपलब्ध नाहीत
          </p>
        )}

        {!loading &&
          filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={{
                id: dish.id,
                name: dish.name_mr,
                description: dish.description_mr || "",
                image: dish.image_url || "",
                isVeg: Boolean(dish.is_veg),
                isChefSpecial: Boolean(dish.is_chef_special),
                isPathareSpecial: Boolean(dish.is_pathare_special),
                isBestseller: Boolean(dish.is_bestseller),
                prices:
                  dish.dish_prices?.map((p) => ({
                    label: p.label_mr,
                    price: p.price,
                  })) || [],
              }}
            />
          ))}

      </div>
    </div>
  );
}
