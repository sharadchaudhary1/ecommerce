//@ts-nocheck
"use client"
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { redirect } from "next/navigation";

export default function AddCompany() {
  const [companyname, setCompanyname] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const {user}=useContext(CartContext)
  
  
  const companydata={
    name:companyname,
    category:category,
    description:description,
    ownerId:user?.id
  }

 async function CompanyRegistration(){
  const res=await fetch("/api/addcompany",{
    method:"POST",
    body:JSON.stringify(companydata)
  })
  const data=await res.json()
  if(data.success){
redirect('/')
  }
  }

  return (
    <div className="max-w-md mx-auto mt-20  bg-blue-100 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add Company
      </h2>

      {/* Company Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Company Name
        </label>
        <input
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
          type="text"
          placeholder="Enter your company name"
          name="company"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter company description"
          name="description"
          
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="electronics">Electronics</option>
          <option value="beauty">Beauty</option>
          <option value="mobile accessories">Mobile Accessories</option>
          <option value="cosmetics">Cosmetics</option>
          <option value="nutrition">Nutrition and Supplements</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button onClick={CompanyRegistration} className="w-full bg-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-indigo-600 transition duration-200">
        Add Company
      </button>
    </div>
  );
}
