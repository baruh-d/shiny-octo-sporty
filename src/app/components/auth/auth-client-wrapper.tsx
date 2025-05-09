'use client';
import { Suspense } from 'react';
import { AuthForm } from './auth-form';
import { KenyanFlagLoader } from '@/components/ui/loading-spinner';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useEffect } from 'react';
import { clearError } from '@/lib/redux/slices/authSlice';

interface AuthClientWrapperProps {
  type: 'signin' | 'signup' | 'forgot-password';
  title?: string;
  description?: string;
  initialRole?: 'athlete' | 'coach' | 'scout';
  referralCode?: string;
}

export function AuthClientWrapper({ 
  type, 
  title, 
  description 
}: AuthClientWrapperProps) {
  const dispatch = useAppDispatch();

  // Clear any auth errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <Suspense fallback={<KenyanFlagLoader fullPage />}>
      <AuthForm 
        type={type} 
        title={title}
        description={description}
      />
    </Suspense>
  );
}