//@ts-nocheck
"use client"


// import { addproductToCart } from '@/app/(group)/cart/action'
import { NewCartContext } from '@/app/(group)/context'
import { CartContext } from '@/context/CartContext'
import React, { useContext } from 'react'

const AddToCart = ({ product }) => {
//   const { cart, setCart } = useContext(CartContext)
  const { cart, setCart } = useContext(NewCartContext)

  async function handlecart() {

      const res=await fetch("/api/cart/",{
        method:"POST",
        body:JSON.stringify(product)
      } )
      const data=await res.json
      console.log(data.data)
      if(data.success){
        alert("product added successfully in cart")
      }
      else{
        alert("porduct not add in cart due to some error")
      }

   

setCart([...cart, data.data]);

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