import { string, z } from "zod";

export const billboardSchema=z.object({
    label:z.string().min(5),
    imageUrl:z.string(),
})