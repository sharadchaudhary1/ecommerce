//@ts-nocheck
import getCurrentUserFromCookies from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    const {products}=await req.json()

     const user=await getCurrentUserFromCookies()

     for(let product of products){

        const existingproduct=await prismaClient.save.findFirst({
            where:{
                userId:user?.id,
                productId:product.id
            }
        })



        if(!existingproduct){
            const savedproduct=await prismaClient.save.create({
                data:{
                     userId:user?.id,
                     productId:product.id
                }
            })

        }

     }
     return NextResponse.json({
        success:true
     })

}