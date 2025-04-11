import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { HealthOverview } from "./health-overview"
import { SleepAnalytics } from "./sleep-analytics"
// import { NutritionTracking } from "./nutrition-tracking"
// import { RecoveryMonitoring } from ".recovery-monitoring"

export default function HealthPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Health" 
        text="Monitor and track your health and wellness metrics." 
      />
      
      <HealthOverview />
      <SleepAnalytics />
      {/* <NutritionTracking />
      <RecoveryMonitoring /> */}
    </DashboardShell>
  )
}