'use server'
import Link from 'next/link'
import {FC} from 'react'


import { ThemeToggle } from './ThemeToggle'
import { redirect } from 'next/navigation'

import NavbarSheet from './NavbarSheet'
import { getUserDetails } from '@/app/supabase-server'
import prisma from '../../prisma/client'
import { generateInitials } from '@/lib/utils'
import NavbarAction from './NavbarAction'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import SignOutButton from './SignOutButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

  
interface NavbarProps {
 
}
async function handleLogout(){
    "use server"
    const cookieStore=cookies()
    const supabase=createClient(cookieStore)
    const {error}=await supabase.auth.signOut()
    console.log(error)
    if(error){

    }
    else{
        
        redirect("/signIn")
    }
}

const Navbar:FC<NavbarProps>=async({})=>{
    const user=await getUserDetails()
    if(!user)redirect("signIn")



 return(
    <header
        className='sticky top-0 left-0 w-full h-16 flex justify-center items-center border-b-[1px] border-muted bg-background z-[50]'
        >
       <nav
        className='md:container flex gap-6 h-full items-center justify-between w-full p-1'
       >
            <NavbarSheet/>
            <ul
                className='hidden md:flex gap-4'
            >
                <li>
                    <Link
                        href={"/"}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/category"}
                    >
                        Category
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/colour"}
                    >
                        Colour
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/size"}
                    >
                        Size
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/products"}
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/billboards"}
                    >
                        Billboard
                    </Link>
                </li>

                <li>
                    <Link
                        href={"/order"}
                    >
                        Order
                    </Link>
                </li>
            </ul>
            <div
                className='flex items-center justify-center gap-4'
            >
                <ThemeToggle/>
            
                {!!user&&(
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className='hidden md:grid'
                    >
                        <div
                            className='h-8 w-auto aspect-square rounded-full bg-primary grid place-content-center uppercase'
                        >
                            {generateInitials(user.email||"us")}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align='end'
                    >
                        <DropdownMenuItem>
                            <SignOutButton
                                
                            />
                        </DropdownMenuItem>
                        
                    </DropdownMenuContent>
                </DropdownMenu>)}
            </div>
       </nav>
    </header>
    

)}

export default Navbar