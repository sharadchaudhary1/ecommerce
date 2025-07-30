//@ts-nocheck
"use client"
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider= ({children})=>{

    const [cart,setCart] = useState([])
    
      
    useEffect(()=>{
        let cartItems=localStorage.getItem('cart')
        cartItems=cartItems? JSON.parse(cartItems):[]
        
        setCart(cartItems)
    },[])
    
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return <CartContext.Provider value={{cart,setCart,totalItems}}>
        {children}
    </CartContext.Provider>
}

