//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
const searchParams=req.nextUrl.searchParams
const query=searchParams.get('q')
const min=searchParams.get('min') ? Number(searchParams.get('min')):0;

const max=searchParams.get('max') ? Number(searchParams.get('max')):Infinity;


    if(!query){
        return NextResponse.json({
            success:false,
            data:[],
            message:"no query given"
        })
    }
try{

    const data=await prismaClient.product.findMany({
        where:{
            title:{
                contains:query,
                mode:'insensitive'
            },
            price:{
                gte:min,
                lte:max,
            }
        }
    })


//     const data = await prismaClient.product.findMany({
//   where: {
//     AND: [
//       {
//         price: {
//           gte: min,
//           lte: max,
//         },
//       },
//       {
//         OR: [
//           { title: { contains: query, mode: 'insensitive' } },
//           { category: { contains: query, mode: 'insensitive' } },
//           { company: { contains: query, mode: 'insensitive' } },
//         ],
//       },
//     ],
//   },
// });

    return NextResponse.json({
        success:true,
        data:data,
    })
}catch(err){
    console.log(err.message)
    return NextResponse.json({
        success:false,
  
    })
}
}