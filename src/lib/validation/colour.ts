import {z} from 'zod'

export const colourSchema=z.object({
    name:z.string().min(3).max(50),
    value:z.string()
    
})

