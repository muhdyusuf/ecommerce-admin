import {FC, useState} from 'react'
import { Input } from './ui/input'
import Image from 'next/image'

interface ImageUploadInputProps {
  state:string[],
  setState:()=>void
}

const ImageUploadInput: FC<ImageUploadInputProps>=({
    state,setState
})=>{
    const [image, setImage] = useState<File>()
    const [imageUrl, setImageUrl] = useState<string|undefined>(undefined)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const selectedFiles = event.target.files as FileList;
            setImage(selectedFiles?.[0]);
            setImageUrl(URL.createObjectURL(selectedFiles?.[0]));
    }
 return (
   <div>
    
    {imageUrl&&(
        <Image
            src={imageUrl}
            width={300}
            height={300}
            alt='adsaddas'
        
        />
    )}
    <Input
        type='file'
        accept="image/png, image/jpeg"
        onChange={handleChange}

    />
    
   </div>
)}

export default ImageUploadInput