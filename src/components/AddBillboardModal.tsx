'use client'
import {FC, useEffect, useState} from 'react'
import prisma from '../../prisma/client'

//ui
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog"
 import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from './ui/button'

import { useForm } from "react-hook-form"

import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { register } from 'module'
import { Loader2 } from 'lucide-react'
import ImageUploadInput from './ImageUploadInput'
import { billboardSchema } from '@/lib/validation/billboard'

import { getPathFromUrl } from '@/lib/utils'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface addProductProps {
    addBillboard:(data:AddBillboardForm)=>any
}

export type AddBillboardForm=z.infer<typeof billboardSchema>

const AddBillboardModal:FC<addProductProps>=({
    addBillboard
})=>{

  const supabase=createClient()
  const [loading, setLoading] = useState(false)
  const [imageUrl,setImageUrl]=useState<string>("")
  const [open,setOpen]=useState<boolean>(false)

    const form=useForm<AddBillboardForm>({
      resolver:zodResolver(billboardSchema),
      defaultValues:{
        label:"",
        imageUrl:""
      }
    })

    const router=useRouter()
  async function onSubmit(values:AddBillboardForm){
    
        if(imageUrl===""){
            form.setError("imageUrl",{message:"Image Required"})    
            return
        }

      try {
        const billboard=await addBillboard({
            label:values.label,
            imageUrl
        })

        if(billboard){
            console.log(billboard)
          setLoading(false)
        }
      } catch (error) {
        
      }
      finally{
        setLoading(false)
        form.reset()
        setOpen(false)
        router.refresh()
      }
  } 


  async function handleRemoveImage() {
    if(!imageUrl)return
    const url=getPathFromUrl(imageUrl)
    try {
        const {data,error} = await supabase.storage.from("/ecommerce-v2").remove([url])
    } catch (error) {
    }
   
  }

  function handleOpen(){
    if(open){
        handleRemoveImage()
        setOpen(false)
    }
    else{
        setOpen(true)
    }
  }

  
  




 return(
   <Dialog
    open={open}
    onOpenChange={handleOpen}
   >
   <DialogTrigger
    asChild
   >
    <Button
      type='button'
   

    >
      Add Billboard
    </Button>
   </DialogTrigger>
   <DialogContent>
     <DialogHeader>
       <DialogTitle>
        Create New Billboard
       </DialogTitle>
       <DialogClose
        onClick={handleRemoveImage}
       />
    
     </DialogHeader>
     <form
      className='w-full flex flex-col overflow-hidden'
     >
     
        <div
        className='w-full'
        >
        <ImageUploadInput
            key={"imageUpload0"}
            onImageUploaded={url=>setImageUrl(url)}
            width={2000}
            height={2000}
            className='w-full h-auto aspect-video overflow-hidden'
            />
        </div>

        <p>
          {form.formState.errors.imageUrl?.message}
        </p>
       </form>
       <Form
        {...form}
        >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          >
    
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type billboard label" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        

    
       
        <DialogFooter
            className='flex gap-2 mt-4'
        >
            <DialogClose
                asChild
            >
                <Button
                    type='button'
                    variant={"secondary"}
                >
                    Close 
                </Button>
            </DialogClose>
            <Button
            type='submit'
            disabled={loading}
            
            >
            {loading?(
                <Loader2 
                className='stroke-muted-foreground animate-spin'
                />
                ):(
                    "add product"
                    )}
            </Button>
        </DialogFooter>
        
        </form>
       </Form>
       
   </DialogContent>
 </Dialog>
)}

export default AddBillboardModal