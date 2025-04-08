"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchAthleteById } from "@/lib/redux/slices/athletesSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, Dumbbell, FileText, MapPin, MoreHorizontal, Plus, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface AthleteTrainingProps {
  id: string
}

export function AthleteTraining({ id }: AthleteTrainingProps) {
  const dispatch = useAppDispatch()
  const { selectedAthlete: athlete, isLoading } = useAppSelector((state) => state.athletes)
  const [activeTab, setActiveTab] = useState("current")

  useEffect(() => {
    if (!athlete) {
      dispatch(fetchAthleteById(id))
    }
  }, [dispatch, id, athlete])

  // Mock training data - in a real app, this would come from your API
  const currentTrainingPlans = [
    {
      id: "tp1",
      title: "Pre-Season Conditioning",
      type: "Strength & Conditioning",
      startDate: "2023-05-01",
      endDate: "2023-06-15",
      progress: 65,
      coach: "Coach Michael",
      coachAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "tp2",
      title: "Speed Development",
      type: "Performance",
      startDate: "2023-05-15",
      endDate: "2023-07-01",
      progress: 40,
      coach: "Coach Sarah",
      coachAvatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const pastTrainingPlans = [
    {
      id: "tp3",
      title: "Off-Season Maintenance",
      type: "General Fitness",
      startDate: "2023-01-10",
      endDate: "2023-03-15",
      progress: 100,
      coach: "Coach Michael",
      coachAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "tp4",
      title: "Technical Skills Development",
      type: "Skills",
      startDate: "2023-02-01",
      endDate: "2023-04-01",
      progress: 100,
      coach: "Coach David",
      coachAvatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const upcomingSessions = [
    {
      id: "s1",
      title: "Strength Training",
      date: "2023-06-12",
      time: "10:00 AM - 11:30 AM",
      location: "Main Gym",
      coach: "Coach Michael",
    },
    {
      id: "s2",
      title: "Speed & Agility",
      date: "2023-06-14",
      time: "3:00 PM - 4:30 PM",
      location: "Track Field",
      coach: "Coach Sarah",
    },
    {
      id: "s3",
      title: "Technical Skills",
      date: "2023-06-16",
      time: "2:00 PM - 4:00 PM",
      location: "Training Ground 2",
      coach: "Coach David",
    },
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Training Plans</CardTitle>
              <CardDescription>
                Current and past training plans for {athlete.first_name} {athlete.last_name}
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="current">Current Plans</TabsTrigger>
              <TabsTrigger value="past">Past Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              {currentTrainingPlans.length > 0 ? (
                <div className="space-y-4">
                  {currentTrainingPlans.map((plan) => (
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={plan.coachAvatar} alt={plan.coach} />
                          <AvatarFallback>{plan.coach.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{plan.coach}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No current training plans</h3>
                  <p className="text-sm text-muted-foreground mt-1">Create a new training plan for this athlete.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastTrainingPlans.length > 0 ? (
                <div className="space-y-4">
                  {pastTrainingPlans.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{plan.title}</h3>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{plan.type}</Badge>
                            <span>•</span>
                            <span>
                              {plan.startDate} to {plan.endDate}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>View Results</DropdownMenuItem>
                            <DropdownMenuItem>Clone Plan</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={plan.coachAvatar} alt={plan.coach} />
                          <AvatarFallback>{plan.coach.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{plan.coach}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No past training plans</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Past training plans will appear here once completed.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Training Sessions</CardTitle>
              <CardDescription>Scheduled training sessions for the athlete</CardDescription>
            </div>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-start gap-4 border rounded-lg p-4">
                  <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                    <p className="text-xs font-medium">
                      {new Date(session.date).toLocaleDateString("en-US", { month: "short" })}
                    </p>
                    <p className="text-lg font-bold">
                      {new Date(session.date).toLocaleDateString("en-US", { day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{session.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{session.coach}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No upcoming sessions</h3>
              <p className="text-sm text-muted-foreground mt-1">Schedule training sessions for this athlete.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/coach/calendar">View Full Calendar</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Training Equipment</CardTitle>
          <CardDescription>Equipment assigned to this athlete</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No equipment assigned</h3>
            <p className="text-sm text-muted-foreground mt-1">Assign training equipment to this athlete.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Assign Equipment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
