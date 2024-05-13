'use client'
import {ChangeEvent, FC, FormEvent, useState} from 'react'

//ui
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
 import { Checkbox } from "@/components/ui/checkbox"

 


import { productSchema } from '@/lib/validation/product'
import { zodResolver } from '@hookform/resolvers/zod'

import { Category, Colour, Product, Size} from '@prisma/client'

import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import MultipleImageInput from '@/components/MultipleImageInput'

import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type ProductForm=z.infer<typeof productSchema>

interface ProductFormProps{
   product?:ProductForm,
   categories:Category[],
   sizes:Size[],
   colours:Colour[],
   id?:number

 
}


const ProductForm:FC<ProductFormProps>=({product,categories,sizes,colours,id})=>{
   
    const action=product?"Update Product":"Add Product"
    const [loading, setLoading] = useState<boolean>(false)
    const {toast}=useToast()
    const router=useRouter()
   
    const form = useForm<ProductForm>({
      resolver:zodResolver(productSchema),
      defaultValues:product?{...product}:{
        name:"",
        stock:0,
        price:0,
        category:1,
        size:1,
        colour:1,
        description:"",
        imageUrls:[],
        isArchived:false,
        isFeatured:false,
      }
    })
    async function updateProduct(data:ProductForm) {
      if(!form.formState.isDirty){
        toast({
          description:"No changes on product"
        })
        return
      }

      setLoading(true)
        try {
          const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`,{
            method:"PATCH",
            body:JSON.stringify({
              product:{
                ...data,
                imageUrls:data.imageUrls.filter(url=>url!=="")
              }
            })
          })
          const {data:{product}}=await res.json()
          if(data){
            toast({
              title:"Product have been updated",
              duration:1000
            })

          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
        } finally{
          setLoading(false)
          router.refresh()
          
      
  
        }
      
      
   }
   async function addProduct(data:ProductForm) {
 
    const filteredImageUrls=form.getValues("imageUrls").filter(url=>url!=="")
    
    

    setLoading(true)
    

      try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`,{
          method:"POST",
          body:JSON.stringify({product:{
            ...data,
            imageUrls:filteredImageUrls
          }})
        })
        if(res.status===200){
          setLoading(false)
        }
        const {product}=await res.json()
        toast({
          title:`New Product Added`,
          description:`${product.name} have been added to the list`
        })
        
      } catch (error) {
        
      }
      finally{
        form.reset()
        setLoading(false)
      
       
      }
    
    
   }
   console.log(form.watch("imageUrls"))

   
 return(
  <>
   <h1
    className='text-xl md:text-3xl font-bold mb-4'
   >
    {action}
   </h1>
   <Form
      {...form}
      >
      <form
         className='max-w-full grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4'
         onSubmit={form.handleSubmit(product?updateProduct:addProduct)}
         //todoo add reset button
         
         >

         
         
         <FormField
            control={form.control}
            name='imageUrls'
            render={({field})=>(
              <FormItem
              className='col-span-full'
              >
                  <FormLabel
                     className='mb-0'
                     >
                     Add Images
                  </FormLabel>
                  <MultipleImageInput
                     initialUrls={field.value}
                     urls={field.value}
                     onChange={(url)=>field.onChange([...url])}
                     onBlur={field.onBlur}
                     onLoading={(isLoading)=>setLoading(isLoading)}
                     className='w-full flex gap-4'
                     />
                  <FormMessage/>
               </FormItem>
            )}
            />
        
        
        
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
              name='stock'
              render={({field})=>(
                <FormItem>
                    <FormLabel>
                      Stock
                    </FormLabel>
                    <FormControl>
                      <Input
                          placeholder='stock'
                          {...field}
                          />
                    </FormControl>
                    <FormMessage/>
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
                   defaultValue={field.value.toString()}
                   >
                <SelectTrigger 
                  className="w-full">
                  <SelectValue 
                    placeholder="Select Category"
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
                <FormLabel>Size</FormLabel>
             
                <Select
                   onValueChange={field.onChange}
                   defaultValue={field.value.toString()}
                   >
                <SelectTrigger 
                  className="w-full">
                  <SelectValue 
                    placeholder="Select Size"
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
                   defaultValue={field.value.toString()}
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
            name="description"
            render={({ field }) => (
              <FormItem
              className='col-span-2'
              >
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <div
            className='border p-2 flex items-center rounded-md'
            >
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field}) => (
              <FormItem
              className='flex m-0 gap-2  space-y-0'
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div
                  className='m-0 leading-none'
                  >
                  <FormLabel>
                    isFeatured
                  </FormLabel>
                  <FormDescription>
                    Product will appear in featured section
                  </FormDescription>
                </div>
     
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isArchived"
            render={({ field}) => (
              <FormItem
              className='flex m-0 gap-2  space-y-0'
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div
                  className='m-0 leading-none'
                  >
                  <FormLabel>
                    isArchived
                  </FormLabel>
                  <FormDescription>
                    Product will not appear anywhere in store
                  </FormDescription>
                </div>
     
              </FormItem>
            )}
            />
          </div>
        

     

      <div
         className='col-span-full flex justify-end gap-4'
         >
       {/* <Button
         variant={"secondary"}
         type='button'
         disabled={(!form.formState.isDirty||loading)?true:false}
         
         >
         Reset
        </Button> */}
        <Button
          type='submit'
          disabled={(!form.formState.isDirty||loading)?true:false}
          className='min-w-[150px]'
          >
          {loading&&(
            <Loader2 
            className='stroke-muted-foreground animate-spin'
            />
            )}
          {action}
        </Button>
      </div>    


            
      </form>
   </Form>
    </>
)}

export default ProductForm