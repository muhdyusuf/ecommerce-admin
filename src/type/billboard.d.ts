import { billboardSchema } from "@/lib/validation/billboard"
import { z } from "zod"

type Billboard=z.infer<typeof billboardSchema>&{
    id:number,
    createdAt:Date,
    updatedAt:Date,
}