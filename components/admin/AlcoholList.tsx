"use client";

import { supabase } from "@/lib/supabase";

interface Drink {
  id: string;
  name: string;
  is_visible: boolean;
  is_image_visible: boolean;
  alcohol_prices: {
    id: string;
    label: string;
    price: number;
  }[];
}

export default function AlcoholList({
  drinks,
  onRefresh,
  onEdit,
}: any) {

  const toggleVisibility = async (drink: Drink) => {
    await supabase
      .from("alcohol")
      .update({ is_visible: !drink.is_visible })
      .eq("id", drink.id);

    onRefresh();
  };

  const toggleImage = async (drink: Drink) => {
    await supabase
      .from("alcohol")
      .update({ is_image_visible: !drink.is_image_visible })
      .eq("id", drink.id);

    onRefresh();
  };

  const deleteDrink = async (id: string) => {
    await supabase.from("alcohol").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h2 className="font-semibold">Alcohol List</h2>

      {drinks.map((drink: Drink) => (
        <div key={drink.id} className="border p-3 flex justify-between items-center">

          <div>
            <p className="font-medium">
              {drink.name}
              {!drink.is_visible && (
                <span className="text-red-500 text-xs ml-2">(Hidden)</span>
              )}
            </p>

            <div className="flex gap-2 mt-1">
              {drink.alcohol_prices.map((p) => (
                <span key={p.id} className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {p.label} ₹{p.price}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 text-xs">
            <button onClick={() => onEdit(drink)} className="border px-2">
              Edit
            </button>
            <button onClick={() => toggleVisibility(drink)} className="border px-2">
              {drink.is_visible ? "Hide" : "Unhide"}
            </button>
            <button onClick={() => toggleImage(drink)} className="border px-2">
              Image {drink.is_image_visible ? "Off" : "On"}
            </button>
            <button onClick={() => deleteDrink(drink.id)} className="border px-2 text-red-600">
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
