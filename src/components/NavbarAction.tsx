import { getUserDetails } from '@/app/supabase-server'
import { User } from '@prisma/client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import {FC} from 'react'
import SignOutButton from './SignOutButton'

interface NavbarActionProps {
 user:User
}

const NavbarAction:FC<NavbarActionProps>=({user})=>{
 
 return(
    <div>
      <h6>
         {user.username}
      </h6>
       <ul>
         <li>
            <SignOutButton/>
         </li>
       </ul>
    </div>
)}

export default NavbarAction