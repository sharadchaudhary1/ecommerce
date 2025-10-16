//@ts-nocheck
"use client"
import EditProductButton from "@/components/edit-prod-btn"
import getCurrentUserFromCookies from "@/services/helper"
import { Star, ShoppingCart, Eye, Heart } from "lucide-react"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"
import EditProductBtn from "@/components/edit-prod-btn"

export default  function AllProductsOnSales() {
   
   const [products,setProducts]=useState([])
   const {user}=useContext(CartContext)


   useEffect(()=>{
    async function ProductsIncompany(){

      
  const res = await fetch(`/api/allsalesproduct`)
  const data = await res.json()
  setProducts(data.products)  

    }

    ProductsIncompany()
   },[user])
                                                                                                                   

                                                                                                                                           
 


  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center space-y-4">
          {/* Empty state icon */}
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          
      
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Products on Sale on this  company
          </h3>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            There are currently no products available on sale. Add some products on sale to extend your Business and earn more Profits
          </p>
          
          {/* Call to action button */}
          <div className="pt-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Eye className="w-5 h-5" />
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-3 animate-fade-in border border-gray-100 hover:border-transparent"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Product Image Container */}
          <div className="relative overflow-hidden h-72 bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-700  group-hover:brightness-110"
            />


            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            {/* Discount Badge */}
            {product.discountPercentage && (
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </div>
            )}
          </div>

          {/* Product Content */}
          <div className="p-6 relative">
            <Link 
              href={`/product/${product.id}`}
              className="group-hover:scale-[1.02] transition-transform duration-300 block"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500 leading-tight">
                {product.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            </Link>

            {/* Rating */}
            <div className="flex items-center mb-5">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 transition-all duration-300 ${
                      i < Math.floor(product.rating || 4) 
                        ? "fill-current text-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2 font-medium">
                ({product.rating || 4.0})
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.discountPercentage && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{Math.round(product.price / (1 - product.discountPercentage/100)).toLocaleString()}
                  </span>
                )}
              </div>
                    <EditProductBtn product={product} />
            </div>
          </div>

       
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      ))}
    </div>
  )
}
