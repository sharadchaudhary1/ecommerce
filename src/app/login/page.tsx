//@ts-nocheck
import { handlelogin } from '@/components/action'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

        
      <form action={handlelogin} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <input 
          type="email"
          name='email'
          placeholder="Enter email or username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name='password'
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
