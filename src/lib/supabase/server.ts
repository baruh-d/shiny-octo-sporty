import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import type { UserRole } from "@/types/consolidated-types";

interface Profile {
  id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  avatar_url?: string | null;
  created_at: string;
}

// 1. Preserved your exact cookie implementation
export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const resolvedCookieStore = await cookieStore;
          return resolvedCookieStore.getAll();
        },
        async setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          const resolvedCookieStore = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => {
            resolvedCookieStore.set({ name, value, ...options });
          });
        },
      },
    }
  );
});

// 2. Optimized data accessors with proper typing
export const getSession = cache(async () => {
  const supabase = createServerSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw new Error(`Session error: ${error.message}`);
  return session;
});

export const getProfile = cache(async (userId: string) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  
  if (error) throw new Error(`Profile fetch failed: ${error.message}`);
  return data as Profile | null;
});

export const getCurrentUserWithRole = cache(async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const profile = await getProfile(user.id);
  return profile ? { ...user, role: profile.role } : null;
});

// 3. React Query keys (match client-side)
export const queryKeys = {
  session: () => ['supabase', 'session'],
  profile: (userId: string) => ['supabase', 'profile', userId],
  currentUser: () => ['supabase', 'current-user'],
};