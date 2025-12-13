//@ts-nocheck
"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function adressAndContactDetails() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const router=useRouter()

  function handleSubmit(e) {
    e.preventDefault();
   
    router.push('/payment-page')
    
   
    }
  

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl text-center font-bold mb-4">Address & Contact Information</h2>

      <div className="mb-3">
        <label className="block font-medium">Full Name<span className="text-red-500">*</span></label>
        <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="Enter your name" />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Email<span className="text-red-500">*</span></label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="Enter email" />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Phone Number<span className="text-red-500">*</span></label>
        <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="contact no." />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Address Line 1<span className="text-red-500">*</span></label>
        <input type="text" required value={addressLine1} onChange={e => setAddressLine1(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="Enter your Address" />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Address Line 2</label>
        <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="Apartment, colony,road name,area name etc. " />
      </div>

      <div className="mb-3">
        <label className="block font-medium">City<span className="text-red-500">*</span></label>
        <input type="text" required value={city} onChange={e => setCity(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="City" />
      </div>

      <div className="mb-3">
        <label className="block font-medium">State/Province<span className="text-red-500">*</span></label>
        <input type="text" required value={state} onChange={e => setState(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="State" />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Postal Code<span className="text-red-500">*</span></label>
        <input type="text" required value={postalCode} onChange={e => setPostalCode(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="Postal Code" />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Country<span className="text-red-500">*</span></label>
        <input type="text" required value={country} onChange={e => setCountry(e.target.value)}
          className="w-full border rounded px-3 py-2" placeholder="Country" />
      </div>

      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">
        Continue to Payment 
      </button>
    </form>
  );
}