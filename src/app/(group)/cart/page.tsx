//@ts-nocheck
"use client";

import React, { useContext, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Heart, ArrowRight, Package } from "lucide-react";
import { CartContext } from "@/app/(group)/context/CartContext";
import { NewCartContext } from "../context";
import RemoveProduct from "@/components/removeproductfromcart";
import SaveLater from "@/components/savelater";
import { SaveContext } from "../context/savecontext";
import { useRouter } from "next/navigation";



const Cart = () => {
  const {cart, setCart,totalItems,user,setUser}= useContext(CartContext);
 const {savelater, setSavelater} = useContext(SaveContext);

  

 const router=useRouter()
 
function handleBuyNow(){
    
  if(!user){
    alert("currenly you are not login first login")
    router.push('/login')
  }
   else{

     router.push('/address-and-contact')
   }
}



// incease the quantity of product
  const increaseQuantity = async (id) => {
  if (user) {
   
    const item = cart.find((p) => p.productId === id || p.id === id);
    if (!item) return;

    const newQuantity = (item.quantity || 1) + 1;

   const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);

    await fetch("/api/cart/update", {
      method: "PUT",
      body: JSON.stringify({
        userId: user.id,
        productId: item.productId || item.id,
        quantity: newQuantity,
      }),
    });

  
    
  } else {

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
  }
};


//decrease the quantity of product
const decreaseQuantity = async (id) => {
  if (user) {
  
    const item = cart.find((p) => p.productId === id || p.id === id);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;


    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity:newQuantity }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);

    await fetch("/api/cart/update", {
      method: "PUT",
      body: JSON.stringify({
        userId: user.id,
        productId: item.productId || item.id,
        quantity: newQuantity,
      }),
    });

   
  } else {
    
    const updatedCart = cart .map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  }
};


//move product from cart to the savelater 
async  function handleSaveForLater(item) {

  console.log(item)
     
    if(user){
      const existingItem=savelater.find((product)=>product.productId===item.productId)

      if(existingItem){
        setCart(cart.filter((product)=>product.productId!==item.productId))
      }

      else{
         const updatedSaveLater = [...savelater,  {...item} ];
      setSavelater(updatedSaveLater)

      setCart(cart.filter((product)=>product.productId!==item.productId))

        const res=await fetch('/api/cart/savelater',{
          method:"POST",
          body:JSON.stringify({
            userId:user.id,
            productId:item.productId,
            id:item.id
          })
   
        })

      }
    }
    else{
           const existingItem=savelater.find((product) =>  product.id === item.id)

      if(existingItem){
        setCart(cart.filter((product)=>product.id!==item.id))
      }
    else{
       const updatedSaveLater = [...savelater, { ...item}];
      setSavelater(updatedSaveLater)

    

      const updatedCart = cart.filter((product) => product.id !== item.id);
    setCart(updatedCart);
  

    }

    }

  } 

  
  const totalPrice = Math.round(
    cart.reduce((sum, item) => sum + (item.price??item.product.price??0) * (item.quantity || 1), 0)
  );


  //move product from savelater to the cart
  const moveToCart = async(item) => {
  

    if(user){
      const existingItem=cart.find((product)=>product.productId===item.productId)

      if(existingItem){
        setSavelater(savelater.filter((product)=>product.productId!==item.productId))
      }

      else{
         const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart)

      setSavelater(savelater.filter((product)=>product.productId!==item.productId))

        const res=await fetch('/api/savelater/movetocart',{
          method:"POST",
          body:JSON.stringify({
            userId:user.id,
            productId:item.productId,
            quantity:1,
            id:item.id
          })
   
        })

      }
    }
    else{
           const existingItem=cart.find((product)=> product.id===item.id)

      if(existingItem){
        setSavelater(savelater.filter((product)=>product.id!==item.id))
      }
    else{
       const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart)

    

      const updatedSaveLater = savelater.filter((product) => product.id !== item.id);
    setSavelater(updatedSaveLater);
  

    }

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
     
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
                        src={item.thumbnail??item.product.thumbnail}
                        alt={item.title??item.product.title}
                        className="w-full md:w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        ×{item.quantity??item.product.quantity}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title??item.product.title??""}
                        </h3>
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize mt-1">
                          {item.category??item.product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{(item.price??item.product.price * item.quantity??item.product.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{(item.price??item.product?.price??0).toLocaleString()} each
                         

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
                            {item.quantity??item.product.quantity}
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
                            onClick={() => handleSaveForLater(item)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Save</span>
                          </button>

                       

                          <RemoveProduct id={item.id}/>
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

                <button onClick={handleBuyNow} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Buy now
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

        Saved for Later
     {savelater.length > 0 && (
  <div className="mt-16">
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
        <Heart className="w-6 h-6 text-red-500" />
        Saved for Later
      </h2>
      
      {/* Flex container */}
      <div className="flex flex-wrap gap-6 justify-center">
        {savelater.map((item) => (
          <div
            key={item.id}
            className="w-[280px]  border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group bg-white flex flex-col"
          >
            {/*  product image  */}
            <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
              <img
                src={item.thumbnail ?? item.product?.thumbnail}
                alt={item.title ?? item.product?.title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* title */}
            <h3 className="font-semibold text-gray-900 mb-1 text-lg line-clamp-2">
              {item.title ?? item.product?.title}
            </h3>

            {/* Category */}
            <p className="text-gray-500 text-sm capitalize mb-3">
              {item.category ?? item.product?.category}
            </p>

            {/* Price & CTA at bottom */}
            <div className="mt-auto flex items-center justify-between">
              <span className="font-bold text-xl text-blue-600">
                ₹{(item.price ?? item.product?.price ?? 0).toLocaleString()}
              </span>
              <button
                onClick={() => moveToCart(item)}
                className="text-red-500 font-bold text-m hover:text-blue-700  bg-pink-100 px-3 py-3 rounded-2xl "
              >
                Move to Cart
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