'use client'
import {FC, useState} from 'react'
import prisma from '../../prisma/client'

//ui
import {
   Dialog,
   DialogContent,
   DialogDescription,
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
import { productSchema } from '@/lib/validation/product'

import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { register } from 'module'
import { Loader2 } from 'lucide-react'
interface addProductProps {
 
}

type AddProductForm=z.infer<typeof productSchema>

const AddProductModal:FC<addProductProps>=({})=>{

  const [loading, setLoading] = useState(false)

    const form=useForm<AddProductForm>({
      resolver:zodResolver(productSchema),
      defaultValues:{
        name:"",
        category:"all",
        price:1,
        stock:1,
        description:""
      }
    })


  async function onSubmit(values:AddProductForm){
    console.log("submit")
    setLoading(true)

      try {
        const product=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`,{
          method:"POST",
          body:JSON.stringify({product:values})
        })
        if(product.status===200){
          setLoading(false)
        }
      } catch (error) {
        
      }
      finally{
        setLoading(false)
      }
     
      form.reset()
  } 

  console.log(form.formState.errors)



 return(
   <Dialog>
   <DialogTrigger
    asChild
   >
    <Button
      type='button'

    >
      Add Product
    </Button>
   </DialogTrigger>
   <DialogContent>
     <DialogHeader>
       <DialogTitle>Are you sure absolutely sure?</DialogTitle>
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
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl
                  
                >
                  <Input 
                    type='number'
                    placeholder="Price" 
                    {...field}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input 
                    type='number'
                    placeholder="Price" 
                    {...field}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        

     


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
        </form>
       </Form>
       
     </DialogHeader>
   </DialogContent>
 </Dialog>
)}

export default AddProductModal