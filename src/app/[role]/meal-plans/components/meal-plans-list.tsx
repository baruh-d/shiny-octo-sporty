"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronRight, Utensils, Clock } from "lucide-react"

interface MealPlan {
  id: string
  title: string
  description: string
  category: "general" | "weight-gain" | "weight-loss" | "performance" | "recovery"
  sport?: string
  duration: string
  meals: number
  image?: string
}

export function MealPlansList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // This would typically fetch data from your Supabase backend
  const mealPlans: MealPlan[] = [
    {
      id: "1",
      title: "High-Performance Nutrition Plan",
      description: "Optimized for endurance athletes with focus on complex carbohydrates and lean proteins.",
      category: "performance",
      sport: "running",
      duration: "4 weeks",
      meals: 5,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Muscle Building Plan",
      description: "High protein meal plan designed for strength athletes looking to build muscle mass.",
      category: "weight-gain",
      sport: "weightlifting",
      duration: "6 weeks",
      meals: 6,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Recovery Nutrition",
      description: "Post-injury nutrition plan to support healing and return to performance.",
      category: "recovery",
      duration: "3 weeks",
      meals: 4,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Weight Management for Athletes",
      description: "Balanced nutrition plan for athletes looking to maintain optimal competition weight.",
      category: "weight-loss",
      sport: "boxing",
      duration: "8 weeks",
      meals: 5,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "5",
      title: "Youth Athlete Nutrition Basics",
      description: "Fundamental nutrition plan for young athletes focusing on growth and development.",
      category: "general",
      duration: "Ongoing",
      meals: 3,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Filter meal plans based on search term and category filter
  const filteredMealPlans = mealPlans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !categoryFilter || plan.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Group meal plans by category for the "By Category" tab
  const mealPlansByCategory = filteredMealPlans.reduce(
    (acc, plan) => {
      const category = plan.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(plan)
      return acc
    },
    {} as Record<string, MealPlan[]>,
  )

  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case "general":
        return "General Nutrition"
      case "weight-gain":
        return "Weight Gain"
      case "weight-loss":
        return "Weight Loss"
      case "performance":
        return "Performance"
      case "recovery":
        return "Recovery"
      default:
        return category
    }
  }

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-blue-100 text-blue-800"
      case "weight-gain":
        return "bg-purple-100 text-purple-800"
      case "weight-loss":
        return "bg-orange-100 text-orange-800"
      case "performance":
        return "bg-kas-green/10 text-kas-green"
      case "recovery":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Plans</CardTitle>
        <CardDescription>Browse nutrition plans designed for different sports and athletic goals.</CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mt-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meal plans..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select onValueChange={(value) => setCategoryFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General Nutrition</SelectItem>
                <SelectItem value="weight-gain">Weight Gain</SelectItem>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="recovery">Recovery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Plans</TabsTrigger>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredMealPlans.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h3 className="text-lg font-medium">No meal plans found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredMealPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-col border rounded-lg overflow-hidden hover:border-kas-green cursor-pointer transition-colors"
                    onClick={() => router.push(`/meal-plans/${plan.id}`)}
                  >
                    <div className="h-40 bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Utensils className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{plan.title}</h3>
                        <Badge className={getCategoryColor(plan.category)}>{getCategoryName(plan.category)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 flex-1">{plan.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Utensils className="h-4 w-4" />
                            <span>{plan.meals} meals/day</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="by-category">
            {Object.keys(mealPlansByCategory).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h3 className="text-lg font-medium">No meal plans found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(mealPlansByCategory).map(([category, plans]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Badge className={getCategoryColor(category)}>{getCategoryName(category)}</Badge>
                      <span>({plans.length} plans)</span>
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className="flex border rounded-lg overflow-hidden hover:border-kas-green cursor-pointer transition-colors"
                          onClick={() => router.push(`/meal-plans/${plan.id}`)}
                        >
                          <div className="w-24 bg-muted flex items-center justify-center">
                            <Utensils className="h-8 w-8 text-muted-foreground/50" />
                          </div>
                          <div className="p-4 flex-1">
                            <h4 className="font-medium">{plan.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{plan.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{plan.duration}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Utensils className="h-3 w-3" />
                                <span>{plan.meals} meals/day</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center pr-2">
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

