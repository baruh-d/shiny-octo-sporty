// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

type UserRole = "admin" | "coach" | "athlete" | "scout";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

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

// Updated helper functions to handle async client creation
// Helper functions remain synchronous since createServerSupabaseClient is cached
export async function getSession() {
  const supabase = createServerSupabaseClient(); // No await needed
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient(); // No await needed
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}

export async function getCurrentUserWithRole() {
  const supabase = createServerSupabaseClient(); // No await needed
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const profile = await getUserProfile(user.id);
  if (!profile) return null;

  return {
    ...user,
    role: profile.role,
  };
}