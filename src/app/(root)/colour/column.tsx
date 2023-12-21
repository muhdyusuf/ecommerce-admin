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
import { deleteColour } from "./page"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Colour>[] = [
 
  {
    accessorKey: "name",
    header: ()=><div>Name</div>,
    cell:({row})=>{
      const colour = row.original
      return(
        <div>
          {colour.name}
        </div>
      )
    },
  },
  {
    accessorKey: "value",
    header: ()=><div>value</div>,
    cell:({row})=>{
      const colour = row.original
      return(
        <div
          className="flex gap-2 items-center"
        >
           <div
            style={{
              backgroundColor:colour.value
            }}
            className="h-8 w-auto aspect-square"
          />  
          <div>
            {colour.value}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: ()=><div>Last Updated</div>,
    cell:({row})=>{
      const colour = row.original
      return(
        <div>
          {new Date(colour.updatedAt).toDateString()}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const colour = row.original
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
                  Delete colour
              </DropdownMenuItem>
            </AlertDialogTrigger>

          

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(colour.value.toString())}
            >
              Copy colour code
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(colour.id.toString())}
            >
              Copy colour Id
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteAlertDialogAction 
            data={{id:colour.id,name:colour.name}} 
            close={()=>setOpen(false)}
            action={deleteColour}

          />
        </DropdownMenu>
       
      </AlertDialog>
      )
    },
  },
]
