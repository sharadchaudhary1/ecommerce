//@ts-nocheck
"use client"
import getCurrentUserFromCookies from "@/services/helper";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider= ({children})=>{

    const [cart,setCart] = useState([])
    const [user,setUser]=useState("")
      const [isCartLoaded, setIsCartLoaded] = useState(false)

      useEffect(()=>{
        async function getcurrentuser(){
            const user=await getCurrentUserFromCookies()
    
            setUser(user)
        }
        getcurrentuser()
      },[])
    
      // load cart data based on user if it is logged in so fetch cart from db otherwise fetch cart data from localstorage
     useEffect(() => {
    async function loadCart() {
      if (!user) {
     
        let cartItems = localStorage.getItem("cart");
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        setCart(cartItems);
      } else {
       
        const res = await fetch("http://localhost:3000/api/cart");
        const data = await res.json();
        if (data.success) {
          setCart(data.items);
        }
      }
         setIsCartLoaded(true)
    }
    loadCart();
  }, [user]);

  useEffect(() => {
    if (isCartLoaded && !user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user, isCartLoaded]);
    
      

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return <CartContext.Provider value={{cart,setCart,totalItems,user,setUser}}>
        {children}
    </CartContext.Provider>
}

