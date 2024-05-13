'use server'
import { getPathFromUrl } from "@/lib/utils"
import prisma from "../../prisma/client"
import { createClient } from "@/utils/supabase/client"

 
export async function addBillboard(form:{imageUrl:string,label:string}) {
    "use server"
    const temporaryPath=getPathFromUrl(form.imageUrl)
    const finalUrl=temporaryPath.replace("unconfirmed_images","images")
    const supabase=createClient()

    try {
      const {data,error}=await supabase
        .storage
        .from("images")
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
  