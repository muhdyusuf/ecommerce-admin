
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/middleware";

export async function middleware(req:NextRequest) {
    const res=NextResponse.next()
    const supabase=createClient(req)

    const {
        data: {
          session
        }
      } = await supabase.supabase.auth.getSession()
    
      if (!session) {
        return NextResponse.rewrite(new URL('/signIn', req.url))
      }
    
      return res
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
  }