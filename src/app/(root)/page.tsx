import { Metadata } from "next"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Overview from "@/components/Overview"
import RecentSales from "@/components/RecentSales"
import DashboardDeltaCard from "@/components/DashboardDeltaCard"
import prisma from "../../../prisma/client"
import { date } from "zod"


async function getSalesCountByMonth(month:number,year:number=new Date().getFullYear()){
  const startDate = new Date(year,month-1,1)
  const endDate = new Date(year,month,0)
  try {
    const lastMonthSalesCount=await prisma.order.count({
      where:{
        status:"paid",
        createdAt:{
          gte:startDate,
          lte:endDate,

        }
      },
      
    })
    return lastMonthSalesCount
  } catch (error) {
    return 0
  }
}




async function getSalesSumByMonth(month:number,year:number=new Date().getFullYear()){
  'use server'
  const startDate = new Date(year,month-1,1)
  const endDate = new Date(year,month,0)
  try {
    const value=await prisma.order.aggregate({
      where:{
        createdAt:{
          gte:startDate,
          lte:endDate,
        }
      },
      _sum:{
        total:true
      }

    })
 
    return value._sum.total||0
   
  } catch (error) {
    return 0
  }
}



async function getUserCountByMonth(month:number,year:number=new Date().getFullYear()){
  const startDate = new Date(year,month-1,1)
  const endDate = new Date(year,month,0)

  try {
    const currentMonthSalesCount=await prisma.user.count({
      where:{
        createdAt:{
          gte:startDate,
          lte:endDate,
        }
      },

    })
   
    return currentMonthSalesCount
   
  } catch (error) {
    return 0
  }
}

const currentDate=new Date()
const currentMonth=currentDate.getMonth()+1
const lastMonth=currentDate.getMonth()

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]




export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default async function Home() {
  const overviewData=await Promise.all(months.map(async(month,index)=>{
    if(index+1<=currentMonth){
      const totalSales=await getSalesSumByMonth(index+1)
      return {
        name:month,
        total:totalSales
      }
    }
    else return{
      name:month,
      total:0
    }
  }))
  return (
    <main className="md:container space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardDeltaCard
          getXValue={()=>getSalesCountByMonth(lastMonth)}
          getYValue={()=>getSalesCountByMonth(currentMonth)}
          title="Sales Count"
          icon={
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          }
        />
        <DashboardDeltaCard
          getXValue={()=>getSalesSumByMonth(lastMonth)}
          getYValue={()=>getSalesSumByMonth(currentMonth)}
          title="Sales Revenue RM"
          icon={
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          }
        />

        <DashboardDeltaCard
          getXValue={()=>getUserCountByMonth(lastMonth)}
          getYValue={()=>getUserCountByMonth(currentMonth)}
          title="New User"
          icon={
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          }
        />

        
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview 
              data={overviewData}
            />
          </CardContent>
        </Card>
        <RecentSales/>

        
      </div>
    </main>
         
    
  )

}