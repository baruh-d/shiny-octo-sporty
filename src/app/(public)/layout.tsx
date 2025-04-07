import type React from "react"
import { PublicNavbar } from "@/app/components/public-navbar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
    </>
  )
}

