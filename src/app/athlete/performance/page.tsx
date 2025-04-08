import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export const metadata: Metadata = {
  title: "Performance | Sports Academy Hub",
  description: "Track and analyze your athletic performance",
}

export default function AthletePerformancePage() {
  // Mock performance data
  const performanceData = [
    { month: "Jan", speed: 65, strength: 70, endurance: 60 },
    { month: "Feb", speed: 68, strength: 72, endurance: 63 },
    { month: "Mar", speed: 70, strength: 75, endurance: 65 },
    { month: "Apr", speed: 72, strength: 78, endurance: 68 },
    { month: "May", speed: 75, strength: 80, endurance: 72 },
    { month: "Jun", speed: 78, strength: 82, endurance: 75 },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="My Performance" text="Track and analyze your athletic performance metrics." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your performance metrics over time</CardDescription>
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Physical Attributes</CardTitle>
                <CardDescription>Your current physical performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>Your current technical performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Technical Skills", value: 82 },
                  { name: "Tactical Awareness", value: 75 },
                  { name: "Decision Making", value: 68 },
                  { name: "Positioning", value: 80 },
                  { name: "Communication", value: 65 },
                ].map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="physical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Physical Performance</CardTitle>
              <CardDescription>Detailed physical performance metrics and history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This section will display detailed physical performance metrics and history.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Performance</CardTitle>
              <CardDescription>Detailed technical performance metrics and history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This section will display detailed technical performance metrics and history.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Results from your performance tests and assessments</CardDescription>
            </CardHeader>
            <CardContent>
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
                    {[
                      { test: "Sprint (100m)", result: "12.5s", benchmark: "12.0s", date: "2023-05-15" },
                      { test: "Vertical Jump", result: "65cm", benchmark: "70cm", date: "2023-05-15" },
                      { test: "Beep Test", result: "Level 11", benchmark: "Level 12", date: "2023-05-16" },
                      { test: "Agility Test", result: "10.2s", benchmark: "9.8s", date: "2023-05-16" },
                      { test: "Strength (Bench)", result: "75kg", benchmark: "80kg", date: "2023-05-17" },
                    ].map((test, index) => {
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
            </CardContent>
            <CardFooter>
              <Button variant="outline">Export Test Results</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
