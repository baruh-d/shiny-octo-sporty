import { redirect } from "next/navigation";
import { isValidUserRole } from "@/types/consolidated-types";

export default function RolePage({ params }: { params: { role: string } }) {
  const role = params.role.toLowerCase();
  
  // Use the isValidUserRole type guard function from consolidated-types
  if (role && isValidUserRole(role)) {
    return redirect(`/${role}/dashboard`);
  }
  
  // For invalid roles, redirect to signin
  return redirect("/auth/signin");
}