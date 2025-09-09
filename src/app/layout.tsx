//@ts-nocheck
"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { CartProvider } from "@/context/CartContext";



import React from "react";

export default function layout({ children }) {
  return (
    <html>
      <body>
        {/* <CartProvider> */}
          {children}
          {/* </CartProvider> */}
      </body>
    </html>
  );
}
