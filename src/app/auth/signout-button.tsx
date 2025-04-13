// components/auth/signout-button.tsx
'use client';

import { Button, ButtonProps } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SignOutButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export function SignOutButton({
  children,
  className,
  ...props
}: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('logout', Date.now().toString());
      }
      
      router.push('/auth/signin');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
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

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      className={cn(
        "text-destructive hover:text-destructive/80 hover:bg-destructive/10 transition",
        className
      )}
      {...props}
    >
      {children || "Sign Out"}
    </Button>
  );
}