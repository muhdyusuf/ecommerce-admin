import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { createUrlFromPath, getPathFromUrl } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


export async function GET(req:NextRequest) {
    const cookieStore=cookies()
const supabase=createClient(cookieStore)

    const productId=req.nextUrl.pathname.split("/").at(-1)
    if(!productId||!Number(productId))return NextResponse.json({
        data:{
            error:{
                message:"invalid id"
            }
        }

    },{status:400})

    
    const product=await prisma.product.findUnique({
        where:{
            id:Number(productId)
        },
        include:{
            rating:{
                select:{
                    rate:true,
                    count:true
                }
            }
        }
    })
    return NextResponse.json({
        data:{product}
    },{status:200})
}

export async function PATCH(req:NextRequest) {
    const cookieStore=cookies()
const supabase=createClient(cookieStore)

    const {product}=await req.json()
    const productId=req.nextUrl.pathname.split("/").at(-1)
    try {
        const promises=product.imageUrls.map((url:string)=>{
            if(url.search("unconfirmed_images")===-1)return url
            const oldPath=getPathFromUrl(url)
            const newPath=oldPath.replace("unconfirmed_images","product_images")
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
        
        const _product=await prisma.product.update({
            where:{
                id:Number(productId)
            },
            data:{
                ...product,
                category:{
                    connect:{
                            id:product.category
                    }
                },
                colour:{
                    connect:{
                        id:product.colour
                    }
                },
                size:{
                    connect:{
                        id:product.size
                    }
                },
                imageUrls:_imageUrls,
            }
        })

        return NextResponse.json({
            data:_product
        },{status:200})

    } catch (error) {
        console.log(error)
    }
    
}
export async function DELETE(req: NextRequest, res: NextResponse) {
    const cookieStore=cookies()
const supabase=createClient(cookieStore)

    try {
    const id=req.nextUrl.pathname
    const product=await prisma.product.findUnique({
        where:{id:Number(id)}
    })
    if(!product)throw new Error("invalid id")
    
    const {error}=await supabase.storage.from("images").remove([
        ...product.imageUrls
    ])
    if(error)throw new Error("error deleting product iamge")
    
    const _product=await prisma.product.delete({
        where:{
            id:product.id
        }
    })

    if(_product){
        return NextResponse.json({
            data:_product
        },{status:200})

    }

   } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                error:error
            },{status:200})
        }
        else NextResponse.json({
            error:{
                message:"server error"
            }
        },{status:500})
   }
  
}