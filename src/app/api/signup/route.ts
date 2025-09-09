import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const body=await req.json()

    const user={
        email:body.email,
        username:body.username,
        password:body.password
    }
    
try{

    const saveduser=await prismaClient.user.create({
        data:user
    })
    return NextResponse.json({
        success:true
    })

}catch(err:any){
    console.log(err.message)
    return NextResponse.json({
        success:false
    })
}


}