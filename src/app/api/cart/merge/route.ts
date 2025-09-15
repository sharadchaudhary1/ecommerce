//@ts-nocheck
import getCurrentUserFromCookies from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest } from "next/server";


export async function POST(req:NextRequest) {
  const { items } = await req.json();
  const user = await getCurrentUserFromCookies();

  for (let item of items) {
  
    const existing = await prismaClient.cartdata.findFirst({
      where: { userId: user?.id, productId: item.id },
    });

    if (existing) {
     
      await prismaClient.cartdata.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
    } else {
     
      await prismaClient.cartdata.create({
        data: {
          userId: user?.id,
          productId: item.id,
          quantity: item.quantity,
        },
      });
    }
  }

  return Response.json({ success: true });
}
