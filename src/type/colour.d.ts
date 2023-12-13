import { colourSchema } from "@/lib/validation/colour";
import { productSchema } from "@/lib/validation/product";
import { z } from "zod";

type Colour = z.infer<typeof colourSchema>&{
    createdAt:Date
    updatedAt:Date
    id:number
}