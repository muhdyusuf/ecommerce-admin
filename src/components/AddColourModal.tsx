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
import { colourSchema } from '@/lib/validation/colour'
import { Colour } from '@/type/colour'
interface addColourProps {
    addColour:(data:AddColourForm)=>any
}

export type AddColourForm=z.infer<typeof colourSchema>

const AddColourModal:FC<addColourProps>=({
    addColour
})=>{

  const [loading, setLoading] = useState(false)
  const [imageUrl,setImageUrl]=useState<string>("")
  const [open,setOpen]=useState<boolean>(false)

    const form=useForm<AddColourForm>({
      resolver:zodResolver(colourSchema),
      defaultValues:{
        name:"",
        value:"",
      }
    })

    const router=useRouter()
  async function onSubmit(values:AddColourForm){
    
        try {
           const colour=await addColour(values) 
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
      Add Billboard
    </Button>
   </DialogTrigger>
   <DialogContent>
     <DialogHeader>
       <DialogTitle>Add Colour</DialogTitle>
       <DialogDescription>create new colour</DialogDescription>
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Colour Name" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem
                className='p-0'
              >
                <FormLabel>Select colour</FormLabel>
                <FormControl>
                  <Input 
                    type='color'
                    placeholder="Type your message here." 
                    {...field}
                    className='w-32 h-auto aspect-square'
                   />
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
            className='min-w-[100px]'
            
            >
            {loading?(
                <Loader2 
                className='stroke-muted-foreground animate-spin'
                />
                ):(
                    "add colour"
                )}
            </Button>
        </DialogFooter>
        
        </form>
       </Form>
       
   </DialogContent>
 </Dialog>
)}

export default AddColourModal