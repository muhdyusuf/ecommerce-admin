'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'

import { Size } from '@/type/size'
import AddSizeModal from '@/components/AddSizeModal'
import { AddSizeForm } from '@/components/AddSizeModal'





  async function getSizes(): Promise<Size[]> {
    const sizes=await prisma.size.findMany({
      orderBy:{
        updatedAt:"desc"
      }
      
    })
   
  
    return JSON.parse(JSON.stringify(sizes))

  }

interface pageProps {
  searchParams:{
    page?:number
  }
}

export async function deleteSize(id:number){
  try{
    const res=await prisma.size.delete({
      where:{
        id:id
      }
    })
    return res
  }catch(error){
    return error
  }

}

export async function addSize(data:AddSizeForm) {
  "use server"
  try {
    const category=prisma.size.create({
      data:{
        ...data
      }
      
    })
    return category
  } catch (error) {
    return new Error("error")
  }
}
  

const page:FC<pageProps>=async ({searchParams})=>{
  
  const {page}=searchParams
  const colours= await getSizes()




 return(
    <main
      className='md:container'
    >
      <AddSizeModal addSize={addSize}/>
      <div>
        <DataTable columns={columns} data={colours} />
      </div>
    </main>
)}

export default page