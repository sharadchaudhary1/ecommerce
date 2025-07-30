//@ts-nocheck

import prismaClient from "@/services/prisma"


export async function addproductToCart(productdata){
  try{
    const product=await prismaClient.cart.create({
    data:productdata
  })
  return {
    success:true,
    data:product
  }
  }
  catch(err){
    console.log(err.message)
    return{
   success:false,
   message:"something wromg happend "
    }
    

  }
 
}