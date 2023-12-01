import { productSchema } from "@/lib/validation/product";
import { z } from "zod";

type Product = z.infer<typeof productSchema>