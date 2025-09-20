//@ts-nocheck
"use client";

import { SaveContext } from "@/app/(group)/context/savecontext";
import { Heart } from "lucide-react";
import { useContext, useEffect } from "react";

export default function SaveLater({ product }) {
  const { savelater, setSavelater, user } = useContext(SaveContext);

  const saveproduct = {
    userId: user?.id,
    productId: product?.id,
  };

  async function handleSaveForLater() {
    if (user) {
      await fetch("/api/savelater", {
        method: "POST",
        body: JSON.stringify(saveproduct),
      });
    } else {
      setSavelater((prev) =>
        prev.find((p) => p.id === product.id) ? prev : [...prev, product]
      );
    }
  }

  useEffect(() => {
    if (!user) {
      localStorage.setItem("savelater", JSON.stringify(savelater));
    }
  }, [savelater, user]);

  return (
    <div>
      <button
        onClick={handleSaveForLater}
        className="flex items-center gap-2 px-4 py-2 rounded-lg  shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-red-700 hover:bg-red-50 hover:scale-110  focus:outline-none focus:ring-2"
      >
        <Heart className="w-5 h-5 text-red-500 group-hover:text-red-700 hover:scale-110 transition-colors" />
        <span className="text-sm font-medium">Save</span>
      </button>
    </div>
  );
}
