import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import prisma from '../../../../prisma/client'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'



type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

  
  
  // export const mockProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product A',
  //     price: 19.99,
  //     stock: 50,
  //     description: 'Description for Product A',
  //     category: 'Electronics',
  //     imageUrls: ['https://example.com/productA.jpg'],
  //     rating:{
  //       rate:5,
  //       count:1
  //     }
  //   },
  //   {
  //     id: 2,
  //     name: 'Product B',
  //     price: 29.99,
  //     stock: 30,
  //     description: 'Description for Product B',
  //     category: 'Clothing',
  //     imageUrls: ['https://example.com/productB.jpg'],
  //     rating:{
  //       rate:5,
  //       count:1
  //     }
  //   },
  //   {
  //     id: 3,
  //     name: 'Product C',
  //     price: 39.99,
  //     stock: 20,
  //     description: 'Description for Product C',
  //     category: 'Home & Kitchen',
  //     imageUrls: ['https://example.com/productC.jpg'],
  //     rating:{
  //       rate:5,
  //       count:1
  //     }
  //   },
  //   // ...
  // ]

  

  

interface pageProps {
  searchParams:{
    page?:number
  }
}
  

const Page:FC<pageProps>=async ({searchParams})=>{
  
  
  const allProductLength=await prisma.product.count()
  const products=await prisma.product.findMany({
    orderBy:{
      updatedAt:"desc"
    },
    where:{
      rating:{isNot:null},    
    },
    include:{
      colour:true,
      size:true,
      category:true
    }

    
  })
  const categories=await prisma.category.findMany({})
  const sizes=await prisma.size.findMany()
  const colours=await prisma.colour.findMany()

  const formattedProducts=products.map(product=>{
    const {id,name,price,stock,category,size,colour,updatedAt,imageUrls}=product
    return {
      id,name,price,stock,updatedAt,
      colour:{
        name:colour.name,
        value:colour.value
      },
      category:category.name,
      size:size.name,
      imageUrls
      
    }
  })

  console.log(formattedProducts)
  




 return(
    <main
      className='md:container flex justify-end flex-col'
    >
      <div>
        <Link
          className={cn(buttonVariants(),"")}
          href={`${process.env.NEXT_PUBLIC_APP_URL}/products/new`}
        >
          Add Product
        </Link>

      </div>
      <div>
        <DataTable columns={columns} data={formattedProducts} pageCount={Math.ceil(allProductLength/10)} />
      </div>
    </main>
)}

export default Page