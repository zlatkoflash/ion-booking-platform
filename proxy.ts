import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/translations-engine/routing'
import { createServerSupabase, getLoggedUser } from './utils/supabaseServer'
import { ISupabaseUser } from './utils/interface-auth'

// 1. Initialize the next-intl middleware handler
const intlMiddleware = createMiddleware(routing)

export default async function proxy(request: NextRequest) {
  // 2. Let next-intl handle the routing/localization setup first
  const response = intlMiddleware(request)


  // 3. Initialize the server-side Supabase client instance
  // Pass both request and response to allow token cookie syncing
  /*const supabase = await createServerSupabase()

  // 4. Safely refresh and retrieve the authenticated user session
  const { data: { user } } = await supabase.auth.getUser()
  const userAuth = user as ISupabaseUser | null*/
  const userAuth = await getLoggedUser();
  const userRole = userAuth?.user_metadata?.role;

  // console.log("Checking supabase user: ", userAuth);

  const pathname = request.nextUrl.pathname

  console.log("proxy..... 1");

  // 5. Protected Path Evaluation
  // Since next-intl injects locale prefixes (e.g., /en/User/ManageMyBooking), 
  // we check if the pathname INCLUDES or matches your routing slots.
  // const isManageBooking = pathname.includes('/User/ManageMyBooking')
  const isManageBooking = pathname.includes('/Client')
  // const isAdminBookings = pathname.includes('/User/AdministratorBookings');
  const isAdminBookings = pathname.includes('/Administrator');
  // /Administrator/Home
  const isProtectedRoute = isManageBooking || isAdminBookings

  // Build a generic clean redirect helper that respects the current locale domain context
  const redirectToLogin = () => {
    const url = request.nextUrl.clone()
    // Stripping or preserving the base route pathing accurately
    url.pathname = '/user/auth/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }


  // 6. Auth Protection Logic Guard Rails
  if (isProtectedRoute) {
    // Case A: Route is protected but no active session is loaded
    if (!userAuth) {
      return redirectToLogin()
    }

    // Case B: Logged-in user has an invalid/undefined role payload
    if (!userRole || (userRole !== 'administrator' && userRole !== 'client')) {
      return redirectToLogin()
    }

    // Case C: Client trying to breach an Administrator checkpoint boundary
    if (isAdminBookings && userRole !== 'administrator') {
      const url = request.nextUrl.clone()
      url.pathname = '/user/auth/login' // Kick back or change to a dedicated /403 page if preferred
      return NextResponse.redirect(url)
    }
  }

  // 7. Hand back the modified localization + cookie updated response
  return response
}


// 8. Consolidated Optimization Matcher
/*export const config = {
  // Balanced optimization matcher array capturing localized and standard paths 
  // while skipping binary asset optimizations, vercel endpoints, and internal assets
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}*/
export const config = {
  matcher: [
    // Skip all internal paths and static files
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico|robots.txt).*)',
    // Only run on specific localized paths if possible
    '/(it|en)/:path*'
  ]
}