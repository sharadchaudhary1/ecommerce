//@ts-nocheck
"use client";

import React, { useContext, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Heart, ArrowRight, Package } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import { NewCartContext } from "../(group)/context";


const Cart = () => {
  // const {cart, setCart,totalItems}= useContext(CartContext);
  const { cart, setCart } = useContext(NewCartContext)
  const [saveLater, setSaveLater] = useState([]);

  const removeProduct = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

 function handleSaveForLater(id) {
    const saveProduct = cart.filter((product) => product.id === id);
    setSaveLater([...saveLater, ...saveProduct]);
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  } 

  // const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = Math.round(
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  );

  const moveToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
    setSaveLater(saveLater.filter((prod) => prod.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {totalItems} items
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add some items to get started!</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Items</h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full md:w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        ×{item.quantity}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize mt-1">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{item.price.toLocaleString()} each
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-50 rounded-xl border">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-2 hover:bg-gray-200 rounded-l-xl transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-2 hover:bg-gray-200 rounded-r-xl transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={() => handleSaveForLater(item.id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Save</span>
                          </button>
                          <button
                            onClick={() => removeProduct(item.id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
              <div className="lg:w-80">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalItems})</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 Secure checkout • Free returns • Fast shipping
                  </p>
                </div>
              </div>
            </div> 
        

          </div>
        )}

        {/* Saved for Later */}
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
        
        
      </div>
    </div>
  );
};

export default Cart;