// //@ts-nocheck

// import prismaClient from "@/services/prisma"


// export async function addproductToCart(product){

//   const cartProduct={
//     title:product.title,
//     description:product.description,
//     price:product.price,
//     thumbnail:product.thumbnail,
//     category:product.category,

//   }
//   try{
//     const createdproduct=await prismaClient.cart.create({
//     data:cartProduct
//   })
//   return {1
//     success:true,
//     data:createdproduct,
    
    
//   }


//   }
//   catch(err){
//     console.log(err.message)
//     return{
//    success:false,
//    message:"something wromg happend "
//     }
    

//   }
 
// }