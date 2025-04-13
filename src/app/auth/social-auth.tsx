'use client';

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { toast } from "@/app/hooks/use-toast";
import { motion } from "framer-motion";

import {
  FcGoogle,
} from 'react-icons/fc';

import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

const providers: { id: 'google' | 'twitter' | 'facebook' | 'linkedin', name: string, icon: IconType }[] = [
  { id: 'google', name: 'Google', icon: FcGoogle },
  { id: 'twitter', name: 'Twitter', icon: FaTwitter },
  { id: 'facebook', name: 'Facebook', icon: FaFacebook },
  { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin }
];

export function SocialAuth() {
  const handleLogin = async (provider: 'google' | 'twitter' | 'facebook' | 'linkedin') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: provider === 'linkedin' ? 'r_liteprofile r_emailaddress' : ''
        }
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`,
          description: error.message,
        });
      } else {
        toast({
          title: "Redirecting...",
          description: `Continuing with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-3 mt-6">
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
        {providers.map(({ id, name, icon: Icon }) => (
          <motion.div 
            key={id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="outline"
              type="button"
              onClick={() => handleLogin(id)}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Icon className="h-5 w-5" />
              {name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}