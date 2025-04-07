"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, CreditCard, Landmark, Smartphone, Loader2 } from "lucide-react"
import Image from "next/image"

const donationFormSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  customAmount: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required").max(15),
  message: z.string().optional(),
  anonymous: z.boolean(),
  paymentMethod: z.enum(["mpesa", "card", "bank"]),
})

type DonationFormValues = z.infer<typeof donationFormSchema>

export function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mpesaPrompt, setMpesaPrompt] = useState(false)

  const form = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "1000",
      customAmount: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      anonymous: false,
      paymentMethod: "mpesa",
    },
  })

  const selectedAmount = form.watch("amount")
  const paymentMethod = form.watch("paymentMethod")

  async function onSubmit(data: DonationFormValues) {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Simulate API call
      console.log("Donation data:", data)
      
      if (data.paymentMethod === "mpesa") {
        setMpesaPrompt(true)
        // In a real implementation, you would call your Mpesa API here
        await new Promise(resolve => setTimeout(resolve, 2000))
      } else {
        // Process other payment methods
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
      setIsSuccess(true)
    } catch (err) {
      setError("An error occurred while processing your donation. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-green-600 flex items-center justify-center">
            <CheckCircle2 className="mr-2" /> Thank You for Your Donation!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Your generous contribution will help support our athletes and programs.</p>
          <p className="text-muted-foreground">A confirmation has been sent to your email.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => {
            setIsSuccess(false)
            form.reset()
            setMpesaPrompt(false)
          }}>
            Make Another Donation
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (mpesaPrompt) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">M-Pesa Payment</CardTitle>
          <CardDescription className="text-center">
            Complete your donation via M-Pesa
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <Image 
              src="/mpesa-logo.png" 
              alt="M-Pesa Logo" 
              width={200} 
              height={100} 
              className="mx-auto mb-4"
            />
            <p className="mb-4">A payment request has been sent to your phone.</p>
            <p className="font-medium">Please enter your M-Pesa PIN to complete the transaction.</p>
          </div>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Never share your M-Pesa PIN with anyone. Our staff will never ask for your PIN.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setMpesaPrompt(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsSuccess(true)}>
            I&apos;ve Completed Payment
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Donation</CardTitle>
        <CardDescription>
          Support our athletes and programs with your contribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <FormLabel>Select Amount (KES)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["500", "1000", "5000", "10000"].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={`h-12 ${selectedAmount === amount ? "border-2 border-primary" : ""}`}
                    onClick={() => {
                      form.setValue("amount", amount)
                      form.setValue("customAmount", "")
                    }}
                  >
                    KES {Number.parseInt(amount).toLocaleString()}
                  </Button>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="customAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Amount (KES)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter custom amount"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          if (e.target.value) {
                            form.setValue("amount", "custom")
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="payment">Payment Method</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+254 7XX XXX XXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share why you're donating or any message for the team"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Make my donation anonymous</FormLabel>
                        <FormDescription>
                          Your name will not be displayed publicly
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="mpesa" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Smartphone className="h-4 w-4 mr-2" />
                              M-Pesa Mobile Money
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Credit/Debit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="bank" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Landmark className="h-4 w-4 mr-2" />
                              Bank Transfer
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {paymentMethod === "card" && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" />
                      </FormControl>
                    </FormItem>
                    <div className="grid grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" type="password" />
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "bank" && (
                  <div className="border rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Please use the following bank details for your transfer:
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-medium">Bank:</span> Equity Bank</p>
                      <p className="text-sm"><span className="font-medium">Account Name:</span> Sports Academy Foundation</p>
                      <p className="text-sm"><span className="font-medium">Account Number:</span> 1234567890</p>
                      <p className="text-sm"><span className="font-medium">Branch:</span> Nairobi Main Branch</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Donate KES {selectedAmount === "custom" ? form.getValues("customAmount") : Number.parseInt(selectedAmount).toLocaleString()}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}