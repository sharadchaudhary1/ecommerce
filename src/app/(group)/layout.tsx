//@ts-nocheck



import prismaClient from "@/services/prisma";

import { CartProvider } from "./context/CartContext";
import Header from "./Header/page";

export default function layout({ children }) {

    //  const cartItems=await prismaClient.product.findMany();

  return (
    <div>
      <CartProvider >
        <Header/>
        {children}
        </CartProvider>
    </div>
  );
}
