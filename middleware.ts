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

// Configuration constants
const COOKIE_CONFIG = {
  SESSION_COOKIE_NAME: 'x-session',
  CSRF_COOKIE_NAME: 'x-csrf-token',
  MAX_AGE: 86400, // 24 hours
};

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
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
 * @returns User role or null if invalid
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
 * Apply security headers to response
 * @param response - NextResponse object
 * @returns Updated response with security headers
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
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
  sessionData: { userId: string; role: UserRole | null; },
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
 * Handle authentication and session management
 * @param request Original request
 * @returns NextResponse or undefined to continue
 */
async function authMiddleware(request: NextRequest): Promise<NextResponse | undefined> {
  try {
    const supabase = getSupabaseClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;

    // Handle auth errors
    if (error) {
      console.error('Auth error:', error.message, error.stack);
      return redirectTo('/error', request, { code: ErrorType.AUTH_FAILED });
    }

    // Allow public routes to pass through
    if (isPublicRoute(pathname)) {
      return undefined; // Continue to next middleware or handler
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
      return undefined; // Continue to next middleware or handler
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
    const csrfToken = generateCSRFToken();
    const response = NextResponse.next();
    
    // Set session and CSRF cookies
    setSecureCookies(response, {
      userId: session.user?.id || '',
      role: userRole
    }, csrfToken);
    
    // Apply security headers
    applySecurityHeaders(response);

    return response;
  } catch (error) {
    console.error('Middleware error:', error instanceof Error ? error.message : String(error));
    return redirectTo('/error', request, { code: ErrorType.SERVER_ERROR });
  }
}

/**
 * Main middleware function
 * This handles authentication, authorization, and security
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Add request logging in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${request.method} ${request.nextUrl.pathname}`);
  }
  
  try {
    // Process auth middleware
    const authResponse = await authMiddleware(request);
    if (authResponse) {
      return authResponse;
    }
    
    // If we get here, we're allowing the request through
    // Still apply security headers to the response
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  } catch (error) {
    console.error('Unhandled middleware error:', error);
    return redirectTo('/error', request, { code: ErrorType.SERVER_ERROR });
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images|sw.js|workbox-*.js).*)",
  ],
};