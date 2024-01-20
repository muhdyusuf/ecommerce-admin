'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'

import { Size } from '@/type/size'
import AddSizeModal from '@/components/AddSizeModal'
import { AddSizeForm } from '@/components/AddSizeModal'
import { addSize } from '@/actions/size'





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