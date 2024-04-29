import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { cache } from 'react';



export async function getUserDetails() {
  'use server'
  const cookieStore=cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data: {user} } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error:', error)
    return null;
  }
}