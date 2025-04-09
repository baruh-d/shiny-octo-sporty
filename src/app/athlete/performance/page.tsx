// app/athlete/performance/page.tsx
import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { PerformanceOverview } from "./performance-overview"
import { PhysicalPerformance } from "./physical-performance"
import { TechnicalPerformance } from "./technical-performance"
import { TestResults } from "./test-results"

export const metadata: Metadata = {
  title: "Performance | Sports Academy Hub",
  description: "Track and analyze your athletic performance",
}

export default function AthletePerformancePage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="My Performance" 
        text="Track and analyze your athletic performance metrics." 
      />
      
      <PerformanceOverview />
      <PhysicalPerformance />
      <TechnicalPerformance />
      <TestResults />
    </DashboardShell>
  )
}