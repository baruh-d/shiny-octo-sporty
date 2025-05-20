// consolidated-types.ts
import { Database } from '@/database.types';

// Re-export the Database type for use elsewhere
export type { Database };

// Extract table types from the generated Database type
type Tables = Database['public']['Tables'];

// User types derived from the database schema
export type DbUser = Tables['users']['Row'];
export type DbProfile = Tables['profiles']['Row'];
export type DbAthleteProfile = Tables['athlete_profiles']['Row'];
export type DbCoachProfile = Tables['coach_profiles']['Row'];
export type DbScoutProfile = Tables['scout_profiles']['Row'];

// Type-safe enums that match database values
export type UserRole = DbUser['role']; // This assumes 'role' is typed correctly in the DB
export const UserRoles = {
  ADMIN: 'admin' as UserRole,
  ATHLETE: 'athlete' as UserRole,
  COACH: 'coach' as UserRole,
  SCOUT: 'scout' as UserRole
};

export type UserStatus = NonNullable<DbUser['status']>; // Handle potential null
export const UserStatuses = {
  ACTIVE: 'active' as UserStatus,
  PENDING: 'pending' as UserStatus,
  SUSPENDED: 'suspended' as UserStatus
};

export type Gender = 'male' | 'female' | 'other';
export const isGender = (value: string | null): value is Gender => {
  return value === 'male' || value === 'female' || value === 'other';
};

// User profile derived from the database schema but with stricter typing
export interface UserProfile extends Omit<DbProfile, 'gender'> {
  gender?: Gender | null;
}

// Combined type for application use
export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  auth_id?: string;
  last_login?: string | null;
  created_at?: string;
  updated_at?: string;
  user_metadata?: {
    role?: UserRole;
  };
}

// Auth session types
export interface AuthSession {
  user: AppUser;
  access_token?: string;
  expires_at?: number;
}

export interface AuthState {
  user: AppUser | null;
  profile: UserProfile | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  csrfVerified: boolean;
}

// Form Error Types
export type FormFieldError = {
  message?: string;
  type?: string;
};

export type SignInErrors = {
  email?: FormFieldError;
  password?: FormFieldError;
};

export type SignUpErrors = SignInErrors & {
  role?: FormFieldError;
};

export type ForgotPasswordErrors = {
  email?: FormFieldError;
};

export type AuthType = 'signin' | 'signup' | 'forgot-password';

export type AuthFormErrors<T extends AuthType = AuthType> = 
  T extends 'signin' ? SignInErrors :
  T extends 'signup' ? SignUpErrors :
  ForgotPasswordErrors;

// Type guards for runtime validation
export const isValidUserRole = (role: string): role is UserRole => {
  return Object.values(UserRoles).includes(role as UserRole);
};

export const isValidUserStatus = (status: string): status is UserStatus => {
  return Object.values(UserStatuses).includes(status as UserStatus);
};

// Helper functions for mapping database types to application types
export function mapDbUserToAppUser(dbUser: DbUser): AppUser {
  return {
    id: dbUser.id,
    email: dbUser.email,
    role: dbUser.role as UserRole,
    status: dbUser.status as UserStatus,
    auth_id: dbUser.auth_id || undefined,
    last_login: dbUser.last_login,
    created_at: dbUser.created_at || undefined,
    updated_at: dbUser.updated_at || undefined
  };
}

export function mapDbProfileToUserProfile(dbProfile: DbProfile): UserProfile {
  return {
    ...dbProfile,
    gender: isGender(dbProfile.gender) ? dbProfile.gender : null
  };
}