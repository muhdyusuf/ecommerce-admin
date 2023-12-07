import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


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