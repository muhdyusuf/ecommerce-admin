import {FC} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'

import { Product } from '@/type/product'
import prisma from '../../../../prisma/client'
import { Button } from '@/components/ui/button'
import AddProductModal from '@/components/AddProductModal'



type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

  
  
  export const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product A',
      price: 19.99,
      stock: 50,
      description: 'Description for Product A',
      category: 'Electronics',
      imageUrls: ['https://example.com/productA.jpg'],
      rating:{
        rate:5,
        count:1
      }
    },
    {
      id: 2,
      name: 'Product B',
      price: 29.99,
      stock: 30,
      description: 'Description for Product B',
      category: 'Clothing',
      imageUrls: ['https://example.com/productB.jpg'],
      rating:{
        rate:5,
        count:1
      }
    },
    {
      id: 3,
      name: 'Product C',
      price: 39.99,
      stock: 20,
      description: 'Description for Product C',
      category: 'Home & Kitchen',
      imageUrls: ['https://example.com/productC.jpg'],
      rating:{
        rate:5,
        count:1
      }
    },
    // ...
  ]

  async function getProducts(page:number|undefined=0): Promise<Product[]> {
    const products=await prisma.product.findMany({
      where:{
        rating:{isNot:null},    
      },
      select:{
        id:true,
        name:true,
        price:true,
        description:true,
        stock:true,
        updatedAt:true,
        imageUrls:true,
        rating:{
           select:{
            rate:true,
            count:true
            
           }
        }     
      },
      take:10,
      skip:page
    })
   
  
    return JSON.parse(JSON.stringify(products))

  }

interface pageProps {
  searchParams:{
    page?:number
  }
}
  

const page:FC<pageProps>=async ({searchParams})=>{
  
  const {page}=searchParams
  const allProductLength=await prisma.product.count()
  const products= await getProducts(page)




 return(
    <main
      className='md:container'
    >
      <AddProductModal/>
      <div>
        <DataTable columns={columns} data={products} pageCount={Math.ceil(allProductLength/10)} />
      </div>
    </main>
)}

export default page