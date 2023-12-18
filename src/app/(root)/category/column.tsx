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

import { ArrowUpDown,MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Colour } from "@/type/category"
import DeleteAlertDialogAction from "@/components/DeleteAlertDialogAction"
import { deleteCategory } from "./page"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Colour>[] = [
 
  {
    accessorKey: "name",
    header: ()=><div>Name</div>,
    cell:({row})=>{
      const category = row.original
      return(
        <div>
          {category.name}
        </div>
      )
    },
  },

  {
    accessorKey: "createdAt",
    header: ()=><div>Created At</div>,
    cell:({row})=>{
      const category = row.original
      return(
        <div>
          {new Date(category.createdAt).toDateString()}
        </div>
      )
    },
  },
 
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
      const [open, setOpen] = useState(false)
    
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
                href={`${process.env.NEXT_PUBLIC_APP_URL}/products/${category.id}`}
                >
                {process.env.NEXT_PUBLIC_APP_URL}
              </Link>
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
               <DropdownMenuItem>
                  Delete category
              </DropdownMenuItem>
            </AlertDialogTrigger>

          

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category.id.toString())}
            >
              Copy Product Id
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteAlertDialogAction 
            data={{id:category.id,name:category.name}} 
            close={()=>setOpen(false)}
            action={()=>deleteCategory(category.id)}

          />
        </DropdownMenu>
       
      </AlertDialog>
      )
    },
  },
]
