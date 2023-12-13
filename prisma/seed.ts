import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const product=await prisma.product.create({
        data:{
            name:"hello",
            price:313,
            description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, totam.",
            imageUrls:["dasdasda"],
            
            stock:1,
            rating:{
                create:{
                    rate:5.0,
                    count:1

                }
            },
            colour:{
              crea
            }
        }
    }
  )
  // const orders=await prisma.order.createMany({
  //   data:[
  //     {
  //       total: 100,
  //       status: "pending",
  //       email: "m@example.com",
  //     },
  //     {
  //       total: 100,
  //       status: "pending",
  //       email: "m@example.com",
  //     },
  //     {
  //       total: 100,
  //       status: "pending",
  //       email: "m@example.com",
  //     },
  //     {
  //       total: 100,
  //       status: "pending",
  //       email: "m@example.com",
  //     },
  //     {
  //       total: 100,
  //       status: "success",
  //       email: "m@example.com",
  //     },
  //     {
  //       total: 100,
  //       status: "pending",
  //       email: "m@example.com",
  //     },
  //     {
  //       total: 100,
  //       status: "pending",
  //       email: "m@example.com",
  //     },
  //   ]
  // })

   
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })