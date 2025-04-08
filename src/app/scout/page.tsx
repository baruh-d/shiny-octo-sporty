import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardShell } from "@/app/components/dashboard-shell"
import { BarChart3, CalendarDays, Eye, Users, Star, MapPin } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ScoutDashboard() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Scout Dashboard" text="Discover and track talented athletes.">
        <Button>Advanced Search</Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Athletes Scouted</CardTitle>
                <Users className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+24 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
                <Eye className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">8 high priority</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <CalendarDays className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Next: Regional Tournament (3 days)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
                <BarChart3 className="h-4 w-4 text-kas-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">5 pending review</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Prospects</CardTitle>
                <CardDescription>Highest rated athletes on your watchlist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-2 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>A{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Prospect Name {i}</p>
                          <div className="flex items-center">
                            {Array(5)
                              .fill(0)
                              .map((_, j) => (
                                <Star key={j} className={`h-4 w-4 ${j < 4 ? "text-kas-green" : "text-muted"}`} />
                              ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-xs text-muted-foreground">17 years • Forward</p>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground">Nairobi</p>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/scout/athlete/${i}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/scout/watchlist">View Full Watchlist</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Scouting Events</CardTitle>
                <CardDescription>Events scheduled for scouting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">APR</p>
                      <p className="text-lg font-bold">15</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Regional Tournament</p>
                      <p className="text-xs text-muted-foreground">9:00 AM - 6:00 PM</p>
                      <p className="text-xs text-muted-foreground">Nairobi Sports Complex</p>
                      <Badge className="mt-1 bg-kas-green">High Priority</Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">APR</p>
                      <p className="text-lg font-bold">22</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">School Championship</p>
                      <p className="text-xs text-muted-foreground">10:00 AM - 4:00 PM</p>
                      <p className="text-xs text-muted-foreground">Mombasa Stadium</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="min-w-[60px] rounded-md bg-muted p-2 text-center">
                      <p className="text-xs font-medium">MAY</p>
                      <p className="text-lg font-bold">05</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Youth Trials</p>
                      <p className="text-xs text-muted-foreground">8:00 AM - 2:00 PM</p>
                      <p className="text-xs text-muted-foreground">Eldoret Stadium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/scout/events">View All Events</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your latest scouting reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">Athlete Assessment #{i}</p>
                        <p className="text-xs text-muted-foreground">U-17 Tournament • 3 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/scout/reports/${i}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/scout/reports">View All Reports</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Talent Search</CardTitle>
                <CardDescription>Find athletes by criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sport</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>All Sports</option>
                        <option>Soccer</option>
                        <option>Basketball</option>
                        <option>Athletics</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age Group</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>All Ages</option>
                        <option>U-15</option>
                        <option>U-17</option>
                        <option>U-19</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Position</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>All Positions</option>
                        <option>Forward</option>
                        <option>Midfielder</option>
                        <option>Defender</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>All Locations</option>
                        <option>Nairobi</option>
                        <option>Mombasa</option>
                        <option>Kisumu</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Search Athletes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
