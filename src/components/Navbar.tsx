'use server'
import supabase from '@/lib/supabase'
import Link from 'next/link'
import {FC} from 'react'


import { ThemeToggle } from './ThemeToggle'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { redirect } from 'next/navigation'

import NavbarSheet from './NavbarSheet'
import { getUserDetails } from '@/app/supabase-server'
import prisma from '../../prisma/client'
import { generateInitials } from '@/lib/utils'
import NavbarAction from './NavbarAction'

  
interface NavbarProps {
 
}
async function handleLogout(){
    "use server"
    const {error}=await supabase.auth.signOut()
    console.log(error)
    if(error){

    }
    else{
        
        redirect("/signIn")
    }
}

const Navbar:FC<NavbarProps>=async({})=>{
    const sessionUser=await getUserDetails()
    const user=await prisma.user.findUnique({
        where:{
            email:sessionUser?.email
        }
    })


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
                className='flex items-center gap-4'
            >
                <ThemeToggle/>
                {!!user&&(
                <Popover>
                    <PopoverTrigger
                        className=''
                    >
                        <div>
                            {generateInitials(user.username)}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <NavbarAction user={user}/>
                    </PopoverContent>
                </Popover>)}
            </div>
       </nav>
    </header>
    

)}

export default Navbar