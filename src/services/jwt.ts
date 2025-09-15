//@ts-nocheck

import jwt from "jsonwebtoken";

export function generateToken(data){
    const token=jwt.sign(data,process.env.JWT_SECRET)
    return token;
}


export function verifyToken(token){
     if (!token) {
    return null; 
  }
   const data=jwt.verify(token,process.env.JWT_SECRET)
   return data
}