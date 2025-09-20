//@ts-nocheck
"use client";

// import { addproductToCart } from '@/app/(group)/cart/action'
import { NewCartContext } from "@/app/(group)/context";
import { CartContext } from "@/app/(group)/context/CartContext";
import getCurrentUserFromCookies from "@/services/helper";
import { ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const AddToCart = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getcurrentuser() {
      try {
        const user = await getCurrentUserFromCookies();
        setUser(user);
      } catch (err) {
        console.log(err.message);
      }
    }
    getcurrentuser();
  }, []);

  const cartProduct = {
    userId: user?.id,
    productId: product.id,
    quantity: 1,
  };

  const updatedcartproduct = { ...product, quantity: 1 };

  async function handlecart() {
    if (user) {
      const res = await fetch("/api/cart/", {
        method: "POST",
        body: JSON.stringify(cartProduct),
      });
      const data = await res.json();
      console.log(data.data);
      if (data.success) {
        setCart([...cart, data.data]);
        alert("product added successfully in cart");
      } else {
        alert("porduct not add in cart due to some error");
      }
    }

    const existingItem = cart.find((item) => item.id === product.id);
    //if item alredy in cart so only increase the quantity
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, updatedcartproduct]);
    }
  }

  return (
    <div>
      <button onClick={handlecart} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 shadow-lg">
        <ShoppingCart className="w-4 h-4" />
        <span className="text-sm font-semibold">Add</span>
      </button>
    </div>
  );
};

export default AddToCart;
