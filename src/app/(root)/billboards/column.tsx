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
import {deleteBillboard } from "./page"
import Image from "next/image"
import DeleteAlertDialogAction from "@/components/DeleteAlertDialogAction"
import { Billboard } from "@prisma/client"


export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "Image",
    header: "Image",
    cell:({row})=>(
      <div
        className="w-[300px] h-auto aspect-video overflow-hidden"
      >
        <Image
          width={300}
          height={169}
          alt={"billboard"}
          src={row.original.imageUrl}
          className="w-full h-auto aspect-video object-cover"
        />
      </div>
    )
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => (
      <div>
        {row.original.label}
      </div>
    )
  },
  {
    accessorKey: "Date",
    header: ()=><div>Date</div>,
    cell:({row})=>{
      const billboard = row.original
      return(
        <div>
          {new Date(billboard.updatedAt).toDateString()}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }){
      const billboard = row.original
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
                  Delete billboard
              </DropdownMenuItem>
            </AlertDialogTrigger>

          

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(billboard.id.toString())}
            >
              Copy Billboard Id
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteAlertDialogAction
            data={{
              id:billboard.id,
              name:billboard.label
            }}
            close={()=>setOpen(false)}
            action={deleteBillboard}
          />

        </DropdownMenu>
       
      </AlertDialog>
      )
    },
  },
]
