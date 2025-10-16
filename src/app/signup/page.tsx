// @ts-nocheck
"use client"



import SignInWithGoogle from '@/components/sign-in-with-google'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signup = () => {
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[username,setUsername]=useState("")
  const[confirmpassword,setConfirmpassword]=useState("")
  const[use ,setUse]=useState("personal")
  const router=useRouter()

  async function handlesignup(e){
    e.preventDefault()

    if (password !== confirmpassword) {
    alert("Passwords do not match ❌");
    return; 
  }

    const data={
      email:email,
      password:password,
      username:username,
      usecase:use,
      provider:"credentials"
    }
   const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,{
    method:"POST",
    body:JSON.stringify(data)
   })

   const saveddata=await res.json()
   if(saveddata.success){
    alert("user saved successfully")
    router.push('/')
   }
   else{
    alert("user not saved due to some error")
   }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-200 to-red-200">
      <div className="w-full max-w-md rounded-2xl bg-pink-200 shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-red-400 mb-8 text-center">Sign Up</h2>
        <form onSubmit={handlesignup} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border-none outline-none text-violet-500 font-semibold placeholder-violet-400 bg-white shadow-sm focus:ring-2 focus:ring-violet-300 transition"
          />
            <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            className="px-4 py-3 rounded-lg border-none outline-none text-violet-500 font-semibold placeholder-violet-400 bg-white shadow-sm focus:ring-2 focus:ring-violet-300 transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
              value={password}
            onChange={e=>setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border-none outline-none text-violet-500 font-semibold placeholder-violet-400 bg-white shadow-sm focus:ring-2 focus:ring-violet-300 transition"
          />
            <input
            type="password"
            placeholder="confirm password"
              value={confirmpassword}
            onChange={e=>setConfirmpassword(e.target.value)}
            className="px-4 py-3 rounded-lg border-none outline-none text-violet-500 font-semibold placeholder-violet-400 bg-white shadow-sm focus:ring-2 focus:ring-violet-300 transition"
          />  
          {
           password!=confirmpassword ?<p className='text-red-300 px-2 py-2 '>password mismatch</p>:null
          }
         <h2>Please select why you should use  </h2>
          <select  className='border-2 rounded py-2 px-4' value={use} onChange={e=>setUse(e.target.value)}>
            <option value={"personal "} >personal </option>
            <option value="business">business</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-white text-violet-700 font-bold text-lg shadow-md hover:bg-violet-600 hover:text-white transition"
          >
            Sign Up
          </button>
        </form>
        <SignInWithGoogle/>
        <p className="mt-6 text-center text-red-500">
          Already have an account?{' '}
          <Link href="/login" className="underline font-semibold hover:text-violet-800 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup