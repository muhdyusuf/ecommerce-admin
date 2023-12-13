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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
import { Category, Colour, Size } from '@prisma/client'
interface addProductProps {
 categories:Category[],
 sizes:Size[],
 colours:Colour[]

}

type AddProductForm=z.infer<typeof productSchema>

const AddProductModal:FC<addProductProps>=({categories,colours,sizes})=>{

  const [loading, setLoading] = useState(false)
  const [imageUrls, setimageUrls] = useState<string[]>([""])
  const [open,setOpen]=useState<boolean>(false)

    const form=useForm<AddProductForm>({
      resolver:zodResolver(productSchema),
      defaultValues:{
        name:"",
        category:"",
        colour:"",
        size:"",
        price:0,
        stock:0,
        imageUrls:[""]
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
          body:JSON.stringify({product:{
            ...values,
            imageUrls:filteredImageUrls
          }})
        })
        if(product.status===200){
          setLoading(false)
        }
      } catch (error) {
        
      }
      finally{
        setLoading(false)
        form.reset()
        setOpen(false)
      }
     
  } 


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
  console.log(form.formState.errors)
  


 return(
   <Dialog
    open={open}
    onOpenChange={()=>setOpen(!open)}
   >
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
                width={500}
                height={500}
                />
            </div>

            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload1"}
                onImageUploaded={(url)=>handleImageChange(url,1)}
                width={500}
                height={500}
                />
            </div>
            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload2"}
                onImageUploaded={(url)=>handleImageChange(url,2)}
                width={500}
                height={500}
              />
            </div>
            <div
              className='min-w-[150px]'
              >
              <ImageUploadInput
                key={"imageUpload3"}
                onImageUploaded={(url)=>handleImageChange(url,3)}
                width={500}
                height={500}
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
                <FormLabel>Category</FormLabel>
                <Select
                   onValueChange={field.onChange}
                >
                <SelectTrigger 
                  className="w-full">
                  <SelectValue 
                    placeholder="Select colour"
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category=>(
                    <SelectItem
                      key={category.id+category.name}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
         
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colour</FormLabel>
             
                <Select
                   onValueChange={field.onChange}
                 >
                <SelectTrigger 
                  className="w-full">
                  <SelectValue 
                    placeholder="Select colour"
                  />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(size=>(
                    <SelectItem
                      key={size.name}
                      value={size.id.toString()}
                    >
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
              
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colour</FormLabel>
             
                <Select
                   onValueChange={field.onChange}
               
                >
                <SelectTrigger 
                  className="w-full">
                  <SelectValue 
                    placeholder="Select colour"
                  />
                </SelectTrigger>
                <SelectContent>
                  {colours.map(colour=>(
                    <SelectItem
                      key={colour.id+colour.name}
                      value={colour.id.toString()}
                    >
                      {colour.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
            
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