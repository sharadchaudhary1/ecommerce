import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const companydata=await req.json()

    try{
        const company=await prismaClient.company.create({
            data:companydata
        })
        return NextResponse.json({
            success:true,
            data:company
        })
    }catch(err:any){
        console.log(err.message)
        return NextResponse.json({
            success: false,

        })
    }
}