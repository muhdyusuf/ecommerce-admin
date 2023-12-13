
import { sizeSchema } from "@/lib/validation/size";
import { z } from "zod";

type Size = z.infer<typeof sizeSchemaSchema>&{
    createdAt:Date
    updatedAt:Date
    id:number
}