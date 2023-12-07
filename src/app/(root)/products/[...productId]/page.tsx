'use client'
import {FC, useEffect, useState} from 'react'
import prisma from '../../../../../prisma/client'

import { Card } from '@/components/ui/card'
import { Product } from '@/type/product'

// async function getProduct(id:number){
//    "use server"
//    const product=await prisma.product.findUnique({
//       where:{
//          id:id
//       },
//       include:{
//          rating:{
//             select:{
//                rate:true,
//                count:true
//             }
//          }
//       }
//    })
   

// }

interface pageProps {
 params:{
    productId:string
 }
}

const page:FC<pageProps>=({params})=>{

   const {productId}=params

   const [product, setProduct] = useState<Product|null>(null)

   async function getProduct() {
      try {
         const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${productId}`,{cache:"no-store"})
         if(res.status===400)throw new Error("invalid id")
          const {data:{product}}=await res.json()
         setProduct(product)
      } catch (error) {
       
      }
     
   }

   useEffect(()=>{
     getProduct()
   },[])

   

  

 return(
   <main>
      {product&&(<Card>
         <h1>
            {product?.name}
         </h1>
      </Card>)}
   </main>
)}

export default page