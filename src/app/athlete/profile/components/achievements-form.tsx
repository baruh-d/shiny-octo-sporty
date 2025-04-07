"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Plus, Trash2, Trophy } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { updateUserProfile } from "@/lib/redux/slices/authSlice"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const achievementSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  date: z.date({ required_error: "Date is required." }),
  description: z.string().optional(),
})

type Achievement = z.infer<typeof achievementSchema>

export function AchievementsForm() {
  const dispatch = useAppDispatch()
  const { user, userDetails } = useAppSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
interface AchievementData {
    title: string;
    date: string;
    description?: string;
}

const [achievements, setAchievements] = useState<Achievement[]>(
    userDetails?.achievements?.map((achievement: AchievementData) => ({
        ...achievement,
        date: new Date(achievement.date),
    })) || [],
)
  const [showForm, setShowForm] = useState(false)

  const form = useForm<Achievement>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      description: "",
    },
  })

  const onSubmit = (data: Achievement) => {
    setAchievements([...achievements, data])
    form.reset()
    setShowForm(false)
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const saveAchievements = async () => {
    if (!user) return

    setIsLoading(true)

    try {
      await dispatch(
        updateUserProfile({
          userId: user.id,
          profileData: {
            first_name: userDetails?.first_name || "",
            last_name: userDetails?.last_name || "",
            avatar_url: userDetails?.avatar_url || "",
            achievements: achievements.map((achievement) => ({
              ...achievement,
              date: format(achievement.date, "yyyy-MM-dd"),
            })),
          },
        }),
      )
    } catch (error) {
      console.error("Error updating achievements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Add your sports achievements, awards, and recognitions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {achievements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No achievements yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Add your achievements to showcase your sports journey.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <Badge variant="outline" className="bg-kas-green/10 text-kas-green">
                      {format(achievement.date, "MMM yyyy")}
                    </Badge>
                  </div>
                  {achievement.description && (
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeAchievement(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border rounded-lg p-4">
            <div className="space-y-2">
              <Label htmlFor="title">Achievement Title</Label>
              <Input id="title" {...form.register("title")} placeholder="E.g., Regional Champion, MVP Award" />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.getValues("date") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.getValues("date") ? format(form.getValues("date"), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.getValues("date")}
                    onSelect={(date) => form.setValue("date", date as Date)}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.date && (
                <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                {...form.register("description")}
                placeholder="Brief description of the achievement"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Achievement</Button>
            </div>
          </form>
        ) : (
          <Button type="button" variant="outline" className="w-full" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={saveAchievements} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save All Achievements
        </Button>
      </CardFooter>
    </Card>
  )
}

