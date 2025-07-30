//@ts-nocheck
"use client"


import { addproductToCart } from '@/app/(group)/cart/action'
import { NewCartContext } from '@/app/(group)/context'
import { CartContext } from '@/context/CartContext'
import React, { useContext } from 'react'

const AddToCart = ({ product }) => {
  // const { cart, setCart } = useContext(CartContext)
  const { cart, setCart } = useContext(NewCartContext)

 async function handlecart() {
    const res=await addproductToCart(product)

    const id = product.id;
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
      const cartUpdate = cart.map(item =>
        item.id === id
          ? { ...item, quantity: (parseInt(item.quantity) || 1) + 1 }
          : item
      );
      setCart(cartUpdate);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  return (
    <div>
      <button className='bg-red-400 rounded px-3 py-2 cursor-pointer' onClick={handlecart}>
        Add to cart
      </button>
    </div>
  );
}

export default AddToCart;