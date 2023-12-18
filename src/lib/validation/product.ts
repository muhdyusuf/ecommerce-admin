import {z} from 'zod'

export const productSchema=z.object({
    name:z.string().min(5).max(50),
    description:z.string().min(20).max(200),
    stock:z.preprocess(val=>Number(val),z.number().positive()),
    price:z.preprocess(val=>Number(val),z.number().positive()),
    category:z.preprocess(val=>Number(val),z.number().positive()),
    imageUrls:z
        .array(z.string()).refine(arr=>arr.length>0,"Require 1 Image"),
    size:z.preprocess(val=>Number(val),z.number().positive()),
    colour:z.preprocess(val=>Number(val),z.number().positive()),
    
})

