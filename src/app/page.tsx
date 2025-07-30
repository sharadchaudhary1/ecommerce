//@ts-nocheck
import Image from "next/image";
import Header from "./Header/page";
import Itemcard from "@/components/Itemcard";
import Pagination from "@/components/pagination";
import AddToCart from "@/components/addtocartbtn";
import HomePageProds from "@/components/Homepage/home-page";

export default async function Home() {
  const response = await fetch("https://dummyjson.com/products?limit=194")
  const data=await response.json();
  const products=data.products ||[]
  // console.log(products)
  return (
   <>
   <Header/>
   <div className="flex flex-wrap justify-center gap-5">
      <Pagination products={products}/>
      {/* <HomePageProds products={products} />
       */}
</div>
 
   </>
  );
}
