"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"

interface Metric {
  name: string
  value: number
  maxValue: number
  unit: string
}

export function PerformanceMetrics() {
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [newMetric, setNewMetric] = useState<Partial<Metric>>({
    name: "",
    value: 0,
    maxValue: 100,
    unit: "%",
  })

  // Mock data - in a real app, this would come from the database
  const [physicalMetrics, setPhysicalMetrics] = useState<Metric[]>([
    { name: "Speed", value: 75, maxValue: 100, unit: "%" },
    { name: "Strength", value: 65, maxValue: 100, unit: "%" },
    { name: "Endurance", value: 80, maxValue: 100, unit: "%" },
    { name: "Flexibility", value: 60, maxValue: 100, unit: "%" },
  ])

  const [technicalMetrics, setTechnicalMetrics] = useState<Metric[]>([
    { name: "Ball Control", value: 82, maxValue: 100, unit: "%" },
    { name: "Passing", value: 78, maxValue: 100, unit: "%" },
    { name: "Shooting", value: 70, maxValue: 100, unit: "%" },
    { name: "Tactical Awareness", value: 65, maxValue: 100, unit: "%" },
  ])

  const handleAddMetric = (category: "physical" | "technical") => {
    if (!newMetric.name) return

    const metric: Metric = {
      name: newMetric.name,
      value: newMetric.value || 0,
      maxValue: newMetric.maxValue || 100,
      unit: newMetric.unit || "%",
    }

    if (category === "physical") {
      setPhysicalMetrics([...physicalMetrics, metric])
    } else {
      setTechnicalMetrics([...technicalMetrics, metric])
    }

    setNewMetric({
      name: "",
      value: 0,
      maxValue: 100,
      unit: "%",
    })
    setShowForm(false)
  }

  const handleSaveMetrics = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Track and visualize your performance metrics across different categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="physical" className="space-y-4">
          <TabsList>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="space-y-4">
            {physicalMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{metric.name}</Label>
                  <span className="text-sm text-muted-foreground">
                    {metric.value} {metric.unit}
                  </span>
                </div>
                <Progress value={(metric.value / metric.maxValue) * 100} className="h-2" />
              </div>
            ))}

            {showForm && (
              <div className="border rounded-lg p-4 space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="metric-name">Metric Name</Label>
                  <Input
                    id="metric-name"
                    value={newMetric.name}
                    onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
                    placeholder="E.g., Agility, Vertical Jump"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metric-value">Value</Label>
                    <Input
                      id="metric-value"
                      type="number"
                      value={newMetric.value}
                      onChange={(e) => setNewMetric({ ...newMetric, value: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metric-unit">Unit</Label>
                    <Input
                      id="metric-unit"
                      value={newMetric.unit}
                      onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
                      placeholder="%"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleAddMetric("physical")}>Add Metric</Button>
                </div>
              </div>
            )}

            {!showForm && (
              <Button type="button" variant="outline" className="w-full" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Physical Metric
              </Button>
            )}
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            {technicalMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{metric.name}</Label>
                  <span className="text-sm text-muted-foreground">
                    {metric.value} {metric.unit}
                  </span>
                </div>
                <Progress value={(metric.value / metric.maxValue) * 100} className="h-2" />
              </div>
            ))}

            {showForm && (
              <div className="border rounded-lg p-4 space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="metric-name">Metric Name</Label>
                  <Input
                    id="metric-name"
                    value={newMetric.name}
                    onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
                    placeholder="E.g., Dribbling, Free Throws"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metric-value">Value</Label>
                    <Input
                      id="metric-value"
                      type="number"
                      value={newMetric.value}
                      onChange={(e) => setNewMetric({ ...newMetric, value: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metric-unit">Unit</Label>
                    <Input
                      id="metric-unit"
                      value={newMetric.unit}
                      onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
                      placeholder="%"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleAddMetric("technical")}>Add Metric</Button>
                </div>
              </div>
            )}

            {!showForm && (
              <Button type="button" variant="outline" className="w-full" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Technical Metric
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSaveMetrics} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Performance Metrics
        </Button>
      </CardFooter>
    </Card>
  )
}

