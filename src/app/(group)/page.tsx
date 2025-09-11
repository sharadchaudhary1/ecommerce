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

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products")

  const data=await response.json();
  const products=data.data ||[];
  // console.log(products)
  // const res=await addproductToDb(products);

  const user=await getCurrentUserFromCookies()
  console.log(user)  

  const advertisementarray=[1,2,3,4]

  return (
   <>
   {/* <Header/> */}
   <div className="flex flex-wrap justify-center gap-5">
       <Advertisement/>


      <Pagination products={products}/>
      
      {/* <HomePageProds initialprods={products} /> */}
      
</div>
 
   </>
  );
}
