//@ts-nocheck
import getCurrentUserFromCookies from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    const body=await req.json()
      
  

   const savelaterproduct={
    productId:body.productId,
    userId:body.userId
   }

     try{
        const existingProduct=await prismaClient.save.findFirst({
            where:{
                userId:body.userId,
                productId:body.productId
            }
        })
       
        if(existingProduct){
            return NextResponse.json({
                success:false,
                message:"product already in the savelist"
            })
        }
        else{
            const savedproduct=await prismaClient.save.create({
                data:savelaterproduct
            })
        }
         return NextResponse.json({
            success:true,

         })


     }
     catch(err){
         return NextResponse.json({
            success:false
         })
     }

}


export async function GET(req:NextRequest){

const user=await getCurrentUserFromCookies()

if (!user) {
    return NextResponse.json({
      success: true,
      products: [],
    });
  }

  try {
    const savelaterproducts = await prismaClient.save.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      products: savelaterproducts,
    });
  } catch (err) {
    console.error("Error fetching saveLater products:", err);
    return NextResponse.json({
      success: false,
      products: [],
    });
  }
} 