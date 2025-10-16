


"use client"
import { signIn } from "next-auth/react"

 
export default function SignInWithGoogle() {
  return (
    <button 
            className="flex items-center justify-center gap-3 mt-5 bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-2 w-full hover:bg-gray-100 transition"
           onClick={() => signIn("google",{redirectTo:"/"})}>

             <img
          src="https://static.vecteezy.com/system/resources/thumbnails/046/861/647/small_2x/google-logo-transparent-background-free-png.png"
          alt="Google Logo"
          width={20}
          height={20}
        />
              <span className="text-gray-700 font-medium">continue with Google</span>
    </button>
  )
}