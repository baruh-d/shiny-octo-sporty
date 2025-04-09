"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function TechnicalPerformance() {
  return (
    <TabsContent value="technical" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Technical Performance</CardTitle>
          <CardDescription>Detailed technical performance metrics and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <TechnicalSkillsSection />
            <CoachFeedbackSection />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

function TechnicalSkillsSection() {
  const skills = [
    { name: "Ball Control", rating: 4.2, lastRating: 3.9 },
    { name: "Passing Accuracy", rating: 4.0, lastRating: 3.8 },
    { name: "Shooting Technique", rating: 3.8, lastRating: 3.5 },
    { name: "Tactical Awareness", rating: 3.9, lastRating: 3.7 },
    { name: "Positioning", rating: 4.1, lastRating: 3.9 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Skill Ratings</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillRatingCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  )
}

function SkillRatingCard({
  name,
  rating,
  lastRating
}: {
  name: string;
  rating: number;
  lastRating: number;
}) {
  const improvement = rating - lastRating

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{rating.toFixed(1)}/5.0</span>
          {improvement !== 0 && (
            <span className={`text-xs ${improvement > 0 ? 'text-green-500' : 'text-amber-500'}`}>
              {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement).toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <Progress value={(rating / 5) * 100} className="h-2" />
    </div>
  )
}

function CoachFeedbackSection() {
  const feedbacks = [
    {
      coach: "Coach Smith",
      date: "2023-06-12",
      comment: "Excellent improvement in ball control during pressure situations. Keep working on weak foot accuracy.",
      rating: 4.5
    },
    {
      coach: "Coach Johnson",
      date: "2023-05-28",
      comment: "Needs to work on defensive positioning during counterattacks. Offensive movement is good.",
      rating: 3.5
    }
  ]

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Recent Coach Feedback</h3>
      <div className="space-y-4">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} {...feedback} />
        ))}
      </div>
    </div>
  )
}

function FeedbackCard({
  coach,
  date,
  comment,
  rating
}: {
  coach: string;
  date: string;
  comment: string;
  rating: number;
}) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{coach}</h4>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm">{rating.toFixed(1)}</span>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="mt-2 text-sm">{comment}</p>
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} filled />
      ))}
      {hasHalfStar && <Star half />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} />
      ))}
    </div>
  )
}

function Star({ filled = false, half = false }: { filled?: boolean; half?: boolean }) {
  if (half) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-yellow-400"
      >
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="gray" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-star)"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1"
      className={filled ? "text-yellow-400" : "text-gray-300"}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}