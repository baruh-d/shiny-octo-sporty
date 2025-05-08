import { supabase } from "./client";
import type { AuthError, User, Session } from "@supabase/supabase-js";

type AuthResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: AuthError;
};

// Generic error handler
const handleAuthError = <T>(error: AuthError, context: string): AuthResponse<T> => {
  console.error(`${context}:`, error.message);
  return { data: null, error };
};

// 🌟 User Registration
export async function registerUser(
  email: string, 
  password: string,
  metadata?: Record<string, any>
): Promise<AuthResponse<User>> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata }
  });

  return error || !data.user 
    ? handleAuthError(error || { message: "User data is null" } as AuthError, "Registration failed") 
    : { data: data.user, error: null };
}

// 🌟 User Login
export async function loginUser(
  email: string, 
  password: string
): Promise<AuthResponse<Session>> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return error ? handleAuthError(error, "Login failed") : { data: data.session, error: null };
}

// 🌟 User Logout
export async function logoutUser(): Promise<AuthResponse<void>> {
  const { error } = await supabase.auth.signOut();
  return error ? handleAuthError(error, "Logout failed") : { data: undefined, error: null };
}

// 🌟 Session Management
export async function getSession(): Promise<AuthResponse<Session>> {
  const { data, error } = await supabase.auth.getSession();
  return error || !data.session 
    ? handleAuthError(error || { message: "Session is null" } as AuthError, "Session fetch failed") 
    : { data: data.session, error: null };
}

// 🌟 Password Reset
export async function resetPassword(
  email: string, 
  redirectTo?: string
): Promise<AuthResponse<void>> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo || `${window.location.origin}/auth/reset-password`
  });
  return error ? handleAuthError(error, "Password reset failed") : { data: undefined, error: null };
}

// 🌟 User Operations
export async function updateUser(
  updates: {
    email?: string;
    password?: string;
    data?: Record<string, any>;
  }
): Promise<AuthResponse<User>> {
  const { data, error } = await supabase.auth.updateUser(updates);
  return error ? handleAuthError(error, "User update failed") : { data: data.user, error: null };
}

// 🌟 OAuth Providers
export async function signInWithOAuth(
  provider: 'google' | 'github' | 'facebook' | 'twitter',
  options?: {
    redirectTo?: string;
    scopes?: string;
  }
): Promise<AuthResponse<{ url: string }>> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: options?.redirectTo,
      scopes: options?.scopes
    }
  });

  return error 
    ? handleAuthError(error, `OAuth sign-in failed`) 
    : { data: { url: data.url }, error: null };
}

// 🌟 Current User
export async function getCurrentUser(): Promise<AuthResponse<User>> {
  const { data, error } = await supabase.auth.getUser();
  return error ? handleAuthError(error, "Get user failed") : { data: data.user, error: null };
}