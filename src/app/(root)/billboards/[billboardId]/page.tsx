'use server '
import {FC, useEffect, useState} from 'react'
import prisma from '../../../../../prisma/client'

import { Card } from '@/components/ui/card'
import { Product } from '@/type/product'
import Image from 'next/image'
import ImageUploadInput from '@/components/ImageUploadInput'
import ProductForm from './ProductForm'



interface pageProps {
 params:{
    billboardId:string
 }
}

const page:FC<pageProps>=({params})=>{

   const {billboardId}=params
   console.log(billboardId)

   const [billboard, setBillboard] = useState<Product|null>(null)

   async function getProduct() {
      try {
         const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${billboardId}`)
         if(res.status===400)throw new Error("invalid id")
          const {data:{billboard}}=await res.json()
         setBillboard(billboard)
      } catch (error) {
       console.log(error)
      }
     
   }

   useEffect(()=>{
     getProduct()
   },[])

   console.log(billboard)

   const [imageUrl, setImageUrl] = useState<string>(billboard.id||"")



  

 return(
   <main>
      {billboard&&(<Card>
         <h1>
            {billboard?.name}
         </h1>
         <div>
        
            <div
               className='w-[200px]'
            >
               <ImageUploadInput
                  defaultUrl={imageUrl}
                  onImageUploaded={(url)=>setImageUrl(url)}
                  width={200}
                  height={200}
               />
            </div>
        
         </div>
         <ProductForm
            billboard={billboard}
         />
      </Card>)}

   </main>
)}

export default page