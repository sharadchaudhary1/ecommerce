
//@ts-nocheck
"use client"

import { createContext, useEffect, useState } from "react";

export const NewCartContext = createContext();

export default  function CartContextProvider ({children}){

    const [cart,setCart] = useState([])
    

    
    return <NewCartContext.Provider value={{cart,setCart}}>
   


        {children}
    </NewCartContext.Provider>
}

