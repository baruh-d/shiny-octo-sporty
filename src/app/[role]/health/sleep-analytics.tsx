"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Moon, Plus } from 'lucide-react'

export function SleepAnalytics() {
  return (
    <TabsContent value="sleep" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Sleep Analytics</CardTitle>
          <CardDescription>Track and analyze your sleep patterns</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Moon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Sleep Analytics</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Track your sleep duration, quality, and patterns to optimize recovery and performance.
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Log Sleep
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}