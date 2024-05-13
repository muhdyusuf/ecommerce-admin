'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/client'

export default function SignOutButton() {
  const router = useRouter()
  const supabase=createClient()
  async function handleSignOut(){
    await supabase.auth.signOut()
    router.push("/sigIn")
  }
  return (
    <Button
      onClick={handleSignOut}
      className='w-full'
    >
      Sign out
    </Button>
  );
}