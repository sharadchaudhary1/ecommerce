//@ts-nocheck
"use server"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prismaClient from "./prisma";
import { verifyToken } from "./jwt";
import { auth } from "../../auth";


export default async function getCurrentUserFromCookies(){

  const cookie= await cookies()
  const token=cookie.get('user')?.value

     const session = await auth()
    
     //if user is authenticated with google then return google user
     if(session){
     const googleuser=await prismaClient.user.findUnique({
      where:{
        email:session.user?.email
      }
     })
      
     if(!googleuser){
      return null
     }
     
    //if user is authenticated with user and its usecase is business then return a  businessuser
      if(googleuser.usecase=="business"){
    const businessuser=await prismaClient.user.findUnique({
      where:{
        email:email
      },
      include:{
        company:true
      }
    })
    return businessuser
  }
     return googleuser
     }


    



  const decode=verifyToken(token)
  const email=decode?.email
  //if emial is not find then return null
  if (!email) {
    return null; 
  }

  //if the usecase of user is personal then return current user without include company
  const currentuser=await prismaClient.user.findUnique({
    where:{
        email:email
    },
   
  })
  if(!currentuser){
    return null
  }
   
  // if the usecase of current is business then return business
  if(currentuser.usecase=="business"){
    const businessuser=await prismaClient.user.findUnique({
      where:{
        email:email
      },
      include:{
        company:true
      }
    })
    return businessuser
  }
return currentuser;


}