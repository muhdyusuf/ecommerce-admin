'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import { Product } from '@/type/product'
import prisma from '../../../../prisma/client'
import { Button } from '@/components/ui/button'
import AddProductModal from '@/components/AddProductModal'
import { Colour } from '@/type/colour'
import AddColourModal, { AddColourForm } from '@/components/AddColourModal'





  async function getColours(): Promise<Colour[]> {
    const products=await prisma.colour.findMany({
      orderBy:{
        updatedAt:"desc"
      }
      
    })
   
  
    return JSON.parse(JSON.stringify(products))

  }

interface pageProps {
  searchParams:{
    page?:number
  }
}

export async function deleteColour(id:number){
  try{
    const res=await prisma.colour.delete({
      where:{
        id:id
      }
    })
    return res
  }catch(error){
    return error
  }

}

export async function addColour(data:AddColourForm) {
  "use server"
  try {
    const colour=prisma.colour.create({
      data:{
        ...data
      }
      
    })
    return colour
  } catch (error) {
    return new Error("error")
  }
}
  

const page:FC<pageProps>=async ({searchParams})=>{
  
  const {page}=searchParams
  const colours= await getColours()




 return(
    <main
      className='md:container'
    >
      <AddColourModal addColour={addColour}/>
      <div>
        <DataTable columns={columns} data={colours} />
      </div>
    </main>
)}

export default page