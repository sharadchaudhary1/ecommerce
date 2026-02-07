

//@ts-nocheck


"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }) {
  const searchparams = useSearchParams();
  const category = searchparams.get("category") || "";
  const minval = searchparams.get("min") || "";
  const maxval = searchparams.get("max") || "";
 const minrating=searchparams.get("rating")||""

  const [min, setMin] = useState(minval);
  const [max, setMax] = useState(maxval);
  const [rating, setRating] = useState(minrating);

  const router = useRouter();

  function handlefilter() {
    let url = "/selectcategory?";
     if (category) url += "category=" + category;
    if (min) url += "&min=" + min;
    if (max) url += "&max=" + max;
   
   

    router.push(url);
  }

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-[1400px] mx-auto">
          {/* Sidebar */}
          <aside className="w-full md:w-[260px] bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-6 flex flex-col gap-6 mb-6 md:mb-0 md:mt-6  h-fit sticky top-20">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Filters</h3>
            <div className="flex flex-col gap-5">
              {/* Min Price */}
              <div className="flex flex-col">
                <label
                  htmlFor="min"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Min Price
                </label>
                <input
                  type="number"
                  id="min"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="h-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="e.g. 100"
                  name="min"
                />
              </div>

              {/* Max Price */}
              <div className="flex flex-col">
                <label
                  htmlFor="max"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Max Price
                </label>
                <input
                  type="number"
                  id="max"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="h-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="e.g. 5000"
                  name="max"
                />
              </div>

              {/* Rating */}
              {/* <div className="flex flex-col">
                <label
                  htmlFor="rating"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Minimum Rating
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="1">⭐ 1 & above</option>
                  <option value="2">⭐ 2 & above</option>
                  <option value="3">⭐ 3 & above</option>
                  <option value="4">⭐ 4 & above</option>
                </select>
              </div> */}

              <button
                onClick={handlefilter}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 px-3">{children}</main>
        </div>
      </body>
    </html>
  );
}


