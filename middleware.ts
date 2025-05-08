// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { randomBytes } from 'crypto';
import { 
  isPublicRoute, 
  isAuthRoute, 
  isRoleProtected, 
  getRoleBasedRedirect 
} from "@/lib/services/auth-service";
import type { UserRole } from "@/types/auth";

// Simple redirect helper without type constraints
function redirectTo(location: string, request: NextRequest, params?: Record<string, string>) {
  const url = new URL(location, request.url);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;

    // Error handling
    if (error) {
      console.error('Auth error:', error);
      return redirectTo('/error', request, { code: 'auth_failed' });
    }

    // Public routes
    if (isPublicRoute(pathname)) return NextResponse.next();

    // Auth routes handling
    if (isAuthRoute(pathname)) {
      if (session) {
        const userRole = session.user?.user_metadata?.role as UserRole;
        return redirectTo(getRoleBasedRedirect(userRole), request);
      }
      return NextResponse.next();
    }

    // Unauthenticated access
    if (!session) {
      return redirectTo('/auth/signin', request, { 
        redirect: encodeURIComponent(pathname) 
      });
    }

    // Role-based access control
    const userRole = session.user?.user_metadata?.role as UserRole;
    if (!userRole || !isRoleProtected(pathname, userRole)) {
      return redirectTo('/unauthorized', request);
    }

    // Secure response setup
    const response = NextResponse.next();
    const csrfToken = randomBytes(16).toString('hex');
    
    // Security cookies
    response.cookies.set({
      name: 'x-session',
      value: JSON.stringify({
        userId: session.user?.id,
        role: userRole,
        csrf: csrfToken
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 // 24 hours
    });
    
    response.cookies.set({
      name: 'x-csrf-token',
      value: csrfToken,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400
    });

    // Security headers
    const securityHeaders = [
      ['X-Frame-Options', 'DENY'],
      ['X-Content-Type-Options', 'nosniff'],
      ['Referrer-Policy', 'strict-origin-when-cross-origin'],
      ['Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"],
      ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
      ['X-XSS-Protection', '1; mode=block']
    ];

    securityHeaders.forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    return redirectTo('/error', request, { code: 'server_error' });
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images|sw.js|workbox-*.js).*)",
  ],
};