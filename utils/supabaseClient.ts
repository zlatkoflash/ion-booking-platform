/**
 * This function creates a Supabase client intended for use 
 * ONLY in Client Components ("use client").
 */
import { zconfig } from "@/config/config";
// import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    zconfig.supabase.url,
    zconfig.supabase.anon
  )
}


