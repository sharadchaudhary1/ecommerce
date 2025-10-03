//@ts-nocheck
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function EditProdButton() {

  const {id}=useParams()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [product,setProduct]=useState("")


  useEffect(()=>{
    async function EditProduct(){
      
      const res=await fetch( `/api/edit-product/${id}`)
      const data=await res.json()
      if(data.success){
        setProduct(data.product)


       setTitle(data.product.title || "");
      setDescription(data.product.description || "");
      setPrice(data.product.price || "");
      setCategory(data.product.category || "");
      setImageUrl(data.product.thumbnail || "");
      }

    }

    EditProduct()
  },[id])

  




  async function handleSubmit() {
    const parsedPrice = Number.parseFloat(price);
    const updatedproduct = {
      title,
      description,
      price: parsedPrice,
      category,
      thumbnail: imageUrl,
    };

    const res=await fetch(`/api/edit-product/${id}`,{
      method:"POST",
      body:JSON.stringify(updatedproduct)
    })


  }

  return (
    <>
 
        <div className="fixed inset-0 z-50 flex items-center justify-center">
  
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
          <h2 className="text-lg font-bold mb-2">Edit Product</h2>
          <p className="text-sm text-gray-600 mb-4">
            Edit the product details below.
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Title</span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Description</span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Price</span>
              <input
                type="number"
                className="border border-gray-300 rounded px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Category</span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1">Image URL</span>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </label>
          </div>

        
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
