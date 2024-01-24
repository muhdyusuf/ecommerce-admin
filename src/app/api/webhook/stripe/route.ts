
import { headers } from "next/headers"
import Stripe from "stripe"

import { NextResponse } from "next/server"
import prisma from "../../../../../prisma/client"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const address=session?.customer_details?.address
  const addressComponent=[
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]

  const addressString=addressComponent.filter(component=>component!==null).join(", ")
  try {
    
  if(event.type==="checkout.session.completed"){
      const order=await prisma.order.update({
        where:{
          id:Number(session?.metadata?.orderId)
        },
        data:{
          status:"paid",
          address:addressString,
          phone:session?.customer_details?.phone||"",
          email:session?.customer_details?.email||"",
          name:session?.customer_details?.name||""
      },
      include:{
        cartItem:true
      }
    })
    //update product in db
    Promise.all(order.cartItem.map(product=>{
      const {productId,quantity}=product
      return prisma.product.update({
        where:{
          id:productId,
        },
        data:{
          stock:{
            decrement:quantity
          }
        }
      })
    }))
  }
  else if(event.type==="checkout.session.expired"){

    const order=await prisma.order.findUnique({
      where:{
        id:Number(session?.metadata?.orderId)
      }
    })

    if(order?.email){{
      await prisma.order.update({
        where:{
          id:Number(session?.metadata?.orderId)
        },
        data:{
          status:"failed",
        }
      })
    }}
    else{
      await prisma.order.delete({
        where:{
          id:Number(session?.metadata?.orderId)
        }
      })
    }

    
  }
  
 

  } catch (error) {
    return NextResponse.json({message:error},{ status: 400 })
  }
  
  return new Response(null, { status: 200 })
}
