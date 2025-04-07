"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Brain, TrendingUp, AlertTriangle, HeartPulse } from "lucide-react"

export function AiInsights() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [query, setQuery] = useState("")
  
  const handleGenerateInsights = () => {
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setShowInsights(true)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Get data-driven insights and recommendations using artificial intelligence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Ask a question about your data or request specific insights..."
              className="min-h-[100px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setQuery("What are the key performance trends for my athletes?")}>
                Performance trends
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setQuery("Identify athletes at risk of injury based on training data")}>
                Injury risk analysis
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setQuery("Recommend optimal training schedules based on performance data")}>
                Training optimization
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setQuery("Compare team performance against benchmarks")}>
                Benchmark comparison
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleGenerateInsights}
            disabled={isGenerating || !query.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating insights...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Insights
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {showInsights && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Insights</CardTitle>
            <CardDescription>
              AI-generated insights based on your query: &quot;{query}&quot;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="insights">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="risks">Risk Factors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights" className="space-y-4 mt-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Performance Improvement Patterns</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Analysis shows a 15% improvement in overall team performance over the last quarter,
                      with the most significant gains in endurance metrics (23% increase).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <Brain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Skill Development Insights</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Technical skills are developing at a faster rate than tactical awareness.
                      Data suggests focusing more on game situation training could balance this development.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Attendance Impact</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Athletes with attendance rates below 80% show significantly slower performance improvement
                      (average 7% vs 18% for those with higher attendance).
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Training Focus Recommendations</h3>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Increase tactical awareness drills by 20% in the next training cycle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Implement personalized endurance programs for the 5 athletes showing the least improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Add mental resilience training sessions once per week</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Attendance Improvement Strategies</h3>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Implement a transportation assistance program for athletes citing transport issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Coordinate with schools to align academic and training schedules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Create an attendance recognition program to incentivize consistent participation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="risks" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-red-600 dark:text-red-400">Injury Risk Factors</h3>
                        <p className="text-sm mt-1">
                          Three athletes show patterns consistent with potential overtraining syndrome:
                        </p>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span>John Kamau - Decreased performance despite increased training intensity</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span>Mary Wanjiku - Reporting persistent fatigue and declining speed metrics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span>Peter Ochieng - Showing signs of technique deterioration under fatigue</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-start gap-3">
                      <HeartPulse className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-green-600 dark:text-green-400">Recommended Interventions</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>Implement a 2-week reduced training load for identified at-risk athletes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>Schedule comprehensive physical assessments with sports medicine specialists</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>Introduce recovery protocols including nutrition adjustments and sleep tracking</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}