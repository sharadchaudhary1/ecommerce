
"use client"
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Logout(){
    
    const router=useRouter()
     const { data: session } = useSession()

    async function handlelogout(){
        if(session){
            signOut()
        }
        else{

            const res=await fetch("/api/logout",{
             method:"POST"
            })
            const data=await res.json()
            if(data.success){
          alert("user logged out successfully")
            }
        }
    }

    return (
        <div>
            <button className="cursor-pointer" onClick={handlelogout} >  <LogOut/>logout </button>
        </div>
    )
}