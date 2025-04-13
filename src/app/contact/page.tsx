import type { Metadata } from "next"
import { ContactForm } from "@/app/components/contact/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { PublicNavbar } from "@/app/components/public-navbar"

export const metadata: Metadata = {
  title: "Contact Us | Sports Academy Hub",
  description: "Get in touch with our team for any inquiries or support",
}

export default function ContactPage() {
  return (
    <div className="container py-12 space-y-10 mx-auto animate-fadeIn">
      <PublicNavbar />
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-kas-green to-primary bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We&apos;d love to hear from you. Please fill out the form below or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="col-span-1 lg:col-span-2">
          <div className="animate-slideInFromLeft">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6 animate-slideInFromRight">
          <div className="grid grid-cols-1 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-kas-green">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-kas-green/20 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-primary group-hover:text-kas-green transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <div className="text-muted-foreground">
                    <p>123 Sports Avenue</p>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-kas-green">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-kas-green/20 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-primary group-hover:text-kas-green transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <div className="text-muted-foreground">
                    <p>info@sportsacademyhub.com</p>
                    <p>support@sportsacademyhub.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-kas-green">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-kas-green/20 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-primary group-hover:text-kas-green transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <div className="text-muted-foreground">
                    <p>+254 712 345 678</p>
                    <p>+254 723 456 789</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-kas-green">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-kas-green/20 transition-colors duration-300">
                  <Clock className="h-6 w-6 text-primary group-hover:text-kas-green transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Office Hours</h3>
                  <div className="text-muted-foreground">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}