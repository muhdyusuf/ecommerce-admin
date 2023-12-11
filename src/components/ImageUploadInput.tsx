import {FC, useEffect, useRef, useState} from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import supabase from '@/lib/supabase'
import { type } from 'os'
import { Ghost, Loader2, X } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

interface ImageUploadInputProps {
  onImageUploaded:(url:string)=>void,
  defaultUrl?:string
}

const ImageUploadInput: FC<ImageUploadInputProps>=({
    onImageUploaded,
    defaultUrl
})=>{
   
    const [imageUrl, setImageUrl] = useState<string|undefined>(defaultUrl||undefined)
    const [loading, setLoading] = useState(false)
    let uploadedImagePath=useRef<undefined|string>()
 


    async function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const selectedFiles = event.target.files as FileList;
            const file=selectedFiles[0]
            if(!file)return
            console.log(file)
            try {
                setLoading(true)
                const { data, error } = await supabase
                .storage
                .from('ecommerce-v2')
                .upload(`unconfirmed_images/${file.name}`,file, {
                    cacheControl: '3600',
                    upsert: true
                })
               
                if(error) throw error   
                uploadedImagePath.current=data.path
                setImageUrl(`https://wawzxvxxzvalaeswnzuy.supabase.co/storage/v1/object/public/ecommerce-v2/${data?.path}`)
                
                onImageUploaded(`https://wawzxvxxzvalaeswnzuy.supabase.co/storage/v1/object/public/ecommerce-v2/${data?.path}`)

            } catch (error) {
            
            } finally{
                setLoading(false)
            }
        
    }

    async function handleRemoveImage() {
        console.log("remove")
        console.log(imageUrl,uploadedImagePath)
        if(!imageUrl||!uploadedImagePath.current)return

        try {
            const { data, error } = await supabase
            .storage
            .from('ecommerce-v2')
            .remove([uploadedImagePath.current])
            setImageUrl(undefined)
            uploadedImagePath.current=undefined
        } catch (error) {
            
        }
        finally{
            onImageUploaded("")
        }
    }

 
 return (
   <Card
    className='w-full aspect-square relative overflow-hidden'
   >
        <CardContent>
            {imageUrl&&(
                <>
                <Button
                    type='button'
                    variant={"ghost"}
                    className='absolute top-1 right-1 p-0 m-0 h-min z-50'
                    onClick={handleRemoveImage}
                >
                    <X  />
                </Button>

                <Image
                src={imageUrl}
                width={500}
                height={500}
                alt='adsaddas'
                className='w-[300px] aspect-square object-cover'
                
                />
                </>
                )}
            <div
                className='absolute top-0 right-0 w-full h-full grid place-content-center'
                >
                {loading?(
                    <Loader2
                    className='animate-spin'
                    />
                    ):(
                        <Input
                        type='file'
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                        disabled={loading}
                        />
                    )}
            </div>
        </CardContent>
   </Card>
)}

export default ImageUploadInput