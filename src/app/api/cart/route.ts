//@ts-nocheck

import prismaClient from "@/services/prisma"
import { NextResponse } from "next/server"

export async function POST(req){

    const body=await req.json()

    try {
        const cartProduct=await prismaClient.cartdata.create({
            data:body
        })  
        return NextResponse.json({
          success:true,
          data:cartProduct
        })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
       success:false,

        })
    }
}