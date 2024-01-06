
import supabase from '@/lib/supabase'
import Link from 'next/link'
import {FC} from 'react'


import { ThemeToggle } from './ThemeToggle'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { redirect } from 'next/navigation'
import SignOutButton from './SignOutButton'
import NavbarSheet from './NavbarSheet'

  
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

const Navbar:FC<NavbarProps>=({})=>{

 return(
    <header
        className='sticky top-0 right-0 w-full h-16 flex justify-center items-center border-b-[1px] border-muted bg-background z-[50]'
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
                <div
                    className='h-8 w-auto aspect-square  rounded-full bg-red-600'
                ></div>
            </div>
       </nav>
    </header>
    

)}

export default Navbar