// @ts-nocheck
"use client"
import getCurrentUserFromCookies from "@/services/helper";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider= ({children})=>{

    const [cart,setCart] = useState([])
    const [user,setUser]=useState(null)
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
          
        //initially user is not  login but after user is done signin so fetch data from localstorage and save in database and make localsorage empty
         let localCart = localStorage.getItem("cart");
        localCart = localCart ? JSON.parse(localCart) : [];

        if (localCart.length > 0) {
       
        try{
          await fetch("/api/cart/merge", {
            method: "POST",
            body: JSON.stringify({ items: localCart }),
          });
        }
        catch(err){
          console.log(err.message)
        }
          

        
          localStorage.removeItem("cart");
        }
      
        //fetch the updated cart items
        try{

          const res = await fetch("/api/cart");
          const data = await res.json();
          if (data.success) {
            setCart(data.items);
          }
        }
        catch(err){
          console.log(err.message)
        }
      }
    setIsCartLoaded(true)
    }
    loadCart();
  }, [user]);


  //if user is not login so add product in localstorage
  useEffect(() => {
    if (isCartLoaded && !user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user,isCartLoaded ]);
    
      

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return <CartContext.Provider value={{cart,setCart,totalItems,user,setUser}}>
        {children}
    </CartContext.Provider>
}



