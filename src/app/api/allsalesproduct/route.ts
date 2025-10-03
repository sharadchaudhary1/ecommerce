//@ts-nocheck
import getCurrentUserFromCookies from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getCurrentUserFromCookies();

  console.log(user.company?.[0]?.id)
  console.log(user)

  try {
    const products = await prismaClient.product.findMany({
      where: {
          companyId:user.company?.[0]?.id
      },
    });

    return NextResponse.json({
      success: true,
      products: products || [],
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
    });
  }
}
