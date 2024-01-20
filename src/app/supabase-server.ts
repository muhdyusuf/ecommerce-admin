import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export async function getSession() {
  'use server'
  const cookieStore=cookies()
  const supabase = createServerActionClient({cookies:()=>cookieStore})
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  'use server'
  const cookieStore=cookies()
  const supabase = createServerActionClient({cookies:()=>cookieStore})
  try {
    const { data: {user} } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error:', error)
    return null;
  }
}