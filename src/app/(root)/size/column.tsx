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
import DeleteAlertDialog from "@/components/DeleteAlertDialog"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Colour } from "@/type/colour"
import DeleteAlertDialogAction from "@/components/DeleteAlertDialogAction"
import { deleteSize } from "./page"
import { Size } from "@prisma/client"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Size>[] = [
 
  {
    accessorKey: "name",
    header: ()=><div>Name</div>,
    cell:({row})=>{
      const size = row.original
      return(
        <div>
          {size.name}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ()=><div>Description</div>,
    cell:({row})=>{
      const size = row.original
      return(
        <div>
          {size.description}
        </div>
      )
    },
  },

  {
    accessorKey: "createdAt",
    header: ()=><div>Created At</div>,
    cell:({row})=>{
      const size = row.original
      return(
        <div>
          {new Date(size.createdAt).toDateString()}
        </div>
      )
    },
  },
 
  {
    id: "actions",
    cell: ({ row }) => {
      const size = row.original
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

            <AlertDialogTrigger asChild>
               <DropdownMenuItem>
                  Delete SIze
              </DropdownMenuItem>
            </AlertDialogTrigger>

          

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(size.id.toString())}
            >
              Copy Size Id
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteAlertDialogAction 
            data={{id:size.id,name:size.name}} 
            close={()=>setOpen(false)}
            action={deleteSize}

          />
        </DropdownMenu>
       
      </AlertDialog>
      )
    },
  },
]
