import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { ISupabaseUser } from './utils/interface/auth'
import { createServerSupabase } from './utils/supabaseServer'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Initialize the Supabase client
  /*const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )*/
  const supabase = await createServerSupabase();
  // 2. Refresh session if it exists (IMPORTANT: use getUser() not getSession() for security)
  const { data: { user } } = await supabase.auth.getUser()
  const userAuth = user as ISupabaseUser;

  // 3. Define your protected slugs/routes
  const protectedRoutes = ['/User/ManageMyBooking', '/User/AdministratorBookings']
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )



  // 4. Redirect to /User/Login if not logged in
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/User/Login'
    // Optional: add a "next" param to redirect back after login
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  else if (user) {
    if (userAuth.user_metadata.role === "administrator") { }
    else if (userAuth.user_metadata.role === "client") {
      // /User/AdministratorBookings
    }
    else {
      // so if role is undefined redirect to login it is not good.
      const url = request.nextUrl.clone();
      url.pathname = '/User/Login'
      // Optional: add a "next" param to redirect back after login
      url.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(url)

    }
  }


  // 1. Define what counts as an Admin path
  const isAdminPath = request.nextUrl.pathname.startsWith('/User/AdministratorBookings');
  const userRole = userAuth?.user_metadata?.role;

  // Case 2: User is logged in, but trying to access an Admin path
  if (isAdminPath) {
    if (userRole !== "administrator") {
      // If they aren't an admin, kick them back to login (or an unauthorized page)
      const url = request.nextUrl.clone();
      url.pathname = '/User/Login';
      // We clear search params here so they don't get stuck in a redirect loop
      return NextResponse.redirect(url);
    }
    // If they ARE an admin, do nothing and let them through
  }

  return response
}

// 5. Optimization: Filter middleware to only run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files like robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}