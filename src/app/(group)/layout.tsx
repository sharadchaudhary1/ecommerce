//@ts-nocheck



import prismaClient from "@/services/prisma";

import { CartProvider } from "./context/CartContext";
import Header from "./Header/page";
import { SessionProvider } from "next-auth/react"
import { SaveProvider } from "./context/savecontext";
export default function layout({ children }) {

    //  const cartItems=await prismaClient.product.findMany();

  return (
    <div>
     
     <SaveProvider>
      <CartProvider >
           <SessionProvider>
        <Header/>
      
          {children}
        </SessionProvider>
        </CartProvider>
        </SaveProvider>
        
    </div>
  );
}
