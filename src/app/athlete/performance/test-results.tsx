"use client"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"

export function TestResults() {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Test</th>
              <th className="py-2 px-4 text-left">Result</th>
              <th className="py-2 px-4 text-left">Benchmark</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { test: "Sprint (100m)", result: "12.5s", benchmark: "12.0s", date: "2023-05-15" },
              { test: "Vertical Jump", result: "65cm", benchmark: "70cm", date: "2023-05-15" },
              { test: "Beep Test", result: "Level 11", benchmark: "Level 12", date: "2023-05-16" },
              { test: "Agility Test", result: "10.2s", benchmark: "9.8s", date: "2023-05-16" },
              { test: "Strength (Bench)", result: "75kg", benchmark: "80kg", date: "2023-05-17" },
            ].map((test, index) => {
              const isAboveBenchmark = test.result < test.benchmark // For time-based tests, lower is better
              return (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{test.test}</td>
                  <td className="py-2 px-4 font-medium">{test.result}</td>
                  <td className="py-2 px-4 text-muted-foreground">{test.benchmark}</td>
                  <td className="py-2 px-4 text-muted-foreground">{test.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        isAboveBenchmark ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isAboveBenchmark ? "Above Target" : "Below Target"}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <CardFooter>
        <Button variant="outline">Export Test Results</Button>
      </CardFooter>
    </>
  )
}