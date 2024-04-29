import {FC} from 'react'
import prisma from '../../../../../prisma/client'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'

import { Copy } from 'lucide-react'
import CopyButton from '@/components/CopyButton'

interface pageProps {
 params:{
    orderId:string
 }
}

const Page:FC<pageProps>=async({params})=>{
    const {orderId}=params
    const order=await prisma.order.findUnique({
      where:{
         id:Number(orderId)
      },
      include:{
         cartItem:{
            include:{
               product:true
            }
         }
      }

    })
    const total=order?.cartItem.reduce((total,value)=>total+(value.quantity*value.product.price),0)
 return(
   <main
      className='md:container'
   >
      <div
         className='flex justify-between items-center'
      >
         <h1
            className='text-4xl'
         >Order #{orderId}
         </h1>
         <p
            className={cn(
               order?.status==="paid"&&"text-green-400",
               order?.status==="failed"&&"text-red-400",
               "outline outline-muted rounded-md p-2 uppercase font-black text-3xl "
            )}
         >
            {order?.status}
         </p>
   </div>

    <div
      className='grid lg:grid-cols-[1fr,400px] relative gap-6'
    >
      <h2
         className='col-span-full'
      >
         Items
      </h2>

      <div>
         {order?.cartItem.map((item,index)=>(
            <div
               key={item.id}
               className='grid grid-cols-[auto,150px,1fr] gap-4 border-b py-4'
            >
               <p
                  className='text-xl'
               >
                  {index+1}
               </p>
               <div
                  className='w-[150px] h-auto aspect-square'
               >
                  <Image
                     src={item.product.imageUrls[0]}
                     width={150}
                     height={150}
                     alt={item.product.name+"image"}
                     className='w-full h-full object-cover'
                  />
               </div>
               <div>

               <p>
                  Name: {item.product.name}
               </p>
               <p>
                  Quantity: {item.quantity}
               </p>
               <p>
                  Price: {formatPrice(item.product.price)}
               </p>
               </div>
               
            </div>
         ))}
      </div>
      <div>
      <div
         className='flex flex-col gap-6 lg:sticky lg:top-16 bottom-0 right-0 '
      >

         <div
            className='w-full flex flex-col gap-2 md:gap-6 bg-muted h-min  p-2 md:p-6 rounded-md'
            >
               
                  <h2
                        className='text-xl md:text-3xl font-bold'
                        >
                     Summary
                  </h2>
                  
                  <div
                     className='flex justify-between'
                     >
                     <p>
                        {`Subtotal (${order?.cartItem.length})`}
                     </p>
                     <p>
                           {formatPrice(total||0)}
                     </p>
                  </div>
                  <div
                     className='flex justify-between'
                     >
                     <p>
                           Delivery and Handling
                     </p>
                     <p>
                           {formatPrice(0)}
                     </p>
                  </div>

                  <div
                     className='flex justify-between'
                     >
                     <div
                           className='flex items-center'
                           >
                           <p>Payment Charge</p> 
                     </div>
                     <p>                    
                           {formatPrice(0)}
                     </p>
         </div>
         <div
            className='border-y-[1px] border-y-1 border-black/30 flex justify-between font-bold py-4'
            >
            <p>Total Income</p>
            <p>{formatPrice(total||0)}</p>
         </div>

         </div>
         <div
            className='outline outline-muted rounded-md p-2 md:p-6 flex flex-col'
         >
            <h2
               className='textxl md:text-3xl font-bold mb-4'
            >
               Shipping detail
            </h2>
            <p>
               Name :<span>{order?.name}</span>
            </p>
            <p>
               Phone Number: <span>{order?.phone}</span>
            </p>
            <p>
               Address: <span>{order?.address}</span>
            </p>
            <CopyButton
               value={`${order?.phone},${order?.name},${order?.address}`}
               className='w-min p-1 gap-1 h-min'
            >
               <>
                  <Copy
                     size={15}
                  />
                  <p>
                     copy shipping detail
                  </p>
               </>
            </CopyButton>
          </div>

      </div>
      </div>
    </div>
    
   </main>
)}

export default Page