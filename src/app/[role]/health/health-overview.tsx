"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthMetricsGrid } from "./health-metrics"
import { WeeklyHealthTrends } from "./weekly-health-trends"
// import { InjuryPrevention } from "./injury-prevention"
// import { WellnessReminders } from "./wellness-reminders"

export function HealthOverview() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <HealthMetricsGrid />
        <WeeklyHealthTrends />
        <div className="grid gap-4 md:grid-cols-2">
          {/* <InjuryPrevention />
          <WellnessReminders /> */}
        </div>
      </TabsContent>
    </Tabs>
  )
}