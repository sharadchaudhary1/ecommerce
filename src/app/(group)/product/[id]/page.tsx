
//@ts-nocheck
import Header from "@/app/(group)/Header/page";
import AddToCart from "@/components/addtocartbtn";
import Itemcard from "@/components/productcard";
import SaveLater from "@/components/savelater";
import React from "react";

const Productcard = async ({ params }) => {
  const { id } = params;
  
  // const url = "https://dummyjson.com/products/" + id;
  const url=`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
  
  const response = await fetch(url);
  const data = await response.json();
  const product = data.data;



    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/similarproducts?category=${product.category}&title=${product.title}&id=${id}`)
    const simailardata=await res.json();
    const similarproducts=simailardata.data;
    console.log(similarproducts)

  
return (
  <div className="flex flex-col gap-6 w-screen p-6 bg-gray-50 min-h-screen">

    {/* Top Section */}
    <div className="w-full flex   gap-6 h-[45%]">

    
      <div className="md:w-1/2 w-[50%] h-full flex justify-center items-center">
        <div className="w-[50%]  h-[50%]   rounded-2xl overflow-hidden  justify-center items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

  
      <div className="md:w-1/2 w-[50%]  rounded-2xl px-4 flex flex-col justify-center ">
        <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>
        <p className="text-gray-600 text-lg font-medium mt-2 line-clamp-3">{product.description}</p>

        <div className="mt-4 gap-2 flex flex-col">
          <h1 className="text-2xl font-semibold text-blue-400">{product.category} </h1>
          <p className="text-xl font-bold text-green-600">₹{product.price}</p>
        </div>

           <div className="flex pt-12 items-center gap-10 "> 
              <AddToCart product={product} />
              <SaveLater product={product} />
           </div>
      </div>

    </div>

    {/* Bottom Section */}
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 min-h-[45%]">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Similar Products</h2>

     <div className="flex gap-5 flex-wrap items-center justify-center">

         {
          similarproducts.map((item)=>{
             return <Itemcard key={item.id} product={item} />
          })
         }
     </div>
         
    </div>
  </div>
);

};

export default Productcard;