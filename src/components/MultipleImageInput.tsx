import {FC, useEffect, useState} from 'react'
import ImageUploadInput from './ImageUploadInput'
import { cn } from '@/lib/utils'

interface MultipleImageInputProps {
 initialUrls?:string[],
 urls:string[]
 onChange:(urls:string[])=>void,
 onBlur:()=>void,
 onLoading?:(isLoading:boolean)=>void
 className?:string
}

const MultipleImageInput:FC<MultipleImageInputProps>=({
    initialUrls,
    urls,
    onChange,
    onBlur,
    className,
    onLoading=()=>{}
})=>{

    const [imageUrls, setImageUrls] = useState<string[]>(initialUrls||[""])
    const [loadings, setloadings] = useState<boolean[]>([])


    function handleImageChange(url:string,imageIndex:number){
        let _imageUrls=[...imageUrls]
        _imageUrls[imageIndex]=url
        _imageUrls=_imageUrls.filter(imageUrl=>imageUrl!=="")
        onChange(_imageUrls)
        onBlur()
        if(_imageUrls.length<4){
            _imageUrls.push("")
        }
        setImageUrls(_imageUrls)
    }
    useEffect(()=>{
        if(imageUrls.length<4){
            setImageUrls([...imageUrls,""])
        }
    },[])

    useEffect(()=>{
        if(loadings.includes(true)){
            onLoading(true)
        }
        else{
            onLoading(false)
        }
    },[loadings])
    
 

 return(
    <div
        className={cn("overflow-scroll md:no-scrollbar",className)}
    >
        {imageUrls.map((imageUrl,index)=>(
            <div
                className='w-[200px] min-w-[200px]'
                key={imageUrl+index}
            >
                <ImageUploadInput
                key={imageUrl+index}
                defaultUrl={imageUrl===""?undefined:imageUrl}
                width={300}
                height={300}
                onImageUploaded={(url)=>handleImageChange(url,index)}
                onLoading={(isLoading)=>{
                    const _loading=[...loadings]
                    _loading[index]=isLoading
                    setloadings(_loading)
                }}
                />
            </div>
        ))}
       
    </div>
)}

export default MultipleImageInput