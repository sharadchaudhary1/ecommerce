//@ts-nocheck
import Image from "next/image";

import Itemcard from "@/components/itemcard";
import AddToCart from "@/components/addtocartbtn";
import HomePageProds from "@/components/Homepage/home-page";
import { addproductToDb } from "@/components/action";
import Pagination from "@/components/pagination";
import getCurrentUserFromCookies from "@/services/helper";
import Header from "./Header/page";
import Advertisement from "@/components/advertisement";
import { auth } from "../../../auth";
import SelectUseCase from "@/components/select-usecase";
import SelectProductsFromCategory from "@/components/select-by-category";


export default async function Home() {
  const response = await fetch(`/api/products`)

  const data=await response.json();

  const products=data.data ||[];
  // console.log(products)
  // const res=await addproductToDb(products);

   const session = await auth()

   
  
  const user=await getCurrentUserFromCookies()
  console.log(user)  


  return (
   <>
   {/* <Header/> */}
   <div className="flex flex-wrap justify-center gap-5">

    < SelectProductsFromCategory/>
       <Advertisement/>


      <Pagination products={products}/>

      {session && !user?.usecase &&(
        <SelectUseCase/>
      ) }
      
      {/* <HomePageProds initialprods={products} /> */}
      
</div>
 
   </>
  );
}
