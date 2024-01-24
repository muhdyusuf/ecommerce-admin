'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Button } from './ui/button'

export default function SignOutButton() {
  const router = useRouter()
  const [supabase] = useState(() => createPagesBrowserClient())
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
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