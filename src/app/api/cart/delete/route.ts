//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest){

    const body=await req.json()
    
    try{

        const deleteproduct=await prismaClient.cartdata.delete({
            where:{
             id:body.id
            }
        })
        return NextResponse.json({
            success:true,
            data:deleteproduct
        })

    }
    catch(err){
        console.log(err.message)
        return NextResponse.json({
            success:false
        })
    }
}