//@ts-nocheck

import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}){
    const id=params.id;

    if(!id){
        return NextResponse.json({
            success:false,
            message:"no id provided"
        })
    }
try{

    const product=await prismaClient.product.findUnique({
        where:{
            id:id
        }
    })
    return NextResponse.json({
        success:true,
        data:product,
    })
}catch(err){
    console.log(err.message)
    return NextResponse.json({
        success:false,

    })
}
}