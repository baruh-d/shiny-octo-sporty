"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PerformanceChart } from "./performance-chart"

export function PerformanceOverview() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Your performance metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <PerformanceChart />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <PhysicalAttributesCard />
          <TechnicalSkillsCard />
        </div>
      </TabsContent>
    </Tabs>
  )
}

function PhysicalAttributesCard() {
  const metrics = [
    { name: "Speed", value: 75 },
    { name: "Strength", value: 80 },
    { name: "Endurance", value: 72 },
    { name: "Flexibility", value: 65 },
    { name: "Agility", value: 78 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Attributes</CardTitle>
        <CardDescription>Your current physical performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <MetricProgress key={metric.name} {...metric} />
        ))}
      </CardContent>
    </Card>
  )
}

function TechnicalSkillsCard() {
  const metrics = [
    { name: "Technical Skills", value: 82 },
    { name: "Tactical Awareness", value: 75 },
    { name: "Decision Making", value: 68 },
    { name: "Positioning", value: 80 },
    { name: "Communication", value: 65 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
        <CardDescription>Your current technical performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <MetricProgress key={metric.name} {...metric} />
        ))}
      </CardContent>
    </Card>
  )
}

function MetricProgress({ name, value }: { name: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}