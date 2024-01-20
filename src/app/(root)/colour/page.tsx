'use server'
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'
import { Colour } from '@/type/colour'
import AddColourModal, { AddColourForm } from '@/components/AddColourModal'
import { addColour } from '@/actions/colour'





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



const Page:FC<pageProps>=async ({searchParams})=>{
  

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

export default Page