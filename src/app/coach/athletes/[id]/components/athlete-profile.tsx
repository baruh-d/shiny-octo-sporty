"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchAthleteById } from "@/lib/redux/slices/athletesSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, MapPin, Ruler, Weight, Trophy, Mail, Phone, Clock, Activity, Dumbbell } from "lucide-react"
import Link from "next/link"

interface Achievement {
  title: string;
  date: string;
  description?: string;
}

interface AthleteProfileProps {
  id: string
}

export function AthleteProfile({ id }: AthleteProfileProps) {
  const dispatch = useAppDispatch()
  const { selectedAthlete: athlete, isLoading, error } = useAppSelector((state) => state.athletes)

  useEffect(() => {
    dispatch(fetchAthleteById(id))
  }, [dispatch, id])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <h3 className="text-lg font-medium text-destructive">Error Loading Athlete</h3>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
          <Button onClick={() => dispatch(fetchAthleteById(id))} className="mt-4">
            Try Again
          </Button>
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
          <Button asChild className="mt-4">
            <Link href="/coach/athletes">Back to Athletes</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const age = athlete.date_of_birth ? calculateAge(athlete.date_of_birth) : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Athlete Information</CardTitle>
          <CardDescription>Personal details and information about the athlete</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-2 border-muted">
                <AvatarImage src={athlete.avatar_url} alt={`${athlete.first_name} ${athlete.last_name}`} />
                <AvatarFallback className="text-2xl">
                  {athlete.first_name?.[0]}
                  {athlete.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {athlete.first_name} {athlete.last_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {athlete.sport} {athlete.position ? `• ${athlete.position}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-kas-green/10 text-kas-green">
                  {athlete.sport}
                </Badge>
                {age && <Badge variant="outline">{age} years</Badge>}
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block" />

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Full Name:</span>
                  <span className="text-sm">
                    {athlete.first_name} {athlete.last_name}
                  </span>
                </div>

                {athlete.date_of_birth && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Date of Birth:</span>
                    <span className="text-sm">
                      {new Date(athlete.date_of_birth).toLocaleDateString()} ({age} years)
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm">{athlete.location || "Not specified"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">athlete{athlete.id.substring(0, 4)}@example.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">+254 7XX XXX XXX</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Sport:</span>
                  <span className="text-sm">{athlete.sport || "Not specified"}</span>
                </div>

                {athlete.position && (
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Position/Specialty:</span>
                    <span className="text-sm">{athlete.position}</span>
                  </div>
                )}

                {athlete.height && (
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Height:</span>
                    <span className="text-sm">{athlete.height} cm</span>
                  </div>
                )}

                {athlete.weight && (
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Weight:</span>
                    <span className="text-sm">{athlete.weight} kg</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Member Since:</span>
                  <span className="text-sm">{new Date(athlete.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {athlete.bio && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{athlete.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="training">Training History</TabsTrigger>
          <TabsTrigger value="notes">Coach Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader>
              <CardDescription>Records of the athlete&apos;s accomplishments and progress</CardDescription>
            </CardHeader>
            <CardContent>
              {athlete.achievements && athlete.achievements.length > 0 ? (
                <div className="space-y-4">
                  {(athlete.achievements as unknown as Achievement[]).map((achievement: Achievement, index: number) => (
                                      <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                                        <Trophy className="h-5 w-5 text-kas-green mt-0.5" />
                                        <div>
                                          <h4 className="font-medium">{achievement.title}</h4>
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(achievement.date).toLocaleDateString()}
                                          </p>
                                          {achievement.description && <p className="text-sm mt-1">{achievement.description}</p>}
                                        </div>
                                      </div>
                                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No achievements recorded</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This athlete doesn&apos;t have any recorded achievements yet.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Achievement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Training History</CardTitle>
              <CardDescription>Record of training sessions and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Training history will appear here</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Track the athlete&apos;s training sessions, attendance, and performance metrics.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Record Training Session
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coach Notes</CardTitle>
              <CardDescription>Private notes and observations about the athlete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <User className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No notes yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add notes about the athlete&apos;s progress, areas for improvement, and other observations.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Note
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/coach/athletes">Back to Athletes</Link>
        </Button>
        <div className="space-x-2">
          <Button variant="outline">Message Athlete</Button>
          <Button>Create Training Plan</Button>
        </div>
      </div>
    </div>
  )
}
