import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const product=await prisma.product.create({
        data:{
            name:"hello",
            price:313,
            description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, totam.",
            imageUrls:["dasdasda"],
            category:"hello",
            stock:1,
            rating:{
                create:{
                    rate:5.0,
                    count:1

                }
            }
        }
    })

   
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