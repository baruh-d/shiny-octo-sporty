// app/auth/actions.ts
'use server';

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Shared schemas
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["athlete", "coach", "scout"])
});

const passwordResetSchema = z.object({
  email: z.string().email()
});

export async function signIn(formData: FormData) {
  const validated = signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword(validated);
  
  if (error) return { error: error.message };
  
  redirect(formData.get("redirectTo")?.toString() || "/dashboard");
}

export async function signUp(formData: FormData) {
  const validated = signUpSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role")
  });

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: validated.email,
    password: validated.password,
    options: {
      data: { role: validated.role }
    }
  });

  if (error) return { error: error.message };
  
  if (data.user) {
    await supabase.from("user_profiles").insert([{
      id: data.user.id,
      email: validated.email,
      role: validated.role
    }]);
  }

  return { success: "Check your email for verification!" };
}

export async function resetPassword(formData: FormData) {
  const validated = passwordResetSchema.parse({
    email: formData.get("email")
  });

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(validated.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
  });

  if (error) return { error: error.message };
  return { success: "Password reset link sent!" };
}

export async function signOut() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  
  // clear cookies
  const cookieStore = await cookies();
  ['sb-access-token', 'sb-refresh-token'].forEach(name => {
    cookieStore.set(name, '', {
      path: '/',
      maxAge: 0
    });
  });  

  redirect("/auth/signin");
}