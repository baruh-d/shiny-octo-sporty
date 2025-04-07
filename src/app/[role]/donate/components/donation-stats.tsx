"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const donationData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 19000 },
  { month: "Mar", amount: 15000 },
  { month: "Apr", amount: 22000 },
  { month: "May", amount: 28000 },
  { month: "Jun", amount: 32000 },
]

const goalAmount = 500000
const raisedAmount = 128000
const percentComplete = (raisedAmount / goalAmount) * 100

export function DonationStats() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Fundraising Goal</CardTitle>
          <CardDescription>Help us reach our annual fundraising goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">KES {raisedAmount.toLocaleString()} raised</div>
              <div className="text-sm text-muted-foreground">Goal: KES {goalAmount.toLocaleString()}</div>
            </div>
            <Progress value={percentComplete} className="h-2" />
            <div className="text-sm text-muted-foreground">{percentComplete.toFixed(1)}% Complete</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>Monthly donation trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ChartContainer
              config={{
                amount: {
                  label: "Amount (KES)",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="amount" fill="var(--color-amount)" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// This component is used to display the donation statistics in the dashboard.