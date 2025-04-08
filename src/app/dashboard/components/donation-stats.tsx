import { Progress } from "@/components/ui/progress"

export function DonationStats() {
  // This would typically fetch data from your Supabase backend
  const donationStats = [
    {
      id: "1",
      item: "Soccer Balls",
      target: 100,
      current: 65,
      percentage: 65,
    },
    {
      id: "2",
      item: "Basketball Jerseys",
      target: 50,
      current: 30,
      percentage: 60,
    },
    {
      id: "3",
      item: "Running Shoes",
      target: 80,
      current: 25,
      percentage: 31,
    },
  ]

  return (
    <div className="space-y-4">
      {donationStats.map((stat) => (
        <div key={stat.id} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{stat.item}</span>
            <span className="text-muted-foreground">
              {stat.current} / {stat.target}
            </span>
          </div>
          <Progress value={stat.percentage} className="h-2" />
        </div>
      ))}
    </div>
  )
}
