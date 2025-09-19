//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
   const searchparams=req.nextUrl.searchParams

   const category=searchparams.get('category')
   const minprice=searchparams.get('min')
   const maxprice=searchparams.get('max')
  

   const max = maxprice && maxprice.trim() !== "" ? Number(maxprice) : Number.MAX_VALUE;

   console.log(minprice,max)
   try{
    const products=await prismaClient.product.findMany({
        where:{
         category:category,

            price:{
                gte:minprice? Number(minprice) : 0,
                lte:max
            }
        },
    })

    return NextResponse.json({
        success:true,
        products:products
    })
   }
   catch(err){
    console.log(err.message)
    return NextResponse.json({
        success:false
    })
   }


}