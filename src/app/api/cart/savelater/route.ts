

//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    const body=await req.json()
    const id=body.id
    const userId=body.userId
    const productId=body.productId
  

    try{

        const removefromcart=await prismaClient.cartdata.delete({
            where:{
              id:id
            }
        })
    
        const movetosavelater=await prismaClient.save.create({
            data:{
                userId:userId,
                productId:productId,
            
            }
        })
        return NextResponse.json({
            success:true,

        })
    }
    catch(err){
        console.log(err.message)
        return NextResponse.json({
            success:false,
            
        })
    }

}