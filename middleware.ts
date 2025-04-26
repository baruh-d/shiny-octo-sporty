import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isPublicRoute, isAuthRoute, isRoleProtected, getRoleBasedRedirect } from "@/lib/services/auth-service"
import { UserRole } from "@/types/auth"

export async function middleware(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  const pathname = request.nextUrl.pathname

  if (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/error?code=auth_failed', request.url))
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  if (isAuthRoute(pathname)) {
    if (session) {
      const redirectUrl: string = getRoleBasedRedirect(session.user?.user_metadata?.role as UserRole)
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
    return NextResponse.next()
  }

  if (!session) {
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  const userRole = session.user?.user_metadata?.role
  if (!userRole || !isRoleProtected(pathname, userRole)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  const roles = ['admin', 'athlete', 'coach', 'scout'] as const
  for (const role of roles) {
    if (pathname.startsWith(`/${role}`) && userRole !== role) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images|sw.js|workbox-*.js).*)",
  ],
}
