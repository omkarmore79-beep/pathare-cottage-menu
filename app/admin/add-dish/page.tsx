"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

import DishForm from "@/components/admin/DishForm";
import DishList from "@/components/admin/DishList";
import CategoryManager from "@/components/admin/CategoryManager";

export default function AdminPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [editingDish, setEditingDish] = useState<any | null>(null);

  const formTopRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", RESTAURANT_ID);

    const { data: dishData } = await supabase
      .from("dishes")
      .select(
        `
        *,
        dish_prices (
          id,
          label_en,
          label_mr,
          price
        )
      `
      )
      .eq("restaurant_id", RESTAURANT_ID)
      .order("created_at", { ascending: false });

    if (categoryData) setCategories(categoryData);
    if (dishData) setDishes(dishData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (dish: any) => {
    setEditingDish(dish);

    // Scroll to the form so user can edit immediately
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto">
      <div className="p-8 space-y-8 max-w-4xl">
        {/* Anchor for scrolling */}
        <div ref={formTopRef} />

        {/* Dish Form */}
        <DishForm
          categories={categories}
          editingDish={editingDish}
          onCancelEdit={() => setEditingDish(null)}
          onSuccess={() => {
            setEditingDish(null);
            fetchData();
            // After save, also go to top
            setTimeout(() => {
              formTopRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 0);
          }}
        />

        {/* Category Manager */}
        <CategoryManager categories={categories} onRefresh={fetchData} />

        {/* Dish List */}
        <DishList
          dishes={dishes}
          onRefresh={fetchData}
          onEdit={handleEdit}
        />

        {/* Back to top button */}
        <button
          type="button"
          onClick={() =>
            formTopRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="fixed bottom-6 right-6 border bg-white px-3 py-2 rounded shadow text-sm"
        >
          ↑ Top
        </button>
      </div>
    </div>
  );
}