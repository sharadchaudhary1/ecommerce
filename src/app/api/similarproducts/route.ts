//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const searchParams=req.nextUrl.searchParams;
    const category=searchParams.get('category');
    const title=searchParams.get('title')
    const id=searchParams.get('id')

    try{

        const similarproducts=await prismaClient.product.findMany({
            where:{
               category:category,
               NOT:{
                id:id
               },
            },
            take:9,
        })

        return NextResponse.json({
            success:true,
            data:similarproducts
        })
    }
    catch(err){
        console.log(err.message);
        return NextResponse.json({
            success:false
        })
    }
}