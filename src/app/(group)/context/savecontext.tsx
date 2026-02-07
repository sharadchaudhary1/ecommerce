//@ts-nocheck
"use client"
import getCurrentUserFromCookies from "@/services/helper";
import { createContext, useEffect, useState } from "react";

export const SaveContext=createContext()

export const SaveProvider=({children})=>{

    const [savelater,setSavelater]=useState([])
    const[user,setUser]=useState(null)

     useEffect(()=>{
            async function getcurrentuser(){
                const user=await getCurrentUserFromCookies()
        
                setUser(user)
            }
            getcurrentuser()
          },[])

    useEffect(()=>{
        async function saveLaterData(){

            if(!user){
                 const savelaterproducts= localStorage.getItem('savelater')
              const  products=savelaterproducts?JSON.parse(savelaterproducts):[]
               setSavelater(products)
            }
            else{

                 const saveproducts= localStorage.getItem('savelater')
             const  product=saveproducts?JSON.parse(saveproducts):[]
      
            if( product?.length>0){
               
                try{

                    const res=await fetch("/api/savelater/merge",{
                        method:"POST",
                        body:JSON.stringify({products:product})
                    })
                    const data=await res.json()
                    if(data.success){
                        localStorage.removeItem('savelater')
                    }
                }
                catch(err){
                    console.log(err.message)
                }
            }

             const res=await fetch("/api/savelater")
             const data =await res.json()
            //  console.log(data)
             setSavelater(data.products||[])
            }

        }
        saveLaterData()
    },[user])




return(
    
    <SaveContext.Provider value={{savelater,setSavelater,user,setUser}}>

        {children}
    </SaveContext.Provider>
)
}