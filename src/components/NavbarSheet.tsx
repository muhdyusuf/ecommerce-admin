'use client'
import {FC, useState} from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

interface NavbarSheetProps {
 
}

const NavbarSheet:FC<NavbarSheetProps>=({})=>{
    const [isOpen,setOpen]=useState(false)

 return(
    <Sheet
        open={isOpen}
        onOpenChange={()=>setOpen(!isOpen)}
    >
        <SheetTrigger                                                       className='md:hidden'
            asChild
        >
            <Button

                variant={"ghost"}
            >
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent
            side={"left"}
        >
            <SheetHeader>
                <SheetTitle>
                    <Link
                        href={"/"}
                        onClick={()=>setOpen(false)}
                    >
                        Dashboard
                    </Link>
                </SheetTitle>
            </SheetHeader>
            <ul
                className='flex flex-col gap-2 mt-2'
            >
        
            <li>
                <Link
                    href={"/category"}
                    onClick={()=>setOpen(false)}
                >
                    Category
                </Link>
            </li>
            <li>
                <Link
                    href={"/colour"}
                    onClick={()=>setOpen(false)}
                >
                    Colour
                </Link>
            </li>
            <li>
                <Link
                    href={"/size"}
                    onClick={()=>setOpen(false)}
                >
                    Size
                </Link>
            </li>
            <li>
                <Link
                    href={"/products"}
                    onClick={()=>setOpen(false)}
                >
                    Products
                </Link>
            </li>
            <li>
                <Link
                    href={"/billboards"}
                    onClick={()=>setOpen(false)}
                >
                    Billboard
                </Link>
            </li>

            <li>
                <Link
                    href={"/order"}
                    onClick={()=>setOpen(false)}
                >
                    Order
                </Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
            </ul>
        </SheetContent>
    </Sheet>
)}

export default NavbarSheet