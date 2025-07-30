// //@ts-nocheck
// "use client"

// import prismaClient from "@/services/prisma"

// export default function HomePageProds(initialprods){
//     const [products,setProducts]=usestate(intialprods)
//     const [rating ,setRating]=useState('1')

//     let filteredProds=products.filter((item)=>{
//         return item.rating >=rating
//     })
//     setProducts(filteredProds)

//   function handleDelete(id){
//      let updatedItems=products.filter((item)=>{
//         return itemid !=id
//     })
//     setProducts(updatedItems)
//   }


   

//   return(
//   <div>
//   <div>
//     <select value={rating } onChange={(e)=>setRating(e.target.value)} >
//         <option value="1" > 1</option>
//         <option value="2" > 2</option>
//         <option value="3" > 3</option>
//         <option value="4" > 4</option>


//     </select>
//   </div>
//   </div>

//   )

// }




// async function HomePage(){
//     const products=await prismaClient.product.findMany();
//     return(
//         <HomePageProds initialprods={products}/>
//     )
// }