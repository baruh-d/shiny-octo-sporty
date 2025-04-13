// app/[role]/page.tsx
import { redirect } from "next/navigation"

export default function RolePage({ params }: { params: { role: string } }) {
  // No need to await params - it's automatically handled by Next.js
  return redirect(`/${params.role}/dashboard`)
}