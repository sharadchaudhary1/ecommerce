
//@ts-nocheck

import React from 'react'
import Link from 'next/link';
import DeleteItem from './delete-item-btn';
import EditProdButton from './edit-prod-btn';
import AddToCart from './addtocartbtn';
import SaveLater from './savelater';

const Itemcard = ({product}) => {
  return (
    <div className="p-3 w-full sm:w-[420px]">
      <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50 opacity-60 pointer-events-none"></div>
        
        <div className="relative p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Product Image */}
            <Link href={`/product/${product.id}`} >
              <div className="relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full sm:w-32 h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </Link>

            {/* Product Details */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              {/* Title and Category */}
              <div className="space-y-2">
                <Link href={`/product/${product.id}`}>
                  <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
                    {product.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-gray-500 font-medium">
                      {product.brand}
                    </span>
                  )}
                </div>
              </div>

              {/* Price, Rating, and Action */}
              <div className="mt-4 space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="ml-1 text-sm font-semibold text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Price and Add to Cart */}
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
          </div>
        </div>

        {/* Subtle border highlight on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-100 transition-colors duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
}

export default Itemcard;