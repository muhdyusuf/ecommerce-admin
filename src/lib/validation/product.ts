import {z} from 'zod'

export const productSchema=z.object({
    id:z.number(),
    name:z.string(),
    description:z.string(),
    stock:z.number().positive(),
    price:z.number().positive(),
    category:z.string(),
    imageUrls:z.array(z.string()),
    rating:z.object({
        rate:z.number(),
        count:z.number()
    })

})