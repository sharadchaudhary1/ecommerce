// @ts-nocheck
import AddToCart from '@/components/addtocartbtn';
import DeleteItem from '@/components/delete-item-btn';
import SaveLater from '@/components/savelater';
import prismaClient from '@/services/prisma';
import Link from 'next/link';
import React from 'react';

const Search = async ({ searchParams }) => {
  const search = searchParams.q;
  const min = searchParams.min || 0;
  const max = searchParams.max || 999999999;

  const url = `/api/search?q=${search}&min=${min}&max=${max}`;
  const response = await fetch(url);
  const data = await response.json();
  const products = data.data || [];

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        {search && (
          <p className="text-gray-600 text-lg">
            Showing results for "{search}" • {products.length} products found
          </p>
        )}
      </div>


     {products.length === 0 && ( 
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        </div>
      )} 

      {/* Flexbox container */}
      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 relative overflow-hidden group flex flex-col"
          >
            <Link href={`/product/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-52 w-full object-cover rounded-t-2xl"
              />
            </Link>

            <Link href={`/product/${product.id}`}>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  ₹{product.price}{' '}
                  <span className="text-yellow-600 font-medium">
                    ⭐ {product.rating}
                  </span>
                </p>
              </div>
            </Link>

            <div className=" flex gap-5 ml-7 mb-3  pt-0">
              <SaveLater product={product} />
              <AddToCart product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
