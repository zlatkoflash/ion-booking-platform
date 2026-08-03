"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { zconfig } from '@/config/config'
import { ISupabaseUser } from './interface-auth'

// 1. Make the function ASYNC
export async function createServerSupabase() {
  // 2. AWAIT the cookies
  const cookieStore = await cookies()

  return createServerClient(
    zconfig.supabase.url,
    zconfig.supabase.anon,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // This error is expected if called from a Server Component
          }
        },
      },
    }
  )
}

export async function getLoggedUser(): Promise<ISupabaseUser | null> {
  const supabase = await createServerSupabase()

  // 4. Safely refresh and retrieve the authenticated user session
  const { data: { user } } = await supabase.auth.getUser()
  const userAuth = user as ISupabaseUser | null

  return userAuth;
}