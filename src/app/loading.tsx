"use client"
import React from 'react'
import { ShoppingBag, Package } from "lucide-react"

const loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-white'>
      
      {/* Main loading container */}
      <div className="flex flex-col items-center space-y-6 p-8">
        
        {/* Logo/Brand area with subtle animation */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingBag className="text-white" size={36} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Package className="text-white" size={14} />
          </div>
        </div>

        {/*  spinner */}
        <div className="relative">
 
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        {/* Clean typography */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Loading your experience
          </h2>
          <p className="text-gray-500 text-sm max-w-xs">
            We're preparing everything for you. This will only take a moment.
          </p>
        </div> 

        {/* Subtle progress dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>

      {/* Optional brand message at bottom */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-gray-400">
          Powered by secure shopping technology
        </p>
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}

export default loading