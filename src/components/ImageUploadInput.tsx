import {FC, useEffect, useRef, useState} from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import supabase from '@/lib/supabase'
import { type } from 'os'
import { Ghost, Loader2, PlusCircle, X } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { cn, getPathFromUrl } from '@/lib/utils'

interface ImageUploadInputProps {
  onImageUploaded:(url:string)=>void,
  onLoading?:(isLoading:boolean)=>void,
  defaultUrl?:string,
  width:number,
  height:number,
  className?:string
}

const ImageUploadInput: FC<ImageUploadInputProps>=({
    onImageUploaded,
    defaultUrl,
    width,
    height,
    className,
    onLoading=()=>{}
})=>{
   
    const [imageUrl, setImageUrl] = useState<string|undefined>(defaultUrl||undefined)
    const [loading, setLoading] = useState(false)
 
 


    async function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const selectedFiles = event.target.files as FileList;
            const file=selectedFiles[0]
            if(!file)return
            
            try {
                setLoading(true)
                onLoading(true)
                if(imageUrl&&defaultUrl!==imageUrl){
                    const path=getPathFromUrl(imageUrl)
                    await supabase
                    .storage
                    .from('ecommerce-v2')
                    .remove([path])
                    setImageUrl(undefined)
                }
                const { data, error } = await supabase
                .storage
                .from('ecommerce-v2')
                .upload(`unconfirmed_images/${file.name.replace(/\s/g,"_")}`,file, {
                    cacheControl: '3600',
                    upsert: true
                })
               
                if(error) throw error   
               
                setImageUrl(`https://wawzxvxxzvalaeswnzuy.supabase.co/storage/v1/object/public/ecommerce-v2/${data?.path}`)
                
                onImageUploaded(`https://wawzxvxxzvalaeswnzuy.supabase.co/storage/v1/object/public/ecommerce-v2/${data?.path}`)
                onLoading(false)
            } catch (error) {
            
            } finally{
                setLoading(false)
            }
        
    }

    async function handleRemoveImage() {        
        if(defaultUrl&&defaultUrl===imageUrl){
            setImageUrl(undefined)
            onImageUploaded("")
        }
        if(!imageUrl)return
        try {
            setLoading(true)
            onLoading(true)
            const path=getPathFromUrl(imageUrl)
            const { data, error } = await supabase
            .storage
            .from('ecommerce-v2')
            .remove([path])
            setImageUrl(undefined)

        } catch (error) {
            
        }
        finally{
            onImageUploaded("")
            setLoading(false)
            onLoading(false)
        }
        
    }

    

 
 return (
   <Card
    className={cn('w-full flex relative rounded-md overflow-hidden aspect-square',className)}
   >    
        {loading?(
        <CardContent
            className='w-full h-full p-0 flex items-center justify-center relative'
        >
            <Loader2
                className='w-1/4 h-auto aspect-square animate-spin'
            />
        </CardContent>
        ):(
        <CardContent
            className='w-full h-full p-0 flex items-center justify-center relative'
        >
            {imageUrl?(
                <>
                <Image
                src={imageUrl}
                width={width}
                height={height}
                alt='adsaddas'
                className="object-cover w-full h-full" 
                
                />
                <Button
                    type='button'
                    variant={"ghost"}
                    className='absolute top-1 right-1 p-0 m-0 h-min z-50'
                    onClick={handleRemoveImage}
                >
                    <X  />
                </Button>


                </>
            ):(
                <PlusCircle
                    strokeWidth={2}
                    className='stroke-muted-foreground w-1/4 h-auto aspect-square p-0'
                />
            )}

            <Input
            type='file'
            accept="image/png, image/jpeg"
            onChange={handleChange}
            disabled={loading}
            className='opacity-0 absolute top-0 bottom-0 m-auto '
            />  
            
        </CardContent>
        )}
   </Card>
)}

export default ImageUploadInput