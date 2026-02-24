"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

interface Category {
  id: string;
  name_en: string;
  name_mr: string;
  display_order: number | null;
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
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const ao = a.display_order ?? 999999;
      const bo = b.display_order ?? 999999;
      if (ao === bo) return (a.name_en || "").localeCompare(b.name_en || "");
      return ao - bo;
    });
  }, [categories]);

  const formatSupabaseError = (e: any) => {
    // PostgrestError often has message/details/hint
    return (
      e?.message ||
      e?.error_description ||
      e?.details ||
      e?.hint ||
      JSON.stringify(e)
    );
  };

  // ✅ Normalize: if any display_order is null, set 1..n by current sorted order
  const normalizeOrdersIfNeeded = async () => {
    const needsFix = sortedCategories.some((c) => c.display_order == null);
    if (!needsFix) return true;

    // Update each row (more reliable than upsert)
    const updates = sortedCategories.map((c, idx) =>
      supabase
        .from("categories")
        .update({ display_order: idx + 1 })
        .eq("id", c.id)
    );

    const results = await Promise.all(updates);

    const firstError = results.find((r) => r.error)?.error;
    if (firstError) {
      console.error("normalizeOrders error:", firstError);
      setErrMsg("Category reorder blocked: " + formatSupabaseError(firstError));
      return false;
    }

    return true;
  };

  const handleAdd = async () => {
    setErrMsg(null);
    if (!nameEn.trim()) return;

    setSaving(true);
    try {
      // normalize first so max order works
      const ok = await normalizeOrdersIfNeeded();
      if (!ok) return;

      const nextOrder =
        sortedCategories.length > 0
          ? Math.max(...sortedCategories.map((c) => c.display_order ?? 0)) + 1
          : 1;

      const { error } = await supabase.from("categories").insert([
        {
          restaurant_id: RESTAURANT_ID,
          name_en: nameEn.trim(),
          name_mr: nameMr.trim(),
          display_order: nextOrder,
        },
      ]);

      if (error) {
        console.error("add category error:", error);
        setErrMsg("Add failed: " + formatSupabaseError(error));
        return;
      }

      setNameEn("");
      setNameMr("");
      onRefresh();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setErrMsg(null);
    setSaving(true);
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) {
        console.error("delete category error:", error);
        setErrMsg("Delete failed: " + formatSupabaseError(error));
        return;
      }
      onRefresh();
    } finally {
      setSaving(false);
    }
  };

  // ✅ Reliable move: swap in UI list, then write display_order with updates
  const moveCategory = async (id: string, direction: "up" | "down") => {
    setErrMsg(null);
    setSaving(true);
    try {
      const ok = await normalizeOrdersIfNeeded();
      if (!ok) return;

      const list = [...sortedCategories];
      const index = list.findIndex((c) => c.id === id);
      if (index === -1) return;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return;

      // swap in memory
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      // write new sequential order 1..n
      const results = await Promise.all(
        list.map((c, idx) =>
          supabase
            .from("categories")
            .update({ display_order: idx + 1 })
            .eq("id", c.id)
        )
      );

      const firstError = results.find((r) => r.error)?.error;
      if (firstError) {
        console.error("reorder error:", firstError);
        setErrMsg("Reorder failed: " + formatSupabaseError(firstError));
        return;
      }

      onRefresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border p-6 rounded-md space-y-4">
      <h2 className="font-semibold">Manage Categories</h2>

      {errMsg && (
        <div className="border border-red-300 bg-red-50 text-red-700 p-2 rounded text-sm">
          {errMsg}
        </div>
      )}

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

        <button onClick={handleAdd} disabled={saving} className="border px-3">
          {saving ? "..." : "Add"}
        </button>
      </div>

      {sortedCategories.map((cat, index) => (
        <div
          key={cat.id}
          className="flex justify-between items-center border p-2"
        >
          <span>
            {cat.name_en} / {cat.name_mr}
          </span>

          <div className="flex gap-2 items-center">
            <button
              disabled={saving || index === 0}
              onClick={() => moveCategory(cat.id, "up")}
              className="border px-2 text-xs"
            >
              ↑
            </button>

            <button
              disabled={saving || index === sortedCategories.length - 1}
              onClick={() => moveCategory(cat.id, "down")}
              className="border px-2 text-xs"
            >
              ↓
            </button>

            <button
              onClick={() => handleDelete(cat.id)}
              disabled={saving}
              className="border px-2 text-red-600 text-xs"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}