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
import ImageUploadInput from './ImageUploadInput'
interface addProductProps {
 
}

type AddProductForm=z.infer<typeof productSchema>

const AddProductModal:FC<addProductProps>=({})=>{

  const [loading, setLoading] = useState(false)
  const [imageUrls, setimageUrls] = useState<string[]>([""])

    const form=useForm<AddProductForm>({
      resolver:zodResolver(productSchema),
      defaultValues:{
        name:"",
        category:"all",
        price:1,
        stock:1,
        description:"",
   
      }
    })


  async function onSubmit(values:AddProductForm){
    console.log(values)
    const filteredImageUrls=imageUrls.filter(url=>url&&url!=="")
    if(filteredImageUrls.length===0){
      form.setError("imageUrls",{
        message:"product must have atleast 1 image"
      })
      return
    }
    setLoading(true)
    

      try {
        const product=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`,{
          method:"POST",
          body:JSON.stringify({product:{...values,imageUrls:filteredImageUrls}})
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

  function handleImageChange(url:string,imageIndex:number){
    const _imageUrls=[...imageUrls]
    // console.log(url,imageIndex)
    // if(url===""&&imageUrls.length>1){
    //   _imageUrls.splice(imageIndex,1)
    //   setimageUrls(_imageUrls)
    //   return
    // }




    // if(_imageUrls.length<=3&&_imageUrls[imageIndex+1]!==""){
    //   _imageUrls[imageIndex]=url
    //   _imageUrls.push("")
    // }
    // else{
      _imageUrls[imageIndex]=url
    // }
    
    setimageUrls(_imageUrls)
  }
  console.log(form.watch("imageUrls"))


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
   <DialogContent
    className='relative'
   >
     <DialogHeader>
       <DialogTitle>Are you sure absolutely sure?</DialogTitle>
     </DialogHeader>
     <form
      className='w-full flex flex-col overflow-hidden'
     >
      <div
          className='w-full flex flex-nowrap gap-4 overflow-scroll'
          >
            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload0"}
                onImageUploaded={(url)=>handleImageChange(url,0)}
                />
            </div>

            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload1"}
                onImageUploaded={(url)=>handleImageChange(url,1)}
                />
            </div>
            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload2"}
                onImageUploaded={(url)=>handleImageChange(url,2)}
              />
            </div>
            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload3"}
                onImageUploaded={(url)=>handleImageChange(url,3)}
                />
            </div>
        </div>
        <p>
          {form.formState.errors.imageUrls?.message}
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
   </DialogContent>
 </Dialog>
)}

export default AddProductModal