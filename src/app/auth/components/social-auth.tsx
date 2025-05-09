'use client';

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { toast } from "@/app/hooks/use-toast";
import { motion } from "framer-motion";
import {  useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { KenyanFlagLoader } from "@/components/ui/loading-spinner";

// Provider configuration with type safety
const providers = [
  { 
    id: 'google', 
    name: 'Google', 
    icon: FcGoogle,
    scopes: '',
    color: 'hover:bg-google-50 border-google-100'
  },
  { 
    id: 'twitter', 
    name: 'X (Twitter)', 
    icon: FaTwitter,
    scopes: '',
    color: 'hover:bg-twitter-50 border-twitter-100'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: FaFacebook,
    scopes: 'email',
    color: 'hover:bg-facebook-50 border-facebook-100'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: FaLinkedin,
    scopes: 'r_liteprofile r_emailaddress',
    color: 'hover:bg-linkedin-50 border-linkedin-100'
  }
] as const;

export function SocialAuth() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  useEffect(() => {
    const error = searchParams.get('error_description');
    if (error) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error,
      });
    }
  }, [searchParams]);

  const handleLogin = async (provider: typeof providers[number]['id']) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
          scopes: providers.find(p => p.id === provider)?.scopes,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Could not authenticate with this provider",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ id, name, icon: Icon, color }) => (
          <motion.div 
            key={id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button
              variant="outline"
              type="button"
              onClick={() => handleLogin(id)}
              disabled={isLoading[id]}
              className={`w-full flex items-center justify-center gap-2 text-sm font-medium border ${color}`}
              aria-label={`Sign in with ${name}`}
            >
              {isLoading[id] ? (
                <KenyanFlagLoader size="sm" text="Connecting..." />
              ) : (
                <>
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{name}</span>
                  <span aria-hidden="true">{name}</span>
                </>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center px-4">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}