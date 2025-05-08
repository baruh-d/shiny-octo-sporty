// types/auth.d.ts
export type UserRole = 'admin' | 'athlete' | 'coach' | 'scout';
export type UserStatus = 'active' | 'pending' | 'suspended';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  bio?: string | null;
  location?: string | null;
  created_at: string;
  updated_at: string;
}

// Type guard for runtime validation
export const isGender = (value: string | null): value is Gender => {
    return value === 'male' || value === 'female' || value === 'other';
  };
  
  // Type for when we need strict Gender typing
  export interface StrictUserProfile extends Omit<UserProfile, 'gender'> {
    gender?: Gender | null;
  }

// Combined type that works with both Supabase and your DB
export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  status?: UserStatus; // Optional since it comes from your DB
  auth_id?: string; // Optional since Supabase User won't have this
  last_login?: string | null;
  created_at?: string;
  updated_at?: string;
  user_metadata?: {
    role?: UserRole;
  };
}

export interface AuthSession {
  user: AppUser;
  access_token?: string;
  expires_at?: number;
}

export interface AuthState {
  user: AppUser | null;
  profile: UserProfile | null; // Use StrictUserProfile if you need gender validation
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  csrfVerified: boolean;
}