//@ts-nocheck
"use client"
import { CartContext } from '@/context/CartContext';
import React, { useContext, useState } from 'react'

const handleSaveForLater = (id) => {

    const {cart, setCart,totalItems}= useContext(CartContext);
      const [saveLater, setSaveLater] = useState([]);

      const saveProduct = cart.filter((product) => product.id === id);
    setSaveLater([...saveLater, ...saveProduct]);
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);



    const moveToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
    setSaveLater(saveLater.filter((prod) => prod.id !== item.id));
  };


  return (
    <>
      {saveLater.length > 0 && (
          <div className="mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                Saved for Later
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saveLater.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm capitalize mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600">₹{item.price.toLocaleString()}</span>
                      <button
                        onClick={() => moveToCart(item)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
  )
}

export default handleSaveForLater