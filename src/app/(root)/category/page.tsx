'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'
import AddCategoryModal, { AddCategoryForm } from '@/components/AddCategoryModal'
import { Category } from '@prisma/client'





async function getCategory(): Promise<Category[]> {
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
  "use server"
  console.log(id)
  try{
    const res=await prisma.category.delete({
      where:{
        id:id
      }
    })
    return res
  }catch(error){
    return {error:{
      message:error
    }}
  }

}

export async function addCategory(data:AddCategoryForm) {
  "use server"
  try {
    const category=await prisma.category.create({
      data:{
        ...data
      }
      
    })
    return category
  } catch (error) {
    return {error:{message:error}}
  }
}
  

const page:FC<pageProps>=async ({searchParams})=>{
  
  const {page}=searchParams
  const category= await getCategory()




 return(
    <main
      className='md:container'
    >
      <AddCategoryModal addCategory={addCategory}/>
      <div>
        <DataTable columns={columns} data={category} />
      </div>
    </main>
)}

export default page