'use client';

import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/utils";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { signOut } from "@/lib/redux/slices/authSlice"; // Updated import path
import { Loader2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";

interface SignOutButtonProps extends ButtonProps {
  children?: React.ReactNode;
  showLoading?: boolean;
  onSignOutSuccess?: () => void;
  onSignOutError?: (error: unknown) => void;
}

export function SignOutButton({
  children,
  className,
  showLoading = true,
  onSignOutSuccess,
  onSignOutError,
  ...props
}: SignOutButtonProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const authError = useAppSelector((state) => state.auth.error);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(signOut());
      
      if (signOut.fulfilled.match(result)) {
        // Clear client-side storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('logout', Date.now().toString());
          sessionStorage.clear();
        }
        
        // Call success callback if provided
        onSignOutSuccess?.();
        
        // Redirect and refresh
        router.push('/auth/signin');
        router.refresh();
      } else if (signOut.rejected.match(result)) {
        throw result.payload || "Failed to sign out";
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign Out Failed",
        description: error instanceof Error ? error.message : "Could not sign out",
        variant: "destructive",
      });
      onSignOutError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'logout') {
        router.push('/auth/signin');
        router.refresh();
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [router]);

  // Handle auth errors from Redux
  useEffect(() => {
    if (authError) {
      toast({
        title: "Authentication Error",
        description: authError,
        variant: "destructive",
      });
    }
  }, [authError, toast]);

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      disabled={isLoading}
      className={cn(
        "text-destructive hover:text-destructive/80 hover:bg-destructive/10 transition",
        className
      )}
      aria-label={children ? undefined : "Sign out"}
      {...props}
    >
      {isLoading && showLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children || "Signing Out..."}
        </>
      ) : (
        children || "Sign Out"
      )}
    </Button>
  );
}