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

import { getPathFromUrl } from '@/lib/utils'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import supabase from '@/lib/supabase'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { sizeSchema } from '@/lib/validation/size'
interface addSizeProps {
    addSize:(data:AddSizeForm)=>any
}

export type AddSizeForm=z.infer<typeof sizeSchema>

const AddSizeModal:FC<addSizeProps>=({
    addSize
})=>{

  const [loading, setLoading] = useState(false)
  const [open,setOpen]=useState<boolean>(false)

    const form=useForm<AddSizeForm>({
      resolver:zodResolver(sizeSchema),
      defaultValues:{
        name:"",
      }
    })

    const router=useRouter()
  async function onSubmit(values:AddSizeForm){
    
        try {
           const colour=await addSize(values) 
           console.log(colour)
        } catch (error) {
         console.log(error)   
        }
      finally{
        setLoading(false)
        form.reset()
        setOpen(false)
        router.refresh()
      }
  } 


  
  function handleOpen(){
    if(open){
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
      Add Size
    </Button>
   </DialogTrigger>
   <DialogContent>
     <DialogHeader>
       <DialogTitle>Are you sure absolutely sure?</DialogTitle>
       <DialogClose/>
    
     </DialogHeader>
    
       <Form
        {...form}
        >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          >
    
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Type your message here." {...field}/>
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
                    "add size"
                    )}
            </Button>
        </DialogFooter>
        
        </form>
       </Form>
       
   </DialogContent>
 </Dialog>
)}

export default AddSizeModal