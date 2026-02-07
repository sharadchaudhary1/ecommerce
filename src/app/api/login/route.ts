//@ts-nocheck
import { generateToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const body=await req.json()
    const usercred=body.usercred
    const password=body.password
   try{

    const user=await prismaClient.user.findFirst({
        where:{
          OR:[
         
            { email:usercred},
            {username:usercred}
          ]
        
        }
    })
      const token =generateToken({email:user?.email})

    if(user?.password==password){
        delete user.password
      const res= NextResponse.json({
            success:true,
             user:user,
        })
        res.cookies.set('user',token)
        return res
    }
    else{
        return NextResponse.json({
            success:false,
            message:"invalid credentials"

        })
    }
}
catch(err){
    console.log(err.message)
}


}