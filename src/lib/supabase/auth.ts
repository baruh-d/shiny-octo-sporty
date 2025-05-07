// lib/supabase/auth.ts
import { supabase, handleSupabaseError } from "./client";

// 🌟 User Registration
export async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) handleSupabaseError(error, "Error registering user");
  return data.user;
}

// 🌟 User Login
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) handleSupabaseError(error, "Error logging in user");
  return data.user;
}

// 🌟 User Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) handleSupabaseError(error, "Error logging out user");
  return true;
}

// 🌟 User Session
export async function getUserSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) handleSupabaseError(error, "Error fetching user session");
  return session;
}

// 🌟 Password Reset
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) handleSupabaseError(error, "Error resetting password");
  return true;
}

// 🌟 Update User Password
export async function updateUserPassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) handleSupabaseError(error, "Error updating user password");
  return true;
}

// 🌟 Get Current User
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) handleSupabaseError(error, "Error getting current user");
  return user;
}

// 🌟 Update User Email
export async function updateUserEmail(newEmail: string) {
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  
  if (error) handleSupabaseError(error, "Error updating user email");
  return true;
}

// 🌟 Set User Metadata
export async function setUserMetadata(metadata: Record<string, unknown>) {
  const { error } = await supabase.auth.updateUser({ data: metadata });
  
  if (error) handleSupabaseError(error, "Error setting user metadata");
  return true;
}

// 🌟 Sign In With OAuth Provider
export async function signInWithProvider(provider: 'google' | 'github' | 'facebook' | 'twitter') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });
  
  if (error) handleSupabaseError(error, `Error signing in with ${provider}`);  
  return data;
}