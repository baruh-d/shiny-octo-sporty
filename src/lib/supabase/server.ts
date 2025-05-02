// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { UserRole } from "@/types/auth";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

function logError(context: string, error: unknown) {
  console.error(`[Supabase][${context}]`, error instanceof Error ? error.message : error);
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

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    logError("getSession", error);
    return null;
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    logError("getUserProfile", error);
    return null;
  }
}

export async function getCurrentUserWithRole() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) return null;

    const profile = await getUserProfile(user.id);
    if (!profile) return null;

    return {
      ...user,
      role: profile.role,
    };
  } catch (error) {
    logError("getCurrentUserWithRole", error);
    return null;
  }
}
