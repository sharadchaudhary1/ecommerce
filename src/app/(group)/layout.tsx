//@ts-nocheck

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartContextProvider from "./context";
import prismaClient from "@/services/prisma";

export default function layout({ children }) {

     const cartItems=await prismaClient.product.findMany();

  return (
    <div>
      <CartContextProvider initialcartitems={cartItems}>
        {children}
        </CartContextProvider>
    </div>
  );
}
