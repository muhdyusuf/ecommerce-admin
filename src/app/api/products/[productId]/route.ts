import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { createUrlFromPath, getPathFromUrl } from "@/lib/utils";
import supabase from "@/lib/supabase";



export async function GET(req:NextRequest) {
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
    const {product}=await req.json()
    const productId=req.nextUrl.pathname.split("/").at(-1)
    console.log(productId)
    try {
        const promises=product.imageUrls.map((url:string)=>{
            if(url.search("unconfirmed_images")===-1)return url
            const oldPath=getPathFromUrl(url)
            const newPath=oldPath.replace("unconfirmed_images","product_images")
            return new Promise(async(resolve,reject)=>{
                const {data,error}=await supabase
                .storage
                .from("ecommerce-v2")
                .move(oldPath,newPath)

                if(error){
                    await supabase
                    .storage
                    .from('avatars')
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