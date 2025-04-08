import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { AthletesList } from "./components/athletes-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Athletes | Sports Academy Hub",
  description: "Manage your athletes",
}

export default function CoachAthletesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Athletes" text="Manage and track the athletes under your supervision.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Athlete
        </Button>
      </DashboardHeader>

      <AthletesList />
    </DashboardShell>
  )
}
