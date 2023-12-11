'use client'
import {FC, useEffect, useState} from 'react'
import prisma from '../../../../../prisma/client'

import { Card } from '@/components/ui/card'
import { Product } from '@/type/product'
import Image from 'next/image'

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
   console.log(productId)

   const [product, setProduct] = useState<Product|null>(null)

   async function getProduct() {
      try {
         const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${productId}`,{cache:"no-store"})
         if(res.status===400)throw new Error("invalid id")
          const {data:{product}}=await res.json()
         setProduct(product)
      } catch (error) {
       console.log(error)
      }
     
   }

   useEffect(()=>{
     getProduct()
   },[])

   console.log(product)
   

  

 return(
   <main>
      {product&&(<Card>
         <h1>
            {product?.name}
         </h1>
         {product.imageUrls?.map(url=>(
            <Image
               width={400}
               height={400}
               alt="prodcutImage"
               src={url}
               className='w-[300px] aspect-square object-contain
               '
            />
         ))}
      </Card>)}
   </main>
)}

export default page