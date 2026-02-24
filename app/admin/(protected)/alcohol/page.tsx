"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

import AlcoholForm from "@/components/admin/AlcoholForm";
import AlcoholList from "@/components/admin/AlcoholList";
import AlcoholCategoryManager from "@/components/admin/AlcoholCategoryManager";

export default function AlcoholAdminPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const [drinks, setDrinks] = useState<any[]>([]);
  const [editingDrink, setEditingDrink] = useState<any | null>(null);

  const fetchData = async () => {

    // Fetch Categories
    const { data: categoryData } = await supabase
      .from("alcohol_categories")
      .select("*")
      .eq("restaurant_id", RESTAURANT_ID)
      .order("created_at", { ascending: false });

    // Fetch Alcohol (NO visibility filter in admin)
    const { data: alcoholData } = await supabase
      .from("alcohol")
      .select(`
        id,
        name,
        category_id,
        image_url,
        is_bestseller,
        is_visible,
        is_image_visible,
        alcohol_prices (
          id,
          label,
          price
        )
      `)
      .eq("restaurant_id", RESTAURANT_ID)
      .order("created_at", { ascending: false });

    if (categoryData) setCategories(categoryData);
    if (alcoholData) setDrinks(alcoholData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-4xl">

      {/* Alcohol Form */}
      <AlcoholForm
        categories={categories}
        editingDrink={editingDrink}
        onSuccess={() => {
          setEditingDrink(null);
          fetchData();
        }}
      />

      {/* Category Manager */}
      <AlcoholCategoryManager
        categories={categories}
        onRefresh={fetchData}
      />

      {/* Alcohol List */}
      <AlcoholList
        drinks={drinks}
        onRefresh={fetchData}
        onEdit={(drink: any) => setEditingDrink(drink)}
      />

    </div>
  );
}
