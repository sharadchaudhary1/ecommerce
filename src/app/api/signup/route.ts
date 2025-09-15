
import { generateToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const body=await req.json()

    const user={
        email:body.email,
        username:body.username,
        password:body.password,
        usecase:body.usecase,
        provider:body.provider
    }
    
try{
      
    if(user.provider=="google"){
       const saveduser=await prismaClient.user.create({
        data:user
    })  
    return NextResponse.json({
        success:true
    })

    }

    const saveduser=await prismaClient.user.create({
        data:user
    })
 const token =generateToken({email:user?.email})
    const res= NextResponse.json({
        success:true
    })
    res.cookies.set("user",token)
    return res

}catch(err:any){
    console.log(err.message)
    return NextResponse.json({
        success:false,
        message:err.message
    })
}


}