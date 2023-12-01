import {FC} from 'react'
import prisma from '../../../../../prisma/client'

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
 return(
    <div>
       {product?.id}
    </div>
)}

export default page