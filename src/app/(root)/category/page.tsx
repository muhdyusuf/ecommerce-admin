'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'
import AddCategoryModal, { AddCategoryForm } from '@/components/AddCategoryModal'
import { Category } from '@prisma/client'
import { addCategory } from '@/actions/category'





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


  

const Page:FC<pageProps>=async ({searchParams})=>{
  
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

export default Page