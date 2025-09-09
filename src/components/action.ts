// //@ts-nocheck
// "use server";

// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// import prismaClient from "@/services/prisma";

// let data = [
//   {
//     email: "sharad234@io",
//     password: "123",
//   },
//   {
//     email: "mohit123@gmail.com",
//     password: "123",
//   },
// ];

// export async function handlelogin(formdata: FormData) {
//   let email = formdata.get("email");
//   let password = formdata.get("password");

//   const user = data.find((u) => u.email === email && u.password === password);

//   if (user) {
//     const usercookies = await cookies();

//     const userData = {
//       email: email,
//       password: password,
//     };

//     usercookies.set("loginuser", JSON.stringify(userData));
//     redirect("/");
//   } else {
//     redirect("/login");
//   }
// }

// export async function handlesignup(formdata: FormData) {
//   const email = formdata.get("email");
//   const password = formdata.get("password");

//   const checkuser = data.find(
//     (u) => u.email === email && u.password === password
//   );

//   if (checkuser) {
//     alert(
//       `this email already exists .please signup with another email or go to login `
//     );
//   } else {
//     const newUser = {
//       email: email,
//       password: password,
//     };

//     data.push(newUser);
//     redirect("/login");
//   }
// }






// export  async function addproductToDb(products){
    
//    const formattedProducts = products.map(product => ({
//     title: product.title,
//     description: product.description,
//     price: product.price,
//     category: product.category,
//     thumbnail: product.thumbnail,
//   }));

//   try{
//     const product=await prismaClient.product.createMany({
//     data:formattedProducts
//   })
//   return {
//     success:true,
//     data:product
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

// export async function deleteItemFromDb(id){
//   try{
//   const data=  await prismaClient.product.delete({
//       where:{
//         id:id
//       }
//     })
//     return {
//       success:true
//     }
//   }
//   catch(err){
//        return{
//         success:false
//        }
//   }
// }


// export async function updateProductInDB(productdata,id){
//   try{
//     const product=await prismaClient.product.update({
//       where:{
//         id:id
//       },
//       data:productdata

//     })
//     return{
//       success:true,
//       data:product
//     }
//   }
//   catch(err){
//     return{
//       success:false
//     }
//   }
// }