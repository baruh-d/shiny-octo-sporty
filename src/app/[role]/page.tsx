import { redirect } from "next/navigation";
import { UserRole } from "@/types/auth";

// Define valid roles here if you don't want to import them
const validRoles: UserRole[] = ["admin", "coach", "athlete", "scout"];

export default function RolePage({ params }: { params: { role: string } }) {
  const role = params.role.toLowerCase();
  
  if (role && validRoles.includes(role as UserRole)) {
    return redirect(`/${role}/dashboard`);
  }
  
  return redirect("/auth/signin"); // or your preferred fallback route
}