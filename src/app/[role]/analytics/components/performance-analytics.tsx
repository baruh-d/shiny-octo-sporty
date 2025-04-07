"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function PerformanceAnalytics() {
  // This would typically fetch data from your Supabase backend
  const performanceData = [
    { month: "Jan", speed: 65, strength: 70, endurance: 60 },
    { month: "Feb", speed: 68, strength: 72, endurance: 63 },
    { month: "Mar", speed: 70, strength: 75, endurance: 65 },
    { month: "Apr", speed: 72, strength: 78, endurance: 68 },
    { month: "May", speed: 75, strength: 80, endurance: 72 },
    { month: "Jun", speed: 78, strength: 82, endurance: 75 },
  ]

  const comparisonData = [
    { name: "Athlete 1", speed: 80, strength: 75, endurance: 85 },
    { name: "Athlete 2", speed: 70, strength: 85, endurance: 75 },
    { name: "Athlete 3", speed: 75, strength: 70, endurance: 80 },
    { name: "Athlete 4", speed: 85, strength: 65, endurance: 70 },
    { name: "Athlete 5", speed: 65, strength: 80, endurance: 90 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select defaultValue="athlete1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select athlete" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="athlete1">John Kamau</SelectItem>
              <SelectItem value="athlete2">Mary Wanjiku</SelectItem>
              <SelectItem value="athlete3">Peter Ochieng</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">Export Data</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics Over Time</CardTitle>
            <CardDescription>Track the progression of key performance indicators over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer
              config={{
                speed: {
                  label: "Speed",
                  color: "hsl(var(--chart-1))",
                },
                strength: {
                  label: "Strength",
                  color: "hsl(var(--chart-2))",
                },
                endurance: {
                  label: "Endurance",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="speed" stroke="var(--color-speed)" strokeWidth={2} />
                  <Line type="monotone" dataKey="strength" stroke="var(--color-strength)" strokeWidth={2} />
                  <Line type="monotone" dataKey="endurance" stroke="var(--color-endurance)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Athlete Comparison</CardTitle>
            <CardDescription>Compare performance metrics across different athletes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                speed: {
                  label: "Speed",
                  color: "hsl(var(--chart-1))",
                },
                strength: {
                  label: "Strength",
                  color: "hsl(var(--chart-2))",
                },
                endurance: {
                  label: "Endurance",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="speed" fill="var(--color-speed)" />
                  <Bar dataKey="strength" fill="var(--color-strength)" />
                  <Bar dataKey="endurance" fill="var(--color-endurance)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>AI-generated insights based on performance data.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center items-center">
            <p className="text-center text-muted-foreground">AI-powered performance insights coming soon!</p>
            <Button className="mt-4">Generate Insights</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

