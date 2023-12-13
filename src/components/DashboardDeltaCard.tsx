'use server'
import {FC, ReactNode} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { title } from 'process'

interface DashboardDeltaCardProps {
 getXValue:()=>Promise<number|Error>,
 getYValue:()=>Promise<number|Error>,
 title:string,
 icon:ReactNode
}

const DashboardDeltaCard:FC<DashboardDeltaCardProps>=async({
    getXValue,
    getYValue,
    title,
    icon,
})=>{
    function calculatePercentageChange(x:number, y:number) {
        if (x === 0) {
          return 0; // Avoid division by zero
        }
        const percentageChange = ((y - x) / Math.abs(x)) * 100;
        return percentageChange;
    }
    let deltaPercentage:number=0
    let delta:number=0

    try {
        const yValue=await getYValue()
        const xValue=await getXValue()
        
        if(typeof xValue !=="number" || typeof yValue !=="number" )return

        console.log(yValue,xValue)
        deltaPercentage=calculatePercentageChange(xValue,yValue)
        let delta=yValue-xValue

    } catch (error) {
        
    }


 return(
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
        </svg>
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{delta}</div>
        <p className="text-xs text-muted-foreground">
            {deltaPercentage?(
                `Percentage Change: ${deltaPercentage.toFixed(2)}%`
                ):(
                "invalid data"
                )
            }
        </p>
        </CardContent>
    </Card>
                
)}

export default DashboardDeltaCard