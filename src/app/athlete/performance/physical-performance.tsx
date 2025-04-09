"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function PhysicalPerformance() {
  return (
    <TabsContent value="physical" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Physical Performance</CardTitle>
          <CardDescription>Detailed physical performance metrics and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <PhysicalAttributesSection />
            <TestResultsSection />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

function PhysicalAttributesSection() {
  const metrics = [
    { name: "Speed (40m dash)", value: 5.2, benchmark: 4.8, unit: "s" },
    { name: "Vertical Jump", value: 65, benchmark: 70, unit: "cm" },
    { name: "Bench Press", value: 85, benchmark: 90, unit: "kg" },
    { name: "Squat Max", value: 120, benchmark: 130, unit: "kg" },
    { name: "Beep Test", value: 11.3, benchmark: 12.0, unit: "level" },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Key Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <PhysicalMetricCard key={metric.name} {...metric} />
        ))}
      </div>
    </div>
  )
}

function PhysicalMetricCard({ 
  name, 
  value, 
  benchmark, 
  unit 
}: {
  name: string;
  value: number;
  benchmark: number;
  unit: string;
}) {
  const percentage = Math.round((value / benchmark) * 100)
  const isAboveBenchmark = value >= benchmark

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-mono">
          {value}{unit} <span className="text-muted-foreground">/ {benchmark}{unit}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Progress value={Math.min(percentage, 100)} className="h-2 flex-1" />
        <span className={`text-xs ${isAboveBenchmark ? 'text-green-500' : 'text-amber-500'}`}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}

function TestResultsSection() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Recent Tests</h3>
      <div className="space-y-4">
        <TestResultCard 
          title="Speed Assessment" 
          date="2023-06-15" 
          result="Improved by 0.3s from last month" 
          status="positive"
        />
        <TestResultCard 
          title="Strength Test" 
          date="2023-06-10" 
          result="Maintained previous level" 
          status="neutral"
        />
        <TestResultCard 
          title="Endurance Run" 
          date="2023-06-05" 
          result="Slightly below target" 
          status="negative"
        />
      </div>
    </div>
  )
}

function TestResultCard({
  title,
  date,
  result,
  status
}: {
  title: string;
  date: string;
  result: string;
  status: 'positive' | 'neutral' | 'negative';
}) {
  const statusColors = {
    positive: 'bg-green-100 text-green-800',
    neutral: 'bg-blue-100 text-blue-800',
    negative: 'bg-amber-100 text-amber-800'
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
          {status === 'positive' ? 'Improving' : status === 'negative' ? 'Needs Work' : 'Stable'}
        </span>
      </div>
      <p className="mt-2 text-sm">{result}</p>
    </div>
  )
}