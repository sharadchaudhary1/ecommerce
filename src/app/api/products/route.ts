//@ts-nocheck
import getCurrentUserFromCookies from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

         try{

             const res=await prismaClient.product.findMany();
             return NextResponse.json({
                 success:true,
                 data:res,
             })
         }
         catch(err){
            console.log(err.message)
         }
}


export async function POST(req:NextRequest){
    const body=await req.json();
    const user=await getCurrentUserFromCookies();



    const productToSave={
        title:body.title,
        description:body.description,
        price:body.price,
        thumbnail:body.images,
        category:body.category
    }

    try{

          const company = await prismaClient.company.findFirst({
      where: { ownerId: user?.id },
    });
       
    let product;

        if(company){

        product=await prismaClient.product.create({
              data:{...productToSave,companyId:company.id},
          })
        }
        else{

           product=await prismaClient.product.create({
                data:productToSave,
            })
        }
    
        return NextResponse.json ({
            success:true,
            data:product,
        })
    }
    catch(err){
        console.log(err.message)
 return NextResponse.json ({
            success:false,
            
        })
      
    }

}   