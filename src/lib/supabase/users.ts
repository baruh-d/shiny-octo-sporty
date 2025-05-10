import { supabase, handleSupabaseError } from "./client";

// 🌟 User Profile Fetch
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) handleSupabaseError(error, "Error fetching user profile");
  return data;
}

// 🌟 User Profile Update
export interface UserProfileUpdate {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  gender?: string;
  [key: string]: unknown; // Allow any other fields
}

export async function updateUserProfile(userId: string, profileData: UserProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single(); // Return the updated row

  if (error) handleSupabaseError(error, "Error updating user profile");
  return data;
}

// 🌟 Fetch User by Email
export async function fetchUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) handleSupabaseError(error, "Error fetching user by email");
  return data;
}

// 🌟 Admin Temp Login
export async function adminTempLogin(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('role', 'admin')
    .single();

  if (error) {
    console.error("Error with admin login:", error);
    return null;
  }

  return data;
}

// 🌟 Fetch User by ID
export async function fetchUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) handleSupabaseError(error, "Error fetching user by ID");
  return data;
}

// 🌟 Fetch Users by Role
export async function fetchUsersByRole(role: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', role);

  if (error) handleSupabaseError(error, "Error fetching users by role");
  return data;
}

// 🌟 Fetch Users by Status
export async function fetchUsersByStatus(status: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('status', status);

  if (error) handleSupabaseError(error, "Error fetching users by status");
  return data;
}

// 🌟 Fetch Users by Created Date
export async function fetchUsersByCreatedDate(date: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('created_at', date);

  if (error) handleSupabaseError(error, "Error fetching users by created date");
  return data;
}

// 🌟 Fetch Users by Last Login
export async function fetchUsersByLastLogin(date: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('last_login', date);

  if (error) handleSupabaseError(error, "Error fetching users by last login");
  return data;
}
