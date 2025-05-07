// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/database.types"

// 🌟 Environment Setup Check
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL and Anon Key must be defined in environment variables"
  );
}

// 🌟 Create Supabase Client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// 🌟 Error Handler
export function handleSupabaseError(error: unknown, context: string) {
  console.error(`${context}:`, error);
  throw new Error(context);
}