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
 * Helper to create redirect responses
 * @param location - Destination URL
 * @param request - Original request
 * @param params - Query parameters to add
 * @returns Redirect response
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
    // Fallback to site root if URL construction fails
    return NextResponse.redirect(new URL('/', request.url));
  }
}

/**
 * Validate and extract user role from session
 * @param session - User session
 * @returns User role or undefined if invalid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractUserRole(session: any): UserRole | undefined {
  if (!session?.user?.user_metadata) {
    return undefined;
  }

  const role = session.user.user_metadata.role as unknown;

  const validRoles: UserRole[] = ['admin', 'athlete', 'coach', 'scout'];
  if (typeof role === 'string' && validRoles.includes(role as UserRole)) {
    return role as UserRole;
  }

  return undefined;
}

/**
 * Set secure cookies for session and CSRF protection
 * @param response - NextResponse object
 * @param sessionData - Session data to store
 * @param csrfToken - CSRF token
 * @returns Updated response with cookies
 */
function setSecureCookies(
  response: NextResponse, 
  sessionData: { userId: string; role: UserRole | undefined; },
  csrfToken: string
): NextResponse {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Session cookie (httpOnly for security)
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
  
  // CSRF token cookie (accessible to JavaScript)
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

/**
 * Generate a secure random CSRF token
 * @returns CSRF token string
 */
function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// Cache for Supabase client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabaseClientCache: any = null;

/**
 * Get cached Supabase client or create a new one
 * @returns Supabase client
 */
function getSupabaseClient() {
  if (!supabaseClientCache) {
    supabaseClientCache = createServerSupabaseClient();
  }
  return supabaseClientCache;
}

/**
 * Main middleware function
 * This handles authentication and authorization
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Add request logging in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${request.method} ${request.nextUrl.pathname}`);
  }
  
  try {
    const supabase = getSupabaseClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;

    // Handle auth errors
    if (error) {
      console.error('Auth error:', error.message, error.stack);
      return redirectTo('/error', request, { code: ErrorType.AUTH_FAILED });
    }

    // Generate CSRF token for all routes
    const csrfToken = generateCSRFToken();
    const response = NextResponse.next();

    // Allow public routes to pass through
    if (isPublicRoute(pathname)) {
      // Set CSRF token even for public routes
      response.cookies.set({
        name: COOKIE_CONFIG.CSRF_COOKIE_NAME,
        value: csrfToken,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: COOKIE_CONFIG.MAX_AGE
      });
      return response;
    }

    // Handle auth routes (login, register, etc.)
    if (isAuthRoute(pathname)) {
      if (session) {
        const userRole = extractUserRole(session);
        const redirect = getRoleBasedRedirect(userRole);
        if (redirect) {
          return redirectTo(redirect, request);
        }
        // Fallback to dashboard if no role-specific redirect
        return redirectTo('/dashboard', request);
      }
      
      // For auth routes without a session, just set the CSRF token
      response.cookies.set({
        name: COOKIE_CONFIG.CSRF_COOKIE_NAME,
        value: csrfToken,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: COOKIE_CONFIG.MAX_AGE
      });
      return response;
    }

    // Redirect unauthenticated users to sign in
    if (!session) {
      return redirectTo('/auth/signin', request, { 
        redirect: encodeURIComponent(pathname) 
      });
    }

    // Extract and validate user role
    const userRole = extractUserRole(session);

    // Check role-based access
    if (!userRole || !isRoleProtected(pathname, userRole)) {
      return redirectTo('/unauthorized', request, { code: ErrorType.UNAUTHORIZED });
    }

    // Set up secure response with session data and CSRF token
    setSecureCookies(response, {
      userId: session.user?.id || '',
      role: userRole
    }, csrfToken);
    
    return response;
  } catch (error) {
    console.error('Middleware error:', error instanceof Error ? error.message : String(error));
    return redirectTo('/error', request, { code: ErrorType.SERVER_ERROR });
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images|sw.js|workbox-*.js).*)",
  ],
};