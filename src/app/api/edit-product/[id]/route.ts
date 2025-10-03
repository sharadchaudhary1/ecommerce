//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}){

    const id=params.id
 
    try{

        const product=await prismaClient.product.findUnique({
            where:{
                id:id
            }
        })

        return NextResponse.json({
            success:true,
            product:product
        })
    }
    catch(err){
        console.log(err.message)
        return NextResponse.json({
            success:false
        })
    }
}




export async function POST(req:NextRequest,{params}){

   const id=params.id

   const body=await req.json();

   const updateproduct={
    title:body.title,
    description:body.description,
    price:body.price,
    thumbnail:body.thumbnail,
    category:body.category
   }



   try{
      

        const updatedproduct=await prismaClient.product.update({
            where:{
                id:id,
            },
            data:updateproduct
        })


        return NextResponse.json({
            success:true,
            product:updatedproduct
        })
    


   }
   catch(err){
    console.log(err.message)
   }
}