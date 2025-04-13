import { redirect } from "next/navigation"

export default function RolePage({ 
  params 
}: { 
  params: { role: string } 
}) {
  const role = params.role
  if (role) {
    redirect(`/${role}/dashboard`)
  }
  return null
}