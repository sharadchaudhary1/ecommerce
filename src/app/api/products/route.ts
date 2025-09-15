//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req:any){

         try{

             const res=await prismaClient.product.findMany();
             return NextResponse.json({
                 success:true,
                 data:res,
             })
         }
         catch(err){
            console.log(err.message)
         }
}


export async function POST(req){
    const body=await req.json();

    const productToSave={
        title:body.title,
        description:body.description,
        price:body.price,
        thumbnail:body.thumbnail,
        category:body.category
    }

    const product=await prismaClient.product.create({
        data:productToSave,
    })

    return ({
        success:true,
        data:product,
    })
}