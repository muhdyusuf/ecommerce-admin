'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'
import { Colour } from '@/type/colour'
import AddCategoryModal, { AddCategoryForm } from '@/components/AddCategoryModal'





  async function getCategory(): Promise<Colour[]> {
    const products=await prisma.category.findMany({
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

export async function deleteCategory(id:number){
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

export async function addCategory(data:AddCategoryForm) {
  "use server"
  try {
    const category=prisma.category.create({
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
  const colours= await getCategory()




 return(
    <main
      className='md:container'
    >
      <AddCategoryModal addCategory={addCategory}/>
      <div>
        <DataTable columns={columns} data={colours} />
      </div>
    </main>
)}

export default page