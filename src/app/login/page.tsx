//@ts-nocheck
"use client"
import { signIn } from "next-auth/react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {

  const[usercred,setUsercred]=useState("")
    const[password,setPassword]=useState("")
    const router=useRouter()

     
   async function handlelogin(e){
     e.preventDefault()

     const res=await fetch("http://localhost:3000/api/login",{
      method:"POST",
      body:JSON.stringify({
        usercred,
        password
      })
     })

     const data=await res.json()
     console.log(data)
     if(data.success){
      alert("user is authenticated")
      router.push("/")

     }else{
      alert("user is not authenticated")
     }


    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form onSubmit={handlelogin} className="bg-pink-100 shadow-lg rounded-lg p-8  max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <input 
          type="text"
          name='usercred'
          value={usercred}
          onChange={e=>setUsercred(e.target.value)}
          placeholder="Enter email or username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name='password'
             value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

         <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>

      </form>


      


       
       
    </div>
  )
}

export default Login
