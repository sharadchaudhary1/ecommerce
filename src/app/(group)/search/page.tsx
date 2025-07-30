
// @ts-nocheck
import DeleteItem from '@/components/delete-item-btn';
import prismaClient from '@/services/prisma';
import React from 'react';

const Search = async ({ searchParams }) => {
  const search = searchParams.q;
  const min =searchParams.min;
  const max=searchParams.max;
  const rating=searchParams.rating;

  const url = `https://dummyjson.com/products/search?q=`+ search
  const response = await fetch(url);
  const data = await response.json();
  const products = data.products || [];


  // let data=[];


  // try{
  //   data=await prismaClient.Product.findMany({                          //read data from database
  //     where:{
  //       title:{
  //         contains:search,
  //         mode:"insensitive"
  //       }
  //     }
  //   })
  // }
  // catch(err){

  // }


  let searchfilter = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );


  if(min){
    searchfilter=searchfilter.filter((product)=>
        product.price>min
    )
  }

  
  if(max){
    searchfilter=searchfilter.filter((product)=>
        product.price<max
    )
  }

  
  if(rating){
    searchfilter=searchfilter.filter((product)=>
        product.rating >=rating
    )
  }



  return (
    <div className="p-6 min-h-screen  bg-gray-100">
     

      {searchfilter.length === 0 && (
        <p className="text-red-600 text-center text-lg mt-10">
          No products found.
        </p>
      )} 

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchfilter.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 relative overflow-hidden group"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-1">
                ₹{product.price}{' '}
                <span className="text-yellow-600 font-medium">
                  ⭐ {product.rating}
                </span>
              </p>
            </div>

         
          </div>
        ))}
      </div> 

     {/* {
      data.map((item)=>(
        <div>
        <h1>{item.title} </h1>
         <p>{item.description} </p>
         <span>{item.price} </span>
         <DeleteItem/>
         </div>
      ))
     } */}

    </div>
  );
};

export default Search;



