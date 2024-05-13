import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { productSchema } from '@/lib/validation/product'
import { ZodError } from 'zod'
import { createUrlFromPath, getPathFromUrl } from '@/lib/utils'
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache'



interface Data {}

export async function POST(req: NextRequest, res: NextResponse<Data>) {
    const {product}=await req.json()
    const cookieStore=cookies()
    const supabase=createClient(cookieStore)
   try {
    productSchema.parse(product)

    const promises=product.imageUrls.map((url:string)=>{
        if(url.search("unconfirmed_images")===-1)return url
        const oldPath=getPathFromUrl(url)
        const newPath=oldPath.replace("unconfirmed_images","images")
        return new Promise(async(resolve,reject)=>{
            const {data,error}=await supabase
            .storage
            .from("images")
            .move(oldPath,newPath)

            if(error){
                await supabase
                .storage
                .from('images')
                .remove([oldPath])
            }
            resolve(createUrlFromPath(newPath))
        })
        
    })
    const _imageUrls=await Promise.all(promises)
    const _product=await prisma.product.create({
        data:{
            ...product,
            colour:{
                connect:{
                    id:parseInt(product.colour)
                }
            },
            size:{
                connect:{
                    id:parseInt(product.size)
                }
            },
            category:{
                connect:{
                    id:parseInt(product.category)
                }
            },
            rating:{
                create:{
                    rate:5,
                    count:0
                }
            },
            imageUrls:_imageUrls
            
        },
        include:{
            rating:true
        }
        
    })
    revalidatePath("/products")
  
    return NextResponse.json({
        data:_product
    },{status:200})
   } catch (error) {
    let _error=error
    if (_error instanceof ZodError) {
        _error = _error.issues.map((e) => ({ path: e.path[0], message: e.message }));
    }
    return NextResponse.json({
        error:{
            message:_error
        }
    },{status:400})
   }
  
}


export async function PATCH(req: NextRequest, res: NextResponse<Data>) {
    const cookieStore=cookies()
const supabase=createClient(cookieStore)
    const {product}=await req.json()
    console.log(product)
    if(!productSchema.safeParse(product).success)return NextResponse.json({
    },{status:400})
   try {
    const _product=await prisma.product.update({
       where:{
        id:product.id
       },
       data:{
        ...product,
        updatedAt:new Date().toISOString(),
        rating:{
            update:{
                ...product.rating
            }
        }
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

