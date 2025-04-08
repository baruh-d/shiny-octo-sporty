import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AthleteProfile } from "./components/athlete-profile"
import { AthletePerformance } from "./components/athlete-performance"
import { AthleteTraining } from "./components/athlete-training"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Athlete Details | Sports Academy Hub",
  description: "View and manage athlete details",
}

export default function AthleteDetailsPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Athlete Details" text="View and manage athlete information." />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <AthleteProfile id={params.id} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <AthletePerformance id={params.id} />
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <AthleteTraining id={params.id} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
