"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RESTAURANT_ID } from "@/lib/constants";

interface Price {
  label?: string | null;
  price: number;
}

interface Props {
  categories: any[];
  editingDrink: any | null;
  onSuccess: () => void;
}

export default function AlcoholForm({
  categories,
  editingDrink,
  onSuccess,
}: Props) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  // 🔥 default = empty label for single price support
  const [prices, setPrices] = useState<Price[]>([
    { label: "", price: 0 }
  ]);

  const [isBestseller, setIsBestseller] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(true);

  const [message, setMessage] = useState("");

  // 🔥 Prefill when editing
  useEffect(() => {
    if (editingDrink) {
      setName(editingDrink.name || "");
      setDescription(editingDrink.description || "");
      setSelectedCategory(editingDrink.category_id || "");
      setIsBestseller(Boolean(editingDrink.is_bestseller));
      setIsVisible(Boolean(editingDrink.is_visible));
      setIsImageVisible(Boolean(editingDrink.is_image_visible));
      setExistingImage(editingDrink.image_url || null);

      if (editingDrink.alcohol_prices?.length > 0) {
        setPrices(editingDrink.alcohol_prices);
      } else {
        setPrices([{ label: "", price: 0 }]);
      }
    }
  }, [editingDrink]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedCategory("");
    setFile(null);
    setExistingImage(null);
    setPrices([{ label: "", price: 0 }]);
    setIsBestseller(false);
    setIsVisible(true);
    setIsImageVisible(true);
  };

  const handleSubmit = async () => {

    let imageUrl = existingImage;

    // Upload new image if selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "alcohol");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    let alcoholId = editingDrink?.id;

    if (editingDrink) {
      await supabase
        .from("alcohol")
        .update({
          name,
          description,
          category_id: selectedCategory,
          image_url: imageUrl,
          is_bestseller: isBestseller,
          is_visible: isVisible,
          is_image_visible: isImageVisible,
        })
        .eq("id", alcoholId);
    } else {
      const { data } = await supabase
        .from("alcohol")
        .insert([{
          restaurant_id: RESTAURANT_ID,
          name,
          description,
          category_id: selectedCategory,
          image_url: imageUrl,
          is_bestseller: isBestseller,
          is_visible: isVisible,
          is_image_visible: isImageVisible,
        }])
        .select()
        .single();

      alcoholId = data?.id;
    }

    // 🔥 Replace prices correctly
    if (alcoholId) {

      await supabase
        .from("alcohol_prices")
        .delete()
        .eq("alcohol_id", alcoholId);

      const validPrices = prices
        .filter((p) => p.price && Number(p.price) > 0) // only valid numbers
        .map((p) => ({
          alcohol_id: alcoholId,
          label:
            !p.label || p.label.trim() === ""
              ? null   // 🔥 single price support
              : p.label.trim(),
          price: Number(p.price),
        }));

      if (validPrices.length > 0) {
        await supabase.from("alcohol_prices").insert(validPrices);
      }
    }

    setMessage("Saved Successfully ✅");
    setTimeout(() => setMessage(""), 2000);

    resetForm();
    onSuccess();
  };

  return (
    <div className="border p-6 rounded-md space-y-4">

      <h2 className="text-lg font-semibold">
        {editingDrink ? "Edit Alcohol" : "Add Alcohol"}
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Alcohol Name"
        className="border p-2 w-full"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name_en}
          </option>
        ))}
      </select>

      {/* Image preview when editing */}
      {existingImage && (
        <div>
          <div className="text-sm text-gray-600">Current Image</div>
          <img
            src={existingImage}
            alt="preview"
            className="w-24 h-24 object-cover rounded-md border"
          />
        </div>
      )}

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* 🔥 PRICE SECTION */}
      <div className="space-y-2">
        {prices.map((p, i) => (
          <div key={i} className="flex gap-2 items-center">

            <input
              value={p.label || ""}
              onChange={(e) => {
                const updated = [...prices];
                updated[i].label = e.target.value;
                setPrices(updated);
              }}
              className="border p-2 flex-1"
              placeholder="Label (optional)"
            />

            <input
              type="number"
              value={p.price}
              onChange={(e) => {
                const updated = [...prices];
                updated[i].price = Number(e.target.value);
                setPrices(updated);
              }}
              className="border p-2 w-24"
              placeholder="Price"
            />

            {prices.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setPrices(prices.filter((_, index) => index !== i))
                }
                className="text-red-500 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPrices([...prices, { label: "", price: 0 }])}
        className="text-blue-600 text-sm"
      >
        + Add Price
      </button>

      <div className="flex gap-4 text-sm">
        <label>
          <input
            type="checkbox"
            checked={isBestseller}
            onChange={(e) => setIsBestseller(e.target.checked)}
          /> Bestseller
        </label>

        <label>
          <input
            type="checkbox"
            checked={isVisible}
            onChange={(e) => setIsVisible(e.target.checked)}
          /> Visible
        </label>

        <label>
          <input
            type="checkbox"
            checked={isImageVisible}
            onChange={(e) => setIsImageVisible(e.target.checked)}
          /> Image Visible
        </label>
      </div>

      <button onClick={handleSubmit} className="border px-4 py-2">
        Save
      </button>

      {message && (
        <p className="text-green-600 text-sm">{message}</p>
      )}
    </div>
  );
}
