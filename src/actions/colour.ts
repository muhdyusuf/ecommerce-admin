'use server'

import { AddColourForm } from "@/components/AddColourModal"
import prisma from "../../prisma/client"

export async function deleteColour(id:number){
    try{
      const res=await prisma.colour.delete({
        where:{
          id:id
        }
      })
      return res
    }catch(error){
      return error
    }
  
  }
  
  export async function addColour(data:AddColourForm) {
    "use server"
    try {
      const colour=await prisma.colour.create({
        data:{
          ...data
        }
        
      })
      return colour
    } catch (error) {
      return new Error("error")
    }
  }
    