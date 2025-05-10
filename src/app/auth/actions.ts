// app/auth/actions.ts
'use server';

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const authSchemas = {
  signIn: z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
  }),
  signUp: z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    role: z.enum(["athlete", "coach", "scout"], {
      errorMap: () => ({ message: "Please select a valid role" })
    })
  }),
  passwordReset: z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address")
  })
};

export async function signIn(formData: FormData) {
  try {
    const validated = authSchemas.signIn.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword(validated);
    
    if (error) {
      return { error: "Invalid credentials. Please try again." };
    }

    redirect(formData.get("redirectTo")?.toString() || "/dashboard");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: err.errors[0].message };
    }
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function signUp(formData: FormData) {
  try {
    const validated = authSchemas.signUp.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role")
    });

    const supabase = createServerSupabaseClient();
    
    // Check for existing user before signing up
    const { data: { user } } = await supabase.auth.getUser(validated.email);
    if (user) {
      return { error: "User already exists. Please sign in." };
    }

    const { data, error } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: { 
          role: validated.role,
          created_at: new Date().toISOString()
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify`
      }
    });

    if (error) {
      return { error: error.message };
    }
    
    if (data.user) {
      await supabase.from("user_profiles").insert([{
        id: data.user.id,
        email: validated.email,
        role: validated.role,
        created_at: new Date().toISOString(),
        is_verified: false
      }]);
    }

    return { 
      success: "Check your email for verification!",
      userId: data.user?.id 
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: err.errors[0].message };
    }
    return { error: "Registration failed. Please try again." };
  }
}

export async function verifyEmail(token: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.auth.verifyOtp({
      type: 'email',
      token_hash: token
    });

    if (error || !data.user) {
      return { error: "Invalid or expired verification link" };
    }

    await supabase.from("user_profiles")
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq("id", data.user.id);

    return { success: true, userId: data.user.id };
  } catch (err) {
    return { error: "Verification failed. Please try again." };
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const validated = authSchemas.passwordReset.parse({
      email: formData.get("email")
    });

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(validated.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
    });

    if (error) {
      return { error: error.message };
    }

    return { 
      success: "If an account exists, you'll receive a reset link.",
      email: validated.email 
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: err.errors[0].message };
    }
    return { error: "Failed to send reset link. Please try again." };
  }
}

export async function updatePassword(newPassword: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return { error: error.message };
    }

    return { success: "Password updated successfully!" };
  } catch (err) {
    return { error: "Failed to update password. Please try again." };
  }
}

export async function signOut() {
  try {
    const supabase = createServerSupabaseClient();
    await supabase.auth.signOut();
    
    // Clear cookies synchronously
    const cookieStore = await cookies();
    
    // Cookie deletion options
    const cookieOptions = {
      path: '/',
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      httpOnly: true
    };

    // Delete all auth-related cookies
    cookieStore.set('sb-access-token', '', cookieOptions);
    cookieStore.set('sb-refresh-token', '', cookieOptions);
    cookieStore.set('x-session', '', cookieOptions);
    cookieStore.set('x-csrf-token', '', cookieOptions);

    redirect("/auth/signin");
  } catch (err) {
    console.error("Sign out error:", err);
    redirect("/auth/signin?error=signout_failed");
  }
}