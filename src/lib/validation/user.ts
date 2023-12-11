import { z } from "zod";


export const userSignInSchema=z.object({
    email:z.string().email(),
    password:z.string().refine(password=>password!=="",{message:"Required"})
})