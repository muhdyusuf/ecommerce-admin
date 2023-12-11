'use client'
import supabase from '@/lib/supabase'
import Link from 'next/link'
import {FC} from 'react'
import { Button } from './ui/button'

interface NavbarProps {
 
}

const Navbar:FC<NavbarProps>=({})=>{
    async function handleLogout(){
        try {
            const {error}=await supabase.auth.signOut()
            console.log(error)
        } catch (error) {
            
        }
    }
 return(
    <>
    <header
        className='fixed top-0 right-0 w-full h-12'
        >
       <nav
        className='md:container flex justify-between items-center w-full h-full'
       >
            <Link
                href={"/"}
            >
                Home
            </Link>

            <ul
                className='flex gap-2'
            >
                <li>
                    <Link
                        href={"/payment"}
                    >
                        order
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/products"}
                    >
                        products
                    </Link>
                </li>
                <li>
                    <Button
                        onClick={handleLogout}
                    >
                        logout
                    </Button>
                </li>
            </ul>
       </nav>
    </header>
    <div
        className='h-12 w-full'
    />
    </>
)}

export default Navbar