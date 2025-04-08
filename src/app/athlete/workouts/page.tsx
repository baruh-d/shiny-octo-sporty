import type { Metadata } from "next"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react'
import Link from "next/link"

export const metadata: Metadata = {
  title: "Workouts | Sports Academy Hub",
  description: "View and track your workout schedule and training plans",
}

export default function AthleteWorkoutsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Workouts" text="View and track your workout schedule and training plans." />

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="plans">Training Plans</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Workouts</CardTitle>
              <CardDescription>Your scheduled training sessions for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    title: "Strength Training",
                    date: "2023-06-12",
                    time: "10:00 AM - 11:30 AM",
                    location: "Main Gym",
                    coach: "Coach Michael",
                    type: "Strength",
                  },
                  {
                    id: "2",
                    title: "Speed & Agility",
                    date: "2023-06-14",
                    time: "3:00 PM - 4:30 PM",
                    location: "Track Field",
                    coach: "Coach Sarah",
                    type: "Performance",
                  },
                  {
                    id: "3",
                    title: "Technical Skills",
                    date: "2023-06-16",
                    time: "2:00 PM - 4:00 PM",
                    location: "Training Ground 2",
                    coach: "Coach David",
                    type: "Skills",
                  },
                ].map((workout) => (
                  <div key={workout.id} className="flex items-start gap-4 border rounded-lg p-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">
                        {new Date(workout.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                      <p className="text-lg font-bold">
                        {new Date(workout.date).toLocaleDateString("en-US", { day: "numeric" })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{workout.title}</h3>
                        <Badge variant="outline">{workout.type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{workout.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{workout.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{workout.coach}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/athlete/calendar">View Full Calendar</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Training Plans</CardTitle>
              <CardDescription>Your current training plans and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "tp1",
                    title: "Pre-Season Conditioning",
                    type: "Strength & Conditioning",
                    startDate: "2023-05-01",
                    endDate: "2023-06-15",
                    progress: 65,
                    coach: "Coach Michael",
                  },
                  {
                    id: "tp2",
                    title: "Speed Development",
                    type: "Performance",
                    startDate: "2023-05-15",
                    endDate: "2023-07-01",
                    progress: 40,
                    coach: "Coach Sarah",
                  },
                ].map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{plan.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{plan.type}</Badge>
                          <span>•</span>
                          <span>
                            {plan.startDate} to {plan.endDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-kas-green h-2.5 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.coach}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/athlete/training">View All Training Plans</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
              <CardDescription>Your completed workouts and training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "h1",
                    title: "Endurance Training",
                    date: "2023-06-05",
                    time: "9:00 AM - 10:30 AM",
                    location: "Track Field",
                    coach: "Coach Sarah",
                    type: "Endurance",
                  },
                  {
                    id: "h2",
                    title: "Strength & Conditioning",
                    date: "2023-06-03",
                    time: "2:00 PM - 3:30 PM",
                    location: "Main Gym",
                    coach: "Coach Michael",
                    type: "Strength",
                  },
                  {
                    id: "h3",
                    title: "Recovery Session",
                    date: "2023-06-01",
                    time: "10:00 AM - 11:00 AM",
                    location: "Recovery Center",
                    coach: "Coach David",
                    type: "Recovery",
                  },
                ].map((workout) => (
                  <div key={workout.id} className="flex items-start gap-4 border rounded-lg p-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">
                        {new Date(workout.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                      <p className="text-lg font-bold">
                        {new Date(workout.date).toLocaleDateString("en-US", { day: "numeric" })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium flex items-center gap-2">
                          {workout.title}
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </h3>
                        <Badge variant="outline">{workout.type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{workout.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{workout.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{workout.coach}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
 
    )
}

