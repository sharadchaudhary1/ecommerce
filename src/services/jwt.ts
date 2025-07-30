//@ts-nocheck

export function generateToken(data){
    const token=jwt.sign(data,process.env.JWT_SECRET)
    return token;
}


export function verifyToken(token){
   const data=jwt.verify(token,process.env.JWT_SECRET)
   return data
}