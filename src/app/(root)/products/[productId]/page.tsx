'use server'
import {FC} from 'react'
import prisma from '../../../../../prisma/client'

import { Card } from '@/components/ui/card'
import { Product } from '@/type/product'
import ProductForm from './ProductForm'



interface pageProps {
 params:{
    productId:string
 }
}

const page:FC<pageProps>=async ({params})=>{

   const {productId}=params
  
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

   const categories=await prisma.category.findMany()
   const colours=await prisma.colour.findMany()
   const sizes=await prisma.size.findMany()

   if(!product)return

   const {colourId,sizeId,categoryId,rating,createdAt,updatedAt,...rest}=product
   const formattedProduct={
    ...rest,
    colour:colourId,
    size:sizeId,
    category:categoryId,
   }


  




   
   

  

 return(
   <main>
      {product&&(
      <>
         <h1>
            {product?.name}
         </h1>
       
         
         <ProductForm
            categories={categories}
            sizes={sizes}
            colours={colours}
            product={formattedProduct}
            id={product.id}
           
       
         />
      </>
      )}

   </main>
)}

export default page