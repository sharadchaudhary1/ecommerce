

//@ts-nocheck
"use client"

import { useRouter } from "next/navigation"

export default function EditProductBtn({product}){

  
  const router=useRouter()

  function handleEditProduct(){
    router.push(`/edit-product/${product.id}`)
  }

  return(
 <>
      <button 
        onClick={handleEditProduct} 
      className="px-4 cursor-pointer py-2 bg-red-300 rounded "
      >
        Edit
      </button>
 </>

  )
}
