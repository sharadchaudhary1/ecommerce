//@ts-nocheck

"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/addtocartbtn";
import SaveLater from "@/components/savelater";

export default function SelectCategory() {
  const searchparams = useSearchParams();
  const category = searchparams.get("category");
  const minprice = searchparams.get("min") || 0;
  const maxprice = searchparams.get("max") || Number.MAX_SAFE_INTEGER;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    if (!category) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/selectproducts?category=${category}&min=${minprice}&max=${maxprice}`
        );
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "All Products"}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products in our {category} collection
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-64 bg-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <Link href={`/product/${product.id}`}>
                      <button className="bg-white cursor-pointer p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                        <Eye className="w-5 h-5 text-gray-700" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {product.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? "fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs ml-2">(4.0)</span>
                </div>

                <div className="flex flex-col items-start gap-3">
       
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>

                  {/* Save & AddToCart buttons */}
                  <div className="flex gap-3">
                    <SaveLater product={product} />
                    <AddToCart product={product} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500">Try browsing a different category</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
