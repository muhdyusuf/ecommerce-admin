'use server'
import supabase from "@/lib/supabase"
import { getPathFromUrl } from "@/lib/utils"
import prisma from "../../prisma/client"

 
export async function addBillboard(form:{imageUrl:string,label:string}) {
    "use server"
    const temporaryPath=getPathFromUrl(form.imageUrl)
    const finalUrl="billboard_images/"+temporaryPath.split("/")[1]
  
    try {
      const {data,error}=await supabase
        .storage
        .from("ecommerce-v2")
        .move(temporaryPath,finalUrl)
  
  
      const billboard=await prisma.billboard.create({
        data:{
          label:form.label,
          imageUrl:`${process.env.NEXT_SUPABASE_STORAGE_BASE_URL!}/${finalUrl}`
        }
      })
      if(billboard){
        return billboard
      }
    } catch (error) {
     
    }
    
  }
  
  export async function deleteBillboard(id:number){
    "use server"
    
    try {
      const deletedBillboard=await prisma.billboard.delete({
        where:{
          id:id
        }
      })
      if(deletedBillboard){
        return deleteBillboard
      }
    } catch (error) {
      return {
        error:"error deleting billboard"
      }
    }
  }
  