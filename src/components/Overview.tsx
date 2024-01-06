'use client'

import { formatPrice } from "@/lib/utils"
import { FC } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"




interface OverviewProps {
  data:{name:string,total:number}[]
}

const Overview:FC<OverviewProps>=({
  data
})=>{
  
 return(
  <ResponsiveContainer width="100%" height={350}>
  <BarChart data={data}>
    <XAxis
      dataKey="name"
      stroke="#888888"
      fontSize={12}
      tickLine={false}
      axisLine={false}
    />
    <YAxis
      stroke="#888888"
      fontSize={12}
      tickLine={false}
      axisLine={false}
      className="text-start"
      tickFormatter={(value:number) =>`RM ${value}`}
    />
    <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary" />
  </BarChart>
</ResponsiveContainer>
)}

export default Overview

