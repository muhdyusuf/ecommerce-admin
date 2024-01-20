"use server"
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import prisma from '../../../../prisma/client'
import AddBillboardModal from '@/components/AddBillboardModal'
import supabase from '@/lib/supabase'
import { getPathFromUrl } from '@/lib/utils'







interface pageProps {
  searchParams:{
    page?:number
  }
}

  
export async function addBillboard(form:{imageUrl:string,label:string}) {
  "use server"
  const temporaryPath=getPathFromUrl(form.imageUrl)
  const finalUrl="billboard_images/"+temporaryPath.split("/")[1]

  try {
    const {data,error}=await supabase
      .storage
      .from("ecommerce-v2")
      .move(temporaryPath,finalUrl)


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
   
  }
  
}

export async function deleteBillboard(id:number){
  "use server"
  return prisma.billboard.delete({
    where:{
      id:id
    }
  })
}

const Page:FC<pageProps>=async ({})=>{

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

export default Page