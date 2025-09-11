//@ts-nocheck

import getCurrentUserFromCookies from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { userId, productId, quantity } = await req.json();

  try {
    const existingItem = await prismaClient.cartdata.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    let cartProduct;

    if (existingItem) {
      cartProduct = await prismaClient.cartdata.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      cartProduct = await prismaClient.cartdata.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: cartProduct,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
    });
  }
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not logged in",
    });
  }

  try {
    const cartitems = await prismaClient.cartdata.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({
      success: true,
      items: cartitems,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
    });
  }
}
