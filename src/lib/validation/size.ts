import {z} from 'zod'

export const sizeSchema=z.object({
    name:z.string().min(1).max(50),
    
})

