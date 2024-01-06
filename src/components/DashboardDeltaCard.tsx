'use server'
import {FC, ReactNode} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { title } from 'process'

interface DashboardDeltaCardProps {
 getXValue:()=>Promise<number>,
 getYValue:()=>Promise<number>,
 title:string,
 icon:ReactNode
}

const DashboardDeltaCard:FC<DashboardDeltaCardProps>=async({
    getXValue,
    getYValue,
    title,
    icon,
})=>{
  
   
        const yValue=await getYValue()
        const xValue=await getXValue()

        
        if(typeof xValue !=="number" || typeof yValue !=="number" )return

      
      
        const delta=yValue-xValue
        const deltaPercentage=xValue?((yValue - xValue) / Math.abs(xValue)) * 100:(delta*100)

 
 return(
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{delta>0&&"+"}{delta}</div>
        <p className="text-xs text-muted-foreground">
            {deltaPercentage?(
                `${deltaPercentage>0?`+`:""} ${deltaPercentage.toFixed(1)}% from last month`
                ):(
                "invalid data"
                )
            }
        </p>
        </CardContent>
    </Card>
                
)}

export default DashboardDeltaCard

