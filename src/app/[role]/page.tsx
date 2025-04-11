import { redirect } from "next/navigation"

export default function RolePage({ params }: { params: { role: string } }) {
  redirect(`/${params.role}/dashboard`)
}