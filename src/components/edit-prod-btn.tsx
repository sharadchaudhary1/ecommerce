//@ts-nocheck
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import React from 'react';
import { addproductToDb, updateProductInDB } from './action';

export default function EditProdButton(product) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [imageUrl, setImageUrl] = useState(product.image_url);
 

  async function handleSubmit() {

    const parsedprice=Number.parseFloat(price)
    const data = {
      title,
      description,
      price:parsedprice,
      category,
      image_url : imageUrl,
  
    };
    
    const res=await updateProductInDB(data,product.id )
    if(res.success){
        alert("data saved successfully")
    }
    else{
        alert("some error occured")
    }
   
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Product
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-2">Add Product</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Edit in the product details.
          </Dialog.Description>

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
            <Dialog.Close asChild>
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}