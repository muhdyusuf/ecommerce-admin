'use server'
import {FC} from 'react'
import prisma from '../../../../../prisma/client'

import { Card } from '@/components/ui/card'
import { Product } from '@/type/product'
import ProductForm from './ProductForm'
import { redirect } from 'next/navigation'



interface pageProps {
   params:{
      productId:string
   }
}

const page:FC<pageProps>=async ({params})=>{
   
   const {productId}=params
   const categories=await prisma.category.findMany()
   const colours=await prisma.colour.findMany()
   const sizes=await prisma.size.findMany()

   if(productId==="new") return(
      <main
         className='md:container'
      >

            <ProductForm
               categories={categories}
               sizes={sizes}
               colours={colours}
            
            />
         
         
   
      </main>
   )



  
   const product=await prisma.product.findFirst({
      where:{
         id:Number(productId)
      },
      include:{
         rating:{
            select:{
               count:true,
               rate:true
            }
         }
      }
    
   })


   if(!product){
      redirect(`${process.env.NEXT_PUBLIC_APP_URL}/products/new`)
   }

   const {colourId,sizeId,categoryId,rating,createdAt,updatedAt,...rest}=product
   const formattedProduct={
    ...rest,
    colour:colourId,
    size:sizeId,
    category:categoryId,
   }



 return(
   <main
      className='md:container'
   >
         <ProductForm
            categories={categories}
            sizes={sizes}
            colours={colours}
            product={formattedProduct}
            id={product.id}
           
       
         />

   </main>
)}

export default page