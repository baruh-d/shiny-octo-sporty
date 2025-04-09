"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Moon, Utensils, Activity } from 'lucide-react'

export function HealthMetricsGrid() {
  const metrics = [
    {
      title: "Recovery Score",
      icon: Heart,
      value: "85%",
      change: "+5% from yesterday",
      progress: 85
    },
    {
      title: "Sleep Quality",
      icon: Moon,
      value: "7.5 hrs",
      change: "+0.5 hrs from yesterday",
      progress: 75
    },
    {
      title: "Nutrition Score",
      icon: Utensils,
      value: "80%",
      change: "-5% from yesterday",
      progress: 80
    },
    {
      title: "Stress Level",
      icon: Activity,
      value: "35%",
      change: "-5% from yesterday",
      progress: 35
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-kas-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change}</p>
            <div className="mt-4">
              <Progress value={metric.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}