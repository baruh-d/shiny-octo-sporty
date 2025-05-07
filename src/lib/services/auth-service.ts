"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { UserRole } from "@/types/auth"

const ROUTE_CONFIG = {
  public: ['/', '/about', '/blog', '/events', '/programs', '/contact'],
  auth: ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password'],
  rolePaths: {
    admin: '/admin',
    athlete: '/athlete', 
    coach: '/coach',
    scout: '/scout'
  }
}

export async function validateSession() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return { session }
  } catch (error) {
    console.error('Session validation failed:', error)
    return { error: 'AUTH_FAILED' }
  }
}

export function getRoleHomepage(role?: UserRole): string {
  return role && ROUTE_CONFIG.rolePaths[role] 
    ? `${ROUTE_CONFIG.rolePaths[role]}/dashboard` 
    : '/'
}

export function isPublicRoute(pathname: string) {
  return ROUTE_CONFIG.public.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
}

export function isAuthRoute(pathname: string) {
  return ROUTE_CONFIG.auth.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )
}

export function requiresRoleAccess(pathname: string, userRole?: UserRole) {
  if (!userRole) return false
  
  // Check if path starts with any role base path
  const pathRole = Object.entries(ROUTE_CONFIG.rolePaths).find(
    ([, basePath]) => pathname.startsWith(`${basePath}/`)
  )?.[0] as UserRole | undefined

  return pathRole && pathRole !== userRole
}