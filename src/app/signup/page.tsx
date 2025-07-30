// @ts-nocheck

import { handlesignup, signUpHandle } from '@/services/action'
import Link from 'next/link'
import React, { useState } from 'react'

const Signup = () => {
  const [email,setEmail]=useState("")

  // async function handleSubmit(e){
  //   e.preventdefault()

  //   const data={
  //     email,
  //     password,
  //   }
  //   const res=await signUpHandle(data)
  //   if(!res){
     
  //   }

  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-300 to-blue-200">
      <div className="w-full max-w-md rounded-2xl bg-violet-500 shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Sign Up</h2>
        <form action={handlesignup} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg border-none outline-none text-violet-500 font-semibold placeholder-violet-400 bg-white shadow-sm focus:ring-2 focus:ring-violet-300 transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-lg border-none outline-none text-violet-500 font-semibold placeholder-violet-400 bg-white shadow-sm focus:ring-2 focus:ring-violet-300 transition"
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-white text-violet-700 font-bold text-lg shadow-md hover:bg-violet-600 hover:text-white transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-white">
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