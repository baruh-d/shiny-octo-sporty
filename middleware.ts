// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { 
  isPublicRoute, 
  isAuthRoute, 
  isRoleProtected, 
  getRoleBasedRedirect 
} from "@/lib/services/auth-service";
import type { UserRole } from "@/types/consolidated-types";

// Configuration constants
const COOKIE_CONFIG = {
  SESSION_COOKIE_NAME: 'x-session',
  CSRF_COOKIE_NAME: 'x-csrf-token',
  MAX_AGE: 86400, // 24 hours
};

// Error types for better handling
enum ErrorType {
  AUTH_FAILED = 'auth_failed',
  SERVER_ERROR = 'server_error',
  UNAUTHORIZED = 'unauthorized'
}

/**
 * Simple runtime-compatible CSRF token generator
 * Not cryptographically secure but sufficient for CSRF protection
 */
function generateCSRFToken(): string {
  // Combine timestamp with random characters
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}-${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Helper to create redirect responses
 */
function redirectTo(location: string, request: NextRequest, params?: Record<string, string>): NextResponse {
  try {
    const url = new URL(location, request.url);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    return NextResponse.redirect(url);
  } catch (error) {
    console.error(`Redirect error to ${location}:`, error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

/**
 * Validate and extract user role from session
 */
function extractUserRole(session: unknown): UserRole | undefined {
  if (!session || typeof session !== 'object') return undefined;
  
  const user = (session as { user?: unknown })?.user;
  if (!user || typeof user !== 'object') return undefined;

  const metadata = (user as { user_metadata?: unknown })?.user_metadata;
  if (!metadata || typeof metadata !== 'object') return undefined;

  const role = (metadata as { role?: unknown })?.role;
  if (typeof role !== 'string') return undefined;

  const validRoles: UserRole[] = ['admin', 'athlete', 'coach', 'scout'];
  return validRoles.includes(role as UserRole) ? role as UserRole : undefined;
}

/**
 * Set secure cookies for session and CSRF protection
 */
function setSecureCookies(
  response: NextResponse, 
  sessionData: { userId: string; role: UserRole | undefined; },
  csrfToken: string
): NextResponse {
  const isProduction = process.env.NODE_ENV === 'production';
  
  response.cookies.set({
    name: COOKIE_CONFIG.SESSION_COOKIE_NAME,
    value: JSON.stringify({
      ...sessionData,
      csrf: csrfToken
    }),
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_CONFIG.MAX_AGE
  });
  
  response.cookies.set({
    name: COOKIE_CONFIG.CSRF_COOKIE_NAME,
    value: csrfToken,
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_CONFIG.MAX_AGE
  });
  
  return response;
}

// Cache for Supabase client
let supabaseClientCache: ReturnType<typeof createServerSupabaseClient> | null = null;

function getSupabaseClient() {
  if (!supabaseClientCache) {
    supabaseClientCache = createServerSupabaseClient();
  }
  return supabaseClientCache;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${request.method} ${request.nextUrl.pathname}`);
  }
  
  try {
    const supabase = getSupabaseClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();
    const csrfToken = generateCSRFToken();

    if (error) {
      console.error('Auth error:', error.message);
      return redirectTo('/error', request, { code: ErrorType.AUTH_FAILED });
    }

    // Set CSRF token for all responses
    response.cookies.set({
      name: COOKIE_CONFIG.CSRF_COOKIE_NAME,
      value: csrfToken,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: COOKIE_CONFIG.MAX_AGE
    });

    if (isPublicRoute(pathname)) {
      return response;
    }

    if (isAuthRoute(pathname)) {
      if (session) {
        const userRole = extractUserRole(session);
        const redirect = getRoleBasedRedirect(userRole);
        return redirect ? redirectTo(redirect, request) : redirectTo('/dashboard', request);
      }
      return response;
    }

    if (!session) {
      return redirectTo('/auth/signin', request, { 
        redirect: encodeURIComponent(pathname) 
      });
    }

    const userRole = extractUserRole(session);
    if (!userRole || !isRoleProtected(pathname, userRole)) {
      return redirectTo('/unauthorized', request, { code: ErrorType.UNAUTHORIZED });
    }

    return setSecureCookies(response, {
      userId: session.user?.id || '',
      role: userRole
    }, csrfToken);
    
  } catch (error) {
    console.error('Middleware error:', error instanceof Error ? error.message : String(error));
    return redirectTo('/error', request, { code: ErrorType.SERVER_ERROR });
  }
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|manifest.json|icons|images|sw.js|workbox-).*)",
    "!/admin/:path*",
    "!/athlete/:path*",
    "!/coach/:path*",
    "!/scout/:path*",
    "!/[role]/:path*", // skip dynamic param route from middleware
  ],  
};