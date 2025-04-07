import { MentalHealthResources } from "./components/mental-health-resources"
import { MentalHealthAssessment } from "./components/mental-health-assessment"
import { MentalHealthSupport } from "./components/mental-health-support"

export default function MentalHealthPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mental Health</h2>
        <p className="text-muted-foreground">Resources and support for your mental wellbeing.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <MentalHealthAssessment />
        <MentalHealthResources />
      </div>
      <MentalHealthSupport />
    </div>
  )
}

