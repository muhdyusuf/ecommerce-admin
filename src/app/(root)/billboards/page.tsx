import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import { Product } from '@/type/product'
import prisma from '../../../../prisma/client'
import { Button } from '@/components/ui/button'
import AddBillboardModal from '@/components/AddBillboardModal'
import { billboardSchema } from '@/lib/validation/billboard'
import { z } from 'zod'
import supabase from '@/lib/supabase'
import { getPathFromUrl } from '@/lib/utils'



export type Billboard =z.infer<typeof billboardSchema>&{
  id:number,
  createdAt:Date,
  updatedAt:Date,
}



interface pageProps {
  searchParams:{
    page?:number
  }
}

type BillboardForm=z.infer<typeof billboardSchema>
  
async function addBillboard(form:BillboardForm) {
  "use server"

  const temporaryPath=getPathFromUrl(form.imageUrl)
  const finalUrl="billboardImages/"+temporaryPath.split("/")[1]
  console.log(finalUrl)

  console.log(temporaryPath)
  try {
    const {data,error}=await supabase
      .storage
      .from("ecommerce-v2")
      .move(temporaryPath,finalUrl)

    console.log(data)
    if(error)throw new Error(error.message)

    const billboard=await prisma.billboard.create({
      data:{
        label:form.label,
        imageUrl:`${process.env.NEXT_SUPABASE_STORAGE_BASE_URL!}/${finalUrl}`
      }
    })
    if(billboard){
      return billboard
    }
  } catch (error) {
    return error
  }
  
}

const page:FC<pageProps>=async ({})=>{
  

  const billboards=await prisma.billboard.findMany({
    orderBy:{
      updatedAt:"desc"
    },
    
  })

  



 return(
    <main
      className='md:container'
    >
      <AddBillboardModal addBillboard={addBillboard}/>
      <div>
        <DataTable columns={columns} data={billboards}/>
      </div>
    </main>
)}

export default page