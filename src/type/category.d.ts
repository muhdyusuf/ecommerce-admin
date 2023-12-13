
import { categorySchema } from "@/lib/validation/category";
import { z } from "zod";

type Colour = z.infer<typeof categorySchema>&{
    createdAt:Date
    updatedAt:Date
    id:number
}