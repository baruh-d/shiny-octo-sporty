"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { UserRole } from "@/types/auth"


const PUBLIC_ROUTES = ['/', '/about', '/blog', '/events', '/programs', '/contact']
const AUTH_ROUTES = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password']
const PROTECTED_ROLES = ['admin', 'athlete', 'coach', 'scout']

export async function validateSession() {
  const supabase = createServerSupabaseClient()
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Auth error:', error)
    return { redirect: '/error?code=auth_failed' }
  }

  return { session }
}

export function getRoleBasedRedirect(role?: UserRole): string {
  const defaultRoutes: Record<Exclude<UserRole, null>, string> = {
    admin: '/admin/dashboard',
    athlete: '/athlete/performance',
    coach: '/coach/athletes',
    scout: '/scout/talent-spotlight',
  }
  return role && role in defaultRoutes ? defaultRoutes[role as Exclude<UserRole, null>] : '/'
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route))
}

export function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some(route => pathname.startsWith(route))
}

export function isRoleProtected(pathname: string, userRole?: UserRole) {
  if (!userRole) return false
  return PROTECTED_ROLES.some(role => pathname.startsWith(`/${role}`)) && userRole !== pathname.split('/')[1]
}
