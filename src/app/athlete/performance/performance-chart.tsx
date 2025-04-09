"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const performanceData = [
  { month: "Jan", speed: 65, strength: 70, endurance: 60 },
  { month: "Feb", speed: 68, strength: 72, endurance: 63 },
  { month: "Mar", speed: 70, strength: 75, endurance: 65 },
  { month: "Apr", speed: 72, strength: 78, endurance: 68 },
  { month: "May", speed: 75, strength: 80, endurance: 72 },
  { month: "Jun", speed: 78, strength: 82, endurance: 75 },
]

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="speed" stroke="var(--color-speed)" strokeWidth={2} />
        <Line type="monotone" dataKey="strength" stroke="var(--color-strength)" strokeWidth={2} />
        <Line type="monotone" dataKey="endurance" stroke="var(--color-endurance)" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}