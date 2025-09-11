//@ts-nocheck
"use server"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prismaClient from "./prisma";


export default async function getCurrentUserFromCookies(){

  const cookie= await cookies()
  const email=cookie.get('user')?.value


  if (!email) {
    return null; 
  }
  const currentuser=await prismaClient.user.findUnique({
    where:{
        email:email
    }
  })
  if(!currentuser){
    return null
  }
return currentuser;


}