import { productSchema } from "@/lib/validation/product";
import { z } from "zod";

type Product = z.infer<typeof productSchema>&{
    createdAt:Date
    updatedAt:Date
    id:Number
    rating:{
        rate:Number,
        count:Number
    }
}