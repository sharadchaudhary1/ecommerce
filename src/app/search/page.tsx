
// @ts-nocheck
import DeleteItem from '@/components/delete-item-btn';
import prismaClient from '@/services/prisma';
import Link from 'next/link';
import React from 'react';

const Search = async ({ searchParams }) => {
  const search = searchParams.q;
  const min =searchParams.min ||0;
  const max=searchParams.max||999999999;
  // const rating=searchParams.rating||1;


  const url=`http://localhost:3000/api/search?q=${search}&min=${min}&max=${max}`
// const url=`http://localhost:3000/api/search?q=${search}`

  const response = await fetch(url);
  const data = await response.json();
  const products = data.data || [];
  // console.log(products)



  return (
    <div className="p-6 min-h-screen  bg-gray-100">
     

      {products.length === 0 && (
        <p className="text-red-600 text-center text-lg mt-10">
          No products found.
        </p>
      )} 
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
         
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 relative overflow-hidden group"
          >
             <Link href={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-cover"
            />
    </Link>
           <Link href={`/product/${product.id}`}>
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
            </Link>

         
          </div>  
        ))}
      </div> 

    

    </div>
  );
};

export default Search;



