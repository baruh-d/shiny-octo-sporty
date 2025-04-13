"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, ControllerRenderProps } from "react-hook-form"
import * as z from "zod"
import { Loader2, CheckCircle2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/app/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(values)

      setIsSuccess(true)
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      })

      form.reset()

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full overflow-hidden border-2 hover:border-kas-green transition-colors duration-300">
      <CardHeader className="bg-gradient-to-r from-background to-primary/5 border-b">
        <CardTitle className="text-2xl flex items-center">
          <Send className="mr-2 h-5 w-5 text-kas-green" />
          Get in Touch
        </CardTitle>
        <CardDescription className="text-base">
          Have questions or feedback? Send us a message and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "name"> }) => (
                  <FormItem className="space-y-2 group">
                    <FormLabel className="text-sm font-medium group-hover:text-kas-green transition-colors duration-300">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="border-2 focus:border-kas-green transition-all duration-200 shadow-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "email"> }) => (
                  <FormItem className="space-y-2 group">
                    <FormLabel className="text-sm font-medium group-hover:text-kas-green transition-colors duration-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your email address" 
                        type="email" 
                        {...field} 
                        className="border-2 focus:border-kas-green transition-all duration-200 shadow-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "subject"> }) => (
                <FormItem className="space-y-2 group">
                  <FormLabel className="text-sm font-medium group-hover:text-kas-green transition-colors duration-300">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Message subject" 
                      {...field} 
                      className="border-2 focus:border-kas-green transition-all duration-200 shadow-sm" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, "message"> }) => (
                <FormItem className="space-y-2 group">
                  <FormLabel className="text-sm font-medium group-hover:text-kas-green transition-colors duration-300">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your message" 
                      className="min-h-[150px] border-2 focus:border-kas-green transition-all duration-200 shadow-sm resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className={`w-full relative overflow-hidden group transition-all duration-300 ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-kas-green'}`}
              disabled={isSubmitting || isSuccess}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </>
                )}
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t py-4 bg-muted/20">
        <p className="text-sm text-muted-foreground flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2 text-kas-green" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
          We value your privacy and will never share your information with third parties.
        </p>
      </CardFooter>
    </Card>
  )
}