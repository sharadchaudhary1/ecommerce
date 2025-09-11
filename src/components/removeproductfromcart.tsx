//@ts-nocheck
"use client";

import { CartContext } from "@/app/(group)/context/CartContext";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

export default function RemoveProduct({ id }) {
  const { cart, setCart, user } = useContext(CartContext);

  async function removeProduct(id) {
    if (user) {
      const res = await fetch("http://localhost:3000/api/cart/delete", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (data.success) {
        const remainingproduct = cart.filter((item) => item.id !== id);
        setCart(remainingproduct);
      }
    } else {
      const remainingproduct = cart.filter((item) => item.id !== id);
      setCart(remainingproduct);
    }
  }

  return (
    <div>
      <button
        onClick={() => removeProduct(id)}
        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
      >
        {" "}
        <Trash2 className="w-4 h-4" />
        <span className="text-sm">Remove</span>
      </button>
    </div>
  );
}
