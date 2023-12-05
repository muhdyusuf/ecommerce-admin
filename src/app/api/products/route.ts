import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { productSchema } from '@/lib/validation/product'

interface Data {}

export async function POST(req: NextRequest, res: NextResponse<Data>) {
    const {product}=await req.json()
    console.log(product,"api/products")
    console.log(productSchema.safeParse(product))
    if(!productSchema.safeParse(product).success)return NextResponse.json({
    },{status:404})
   try {
    const _product=await prisma.product.create({
        data:{
            ...product,
            rating:{
                create:{
                    rate:5,
                    count:0
                }
            }
            
        },
        include:{
            rating:true
        }
        
    })
    console.log(_product)
    return NextResponse.json({
        data:_product
    },{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({
        error:{
            message:"server error"
        }
    },{status:500})
   }
  
}