'use client'
import {FC, useEffect, useState} from 'react'
import prisma from '../../../../../prisma/client'

import { Card } from '@/components/ui/card'
import { Product } from '@/type/product'
import Image from 'next/image'
import ImageUploadInput from '@/components/ImageUploadInput'
import ProductForm from './ProductForm'

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
         const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${productId}`)
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

   const [imageUrls, setImageUrls] = useState<string[]>(["","","",""])


   function handleImageChange(url:string,index:number){
      console.log(url)
      if(url===""){
         setImageUrls(state=>{
            state.splice(index,1)
            state.push("")
            return state
         })
      }
      else{
         setImageUrls(state=>{
            state[index]=url
            return state
         })
      }
   }
   

  

 return(
   <main>
      {product&&(<Card>
         <h1>
            {product?.name}
         </h1>
         <div>
         {product.imageUrls?.map((url,index)=>(
            <div
               key={`${product.name}image${index}`}
               className='w-[200px]'
            >
               <ImageUploadInput
                  defaultUrl={url}
                  onImageUploaded={(url)=>handleImageChange(url,index)}
                  width={500}
                  height={500}
               />
            </div>
         ))}
         </div>
         <ProductForm
            product={product}
         />
      </Card>)}

   </main>
)}

export default page