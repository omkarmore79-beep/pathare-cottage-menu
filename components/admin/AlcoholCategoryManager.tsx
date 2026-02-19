"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

export default function AlcoholCategoryManager({ categories, onRefresh }: any) {

  const [name, setName] = useState("");

  const addCategory = async () => {
    if (!name) return;

    await supabase.from("alcohol_categories").insert([
      {
        restaurant_id: RESTAURANT_ID,
        name_en: name,
      },
    ]);

    setName("");
    onRefresh();
  };

  const deleteCategory = async (id: string) => {
    await supabase.from("alcohol_categories").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h2 className="font-semibold">Alcohol Categories</h2>

      <div className="flex gap-2">
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={addCategory} className="border px-3">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c: any) => (
          <div
            key={c.id}
            className="border px-2 py-1 text-sm flex gap-2 items-center"
          >
            {c.name_en}
            <button
              onClick={() => deleteCategory(c.id)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
