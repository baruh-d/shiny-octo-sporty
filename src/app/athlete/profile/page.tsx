import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { ProfileForm } from "./components/profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AchievementsForm } from "./components/achievements-form"
import { PerformanceMetrics } from "./components/performance-metrics"

export const metadata: Metadata = {
  title: "Profile | Sports Academy Hub",
  description: "Manage your athlete profile",
}

export default function AthleteProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Profile" text="Manage your personal information and profile settings." />

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <AchievementsForm />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

