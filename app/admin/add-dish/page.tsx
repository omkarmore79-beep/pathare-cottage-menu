"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

import DishForm from "@/components/admin/DishForm";
import DishList from "@/components/admin/DishList";
import CategoryManager from "@/components/admin/CategoryManager";

export default function AdminPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [editingDish, setEditingDish] = useState<any | null>(null);

  const fetchData = async () => {

    const { data: categoryData } = await supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", RESTAURANT_ID);

    const { data: dishData } = await supabase
      .from("dishes")
      .select(`
        *,
        dish_prices (
          id,
          label_en,
          label_mr,
          price
        )
      `)
      .eq("restaurant_id", RESTAURANT_ID)
      .order("created_at", { ascending: false });

    if (categoryData) setCategories(categoryData);
    if (dishData) setDishes(dishData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-4xl">

      {/* Dish Form */}
      <DishForm
        categories={categories}
        editingDish={editingDish}
        onSuccess={() => {
          setEditingDish(null);
          fetchData();
        }}
      />

      {/* Category Manager */}
      <CategoryManager
        categories={categories}
        onRefresh={fetchData}
      />

      {/* Dish List */}
      <DishList
        dishes={dishes}
        onRefresh={fetchData}
        onEdit={(dish) => setEditingDish(dish)}
      />

    </div>
  );
}
