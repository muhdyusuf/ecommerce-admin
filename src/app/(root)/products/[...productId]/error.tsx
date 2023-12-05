'use client'
import {FC} from 'react'
import { string } from 'zod'



const error=({error,reset}:{error:Error,reset:()=>void})=>{
 return(
    <div>
       {error.message}
    </div>
)}

export default error