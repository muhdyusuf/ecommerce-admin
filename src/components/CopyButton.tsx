'use client'
import {Children, FC, ReactNode} from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
 value:string
 children:ReactNode
 className:string
}

const CopyButton:FC<CopyButtonProps>=({value,children,className})=>{
 return(
   <Button
      variant={"ghost"}
      className={cn("w-min p-0",className)}
      onClick={()=>navigator.clipboard.writeText(value)}
   >
      {children}
   </Button>

)}

export default CopyButton