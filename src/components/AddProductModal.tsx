'use client'
import React, {FC, ReactNode, useState} from 'react'
import prisma from '../../prisma/client'

//ui
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog"


import { Category, Colour, Size } from '@prisma/client'
import { Product } from '@/type/product'
import ProductForm from '@/app/(root)/products/[productId]/ProductForm'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
interface addProductProps {
 categories:Category[],
 sizes:Size[],
 colours:Colour[]
 initialData?:Product
 children:ReactNode

}


const AddProductModal:FC<addProductProps>=({categories,colours,sizes,initialData,children})=>{

  const title=initialData?"Update Product":"Create Product"
  const description=initialData?`Update ${initialData.id}`:"Add a new product"

  const [open,setOpen]=useState<boolean>(false)
 
 return(
   <Dialog
    open={open}
    onOpenChange={()=>setOpen(!open)}
   >
   <DialogTrigger
    asChild
   >
    {children}
   </DialogTrigger>
   <DialogContent>
     <DialogHeader>
       <DialogTitle>
        <span
          className='text-3xl'
        >
          {title}
        </span>
      </DialogTitle>
      <DialogDescription>
        <span
          className='text-xl'
        >
          {description}
        </span>
      </DialogDescription>
     </DialogHeader>
     
      <ProductForm
        categories={categories}
        sizes={sizes}
        colours={colours}
      />
   </DialogContent>
 </Dialog>
)}

export default AddProductModal