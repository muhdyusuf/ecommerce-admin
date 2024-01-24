'use server'

import { AddCategoryForm } from "@/components/AddCategoryModal"
import prisma from "../../prisma/client"

export async function deleteCategory(id:number){
    "use server"
    try{
      const res=await prisma.category.delete({
        where:{
          id:id
        }
      })
      return res
    }catch(error){
      return {error:{
        message:"error deleteting category"
      }}
    }
  
  }
  
  export async function addCategory(data:AddCategoryForm) {
    "use server"
    try {
      const category=await prisma.category.create({
        data:{
          ...data
        }
        
      })
      return category
    } catch (error) {
      return {error:{message:error}}
    }
  }