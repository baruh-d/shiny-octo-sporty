"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchAthletes } from "@/lib/redux/slices/athletesSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronRight } from "lucide-react"

export function AthletesList() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { items: athletes, isLoading } = useAppSelector((state) => state.athletes)
  const [searchTerm, setSearchTerm] = useState("")
  const [sportFilter, setSportFilter] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchAthletes())
  }, [dispatch])

  // Filter athletes based on search term and sport filter
  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch =
      athlete.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.last_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSport = !sportFilter || athlete.sport === sportFilter

    return matchesSearch && matchesSport
  })

  // Group athletes by sport for the "By Sport" tab
  const athletesBySport = filteredAthletes.reduce(
    (acc, athlete) => {
      const sport = athlete.sport || "Other"
      if (!acc[sport]) {
        acc[sport] = []
      }
      acc[sport].push(athlete)
      return acc
    },
    {} as Record<string, typeof athletes>,
  )

  // Get unique sports for filter dropdown
  const uniqueSports = Array.from(new Set(athletes.map((athlete) => athlete.sport))).filter(Boolean)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Athletes</CardTitle>
        <CardDescription>View and manage all athletes under your supervision.</CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mt-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search athletes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select onValueChange={(value) => setSportFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
                {uniqueSports.length > 0 ? (
                  uniqueSports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))
                ) : (
                  // Add these default options when no sports are loaded
                  <>
                    <SelectItem value="soccer">Soccer</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="athletics">Athletics</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                    <SelectItem value="rugby">Rugby</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Athletes</TabsTrigger>
            <TabsTrigger value="by-sport">By Sport</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredAthletes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h3 className="text-lg font-medium">No athletes found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAthletes.map((athlete) => (
                  <div
                    key={athlete.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => router.push(`/coach/athletes/${athlete.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={athlete.avatar_url} alt={`${athlete.first_name} ${athlete.last_name}`} />
                        <AvatarFallback>
                          {athlete.first_name[0]}
                          {athlete.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {athlete.first_name} {athlete.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {athlete.sport} • {athlete.position || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-kas-green/10 text-kas-green">
                        {athlete.location}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="by-sport">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : Object.keys(athletesBySport).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h3 className="text-lg font-medium">No athletes found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(athletesBySport).map(([sport, sportAthletes]) => (
                  <div key={sport} className="space-y-2">
                    <h3 className="font-medium text-lg">{sport}</h3>
                    <div className="space-y-2">
                      {sportAthletes.map((athlete) => (
                        <div
                          key={athlete.id}
                          className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                          onClick={() => router.push(`/coach/athletes/${athlete.id}`)}
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={athlete.avatar_url}
                                alt={`${athlete.first_name} ${athlete.last_name}`}
                              />
                              <AvatarFallback>
                                {athlete.first_name[0]}
                                {athlete.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {athlete.first_name} {athlete.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">{athlete.position || "N/A"}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="bg-kas-green/10 text-kas-green">
                              {athlete.location}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
