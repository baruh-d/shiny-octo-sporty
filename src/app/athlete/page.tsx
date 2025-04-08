import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { CalendarDays, Medal, Video, Dumbbell, BookOpen, Trophy, HeartPulse } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AthleteDashboard() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Athlete Dashboard"
        text="Welcome back, Track your progress and upcoming activities."
      >
        <Button>Edit Profile</Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <CalendarDays className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next: Soccer Tournament (2 days)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
                <Dumbbell className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This month (85% attendance)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Medal className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">2 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Videos</CardTitle>
                <Video className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Last upload: 3 days ago</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Progress</CardTitle>
                <CardDescription>Your skill development over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Speed</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Technique</span>
                      <span className="text-sm text-muted-foreground">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Endurance</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tactical Knowledge</span>
                      <span className="text-sm text-muted-foreground">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/athlete/performance">View Detailed Performance</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
                <CardDescription>Your next training sessions and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">APR</p>
                      <p className="text-lg font-bold">12</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Soccer Training</p>
                      <p className="text-xs text-muted-foreground">3:00 PM - 5:00 PM</p>
                      <p className="text-xs text-muted-foreground">Nairobi Sports Complex</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">APR</p>
                      <p className="text-lg font-bold">15</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fitness Assessment</p>
                      <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                      <p className="text-xs text-muted-foreground">Sports Academy Center</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="min-w-[60px] rounded-md bg-kas-green/20 p-2 text-center">
                      <p className="text-xs font-medium">APR</p>
                      <p className="text-lg font-bold">18</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Regional Tournament</p>
                        <Badge className="bg-kas-green">Event</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">All Day</p>
                      <p className="text-xs text-muted-foreground">Mombasa Stadium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/athlete/calendar">View Full Calendar</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-kas-green mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Tournament MVP</p>
                      <p className="text-xs text-muted-foreground">Nairobi Youth League</p>
                      <p className="text-xs text-muted-foreground">March 28, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Medal className="h-5 w-5 text-kas-green mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Top Scorer</p>
                      <p className="text-xs text-muted-foreground">School Championship</p>
                      <p className="text-xs text-muted-foreground">February 15, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/athlete/achievements">View All</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Training Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-kas-green mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Advanced Dribbling Techniques</p>
                      <p className="text-xs text-muted-foreground">Video tutorial • 15 min</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-kas-green mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Nutrition for Athletes</p>
                      <p className="text-xs text-muted-foreground">Article • 5 min read</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/athlete/training">View Library</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <HeartPulse className="h-5 w-5 text-kas-green mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Resting Heart Rate</p>
                      <p className="text-xs text-muted-foreground">62 bpm (improved from 65)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HeartPulse className="h-5 w-5 text-kas-green mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Recovery Score</p>
                      <p className="text-xs text-muted-foreground">85% (Good recovery)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/athlete/health">View Health Data</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

