// app/[role]/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function RoleErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  
  useEffect(() => {
    console.error('Role-specific error:', error);
    // captureException(error); // If using error tracking service
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-600">Dashboard Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Something went wrong in this dashboard section. Our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-32">
              <p className="font-medium">{error.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => router.push('/')}
          >
            Go to Home
          </Button>
          <Button onClick={reset}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}