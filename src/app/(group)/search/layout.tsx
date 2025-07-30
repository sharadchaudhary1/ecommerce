//@ts-nocheck
"use client"

import { useRouter, useSearchParams } from "next/navigation";
import Header from "../Header/page";
import { useState } from "react";



export default function Layout({
  children,
}) {

    const searchparams=useSearchParams();
     const searchterm=searchparams.get('q')||''
    const minval=searchparams.get('min')||""
    const maxval=searchparams.get('max')||""
    const minrating=searchparams.get('rating')||1
   
    const[min,setMin]=useState(minval)
    const[max,setMax]=useState(maxval)
    const[rating,setRating]=useState(minrating)
          
    const router  = useRouter()
       
    function handlefilter(){
        let url="/search?"
        if(min){
            url += "&min="+ min;

        }
        if(max){
            url += "&max=" + max
        }
        if(rating){
            url += "&rating=" + rating
        }
        if(searchterm){
            url += "&q=" +searchterm
        }
           
        router.push(url)


    }


  return (
    <html lang="en">
      <body
      
      >  <Header/>
             <div className="flex w-full">
              <aside className="w-full sm:w-[260px] bg-white rounded-2xl shadow-lg border border-gray-200 px-6 h-full py-6 flex flex-col gap-6 ml-3 mt-6 md:mt-0">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Price Filter</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="min"
              className="text-lg font-semibold text-gray-700 mb-2"
            >
              Min Price
            </label>
            <input
              type="number"
              id="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="h-11 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              placeholder="eg. 100"
              name="min"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="max"
              className="text-lg font-semibold text-gray-700 mb-2"
            >
              Max Price
            </label>
            <input
              type="number"
              id="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="h-11 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              placeholder="eg. 5000"
               name="max"
            />
          </div>
          <select
            name="rating "
            id="rating"
            value={rating}
            onChange={(e)=>setRating(e.target.value)}

            className="px-3 py-2 bg-gray-500  "
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button onClick={handlefilter} className="px-3 py-2 bg-green-400">
            filter
          </button>
        </div>
      </aside>
           

        {children}
        </div>
      </body>
    </html>
  );
}
