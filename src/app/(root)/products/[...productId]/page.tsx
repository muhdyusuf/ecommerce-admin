import {FC} from 'react'
import prisma from '../../../../../prisma/client'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import error from './error.js'


interface pageProps {
 params:{
    productId:string
 }
}

const page:FC<pageProps>=async({params})=>{
   const {productId}=params
   const product=await prisma.product.findUnique({
      where:{
         id:parseInt(productId)
      }
   })


   if(!product){
      throw new Error("Invalid Product")
   }
  

 return(
   <main>
      
   </main>
)}

export default page