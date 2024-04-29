'use client'
import { createClient } from '@/utils/supabase/client'
import { File } from 'buffer'
import {ChangeEvent, FC, useState} from 'react'

interface pageProps {
 
}

const page:FC<pageProps>=({})=>{
    const supabase=createClient()
    const [imageUrl, setImageUrl] = useState<string|undefined>(undefined)
    async function handleChange(event:ChangeEvent<HTMLInputElement>){
        const files=event.target.files as FileList
        try {
            
            const { data, error } = await supabase
            .storage
            .from('qq')
            .upload(`unconfirmed_images/${files[0].name.replace(/\s/g,"_")}`,files[0], {
                cacheControl: '3600',
                upsert: true
            })
            if(error)throw new Error(error.message)
        } catch (error) {
            console.log(error)   
        }
        }
 return(
    <div
    >
       <input type="file" name="asdas" id="asdasd" onChange={handleChange}/>
    </div>
)}

export default page