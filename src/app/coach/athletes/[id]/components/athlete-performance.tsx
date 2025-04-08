"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchAthleteById } from "@/lib/redux/slices/athletesSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Activity, TrendingUp, BarChart3 } from "lucide-react"

interface AthletePerformanceProps {
  id: string
}

export function AthletePerformance({ id }: AthletePerformanceProps) {
  const dispatch = useAppDispatch()
  const { selectedAthlete: athlete, isLoading } = useAppSelector((state) => state.athletes)
  const [activeTab, setActiveTab] = useState("metrics")

  useEffect(() => {
    if (!athlete) {
      dispatch(fetchAthleteById(id))
    }
  }, [dispatch, id, athlete])

  // Mock performance data - in a real app, this would come from your API
  const performanceData = [
    { month: "Jan", speed: 65, strength: 70, endurance: 60 },
    { month: "Feb", speed: 68, strength: 72, endurance: 63 },
    { month: "Mar", speed: 70, strength: 75, endurance: 65 },
    { month: "Apr", speed: 72, strength: 78, endurance: 68 },
    { month: "May", speed: 75, strength: 80, endurance: 72 },
    { month: "Jun", speed: 78, strength: 82, endurance: 75 },
  ]

  const testResults = [
    { test: "Sprint (100m)", result: "12.5s", benchmark: "12.0s", date: "2023-05-15" },
    { test: "Vertical Jump", result: "65cm", benchmark: "70cm", date: "2023-05-15" },
    { test: "Beep Test", result: "Level 11", benchmark: "Level 12", date: "2023-05-16" },
    { test: "Agility Test", result: "10.2s", benchmark: "9.8s", date: "2023-05-16" },
    { test: "Strength (Bench)", result: "75kg", benchmark: "80kg", date: "2023-05-17" },
  ]

  const skillMetrics = [
    { name: "Technical Skills", value: 82 },
    { name: "Tactical Awareness", value: 75 },
    { name: "Decision Making", value: 68 },
    { name: "Positioning", value: 80 },
    { name: "Communication", value: 65 },
  ]

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </CardContent>
      </Card>
    )
  }

  if (!athlete) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <h3 className="text-lg font-medium">Athlete not found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            The athlete you are looking for does not exist or has been removed.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Performance metrics and progress for {athlete.first_name} {athlete.last_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="trends">Performance Trends</TabsTrigger>
              <TabsTrigger value="tests">Test Results</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Physical Attributes</h3>
                  {[
                    { name: "Speed", value: 75 },
                    { name: "Strength", value: 80 },
                    { name: "Endurance", value: 72 },
                    { name: "Flexibility", value: 65 },
                    { name: "Agility", value: 78 },
                  ].map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-sm text-muted-foreground">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Technical Skills</h3>
                  {skillMetrics.map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-sm text-muted-foreground">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <div className="h-[400px]">
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
              </div>
            </TabsContent>

            <TabsContent value="tests">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Test</th>
                      <th className="py-2 px-4 text-left">Result</th>
                      <th className="py-2 px-4 text-left">Benchmark</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testResults.map((test, index) => {
                      const isAboveBenchmark = test.result < test.benchmark // For time-based tests, lower is better
                      return (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{test.test}</td>
                          <td className="py-2 px-4 font-medium">{test.result}</td>
                          <td className="py-2 px-4 text-muted-foreground">{test.benchmark}</td>
                          <td className="py-2 px-4 text-muted-foreground">{test.date}</td>
                          <td className="py-2 px-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                isAboveBenchmark ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {isAboveBenchmark ? "Above Target" : "Below Target"}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Export Data</Button>
          <Button>Record New Assessment</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-generated insights based on performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <TrendingUp className="h-5 w-5 text-kas-green mt-0.5" />
              <div>
                <h3 className="font-medium">Consistent Improvement</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {athlete.first_name} has shown steady improvement in speed metrics over the last 3 months, with a 10%
                  increase in sprint performance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Activity className="h-5 w-5 text-kas-green mt-0.5" />
              <div>
                <h3 className="font-medium">Endurance Focus Needed</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Endurance metrics are lagging behind other physical attributes. Consider incorporating more aerobic
                  training in the program.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <BarChart3 className="h-5 w-5 text-kas-green mt-0.5" />
              <div>
                <h3 className="font-medium">Technical Skills</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Technical skills are developing at a faster rate than tactical awareness. Consider balancing training
                  focus.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
