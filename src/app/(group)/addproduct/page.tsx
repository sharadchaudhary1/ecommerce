"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProdButton() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router=useRouter()

  async function handleSubmit() {
    const parsedPrice = Number.parseFloat(price);
    const data = {
      title,
      description,
      price: parsedPrice,
      category,
      images: imageUrl,
    };

    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  function handlecancel() {

     const oldTitle = title;
  const oldDescription = description;
  const oldPrice = price;
  const oldCategory = category;
  const oldImageUrl = imageUrl;


    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImageUrl("");

    if (window.confirm("Are you sure you want to cancel and go back to Home Page?")) {
    router.push("/");
  }else{
     setTitle(oldTitle);
    setDescription(oldDescription);
    setPrice(oldPrice);
    setCategory(oldCategory);
    setImageUrl(oldImageUrl);
  }

  }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-2">Add Product</h2>
          <p className="text-sm text-gray-600 mb-4">
            Fill the product details.
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Title<span className="text-red-400">*</span></span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Description</span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Price<span className="text-red-400">*</span></span>
              <input
                type="number"
                className="border border-gray-300 rounded px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Category<span className="text-red-400">*</span></span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Image URL<span className="text-red-400">*</span></span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handlecancel}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
