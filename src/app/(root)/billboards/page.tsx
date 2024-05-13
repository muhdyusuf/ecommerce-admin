"use server"
import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import prisma from '../../../../prisma/client'
import AddBillboardModal from '@/components/AddBillboardModal'
import { addBillboard } from '@/actions/billboard'
import { randomUUID } from 'crypto'







interface pageProps {
  searchParams:{
    page?:number
  }
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
      <AddBillboardModal 
      addBillboard={addBillboard}/>
      <div>
        <DataTable columns={columns} data={billboards}/>
      </div>
    </main>
)}

export default Page