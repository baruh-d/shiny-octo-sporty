import type { Metadata } from "next"
import { ContactForm } from "@/app/components/contact/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Sports Academy Hub",
  description: "Get in touch with our team for any inquiries or support",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;d love to hear from you. Please fill out the form below or reach out directly.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-kas-green mt-0.5" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    123 Sports Avenue
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-kas-green mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    info@sportsacademyhub.com
                    <br />
                    support@sportsacademyhub.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-kas-green mt-0.5" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    +254 712 345 678
                    <br />
                    +254 723 456 789
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-kas-green mt-0.5" />
                <div>
                  <h3 className="font-medium">Office Hours</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Monday - Friday: 8:00 AM - 5:00 PM
                    <br />
                    Saturday: 9:00 AM - 1:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
