import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { MealPlansList } from "./components/meal-plans-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Meal Plans | Sports Academy Hub",
  description: "Nutrition and meal plans for athletes",
}

export default function MealPlansPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Meal Plans"
        text="Nutrition plans tailored for athletes to optimize performance and recovery."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Meal Plan
        </Button>
      </DashboardHeader>

      <MealPlansList />
    </DashboardShell>
  )
}

