"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from 'lucide-react'

export function WeeklyHealthTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Health Trends</CardTitle>
        <CardDescription>Your health metrics over the past week</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Health Trends</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Track your health metrics over time, including sleep quality, recovery score, and stress levels.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}