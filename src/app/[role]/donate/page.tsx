import { DonationForm } from "./components/donation-form"
import { DonationStats } from "./components/donation-stats"

export default function DonatePage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Donate</h2>
        <p className="text-muted-foreground">Support our athletes and programs with your generous donation.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <DonationForm />
        <DonationStats />
      </div>
    </div>
  )
}

