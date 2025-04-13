import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// Commented out import to avoid errors if file doesn't exist yet
// import { createServerSupabaseClient } from "@/lib/supabase/server"

// Define routes - kept for reference
// const PUBLIC_ROUTES = ['/', '/about', '/blog', '/events', '/programs', '/contact']
// const AUTH_ROUTES = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password']
// const PROTECTED_ROLES = ['admin', 'athlete', 'coach', 'scout']

export async function middleware() {
  // Development mode: Skip all auth checks and allow free navigation
  return NextResponse.next();
  
  /* ORIGINAL AUTH LOGIC - COMMENTED OUT FOR DEVELOPMENT
  const supabase = createServerSupabaseClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  const pathname = request.nextUrl.pathname

  // Handle auth errors
  if (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/error?code=auth_failed', request.url))
  }

  // Public routes - no auth required
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Auth routes handling
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (session) {
      const redirectUrl = getRoleBasedRedirect(session.user?.user_metadata?.role)
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
    return NextResponse.next()
  }

  // Protected routes - require auth
  if (!session) {
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Role validation
  const userRole = session.user?.user_metadata?.role
  if (!userRole || !PROTECTED_ROLES.includes(userRole)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Role-based route protection
  for (const role of PROTECTED_ROLES) {
    if (pathname.startsWith(`/${role}`) && userRole !== role) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
  */
}

/* 
// Role-based redirect function - commented out for development
type UserRole = 'admin' | 'athlete' | 'coach' | 'scout';

function getRoleBasedRedirect(role?: UserRole): string {
  const defaultRoutes = {
    admin: '/admin/dashboard',
    athlete: '/athlete/performance',
    coach: '/coach/athletes',
    scout: '/scout/talent-spotlight',
  }
  return role ? defaultRoutes[role] || '/' : '/'
}
*/

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images|sw.js|workbox-*.js).*)",
  ],
}