
//@ts-nocheck
"use client"

import { createContext, useEffect, useState } from "react";

export const NewCartContext = createContext();

export default async function CartContextProvider ({children,initialcartitems}){

    const [cart,setCart] = useState([])
    

    
    return <NewCartContext.Provider value={{cart,setCart}}>
   


        {children}
    </NewCartContext.Provider>
}

