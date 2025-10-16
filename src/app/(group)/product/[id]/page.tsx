
//@ts-nocheck
import Header from "@/app/(group)/Header/page";
import AddToCart from "@/components/addtocartbtn";
import SaveLater from "@/components/savelater";
import React from "react";

const Productcard = async ({ params }) => {
  const { id } = params;
  
  // const url = "https://dummyjson.com/products/" + id;
  const url=`/api/products/${id}`
  
  const response = await fetch(url);
  const data = await response.json();
  const product = data.data;
  
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center px-4 py-12">
        <div className="relative w-full max-w-lg">
       
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          
        
          <div className="relative bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 hover:scale-[1.02] border border-white/20">
            
      
            <div className="relative overflow-hidden rounded-t-3xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
              />
              
           
              {product.discountPercentage && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                </div>
              )}
            </div>
            
        
            <div className="p-8 space-y-6">
              
            
              <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                {product.title}
              </h1>
              
              {/* Category  */}
              <div className="inline-flex items-center">
                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200">
                  {product.category}
                </span>
              </div>
              
          
              <p className="text-gray-600 leading-relaxed text-base font-medium">
                {product.description}
              </p>
              
              {/* Rating section */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.954L10 0l2.948 5.956 6.564.954-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {product.rating} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              
              {/* Price section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ₹{product.price}
                    </span>
                    {product.discountPercentage && (
                      <span className="text-lg text-gray-400 line-through font-medium">
                        ₹{Math.round(product.price / (1 - product.discountPercentage / 100))}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Free shipping available</p>
                </div>
                
                {/* Stock indicator */}
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-700' 
                      : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      product.stock > 10 
                        ? 'bg-green-500' 
                        : product.stock > 0 
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}></div>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4 pt-6">
              <AddToCart product={product}/>
               <SaveLater product={product}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productcard;