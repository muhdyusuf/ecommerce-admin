import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import prisma from "../../prisma/client"
import { formatPrice, generateInitials } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface RecentSalesProps{
  className?:string
}


async function RecentSales({className}:RecentSalesProps) {
  const recentSales=await prisma.order.findMany({
    where:{
      status:"paid"
    },
    orderBy:{
      updatedAt:"desc"
    },
    take:5,
  })

  const currentDate=new Date()
  const startOfTheMonth=new Date(currentDate.setDate(1))


  const currentMonthSalesCount=await prisma.order.count({
    where:{
      status:"paid",
      createdAt:{
        gte:startOfTheMonth,
      }
    },

  })

    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            You made {currentMonthSalesCount} sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentSales.map(sale=>{
              return(
                <div 
                  key={sale.id}
                  className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{generateInitials(sale.name).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {formatPrice(sale.total)}
                  </div>
              </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  export default RecentSales