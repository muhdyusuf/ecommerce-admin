import ImageUploadInput from '@/components/ImageUploadInput'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { productSchema } from '@/lib/validation/product'
import { Product } from '@/type/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import {FC} from 'react'
import { useForm } from 'react-hook-form'

interface ProductFormProps{
   product:Product
 
}

const ProductForm:FC<ProductFormProps>=({product})=>{
   const form = useForm<Product>({
      resolver:zodResolver(productSchema),
      defaultValues:{...product}
   })
   async function onSubmit(data:Product) {
      console.log(data)
   }
   console.log(form.watch("imageUrls"))
 return(
   <Form
      {...form}
   >
      <form
         className='flex flex-col p-0 m-0'
         onSubmit={form.handleSubmit(onSubmit)}
      >
         <FormField
            control={form.control}
            name='name'
            render={({field})=>(
               <FormItem
                  className='flex justify-start items-center p-0 bg-red-600'
               >
                  <FormLabel
                     className={cn("m-0 p-0")}
                  >
                     asdasdas
                  </FormLabel>
                  <div
                     className={cn("m-0 p-0")}
                  >
                  <FormControl
                     className={cn("m-0 p-0")}
                  >
                     <Input
                        placeholder='stock'
                        {...field}
                        className={cn("mt-0 min-h-[100px]")}
                        />
                  </FormControl>
                  <FormMessage
                     className={cn("m-0")}
                  />
                  </div>
                
                  
               </FormItem>
            )}
         />
         <FormField
            control={form.control}
            name='name'
            render={({field})=>(
               <FormItem
                  className='flex justify-start items-center p-0 bg-red-600'
               >
                  <FormLabel
                     className={cn("m-0 p-0")}
                  >
                     asdasdas
                  </FormLabel>
                  <div
                     className={cn("m-0 p-0")}
                  >
                  <FormControl
                     className={cn("m-0 p-0")}
                  >
                     <Input
                        placeholder='stock'
                        {...field}
                        className={cn("mt-0 min-h-[100px]")}
                        />
                  </FormControl>
                  <FormMessage
                     className={cn("m-0")}
                  />
                  </div>
                
                  
               </FormItem>
            )}
         />
         <div
            className='w-[200px]'
         >
         <FormField
            control={form.control}
            name='imageUrls'
            render={({field})=>(
               <FormItem>
                  <FormLabel
                     className='mb-0'
                     >
                     Description
                  </FormLabel>
                  <ImageUploadInput
                     defaultUrl={product.imageUrls[1]}
                     onImageUploaded={(url:string)=>{
                        const imageUrls=[...product.imageUrls]
                        const currentUrl=product.imageUrls[1]
                        if(url===""){
                           field.onChange(imageUrls.filter(imageUrl=>currentUrl!==imageUrl))
                        }
                        else{
                           field.onChange(imageUrls.map(imageUrl=>{
                              if(imageUrl===currentUrl)return url
                           }))
                        }
                     }}
                     width={300}
                     height={300}
                     />
                  <FormMessage/>
               </FormItem>
            )}
         />
         </div>
         <div
            className='w-[200px]'
         >
         <FormField
            control={form.control}
            name='imageUrls'
            render={({field})=>(
               <FormItem>
                  <FormLabel
                     className='mb-0'
                     >
                     Description
                  </FormLabel>
                  <ImageUploadInput
                     defaultUrl={product.imageUrls[0]}
                     onImageUploaded={(url:string)=>{
                        const imageUrls=[...product.imageUrls]
                        const currentUrl=product.imageUrls[0]
                        if(url===""){
                           field.onChange(imageUrls.filter(imageUrl=>currentUrl!==imageUrl))
                        }
                        else{
                           field.onChange(imageUrls.map(imageUrl=>{
                              if(imageUrl===currentUrl)return url
                           }))
                        }
                     }}
                     width={300}
                     height={300}
                     />
                  <FormMessage/>
               </FormItem>
            )}
         />
         </div>
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
            name='price'
            render={({field})=>(
               <FormItem>
                  <FormLabel>
                     Price
                  </FormLabel>
                  <Input
                     {...field}
                  />
                  <FormMessage/>
               </FormItem>
            )}
         />
       
         <div
            className='flex gap-3 justify-end'
         >
            <Button
               type='reset'
               variant={"secondary"}
               >
               Reset
            </Button>

            <Button
               type='submit'
               >
               Submit
            </Button>
         </div>

            
      </form>
   </Form>
)}

export default ProductForm