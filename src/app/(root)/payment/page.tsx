import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import prisma from '../../../../prisma/client'

interface pageProps {
 
}

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  



  

const page:FC<pageProps>=async ({})=>{
  let orders= await prisma.order.findMany({
    orderBy:{
      updatedAt:"desc"
    }
  })
 

 return(
    <main
      className='md:container'
    >
      <div>
        <DataTable columns={columns} data={orders} />
      </div>
    </main>
)}

export default page