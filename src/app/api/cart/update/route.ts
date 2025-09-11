
// @ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();

    const updatedItem = await prismaClient.cartdata.updateMany({
      where: {
        userId,
        productId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json({
         success: true, 
         data: updatedItem 
        });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({
         success: false, 
         error: err.message
         });
  }
}
