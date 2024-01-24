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
import DeleteAlertDialog from "./DeleteAlertDialog"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
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
    accessorKey: "image",
    header: "Image",
    cell:({row})=>(
      <div
        className="w-[100px] h-auto aspect-square overflow-hidden"
      >
        <Image
          src={row.original.imageUrls[0]}
          width={100}
          height={100}
          alt={`${row.original.name}images`}
          className="w-full h-full object-cover"
        />
      </div>
    )
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "colour",
    header: "Colour",
    cell:({row})=>(
      <div
        className="flex flex-col gap-1 "
      >
        <div
          className="flex flex-row gap-2"
        >
          <div
            style={{
              backgroundColor:`${row.original.colour.value}`
            }}
            className="w-4 h-auto aspect-square rounded-sm outline outline-[1px] outline-muted-foreground outline-offset-[2px]"
          />
          <p>
            {row.original.colour.value}
          </p>
        </div>

        <p>
          {row.original.colour.name}
        </p>

      </div>
     
    )
  },
  {
    accessorKey: "size",
    header: "Size",
    cell:({row})=>(
      <div>
        {row.original.size}
      </div>
    )
  },
  {
    accessorKey: "category",
    header: "Category",
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
          className="text-start p-1 h-min"
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
    cell: function Cell({ row }){
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
