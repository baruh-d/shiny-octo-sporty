import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceAnalytics } from "./components/performance-analytics"
import { AttendanceAnalytics } from "./components/attendance-analytics"
import { AiInsights } from "./components/ai-insights"

export const metadata: Metadata = {
  title: "Analytics | Sports Academy Hub",
  description: "Data analytics and insights",
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics & Insights"
        text="Data-driven insights to improve performance and decision-making."
      />

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceAnalytics />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <AttendanceAnalytics />
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <AiInsights />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

