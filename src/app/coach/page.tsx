import { redirect } from "next/navigation"

export default function CoachPage() {
  // Redirect to the coach dashboard
  redirect("/coach/athletes")
}
