//@ts-nocheck


import CartContextProvider from "./context";
import prismaClient from "@/services/prisma";
import Header from "../Header/page";

export default function layout({ children }) {

    //  const cartItems=await prismaClient.product.findMany();

  return (
    <div>
      <CartContextProvider >
        <Header/>
        {children}
        </CartContextProvider>
    </div>
  );
}
