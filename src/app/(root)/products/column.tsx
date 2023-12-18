"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Product } from "@/type/product"

import { ArrowUpDown,MoreHorizontal } from "lucide-react"
import Link from "next/link"
import DeleteAlertDialog from "@/components/DeleteAlertDialog"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type ProductColumn={
  id:number,
  colour:{
    name:string,
    value:string,
  },
  category:string,
  size:string,
  updatedAt:Date,
  price:number,
  stock:number,
  name:string
  imageUrls:string[]
  
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "colour",
    header: "colour",
    cell:({row})=>(
      <div>
        {row.original.colour.value}
      </div>
    )
  },
  {
    accessorKey: "size",
    header: "size",
    cell:({row})=>(
      <div>
        {row.original.size}
      </div>
    )
  },
  {
    accessorKey: "category",
    header: "category",
    cell:({row})=>(
      <div>
        {row.original.category}
      </div>
    )
  },
 
  {
    accessorKey: "stock",
    header: ({column})=>{
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )

    },
  },
  {
    accessorKey: "updatedAt",
    header: ()=><div>Last Updated</div>,
    cell:({row})=>{
      const product = row.original
      return(
        <div>
          {new Date(product.updatedAt).toDateString()}
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "MYR",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      const [open, setOpen] = useState(false)
      const {toast}=useToast()
    
      return (
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
        >

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}`}
                >
                Edit product
              </Link>
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
               <DropdownMenuItem>
                  Delete product
              </DropdownMenuItem>
            </AlertDialogTrigger>

          

            <DropdownMenuItem
              onClick={()=>{ 
                toast({
                  title: `${product.id} copied to clipboard`,
                })
                navigator.clipboard.writeText(product.id.toString())
              }}
            >
              Copy Product Id
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteAlertDialog 
            product={{
              id:product.id,
              name:product.name,
              imageUrls:product.imageUrls
            }} 
            close={()=>setOpen(false)}
            />
        </DropdownMenu>
       
      </AlertDialog>
      )
    },
  },
]
