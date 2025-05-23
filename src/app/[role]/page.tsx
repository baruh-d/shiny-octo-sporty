// src/app/[role]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isValidUserRole, UserRoles } from '@/types/consolidated-types';

export default function RolePage() {
  const router = useRouter();
  const params = useParams();
  const role = decodeURIComponent(params.role?.toString()?.toLowerCase() || '');

  useEffect(() => {
    if (isValidUserRole(role)) {
      switch (role) {
        case UserRoles.ADMIN:
          router.replace('/admin/dashboard');
          break;
        case UserRoles.ATHLETE:
          router.replace('/athlete/performance');
          break;
        case UserRoles.COACH:
          router.replace('/coach/athlete');
          break;
        case UserRoles.SCOUT:
          router.replace('/scout/athlete/performance');
          break;
        default:
          router.replace('/auth/signin');
      }
    } else {
      router.replace('/auth/signin');
    }
  }, [role, router]);

  return null; // Or a loading spinner if you want
}
