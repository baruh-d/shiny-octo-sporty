import { redirect } from "next/navigation";
import type { UserRole } from "@/types/auth";

const validRoles: UserRole[] = ['admin', 'athlete', 'coach', 'scout'];

export default function RolePage({ params }: { params: { role: string } }) {
  const role = params.role;

  if (role && validRoles.includes(role as UserRole)) {
    return redirect(`/${role}/dashboard`);
  }

  // Fallback for invalid roles
  return redirect('/unauthorized');
}
