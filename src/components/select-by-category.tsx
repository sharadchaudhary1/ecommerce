//@ts-nocheck
"use client";
// import { useRouter } from "next/navigation"

// export default function SelectProductsFromCategory(){
//     const router=useRouter()

//     function handleSearchProductWithCategory(e,category){

//         e.preventDefault()

//         router.push(`/selectcategory?category=${category}`)
//     }

//     return (
//         <div>
//             <form onSubmit={(e)=>handleSearchProductWithCategory(e,"smartphones")}>
//                 <button className="cursor-pointer" type="submit">Smartphones</button>
//             </form>

//              <form onSubmit={(e)=>handleSearchProductWithCategory(e,"skin-care")}>
//                 <button className="cursor-pointer" type="submit">Skin care</button>
//             </form>

//                <form onSubmit={(e)=>handleSearchProductWithCategory(e,"mobile-accessories")}>
//                 <button className="cursor-pointer" type="submit">mobile-accessories</button>
//             </form>
//         </div>
//     )
// }

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Heart,
  Headphones,
  Shirt,
  Home,
  Car,
  Book,
  Gamepad2,
  Laptop,
  Watch,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryNavbar() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter();

  function handleSearchProductWithCategory(e, category) {
    e.preventDefault();
    router.push(`/selectcategory?category=${category}`);
  }

  const categories = [
    {
      id: "smartphones",
      name: "Smartphones",
      icon: Smartphone,
      gradient: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      id: "skin-care",
      name: "Beauty",
      icon: Heart,
      gradient: "from-pink-500 to-rose-400",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
    {
      id: "mobile-accessories",
      name: "Accessories",
      icon: Headphones,
      gradient: "from-purple-500 to-indigo-400",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      gradient: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
    },
    {
      id: "home-decor",
      name: "Home & Decor",
      icon: Home,
      gradient: "from-amber-500 to-orange-400",
      bgColor: "bg-amber-50",
      hoverColor: "hover:bg-amber-100",
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      gradient: "from-slate-600 to-gray-600",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
    },
    {
      id: "books",
      name: "Books",
      icon: Book,
      gradient: "from-red-500 to-pink-400",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: Gamepad2,
      gradient: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      hoverColor: "hover:bg-violet-100",
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: Laptop,
      gradient: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      hoverColor: "hover:bg-cyan-100",
    },
    {
      id: "watches",
      name: "Watches",
      icon: Watch,
      gradient: "from-gray-600 to-slate-600",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
    },
  ];

  const scrollCategories = (direction) => {
    const container = document.getElementById("categories-container");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="bg-white w-full shadow-lg border-b border-gray-100  top-0 z-50">
      {/* Main Category Navbar */}
      <div className="relative w-full bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex items-center">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollCategories("left")}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 z-10 mr-4"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Categories Container */}
            <div
              id="categories-container"
              className="flex-1 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex items-center space-x-2 py-4 min-w-max">
                {categories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={(e) =>
                        handleSearchProductWithCategory(e, category.id)
                      }
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`  group relative flex flex-col items-center justify-cente px-4 py-3 min-w-[120px] rounded-xl transition-all duration-300 transform  hover:scale-105 hover:-translate-y-1
                                  ${
                                      hoveredCategory ===
                                      category.id
                                      ? "shadow-lg"
                                      : "hover:shadow-md"
                                  }
                                     ${category.hoverColor}
                                      focus:outline-none focus:ring-2 focus:ring-blue-200
                                 `}
                    >
                      {/* Background Glow Effect */}
                      <div
                        className={` absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20  bg-gradient-to-r ${category.gradient} transition-opacity duration-30 `}
                            ></div>

                      {/* Icon Container */}
                      <div
                        className={`
                                                relative p-2 rounded-lg ${
                                                  category.bgColor
                                                } mb-2
                                                transition-all duration-300 group-hover:scale-110
                                                ${
                                                  hoveredCategory ===
                                                  category.id
                                                    ? "shadow-md"
                                                    : ""
                                                }
                                            `}
                      >
                        <IconComponent
                          className={`
                                                    w-6 h-6 transition-all duration-300
                                                    ${
                                                      hoveredCategory ===
                                                      category.id
                                                        ? `text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text`
                                                        : "text-gray-600"
                                                    }
                                                `}
                        />
                      </div>

                      {/* Category Name */}
                      <span
                        className={`
                                                text-sm font-semibold transition-all duration-300 text-center leading-tight
                                                ${
                                                  hoveredCategory ===
                                                  category.id
                                                    ? `text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text`
                                                    : "text-gray-700 group-hover:text-gray-900"
                                                }
                                            `}
                      >
                        {category.name}
                      </span>

                      {/* Active Indicator */}
                      <div
                        className={`
                                                absolute bottom-0 left-1/2 transform -translate-x-1/2
                                                w-0 h-1 bg-gradient-to-r ${
                                                  category.gradient
                                                } rounded-full
                                                transition-all duration-300
                                                ${
                                                  hoveredCategory ===
                                                  category.id
                                                    ? "w-8"
                                                    : "group-hover:w-4"
                                                }
                                            `}
                      ></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollCategories("right")}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 z-10 ml-4"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile View */}
      <div className="md:hidden bg-gray-50 px-4 py-2">
        <div className="flex justify-center">
          <span className="text-xs text-gray-500 font-medium">
            ← Scroll to explore categories →
          </span>
        </div>
      </div>
    </div>
  );
}
