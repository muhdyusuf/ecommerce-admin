'use server'

import { AddSizeForm } from "@/components/AddSizeModal"
import prisma from "../../prisma/client"

export async function deleteSize(id:number){
    try{
      const res=await prisma.size.delete({
        where:{
          id:id
        }
      })
      return res
    }catch(error){
      return error
    }
  
  }
  
  export async function addSize(data:AddSizeForm) {
    "use server"
    try {
      const category=prisma.size.create({
        data:{
          ...data
        }
        
      })
      return category
    } catch (error) {
      return new Error("error")
    }
  }