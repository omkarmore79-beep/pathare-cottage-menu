"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

interface Category {
  id: string;
  name_en: string;
  name_mr: string;
}

export default function CategoryManager({
  categories,
  onRefresh,
}: {
  categories: Category[];
  onRefresh: () => void;
}) {

  const [nameEn, setNameEn] = useState("");
  const [nameMr, setNameMr] = useState("");

  const handleAdd = async () => {
    if (!nameEn) return;

    await supabase.from("categories").insert([
      {
        restaurant_id: RESTAURANT_ID,
        name_en: nameEn,
        name_mr: nameMr,
      },
    ]);

    setNameEn("");
    setNameMr("");
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("categories").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="border p-6 rounded-md space-y-4">

      <h2 className="font-semibold">Manage Categories</h2>

      <div className="flex gap-2">
        <input
          placeholder="Category EN"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          className="border p-2 flex-1"
        />

        <input
          placeholder="Category MR"
          value={nameMr}
          onChange={(e) => setNameMr(e.target.value)}
          className="border p-2 flex-1"
        />

        <button
          onClick={handleAdd}
          className="border px-3"
        >
          Add
        </button>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex justify-between items-center border p-2"
        >
          <span>
            {cat.name_en} / {cat.name_mr}
          </span>

          <button
            onClick={() => handleDelete(cat.id)}
            className="border px-2 text-red-600 text-xs"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}
