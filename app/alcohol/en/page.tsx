"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";
import CategoryBar from "@/components/menu/CategoryBar";
import SearchBar from "@/components/menu/SearchBar";
import AlcoholCard from "@/components/alcohol/AlcoholCard";

interface AlcoholPrice {
  id: string;
  label: string;
  price: number;
}

interface Alcohol {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_bestseller: boolean | null;
  is_visible: boolean;
  is_image_visible: boolean | null;
  category_id: string;
  alcohol_prices: AlcoholPrice[] | null;
}

interface AlcoholCategory {
  id: string;
  name_en: string;
}

export default function AlcoholMenuPage() {
  const [drinks, setDrinks] = useState<Alcohol[]>([]);
  const [categories, setCategories] = useState<AlcoholCategory[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchAlcohol();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("alcohol_categories")
      .select("id, name_en")
      .eq("restaurant_id", RESTAURANT_ID)
      .order("name_en", { ascending: true });

    if (error) {
      console.error("Category fetch error:", error);
      return;
    }

    setCategories(data || []);
  };

  const fetchAlcohol = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("alcohol")
      .select(`
        id,
        name,
        description,
        image_url,
        is_bestseller,
        is_visible,
        is_image_visible,
        category_id,
        alcohol_prices (
          id,
          label,
          price
        )
      `)
      .eq("restaurant_id", RESTAURANT_ID)
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Alcohol fetch error:", error);
      setLoading(false);
      return;
    }

    setDrinks((data || []) as Alcohol[]);
    setLoading(false);
  };

  const filteredDrinks = drinks.filter((drink) => {
    const matchesSearch =
      drink.name?.toLowerCase().includes(search.toLowerCase());

    const categoryName =
      categories.find((c) => c.id === drink.category_id)?.name_en;

    const matchesCategory =
      activeCategory === "All" ||
      categoryName === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f3e6d3] px-4 pb-10">

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#f3e6d3] pt-6 pb-4">

        <h1 className="text-2xl font-semibold text-[#5a1f1f] mb-4">
          Alcohol Menu
        </h1>

        <CategoryBar
          categories={[
            "All",
            ...categories.map((c) => c.name_en),
          ]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Drinks List */}
      <div className="mt-6 flex flex-col gap-6">

        {loading && (
          <p className="text-center text-[#5a1f1f]/70">
            Loading drinks...
          </p>
        )}

        {!loading && filteredDrinks.length === 0 && (
          <p className="text-center text-[#5a1f1f]/70">
            No drinks available
          </p>
        )}

        {!loading &&
          filteredDrinks.map((drink) => (
            <AlcoholCard
              key={drink.id}
              drink={{
                id: drink.id,
                name: drink.name,
                description: drink.description || "",
                image: drink.is_image_visible
                  ? drink.image_url || ""
                  : "",
                isBestseller: Boolean(drink.is_bestseller),
                prices:
                  drink.alcohol_prices?.map((p) => ({
                    label: p.label,
                    price: p.price,
                  })) || [],
              }}
            />
          ))}
      </div>
    </div>
  );
}
