// app/admin/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { CalendarDays, Gift, ShieldCheck, Users, AlertTriangle, CheckCircle2, Settings } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Placeholder data - will come from API in full implementation
const dashboardData = {
  stats: {
    totalUsers: 2853,
    userGrowth: "+180 from last month",
    activeEvents: 24,
    eventsBreakdown: "12 upcoming, 12 ongoing",
    donations: "$12,234",
    donationGrowth: "+$1,234 from last month",
    systemStatus: "Healthy",
    systemDetails: "All systems operational"
  },
  alerts: [
    { 
      id: 1, 
      type: "success", 
      message: "Database backup completed", 
      timestamp: "Today at 2:30 AM" 
    },
    { 
      id: 2, 
      type: "warning", 
      message: "High server load detected", 
      timestamp: "Yesterday at 8:45 PM" 
    },
    { 
      id: 3, 
      type: "success", 
      message: "System update completed", 
      timestamp: "Apr 2, 2025 at 4:30 PM" 
    }
  ],
  activities: [
    {
      id: 1,
      type: "User Registration",
      details: "New coach account created",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "Event Created",
      details: "New training camp added",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      type: "Donation Received",
      details: "Equipment donation approved",
      timestamp: "Yesterday"
    },
    {
      id: 4,
      type: "User Update",
      details: "Admin role granted",
      timestamp: "2 days ago"
    }
  ]
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <DashboardShell>
      <DashboardHeader heading="Admin Dashboard" text="Platform overview and management.">
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Platform Settings
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {isLoading ? (
            <StatsLoadingSkeleton />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-kas-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{dashboardData.stats.userGrowth}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                  <CalendarDays className="h-4 w-4 text-kas-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.activeEvents}</div>
                  <p className="text-xs text-muted-foreground">{dashboardData.stats.eventsBreakdown}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Equipment Donations</CardTitle>
                  <Gift className="h-4 w-4 text-kas-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.donations}</div>
                  <p className="text-xs text-muted-foreground">{dashboardData.stats.donationGrowth}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <ShieldCheck className="h-4 w-4 text-kas-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.systemStatus}</div>
                  <p className="text-xs text-muted-foreground">{dashboardData.stats.systemDetails}</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>User Registration</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center border rounded-md border-dashed">
                  <p className="text-sm text-muted-foreground">User registration chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4">
                      {alert.type === 'success' ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-kas-green" />
                      ) : (
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-kas-red" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Users by role and status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center border rounded-md border-dashed">
                  <p className="text-sm text-muted-foreground">User distribution chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Placeholders for other tabs */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all platform users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">User management interface will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>
                Manage platform events and activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Event management interface will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Access platform analytics and generate reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Analytics dashboard will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Loading skeleton component for stats section
function StatsLoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-1" />
            <Skeleton className="h-4 w-[120px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}