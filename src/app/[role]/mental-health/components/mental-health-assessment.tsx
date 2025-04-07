"use client"

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useToast } from "@/app/hooks/use-toast"

const formSchema = z.object({
  sleep: z.string(),
  stress: z.string(),
  mood: z.string(),
  anxiety: z.string(),
  focus: z.string(),
})

const questions = [
  {
    name: 'sleep',
    label: 'How would you rate your sleep quality over the past week?',
    description: 'Consider factors like falling asleep, staying asleep, and feeling rested.',
  },
  {
    name: 'stress',
    label: 'How would you rate your stress levels related to sports?',
    description: 'Consider competition pressure, training demands, and performance expectations.',
  },
  {
    name: 'mood',
    label: 'How would you describe your overall mood lately?',
    description: 'Consider your general emotional state during training and competitions.',
  },
  {
    name: 'anxiety',
    label: 'How would you rate your anxiety levels before competitions?',
    description: 'Consider physical symptoms like racing heart, sweating, or mental symptoms like worry.',
  },
  {
    name: 'focus',
    label: 'How would you rate your ability to maintain focus during training and competitions?',
    description: 'Consider your concentration, attention to detail, and mental presence.',
  },
]

const ratingOptions = [
  { value: "1", label: "Poor" },
  { value: "2", label: "Fair" },
  { value: "3", label: "Average" },
  { value: "4", label: "Good" },
  { value: "5", label: "Excellent" },
]

export function MentalHealthAssessment() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sleep: "",
      stress: "",
      mood: "",
      anxiety: "",
      focus: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send this data to your backend
      console.log("Assessment data:", values)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsComplete(true)
      toast({
        title: "Assessment Submitted",
        description: "Your mental health assessment has been recorded.",
      })
    } catch {
      toast({
        title: "Error",
        description: "There was a problem submitting your assessment.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    form.reset()
    setIsComplete(false)
  }

  // Calculate the score if all questions are answered
  const calculateScore = () => {
    const values = form.getValues()
    const allAnswered = Object.values(values).every(value => value !== "")
    
    if (!allAnswered) return null
    
    const total = Object.values(values).reduce((sum, value) => sum + parseInt(value), 0)
    const average = total / Object.values(values).length
    
    return {
      total,
      average: average.toFixed(1),
      interpretation: getInterpretation(average)
    }
  }

  const getInterpretation = (score: number) => {
    if (score < 2) return "You may be experiencing significant challenges with your mental wellbeing."
    if (score < 3) return "You're experiencing some challenges with your mental wellbeing."
    if (score < 4) return "Your mental wellbeing is average, with some areas for improvement."
    if (score < 4.5) return "Your mental wellbeing is good overall."
    return "Your mental wellbeing is excellent!"
  }

  const score = calculateScore()

  if (isComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Assessment Complete
          </CardTitle>
          <CardDescription>
            Thank you for completing the mental health assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Your Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Average Score:</span>
                <span className="font-medium">{score?.average} / 5</span>
              </div>
              <div className="flex justify-between">
                <span>Total Score:</span>
                <span className="font-medium">{score?.total} / 25</span>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">{score?.interpretation}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This assessment is a tool to help you reflect on your mental wellbeing. If you&apos;re experiencing significant challenges, 
            we recommend speaking with a mental health professional.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={resetForm} className="w-full">Take Assessment Again</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Health Assessment</CardTitle>
        <CardDescription>
          Complete this brief assessment to gauge your current mental wellbeing.
          Your responses are confidential and will help us provide appropriate resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {questions.map((question) => (
              <FormField
                key={question.name}
                control={form.control}
                name={question.name as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{question.label}</FormLabel>
                    <FormDescription>{question.description}</FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        {ratingOptions.map((option) => (
                          <FormItem key={option.value} className="flex flex-col items-center space-y-1">
                            <FormControl>
                              <RadioGroupItem
                                value={option.value}
                                className="peer sr-only"
                                id={`${question.name}-${option.value}`}
                              />
                            </FormControl>
                            <label
                              htmlFor={`${question.name}-${option.value}`}
                              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-muted bg-popover p-0 text-center font-medium ring-offset-background peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {option.value}
                            </label>
                            <span className="text-xs">{option.label}</span>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Assessment"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
