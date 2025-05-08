// features/auth/auth-queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/lib/redux/hooks";
import type { Session } from "@supabase/supabase-js";
import { 
  setAuthLoading, 
  setAuthError, 
  verifyCSRF,
  clearError // Fixed: renamed from clearAuthError to clearError
} from "@/lib/redux/slices/authSlice";
import { 
  getSession, 
  loginUser, 
  registerUser, 
  logoutUser, 
  resetPassword 
} from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { getCSRFTokenFromCookie, isValidCSRFToken } from "@/lib/utils/csrf";
import type { UserRole } from "@/types/auth";

// Create a utility function for CSRF verification
const verifyCSRFToken = (dispatch: ReturnType<typeof useAppDispatch>) => {
  const token = getCSRFTokenFromCookie();
  const isValid = token ? isValidCSRFToken(token) : false;
  dispatch(verifyCSRF(isValid));
  return isValid;
};

export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  return useQuery<Session | null, Error>({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const { data, error } = await getSession();
      if (error) throw new Error(error.message);

      // Fixed: Corrected access to session
      const session = data;
      if (session) {
        verifyCSRFToken(dispatch);
        
        // Check email verification status
        if (!session.user.email_confirmed_at) {
          console.warn('Email not verified');
        }
      }

      return session;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 1,
    // Fixed: moved callbacks to proper place in react-query v4+
    meta: {
      onError: (error: Error) => {
        dispatch(setAuthError(error.message));
      },
      onSuccess: () => {
        dispatch(clearError());
      }
    }
  });
};

export const useAuthRedirect = (pathname: string, debounceTime = 1000) => {
  const { data: session, isLoading } = useAuthSession();
  const router = useRouter();
  const lastRedirect = useRef(0);

  useEffect(() => {
    if (isLoading) return;
    
    const now = Date.now();
    if (now - lastRedirect.current < debounceTime) return;
    
    if (!session) {
      lastRedirect.current = now;
      router.push(`/auth/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [session, isLoading, pathname, router, debounceTime]);

  return { session, isLoading };
};

export const usePrefetchProtectedRoutes = () => {
  const { data: session } = useAuthSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!session) return;

    const user = session.user;
    const role = user.user_metadata?.role as UserRole | undefined;
    
    // Common routes for all authenticated users
    const commonRoutes = ['/dashboard', '/settings', '/profile'];
    commonRoutes.forEach(route => router.prefetch(route));

    // Role-specific routes
    // Fixed: Changed type to exclude null as a key
    const roleRoutes: Record<Exclude<UserRole, null>, string[]> = {
      admin: ['/admin/dashboard', '/admin/users'],
      athlete: ['/athlete/dashboard', '/athlete/workouts'],
      coach: ['/coach/dashboard', '/coach/athletes'],
      scout: ['/scout/dashboard', '/scout/prospects']
    };

    if (role && role in roleRoutes) {
      roleRoutes[role as Exclude<UserRole, null>].forEach(route => router.prefetch(route));
    }
  }, [session, router]);
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      dispatch(setAuthLoading(true));
      const { data, error } = await loginUser(credentials.email, credentials.password);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'session'], data);
      verifyCSRFToken(dispatch);
      dispatch(clearError()); // Fixed: renamed from clearAuthError to clearError

      // Fetch user profile
      queryClient.prefetchQuery({
        queryKey: ['user', data.user.id],
        queryFn: async () => {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          if (error) throw error;
          return profile;
        }
      });
      
      // Prefetch protected routes
      router.prefetch('/dashboard');
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message));
    },
    onSettled: () => {
      dispatch(setAuthLoading(false));
    }
  });
};

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string; role: UserRole }) => {
      dispatch(setAuthLoading(true));
      const { data, error } = await registerUser(
        payload.email, 
        payload.password, 
        { 
          data: { role: payload.role }
        }
      );
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'session'], data);
      verifyCSRFToken(dispatch);
      dispatch(clearError()); // Fixed: renamed from clearAuthError to clearError
      router.prefetch('/auth/verify-email');
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message));
    },
    onSettled: () => {
      dispatch(setAuthLoading(false));
    }
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      dispatch(setAuthLoading(true));
      const { error } = await logoutUser();
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      // Clear all auth and user related queries
      queryClient.removeQueries({ queryKey: ['auth'] });
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.removeQueries({ queryKey: ['profile'] });
      dispatch(clearError()); // Fixed: renamed from clearAuthError to clearError
      
      // Redirect to home after sign out
      router.prefetch('/');
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message));
    },
    onSettled: () => {
      dispatch(setAuthLoading(false));
    }
  });
};

export const useResetPassword = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (email: string) => {
      dispatch(setAuthLoading(true));
      const { error } = await resetPassword(email);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      dispatch(clearError()); // Fixed: renamed from clearAuthError to clearError
    },
    onError: (error: Error) => {
      dispatch(setAuthError(error.message));
    },
    onSettled: () => {
      dispatch(setAuthLoading(false));
    }
  });
};