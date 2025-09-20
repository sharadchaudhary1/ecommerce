//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    const body=await req.json()
    const id=body.id
    const userId=body.userId
    const productId=body.productId
    const quantity=body.quantity

    try{

        const removefromsave=await prismaClient.save.delete({
            where:{
              id:id
            }
        })
    
        const movetocart=await prismaClient.cartdata.create({
            data:{
                userId:userId,
                productId:productId,
                quantity:quantity
            }
        })
        return NextResponse.json({
            suceess:true,

        })
    }
    catch(err){
        console.log(err.message)
        return NextResponse.json({
            success:false,
            
        })
    }

}